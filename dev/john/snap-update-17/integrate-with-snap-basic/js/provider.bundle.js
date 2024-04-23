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
var e={343:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this)}e.exports=s,e.exports.once=function(e,t){return new Promise((function(n,i){function r(n){e.removeListener(t,s),i(n)}function s(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,s,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,n)}(e,r,{once:!0})}))},s.EventEmitter=s,s.prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var a=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function p(e,t,n,i){var r,s,a,p;if(o(n),void 0===(s=e._events)?(s=e._events=Object.create(null),e._eventsCount=0):(void 0!==s.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),s=e._events),a=s[t]),void 0===a)a=s[t]=n,++e._eventsCount;else if("function"==typeof a?a=s[t]=i?[n,a]:[a,n]:i?a.unshift(n):a.push(n),(r=c(e))>0&&a.length>r&&!a.warned){a.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=a.length,p=l,console&&console.warn&&console.warn(p)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=l.bind(i);return r.listener=n,i.wrapFn=r,r}function u(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):f(r,r.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function v(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(s){i.once&&e.removeEventListener(t,r),n(s)}))}}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");a=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return c(this)},s.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,s=this._events;if(void 0!==s)r=r&&void 0===s.error;else if(!r)return!1;if(r){var a;if(t.length>0&&(a=t[0]),a instanceof Error)throw a;var o=new Error("Unhandled error."+(a?" ("+a.message+")":""));throw o.context=a,o}var c=s[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var p=c.length,l=f(c,p);for(n=0;n<p;++n)i(l[n],this,t)}return!0},s.prototype.addListener=function(e,t){return p(this,e,t,!1)},s.prototype.on=s.prototype.addListener,s.prototype.prependListener=function(e,t){return p(this,e,t,!0)},s.prototype.once=function(e,t){return o(t),this.on(e,h(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,h(this,e,t)),this},s.prototype.removeListener=function(e,t){var n,i,r,s,a;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,s=n.length-1;s>=0;s--)if(n[s]===t||n[s].listener===t){a=n[s].listener,r=s;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,a||t)}return this},s.prototype.off=s.prototype.removeListener,s.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,s=Object.keys(n);for(i=0;i<s.length;++i)"removeListener"!==(r=s[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},s.prototype.listeners=function(e){return u(this,e,!0)},s.prototype.rawListeners=function(e){return u(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},s.prototype.listenerCount=d,s.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{n.d(i,{P:()=>t});var e=n(343);class t{constructor(t){if(this.server_id=t,this.emitter=new e.EventEmitter,!fin)throw new Error("OpenFin is not available")}async start(e){const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(t.rawValue){if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL")}if(!e?.executablePath)try{await fin.System.getAppAssetInfo({alias:"openfin-snap"})}catch(e){throw new Error("The 'openfin-snap' asset must be defined in the manifest")}const n=await this.build_command_line(e);let i={alias:"openfin-snap",arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error(`Failed to launch the Snap server ${JSON.stringify(e)}`)}return this.connect()}async connect(){this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",(async(e,t)=>{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:e.version,componentName:"snap-server"}})})),await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"0.2.0",componentName:"snap-client"}}),this.client.register("snap_updates",((e,t)=>this.handleSnapEvents(e,t)))}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e}}))}async prepareToApplySnapshot(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}))}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){e.snap&&await this.setLayout(e.snap)}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t}}))}async enableAutoWindowRegistration(){const e=e=>this.handleNewWindow(e);return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async handleNewWindow(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const r=(await t.getOptions()).customData||{};r.snapClientId?i=r.snapClientId:await t.updateOptions({customData:{...r,snapClientId:i}}),await this.registerWindow(i,n)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug "),e?.disableGPUAcceleratedDragging&&(t+=" --disable-gpu-accelerated-dragging true "),e?.disableBlurDropPreview&&(t+=" --blur-drop-preview false ");const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}})();var r=i.P;

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
        const app = await fin.Application.getCurrent();
        const manifest = await app.getManifest();
        if (manifest.appAssets?.[0].src === "SNAP_ASSET_URL") {
            logError("Please request the SNAP_ASSET_URL from OpenFin and update manifest.fin.json before running the sample");
            updateServerStatus();
            chkShowDebugWindow.disabled = true;
            btnStart.disabled = true;
        }
        else {
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
            updateServerStatus();
        }
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsS0FBSyxVQUFVLFNBQVMsQ0FDdkIsT0FBZSxFQUNmLFFBQWdCLEVBQ2hCLElBQVksRUFDWixJQUFjLEVBQ2QsUUFBNkI7SUFFN0IsSUFBSSxDQUFDO1FBQ0osSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNaLGNBQWMsQ0FBQyxhQUFhLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDdkMsTUFBTSxZQUFZLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN4QyxJQUFJO2dCQUNKLFFBQVE7Z0JBQ1IsSUFBSTtnQkFDSixRQUFRO2FBQ1IsQ0FBQyxDQUFDO1lBRUgsSUFBSSxZQUFZLEVBQUUsVUFBVSxFQUFFLENBQUM7Z0JBQzlCLGNBQWMsQ0FBQyxHQUFHLE9BQU8sNkJBQTZCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ2xGLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDZCxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vc25hcC1zZGsvb3BlbmZpbi5zbmFwLm1qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vY2xpZW50L3NyYy9wcm92aWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZT17MzQzOmU9Pnt2YXIgdCxuPVwib2JqZWN0XCI9PXR5cGVvZiBSZWZsZWN0P1JlZmxlY3Q6bnVsbCxpPW4mJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4uYXBwbHk/bi5hcHBseTpmdW5jdGlvbihlLHQsbil7cmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGUsdCxuKX07dD1uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLm93bktleXM/bi5vd25LZXlzOk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM/ZnVuY3Rpb24oZSl7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUpLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpKX06ZnVuY3Rpb24oZSl7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGUpfTt2YXIgcj1OdW1iZXIuaXNOYU58fGZ1bmN0aW9uKGUpe3JldHVybiBlIT1lfTtmdW5jdGlvbiBzKCl7cy5pbml0LmNhbGwodGhpcyl9ZS5leHBvcnRzPXMsZS5leHBvcnRzLm9uY2U9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKG4saSl7ZnVuY3Rpb24gcihuKXtlLnJlbW92ZUxpc3RlbmVyKHQscyksaShuKX1mdW5jdGlvbiBzKCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5yZW1vdmVMaXN0ZW5lciYmZS5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsciksbihbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfXYoZSx0LHMse29uY2U6ITB9KSxcImVycm9yXCIhPT10JiZmdW5jdGlvbihlLHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbiYmdihlLFwiZXJyb3JcIix0LG4pfShlLHIse29uY2U6ITB9KX0pKX0scy5FdmVudEVtaXR0ZXI9cyxzLnByb3RvdHlwZS5fZXZlbnRzPXZvaWQgMCxzLnByb3RvdHlwZS5fZXZlbnRzQ291bnQ9MCxzLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXZvaWQgMDt2YXIgYT0xMDtmdW5jdGlvbiBvKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyt0eXBlb2YgZSl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gdm9pZCAwPT09ZS5fbWF4TGlzdGVuZXJzP3MuZGVmYXVsdE1heExpc3RlbmVyczplLl9tYXhMaXN0ZW5lcnN9ZnVuY3Rpb24gcChlLHQsbixpKXt2YXIgcixzLGEscDtpZihvKG4pLHZvaWQgMD09PShzPWUuX2V2ZW50cyk/KHM9ZS5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksZS5fZXZlbnRzQ291bnQ9MCk6KHZvaWQgMCE9PXMubmV3TGlzdGVuZXImJihlLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHQsbi5saXN0ZW5lcj9uLmxpc3RlbmVyOm4pLHM9ZS5fZXZlbnRzKSxhPXNbdF0pLHZvaWQgMD09PWEpYT1zW3RdPW4sKytlLl9ldmVudHNDb3VudDtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YT1zW3RdPWk/W24sYV06W2Esbl06aT9hLnVuc2hpZnQobik6YS5wdXNoKG4pLChyPWMoZSkpPjAmJmEubGVuZ3RoPnImJiFhLndhcm5lZCl7YS53YXJuZWQ9ITA7dmFyIGw9bmV3IEVycm9yKFwiUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiBcIithLmxlbmd0aCtcIiBcIitTdHJpbmcodCkrXCIgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdFwiKTtsLm5hbWU9XCJNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmdcIixsLmVtaXR0ZXI9ZSxsLnR5cGU9dCxsLmNvdW50PWEubGVuZ3RoLHA9bCxjb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybihwKX1yZXR1cm4gZX1mdW5jdGlvbiBsKCl7aWYoIXRoaXMuZmlyZWQpcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSx0aGlzLndyYXBGbiksdGhpcy5maXJlZD0hMCwwPT09YXJndW1lbnRzLmxlbmd0aD90aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpOnRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsYXJndW1lbnRzKX1mdW5jdGlvbiBoKGUsdCxuKXt2YXIgaT17ZmlyZWQ6ITEsd3JhcEZuOnZvaWQgMCx0YXJnZXQ6ZSx0eXBlOnQsbGlzdGVuZXI6bn0scj1sLmJpbmQoaSk7cmV0dXJuIHIubGlzdGVuZXI9bixpLndyYXBGbj1yLHJ9ZnVuY3Rpb24gdShlLHQsbil7dmFyIGk9ZS5fZXZlbnRzO2lmKHZvaWQgMD09PWkpcmV0dXJuW107dmFyIHI9aVt0XTtyZXR1cm4gdm9pZCAwPT09cj9bXTpcImZ1bmN0aW9uXCI9PXR5cGVvZiByP24/W3IubGlzdGVuZXJ8fHJdOltyXTpuP2Z1bmN0aW9uKGUpe2Zvcih2YXIgdD1uZXcgQXJyYXkoZS5sZW5ndGgpLG49MDtuPHQubGVuZ3RoOysrbil0W25dPWVbbl0ubGlzdGVuZXJ8fGVbbl07cmV0dXJuIHR9KHIpOmYocixyLmxlbmd0aCl9ZnVuY3Rpb24gZChlKXt2YXIgdD10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09dCl7dmFyIG49dFtlXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXJldHVybiAxO2lmKHZvaWQgMCE9PW4pcmV0dXJuIG4ubGVuZ3RofXJldHVybiAwfWZ1bmN0aW9uIGYoZSx0KXtmb3IodmFyIG49bmV3IEFycmF5KHQpLGk9MDtpPHQ7KytpKW5baV09ZVtpXTtyZXR1cm4gbn1mdW5jdGlvbiB2KGUsdCxuLGkpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUub24paS5vbmNlP2Uub25jZSh0LG4pOmUub24odCxuKTtlbHNle2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUuYWRkRXZlbnRMaXN0ZW5lcil0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKTtlLmFkZEV2ZW50TGlzdGVuZXIodCwoZnVuY3Rpb24gcihzKXtpLm9uY2UmJmUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LHIpLG4ocyl9KSl9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShzLFwiZGVmYXVsdE1heExpc3RlbmVyc1wiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBhfSxzZXQ6ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8cihlKSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrZStcIi5cIik7YT1lfX0pLHMuaW5pdD1mdW5jdGlvbigpe3ZvaWQgMCE9PXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzIT09T2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKSx0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx2b2lkIDB9LHMucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxyKGUpKXRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJytlK1wiLlwiKTtyZXR1cm4gdGhpcy5fbWF4TGlzdGVuZXJzPWUsdGhpc30scy5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKCl7cmV0dXJuIGModGhpcyl9LHMucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLG49MTtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKXQucHVzaChhcmd1bWVudHNbbl0pO3ZhciByPVwiZXJyb3JcIj09PWUscz10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09cylyPXImJnZvaWQgMD09PXMuZXJyb3I7ZWxzZSBpZighcilyZXR1cm4hMTtpZihyKXt2YXIgYTtpZih0Lmxlbmd0aD4wJiYoYT10WzBdKSxhIGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgYTt2YXIgbz1uZXcgRXJyb3IoXCJVbmhhbmRsZWQgZXJyb3IuXCIrKGE/XCIgKFwiK2EubWVzc2FnZStcIilcIjpcIlwiKSk7dGhyb3cgby5jb250ZXh0PWEsb312YXIgYz1zW2VdO2lmKHZvaWQgMD09PWMpcmV0dXJuITE7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYylpKGMsdGhpcyx0KTtlbHNle3ZhciBwPWMubGVuZ3RoLGw9ZihjLHApO2ZvcihuPTA7bjxwOysrbilpKGxbbl0sdGhpcyx0KX1yZXR1cm4hMH0scy5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcCh0aGlzLGUsdCwhMSl9LHMucHJvdG90eXBlLm9uPXMucHJvdG90eXBlLmFkZExpc3RlbmVyLHMucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBwKHRoaXMsZSx0LCEwKX0scy5wcm90b3R5cGUub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBvKHQpLHRoaXMub24oZSxoKHRoaXMsZSx0KSksdGhpc30scy5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBvKHQpLHRoaXMucHJlcGVuZExpc3RlbmVyKGUsaCh0aGlzLGUsdCkpLHRoaXN9LHMucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7dmFyIG4saSxyLHMsYTtpZihvKHQpLHZvaWQgMD09PShpPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09KG49aVtlXSkpcmV0dXJuIHRoaXM7aWYobj09PXR8fG4ubGlzdGVuZXI9PT10KTA9PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCk6KGRlbGV0ZSBpW2VdLGkucmVtb3ZlTGlzdGVuZXImJnRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsZSxuLmxpc3RlbmVyfHx0KSk7ZWxzZSBpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXtmb3Iocj0tMSxzPW4ubGVuZ3RoLTE7cz49MDtzLS0paWYobltzXT09PXR8fG5bc10ubGlzdGVuZXI9PT10KXthPW5bc10ubGlzdGVuZXIscj1zO2JyZWFrfWlmKHI8MClyZXR1cm4gdGhpczswPT09cj9uLnNoaWZ0KCk6ZnVuY3Rpb24oZSx0KXtmb3IoO3QrMTxlLmxlbmd0aDt0KyspZVt0XT1lW3QrMV07ZS5wb3AoKX0obixyKSwxPT09bi5sZW5ndGgmJihpW2VdPW5bMF0pLHZvaWQgMCE9PWkucmVtb3ZlTGlzdGVuZXImJnRoaXMuZW1pdChcInJlbW92ZUxpc3RlbmVyXCIsZSxhfHx0KX1yZXR1cm4gdGhpc30scy5wcm90b3R5cGUub2ZmPXMucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyLHMucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbihlKXt2YXIgdCxuLGk7aWYodm9pZCAwPT09KG49dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZih2b2lkIDA9PT1uLnJlbW92ZUxpc3RlbmVyKXJldHVybiAwPT09YXJndW1lbnRzLmxlbmd0aD8odGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCk6dm9pZCAwIT09bltlXSYmKDA9PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCk6ZGVsZXRlIG5bZV0pLHRoaXM7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpe3ZhciByLHM9T2JqZWN0LmtleXMobik7Zm9yKGk9MDtpPHMubGVuZ3RoOysraSlcInJlbW92ZUxpc3RlbmVyXCIhPT0ocj1zW2ldKSYmdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMocik7cmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIiksdGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCx0aGlzfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mKHQ9bltlXSkpdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHQpO2Vsc2UgaWYodm9pZCAwIT09dClmb3IoaT10Lmxlbmd0aC0xO2k+PTA7aS0tKXRoaXMucmVtb3ZlTGlzdGVuZXIoZSx0W2ldKTtyZXR1cm4gdGhpc30scy5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiB1KHRoaXMsZSwhMCl9LHMucHJvdG90eXBlLnJhd0xpc3RlbmVycz1mdW5jdGlvbihlKXtyZXR1cm4gdSh0aGlzLGUsITEpfSxzLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmxpc3RlbmVyQ291bnQ/ZS5saXN0ZW5lckNvdW50KHQpOmQuY2FsbChlLHQpfSxzLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PWQscy5wcm90b3R5cGUuZXZlbnROYW1lcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9ldmVudHNDb3VudD4wP3QodGhpcy5fZXZlbnRzKTpbXX19fSx0PXt9O2Z1bmN0aW9uIG4oaSl7dmFyIHI9dFtpXTtpZih2b2lkIDAhPT1yKXJldHVybiByLmV4cG9ydHM7dmFyIHM9dFtpXT17ZXhwb3J0czp7fX07cmV0dXJuIGVbaV0ocyxzLmV4cG9ydHMsbikscy5leHBvcnRzfW4uZD0oZSx0KT0+e2Zvcih2YXIgaSBpbiB0KW4ubyh0LGkpJiYhbi5vKGUsaSkmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLGkse2VudW1lcmFibGU6ITAsZ2V0OnRbaV19KX0sbi5vPShlLHQpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KTt2YXIgaT17fTsoKCk9PntuLmQoaSx7UDooKT0+dH0pO3ZhciBlPW4oMzQzKTtjbGFzcyB0e2NvbnN0cnVjdG9yKHQpe2lmKHRoaXMuc2VydmVyX2lkPXQsdGhpcy5lbWl0dGVyPW5ldyBlLkV2ZW50RW1pdHRlciwhZmluKXRocm93IG5ldyBFcnJvcihcIk9wZW5GaW4gaXMgbm90IGF2YWlsYWJsZVwiKX1hc3luYyBzdGFydChlKXtjb25zdCB0PWF3YWl0IGZpbi5TeXN0ZW0ucXVlcnlQZXJtaXNzaW9uRm9yQ3VycmVudENvbnRleHQoXCJTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzXCIpO2lmKCF0LmdyYW50ZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXJcIik7aWYodC5yYXdWYWx1ZSl7aWYoZT8uZXhlY3V0YWJsZVBhdGgmJiF0LnJhd1ZhbHVlPy5leGVjdXRhYmxlcz8uZW5hYmxlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MuYXNzZXRzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgZnJvbSBhbiBleGVjdXRhYmxlIHBhdGhcIik7aWYoIWU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uYXNzZXRzPy5lbmFibGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcy5hc3NldHMnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlciBmcm9tIGEgVVJMXCIpfWlmKCFlPy5leGVjdXRhYmxlUGF0aCl0cnl7YXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oe2FsaWFzOlwib3BlbmZpbi1zbmFwXCJ9KX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ29wZW5maW4tc25hcCcgYXNzZXQgbXVzdCBiZSBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdFwiKX1jb25zdCBuPWF3YWl0IHRoaXMuYnVpbGRfY29tbWFuZF9saW5lKGUpO2xldCBpPXthbGlhczpcIm9wZW5maW4tc25hcFwiLGFyZ3VtZW50czpuLGxpZmV0aW1lOlwid2luZG93XCJ9O2U/LmV4ZWN1dGFibGVQYXRoJiYoaT17cGF0aDplLmV4ZWN1dGFibGVQYXRoLGFyZ3VtZW50czpuLGxpZmV0aW1lOlwid2luZG93XCJ9KTt0cnl7dGhpcy5zbmFwX2lkZW50aXR5PWF3YWl0IGZpbi5TeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzKGkpfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgJHtKU09OLnN0cmluZ2lmeShlKX1gKX1yZXR1cm4gdGhpcy5jb25uZWN0KCl9YXN5bmMgY29ubmVjdCgpe3RoaXMuY2xpZW50PWF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChgc25hcC1zZXJ2ZXItY29yZS0ke3RoaXMuc2VydmVyX2lkfWApLHRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF9oYW5kc2hha2VcIiwoYXN5bmMoZSx0KT0+e2F3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246ZS52ZXJzaW9uLGNvbXBvbmVudE5hbWU6XCJzbmFwLXNlcnZlclwifX0pfSkpLGF3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246XCIwLjIuMFwiLGNvbXBvbmVudE5hbWU6XCJzbmFwLWNsaWVudFwifX0pLHRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF91cGRhdGVzXCIsKChlLHQpPT50aGlzLmhhbmRsZVNuYXBFdmVudHMoZSx0KSkpfWFzeW5jIHN0b3AoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNodXRkb3duXCJ9KSl9YXN5bmMgZ2V0TGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2NvbnN0IGU9YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNlcmlhbGlzZUxheW91dFwifSkpO3JldHVybiBlPy5wYXlsb2FkLmxheW91dH1hc3luYyBzZXRMYXlvdXQoZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXNlcmlhbGlzZUxheW91dFwiLHBheWxvYWQ6e2xheW91dDplfX0pKX1hc3luYyBwcmVwYXJlVG9BcHBseVNuYXBzaG90KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXNldEFsbFwifSkpfWFzeW5jIGRlY29yYXRlU25hcHNob3QoZSl7cmV0dXJuey4uLmUsc25hcDphd2FpdCB0aGlzLmdldExheW91dCgpfX1hc3luYyBhcHBseVNuYXBzaG90KGUpe2Uuc25hcCYmYXdhaXQgdGhpcy5zZXRMYXlvdXQoZS5zbmFwKX1hc3luYyBsYXVuY2goZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIk5vdCBjb25uZWN0ZWQgdG8gYW4gU25hcCBzZXJ2ZXJcIik7Y29uc3QgdD17YWN0aW9uOlwic3RhcnRQcm9jZXNzXCIscGF5bG9hZDp7Li4uZSxhcmdzOmUuYXJnc3x8W119fTtpZihlLnN0cmF0ZWd5KXtjb25zdHt0eXBlOm4sLi4uaX09ZS5zdHJhdGVneTt0LnBheWxvYWQuc3RyYXRlZ3k9e3R5cGU6bixwYXJhbWV0ZXJzOnsuLi5pfX19Y29uc3Qgbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix0KSk7aWYobj8ucGF5bG9hZD8uc3VjY2VzcylyZXR1cm57cHJvY2Vzc19pZDpuLnBheWxvYWQucHJvY2Vzc19pZH07dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbGF1bmNoIHByb2Nlc3M6ICR7bj8ucGF5bG9hZD8uZXJyb3J9YCl9YXN5bmMgcmVnaXN0ZXJXaW5kb3coZSx0KXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaG9va0FuZFJlZ2lzdGVyV2luZG93XCIscGF5bG9hZDp7Y2xpZW50SWQ6ZSx3aW5kb3dIYW5kbGU6dH19KSl9YXN5bmMgZW5hYmxlQXV0b1dpbmRvd1JlZ2lzdHJhdGlvbigpe2NvbnN0IGU9ZT0+dGhpcy5oYW5kbGVOZXdXaW5kb3coZSk7cmV0dXJuIGF3YWl0IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpLmFkZExpc3RlbmVyKFwid2luZG93LWNyZWF0ZWRcIixlKSxhc3luYygpPT57YXdhaXQgZmluLlN5c3RlbS5yZW1vdmVMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSl9fWFzeW5jIGF0dGFjaFdpbmRvd3MoZSx0LG4saSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImF0dGFjaFwiLHBheWxvYWQ6e3RhcmdldENsaWVudElkOmUsdG9BdHRhY2hDbGllbnRJZDp0LHRhcmdldFNpZGU6bixvZmZzZXQ6aX19KSl9YXN5bmMgZGV0YWNoRnJvbUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXRhY2hGcm9tR3JvdXBcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKX1hc3luYyBnZXRBdHRhY2hlZChlKXtyZXR1cm4oYXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEF0dGFjaGVkSW5zdGFuY2VzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuYXR0YWNoZWR9YXN5bmMgaGFzQXR0YWNobWVudHMoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJoYXNBdHRhY2htZW50c1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmhhc0F0dGFjaG1lbnRzfWFkZEV2ZW50TGlzdGVuZXIoZSx0KXt0aGlzLmVtaXR0ZXIub24oZSx0KX1yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9mZihlLHQpfW9uY2UoZSx0KXt0aGlzLmVtaXR0ZXIub25jZShlLHQpfWFzeW5jIGhhbmRsZU5ld1dpbmRvdyhlKXtjb25zdCB0PWF3YWl0IGZpbi5XaW5kb3cud3JhcCh7dXVpZDplLnV1aWQsbmFtZTplLm5hbWV9KSxuPWF3YWl0IHQuZ2V0TmF0aXZlSWQoKTtsZXQgaT10LmlkZW50aXR5Lm5hbWU7Y29uc3Qgcj0oYXdhaXQgdC5nZXRPcHRpb25zKCkpLmN1c3RvbURhdGF8fHt9O3Iuc25hcENsaWVudElkP2k9ci5zbmFwQ2xpZW50SWQ6YXdhaXQgdC51cGRhdGVPcHRpb25zKHtjdXN0b21EYXRhOnsuLi5yLHNuYXBDbGllbnRJZDppfX0pLGF3YWl0IHRoaXMucmVnaXN0ZXJXaW5kb3coaSxuKX1lbWl0X2V2ZW50KGUsLi4udCl7dGhpcy5lbWl0dGVyLmVtaXQoZSwuLi50KX1oYW5kbGVTbmFwRXZlbnRzKGUsdCl7c3dpdGNoKHRoaXMuZW1pdF9ldmVudChcImFsbC1ldmVudHNcIix7dHlwZTplLmFjdGlvbixwYXlsb2FkOmUucGF5bG9hZH0pLGUuYWN0aW9uKXtjYXNlXCJjbGllbnRSZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXJlZ2lzdGVyZWRcIix7Y2xpZW50SWQ6ZS5wYXlsb2FkLmNsaWVudElkLHdpbmRvd0hhbmRsZTpgIyR7ZS5wYXlsb2FkLndpbmRvd0hhbmRsZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gLG93bmluZ1Byb2Nlc3NJZDplLnBheWxvYWQub3duaW5nUHJvY2Vzc0lkfSk7YnJlYWs7Y2FzZVwiY2xpZW50VW5SZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJtb3ZlU2l6ZUNvbXBsZXRlZFwiOnRoaXMuZW1pdF9ldmVudChcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50c0F0dGFjaGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50cy1hdHRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZXRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZXRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJncm91cHNDaGFuZ2VkXCI6dGhpcy5lbWl0X2V2ZW50KFwiZ3JvdXBzLWNoYW5nZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50QWN0aXZhdGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZWFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KX19YXN5bmMgYnVpbGRfY29tbWFuZF9saW5lKGUpe2xldCB0PWAtLWlkICR7dGhpcy5zZXJ2ZXJfaWR9IGA7ZT8uc2hvd0RlYnVnJiYodCs9XCIgLS1zaG93LWRlYnVnIFwiKSxlPy5kaXNhYmxlR1BVQWNjZWxlcmF0ZWREcmFnZ2luZyYmKHQrPVwiIC0tZGlzYWJsZS1ncHUtYWNjZWxlcmF0ZWQtZHJhZ2dpbmcgdHJ1ZSBcIiksZT8uZGlzYWJsZUJsdXJEcm9wUHJldmlldyYmKHQrPVwiIC0tYmx1ci1kcm9wLXByZXZpZXcgZmFsc2UgXCIpO2NvbnN0IG49YXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO3JldHVybiB0Kz1gLS1ydW50aW1lLXBvcnQgJHtuLnBvcnR9IGAsdCs9YC0tcnVudGltZS12ZXJzaW9uICR7bi52ZXJzaW9ufSBgLHQudHJpbSgpfX19KSgpO3ZhciByPWkuUDtleHBvcnR7ciBhcyBTbmFwU2VydmVyfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIFNuYXAgZnJvbSBcIkBvcGVuZmluL3NuYXAtc2RrXCI7XG5cbmNvbnN0IFRFU1RfQVBQX1dJTkRPV19JRCA9IFwic25hcC1leGFtcGxlLW5hdGl2ZS10ZXN0LWFwcC1pZFwiO1xuXG4vLyBUaGUgRE9NIGVsZW1lbnRzXG5sZXQgY2hrU2hvd0RlYnVnV2luZG93OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBidG5TdGFydDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blN0b3A6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5OYXRpdmVUZXN0QXBwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VsQXR0YWNoUG9zaXRpb246IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBidG5BdHRhY2hUb1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkRldGFjaEZyb21XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRMYXlvdXQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRBdHRhY2hlZDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VydmVyU3RhdHVzOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB8IG51bGw7XG5sZXQgbG9nZ2luZzogSFRNTFByZUVsZW1lbnQgfCBudWxsO1xuXG5sZXQgc2VydmVyU3RhdGU6IFwic3RhcnRpbmdcIiB8IFwic3RhcnRlZFwiIHwgXCJzdG9wcGluZ1wiIHwgXCJzdG9wcGVkXCIgPSBcInN0b3BwZWRcIjtcbmxldCBpc1dpbmRvd09wZW4gPSBmYWxzZTtcbmxldCBpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5sZXQgc2VydmVyOiBTbmFwLlNuYXBTZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbi8vIFdhaXQgZm9yIHRoZSBET00gdG8gZmluaXNoIGxvYWRpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG5cdC8vIFBsYXRmb3JtIGhhcyBsb2FkZWQgc28gaW5pdGlhbGl6ZSB0aGUgRE9NXG5cdGF3YWl0IGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTSBlbGVtZW50cy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y2hrU2hvd0RlYnVnV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtTaG93RGVidWdXaW5kb3dcIik7XG5cdGJ0blN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU3RhcnRcIik7XG5cdGJ0blN0b3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdG9wXCIpO1xuXHRzZXJ2ZXJTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQYXJhZ3JhcGhFbGVtZW50PihcIiNzZXJ2ZXJTdGF0dXNcIik7XG5cdGJ0bk5hdGl2ZVRlc3RBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5OYXRpdmVUZXN0QXBwXCIpO1xuXHRzZWxBdHRhY2hQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbEF0dGFjaFBvc2l0aW9uXCIpO1xuXHRidG5BdHRhY2hUb1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkF0dGFjaFRvV2luZG93XCIpO1xuXHRidG5EZXRhY2hGcm9tV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuRGV0YWNoRnJvbVdpbmRvd1wiKTtcblx0YnRuR2V0TGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0TGF5b3V0XCIpO1xuXHRidG5HZXRBdHRhY2hlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldEF0dGFjaGVkXCIpO1xuXHRsb2dnaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUHJlRWxlbWVudD4oXCIjbG9nZ2luZ1wiKTtcblx0YnRuQ2xlYXJMb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5DbGVhckxvZ1wiKTtcblxuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkICYmXG5cdFx0YnRuQ2xlYXJMb2dcblx0KSB7XG5cdFx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0XHRjb25zdCBtYW5pZmVzdCA9IGF3YWl0IGFwcC5nZXRNYW5pZmVzdCgpO1xuXG5cdFx0aWYgKG1hbmlmZXN0LmFwcEFzc2V0cz8uWzBdLnNyYyA9PT0gXCJTTkFQX0FTU0VUX1VSTFwiKSB7XG5cdFx0XHRsb2dFcnJvcihcblx0XHRcdFx0XCJQbGVhc2UgcmVxdWVzdCB0aGUgU05BUF9BU1NFVF9VUkwgZnJvbSBPcGVuRmluIGFuZCB1cGRhdGUgbWFuaWZlc3QuZmluLmpzb24gYmVmb3JlIHJ1bm5pbmcgdGhlIHNhbXBsZVwiXG5cdFx0XHQpO1xuXHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGluZ1wiO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFN0YXJ0aW5nIFNuYXAgU2VydmVyIHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH1gKTtcblx0XHRcdFx0XHRzZXJ2ZXIgPSBuZXcgU25hcC5TbmFwU2VydmVyKGZpbi5tZS5pZGVudGl0eS51dWlkKTtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RhcnQoeyBzaG93RGVidWc6IGNoa1Nob3dEZWJ1Z1dpbmRvdz8uY2hlY2tlZCB9KTtcblxuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudFJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBSZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC11bnJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudFVuUmVnaXN0ZXJlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IFVucmVnaXN0ZXJlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudHMtYXR0YWNoZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudHNBdHRhY2hlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50cyBBdHRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuYXR0YWNoZWRDbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1kZXRhY2hlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50RGV0YWNoZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBEZXRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWFjdGl2YXRlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50QWN0aXZhdGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgQWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1kZWFjdGl2YXRlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50RGVhY3RpdmF0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBEZWFjdGl2YXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3ZlLXNpemUtY29tcGxldGVkXCIsIChldmVudDogU25hcC5Nb3ZlU2l6ZUNvbXBsZXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgTW92ZSBTaXplIENvbXBsZXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJncm91cHMtY2hhbmdlZFwiLCAoZXZlbnQ6IFNuYXAuR3JvdXBzQ2hhbmdlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgR3JvdXBzIENoYW5nZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdGFydGVkIFNuYXAgU2VydmVyXCIpO1xuXG5cdFx0XHRcdFx0Y29uc3Qgd2luID0gZmluLldpbmRvdy5nZXRDdXJyZW50U3luYygpO1xuXHRcdFx0XHRcdGNvbnN0IG5hdGl2ZUlkID0gYXdhaXQgd2luLmdldE5hdGl2ZUlkKCk7XG5cblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIucmVnaXN0ZXJXaW5kb3coZmluLm1lLmlkZW50aXR5LnV1aWQsIG5hdGl2ZUlkKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdGBSZWdpc3RlcmluZyBQbGF0Zm9ybSBXaW5kb3cgd2l0aCBJZCAke2Zpbi5tZS5pZGVudGl0eS51dWlkfSBhbmQgaGFuZGxlICR7bmF0aXZlSWR9YFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RhcnRlZFwiO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0blN0b3AuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RvcHBpbmdcIjtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBpbmcgU25hcCBTZXJ2ZXJcIik7XG5cdFx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdFx0YXdhaXQgc2VydmVyLmRldGFjaEZyb21Hcm91cChURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgc2VydmVyLnN0b3AoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdG9wcGVkIFNuYXAgU2VydmVyXCIpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRzZXJ2ZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0b3BwZWRcIjtcblx0XHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHJ1bnRpbWVJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO1xuXHRcdFx0XHRjb25zdCBhcHBBc3NldEluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7IGFsaWFzOiBcInNuYXAtbmF0aXZlLXRlc3QtYXBwXCIgfSk7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0XHRcdGNvbnN0IGxvY2FsQXBwVXJsID0gKHJ1bnRpbWVJbmZvLmFyZ3MgYXMgYW55KVtcImxvY2FsLXN0YXJ0dXAtdXJsXCJdLnJlcGxhY2UoXCJjb25maWcuanNvblwiLCBcIlwiKTtcblx0XHRcdFx0YXdhaXQgbGF1bmNoQXBwKFxuXHRcdFx0XHRcdFwiTmF0aXZlIFRlc3QgQXBwXCIsXG5cdFx0XHRcdFx0VEVTVF9BUFBfV0lORE9XX0lELFxuXHRcdFx0XHRcdGAke2xvY2FsQXBwVXJsfWFzc2V0c1xcXFwke2FwcEFzc2V0SW5mby5hbGlhc31cXFxcJHthcHBBc3NldEluZm8udmVyc2lvbn1cXFxcJHthcHBBc3NldEluZm8udGFyZ2V0fWAsXG5cdFx0XHRcdFx0W10sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJ3YWl0Rm9yV2luZG93T2ZOYW1lXCIsXG5cdFx0XHRcdFx0XHR0aW1lb3V0TXM6IDE1MDAwLFxuXHRcdFx0XHRcdFx0bWF0Y2hSZWdleDogXCJeTmF0aXZlIFRlc3QgQXBwJFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpc1dpbmRvd09wZW4gPSB0cnVlO1xuXHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIgJiYgc2VsQXR0YWNoUG9zaXRpb24pIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNlbEF0dGFjaFBvc2l0aW9uLnZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5hdHRhY2hXaW5kb3dzKGZpbi5tZS5pZGVudGl0eS51dWlkLCBURVNUX0FQUF9XSU5ET1dfSUQsIHZhbHVlIGFzIFNuYXAuQXR0YWNoU2lkZSwgMCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuQ2xlYXJMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0bG9nQ2xlYXIoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRMYXlvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGxheW91dCA9IGF3YWl0IHNlcnZlci5nZXRMYXlvdXQoKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIkxheW91dFwiKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShsYXlvdXQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRBdHRhY2hlZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXR0YWNoZWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0QXR0YWNoZWQoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiQXR0YWNoZWRcIik7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoYXR0YWNoZWQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgRE9NIGVsZW1lbnRzIHdpdGggdGhlIHN0YXRlIG9mIHRoZSBjb25uZWN0aW9uLlxuICovXG5mdW5jdGlvbiB1cGRhdGVTZXJ2ZXJTdGF0dXMoKTogdm9pZCB7XG5cdGlmIChcblx0XHRjaGtTaG93RGVidWdXaW5kb3cgJiZcblx0XHRidG5TdGFydCAmJlxuXHRcdGJ0blN0b3AgJiZcblx0XHRzZXJ2ZXJTdGF0dXMgJiZcblx0XHRidG5OYXRpdmVUZXN0QXBwICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0c2VsQXR0YWNoUG9zaXRpb24gJiZcblx0XHRidG5HZXRMYXlvdXQgJiZcblx0XHRidG5HZXRBdHRhY2hlZFxuXHQpIHtcblx0XHRpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRpbmdcIiB8fCBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGluZ1wiKSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0QXR0YWNoZWQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gYFNuYXAgU2VydmVyIGlzICR7c2VydmVyU3RhdGV9YDtcblx0XHR9IGVsc2UgaWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0ZWRcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0QXR0YWNoZWQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RhcnRlZFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIlNuYXAgU2VydmVyIGlzIHN0b3BwZWRcIjtcblx0XHR9XG5cdH1cblx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBVSSBiYXNlZCBvbiB0aGUgd2luZG93IHN0YXRlLlxuICovXG5mdW5jdGlvbiB1cGRhdGVXaW5kb3dTdGF0dXMoKTogdm9pZCB7XG5cdGlmIChidG5OYXRpdmVUZXN0QXBwICYmIHNlbEF0dGFjaFBvc2l0aW9uICYmIGJ0bkF0dGFjaFRvV2luZG93ICYmIGJ0bkRldGFjaEZyb21XaW5kb3cpIHtcblx0XHRpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRpbmdcIiB8fCBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGluZ1wiKSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRlZFwiICYmIGlzV2luZG93T3Blbikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gIWlzV2luZG93QXR0YWNoZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGVkXCI7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGluZm9ybWF0aW9uIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBpbmZvcm1hdGlvbiBUaGUgaW5mb3JtYXRpb24gdG8gc2VuZC5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mb3JtYXRpb246IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fSR7aW5mb3JtYXRpb259XFxuXFxuYDtcblx0XHRsb2dnaW5nLnNjcm9sbFRvcCA9IGxvZ2dpbmcuc2Nyb2xsSGVpZ2h0O1xuXHR9XG59XG5cbi8qKlxuICogU2VuZCBlcnJvciB0byB0aGUgbG9nIGRpc3BsYXkuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dFcnJvcihlcnI6IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fUVSUk9SOiAke2Vycn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgbG9nIGRpc3BsYXkuXG4gKi9cbmZ1bmN0aW9uIGxvZ0NsZWFyKCk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gMDtcblx0fVxufVxuXG4vKipcbiAqIExhdW5jaCBhbiBhcHBsaWNhdGlvbiB1c2luZyBTbmFwLlxuICogQHBhcmFtIGFwcE5hbWUgVGhlIG5hbWUgb2YgdGhlIGFwcCB0aGF0IGlzIGJlaW5nIGxhdW5jaGVkLlxuICogQHBhcmFtIGNsaWVudElkIEFuIElkIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBsYXVuY2hlZCBhcHAuXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXBwIHRvIGxhdW5jaC5cbiAqIEBwYXJhbSBhcmdzIEFkZGl0aW9uYWwgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBmb3IgdGhlIGxhdW5jaC5cbiAqIEBwYXJhbSBzdHJhdGVneSBUaGUgc3RyYXRlZ3kgdG8gbGF1bmNoIHRoZSB3aW5kb3cgd2l0aC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbGF1bmNoQXBwKFxuXHRhcHBOYW1lOiBzdHJpbmcsXG5cdGNsaWVudElkOiBzdHJpbmcsXG5cdHBhdGg6IHN0cmluZyxcblx0YXJnczogc3RyaW5nW10sXG5cdHN0cmF0ZWd5OiBTbmFwLkxhdW5jaFN0cmF0ZWd5XG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgTGF1bmNoaW5nICR7YXBwTmFtZX1gKTtcblx0XHRcdGNvbnN0IGxhdW5jaFJlc3VsdCA9IGF3YWl0IHNlcnZlci5sYXVuY2goe1xuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRjbGllbnRJZCxcblx0XHRcdFx0YXJncyxcblx0XHRcdFx0c3RyYXRlZ3lcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAobGF1bmNoUmVzdWx0Py5wcm9jZXNzX2lkKSB7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGAke2FwcE5hbWV9IGxhdW5jaGVkIHdpdGggcHJvY2VzcyBpZCAke2xhdW5jaFJlc3VsdC5wcm9jZXNzX2lkfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==