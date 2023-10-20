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
var e={343:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,e.exports.once=function(e,t){return new Promise((function(n,i){function r(n){e.removeListener(t,a),i(n)}function a(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,a,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,n)}(e,r,{once:!0})}))},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var s=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function p(e,t,n,i){var r,a,s,p;if(o(n),void 0===(a=e._events)?(a=e._events=Object.create(null),e._eventsCount=0):(void 0!==a.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),a=e._events),s=a[t]),void 0===s)s=a[t]=n,++e._eventsCount;else if("function"==typeof s?s=a[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=c(e))>0&&s.length>r&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,p=l,console&&console.warn&&console.warn(p)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=l.bind(i);return r.listener=n,i.wrapFn=r,r}function u(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):f(r,r.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function v(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(a){i.once&&e.removeEventListener(t,r),n(a)}))}}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,a=this._events;if(void 0!==a)r=r&&void 0===a.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var o=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw o.context=s,o}var c=a[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var p=c.length,l=f(c,p);for(n=0;n<p;++n)i(l[n],this,t)}return!0},a.prototype.addListener=function(e,t){return p(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return p(this,e,t,!0)},a.prototype.once=function(e,t){return o(t),this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,r,a,s;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,a=n.length-1;a>=0;a--)if(n[a]===t||n[a].listener===t){s=n[a].listener,r=a;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,a=Object.keys(n);for(i=0;i<a.length;++i)"removeListener"!==(r=a[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return u(this,e,!0)},a.prototype.rawListeners=function(e){return u(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},a.prototype.listenerCount=d,a.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{n.d(i,{P:()=>t});var e=n(343);class t{constructor(t){if(this.server_id=t,this.emitter=new e.EventEmitter,!fin)throw new Error("OpenFin is not available")}async start(e){const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(t.rawValue){if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL")}if(!e?.executablePath)try{await fin.System.getAppAssetInfo({alias:"openfin-snap"})}catch(e){throw new Error("The 'openfin-snap' asset must be defined in the manifest")}const n=await this.build_command_line(e);let i={alias:"openfin-snap",arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error(`Failed to launch the Snap server ${JSON.stringify(e)}`)}return this.connect()}async connect(){this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",(async(e,t)=>{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:e.version,componentName:"snap-server"}})})),await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"0.2.0-beta.1",componentName:"snap-client"}}),this.client.register("snap_updates",((e,t)=>this.handleSnapEvents(e,t)))}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e}}))}async prepareToApplySnapshot(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}))}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){e.snap&&await this.setLayout(e.snap)}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t}}))}async enableAutoWindowRegistration(){const e=e=>this.handleNewWindow(e);return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async handleNewWindow(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const r=(await t.getOptions()).customData||{};r.snapClientId?i=r.snapClientId:await t.updateOptions({customData:{...r,snapClientId:i}}),await this.registerWindow(i,n)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug "),e?.disableGPUAcceleratedDragging&&(t+=" --disable-gpu-accelerated-dragging true "),e?.disableBlurDropPreview&&(t+=" --blur-drop-preview false ");const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}})();var r=i.P;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7WUFFSCxJQUFJLFlBQVksRUFBRSxVQUFVLEVBQUU7Z0JBQzdCLGNBQWMsQ0FBQyxHQUFHLE9BQU8sNkJBQTZCLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQ2pGO1NBQ0Q7S0FDRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ2IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3BlbmZpbi9zbmFwLXNkay9vcGVuZmluLnNuYXAubWpzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvLi9jbGllbnQvc3JjL3Byb3ZpZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBlPXszNDM6ZT0+e3ZhciB0LG49XCJvYmplY3RcIj09dHlwZW9mIFJlZmxlY3Q/UmVmbGVjdDpudWxsLGk9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5hcHBseT9uLmFwcGx5OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoZSx0LG4pfTt0PW4mJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4ub3duS2V5cz9uLm93bktleXM6T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz9mdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSkuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSkpfTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSl9O3ZhciByPU51bWJlci5pc05hTnx8ZnVuY3Rpb24oZSl7cmV0dXJuIGUhPWV9O2Z1bmN0aW9uIGEoKXthLmluaXQuY2FsbCh0aGlzKX1lLmV4cG9ydHM9YSxlLmV4cG9ydHMub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24obixpKXtmdW5jdGlvbiByKG4pe2UucmVtb3ZlTGlzdGVuZXIodCxhKSxpKG4pfWZ1bmN0aW9uIGEoKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnJlbW92ZUxpc3RlbmVyJiZlLnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIixyKSxuKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSl9dihlLHQsYSx7b25jZTohMH0pLFwiZXJyb3JcIiE9PXQmJmZ1bmN0aW9uKGUsdCxuKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uJiZ2KGUsXCJlcnJvclwiLHQsbil9KGUscix7b25jZTohMH0pfSkpfSxhLkV2ZW50RW1pdHRlcj1hLGEucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLGEucHJvdG90eXBlLl9ldmVudHNDb3VudD0wLGEucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dm9pZCAwO3ZhciBzPTEwO2Z1bmN0aW9uIG8oZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKX1mdW5jdGlvbiBjKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/YS5kZWZhdWx0TWF4TGlzdGVuZXJzOmUuX21heExpc3RlbmVyc31mdW5jdGlvbiBwKGUsdCxuLGkpe3ZhciByLGEscyxwO2lmKG8obiksdm9pZCAwPT09KGE9ZS5fZXZlbnRzKT8oYT1lLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSxlLl9ldmVudHNDb3VudD0wKToodm9pZCAwIT09YS5uZXdMaXN0ZW5lciYmKGUuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxuLmxpc3RlbmVyP24ubGlzdGVuZXI6biksYT1lLl9ldmVudHMpLHM9YVt0XSksdm9pZCAwPT09cylzPWFbdF09biwrK2UuX2V2ZW50c0NvdW50O2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygcz9zPWFbdF09aT9bbixzXTpbcyxuXTppP3MudW5zaGlmdChuKTpzLnB1c2gobiksKHI9YyhlKSk+MCYmcy5sZW5ndGg+ciYmIXMud2FybmVkKXtzLndhcm5lZD0hMDt2YXIgbD1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK3MubGVuZ3RoK1wiIFwiK1N0cmluZyh0KStcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO2wubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLGwuZW1pdHRlcj1lLGwudHlwZT10LGwuY291bnQ9cy5sZW5ndGgscD1sLGNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKHApfXJldHVybiBlfWZ1bmN0aW9uIGwoKXtpZighdGhpcy5maXJlZClyZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLHRoaXMud3JhcEZuKSx0aGlzLmZpcmVkPSEwLDA9PT1hcmd1bWVudHMubGVuZ3RoP3RoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk6dGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCxhcmd1bWVudHMpfWZ1bmN0aW9uIGgoZSx0LG4pe3ZhciBpPXtmaXJlZDohMSx3cmFwRm46dm9pZCAwLHRhcmdldDplLHR5cGU6dCxsaXN0ZW5lcjpufSxyPWwuYmluZChpKTtyZXR1cm4gci5saXN0ZW5lcj1uLGkud3JhcEZuPXIscn1mdW5jdGlvbiB1KGUsdCxuKXt2YXIgaT1lLl9ldmVudHM7aWYodm9pZCAwPT09aSlyZXR1cm5bXTt2YXIgcj1pW3RdO3JldHVybiB2b2lkIDA9PT1yP1tdOlwiZnVuY3Rpb25cIj09dHlwZW9mIHI/bj9bci5saXN0ZW5lcnx8cl06W3JdOm4/ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBBcnJheShlLmxlbmd0aCksbj0wO248dC5sZW5ndGg7KytuKXRbbl09ZVtuXS5saXN0ZW5lcnx8ZVtuXTtyZXR1cm4gdH0ocik6ZihyLHIubGVuZ3RoKX1mdW5jdGlvbiBkKGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT10KXt2YXIgbj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pcmV0dXJuIDE7aWYodm9pZCAwIT09bilyZXR1cm4gbi5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgbj1uZXcgQXJyYXkodCksaT0wO2k8dDsrK2kpbltpXT1lW2ldO3JldHVybiBufWZ1bmN0aW9uIHYoZSx0LG4saSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbilpLm9uY2U/ZS5vbmNlKHQsbik6ZS5vbih0LG4pO2Vsc2V7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZS5hZGRFdmVudExpc3RlbmVyKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO2UuYWRkRXZlbnRMaXN0ZW5lcih0LChmdW5jdGlvbiByKGEpe2kub25jZSYmZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsciksbihhKX0pKX19T2JqZWN0LmRlZmluZVByb3BlcnR5KGEsXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHN9LHNldDpmdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxyKGUpKXRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJytlK1wiLlwiKTtzPWV9fSksYS5pbml0PWZ1bmN0aW9uKCl7dm9pZCAwIT09dGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHMhPT1PYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApLHRoaXMuX21heExpc3RlbmVycz10aGlzLl9tYXhMaXN0ZW5lcnN8fHZvaWQgMH0sYS5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fHIoZSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK2UrXCIuXCIpO3JldHVybiB0aGlzLl9tYXhMaXN0ZW5lcnM9ZSx0aGlzfSxhLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oKXtyZXR1cm4gYyh0aGlzKX0sYS5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbihlKXtmb3IodmFyIHQ9W10sbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspdC5wdXNoKGFyZ3VtZW50c1tuXSk7dmFyIHI9XCJlcnJvclwiPT09ZSxhPXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT1hKXI9ciYmdm9pZCAwPT09YS5lcnJvcjtlbHNlIGlmKCFyKXJldHVybiExO2lmKHIpe3ZhciBzO2lmKHQubGVuZ3RoPjAmJihzPXRbMF0pLHMgaW5zdGFuY2VvZiBFcnJvcil0aHJvdyBzO3ZhciBvPW5ldyBFcnJvcihcIlVuaGFuZGxlZCBlcnJvci5cIisocz9cIiAoXCIrcy5tZXNzYWdlK1wiKVwiOlwiXCIpKTt0aHJvdyBvLmNvbnRleHQ9cyxvfXZhciBjPWFbZV07aWYodm9pZCAwPT09YylyZXR1cm4hMTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjKWkoYyx0aGlzLHQpO2Vsc2V7dmFyIHA9Yy5sZW5ndGgsbD1mKGMscCk7Zm9yKG49MDtuPHA7KytuKWkobFtuXSx0aGlzLHQpfXJldHVybiEwfSxhLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBwKHRoaXMsZSx0LCExKX0sYS5wcm90b3R5cGUub249YS5wcm90b3R5cGUuYWRkTGlzdGVuZXIsYS5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHAodGhpcyxlLHQsITApfSxhLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG8odCksdGhpcy5vbihlLGgodGhpcyxlLHQpKSx0aGlzfSxhLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG8odCksdGhpcy5wcmVwZW5kTGlzdGVuZXIoZSxoKHRoaXMsZSx0KSksdGhpc30sYS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXt2YXIgbixpLHIsYSxzO2lmKG8odCksdm9pZCAwPT09KGk9dGhpcy5fZXZlbnRzKSlyZXR1cm4gdGhpcztpZih2b2lkIDA9PT0obj1pW2VdKSlyZXR1cm4gdGhpcztpZihuPT09dHx8bi5saXN0ZW5lcj09PXQpMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTooZGVsZXRlIGlbZV0saS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLG4ubGlzdGVuZXJ8fHQpKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pe2ZvcihyPS0xLGE9bi5sZW5ndGgtMTthPj0wO2EtLSlpZihuW2FdPT09dHx8blthXS5saXN0ZW5lcj09PXQpe3M9blthXS5saXN0ZW5lcixyPWE7YnJlYWt9aWYocjwwKXJldHVybiB0aGlzOzA9PT1yP24uc2hpZnQoKTpmdW5jdGlvbihlLHQpe2Zvcig7dCsxPGUubGVuZ3RoO3QrKyllW3RdPWVbdCsxXTtlLnBvcCgpfShuLHIpLDE9PT1uLmxlbmd0aCYmKGlbZV09blswXSksdm9pZCAwIT09aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLHN8fHQpfXJldHVybiB0aGlzfSxhLnByb3RvdHlwZS5vZmY9YS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIsYS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LG4saTtpZih2b2lkIDA9PT0obj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PW4ucmVtb3ZlTGlzdGVuZXIpcmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKTp2b2lkIDAhPT1uW2VdJiYoMD09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTpkZWxldGUgbltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7dmFyIHIsYT1PYmplY3Qua2V5cyhuKTtmb3IoaT0wO2k8YS5sZW5ndGg7KytpKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShyPWFbaV0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhyKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wLHRoaXN9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YodD1uW2VdKSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdCk7ZWxzZSBpZih2b2lkIDAhPT10KWZvcihpPXQubGVuZ3RoLTE7aT49MDtpLS0pdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbaV0pO3JldHVybiB0aGlzfSxhLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHUodGhpcyxlLCEwKX0sYS5wcm90b3R5cGUucmF3TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiB1KHRoaXMsZSwhMSl9LGEubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6ZC5jYWxsKGUsdCl9LGEucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9ZCxhLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/dCh0aGlzLl9ldmVudHMpOltdfX19LHQ9e307ZnVuY3Rpb24gbihpKXt2YXIgcj10W2ldO2lmKHZvaWQgMCE9PXIpcmV0dXJuIHIuZXhwb3J0czt2YXIgYT10W2ldPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtpXShhLGEuZXhwb3J0cyxuKSxhLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciBpIGluIHQpbi5vKHQsaSkmJiFuLm8oZSxpKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsaSx7ZW51bWVyYWJsZTohMCxnZXQ6dFtpXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpO3ZhciBpPXt9OygoKT0+e24uZChpLHtQOigpPT50fSk7dmFyIGU9bigzNDMpO2NsYXNzIHR7Y29uc3RydWN0b3IodCl7aWYodGhpcy5zZXJ2ZXJfaWQ9dCx0aGlzLmVtaXR0ZXI9bmV3IGUuRXZlbnRFbWl0dGVyLCFmaW4pdGhyb3cgbmV3IEVycm9yKFwiT3BlbkZpbiBpcyBub3QgYXZhaWxhYmxlXCIpfWFzeW5jIHN0YXJ0KGUpe2NvbnN0IHQ9YXdhaXQgZmluLlN5c3RlbS5xdWVyeVBlcm1pc3Npb25Gb3JDdXJyZW50Q29udGV4dChcIlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3NcIik7aWYoIXQuZ3JhbnRlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlclwiKTtpZih0LnJhd1ZhbHVlKXtpZihlPy5leGVjdXRhYmxlUGF0aCYmIXQucmF3VmFsdWU/LmV4ZWN1dGFibGVzPy5lbmFibGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcy5hc3NldHMnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlciBmcm9tIGFuIGV4ZWN1dGFibGUgcGF0aFwiKTtpZighZT8uZXhlY3V0YWJsZVBhdGgmJiF0LnJhd1ZhbHVlPy5hc3NldHM/LmVuYWJsZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzLmFzc2V0cycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyIGZyb20gYSBVUkxcIil9aWYoIWU/LmV4ZWN1dGFibGVQYXRoKXRyeXthd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6XCJvcGVuZmluLXNuYXBcIn0pfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihcIlRoZSAnb3BlbmZpbi1zbmFwJyBhc3NldCBtdXN0IGJlIGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0XCIpfWNvbnN0IG49YXdhaXQgdGhpcy5idWlsZF9jb21tYW5kX2xpbmUoZSk7bGV0IGk9e2FsaWFzOlwib3BlbmZpbi1zbmFwXCIsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn07ZT8uZXhlY3V0YWJsZVBhdGgmJihpPXtwYXRoOmUuZXhlY3V0YWJsZVBhdGgsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn0pO3RyeXt0aGlzLnNuYXBfaWRlbnRpdHk9YXdhaXQgZmluLlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MoaSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlciAke0pTT04uc3RyaW5naWZ5KGUpfWApfXJldHVybiB0aGlzLmNvbm5lY3QoKX1hc3luYyBjb25uZWN0KCl7dGhpcy5jbGllbnQ9YXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGBzbmFwLXNlcnZlci1jb3JlLSR7dGhpcy5zZXJ2ZXJfaWR9YCksdGhpcy5jbGllbnQucmVnaXN0ZXIoXCJzbmFwX2hhbmRzaGFrZVwiLChhc3luYyhlLHQpPT57YXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjplLnZlcnNpb24sY29tcG9uZW50TmFtZTpcInNuYXAtc2VydmVyXCJ9fSl9KSksYXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjpcIjAuMi4wLWJldGEuMVwiLGNvbXBvbmVudE5hbWU6XCJzbmFwLWNsaWVudFwifX0pLHRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF91cGRhdGVzXCIsKChlLHQpPT50aGlzLmhhbmRsZVNuYXBFdmVudHMoZSx0KSkpfWFzeW5jIHN0b3AoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNodXRkb3duXCJ9KSl9YXN5bmMgZ2V0TGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2NvbnN0IGU9YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNlcmlhbGlzZUxheW91dFwifSkpO3JldHVybiBlPy5wYXlsb2FkLmxheW91dH1hc3luYyBzZXRMYXlvdXQoZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXNlcmlhbGlzZUxheW91dFwiLHBheWxvYWQ6e2xheW91dDplfX0pKX1hc3luYyBwcmVwYXJlVG9BcHBseVNuYXBzaG90KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXNldEFsbFwifSkpfWFzeW5jIGRlY29yYXRlU25hcHNob3QoZSl7cmV0dXJuey4uLmUsc25hcDphd2FpdCB0aGlzLmdldExheW91dCgpfX1hc3luYyBhcHBseVNuYXBzaG90KGUpe2Uuc25hcCYmYXdhaXQgdGhpcy5zZXRMYXlvdXQoZS5zbmFwKX1hc3luYyBsYXVuY2goZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIk5vdCBjb25uZWN0ZWQgdG8gYW4gU25hcCBzZXJ2ZXJcIik7Y29uc3QgdD17YWN0aW9uOlwic3RhcnRQcm9jZXNzXCIscGF5bG9hZDp7Li4uZSxhcmdzOmUuYXJnc3x8W119fTtpZihlLnN0cmF0ZWd5KXtjb25zdHt0eXBlOm4sLi4uaX09ZS5zdHJhdGVneTt0LnBheWxvYWQuc3RyYXRlZ3k9e3R5cGU6bixwYXJhbWV0ZXJzOnsuLi5pfX19Y29uc3Qgbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix0KSk7aWYobj8ucGF5bG9hZD8uc3VjY2VzcylyZXR1cm57cHJvY2Vzc19pZDpuLnBheWxvYWQucHJvY2Vzc19pZH07dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbGF1bmNoIHByb2Nlc3M6ICR7bj8ucGF5bG9hZD8uZXJyb3J9YCl9YXN5bmMgcmVnaXN0ZXJXaW5kb3coZSx0KXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaG9va0FuZFJlZ2lzdGVyV2luZG93XCIscGF5bG9hZDp7Y2xpZW50SWQ6ZSx3aW5kb3dIYW5kbGU6dH19KSl9YXN5bmMgZW5hYmxlQXV0b1dpbmRvd1JlZ2lzdHJhdGlvbigpe2NvbnN0IGU9ZT0+dGhpcy5oYW5kbGVOZXdXaW5kb3coZSk7cmV0dXJuIGF3YWl0IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpLmFkZExpc3RlbmVyKFwid2luZG93LWNyZWF0ZWRcIixlKSxhc3luYygpPT57YXdhaXQgZmluLlN5c3RlbS5yZW1vdmVMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSl9fWFzeW5jIGF0dGFjaFdpbmRvd3MoZSx0LG4saSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImF0dGFjaFwiLHBheWxvYWQ6e3RhcmdldENsaWVudElkOmUsdG9BdHRhY2hDbGllbnRJZDp0LHRhcmdldFNpZGU6bixvZmZzZXQ6aX19KSl9YXN5bmMgZGV0YWNoRnJvbUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXRhY2hGcm9tR3JvdXBcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKX1hc3luYyBnZXRBdHRhY2hlZChlKXtyZXR1cm4oYXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEF0dGFjaGVkSW5zdGFuY2VzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuYXR0YWNoZWR9YXN5bmMgaGFzQXR0YWNobWVudHMoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJoYXNBdHRhY2htZW50c1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmhhc0F0dGFjaG1lbnRzfWFkZEV2ZW50TGlzdGVuZXIoZSx0KXt0aGlzLmVtaXR0ZXIub24oZSx0KX1yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9mZihlLHQpfW9uY2UoZSx0KXt0aGlzLmVtaXR0ZXIub25jZShlLHQpfWFzeW5jIGhhbmRsZU5ld1dpbmRvdyhlKXtjb25zdCB0PWF3YWl0IGZpbi5XaW5kb3cud3JhcCh7dXVpZDplLnV1aWQsbmFtZTplLm5hbWV9KSxuPWF3YWl0IHQuZ2V0TmF0aXZlSWQoKTtsZXQgaT10LmlkZW50aXR5Lm5hbWU7Y29uc3Qgcj0oYXdhaXQgdC5nZXRPcHRpb25zKCkpLmN1c3RvbURhdGF8fHt9O3Iuc25hcENsaWVudElkP2k9ci5zbmFwQ2xpZW50SWQ6YXdhaXQgdC51cGRhdGVPcHRpb25zKHtjdXN0b21EYXRhOnsuLi5yLHNuYXBDbGllbnRJZDppfX0pLGF3YWl0IHRoaXMucmVnaXN0ZXJXaW5kb3coaSxuKX1lbWl0X2V2ZW50KGUsLi4udCl7dGhpcy5lbWl0dGVyLmVtaXQoZSwuLi50KX1oYW5kbGVTbmFwRXZlbnRzKGUsdCl7c3dpdGNoKHRoaXMuZW1pdF9ldmVudChcImFsbC1ldmVudHNcIix7dHlwZTplLmFjdGlvbixwYXlsb2FkOmUucGF5bG9hZH0pLGUuYWN0aW9uKXtjYXNlXCJjbGllbnRSZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXJlZ2lzdGVyZWRcIix7Y2xpZW50SWQ6ZS5wYXlsb2FkLmNsaWVudElkLHdpbmRvd0hhbmRsZTpgIyR7ZS5wYXlsb2FkLndpbmRvd0hhbmRsZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gLG93bmluZ1Byb2Nlc3NJZDplLnBheWxvYWQub3duaW5nUHJvY2Vzc0lkfSk7YnJlYWs7Y2FzZVwiY2xpZW50VW5SZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJtb3ZlU2l6ZUNvbXBsZXRlZFwiOnRoaXMuZW1pdF9ldmVudChcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50c0F0dGFjaGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50cy1hdHRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZXRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZXRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJncm91cHNDaGFuZ2VkXCI6dGhpcy5lbWl0X2V2ZW50KFwiZ3JvdXBzLWNoYW5nZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50QWN0aXZhdGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZWFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KX19YXN5bmMgYnVpbGRfY29tbWFuZF9saW5lKGUpe2xldCB0PWAtLWlkICR7dGhpcy5zZXJ2ZXJfaWR9IGA7ZT8uc2hvd0RlYnVnJiYodCs9XCIgLS1zaG93LWRlYnVnIFwiKSxlPy5kaXNhYmxlR1BVQWNjZWxlcmF0ZWREcmFnZ2luZyYmKHQrPVwiIC0tZGlzYWJsZS1ncHUtYWNjZWxlcmF0ZWQtZHJhZ2dpbmcgdHJ1ZSBcIiksZT8uZGlzYWJsZUJsdXJEcm9wUHJldmlldyYmKHQrPVwiIC0tYmx1ci1kcm9wLXByZXZpZXcgZmFsc2UgXCIpO2NvbnN0IG49YXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO3JldHVybiB0Kz1gLS1ydW50aW1lLXBvcnQgJHtuLnBvcnR9IGAsdCs9YC0tcnVudGltZS12ZXJzaW9uICR7bi52ZXJzaW9ufSBgLHQudHJpbSgpfX19KSgpO3ZhciByPWkuUDtleHBvcnR7ciBhcyBTbmFwU2VydmVyfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIFNuYXAgZnJvbSBcIkBvcGVuZmluL3NuYXAtc2RrXCI7XG5cbmNvbnN0IFRFU1RfQVBQX1dJTkRPV19JRCA9IFwic25hcC1leGFtcGxlLW5hdGl2ZS10ZXN0LWFwcC1pZFwiO1xuXG4vLyBUaGUgRE9NIGVsZW1lbnRzXG5sZXQgY2hrU2hvd0RlYnVnV2luZG93OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBidG5TdGFydDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blN0b3A6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5OYXRpdmVUZXN0QXBwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VsQXR0YWNoUG9zaXRpb246IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBidG5BdHRhY2hUb1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkRldGFjaEZyb21XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRMYXlvdXQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRBdHRhY2hlZDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VydmVyU3RhdHVzOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB8IG51bGw7XG5sZXQgbG9nZ2luZzogSFRNTFByZUVsZW1lbnQgfCBudWxsO1xuXG5sZXQgc2VydmVyU3RhdGU6IFwic3RhcnRpbmdcIiB8IFwic3RhcnRlZFwiIHwgXCJzdG9wcGluZ1wiIHwgXCJzdG9wcGVkXCIgPSBcInN0b3BwZWRcIjtcbmxldCBpc1dpbmRvd09wZW4gPSBmYWxzZTtcbmxldCBpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5sZXQgc2VydmVyOiBTbmFwLlNuYXBTZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbi8vIFdhaXQgZm9yIHRoZSBET00gdG8gZmluaXNoIGxvYWRpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG5cdC8vIFBsYXRmb3JtIGhhcyBsb2FkZWQgc28gaW5pdGlhbGl6ZSB0aGUgRE9NXG5cdGF3YWl0IGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTSBlbGVtZW50cy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y2hrU2hvd0RlYnVnV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtTaG93RGVidWdXaW5kb3dcIik7XG5cdGJ0blN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU3RhcnRcIik7XG5cdGJ0blN0b3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdG9wXCIpO1xuXHRzZXJ2ZXJTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQYXJhZ3JhcGhFbGVtZW50PihcIiNzZXJ2ZXJTdGF0dXNcIik7XG5cdGJ0bk5hdGl2ZVRlc3RBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5OYXRpdmVUZXN0QXBwXCIpO1xuXHRzZWxBdHRhY2hQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbEF0dGFjaFBvc2l0aW9uXCIpO1xuXHRidG5BdHRhY2hUb1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkF0dGFjaFRvV2luZG93XCIpO1xuXHRidG5EZXRhY2hGcm9tV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuRGV0YWNoRnJvbVdpbmRvd1wiKTtcblx0YnRuR2V0TGF5b3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0TGF5b3V0XCIpO1xuXHRidG5HZXRBdHRhY2hlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldEF0dGFjaGVkXCIpO1xuXHRsb2dnaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUHJlRWxlbWVudD4oXCIjbG9nZ2luZ1wiKTtcblx0YnRuQ2xlYXJMb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5DbGVhckxvZ1wiKTtcblxuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkICYmXG5cdFx0YnRuQ2xlYXJMb2dcblx0KSB7XG5cdFx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0XHRjb25zdCBtYW5pZmVzdCA9IGF3YWl0IGFwcC5nZXRNYW5pZmVzdCgpO1xuXG5cdFx0aWYgKG1hbmlmZXN0LmFwcEFzc2V0cz8uWzBdLnNyYyA9PT0gXCJTTkFQX0FTU0VUX1VSTFwiKSB7XG5cdFx0XHRsb2dFcnJvcihcblx0XHRcdFx0XCJQbGVhc2UgcmVxdWVzdCB0aGUgU05BUF9BU1NFVF9VUkwgZnJvbSBPcGVuRmluIGFuZCB1cGRhdGUgbWFuaWZlc3QuZmluLmpzb24gYmVmb3JlIHJ1bm5pbmcgdGhlIHNhbXBsZVwiXG5cdFx0XHQpO1xuXHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGluZ1wiO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFN0YXJ0aW5nIFNuYXAgU2VydmVyIHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH1gKTtcblx0XHRcdFx0XHRzZXJ2ZXIgPSBuZXcgU25hcC5TbmFwU2VydmVyKGZpbi5tZS5pZGVudGl0eS51dWlkKTtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RhcnQoeyBzaG93RGVidWc6IGNoa1Nob3dEZWJ1Z1dpbmRvdz8uY2hlY2tlZCB9KTtcblxuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudFJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBSZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC11bnJlZ2lzdGVyZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudFVuUmVnaXN0ZXJlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IFVucmVnaXN0ZXJlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudHMtYXR0YWNoZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudHNBdHRhY2hlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50cyBBdHRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuYXR0YWNoZWRDbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1kZXRhY2hlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50RGV0YWNoZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBEZXRhY2hlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnQuY2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWFjdGl2YXRlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50QWN0aXZhdGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgQWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1kZWFjdGl2YXRlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50RGVhY3RpdmF0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBEZWFjdGl2YXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3ZlLXNpemUtY29tcGxldGVkXCIsIChldmVudDogU25hcC5Nb3ZlU2l6ZUNvbXBsZXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgTW92ZSBTaXplIENvbXBsZXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJncm91cHMtY2hhbmdlZFwiLCAoZXZlbnQ6IFNuYXAuR3JvdXBzQ2hhbmdlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgR3JvdXBzIENoYW5nZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdGFydGVkIFNuYXAgU2VydmVyXCIpO1xuXG5cdFx0XHRcdFx0Y29uc3Qgd2luID0gZmluLldpbmRvdy5nZXRDdXJyZW50U3luYygpO1xuXHRcdFx0XHRcdGNvbnN0IG5hdGl2ZUlkID0gYXdhaXQgd2luLmdldE5hdGl2ZUlkKCk7XG5cblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIucmVnaXN0ZXJXaW5kb3coZmluLm1lLmlkZW50aXR5LnV1aWQsIG5hdGl2ZUlkKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdGBSZWdpc3RlcmluZyBQbGF0Zm9ybSBXaW5kb3cgd2l0aCBJZCAke2Zpbi5tZS5pZGVudGl0eS51dWlkfSBhbmQgaGFuZGxlICR7bmF0aXZlSWR9YFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RhcnRlZFwiO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0blN0b3AuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RvcHBpbmdcIjtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBpbmcgU25hcCBTZXJ2ZXJcIik7XG5cdFx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdFx0YXdhaXQgc2VydmVyLmRldGFjaEZyb21Hcm91cChURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgc2VydmVyLnN0b3AoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdG9wcGVkIFNuYXAgU2VydmVyXCIpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0XHRcdFx0fSBmaW5hbGx5IHtcblx0XHRcdFx0XHRzZXJ2ZXIgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0b3BwZWRcIjtcblx0XHRcdFx0XHRpc1dpbmRvd09wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHJ1bnRpbWVJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO1xuXHRcdFx0XHRjb25zdCBhcHBBc3NldEluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7IGFsaWFzOiBcInNuYXAtbmF0aXZlLXRlc3QtYXBwXCIgfSk7XG5cdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0XHRcdGNvbnN0IGxvY2FsQXBwVXJsID0gKHJ1bnRpbWVJbmZvLmFyZ3MgYXMgYW55KVtcImxvY2FsLXN0YXJ0dXAtdXJsXCJdLnJlcGxhY2UoXCJjb25maWcuanNvblwiLCBcIlwiKTtcblx0XHRcdFx0YXdhaXQgbGF1bmNoQXBwKFxuXHRcdFx0XHRcdFwiTmF0aXZlIFRlc3QgQXBwXCIsXG5cdFx0XHRcdFx0VEVTVF9BUFBfV0lORE9XX0lELFxuXHRcdFx0XHRcdGAke2xvY2FsQXBwVXJsfWFzc2V0c1xcXFwke2FwcEFzc2V0SW5mby5hbGlhc31cXFxcJHthcHBBc3NldEluZm8udmVyc2lvbn1cXFxcJHthcHBBc3NldEluZm8udGFyZ2V0fWAsXG5cdFx0XHRcdFx0W10sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dHlwZTogXCJ3YWl0Rm9yV2luZG93T2ZOYW1lXCIsXG5cdFx0XHRcdFx0XHR0aW1lb3V0TXM6IDE1MDAwLFxuXHRcdFx0XHRcdFx0bWF0Y2hSZWdleDogXCJeTmF0aXZlIFRlc3QgQXBwJFwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpc1dpbmRvd09wZW4gPSB0cnVlO1xuXHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIgJiYgc2VsQXR0YWNoUG9zaXRpb24pIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNlbEF0dGFjaFBvc2l0aW9uLnZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5hdHRhY2hXaW5kb3dzKGZpbi5tZS5pZGVudGl0eS51dWlkLCBURVNUX0FQUF9XSU5ET1dfSUQsIHZhbHVlIGFzIFNuYXAuQXR0YWNoU2lkZSwgMCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuQ2xlYXJMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0bG9nQ2xlYXIoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRMYXlvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGxheW91dCA9IGF3YWl0IHNlcnZlci5nZXRMYXlvdXQoKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIkxheW91dFwiKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShsYXlvdXQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRBdHRhY2hlZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXR0YWNoZWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0QXR0YWNoZWQoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiQXR0YWNoZWRcIik7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoYXR0YWNoZWQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgRE9NIGVsZW1lbnRzIHdpdGggdGhlIHN0YXRlIG9mIHRoZSBjb25uZWN0aW9uLlxuICovXG5mdW5jdGlvbiB1cGRhdGVTZXJ2ZXJTdGF0dXMoKTogdm9pZCB7XG5cdGlmIChcblx0XHRjaGtTaG93RGVidWdXaW5kb3cgJiZcblx0XHRidG5TdGFydCAmJlxuXHRcdGJ0blN0b3AgJiZcblx0XHRzZXJ2ZXJTdGF0dXMgJiZcblx0XHRidG5OYXRpdmVUZXN0QXBwICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0c2VsQXR0YWNoUG9zaXRpb24gJiZcblx0XHRidG5HZXRMYXlvdXQgJiZcblx0XHRidG5HZXRBdHRhY2hlZFxuXHQpIHtcblx0XHRpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRpbmdcIiB8fCBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGluZ1wiKSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0QXR0YWNoZWQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gYFNuYXAgU2VydmVyIGlzICR7c2VydmVyU3RhdGV9YDtcblx0XHR9IGVsc2UgaWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0ZWRcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0QXR0YWNoZWQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RhcnRlZFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIlNuYXAgU2VydmVyIGlzIHN0b3BwZWRcIjtcblx0XHR9XG5cdH1cblx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBVSSBiYXNlZCBvbiB0aGUgd2luZG93IHN0YXRlLlxuICovXG5mdW5jdGlvbiB1cGRhdGVXaW5kb3dTdGF0dXMoKTogdm9pZCB7XG5cdGlmIChidG5OYXRpdmVUZXN0QXBwICYmIHNlbEF0dGFjaFBvc2l0aW9uICYmIGJ0bkF0dGFjaFRvV2luZG93ICYmIGJ0bkRldGFjaEZyb21XaW5kb3cpIHtcblx0XHRpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRpbmdcIiB8fCBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGluZ1wiKSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRlZFwiICYmIGlzV2luZG93T3Blbikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gIWlzV2luZG93QXR0YWNoZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGVkXCI7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGluZm9ybWF0aW9uIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBpbmZvcm1hdGlvbiBUaGUgaW5mb3JtYXRpb24gdG8gc2VuZC5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mb3JtYXRpb246IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fSR7aW5mb3JtYXRpb259XFxuXFxuYDtcblx0XHRsb2dnaW5nLnNjcm9sbFRvcCA9IGxvZ2dpbmcuc2Nyb2xsSGVpZ2h0O1xuXHR9XG59XG5cbi8qKlxuICogU2VuZCBlcnJvciB0byB0aGUgbG9nIGRpc3BsYXkuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dFcnJvcihlcnI6IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fUVSUk9SOiAke2Vycn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgbG9nIGRpc3BsYXkuXG4gKi9cbmZ1bmN0aW9uIGxvZ0NsZWFyKCk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gMDtcblx0fVxufVxuXG4vKipcbiAqIExhdW5jaCBhbiBhcHBsaWNhdGlvbiB1c2luZyBTbmFwLlxuICogQHBhcmFtIGFwcE5hbWUgVGhlIG5hbWUgb2YgdGhlIGFwcCB0aGF0IGlzIGJlaW5nIGxhdW5jaGVkLlxuICogQHBhcmFtIGNsaWVudElkIEFuIElkIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBsYXVuY2hlZCBhcHAuXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXBwIHRvIGxhdW5jaC5cbiAqIEBwYXJhbSBhcmdzIEFkZGl0aW9uYWwgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBmb3IgdGhlIGxhdW5jaC5cbiAqIEBwYXJhbSBzdHJhdGVneSBUaGUgc3RyYXRlZ3kgdG8gbGF1bmNoIHRoZSB3aW5kb3cgd2l0aC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbGF1bmNoQXBwKFxuXHRhcHBOYW1lOiBzdHJpbmcsXG5cdGNsaWVudElkOiBzdHJpbmcsXG5cdHBhdGg6IHN0cmluZyxcblx0YXJnczogc3RyaW5nW10sXG5cdHN0cmF0ZWd5OiBTbmFwLkxhdW5jaFN0cmF0ZWd5XG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgTGF1bmNoaW5nICR7YXBwTmFtZX1gKTtcblx0XHRcdGNvbnN0IGxhdW5jaFJlc3VsdCA9IGF3YWl0IHNlcnZlci5sYXVuY2goe1xuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRjbGllbnRJZCxcblx0XHRcdFx0YXJncyxcblx0XHRcdFx0c3RyYXRlZ3lcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAobGF1bmNoUmVzdWx0Py5wcm9jZXNzX2lkKSB7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGAke2FwcE5hbWV9IGxhdW5jaGVkIHdpdGggcHJvY2VzcyBpZCAke2xhdW5jaFJlc3VsdC5wcm9jZXNzX2lkfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==