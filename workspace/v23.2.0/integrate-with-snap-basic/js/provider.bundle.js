/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/app-asset.ts"
/*!*********************************!*\
  !*** ./client/src/app-asset.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   doesAppAssetExist: () => (/* binding */ doesAppAssetExist),
/* harmony export */   downloadAppAsset: () => (/* binding */ downloadAppAsset),
/* harmony export */   getCanDownloadAppAssets: () => (/* binding */ getCanDownloadAppAssets),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isObject: () => (/* binding */ isObject)
/* harmony export */ });
/**
 * For functionality that requires an app asset, this function will attempt to fetch the app asset from the passed definition.
 * @param appAssetDefinition The definition of the app asset to fetch.
 * @param options An object containing a logger to log any info or errors that occur during the process and a function to capture progress.
 * @param options.logger - A logger to log any errors that occur during the fetching of the app asset.
 * @param options.assetDownloadProgress - A callback function to report the progress of the asset download.
 * @returns A promise that resolves to the app asset info if the app asset was successfully fetched, or undefined if both attempts failed.
 */
async function downloadAppAsset(appAssetDefinition, options) {
    const src = appAssetDefinition.src;
    const logger = options?.logger;
    if (!isStringValue(src)) {
        logger?.error("Cannot initialize App Asset Download without src being defined");
        return undefined;
    }
    if (!appAssetDefinition.src.startsWith("http")) {
        logger?.error("Please provide a valid URL for the app asset src. Only HTTP and HTTPS protocols are supported. With https preferred for security reasons.");
        return undefined;
    }
    const alias = appAssetDefinition.alias;
    if (!isStringValue(alias)) {
        logger?.error("Cannot initialize App Asset Download without alias being defined");
        return undefined;
    }
    const target = appAssetDefinition.target;
    if (!isStringValue(target)) {
        logger?.error("Cannot initialize App Asset Download without target being defined");
        return undefined;
    }
    const version = appAssetDefinition.version;
    if (!isStringValue(version)) {
        logger?.error("Cannot initialize App Asset Download without version being defined");
        return undefined;
    }
    const targetAssetDefinition = {
        alias,
        src,
        target,
        version,
        mandatory: appAssetDefinition.mandatory,
        args: appAssetDefinition.args
    };
    const appAssetInfo = await doesAppAssetExist(targetAssetDefinition.alias, targetAssetDefinition.version);
    if (appAssetInfo) {
        options?.logger?.info(`App asset with alias ${targetAssetDefinition.alias} version ${targetAssetDefinition.version} and src ${targetAssetDefinition.src} already exists. No need to download.`);
        return appAssetInfo;
    }
    const hasDownloadAppAssets = await getCanDownloadAppAssets(logger);
    if (!hasDownloadAppAssets) {
        logger?.warn("The platform does not have the capability or permission to download app assets.");
        return undefined;
    }
    return downloadAppAssetDefinition(targetAssetDefinition, options);
}
/**
 * Check if an app asset exists and optionally validate version and source URL.
 * @param alias The alias you want to check for
 * @param version The version you want to check for (optional)
 * @param src The source URL you want to check for (optional)
 * @returns The app asset info if it exists, otherwise undefined
 */
async function doesAppAssetExist(alias, version, src) {
    try {
        const appAssetInfo = await fin.System.getAppAssetInfo({ alias });
        if (version && appAssetInfo.version !== version) {
            return undefined;
        }
        if (src && appAssetInfo.src !== src) {
            return undefined;
        }
        return appAssetInfo;
    }
    catch {
        // asset does not exist or url does not match, return undefined
    }
    return undefined;
}
/**
 * Download an app asset based on the provided definition and options.
 * @param appAssetDefinition The definition of the app asset to download.
 * @param options An object containing a logger to log any errors that occur during the process, and a callback function to report the progress of the asset download.
 * @param options.logger - A logger to log any errors that occur during the downloading of the app asset.
 * @param options.assetDownloadProgress - A callback function to report the progress of the asset download.
 * @returns A promise that resolves to the app asset info if the app asset was successfully downloaded, or undefined if an error occurred during the download.
 */
async function downloadAppAssetDefinition(appAssetDefinition, options) {
    let fetchedOrExistingAppAsset;
    try {
        await fin.System.downloadAsset(appAssetDefinition, (progress) => {
            const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
            if (options?.assetDownloadProgress) {
                options.assetDownloadProgress(downloadedPercent, appAssetDefinition.src, appAssetDefinition.alias);
            }
            options?.logger?.info(`Downloaded ${downloadedPercent}% of app asset with alias ${appAssetDefinition.alias} and version ${appAssetDefinition.version} and url ${appAssetDefinition.src}`);
        });
        // extra confirmation using the approach  used to validate the existence of an asset.
        fetchedOrExistingAppAsset = await doesAppAssetExist(appAssetDefinition.alias, appAssetDefinition.version, appAssetDefinition.src);
    }
    catch (err) {
        options?.logger?.error(`Unable to fetch App Asset ${formatError(err)}`);
    }
    return fetchedOrExistingAppAsset;
}
/**
 * Do we have the permissions to download app assets.
 * @param logger Optional logger to log errors.
 * @returns True if we have permission.
 */
async function getCanDownloadAppAssets(logger) {
    let canDownloadAppAssets = false;
    try {
        const canDownloadAppAssetsResponse = await fin.System.queryPermissionForCurrentContext("System.downloadAsset");
        canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;
    }
    catch (error) {
        logger?.error(`Error while querying for System.downloadAsset permission ${formatError(error)}`);
        canDownloadAppAssets = false;
    }
    return canDownloadAppAssets;
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return !isEmpty(value) && typeof value === "string";
}
/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value) {
    return isString(value) && value.trim().length > 0;
}
/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
function isEmpty(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (isEmpty(err)) {
        return "";
    }
    else if (err instanceof Error) {
        return err.message;
    }
    else if (isStringValue(err)) {
        return err;
    }
    else if (isObject(err) && "message" in err && isString(err.message)) {
        return err.message;
    }
    return JSON.stringify(err);
}


/***/ },

/***/ "../../node_modules/@openfin/snap-sdk/openfin.snap.mjs"
/*!*************************************************************!*\
  !*** ../../node_modules/@openfin/snap-sdk/openfin.snap.mjs ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnapServer: () => (/* binding */ l)
/* harmony export */ });
var e={827:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var a=Number.isNaN||function(e){return e!=e};function r(){r.init.call(this)}e.exports=r,e.exports.once=function(e,t){return new Promise(function(n,i){function a(n){e.removeListener(t,r),i(n)}function r(){"function"==typeof e.removeListener&&e.removeListener("error",a),n([].slice.call(arguments))}v(e,t,r,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,n)}(e,a,{once:!0})})},r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var s=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?r.defaultMaxListeners:e._maxListeners}function l(e,t,n,i){var a,r,s,l;if(o(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),s=r[t]),void 0===s)s=r[t]=n,++e._eventsCount;else if("function"==typeof s?s=r[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(a=c(e))>0&&s.length>a&&!s.warned){s.warned=!0;var p=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");p.name="MaxListenersExceededWarning",p.emitter=e,p.type=t,p.count=s.length,l=p,console&&console.warn&&console.warn(l)}return e}function p(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},a=p.bind(i);return a.listener=n,i.wrapFn=a,a}function d(e,t,n){var i=e._events;if(void 0===i)return[];var a=i[t];return void 0===a?[]:"function"==typeof a?n?[a.listener||a]:[a]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(a):f(a,a.length)}function u(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function v(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function a(r){i.once&&e.removeEventListener(t,a),n(r)})}}Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},r.prototype.getMaxListeners=function(){return c(this)},r.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var a="error"===e,r=this._events;if(void 0!==r)a=a&&void 0===r.error;else if(!a)return!1;if(a){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var o=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw o.context=s,o}var c=r[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var l=c.length,p=f(c,l);for(n=0;n<l;++n)i(p[n],this,t)}return!0},r.prototype.addListener=function(e,t){return l(this,e,t,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(e,t){return l(this,e,t,!0)},r.prototype.once=function(e,t){return o(t),this.on(e,h(this,e,t)),this},r.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,h(this,e,t)),this},r.prototype.removeListener=function(e,t){var n,i,a,r,s;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(a=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){s=n[r].listener,a=r;break}if(a<0)return this;0===a?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,a),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var a,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(a=r[i])&&this.removeAllListeners(a);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},r.prototype.listeners=function(e){return d(this,e,!0)},r.prototype.rawListeners=function(e){return d(this,e,!1)},r.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},r.prototype.listenerCount=u,r.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i=n(827);const a="openfin-snap",r="1.6.0",s=(e,t)=>`${e} ${t instanceof Error?t.message:"string"==typeof t?t:JSON.stringify(t)}`,o=async()=>{try{return(await fin.System.getAppAssetInfo({alias:a})).version===r}catch(e){return!1}},c="internal-generated-window-";class l{constructor(e,t=1e4,n=5e3){if(this.server_id=e,this.emitter=new i.EventEmitter,this.__extensions=[],this.snapServerStatus="disconnected",this.healthCheckInitializing=!1,!fin)throw new Error("OpenFin is not available");if(t<1e3)throw new Error(`healthCheckIntervalMs must be at least 1000ms (provided: ${t}ms). Values below this are excessive and cause unnecessary overhead.`);if(n<500)throw new Error(`healthCheckTimeoutMs must be at least 500ms (provided: ${n}ms). Timeout must allow sufficient time for network round-trip and server response.`);if(n>=t)throw new Error(`healthCheckTimeoutMs (${n}ms) must be less than healthCheckIntervalMs (${t}ms). This ensures the timeout completes before the next health check begins, allowing time for recovery.`);this.healthCheckIntervalMs=t,this.healthCheckTimeoutMs=n}async start(e){try{const e=await fin.System.getRuntimeInfo();"x64"!==e?.architecture&&console.warn(`The architecture of the connected OpenFin runtime is '${e.architecture}' - Window snapping is currently only supported with 64-bit applications. Snapping will be disabled.`)}catch(e){console.warn(`Could not get runtime info: ${e}`)}const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(t.rawValue){if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL")}e?.executablePath||await(async e=>{const t=await fin.Application.getCurrentSync().getManifest(),n=t.appAssets?.find(e=>e.alias===a);if(n)return void console.warn("Detected Snap package in app manifest appAssets",n);if(await o())return void console.info("Using existing Snap package");const i=e??`https://cdn.openfin.co/release/snap/${r}/snap.zip`;console.info(`Downloading Snap asset from: '${i}'`);const c={alias:a,src:`${i}`,target:"OpenFinSnap.exe",version:r};console.info("Downloading Snap package",c);try{await fin.System.downloadAsset(c,()=>{})}catch(e){throw new Error(s("Unable to download Snap package.",e))}})(e?.customSnapAssetSource);const n=await this.build_command_line(e);let i={alias:a,arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error(s("Failed to launch the Snap server.",e))}return this.connect()}async connect(){await this.internalConnect(!0)}__addExtension(e){this.__extensions.push(e)}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async showDebugWindow(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"showDebugWindow",payload:{show:e}}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e,t=!0){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e,reset:t}}))}async enterDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"enterBatchMode"}))}async exitDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"exitBatchMode"}))}async prepareToApplySnapshot(e,t){if(!e||e.options?.closeExistingWindows||e.options?.closeSnapshotWindows)return this.needToResetLayout=!0,void await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}));this.needToResetLayout=!1;const n=e.snapshot,i=JSON.stringify(n,null,2),a=n.snap;if(!a)return;await(this.client?.dispatch("snap_api_invoke",{action:"prepareToApplyLayout"}));const r=t??v,s=(await this.getLayout())?.clients.map(e=>e.id)??[],o=u(n.windows),c=Array.from(o.keys()).filter(e=>s.includes(e));a.clients.filter(e=>c.includes(e.id)).forEach(e=>{const t=e.id,n=r(t);e.id=n,f(a.connections,t,n);const i=o.get(t);i.customData.snapClientId=n,i.name=n});const l=JSON.stringify(n,null,2);console.debug(`Snap SDK modified snapshot data before applying it.\nOriginal snapshot:\n${i}\nModified snapshot:\n${l}`)}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){e.snap&&await this.setLayout(e.snap,this.needToResetLayout)}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");e.appAssetInfo&&(e.path=await p({target:e.path,...e.appAssetInfo})),console.log("options: ",e);const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t,n){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t,resizingBehavior:n}}))}async enableAutoWindowRegistration(){const e=e=>this.handleNewWindow(e);return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async getClientIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{nativeWindowId:Number.NaN}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getClientIdForWindow",payload:t}));if(!n.payload.clientId)throw new Error("No client ID found for window");return n.payload.clientId}async getGroupIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getGroupIdForWindow",payload:t}));if(!n.payload.groupId)throw new Error("No group found for window");return n.payload.groupId}async getWindowResizable(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getResizable",payload:t}));if(null===n.payload.resizable)throw new Error("No window found for given ID");return n.payload.resizable}async setWindowResizable(e,t){const n="number"==typeof e?{nativeWindowId:e,resizable:t}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e,resizable:t}:{nativeWindowId:this.hexStringToNumber(e),resizable:t};await(this.client?.dispatch("snap_api_invoke",{action:"setResizable",payload:n}))}async getWindowsInGroup(e){const t=await(this.client?.dispatch("snap_api_invoke",{action:"getWindowsInGroup",payload:{groupId:e}}));return t.payload.windows?t.payload.windows.map(e=>({nativeId:e[0],clientId:e[1]})):[]}async getAllGroupIds(){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAllGroupIds"}))).payload.groupIds}async minimizeGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"minimizeGroup",payload:{groupId:e}}))}async restoreGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"restoreGroup",payload:{groupId:e}}))}getSnapServerStatus(){return this.snapServerStatus}handleSnapServerDisconnection(){this.stopHealthCheck(),this.client=void 0,this.setSnapServerStatus("disconnected"),console.warn("SnapSDK: Disconnected from Snap server, attempt reconnect."),this.internalConnect(!1)}async internalConnect(e){if(this.stopHealthCheck(),this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",async(t,n)=>{try{e&&await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:t.version,componentName:"snap-server"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}}),this.client.onDisconnection(()=>this.handleSnapServerDisconnection()),e)try{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"1.6.0",componentName:"snap-client"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}this.client.register("snap_updates",(e,t)=>this.handleSnapEvents(e,t)),this.setSnapServerStatus("connected"),this.startHealthCheck(),this.__extensions.forEach(e=>e.onConnected(this.client))}setSnapServerStatus(e){this.snapServerStatus!==e&&(this.snapServerStatus=e,"disconnected"===e?this.emit_event("snap-server-disconnected",{}):"no-response"===e&&this.emit_event("snap-server-no-response",{timestamp:Date.now()}))}startHealthCheck(){if("disconnected"!==this.snapServerStatus&&!this.healthCheckInitializing&&!this.healthCheckInterval){this.healthCheckInitializing=!0;try{this.healthCheckInterval=setInterval(async()=>{if("disconnected"!==this.snapServerStatus&&this.client)try{const e=new Promise((e,t)=>{setTimeout(()=>t(new Error("Snap server response timeout")),this.healthCheckTimeoutMs)}),t=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),n=await Promise.race([this.client?.dispatch("snap_api_invoke",{action:"healthCheck",payload:{nonce:t}})||Promise.reject(new Error("Client is not available")),e]);if(!this.client)return void this.setSnapServerStatus("disconnected");if(!n?.payload||n.payload.nonce!==t)throw new Error("Health check validation failed - nonce mismatch");"no-response"===this.snapServerStatus&&this.setSnapServerStatus("connected")}catch(e){this.client?this.setSnapServerStatus("no-response"):this.setSnapServerStatus("disconnected")}},this.healthCheckIntervalMs)}finally{this.healthCheckInitializing=!1}}}stopHealthCheck(){this.healthCheckInterval&&(clearInterval(this.healthCheckInterval),this.healthCheckInterval=void 0)}async handleNewWindow(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const a=await t.getOptions();if(void 0!==a.includeInSnapshots&&!1===a.includeInSnapshots)return void console.log(`SnapSDK: Not registering ${e.uuid}:${e.name}, Window is explicitly excluded -includeInSnapshots == false`);const r=a.customData||{};r.snapClientId?i=r.snapClientId:await t.updateOptions({customData:{...r,snapClientId:i}}),console.log(`SnapSDK: Auto-registering window: snapClientId:${i}, handle ${n}, uuid:${e.uuid}, name:${e.name}`),await this.registerWindow(i,n,r.snapResizingBehavior)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}hexStringToNumber(e){const t=e?.trim();return/^0x[0-9a-f]+$/i.test(t)?Number(t):NaN}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug "),e?.disableGPUAcceleratedDragging&&(t+=" --disable-gpu-accelerated-dragging true "),e?.disableBlurDropPreview&&(t+=" --blur-drop-preview false "),void 0!==e?.blurEffectPerformanceThreshold&&(t+=` --blur-effect-performance-threshold=${e?.blurEffectPerformanceThreshold} `),e?.disableUserUnstick&&(t+=" --disable-user-unstick "),!0!==e?.keyToStick&&"string"!=typeof e?.keyToStick||(t+=` --ks=${!0===e.keyToStick?"ctrl":e.keyToStick} `),e?.keyToUnstick&&(t+=` --kus=${e.keyToUnstick} `),e?.keyToGroupStick&&(t+=` --kgs=${e.keyToGroupStick} `),e?.blockOverlapGroupSnapping&&(t+=" --block-overlap-group-snapping "),e?.hideTaskbarEntry&&(t+=" --no-tb "),e?.taskbarIconGroup&&(t+=` --tb-id=${e?.taskbarIconGroup} `),e?.taskbarIcon&&(t+=` --tb-icon=${e?.taskbarIcon} `),e?.disableRuntimeHeartbeating&&(t+=" --no-hb "),e?.autoHideClientTaskbarIcons&&(t+=" --tb-auto-hide "),e?.theme&&(t+=` --thm=${e.theme} `),e?.defaultResizingBehavior&&(t+=` --res=${e?.defaultResizingBehavior} `);const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}const p=async e=>{let t=(await fin.System.getRuntimeInfo()).args["local-startup-url"].replace("config.json","");const n=t.includes("\\")?"\\":"/";return t.endsWith(n)&&(t=t.slice(0,-1)),[t,"assets",e.alias,e.version,e.target].join(n)},h=()=>"undefined"!=typeof crypto&&"randomUUID"in crypto&&"function"==typeof crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),d=e=>/^app:\/[^/]+\/[^/]+$/.test(e??""),u=e=>{const t=new Map;return e.forEach(e=>{const n=!e.name,i=e.name?.startsWith(c)??!1,a=e.customData?.snapClientId;(n||i||d(e.name))&&a&&t.set(a,e)}),t},f=(e,t,n)=>{Object.values(e).forEach(e=>{e.attachedClientId===t?e.attachedClientId=n:e.targetClientId===t&&(e.targetClientId=n)})},v=e=>{if(!d(e))return`${c}${h()}`;const t=e.split("/");return t[t.length-1]=h(),t.join("/")};

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./client/src/provider.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _openfin_snap_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/snap-sdk */ "../../node_modules/@openfin/snap-sdk/openfin.snap.mjs");
/* harmony import */ var _app_asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-asset */ "./client/src/app-asset.ts");


const TEST_APP_WINDOW_ID = "snap-example-native-test-app-id";
const snapDefaultUrl = "https://cdn.openfin.co/release/snap/1.6.0/snap.zip";
const snapVersion = "1.6.0";
const snapAlias = "openfin-snap";
const snapTarget = "OpenFinSnap.exe";
// The DOM elements
let chkShowDebugWindow;
let chkDisableShiftToUnsnap;
let chkCtrlToSnap;
let chkDisableGPUDragging;
let chkDisableBlurDrop;
let chkAutoHideClientTaskbarIcons;
let chkHideTaskBarEntry;
let chkCustomTaskBarIcon;
let chkGroupWithPlatformTaskbarGroup;
let chkDisableRuntimeHeartbeating;
let chkCustomSnapAppAssetPath;
let txtPrimaryUrl;
let txtFallbackUrl;
let fieldPrimaryUrl;
let fieldFallbackUrl;
let rowCustomSnapAppAssetPath;
let btnStart;
let btnStop;
let btnNativeTestApp;
let btnWindowTestApp;
let btnShowHideDebugWindow;
let selAttachPosition;
let selSnapKey;
let selUnsnapKey;
let selResize;
let selTheme;
let btnAttachToWindow;
let btnDetachFromWindow;
let btnMinimizeGroup;
let btnGetLayout;
let btnGetAttached;
let btnGetGroups;
let btnGetGroupsForCurrentWindow;
let btnClearLog;
let serverStatus;
let logging;
let debugWindowShown = false;
let serverState = "stopped";
let isWindowOpen = false;
let isWindowAttached = false;
let server;
/**
 * Custom logger that implements the Logger interface using logInformation and logError functions
 */
const customLogger = {
    info: (message, ...optionalParams) => {
        logInformation(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
    },
    error: (message, ...optionalParams) => {
        logError(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
    },
    warn: (message, ...optionalParams) => {
        logError(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
    },
    trace: (message, ...optionalParams) => {
        logInformation(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
    },
    debug: (message, ...optionalParams) => {
        logInformation(`${message}${optionalParams.length > 0 ? ` ${optionalParams.join(" ")}` : ""}`);
    }
};
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
    chkDisableShiftToUnsnap = document.querySelector("#chkDisableShiftToUnsnap");
    chkCtrlToSnap = document.querySelector("#chkCtrlToSnap");
    chkDisableGPUDragging = document.querySelector("#chkDisableGPUDragging");
    chkDisableBlurDrop = document.querySelector("#chkDisableBlurDrop");
    chkHideTaskBarEntry = document.querySelector("#chkHideTaskBarEntry");
    chkCustomTaskBarIcon = document.querySelector("#chkCustomTaskBarIcon");
    chkGroupWithPlatformTaskbarGroup = document.querySelector("#chkGroupWithPlatformTaskbarGroup");
    chkAutoHideClientTaskbarIcons = document.querySelector("#chkAutoHideClientTaskbarIcons");
    chkDisableRuntimeHeartbeating = document.querySelector("#chkDisableRuntimeHeartbeating");
    chkCustomSnapAppAssetPath = document.querySelector("#chkCustomSnapAppAssetPath");
    txtPrimaryUrl = document.querySelector("#txtPrimaryUrl");
    txtFallbackUrl = document.querySelector("#txtFallbackUrl");
    fieldPrimaryUrl = document.querySelector("#fieldPrimaryUrl");
    fieldFallbackUrl = document.querySelector("#fieldFallbackUrl");
    rowCustomSnapAppAssetPath = document.querySelector("#rowCustomSnapAppAssetPath");
    btnStart = document.querySelector("#btnStart");
    btnStop = document.querySelector("#btnStop");
    serverStatus = document.querySelector("#serverStatus");
    btnNativeTestApp = document.querySelector("#btnNativeTestApp");
    btnWindowTestApp = document.querySelector("#btnWindowTestApp");
    selAttachPosition = document.querySelector("#selAttachPosition");
    selSnapKey = document.querySelector("#selKeyToSnap");
    selUnsnapKey = document.querySelector("#selKeyToUnsnap");
    selResize = document.querySelector("#selResizeBehaviour");
    selTheme = document.querySelector("#selTheme");
    btnAttachToWindow = document.querySelector("#btnAttachToWindow");
    btnDetachFromWindow = document.querySelector("#btnDetachFromWindow");
    btnMinimizeGroup = document.querySelector("#btnMinimizeGroup");
    btnGetLayout = document.querySelector("#btnGetLayout");
    btnGetAttached = document.querySelector("#btnGetAttached");
    btnGetGroups = document.querySelector("#btnGetGroups");
    btnGetGroupsForCurrentWindow = document.querySelector("#btnGetGroupsForCurrentWindow");
    logging = document.querySelector("#logging");
    btnClearLog = document.querySelector("#btnClearLog");
    btnShowHideDebugWindow = document.querySelector("#btnShowHideDebugWindow");
    if (chkShowDebugWindow &&
        chkDisableShiftToUnsnap &&
        chkCtrlToSnap &&
        chkDisableGPUDragging &&
        chkDisableBlurDrop &&
        chkHideTaskBarEntry &&
        chkCustomTaskBarIcon &&
        chkGroupWithPlatformTaskbarGroup &&
        chkAutoHideClientTaskbarIcons &&
        chkDisableRuntimeHeartbeating &&
        chkCustomSnapAppAssetPath &&
        txtPrimaryUrl &&
        txtFallbackUrl &&
        fieldPrimaryUrl &&
        fieldFallbackUrl &&
        rowCustomSnapAppAssetPath &&
        btnStart &&
        btnStop &&
        serverStatus &&
        btnNativeTestApp &&
        btnAttachToWindow &&
        btnDetachFromWindow &&
        btnMinimizeGroup &&
        btnGetLayout &&
        btnGetAttached &&
        btnGetGroups &&
        btnGetGroupsForCurrentWindow &&
        btnClearLog &&
        btnShowHideDebugWindow) {
        txtPrimaryUrl.value = "https://exampleofbadurl.com/snap.zip";
        txtFallbackUrl.value = snapDefaultUrl;
        chkCustomSnapAppAssetPath.addEventListener("change", () => {
            const display = chkCustomSnapAppAssetPath?.checked ? "" : "none";
            if (fieldPrimaryUrl) {
                fieldPrimaryUrl.style.display = display;
            }
            if (fieldFallbackUrl) {
                fieldFallbackUrl.style.display = display;
            }
        });
        const app = await fin.Application.getCurrent();
        const manifest = await app.getManifest();
        if (manifest.appAssets?.some((asset) => asset.alias === "openfin-snap")) {
            rowCustomSnapAppAssetPath.style.display = "none";
        }
        if (manifest.appAssets?.[0]?.src === "SNAP_ASSET_URL") {
            logError("Please request the SNAP_ASSET_URL from HERE and update manifest.fin.json before running the sample");
            updateServerStatus();
            chkShowDebugWindow.disabled = true;
            chkCtrlToSnap.disabled = true;
            chkDisableShiftToUnsnap.disabled = true;
            chkDisableGPUDragging.disabled = true;
            chkDisableBlurDrop.disabled = true;
            btnStart.disabled = true;
        }
        else {
            btnStart.addEventListener("click", async () => {
                try {
                    serverState = "starting";
                    updateServerStatus();
                    logInformation(`Starting Snap Server with Id ${fin.me.identity.uuid}`);
                    server = new _openfin_snap_sdk__WEBPACK_IMPORTED_MODULE_0__.SnapServer(fin.me.identity.uuid);
                    let keyToSnap;
                    let keyToUnsnap;
                    if (chkCtrlToSnap?.checked) {
                        const snapKeyValue = selSnapKey?.value;
                        if (snapKeyValue === "ctrl") {
                            keyToSnap = "ctrl";
                        }
                        else if (snapKeyValue === "shift") {
                            keyToSnap = "shift";
                        }
                    }
                    if (!chkDisableShiftToUnsnap?.checked) {
                        const keyToUnsnapValue = selUnsnapKey?.value;
                        if (keyToUnsnapValue === "ctrl") {
                            keyToUnsnap = "ctrl";
                        }
                        else if (keyToUnsnapValue === "shift") {
                            keyToUnsnap = "shift";
                        }
                    }
                    const options = {
                        showDebug: chkShowDebugWindow?.checked,
                        disableUserUnstick: chkDisableShiftToUnsnap?.checked,
                        keyToStick: keyToSnap,
                        keyToUnstick: keyToUnsnap,
                        disableGPUAcceleratedDragging: chkDisableGPUDragging?.checked,
                        disableBlurDropPreview: chkDisableBlurDrop?.checked,
                        hideTaskbarEntry: chkHideTaskBarEntry?.checked,
                        taskbarIcon: chkCustomTaskBarIcon?.checked ? "https://openfin.co/favicon.ico" : undefined,
                        taskbarIconGroup: chkGroupWithPlatformTaskbarGroup?.checked
                            ? `openfin_apps_group.${fin.me.identity.uuid}`
                            : undefined,
                        autoHideClientTaskbarIcons: chkAutoHideClientTaskbarIcons?.checked,
                        disableRuntimeHeartbeating: chkDisableRuntimeHeartbeating?.checked,
                        defaultResizingBehavior: selResize?.value,
                        theme: selTheme?.value
                    };
                    if (chkCustomSnapAppAssetPath?.checked) {
                        const primaryUrl = txtPrimaryUrl?.value ?? "";
                        const fallbackUrl = txtFallbackUrl?.value;
                        const validatedAppAsset = await validateAppAssetSource(primaryUrl, fallbackUrl);
                        if (!validatedAppAsset.success) {
                            logError("Failed to fetch the app asset from both primary and fallback URLs. Cannot start the Snap server with custom app asset path.");
                            return;
                        }
                        options.customSnapAssetSource = validatedAppAsset.validatedUrl;
                    }
                    await server.start(options);
                    if (chkShowDebugWindow?.checked) {
                        debugWindowShown = true;
                    }
                    else {
                        debugWindowShown = false;
                    }
                    await server.enableAutoWindowRegistration();
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
            btnWindowTestApp?.addEventListener("click", async () => {
                await launchWindowOptionsApp();
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
            btnMinimizeGroup.addEventListener("click", async () => {
                if (server) {
                    const groupId = await server.getGroupIdForWindow(TEST_APP_WINDOW_ID);
                    await server.minimizeGroup(groupId);
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
            btnGetGroups.addEventListener("click", async () => {
                if (server) {
                    const groups = await server.getAllGroupIds();
                    logInformation("Group Ids");
                    logInformation(JSON.stringify(groups, undefined, "  "));
                }
            });
            btnGetGroupsForCurrentWindow.addEventListener("click", async () => {
                if (server) {
                    const groupId = await server.getGroupIdForWindow(fin.me.identity.name);
                    logInformation(`Group Id For Current Window: ${groupId}`);
                }
            });
            btnShowHideDebugWindow.addEventListener("click", async () => {
                if (server) {
                    debugWindowShown = !debugWindowShown;
                    await server.showDebugWindow(debugWindowShown);
                }
            });
            updateServerStatus();
        }
    }
}
/**
 * Generate a short hash string from a URL to use as a version identifier.
 * @param url The URL to hash.
 * @returns A hex string hash of the URL.
 */
function hashUrl(url) {
    let hash = 5381;
    const maxSafeHash = 4_294_967_291;
    for (let i = 0; i < url.length; i++) {
        const codePoint = url.charCodeAt(i);
        const multipliedHash = hash * 33;
        hash = (multipliedHash + codePoint) % maxSafeHash;
    }
    const hashHex = Math.floor(hash).toString(16);
    return hashHex.padStart(8, "0");
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
        chkCtrlToSnap &&
        chkDisableShiftToUnsnap &&
        chkDisableGPUDragging &&
        chkDisableBlurDrop &&
        btnStart &&
        btnStop &&
        serverStatus &&
        btnNativeTestApp &&
        btnAttachToWindow &&
        btnDetachFromWindow &&
        selAttachPosition &&
        btnGetLayout &&
        btnGetAttached &&
        btnGetGroups &&
        btnGetGroupsForCurrentWindow &&
        btnShowHideDebugWindow) {
        if (serverState === "starting" || serverState === "stopping") {
            chkShowDebugWindow.disabled = true;
            chkCtrlToSnap.disabled = true;
            chkDisableShiftToUnsnap.disabled = true;
            chkDisableGPUDragging.disabled = true;
            chkDisableBlurDrop.disabled = true;
            btnStart.disabled = true;
            btnStop.disabled = true;
            btnGetLayout.disabled = true;
            btnGetAttached.disabled = true;
            btnGetGroups.disabled = true;
            btnGetGroupsForCurrentWindow.disabled = true;
            btnShowHideDebugWindow.disabled = true;
            serverStatus.textContent = `Snap Server is ${serverState}`;
        }
        else if (serverState === "started") {
            chkShowDebugWindow.disabled = true;
            chkCtrlToSnap.disabled = true;
            chkDisableShiftToUnsnap.disabled = true;
            chkDisableGPUDragging.disabled = true;
            chkDisableBlurDrop.disabled = true;
            btnStart.disabled = true;
            btnStop.disabled = false;
            btnGetLayout.disabled = false;
            btnGetAttached.disabled = false;
            btnGetGroups.disabled = false;
            btnGetGroupsForCurrentWindow.disabled = false;
            btnShowHideDebugWindow.disabled = false;
            serverStatus.textContent = "Snap Server is started";
        }
        else {
            chkShowDebugWindow.disabled = false;
            chkCtrlToSnap.disabled = false;
            chkDisableShiftToUnsnap.disabled = false;
            chkDisableGPUDragging.disabled = false;
            chkDisableBlurDrop.disabled = false;
            btnStart.disabled = false;
            btnStop.disabled = true;
            btnGetLayout.disabled = true;
            btnGetAttached.disabled = true;
            btnGetGroups.disabled = true;
            btnGetGroupsForCurrentWindow.disabled = true;
            btnShowHideDebugWindow.disabled = true;
            serverStatus.textContent = "Snap Server is stopped";
        }
    }
    updateWindowStatus();
}
/**
 * Update the UI based on the window state.
 */
function updateWindowStatus() {
    if (btnNativeTestApp &&
        selAttachPosition &&
        btnAttachToWindow &&
        btnDetachFromWindow &&
        btnMinimizeGroup &&
        btnWindowTestApp) {
        if (serverState === "starting" || serverState === "stopping") {
            btnNativeTestApp.disabled = true;
            btnWindowTestApp.disabled = true;
            selAttachPosition.disabled = true;
            btnAttachToWindow.disabled = true;
            btnDetachFromWindow.disabled = true;
            btnMinimizeGroup.disabled = true;
        }
        else if (serverState === "started" && isWindowOpen) {
            btnNativeTestApp.disabled = true;
            selAttachPosition.disabled = isWindowAttached;
            btnAttachToWindow.disabled = isWindowAttached;
            btnDetachFromWindow.disabled = !isWindowAttached;
            btnMinimizeGroup.disabled = !isWindowAttached;
        }
        else {
            btnNativeTestApp.disabled = serverState === "stopped";
            btnWindowTestApp.disabled = serverState === "stopped";
            selAttachPosition.disabled = true;
            btnAttachToWindow.disabled = true;
            btnDetachFromWindow.disabled = true;
            btnMinimizeGroup.disabled = true;
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
/**
 * Launches a window that can be used to create child windows.
 */
async function launchWindowOptionsApp() {
    if (serverState !== "started") {
        logError("Snap server is not started");
        return;
    }
    const windowOptionsName = "window-options-app";
    const optionsWindow = fin.Window.wrapSync({ uuid: fin.me.identity.uuid, name: windowOptionsName });
    try {
        await optionsWindow.getInfo();
        await optionsWindow.bringToFront();
    }
    catch {
        // window does not exist, so create it
        await fin.Window.create({
            name: windowOptionsName,
            autoShow: true,
            defaultHeight: 600,
            defaultWidth: 800,
            url: "https://built-on-openfin.github.io/container-starter/main/use-window-options/html/app.html"
        });
    }
}
/**
 * Validates the snap app asset from the provided primary and fallback URLs to ensure it is available before starting the Snap server.
 * @param primaryUrl The primary URL to validate the snap app asset from.
 * @param fallbackUrl An optional fallback URL to validate the snap app asset from if the primary URL fails.
 * @returns An object indicating whether the validation was successful, the validated URL if successful, and whether the fallback URL was used.
 */
async function validateAppAssetSource(primaryUrl, fallbackUrl) {
    const snapAssetInfo = {
        alias: snapAlias,
        src: snapDefaultUrl,
        version: snapVersion,
        target: snapTarget,
        mandatory: false
    };
    // before trying custom urls check to see if you already have snap
    const snapDownloadedAssetInfo = await (0,_app_asset__WEBPACK_IMPORTED_MODULE_1__.doesAppAssetExist)(snapAssetInfo.alias, snapAssetInfo.version);
    if (snapDownloadedAssetInfo) {
        logInformation(`We have a snap asset that matches the alias and version. It has the following details: alias: ${snapDownloadedAssetInfo.alias}, version: ${snapDownloadedAssetInfo.version}, src: ${snapDownloadedAssetInfo.src}`);
        return {
            success: true,
            validatedUrl: snapDownloadedAssetInfo.src,
            isFallbackUrl: snapDownloadedAssetInfo.src === fallbackUrl
        };
    }
    // SNAP downloads a specific alias + version combination.
    // The runtime does not allow a retry of the same app asset if the only thing that has changed is the url.
    // Since we have no snap version we want to validate our primary url.
    logInformation(`Validating the primary asset url for the snap asset: ${primaryUrl}`);
    snapAssetInfo.alias = `${snapAlias}-validate-download`; // use a different alias for the validation download so that we can have different versions if needed without conflict with the actual snap asset alias
    snapAssetInfo.target = "NoOp"; // We don't want to actually run the snap asset during validation since we just want to check if the url is valid and the asset can be downloaded, so use a NoOp target that will not do anything if it is run for any reason during the validation process
    // Update asset info to target primary url
    snapAssetInfo.src = primaryUrl; // update the src to the primary url for the validation download
    snapAssetInfo.version = hashUrl(primaryUrl); // use the url hash as the version for the validation download so that if the url changes we will attempt to download again, but if the url is the same we will not attempt to download again since we have already validated it
    const validatedAppAssetPrimaryUrl = await fetchAppAsset(snapAssetInfo);
    let validatedAssetUrl;
    if (validatedAppAssetPrimaryUrl === undefined) {
        if (fallbackUrl) {
            // validate fallback url
            logInformation(`Validating the fallback asset url for the snap asset: ${fallbackUrl}`);
            snapAssetInfo.src = fallbackUrl; // update the src to the fallback url for the validation download
            snapAssetInfo.version = hashUrl(fallbackUrl); // use the url hash as the version for the validation download so that if the url changes we will attempt to download again, but if the url is the same we will not attempt to download again since we have already validated it
            const validatedAppAssetFallbackUrl = await fetchAppAsset(snapAssetInfo);
            if (validatedAppAssetFallbackUrl) {
                validatedAssetUrl = fallbackUrl;
            }
        }
    }
    else {
        validatedAssetUrl = primaryUrl;
    }
    if (validatedAssetUrl) {
        logInformation(`Successfully validated the url for the snap asset: ${validatedAssetUrl}. This url will be passed to Snap Options through the customSnapAssetSource setting.`);
        return {
            success: true,
            validatedUrl: validatedAssetUrl,
            isFallbackUrl: validatedAssetUrl === fallbackUrl
        };
    }
    return { success: false };
}
/**
 * Download and return app asset info for the provided app asset definition.
 * @param appAssetInfo The app asset definition to download.
 * @returns The app asset info if downloaded or found, otherwise undefined.
 */
async function fetchAppAsset(appAssetInfo) {
    const validatedAppAsset = await (0,_app_asset__WEBPACK_IMPORTED_MODULE_1__.downloadAppAsset)(appAssetInfo, {
        logger: customLogger,
        assetDownloadProgress: (progress, src, alias) => {
            // showing a difference as the download App Asset also logs the download progress using logInformation and logError through the custom logger.
            console.log(`Download progress for alias '${alias}' from '${src}': ${progress}%`);
        }
    });
    return validatedAppAsset;
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDQTs7Ozs7OztHQU9HO0FBQ0ksS0FBSyxVQUFVLGdCQUFnQixDQUNyQyxrQkFBd0MsRUFDeEMsT0FHQztJQUVELE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztJQUNuQyxNQUFNLE1BQU0sR0FBRyxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN6QixNQUFNLEVBQUUsS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7UUFDaEYsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEQsTUFBTSxFQUFFLEtBQUssQ0FDWiwySUFBMkksQ0FDM0ksQ0FBQztRQUNGLE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7SUFDdkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQzNCLE1BQU0sRUFBRSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUNsRixPQUFPLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBRUQsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDO0lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QixNQUFNLEVBQUUsS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7UUFDbkYsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztJQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDN0IsTUFBTSxFQUFFLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQyxDQUFDO1FBQ3BGLE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNLHFCQUFxQixHQUF5QjtRQUNuRCxLQUFLO1FBQ0wsR0FBRztRQUNILE1BQU07UUFDTixPQUFPO1FBQ1AsU0FBUyxFQUFFLGtCQUFrQixDQUFDLFNBQVM7UUFDdkMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUk7S0FDN0IsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLE1BQU0saUJBQWlCLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQ3BCLHdCQUF3QixxQkFBcUIsQ0FBQyxLQUFLLFlBQVkscUJBQXFCLENBQUMsT0FBTyxZQUFZLHFCQUFxQixDQUFDLEdBQUcsdUNBQXVDLENBQ3hLLENBQUM7UUFDRixPQUFPLFlBQVksQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5FLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsaUZBQWlGLENBQUMsQ0FBQztRQUNoRyxPQUFPLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBRUQsT0FBTywwQkFBMEIsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksS0FBSyxVQUFVLGlCQUFpQixDQUN0QyxLQUFhLEVBQ2IsT0FBZ0IsRUFDaEIsR0FBWTtJQUVaLElBQUksQ0FBQztRQUNKLE1BQU0sWUFBWSxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFLENBQUM7WUFDakQsT0FBTyxTQUFTLENBQUM7UUFDbEIsQ0FBQztRQUNELElBQUksR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDckMsT0FBTyxTQUFTLENBQUM7UUFDbEIsQ0FBQztRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3JCLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUiwrREFBK0Q7SUFDaEUsQ0FBQztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ2xCLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsS0FBSyxVQUFVLDBCQUEwQixDQUN4QyxrQkFBd0MsRUFDeEMsT0FHQztJQUVELElBQUkseUJBQTJELENBQUM7SUFDaEUsSUFBSSxDQUFDO1FBQ0osTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQy9ELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzdGLElBQUksT0FBTyxFQUFFLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3BDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxpQkFBaUIsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEcsQ0FBQztZQUNELE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUNwQixjQUFjLGlCQUFpQiw2QkFBNkIsa0JBQWtCLENBQUMsS0FBSyxnQkFBZ0Isa0JBQWtCLENBQUMsT0FBTyxZQUFZLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUNsSyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxxRkFBcUY7UUFDckYseUJBQXlCLEdBQUcsTUFBTSxpQkFBaUIsQ0FDbEQsa0JBQWtCLENBQUMsS0FBSyxFQUN4QixrQkFBa0IsQ0FBQyxPQUFPLEVBQzFCLGtCQUFrQixDQUFDLEdBQUcsQ0FDdEIsQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsNkJBQTZCLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNELE9BQU8seUJBQXlCLENBQUM7QUFDbEMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxLQUFLLFVBQVUsdUJBQXVCLENBQUMsTUFBZTtJQUM1RCxJQUFJLG9CQUFvQixHQUFZLEtBQUssQ0FBQztJQUMxQyxJQUFJLENBQUM7UUFDSixNQUFNLDRCQUE0QixHQUNqQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMzRSxvQkFBb0IsR0FBRyw0QkFBNEIsRUFBRSxPQUFPLENBQUM7SUFDOUQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsTUFBTSxFQUFFLEtBQUssQ0FBQyw0REFBNEQsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUNELE9BQU8sb0JBQW9CLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxLQUFjO0lBQy9CLGdEQUFnRDtJQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUNyRCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsYUFBYSxDQUFDLEtBQWM7SUFDcEMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLE9BQU8sQ0FBQyxLQUFjO0lBQ3JDLGdEQUFnRDtJQUNoRCxPQUFPLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztBQUM5QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsUUFBUSxDQUFDLEtBQWM7SUFDdEMsZ0RBQWdEO0lBQ2hELE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEcsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFZO0lBQ2hDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO1NBQU0sSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7UUFDakMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BCLENBQUM7U0FBTSxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9CLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztTQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3ZFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQixDQUFDO0lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlQRCxPQUFPLFFBQVEsc0dBQXNHLDZDQUE2QyxxRkFBcUYsNkVBQTZFLGFBQWEsc0NBQXNDLGdDQUFnQyxhQUFhLGFBQWEsa0JBQWtCLHlDQUF5QyxpQ0FBaUMsY0FBYywyQkFBMkIsYUFBYSw2RkFBNkYsU0FBUyxRQUFRLCtCQUErQiwwQ0FBMEMsTUFBTSxRQUFRLEVBQUUsRUFBRSx5R0FBeUcsU0FBUyxjQUFjLHlIQUF5SCxjQUFjLHNFQUFzRSxvQkFBb0IsWUFBWSxzTkFBc04sOEdBQThHLFlBQVksMkpBQTJKLHNIQUFzSCxTQUFTLGFBQWEsc0xBQXNMLGtCQUFrQixPQUFPLGtEQUFrRCxhQUFhLGlDQUFpQyxrQkFBa0IsZ0JBQWdCLHVCQUF1QixXQUFXLDhFQUE4RSxrQ0FBa0MsV0FBVyw2QkFBNkIsU0FBUyxrQkFBa0IsY0FBYyxtQkFBbUIsZUFBZSxXQUFXLGlDQUFpQyw4QkFBOEIsU0FBUyxnQkFBZ0IsMkJBQTJCLElBQUksY0FBYyxTQUFTLG9CQUFvQix3REFBd0QsS0FBSyw2SUFBNkksbUNBQW1DLHdDQUF3QyxHQUFHLCtDQUErQyw2QkFBNkIsU0FBUyxpQkFBaUIsK0pBQStKLEtBQUssb0JBQW9CLGdMQUFnTCx5Q0FBeUMsNklBQTZJLGlDQUFpQyx3Q0FBd0MsZUFBZSw4QkFBOEIsaUJBQWlCLG1CQUFtQix5QkFBeUIsaUNBQWlDLG9DQUFvQyxvQkFBb0IsTUFBTSxNQUFNLG1EQUFtRCw4REFBOEQsb0JBQW9CLFdBQVcsdUJBQXVCLG9DQUFvQyxLQUFLLHdCQUF3QixRQUFRLElBQUksbUJBQW1CLFNBQVMsdUNBQXVDLHNCQUFzQixrRkFBa0Ysc0JBQXNCLGdDQUFnQyx3Q0FBd0MsK0NBQStDLHFEQUFxRCwwQ0FBMEMsY0FBYyw4Q0FBOEMsaUNBQWlDLDhKQUE4Siw4QkFBOEIsc0JBQXNCLEtBQUssb0NBQW9DLG9CQUFvQixNQUFNLG1CQUFtQiw4QkFBOEIsS0FBSyxhQUFhLGdCQUFnQixRQUFRLDhGQUE4RixZQUFZLHVGQUF1RixVQUFVLHlDQUF5QywyTUFBMk0seUJBQXlCLHVCQUF1QixRQUFRLFdBQVcsNERBQTRELDJHQUEyRyx1REFBdUQsb0NBQW9DLEtBQUssZ0NBQWdDLFlBQVksbUNBQW1DLG9CQUFvQixzQ0FBc0Msb0JBQW9CLCtCQUErQix3RUFBd0UsK0RBQStELGdEQUFnRCxNQUFNLGNBQWMsV0FBVywrQkFBK0IsWUFBWSxZQUFZLHFDQUFxQyxZQUFZLCtEQUErRCx1QkFBdUIsRUFBRSxzREFBc0QsYUFBYSw2Q0FBNkMsR0FBRyxFQUFFLG9FQUFvRSxjQUFjLElBQUkseUNBQXlDLFFBQVEsZUFBZSxTQUFTLFVBQVUsZ0NBQWdDLFFBQVEsMkJBQTJCLCtMQUErTCxxRkFBcUYsRUFBRSx1RUFBdUUsbUZBQW1GLEVBQUUsc0ZBQXNGLGlEQUFpRCxFQUFFLCtDQUErQyxFQUFFLDJHQUEyRyx5REFBeUQsZUFBZSxJQUFJLDBDQUEwQywrRkFBK0YsZUFBZSx1R0FBdUcsU0FBUyw0Q0FBNEMsRUFBRSxHQUFHLDBGQUEwRixxSEFBcUgsZUFBZSw4TEFBOEwsNktBQTZLLG1DQUFtQyxpR0FBaUcsbUZBQW1GLHFFQUFxRSxrREFBa0QsRUFBRSxXQUFXLDhDQUE4QyxFQUFFLElBQUksU0FBUyxlQUFlLEVBQUUsc0NBQXNDLDJDQUEyQyxJQUFJLHVDQUF1QyxFQUFFLFNBQVMsMERBQTBELDRCQUE0Qix5Q0FBeUMsT0FBTyx1Q0FBdUMsdUJBQXVCLG9EQUFvRCxFQUFFLElBQUksNkRBQTZELFNBQVMsMERBQTBELHNCQUFzQixnQkFBZ0IsK0JBQStCLGtCQUFrQiwwQkFBMEIsYUFBYSw4REFBOEQsK0NBQStDLGtCQUFrQixHQUFHLHlCQUF5Qiw4REFBOEQsK0NBQStDLGtDQUFrQyxRQUFRLEdBQUcsa0JBQWtCLDhEQUE4RCx1REFBdUQseUJBQXlCLEdBQUcseUJBQXlCLHdCQUF3Qiw4REFBOEQsK0NBQStDLG9DQUFvQyxrQkFBa0IsR0FBRyw0QkFBNEIsOERBQThELCtDQUErQyx3QkFBd0IsR0FBRywyQkFBMkIsOERBQThELCtDQUErQyx1QkFBdUIsR0FBRyxrQ0FBa0MsNkpBQTZKLGtCQUFrQixHQUFHLDBCQUEwQix1REFBdUQsYUFBYSwrQ0FBK0MsOEJBQThCLEdBQUcsaUlBQWlJLGtEQUFrRCxvQkFBb0IsNEJBQTRCLGlCQUFpQixxQ0FBcUMsRUFBRSxpQ0FBaUMsMEZBQTBGLEVBQUUsd0JBQXdCLEVBQUUsR0FBRywwQkFBMEIsT0FBTyxrQ0FBa0MsdUJBQXVCLDREQUE0RCxnQkFBZ0IsbUVBQW1FLGlDQUFpQyxnQ0FBZ0MsOEJBQThCLFNBQVMsK0JBQStCLHVCQUF1QixlQUFlLE1BQU0sWUFBWSxZQUFZLG9CQUFvQixtQkFBbUIsT0FBTywwREFBMEQsOEJBQThCLGlDQUFpQyw2Q0FBNkMsa0JBQWtCLEdBQUcsNEJBQTRCLCtDQUErQyx3Q0FBd0MsOENBQThDLEdBQUcscUNBQXFDLG1DQUFtQyxxRkFBcUYscURBQXFELDZCQUE2QiwrQ0FBK0MseUJBQXlCLDJEQUEyRCxHQUFHLHlCQUF5QiwrQ0FBK0Msa0NBQWtDLFlBQVksR0FBRyxxQkFBcUIsc0RBQXNELHVDQUF1QyxZQUFZLHFCQUFxQix3QkFBd0Isc0RBQXNELGlDQUFpQyxZQUFZLDJCQUEyQixzQkFBc0IscUJBQXFCLHlCQUF5QixzQkFBc0IsVUFBVSx1QkFBdUIsOEJBQThCLDRCQUE0QixpQkFBaUIsMENBQTBDLDBCQUEwQixFQUFFLHlDQUF5QyxrREFBa0Qsd0NBQXdDLEdBQUcsd0VBQXdFLDBCQUEwQiw2QkFBNkIsNEJBQTRCLGlCQUFpQiwwQ0FBMEMsV0FBVyxFQUFFLHlDQUF5QyxrREFBa0QsdUNBQXVDLEdBQUcsbUVBQW1FLHlCQUF5Qiw0QkFBNEIsNEJBQTRCLGlCQUFpQiwwQ0FBMEMsV0FBVyxFQUFFLHlDQUF5QyxrREFBa0QsZ0NBQWdDLEdBQUcsOEVBQThFLDJCQUEyQiw4QkFBOEIsNEJBQTRCLDZCQUE2QiwwQ0FBMEMsdUJBQXVCLEVBQUUsc0RBQXNELCtDQUErQyxnQ0FBZ0MsR0FBRywyQkFBMkIsdURBQXVELG9DQUFvQyxXQUFXLEdBQUcsb0RBQW9ELDRCQUE0QixNQUFNLHVCQUF1QixzREFBc0Qsd0JBQXdCLHFCQUFxQix1QkFBdUIsK0NBQStDLGdDQUFnQyxXQUFXLEdBQUcsc0JBQXNCLCtDQUErQywrQkFBK0IsV0FBVyxHQUFHLHNCQUFzQiw2QkFBNkIsZ0NBQWdDLHVMQUF1TCx5QkFBeUIsd0dBQXdHLGVBQWUsc0RBQXNELElBQUksbUNBQW1DLDZCQUE2QixrREFBa0QsRUFBRSxNQUFNLG1FQUFtRSw4RUFBOEUsZ0NBQWdDLDZCQUE2QixnREFBZ0QsRUFBRSxNQUFNLGtFQUFrRSw4TEFBOEwsdUJBQXVCLG9IQUFvSCxnRUFBZ0UscUJBQXFCLEdBQUcsbUJBQW1CLHFHQUFxRyxnQ0FBZ0MsSUFBSSwrQ0FBK0MsMkRBQTJELDRCQUE0Qix1RkFBdUYscUhBQXFILDhCQUE4QixTQUFTLDREQUE0RCxxRUFBcUUsdUdBQXVHLDZFQUE2RSxTQUFTLDhGQUE4Riw2QkFBNkIsUUFBUSxrQ0FBa0Msa0JBQWtCLG9HQUFvRyx5QkFBeUIsK0JBQStCLHdCQUF3QiwwQkFBMEIsc0JBQXNCLDZCQUE2QixnSEFBZ0gsT0FBTyxHQUFHLE9BQU8sK0RBQStELHlCQUF5Qix1REFBdUQsWUFBWSxxQkFBcUIsZ0VBQWdFLEVBQUUsV0FBVyxFQUFFLFNBQVMsT0FBTyxTQUFTLE9BQU8seURBQXlELG1CQUFtQiwwQkFBMEIsc0JBQXNCLHFDQUFxQyxnQ0FBZ0MsWUFBWSw0REFBNEQsNkNBQTZDLGtEQUFrRCw0Q0FBNEMsRUFBRSxNQUFNLGdFQUFnRSxhQUFhLEVBQUUsTUFBTSwrREFBK0QsYUFBYSxFQUFFLE1BQU0sMERBQTBELGFBQWEsRUFBRSxNQUFNLHdEQUF3RCxhQUFhLEVBQUUsTUFBTSxzREFBc0QsYUFBYSxFQUFFLE1BQU0sMERBQTBELGFBQWEsRUFBRSxNQUFNLDhEQUE4RCxhQUFhLEdBQUcscUJBQXFCLGtCQUFrQiw2Q0FBNkMsNEJBQTRCLGNBQWMsZ0JBQWdCLEVBQUUsNlFBQTZRLG1DQUFtQywySEFBMkgsdUNBQXVDLGtDQUFrQyxnQkFBZ0IscUNBQXFDLG1CQUFtQixvSkFBb0oscUJBQXFCLHFDQUFxQyxnQkFBZ0Isa0lBQWtJLFNBQVMsNkNBQTZDLDRCQUE0QixHQUFHLDBDQUEwQyw0QkFBNEIsUUFBUSwwQkFBMEIsV0FBVyxZQUFZLGtCQUFrQiw4RkFBOEYsa0NBQWtDLHdGQUF3RixtU0FBbVMsZ0JBQWdCLHFCQUFxQix5RUFBeUUsaUNBQWlDLElBQUksYUFBYSw2QkFBNkIsdUZBQXVGLEVBQUUsT0FBTyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxxQkFBcUIsc0M7Ozs7OztVQ0EvaXBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ0wwQztBQUV3QjtBQUVsRSxNQUFNLGtCQUFrQixHQUFHLGlDQUFpQyxDQUFDO0FBQzdELE1BQU0sY0FBYyxHQUFHLG9EQUFvRCxDQUFDO0FBQzVFLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUM1QixNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFDakMsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7QUFFckMsbUJBQW1CO0FBQ25CLElBQUksa0JBQTJDLENBQUM7QUFDaEQsSUFBSSx1QkFBZ0QsQ0FBQztBQUNyRCxJQUFJLGFBQXNDLENBQUM7QUFDM0MsSUFBSSxxQkFBOEMsQ0FBQztBQUNuRCxJQUFJLGtCQUEyQyxDQUFDO0FBQ2hELElBQUksNkJBQXNELENBQUM7QUFFM0QsSUFBSSxtQkFBNEMsQ0FBQztBQUNqRCxJQUFJLG9CQUE2QyxDQUFDO0FBQ2xELElBQUksZ0NBQXlELENBQUM7QUFDOUQsSUFBSSw2QkFBc0QsQ0FBQztBQUMzRCxJQUFJLHlCQUFrRCxDQUFDO0FBQ3ZELElBQUksYUFBc0MsQ0FBQztBQUMzQyxJQUFJLGNBQXVDLENBQUM7QUFDNUMsSUFBSSxlQUFtQyxDQUFDO0FBQ3hDLElBQUksZ0JBQW9DLENBQUM7QUFDekMsSUFBSSx5QkFBNkMsQ0FBQztBQUVsRCxJQUFJLFFBQWtDLENBQUM7QUFDdkMsSUFBSSxPQUFpQyxDQUFDO0FBQ3RDLElBQUksZ0JBQTBDLENBQUM7QUFDL0MsSUFBSSxnQkFBMEMsQ0FBQztBQUMvQyxJQUFJLHNCQUFnRCxDQUFDO0FBQ3JELElBQUksaUJBQTJDLENBQUM7QUFDaEQsSUFBSSxVQUFvQyxDQUFDO0FBQ3pDLElBQUksWUFBc0MsQ0FBQztBQUMzQyxJQUFJLFNBQW1DLENBQUM7QUFDeEMsSUFBSSxRQUFrQyxDQUFDO0FBQ3ZDLElBQUksaUJBQTJDLENBQUM7QUFDaEQsSUFBSSxtQkFBNkMsQ0FBQztBQUNsRCxJQUFJLGdCQUEwQyxDQUFDO0FBQy9DLElBQUksWUFBc0MsQ0FBQztBQUMzQyxJQUFJLGNBQXdDLENBQUM7QUFDN0MsSUFBSSxZQUFzQyxDQUFDO0FBQzNDLElBQUksNEJBQXNELENBQUM7QUFDM0QsSUFBSSxXQUFxQyxDQUFDO0FBQzFDLElBQUksWUFBeUMsQ0FBQztBQUM5QyxJQUFJLE9BQThCLENBQUM7QUFDbkMsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7QUFFN0IsSUFBSSxXQUFXLEdBQW9ELFNBQVMsQ0FBQztBQUM3RSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDekIsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7QUFDN0IsSUFBSSxNQUFtQyxDQUFDO0FBRXhDOztHQUVHO0FBQ0gsTUFBTSxZQUFZLEdBQUc7SUFDcEIsSUFBSSxFQUFFLENBQUMsT0FBZ0IsRUFBRSxHQUFHLGNBQXlCLEVBQVEsRUFBRTtRQUM5RCxjQUFjLENBQUMsR0FBRyxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEdBQUcsY0FBeUIsRUFBUSxFQUFFO1FBQy9ELFFBQVEsQ0FBQyxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLE9BQWdCLEVBQUUsR0FBRyxjQUF5QixFQUFRLEVBQUU7UUFDOUQsUUFBUSxDQUFDLEdBQUcsT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxHQUFHLGNBQXlCLEVBQVEsRUFBRTtRQUMvRCxjQUFjLENBQUMsR0FBRyxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEdBQUcsY0FBeUIsRUFBUSxFQUFFO1FBQy9ELGNBQWMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEcsQ0FBQztDQUNELENBQUM7QUFFRixxQ0FBcUM7QUFDckMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3RELDRDQUE0QztJQUM1QyxNQUFNLGFBQWEsRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBRUg7O0dBRUc7QUFDSCxLQUFLLFVBQVUsYUFBYTtJQUMzQixrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JGLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW1CLDBCQUEwQixDQUFDLENBQUM7SUFDL0YsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW1CLGdCQUFnQixDQUFDLENBQUM7SUFDM0UscUJBQXFCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsd0JBQXdCLENBQUMsQ0FBQztJQUMzRixrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JGLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW1CLHNCQUFzQixDQUFDLENBQUM7SUFDdkYsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsdUJBQXVCLENBQUMsQ0FBQztJQUN6RixnQ0FBZ0MsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN4RCxtQ0FBbUMsQ0FDbkMsQ0FBQztJQUVGLDZCQUE2QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW1CLGdDQUFnQyxDQUFDLENBQUM7SUFDM0csNkJBQTZCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBbUIsZ0NBQWdDLENBQUMsQ0FBQztJQUMzRyx5QkFBeUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQiw0QkFBNEIsQ0FBQyxDQUFDO0lBQ25HLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFtQixpQkFBaUIsQ0FBQyxDQUFDO0lBQzdFLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFjLGtCQUFrQixDQUFDLENBQUM7SUFDMUUsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBYyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVFLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQWMsNEJBQTRCLENBQUMsQ0FBQztJQUU5RixRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsV0FBVyxDQUFDLENBQUM7SUFDbEUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLFVBQVUsQ0FBQyxDQUFDO0lBQ2hFLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUF1QixlQUFlLENBQUMsQ0FBQztJQUM3RSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xGLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLG1CQUFtQixDQUFDLENBQUM7SUFDbEYsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0Isb0JBQW9CLENBQUMsQ0FBQztJQUNwRixVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsZUFBZSxDQUFDLENBQUM7SUFDeEUsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGlCQUFpQixDQUFDLENBQUM7SUFDNUUsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLHFCQUFxQixDQUFDLENBQUM7SUFDN0UsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLFdBQVcsQ0FBQyxDQUFDO0lBQ2xFLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLG9CQUFvQixDQUFDLENBQUM7SUFDcEYsbUJBQW1CLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0Isc0JBQXNCLENBQUMsQ0FBQztJQUN4RixnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xGLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixlQUFlLENBQUMsQ0FBQztJQUMxRSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsaUJBQWlCLENBQUMsQ0FBQztJQUM5RSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsZUFBZSxDQUFDLENBQUM7SUFDMUUsNEJBQTRCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsK0JBQStCLENBQUMsQ0FBQztJQUMxRyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBaUIsVUFBVSxDQUFDLENBQUM7SUFDN0QsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLHNCQUFzQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLHlCQUF5QixDQUFDLENBQUM7SUFFOUYsSUFDQyxrQkFBa0I7UUFDbEIsdUJBQXVCO1FBQ3ZCLGFBQWE7UUFDYixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsZ0NBQWdDO1FBQ2hDLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0IseUJBQXlCO1FBQ3pCLGFBQWE7UUFDYixjQUFjO1FBQ2QsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQix5QkFBeUI7UUFDekIsUUFBUTtRQUNSLE9BQU87UUFDUCxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixjQUFjO1FBQ2QsWUFBWTtRQUNaLDRCQUE0QjtRQUM1QixXQUFXO1FBQ1gsc0JBQXNCLEVBQ3JCLENBQUM7UUFDRixhQUFhLENBQUMsS0FBSyxHQUFHLHNDQUFzQyxDQUFDO1FBQzdELGNBQWMsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLHlCQUF5QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDekQsTUFBTSxPQUFPLEdBQUcseUJBQXlCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNqRSxJQUFJLGVBQWUsRUFBRSxDQUFDO2dCQUNyQixlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDekMsQ0FBQztZQUNELElBQUksZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEIsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDMUMsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpDLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxFQUFFLENBQUM7WUFDN0YseUJBQXlCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEQsQ0FBQztRQUVELElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3ZELFFBQVEsQ0FDUCxvR0FBb0csQ0FDcEcsQ0FBQztZQUNGLGtCQUFrQixFQUFFLENBQUM7WUFDckIsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNuQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM5Qix1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdEMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNuQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDO2FBQU0sQ0FBQztZQUNQLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQzdDLElBQUksQ0FBQztvQkFDSixXQUFXLEdBQUcsVUFBVSxDQUFDO29CQUN6QixrQkFBa0IsRUFBRSxDQUFDO29CQUVyQixjQUFjLENBQUMsZ0NBQWdDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3ZFLE1BQU0sR0FBRyxJQUFJLHlEQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25ELElBQUksU0FBaUQsQ0FBQztvQkFDdEQsSUFBSSxXQUF5QyxDQUFDO29CQUU5QyxJQUFJLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQzt3QkFDNUIsTUFBTSxZQUFZLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQzt3QkFDdkMsSUFBSSxZQUFZLEtBQUssTUFBTSxFQUFFLENBQUM7NEJBQzdCLFNBQVMsR0FBRyxNQUFNLENBQUM7d0JBQ3BCLENBQUM7NkJBQU0sSUFBSSxZQUFZLEtBQUssT0FBTyxFQUFFLENBQUM7NEJBQ3JDLFNBQVMsR0FBRyxPQUFPLENBQUM7d0JBQ3JCLENBQUM7b0JBQ0YsQ0FBQztvQkFFRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLENBQUM7d0JBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxFQUFFLEtBQUssQ0FBQzt3QkFDN0MsSUFBSSxnQkFBZ0IsS0FBSyxNQUFNLEVBQUUsQ0FBQzs0QkFDakMsV0FBVyxHQUFHLE1BQU0sQ0FBQzt3QkFDdEIsQ0FBQzs2QkFBTSxJQUFJLGdCQUFnQixLQUFLLE9BQU8sRUFBRSxDQUFDOzRCQUN6QyxXQUFXLEdBQUcsT0FBTyxDQUFDO3dCQUN2QixDQUFDO29CQUNGLENBQUM7b0JBRUQsTUFBTSxPQUFPLEdBQWtCO3dCQUM5QixTQUFTLEVBQUUsa0JBQWtCLEVBQUUsT0FBTzt3QkFDdEMsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUUsT0FBTzt3QkFDcEQsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLFlBQVksRUFBRSxXQUFXO3dCQUN6Qiw2QkFBNkIsRUFBRSxxQkFBcUIsRUFBRSxPQUFPO3dCQUM3RCxzQkFBc0IsRUFBRSxrQkFBa0IsRUFBRSxPQUFPO3dCQUNuRCxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxPQUFPO3dCQUM5QyxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUMsU0FBUzt3QkFDekYsZ0JBQWdCLEVBQUUsZ0NBQWdDLEVBQUUsT0FBTzs0QkFDMUQsQ0FBQyxDQUFDLHNCQUFzQixHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7NEJBQzlDLENBQUMsQ0FBQyxTQUFTO3dCQUNaLDBCQUEwQixFQUFFLDZCQUE2QixFQUFFLE9BQU87d0JBQ2xFLDBCQUEwQixFQUFFLDZCQUE2QixFQUFFLE9BQU87d0JBQ2xFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUE4Qjt3QkFDbEUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUF1RDtxQkFDeEUsQ0FBQztvQkFFRixJQUFJLHlCQUF5QixFQUFFLE9BQU8sRUFBRSxDQUFDO3dCQUN4QyxNQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQzt3QkFDOUMsTUFBTSxXQUFXLEdBQUcsY0FBYyxFQUFFLEtBQUssQ0FBQzt3QkFFMUMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDaEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNoQyxRQUFRLENBQ1AsNkhBQTZILENBQzdILENBQUM7NEJBQ0YsT0FBTzt3QkFDUixDQUFDO3dCQUNELE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLENBQUM7b0JBQ2hFLENBQUM7b0JBRUQsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUU1QixJQUFJLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDO3dCQUNqQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ3pCLENBQUM7eUJBQU0sQ0FBQzt3QkFDUCxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7b0JBQzFCLENBQUM7b0JBQ0QsTUFBTSxNQUFNLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztvQkFFNUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLENBQUMsS0FBaUMsRUFBRSxFQUFFO3dCQUNsRixjQUFjLENBQUMsc0JBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUMvRCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFtQyxFQUFFLEVBQUU7d0JBQ3RGLGNBQWMsQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2hFLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxrQkFBa0IsRUFBRSxDQUFDOzRCQUMzQyxZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUNyQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7NEJBQ3pCLGtCQUFrQixFQUFFLENBQUM7d0JBQ3RCLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUMsS0FBZ0MsRUFBRSxFQUFFO3dCQUNoRixjQUFjLENBQUMscUJBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM3RCxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxrQkFBa0IsRUFBRSxDQUFDOzRCQUNuRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7NEJBQ3hCLGtCQUFrQixFQUFFLENBQUM7d0JBQ3RCLENBQUM7b0JBQ0YsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsS0FBK0IsRUFBRSxFQUFFO3dCQUM5RSxjQUFjLENBQUMsb0JBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1RCxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssa0JBQWtCLEVBQUUsQ0FBQzs0QkFDM0MsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDOzRCQUN6QixrQkFBa0IsRUFBRSxDQUFDO3dCQUN0QixDQUFDO29CQUNGLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEtBQWdDLEVBQUUsRUFBRTt3QkFDaEYsY0FBYyxDQUFDLHFCQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDOUQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLENBQUMsS0FBa0MsRUFBRSxFQUFFO3dCQUNwRixjQUFjLENBQUMsdUJBQXVCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoRSxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFrQyxFQUFFLEVBQUU7d0JBQ3JGLGNBQWMsQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pFLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEtBQThCLEVBQUUsRUFBRTt3QkFDNUUsY0FBYyxDQUFDLG1CQUFtQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUQsQ0FBQyxDQUFDLENBQUM7b0JBRUgsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBRXRDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUV6QyxNQUFNLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1RCxjQUFjLENBQ2IsdUNBQXVDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxRQUFRLEVBQUUsQ0FDcEYsQ0FBQztvQkFFRixXQUFXLEdBQUcsU0FBUyxDQUFDO2dCQUN6QixDQUFDO2dCQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7b0JBQ2QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixDQUFDO3dCQUFTLENBQUM7b0JBQ1Ysa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDNUMsSUFBSSxDQUFDO29CQUNKLFdBQVcsR0FBRyxVQUFVLENBQUM7b0JBQ3pCLGtCQUFrQixFQUFFLENBQUM7b0JBRXJCLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLE1BQU0sRUFBRSxDQUFDO3dCQUNaLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUNqRCxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztvQkFDRCxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO29CQUNkLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzt3QkFBUyxDQUFDO29CQUNWLE1BQU0sR0FBRyxTQUFTLENBQUM7b0JBQ25CLFdBQVcsR0FBRyxTQUFTLENBQUM7b0JBQ3hCLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQ3JCLGdCQUFnQixHQUFHLEtBQUssQ0FBQztvQkFDekIsa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNyRCxNQUFNLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RELE1BQU0sWUFBWSxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUN6Riw4REFBOEQ7Z0JBQzlELE1BQU0sV0FBVyxHQUFJLFdBQVcsQ0FBQyxJQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RixNQUFNLFNBQVMsQ0FDZCxpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLEdBQUcsV0FBVyxXQUFXLFlBQVksQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLE9BQU8sS0FBSyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQzlGLEVBQUUsRUFDRjtvQkFDQyxJQUFJLEVBQUUscUJBQXFCO29CQUMzQixTQUFTLEVBQUUsS0FBSztvQkFDaEIsVUFBVSxFQUFFLG1CQUFtQjtpQkFDL0IsQ0FDRCxDQUFDO2dCQUNGLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLGdCQUFnQixHQUFHLEtBQUssQ0FBQztnQkFDekIsa0JBQWtCLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDdEQsTUFBTSxzQkFBc0IsRUFBRSxDQUFDO2dCQUMvQixrQkFBa0IsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBRUgsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUN0RCxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxDQUFDO29CQUNqQyxNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7b0JBQ3RDLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsS0FBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUN4QixrQkFBa0IsRUFBRSxDQUFDO2dCQUN0QixDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hELElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1osTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ2pELGdCQUFnQixHQUFHLEtBQUssQ0FBQztvQkFDekIsa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNyRCxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNaLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ3JFLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDckMsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQzFDLFFBQVEsRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7WUFFSCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNqRCxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNaLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN4QyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDbkQsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hFLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0IsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNqRCxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNaLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUM3QyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzVCLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0gsNEJBQTRCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNqRSxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNaLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2RSxjQUFjLENBQUMsZ0NBQWdDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQzNELENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUNILHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDM0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWixnQkFBZ0IsR0FBRyxDQUFDLGdCQUFnQixDQUFDO29CQUNyQyxNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0gsa0JBQWtCLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxPQUFPLENBQUMsR0FBVztJQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFDaEIsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2pDLElBQUksR0FBRyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7SUFDbkQsQ0FBQztJQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFZO0lBQ2hDLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRSxDQUFDO1FBQzFCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQixDQUFDO1NBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUNwQyxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxrQkFBa0I7SUFDMUIsSUFDQyxrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLHVCQUF1QjtRQUN2QixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLFFBQVE7UUFDUixPQUFPO1FBQ1AsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixZQUFZO1FBQ1osY0FBYztRQUNkLFlBQVk7UUFDWiw0QkFBNEI7UUFDNUIsc0JBQXNCLEVBQ3JCLENBQUM7UUFDRixJQUFJLFdBQVcsS0FBSyxVQUFVLElBQUksV0FBVyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQzlELGtCQUFrQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbkMsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDOUIsdUJBQXVCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN4QyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbkMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekIsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDeEIsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDN0IsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDL0IsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDN0IsNEJBQTRCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM3QyxzQkFBc0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLFdBQVcsRUFBRSxDQUFDO1FBQzVELENBQUM7YUFBTSxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN0QyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ25DLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzlCLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDeEMscUJBQXFCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN0QyxrQkFBa0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLFlBQVksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzlCLGNBQWMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLFlBQVksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzlCLDRCQUE0QixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDOUMsc0JBQXNCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN4QyxZQUFZLENBQUMsV0FBVyxHQUFHLHdCQUF3QixDQUFDO1FBQ3JELENBQUM7YUFBTSxDQUFDO1lBQ1Asa0JBQWtCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNwQyxhQUFhLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMvQix1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3pDLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdkMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNwQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN4QixZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM3QixjQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUMvQixZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUM3Qiw0QkFBNEIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzdDLHNCQUFzQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkMsWUFBWSxDQUFDLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQztRQUNyRCxDQUFDO0lBQ0YsQ0FBQztJQUNELGtCQUFrQixFQUFFLENBQUM7QUFDdEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxrQkFBa0I7SUFDMUIsSUFDQyxnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGdCQUFnQixFQUNmLENBQUM7UUFDRixJQUFJLFdBQVcsS0FBSyxVQUFVLElBQUksV0FBVyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQzlELGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDakMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNqQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNwQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLENBQUM7YUFBTSxJQUFJLFdBQVcsS0FBSyxTQUFTLElBQUksWUFBWSxFQUFFLENBQUM7WUFDdEQsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNqQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7WUFDOUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1lBQzlDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1lBQ2pELGdCQUFnQixDQUFDLFFBQVEsR0FBRyxDQUFDLGdCQUFnQixDQUFDO1FBQy9DLENBQUM7YUFBTSxDQUFDO1lBQ1AsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLFdBQVcsS0FBSyxTQUFTLENBQUM7WUFDdEQsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLFdBQVcsS0FBSyxTQUFTLENBQUM7WUFDdEQsaUJBQWlCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNsQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDcEMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxXQUFtQjtJQUMxQyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxNQUFNLENBQUM7UUFDakUsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7QUFDRixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxRQUFRLENBQUMsR0FBVztJQUM1QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDaEUsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7QUFDRixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFFBQVE7SUFDaEIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILEtBQUssVUFBVSxTQUFTLENBQ3ZCLE9BQWUsRUFDZixRQUFnQixFQUNoQixJQUFZLEVBQ1osSUFBYyxFQUNkLFFBQTZCO0lBRTdCLElBQUksQ0FBQztRQUNKLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWixjQUFjLENBQUMsYUFBYSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDeEMsSUFBSTtnQkFDSixRQUFRO2dCQUNSLElBQUk7Z0JBQ0osUUFBUTthQUNSLENBQUMsQ0FBQztZQUVILElBQUksWUFBWSxFQUFFLFVBQVUsRUFBRSxDQUFDO2dCQUM5QixjQUFjLENBQUMsR0FBRyxPQUFPLDZCQUE2QixZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNsRixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7QUFDRixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxLQUFLLFVBQVUsc0JBQXNCO0lBQ3BDLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQy9CLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU87SUFDUixDQUFDO0lBQ0QsTUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztJQUMvQyxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztJQUVuRyxJQUFJLENBQUM7UUFDSixNQUFNLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM5QixNQUFNLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1Isc0NBQXNDO1FBQ3RDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdkIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixRQUFRLEVBQUUsSUFBSTtZQUNkLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLFlBQVksRUFBRSxHQUFHO1lBQ2pCLEdBQUcsRUFBRSw0RkFBNEY7U0FDakcsQ0FBQyxDQUFDO0lBQ0osQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILEtBQUssVUFBVSxzQkFBc0IsQ0FDcEMsVUFBa0IsRUFDbEIsV0FBb0I7SUFFcEIsTUFBTSxhQUFhLEdBQXlCO1FBQzNDLEtBQUssRUFBRSxTQUFTO1FBQ2hCLEdBQUcsRUFBRSxjQUFjO1FBQ25CLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLFNBQVMsRUFBRSxLQUFLO0tBQ2hCLENBQUM7SUFDRixrRUFBa0U7SUFDbEUsTUFBTSx1QkFBdUIsR0FBcUMsTUFBTSw2REFBaUIsQ0FDeEYsYUFBYSxDQUFDLEtBQUssRUFDbkIsYUFBYSxDQUFDLE9BQU8sQ0FDckIsQ0FBQztJQUVGLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUM3QixjQUFjLENBQ2IsaUdBQWlHLHVCQUF1QixDQUFDLEtBQUssY0FBYyx1QkFBdUIsQ0FBQyxPQUFPLFVBQVUsdUJBQXVCLENBQUMsR0FBRyxFQUFFLENBQ2xOLENBQUM7UUFDRixPQUFPO1lBQ04sT0FBTyxFQUFFLElBQUk7WUFDYixZQUFZLEVBQUUsdUJBQXVCLENBQUMsR0FBRztZQUN6QyxhQUFhLEVBQUUsdUJBQXVCLENBQUMsR0FBRyxLQUFLLFdBQVc7U0FDMUQsQ0FBQztJQUNILENBQUM7SUFFRCx5REFBeUQ7SUFDekQsMEdBQTBHO0lBQzFHLHFFQUFxRTtJQUNyRSxjQUFjLENBQUMsd0RBQXdELFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDckYsYUFBYSxDQUFDLEtBQUssR0FBRyxHQUFHLFNBQVMsb0JBQW9CLENBQUMsQ0FBQyx1SkFBdUo7SUFFL00sYUFBYSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQywyUEFBMlA7SUFFMVIsMENBQTBDO0lBQzFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsZ0VBQWdFO0lBQ2hHLGFBQWEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsZ09BQWdPO0lBRTdRLE1BQU0sMkJBQTJCLEdBQUcsTUFBTSxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsSUFBSSxpQkFBcUMsQ0FBQztJQUUxQyxJQUFJLDJCQUEyQixLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQy9DLElBQUksV0FBVyxFQUFFLENBQUM7WUFDakIsd0JBQXdCO1lBQ3hCLGNBQWMsQ0FBQyx5REFBeUQsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN2RixhQUFhLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLGlFQUFpRTtZQUNsRyxhQUFhLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGdPQUFnTztZQUM5USxNQUFNLDRCQUE0QixHQUFHLE1BQU0sYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXhFLElBQUksNEJBQTRCLEVBQUUsQ0FBQztnQkFDbEMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO1lBQ2pDLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztTQUFNLENBQUM7UUFDUCxpQkFBaUIsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUN2QixjQUFjLENBQ2Isc0RBQXNELGlCQUFpQixzRkFBc0YsQ0FDN0osQ0FBQztRQUNGLE9BQU87WUFDTixPQUFPLEVBQUUsSUFBSTtZQUNiLFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsYUFBYSxFQUFFLGlCQUFpQixLQUFLLFdBQVc7U0FDaEQsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsS0FBSyxVQUFVLGFBQWEsQ0FBQyxZQUFrQztJQUM5RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sNERBQWdCLENBQUMsWUFBWSxFQUFFO1FBQzlELE1BQU0sRUFBRSxZQUFZO1FBQ3BCLHFCQUFxQixFQUFFLENBQUMsUUFBZ0IsRUFBRSxHQUFXLEVBQUUsS0FBYSxFQUFFLEVBQUU7WUFDdkUsOElBQThJO1lBQzlJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEtBQUssV0FBVyxHQUFHLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQ0QsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxpQkFBaUIsQ0FBQztBQUMxQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvLi9jbGllbnQvc3JjL2FwcC1hc3NldC50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vc25hcC1zZGsvb3BlbmZpbi5zbmFwLm1qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vY2xpZW50L3NyYy9wcm92aWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE9wZW5GaW4gfSBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBsb2dnZXIuXG4gKi9cbmludGVyZmFjZSBMb2dnZXIge1xuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRpbmZvKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YSBhcyBlcnJvci5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdGVycm9yKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YSBhcyB3YXJuaW5nLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0d2FybihtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgdHJhY2UuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHR0cmFjZShtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgZGVidWcuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRkZWJ1ZyhtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcbn1cblxuLyoqXG4gKiBGb3IgZnVuY3Rpb25hbGl0eSB0aGF0IHJlcXVpcmVzIGFuIGFwcCBhc3NldCwgdGhpcyBmdW5jdGlvbiB3aWxsIGF0dGVtcHQgdG8gZmV0Y2ggdGhlIGFwcCBhc3NldCBmcm9tIHRoZSBwYXNzZWQgZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSBhcHBBc3NldERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGFwcCBhc3NldCB0byBmZXRjaC5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9iamVjdCBjb250YWluaW5nIGEgbG9nZ2VyIHRvIGxvZyBhbnkgaW5mbyBvciBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIHByb2Nlc3MgYW5kIGEgZnVuY3Rpb24gdG8gY2FwdHVyZSBwcm9ncmVzcy5cbiAqIEBwYXJhbSBvcHRpb25zLmxvZ2dlciAtIEEgbG9nZ2VyIHRvIGxvZyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBmZXRjaGluZyBvZiB0aGUgYXBwIGFzc2V0LlxuICogQHBhcmFtIG9wdGlvbnMuYXNzZXREb3dubG9hZFByb2dyZXNzIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBvcnQgdGhlIHByb2dyZXNzIG9mIHRoZSBhc3NldCBkb3dubG9hZC5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhcHAgYXNzZXQgaW5mbyBpZiB0aGUgYXBwIGFzc2V0IHdhcyBzdWNjZXNzZnVsbHkgZmV0Y2hlZCwgb3IgdW5kZWZpbmVkIGlmIGJvdGggYXR0ZW1wdHMgZmFpbGVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRBcHBBc3NldChcblx0YXBwQXNzZXREZWZpbml0aW9uOiBPcGVuRmluLkFwcEFzc2V0SW5mbyxcblx0b3B0aW9ucz86IHtcblx0XHRsb2dnZXI/OiBMb2dnZXI7XG5cdFx0YXNzZXREb3dubG9hZFByb2dyZXNzPzogKHByb2dyZXNzOiBudW1iZXIsIHNyYzogc3RyaW5nLCBhbGlhczogc3RyaW5nKSA9PiB2b2lkO1xuXHR9XG4pOiBQcm9taXNlPE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkPiB7XG5cdGNvbnN0IHNyYyA9IGFwcEFzc2V0RGVmaW5pdGlvbi5zcmM7XG5cdGNvbnN0IGxvZ2dlciA9IG9wdGlvbnM/LmxvZ2dlcjtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKHNyYykpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgc3JjIGJlaW5nIGRlZmluZWRcIik7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICghYXBwQXNzZXREZWZpbml0aW9uLnNyYy5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgVVJMIGZvciB0aGUgYXBwIGFzc2V0IHNyYy4gT25seSBIVFRQIGFuZCBIVFRQUyBwcm90b2NvbHMgYXJlIHN1cHBvcnRlZC4gV2l0aCBodHRwcyBwcmVmZXJyZWQgZm9yIHNlY3VyaXR5IHJlYXNvbnMuXCJcblx0XHQpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRjb25zdCBhbGlhcyA9IGFwcEFzc2V0RGVmaW5pdGlvbi5hbGlhcztcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKGFsaWFzKSkge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJDYW5ub3QgaW5pdGlhbGl6ZSBBcHAgQXNzZXQgRG93bmxvYWQgd2l0aG91dCBhbGlhcyBiZWluZyBkZWZpbmVkXCIpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXQgPSBhcHBBc3NldERlZmluaXRpb24udGFyZ2V0O1xuXHRpZiAoIWlzU3RyaW5nVmFsdWUodGFyZ2V0KSkge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJDYW5ub3QgaW5pdGlhbGl6ZSBBcHAgQXNzZXQgRG93bmxvYWQgd2l0aG91dCB0YXJnZXQgYmVpbmcgZGVmaW5lZFwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgdmVyc2lvbiA9IGFwcEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9uO1xuXHRpZiAoIWlzU3RyaW5nVmFsdWUodmVyc2lvbikpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgdmVyc2lvbiBiZWluZyBkZWZpbmVkXCIpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc3NldERlZmluaXRpb246IE9wZW5GaW4uQXBwQXNzZXRJbmZvID0ge1xuXHRcdGFsaWFzLFxuXHRcdHNyYyxcblx0XHR0YXJnZXQsXG5cdFx0dmVyc2lvbixcblx0XHRtYW5kYXRvcnk6IGFwcEFzc2V0RGVmaW5pdGlvbi5tYW5kYXRvcnksXG5cdFx0YXJnczogYXBwQXNzZXREZWZpbml0aW9uLmFyZ3Ncblx0fTtcblxuXHRjb25zdCBhcHBBc3NldEluZm8gPSBhd2FpdCBkb2VzQXBwQXNzZXRFeGlzdCh0YXJnZXRBc3NldERlZmluaXRpb24uYWxpYXMsIHRhcmdldEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9uKTtcblx0aWYgKGFwcEFzc2V0SW5mbykge1xuXHRcdG9wdGlvbnM/LmxvZ2dlcj8uaW5mbyhcblx0XHRcdGBBcHAgYXNzZXQgd2l0aCBhbGlhcyAke3RhcmdldEFzc2V0RGVmaW5pdGlvbi5hbGlhc30gdmVyc2lvbiAke3RhcmdldEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9ufSBhbmQgc3JjICR7dGFyZ2V0QXNzZXREZWZpbml0aW9uLnNyY30gYWxyZWFkeSBleGlzdHMuIE5vIG5lZWQgdG8gZG93bmxvYWQuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGFwcEFzc2V0SW5mbztcblx0fVxuXG5cdGNvbnN0IGhhc0Rvd25sb2FkQXBwQXNzZXRzID0gYXdhaXQgZ2V0Q2FuRG93bmxvYWRBcHBBc3NldHMobG9nZ2VyKTtcblxuXHRpZiAoIWhhc0Rvd25sb2FkQXBwQXNzZXRzKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiVGhlIHBsYXRmb3JtIGRvZXMgbm90IGhhdmUgdGhlIGNhcGFiaWxpdHkgb3IgcGVybWlzc2lvbiB0byBkb3dubG9hZCBhcHAgYXNzZXRzLlwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIGRvd25sb2FkQXBwQXNzZXREZWZpbml0aW9uKHRhcmdldEFzc2V0RGVmaW5pdGlvbiwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gYXBwIGFzc2V0IGV4aXN0cyBhbmQgb3B0aW9uYWxseSB2YWxpZGF0ZSB2ZXJzaW9uIGFuZCBzb3VyY2UgVVJMLlxuICogQHBhcmFtIGFsaWFzIFRoZSBhbGlhcyB5b3Ugd2FudCB0byBjaGVjayBmb3JcbiAqIEBwYXJhbSB2ZXJzaW9uIFRoZSB2ZXJzaW9uIHlvdSB3YW50IHRvIGNoZWNrIGZvciAob3B0aW9uYWwpXG4gKiBAcGFyYW0gc3JjIFRoZSBzb3VyY2UgVVJMIHlvdSB3YW50IHRvIGNoZWNrIGZvciAob3B0aW9uYWwpXG4gKiBAcmV0dXJucyBUaGUgYXBwIGFzc2V0IGluZm8gaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb2VzQXBwQXNzZXRFeGlzdChcblx0YWxpYXM6IHN0cmluZyxcblx0dmVyc2lvbj86IHN0cmluZyxcblx0c3JjPzogc3RyaW5nXG4pOiBQcm9taXNlPE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkPiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oeyBhbGlhcyB9KTtcblx0XHRpZiAodmVyc2lvbiAmJiBhcHBBc3NldEluZm8udmVyc2lvbiAhPT0gdmVyc2lvbikge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKHNyYyAmJiBhcHBBc3NldEluZm8uc3JjICE9PSBzcmMpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcHBBc3NldEluZm87XG5cdH0gY2F0Y2gge1xuXHRcdC8vIGFzc2V0IGRvZXMgbm90IGV4aXN0IG9yIHVybCBkb2VzIG5vdCBtYXRjaCwgcmV0dXJuIHVuZGVmaW5lZFxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogRG93bmxvYWQgYW4gYXBwIGFzc2V0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkZWZpbml0aW9uIGFuZCBvcHRpb25zLlxuICogQHBhcmFtIGFwcEFzc2V0RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgYXBwIGFzc2V0IHRvIGRvd25sb2FkLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBsb2dnZXIgdG8gbG9nIGFueSBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIHByb2Nlc3MsIGFuZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlcG9ydCB0aGUgcHJvZ3Jlc3Mgb2YgdGhlIGFzc2V0IGRvd25sb2FkLlxuICogQHBhcmFtIG9wdGlvbnMubG9nZ2VyIC0gQSBsb2dnZXIgdG8gbG9nIGFueSBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIGRvd25sb2FkaW5nIG9mIHRoZSBhcHAgYXNzZXQuXG4gKiBAcGFyYW0gb3B0aW9ucy5hc3NldERvd25sb2FkUHJvZ3Jlc3MgLSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlcG9ydCB0aGUgcHJvZ3Jlc3Mgb2YgdGhlIGFzc2V0IGRvd25sb2FkLlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGFwcCBhc3NldCBpbmZvIGlmIHRoZSBhcHAgYXNzZXQgd2FzIHN1Y2Nlc3NmdWxseSBkb3dubG9hZGVkLCBvciB1bmRlZmluZWQgaWYgYW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRoZSBkb3dubG9hZC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRBcHBBc3NldERlZmluaXRpb24oXG5cdGFwcEFzc2V0RGVmaW5pdGlvbjogT3BlbkZpbi5BcHBBc3NldEluZm8sXG5cdG9wdGlvbnM/OiB7XG5cdFx0bG9nZ2VyPzogTG9nZ2VyO1xuXHRcdGFzc2V0RG93bmxvYWRQcm9ncmVzcz86IChwcm9ncmVzczogbnVtYmVyLCBzcmM6IHN0cmluZywgYWxpYXM6IHN0cmluZykgPT4gdm9pZDtcblx0fVxuKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHRsZXQgZmV0Y2hlZE9yRXhpc3RpbmdBcHBBc3NldDogT3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQ7XG5cdHRyeSB7XG5cdFx0YXdhaXQgZmluLlN5c3RlbS5kb3dubG9hZEFzc2V0KGFwcEFzc2V0RGVmaW5pdGlvbiwgKHByb2dyZXNzKSA9PiB7XG5cdFx0XHRjb25zdCBkb3dubG9hZGVkUGVyY2VudCA9IE1hdGguZmxvb3IoKHByb2dyZXNzLmRvd25sb2FkZWRCeXRlcyAvIHByb2dyZXNzLnRvdGFsQnl0ZXMpICogMTAwKTtcblx0XHRcdGlmIChvcHRpb25zPy5hc3NldERvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0b3B0aW9ucy5hc3NldERvd25sb2FkUHJvZ3Jlc3MoZG93bmxvYWRlZFBlcmNlbnQsIGFwcEFzc2V0RGVmaW5pdGlvbi5zcmMsIGFwcEFzc2V0RGVmaW5pdGlvbi5hbGlhcyk7XG5cdFx0XHR9XG5cdFx0XHRvcHRpb25zPy5sb2dnZXI/LmluZm8oXG5cdFx0XHRcdGBEb3dubG9hZGVkICR7ZG93bmxvYWRlZFBlcmNlbnR9JSBvZiBhcHAgYXNzZXQgd2l0aCBhbGlhcyAke2FwcEFzc2V0RGVmaW5pdGlvbi5hbGlhc30gYW5kIHZlcnNpb24gJHthcHBBc3NldERlZmluaXRpb24udmVyc2lvbn0gYW5kIHVybCAke2FwcEFzc2V0RGVmaW5pdGlvbi5zcmN9YFxuXHRcdFx0KTtcblx0XHR9KTtcblx0XHQvLyBleHRyYSBjb25maXJtYXRpb24gdXNpbmcgdGhlIGFwcHJvYWNoICB1c2VkIHRvIHZhbGlkYXRlIHRoZSBleGlzdGVuY2Ugb2YgYW4gYXNzZXQuXG5cdFx0ZmV0Y2hlZE9yRXhpc3RpbmdBcHBBc3NldCA9IGF3YWl0IGRvZXNBcHBBc3NldEV4aXN0KFxuXHRcdFx0YXBwQXNzZXREZWZpbml0aW9uLmFsaWFzLFxuXHRcdFx0YXBwQXNzZXREZWZpbml0aW9uLnZlcnNpb24sXG5cdFx0XHRhcHBBc3NldERlZmluaXRpb24uc3JjXG5cdFx0KTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0b3B0aW9ucz8ubG9nZ2VyPy5lcnJvcihgVW5hYmxlIHRvIGZldGNoIEFwcCBBc3NldCAke2Zvcm1hdEVycm9yKGVycil9YCk7XG5cdH1cblx0cmV0dXJuIGZldGNoZWRPckV4aXN0aW5nQXBwQXNzZXQ7XG59XG5cbi8qKlxuICogRG8gd2UgaGF2ZSB0aGUgcGVybWlzc2lvbnMgdG8gZG93bmxvYWQgYXBwIGFzc2V0cy5cbiAqIEBwYXJhbSBsb2dnZXIgT3B0aW9uYWwgbG9nZ2VyIHRvIGxvZyBlcnJvcnMuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHdlIGhhdmUgcGVybWlzc2lvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENhbkRvd25sb2FkQXBwQXNzZXRzKGxvZ2dlcj86IExvZ2dlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRsZXQgY2FuRG93bmxvYWRBcHBBc3NldHM6IGJvb2xlYW4gPSBmYWxzZTtcblx0dHJ5IHtcblx0XHRjb25zdCBjYW5Eb3dubG9hZEFwcEFzc2V0c1Jlc3BvbnNlID1cblx0XHRcdGF3YWl0IGZpbi5TeXN0ZW0ucXVlcnlQZXJtaXNzaW9uRm9yQ3VycmVudENvbnRleHQoXCJTeXN0ZW0uZG93bmxvYWRBc3NldFwiKTtcblx0XHRjYW5Eb3dubG9hZEFwcEFzc2V0cyA9IGNhbkRvd25sb2FkQXBwQXNzZXRzUmVzcG9uc2U/LmdyYW50ZWQ7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgcXVlcnlpbmcgZm9yIFN5c3RlbS5kb3dubG9hZEFzc2V0IHBlcm1pc3Npb24gJHtmb3JtYXRFcnJvcihlcnJvcil9YCk7XG5cdFx0Y2FuRG93bmxvYWRBcHBBc3NldHMgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gY2FuRG93bmxvYWRBcHBBc3NldHM7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiAhaXNFbXB0eSh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5mdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nVmFsdWUoZXJyKSkge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwidmFyIGU9ezgyNzplPT57dmFyIHQsbj1cIm9iamVjdFwiPT10eXBlb2YgUmVmbGVjdD9SZWZsZWN0Om51bGwsaT1uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLmFwcGx5P24uYXBwbHk6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChlLHQsbil9O3Q9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5vd25LZXlzP24ub3duS2V5czpPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzP2Z1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKSl9OmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKX07dmFyIGE9TnVtYmVyLmlzTmFOfHxmdW5jdGlvbihlKXtyZXR1cm4gZSE9ZX07ZnVuY3Rpb24gcigpe3IuaW5pdC5jYWxsKHRoaXMpfWUuZXhwb3J0cz1yLGUuZXhwb3J0cy5vbmNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4saSl7ZnVuY3Rpb24gYShuKXtlLnJlbW92ZUxpc3RlbmVyKHQsciksaShuKX1mdW5jdGlvbiByKCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5yZW1vdmVMaXN0ZW5lciYmZS5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsYSksbihbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfXYoZSx0LHIse29uY2U6ITB9KSxcImVycm9yXCIhPT10JiZmdW5jdGlvbihlLHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbiYmdihlLFwiZXJyb3JcIix0LG4pfShlLGEse29uY2U6ITB9KX0pfSxyLkV2ZW50RW1pdHRlcj1yLHIucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLHIucHJvdG90eXBlLl9ldmVudHNDb3VudD0wLHIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dm9pZCAwO3ZhciBzPTEwO2Z1bmN0aW9uIG8oZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKX1mdW5jdGlvbiBjKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/ci5kZWZhdWx0TWF4TGlzdGVuZXJzOmUuX21heExpc3RlbmVyc31mdW5jdGlvbiBsKGUsdCxuLGkpe3ZhciBhLHIscyxsO2lmKG8obiksdm9pZCAwPT09KHI9ZS5fZXZlbnRzKT8ocj1lLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSxlLl9ldmVudHNDb3VudD0wKToodm9pZCAwIT09ci5uZXdMaXN0ZW5lciYmKGUuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxuLmxpc3RlbmVyP24ubGlzdGVuZXI6bikscj1lLl9ldmVudHMpLHM9clt0XSksdm9pZCAwPT09cylzPXJbdF09biwrK2UuX2V2ZW50c0NvdW50O2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygcz9zPXJbdF09aT9bbixzXTpbcyxuXTppP3MudW5zaGlmdChuKTpzLnB1c2gobiksKGE9YyhlKSk+MCYmcy5sZW5ndGg+YSYmIXMud2FybmVkKXtzLndhcm5lZD0hMDt2YXIgcD1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK3MubGVuZ3RoK1wiIFwiK1N0cmluZyh0KStcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO3AubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLHAuZW1pdHRlcj1lLHAudHlwZT10LHAuY291bnQ9cy5sZW5ndGgsbD1wLGNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKGwpfXJldHVybiBlfWZ1bmN0aW9uIHAoKXtpZighdGhpcy5maXJlZClyZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLHRoaXMud3JhcEZuKSx0aGlzLmZpcmVkPSEwLDA9PT1hcmd1bWVudHMubGVuZ3RoP3RoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk6dGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCxhcmd1bWVudHMpfWZ1bmN0aW9uIGgoZSx0LG4pe3ZhciBpPXtmaXJlZDohMSx3cmFwRm46dm9pZCAwLHRhcmdldDplLHR5cGU6dCxsaXN0ZW5lcjpufSxhPXAuYmluZChpKTtyZXR1cm4gYS5saXN0ZW5lcj1uLGkud3JhcEZuPWEsYX1mdW5jdGlvbiBkKGUsdCxuKXt2YXIgaT1lLl9ldmVudHM7aWYodm9pZCAwPT09aSlyZXR1cm5bXTt2YXIgYT1pW3RdO3JldHVybiB2b2lkIDA9PT1hP1tdOlwiZnVuY3Rpb25cIj09dHlwZW9mIGE/bj9bYS5saXN0ZW5lcnx8YV06W2FdOm4/ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBBcnJheShlLmxlbmd0aCksbj0wO248dC5sZW5ndGg7KytuKXRbbl09ZVtuXS5saXN0ZW5lcnx8ZVtuXTtyZXR1cm4gdH0oYSk6ZihhLGEubGVuZ3RoKX1mdW5jdGlvbiB1KGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT10KXt2YXIgbj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pcmV0dXJuIDE7aWYodm9pZCAwIT09bilyZXR1cm4gbi5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgbj1uZXcgQXJyYXkodCksaT0wO2k8dDsrK2kpbltpXT1lW2ldO3JldHVybiBufWZ1bmN0aW9uIHYoZSx0LG4saSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbilpLm9uY2U/ZS5vbmNlKHQsbik6ZS5vbih0LG4pO2Vsc2V7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZS5hZGRFdmVudExpc3RlbmVyKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO2UuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uIGEocil7aS5vbmNlJiZlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxhKSxuKHIpfSl9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLFwiZGVmYXVsdE1heExpc3RlbmVyc1wiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBzfSxzZXQ6ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8YShlKSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrZStcIi5cIik7cz1lfX0pLHIuaW5pdD1mdW5jdGlvbigpe3ZvaWQgMCE9PXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzIT09T2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKSx0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx2b2lkIDB9LHIucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxhKGUpKXRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJytlK1wiLlwiKTtyZXR1cm4gdGhpcy5fbWF4TGlzdGVuZXJzPWUsdGhpc30sci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKCl7cmV0dXJuIGModGhpcyl9LHIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLG49MTtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKXQucHVzaChhcmd1bWVudHNbbl0pO3ZhciBhPVwiZXJyb3JcIj09PWUscj10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09cilhPWEmJnZvaWQgMD09PXIuZXJyb3I7ZWxzZSBpZighYSlyZXR1cm4hMTtpZihhKXt2YXIgcztpZih0Lmxlbmd0aD4wJiYocz10WzBdKSxzIGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgczt2YXIgbz1uZXcgRXJyb3IoXCJVbmhhbmRsZWQgZXJyb3IuXCIrKHM/XCIgKFwiK3MubWVzc2FnZStcIilcIjpcIlwiKSk7dGhyb3cgby5jb250ZXh0PXMsb312YXIgYz1yW2VdO2lmKHZvaWQgMD09PWMpcmV0dXJuITE7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYylpKGMsdGhpcyx0KTtlbHNle3ZhciBsPWMubGVuZ3RoLHA9ZihjLGwpO2ZvcihuPTA7bjxsOysrbilpKHBbbl0sdGhpcyx0KX1yZXR1cm4hMH0sci5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbCh0aGlzLGUsdCwhMSl9LHIucHJvdG90eXBlLm9uPXIucHJvdG90eXBlLmFkZExpc3RlbmVyLHIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBsKHRoaXMsZSx0LCEwKX0sci5wcm90b3R5cGUub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBvKHQpLHRoaXMub24oZSxoKHRoaXMsZSx0KSksdGhpc30sci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBvKHQpLHRoaXMucHJlcGVuZExpc3RlbmVyKGUsaCh0aGlzLGUsdCkpLHRoaXN9LHIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7dmFyIG4saSxhLHIscztpZihvKHQpLHZvaWQgMD09PShpPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09KG49aVtlXSkpcmV0dXJuIHRoaXM7aWYobj09PXR8fG4ubGlzdGVuZXI9PT10KTA9PT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpOihkZWxldGUgaVtlXSxpLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsbi5saXN0ZW5lcnx8dCkpO2Vsc2UgaWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbil7Zm9yKGE9LTEscj1uLmxlbmd0aC0xO3I+PTA7ci0tKWlmKG5bcl09PT10fHxuW3JdLmxpc3RlbmVyPT09dCl7cz1uW3JdLmxpc3RlbmVyLGE9cjticmVha31pZihhPDApcmV0dXJuIHRoaXM7MD09PWE/bi5zaGlmdCgpOmZ1bmN0aW9uKGUsdCl7Zm9yKDt0KzE8ZS5sZW5ndGg7dCsrKWVbdF09ZVt0KzFdO2UucG9wKCl9KG4sYSksMT09PW4ubGVuZ3RoJiYoaVtlXT1uWzBdKSx2b2lkIDAhPT1pLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsc3x8dCl9cmV0dXJuIHRoaXN9LHIucHJvdG90eXBlLm9mZj1yLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcixyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQsbixpO2lmKHZvaWQgMD09PShuPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09bi5yZW1vdmVMaXN0ZW5lcilyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApOnZvaWQgMCE9PW5bZV0mJigwPT09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTpkZWxldGUgbltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7dmFyIGEscj1PYmplY3Qua2V5cyhuKTtmb3IoaT0wO2k8ci5sZW5ndGg7KytpKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShhPXJbaV0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhhKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wLHRoaXN9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YodD1uW2VdKSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdCk7ZWxzZSBpZih2b2lkIDAhPT10KWZvcihpPXQubGVuZ3RoLTE7aT49MDtpLS0pdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbaV0pO3JldHVybiB0aGlzfSxyLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIGQodGhpcyxlLCEwKX0sci5wcm90b3R5cGUucmF3TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiBkKHRoaXMsZSwhMSl9LHIubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6dS5jYWxsKGUsdCl9LHIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9dSxyLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/dCh0aGlzLl9ldmVudHMpOltdfX19LHQ9e307ZnVuY3Rpb24gbihpKXt2YXIgYT10W2ldO2lmKHZvaWQgMCE9PWEpcmV0dXJuIGEuZXhwb3J0czt2YXIgcj10W2ldPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtpXShyLHIuZXhwb3J0cyxuKSxyLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciBpIGluIHQpbi5vKHQsaSkmJiFuLm8oZSxpKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsaSx7ZW51bWVyYWJsZTohMCxnZXQ6dFtpXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpO3ZhciBpPW4oODI3KTtjb25zdCBhPVwib3BlbmZpbi1zbmFwXCIscj1cIjEuNi4wXCIscz0oZSx0KT0+YCR7ZX0gJHt0IGluc3RhbmNlb2YgRXJyb3I/dC5tZXNzYWdlOlwic3RyaW5nXCI9PXR5cGVvZiB0P3Q6SlNPTi5zdHJpbmdpZnkodCl9YCxvPWFzeW5jKCk9Pnt0cnl7cmV0dXJuKGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHthbGlhczphfSkpLnZlcnNpb249PT1yfWNhdGNoKGUpe3JldHVybiExfX0sYz1cImludGVybmFsLWdlbmVyYXRlZC13aW5kb3ctXCI7Y2xhc3MgbHtjb25zdHJ1Y3RvcihlLHQ9MWU0LG49NWUzKXtpZih0aGlzLnNlcnZlcl9pZD1lLHRoaXMuZW1pdHRlcj1uZXcgaS5FdmVudEVtaXR0ZXIsdGhpcy5fX2V4dGVuc2lvbnM9W10sdGhpcy5zbmFwU2VydmVyU3RhdHVzPVwiZGlzY29ubmVjdGVkXCIsdGhpcy5oZWFsdGhDaGVja0luaXRpYWxpemluZz0hMSwhZmluKXRocm93IG5ldyBFcnJvcihcIk9wZW5GaW4gaXMgbm90IGF2YWlsYWJsZVwiKTtpZih0PDFlMyl0aHJvdyBuZXcgRXJyb3IoYGhlYWx0aENoZWNrSW50ZXJ2YWxNcyBtdXN0IGJlIGF0IGxlYXN0IDEwMDBtcyAocHJvdmlkZWQ6ICR7dH1tcykuIFZhbHVlcyBiZWxvdyB0aGlzIGFyZSBleGNlc3NpdmUgYW5kIGNhdXNlIHVubmVjZXNzYXJ5IG92ZXJoZWFkLmApO2lmKG48NTAwKXRocm93IG5ldyBFcnJvcihgaGVhbHRoQ2hlY2tUaW1lb3V0TXMgbXVzdCBiZSBhdCBsZWFzdCA1MDBtcyAocHJvdmlkZWQ6ICR7bn1tcykuIFRpbWVvdXQgbXVzdCBhbGxvdyBzdWZmaWNpZW50IHRpbWUgZm9yIG5ldHdvcmsgcm91bmQtdHJpcCBhbmQgc2VydmVyIHJlc3BvbnNlLmApO2lmKG4+PXQpdGhyb3cgbmV3IEVycm9yKGBoZWFsdGhDaGVja1RpbWVvdXRNcyAoJHtufW1zKSBtdXN0IGJlIGxlc3MgdGhhbiBoZWFsdGhDaGVja0ludGVydmFsTXMgKCR7dH1tcykuIFRoaXMgZW5zdXJlcyB0aGUgdGltZW91dCBjb21wbGV0ZXMgYmVmb3JlIHRoZSBuZXh0IGhlYWx0aCBjaGVjayBiZWdpbnMsIGFsbG93aW5nIHRpbWUgZm9yIHJlY292ZXJ5LmApO3RoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbE1zPXQsdGhpcy5oZWFsdGhDaGVja1RpbWVvdXRNcz1ufWFzeW5jIHN0YXJ0KGUpe3RyeXtjb25zdCBlPWF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtcIng2NFwiIT09ZT8uYXJjaGl0ZWN0dXJlJiZjb25zb2xlLndhcm4oYFRoZSBhcmNoaXRlY3R1cmUgb2YgdGhlIGNvbm5lY3RlZCBPcGVuRmluIHJ1bnRpbWUgaXMgJyR7ZS5hcmNoaXRlY3R1cmV9JyAtIFdpbmRvdyBzbmFwcGluZyBpcyBjdXJyZW50bHkgb25seSBzdXBwb3J0ZWQgd2l0aCA2NC1iaXQgYXBwbGljYXRpb25zLiBTbmFwcGluZyB3aWxsIGJlIGRpc2FibGVkLmApfWNhdGNoKGUpe2NvbnNvbGUud2FybihgQ291bGQgbm90IGdldCBydW50aW1lIGluZm86ICR7ZX1gKX1jb25zdCB0PWF3YWl0IGZpbi5TeXN0ZW0ucXVlcnlQZXJtaXNzaW9uRm9yQ3VycmVudENvbnRleHQoXCJTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzXCIpO2lmKCF0LmdyYW50ZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXJcIik7aWYodC5yYXdWYWx1ZSl7aWYoZT8uZXhlY3V0YWJsZVBhdGgmJiF0LnJhd1ZhbHVlPy5leGVjdXRhYmxlcz8uZW5hYmxlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MuYXNzZXRzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgZnJvbSBhbiBleGVjdXRhYmxlIHBhdGhcIik7aWYoIWU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uYXNzZXRzPy5lbmFibGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcy5hc3NldHMnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlciBmcm9tIGEgVVJMXCIpfWU/LmV4ZWN1dGFibGVQYXRofHxhd2FpdChhc3luYyBlPT57Y29uc3QgdD1hd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudFN5bmMoKS5nZXRNYW5pZmVzdCgpLG49dC5hcHBBc3NldHM/LmZpbmQoZT0+ZS5hbGlhcz09PWEpO2lmKG4pcmV0dXJuIHZvaWQgY29uc29sZS53YXJuKFwiRGV0ZWN0ZWQgU25hcCBwYWNrYWdlIGluIGFwcCBtYW5pZmVzdCBhcHBBc3NldHNcIixuKTtpZihhd2FpdCBvKCkpcmV0dXJuIHZvaWQgY29uc29sZS5pbmZvKFwiVXNpbmcgZXhpc3RpbmcgU25hcCBwYWNrYWdlXCIpO2NvbnN0IGk9ZT8/YGh0dHBzOi8vY2RuLm9wZW5maW4uY28vcmVsZWFzZS9zbmFwLyR7cn0vc25hcC56aXBgO2NvbnNvbGUuaW5mbyhgRG93bmxvYWRpbmcgU25hcCBhc3NldCBmcm9tOiAnJHtpfSdgKTtjb25zdCBjPXthbGlhczphLHNyYzpgJHtpfWAsdGFyZ2V0OlwiT3BlbkZpblNuYXAuZXhlXCIsdmVyc2lvbjpyfTtjb25zb2xlLmluZm8oXCJEb3dubG9hZGluZyBTbmFwIHBhY2thZ2VcIixjKTt0cnl7YXdhaXQgZmluLlN5c3RlbS5kb3dubG9hZEFzc2V0KGMsKCk9Pnt9KX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IocyhcIlVuYWJsZSB0byBkb3dubG9hZCBTbmFwIHBhY2thZ2UuXCIsZSkpfX0pKGU/LmN1c3RvbVNuYXBBc3NldFNvdXJjZSk7Y29uc3Qgbj1hd2FpdCB0aGlzLmJ1aWxkX2NvbW1hbmRfbGluZShlKTtsZXQgaT17YWxpYXM6YSxhcmd1bWVudHM6bixsaWZldGltZTpcIndpbmRvd1wifTtlPy5leGVjdXRhYmxlUGF0aCYmKGk9e3BhdGg6ZS5leGVjdXRhYmxlUGF0aCxhcmd1bWVudHM6bixsaWZldGltZTpcIndpbmRvd1wifSk7dHJ5e3RoaXMuc25hcF9pZGVudGl0eT1hd2FpdCBmaW4uU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcyhpKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IocyhcIkZhaWxlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyLlwiLGUpKX1yZXR1cm4gdGhpcy5jb25uZWN0KCl9YXN5bmMgY29ubmVjdCgpe2F3YWl0IHRoaXMuaW50ZXJuYWxDb25uZWN0KCEwKX1fX2FkZEV4dGVuc2lvbihlKXt0aGlzLl9fZXh0ZW5zaW9ucy5wdXNoKGUpfWFzeW5jIHN0b3AoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNodXRkb3duXCJ9KSl9YXN5bmMgc2hvd0RlYnVnV2luZG93KGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwic2hvd0RlYnVnV2luZG93XCIscGF5bG9hZDp7c2hvdzplfX0pKX1hc3luYyBnZXRMYXlvdXQoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7Y29uc3QgZT1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwic2VyaWFsaXNlTGF5b3V0XCJ9KSk7cmV0dXJuIGU/LnBheWxvYWQubGF5b3V0fWFzeW5jIHNldExheW91dChlLHQ9ITApe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGVzZXJpYWxpc2VMYXlvdXRcIixwYXlsb2FkOntsYXlvdXQ6ZSxyZXNldDp0fX0pKX1hc3luYyBlbnRlckRlZmVycmVkTGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJlbnRlckJhdGNoTW9kZVwifSkpfWFzeW5jIGV4aXREZWZlcnJlZExheW91dCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZXhpdEJhdGNoTW9kZVwifSkpfWFzeW5jIHByZXBhcmVUb0FwcGx5U25hcHNob3QoZSx0KXtpZighZXx8ZS5vcHRpb25zPy5jbG9zZUV4aXN0aW5nV2luZG93c3x8ZS5vcHRpb25zPy5jbG9zZVNuYXBzaG90V2luZG93cylyZXR1cm4gdGhpcy5uZWVkVG9SZXNldExheW91dD0hMCx2b2lkIGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXNldEFsbFwifSkpO3RoaXMubmVlZFRvUmVzZXRMYXlvdXQ9ITE7Y29uc3Qgbj1lLnNuYXBzaG90LGk9SlNPTi5zdHJpbmdpZnkobixudWxsLDIpLGE9bi5zbmFwO2lmKCFhKXJldHVybjthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwicHJlcGFyZVRvQXBwbHlMYXlvdXRcIn0pKTtjb25zdCByPXQ/P3Yscz0oYXdhaXQgdGhpcy5nZXRMYXlvdXQoKSk/LmNsaWVudHMubWFwKGU9PmUuaWQpPz9bXSxvPXUobi53aW5kb3dzKSxjPUFycmF5LmZyb20oby5rZXlzKCkpLmZpbHRlcihlPT5zLmluY2x1ZGVzKGUpKTthLmNsaWVudHMuZmlsdGVyKGU9PmMuaW5jbHVkZXMoZS5pZCkpLmZvckVhY2goZT0+e2NvbnN0IHQ9ZS5pZCxuPXIodCk7ZS5pZD1uLGYoYS5jb25uZWN0aW9ucyx0LG4pO2NvbnN0IGk9by5nZXQodCk7aS5jdXN0b21EYXRhLnNuYXBDbGllbnRJZD1uLGkubmFtZT1ufSk7Y29uc3QgbD1KU09OLnN0cmluZ2lmeShuLG51bGwsMik7Y29uc29sZS5kZWJ1ZyhgU25hcCBTREsgbW9kaWZpZWQgc25hcHNob3QgZGF0YSBiZWZvcmUgYXBwbHlpbmcgaXQuXFxuT3JpZ2luYWwgc25hcHNob3Q6XFxuJHtpfVxcbk1vZGlmaWVkIHNuYXBzaG90OlxcbiR7bH1gKX1hc3luYyBkZWNvcmF0ZVNuYXBzaG90KGUpe3JldHVybnsuLi5lLHNuYXA6YXdhaXQgdGhpcy5nZXRMYXlvdXQoKX19YXN5bmMgYXBwbHlTbmFwc2hvdChlKXtlLnNuYXAmJmF3YWl0IHRoaXMuc2V0TGF5b3V0KGUuc25hcCx0aGlzLm5lZWRUb1Jlc2V0TGF5b3V0KX1hc3luYyBsYXVuY2goZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIk5vdCBjb25uZWN0ZWQgdG8gYW4gU25hcCBzZXJ2ZXJcIik7ZS5hcHBBc3NldEluZm8mJihlLnBhdGg9YXdhaXQgcCh7dGFyZ2V0OmUucGF0aCwuLi5lLmFwcEFzc2V0SW5mb30pKSxjb25zb2xlLmxvZyhcIm9wdGlvbnM6IFwiLGUpO2NvbnN0IHQ9e2FjdGlvbjpcInN0YXJ0UHJvY2Vzc1wiLHBheWxvYWQ6ey4uLmUsYXJnczplLmFyZ3N8fFtdfX07aWYoZS5zdHJhdGVneSl7Y29uc3R7dHlwZTpuLC4uLml9PWUuc3RyYXRlZ3k7dC5wYXlsb2FkLnN0cmF0ZWd5PXt0eXBlOm4scGFyYW1ldGVyczp7Li4uaX19fWNvbnN0IG49YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIsdCkpO2lmKG4/LnBheWxvYWQ/LnN1Y2Nlc3MpcmV0dXJue3Byb2Nlc3NfaWQ6bi5wYXlsb2FkLnByb2Nlc3NfaWR9O3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxhdW5jaCBwcm9jZXNzOiAke24/LnBheWxvYWQ/LmVycm9yfWApfWFzeW5jIHJlZ2lzdGVyV2luZG93KGUsdCxuKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaG9va0FuZFJlZ2lzdGVyV2luZG93XCIscGF5bG9hZDp7Y2xpZW50SWQ6ZSx3aW5kb3dIYW5kbGU6dCxyZXNpemluZ0JlaGF2aW9yOm59fSkpfWFzeW5jIGVuYWJsZUF1dG9XaW5kb3dSZWdpc3RyYXRpb24oKXtjb25zdCBlPWU9PnRoaXMuaGFuZGxlTmV3V2luZG93KGUpO3JldHVybiBhd2FpdCBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKS5hZGRMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSksYXN5bmMoKT0+e2F3YWl0IGZpbi5TeXN0ZW0ucmVtb3ZlTGlzdGVuZXIoXCJ3aW5kb3ctY3JlYXRlZFwiLGUpfX1hc3luYyBhdHRhY2hXaW5kb3dzKGUsdCxuLGkpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJhdHRhY2hcIixwYXlsb2FkOnt0YXJnZXRDbGllbnRJZDplLHRvQXR0YWNoQ2xpZW50SWQ6dCx0YXJnZXRTaWRlOm4sb2Zmc2V0Oml9fSkpfWFzeW5jIGRldGFjaEZyb21Hcm91cChlKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGV0YWNoRnJvbUdyb3VwXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSl9YXN5bmMgZ2V0QXR0YWNoZWQoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRBdHRhY2hlZEluc3RhbmNlc1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmF0dGFjaGVkfWFzeW5jIGhhc0F0dGFjaG1lbnRzKGUpe3JldHVybihhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaGFzQXR0YWNobWVudHNcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKSkucGF5bG9hZC5oYXNBdHRhY2htZW50c31hZGRFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9uKGUsdCl9cmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuZW1pdHRlci5vZmYoZSx0KX1vbmNlKGUsdCl7dGhpcy5lbWl0dGVyLm9uY2UoZSx0KX1hc3luYyBnZXRDbGllbnRJZEZvcldpbmRvdyhlKXtjb25zdCB0PVwibnVtYmVyXCI9PXR5cGVvZiBlP3tuYXRpdmVXaW5kb3dJZDplfTpOdW1iZXIuaXNOYU4odGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSk/e25hdGl2ZVdpbmRvd0lkOk51bWJlci5OYU59OntuYXRpdmVXaW5kb3dJZDp0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpfSxuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRDbGllbnRJZEZvcldpbmRvd1wiLHBheWxvYWQ6dH0pKTtpZighbi5wYXlsb2FkLmNsaWVudElkKXRocm93IG5ldyBFcnJvcihcIk5vIGNsaWVudCBJRCBmb3VuZCBmb3Igd2luZG93XCIpO3JldHVybiBuLnBheWxvYWQuY2xpZW50SWR9YXN5bmMgZ2V0R3JvdXBJZEZvcldpbmRvdyhlKXtjb25zdCB0PVwibnVtYmVyXCI9PXR5cGVvZiBlP3tuYXRpdmVXaW5kb3dJZDplfTpOdW1iZXIuaXNOYU4odGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSk/e2NsaWVudElkOmV9OntuYXRpdmVXaW5kb3dJZDp0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpfSxuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRHcm91cElkRm9yV2luZG93XCIscGF5bG9hZDp0fSkpO2lmKCFuLnBheWxvYWQuZ3JvdXBJZCl0aHJvdyBuZXcgRXJyb3IoXCJObyBncm91cCBmb3VuZCBmb3Igd2luZG93XCIpO3JldHVybiBuLnBheWxvYWQuZ3JvdXBJZH1hc3luYyBnZXRXaW5kb3dSZXNpemFibGUoZSl7Y29uc3QgdD1cIm51bWJlclwiPT10eXBlb2YgZT97bmF0aXZlV2luZG93SWQ6ZX06TnVtYmVyLmlzTmFOKHRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkpP3tjbGllbnRJZDplfTp7bmF0aXZlV2luZG93SWQ6dGhpcy5oZXhTdHJpbmdUb051bWJlcihlKX0sbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0UmVzaXphYmxlXCIscGF5bG9hZDp0fSkpO2lmKG51bGw9PT1uLnBheWxvYWQucmVzaXphYmxlKXRocm93IG5ldyBFcnJvcihcIk5vIHdpbmRvdyBmb3VuZCBmb3IgZ2l2ZW4gSURcIik7cmV0dXJuIG4ucGF5bG9hZC5yZXNpemFibGV9YXN5bmMgc2V0V2luZG93UmVzaXphYmxlKGUsdCl7Y29uc3Qgbj1cIm51bWJlclwiPT10eXBlb2YgZT97bmF0aXZlV2luZG93SWQ6ZSxyZXNpemFibGU6dH06TnVtYmVyLmlzTmFOKHRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkpP3tjbGllbnRJZDplLHJlc2l6YWJsZTp0fTp7bmF0aXZlV2luZG93SWQ6dGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSxyZXNpemFibGU6dH07YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNldFJlc2l6YWJsZVwiLHBheWxvYWQ6bn0pKX1hc3luYyBnZXRXaW5kb3dzSW5Hcm91cChlKXtjb25zdCB0PWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRXaW5kb3dzSW5Hcm91cFwiLHBheWxvYWQ6e2dyb3VwSWQ6ZX19KSk7cmV0dXJuIHQucGF5bG9hZC53aW5kb3dzP3QucGF5bG9hZC53aW5kb3dzLm1hcChlPT4oe25hdGl2ZUlkOmVbMF0sY2xpZW50SWQ6ZVsxXX0pKTpbXX1hc3luYyBnZXRBbGxHcm91cElkcygpe3JldHVybihhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0QWxsR3JvdXBJZHNcIn0pKSkucGF5bG9hZC5ncm91cElkc31hc3luYyBtaW5pbWl6ZUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJtaW5pbWl6ZUdyb3VwXCIscGF5bG9hZDp7Z3JvdXBJZDplfX0pKX1hc3luYyByZXN0b3JlR3JvdXAoZSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInJlc3RvcmVHcm91cFwiLHBheWxvYWQ6e2dyb3VwSWQ6ZX19KSl9Z2V0U25hcFNlcnZlclN0YXR1cygpe3JldHVybiB0aGlzLnNuYXBTZXJ2ZXJTdGF0dXN9aGFuZGxlU25hcFNlcnZlckRpc2Nvbm5lY3Rpb24oKXt0aGlzLnN0b3BIZWFsdGhDaGVjaygpLHRoaXMuY2xpZW50PXZvaWQgMCx0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIiksY29uc29sZS53YXJuKFwiU25hcFNESzogRGlzY29ubmVjdGVkIGZyb20gU25hcCBzZXJ2ZXIsIGF0dGVtcHQgcmVjb25uZWN0LlwiKSx0aGlzLmludGVybmFsQ29ubmVjdCghMSl9YXN5bmMgaW50ZXJuYWxDb25uZWN0KGUpe2lmKHRoaXMuc3RvcEhlYWx0aENoZWNrKCksdGhpcy5jbGllbnQ9YXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGBzbmFwLXNlcnZlci1jb3JlLSR7dGhpcy5zZXJ2ZXJfaWR9YCksdGhpcy5jbGllbnQucmVnaXN0ZXIoXCJzbmFwX2hhbmRzaGFrZVwiLGFzeW5jKHQsbik9Pnt0cnl7ZSYmYXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjp0LnZlcnNpb24sY29tcG9uZW50TmFtZTpcInNuYXAtc2VydmVyXCJ9fSl9Y2F0Y2h7Y29uc29sZS53YXJuKFwiU25hcFNESzogRmFpbGVkIHRvIHJlZ2lzdGVyIHVzYWdlIGZvciBTbmFwIFNlcnZlclwiKX19KSx0aGlzLmNsaWVudC5vbkRpc2Nvbm5lY3Rpb24oKCk9PnRoaXMuaGFuZGxlU25hcFNlcnZlckRpc2Nvbm5lY3Rpb24oKSksZSl0cnl7YXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjpcIjEuNi4wXCIsY29tcG9uZW50TmFtZTpcInNuYXAtY2xpZW50XCJ9fSl9Y2F0Y2h7Y29uc29sZS53YXJuKFwiU25hcFNESzogRmFpbGVkIHRvIHJlZ2lzdGVyIHVzYWdlIGZvciBTbmFwIFNlcnZlclwiKX10aGlzLmNsaWVudC5yZWdpc3RlcihcInNuYXBfdXBkYXRlc1wiLChlLHQpPT50aGlzLmhhbmRsZVNuYXBFdmVudHMoZSx0KSksdGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiY29ubmVjdGVkXCIpLHRoaXMuc3RhcnRIZWFsdGhDaGVjaygpLHRoaXMuX19leHRlbnNpb25zLmZvckVhY2goZT0+ZS5vbkNvbm5lY3RlZCh0aGlzLmNsaWVudCkpfXNldFNuYXBTZXJ2ZXJTdGF0dXMoZSl7dGhpcy5zbmFwU2VydmVyU3RhdHVzIT09ZSYmKHRoaXMuc25hcFNlcnZlclN0YXR1cz1lLFwiZGlzY29ubmVjdGVkXCI9PT1lP3RoaXMuZW1pdF9ldmVudChcInNuYXAtc2VydmVyLWRpc2Nvbm5lY3RlZFwiLHt9KTpcIm5vLXJlc3BvbnNlXCI9PT1lJiZ0aGlzLmVtaXRfZXZlbnQoXCJzbmFwLXNlcnZlci1uby1yZXNwb25zZVwiLHt0aW1lc3RhbXA6RGF0ZS5ub3coKX0pKX1zdGFydEhlYWx0aENoZWNrKCl7aWYoXCJkaXNjb25uZWN0ZWRcIiE9PXRoaXMuc25hcFNlcnZlclN0YXR1cyYmIXRoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmcmJiF0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWwpe3RoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmc9ITA7dHJ5e3RoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbD1zZXRJbnRlcnZhbChhc3luYygpPT57aWYoXCJkaXNjb25uZWN0ZWRcIiE9PXRoaXMuc25hcFNlcnZlclN0YXR1cyYmdGhpcy5jbGllbnQpdHJ5e2NvbnN0IGU9bmV3IFByb21pc2UoKGUsdCk9PntzZXRUaW1lb3V0KCgpPT50KG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIHJlc3BvbnNlIHRpbWVvdXRcIikpLHRoaXMuaGVhbHRoQ2hlY2tUaW1lb3V0TXMpfSksdD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpLG49YXdhaXQgUHJvbWlzZS5yYWNlKFt0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaGVhbHRoQ2hlY2tcIixwYXlsb2FkOntub25jZTp0fX0pfHxQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDbGllbnQgaXMgbm90IGF2YWlsYWJsZVwiKSksZV0pO2lmKCF0aGlzLmNsaWVudClyZXR1cm4gdm9pZCB0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIik7aWYoIW4/LnBheWxvYWR8fG4ucGF5bG9hZC5ub25jZSE9PXQpdGhyb3cgbmV3IEVycm9yKFwiSGVhbHRoIGNoZWNrIHZhbGlkYXRpb24gZmFpbGVkIC0gbm9uY2UgbWlzbWF0Y2hcIik7XCJuby1yZXNwb25zZVwiPT09dGhpcy5zbmFwU2VydmVyU3RhdHVzJiZ0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJjb25uZWN0ZWRcIil9Y2F0Y2goZSl7dGhpcy5jbGllbnQ/dGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwibm8tcmVzcG9uc2VcIik6dGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiZGlzY29ubmVjdGVkXCIpfX0sdGhpcy5oZWFsdGhDaGVja0ludGVydmFsTXMpfWZpbmFsbHl7dGhpcy5oZWFsdGhDaGVja0luaXRpYWxpemluZz0hMX19fXN0b3BIZWFsdGhDaGVjaygpe3RoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbCYmKGNsZWFySW50ZXJ2YWwodGhpcy5oZWFsdGhDaGVja0ludGVydmFsKSx0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWw9dm9pZCAwKX1hc3luYyBoYW5kbGVOZXdXaW5kb3coZSl7Y29uc3QgdD1hd2FpdCBmaW4uV2luZG93LndyYXAoe3V1aWQ6ZS51dWlkLG5hbWU6ZS5uYW1lfSksbj1hd2FpdCB0LmdldE5hdGl2ZUlkKCk7bGV0IGk9dC5pZGVudGl0eS5uYW1lO2NvbnN0IGE9YXdhaXQgdC5nZXRPcHRpb25zKCk7aWYodm9pZCAwIT09YS5pbmNsdWRlSW5TbmFwc2hvdHMmJiExPT09YS5pbmNsdWRlSW5TbmFwc2hvdHMpcmV0dXJuIHZvaWQgY29uc29sZS5sb2coYFNuYXBTREs6IE5vdCByZWdpc3RlcmluZyAke2UudXVpZH06JHtlLm5hbWV9LCBXaW5kb3cgaXMgZXhwbGljaXRseSBleGNsdWRlZCAtaW5jbHVkZUluU25hcHNob3RzID09IGZhbHNlYCk7Y29uc3Qgcj1hLmN1c3RvbURhdGF8fHt9O3Iuc25hcENsaWVudElkP2k9ci5zbmFwQ2xpZW50SWQ6YXdhaXQgdC51cGRhdGVPcHRpb25zKHtjdXN0b21EYXRhOnsuLi5yLHNuYXBDbGllbnRJZDppfX0pLGNvbnNvbGUubG9nKGBTbmFwU0RLOiBBdXRvLXJlZ2lzdGVyaW5nIHdpbmRvdzogc25hcENsaWVudElkOiR7aX0sIGhhbmRsZSAke259LCB1dWlkOiR7ZS51dWlkfSwgbmFtZToke2UubmFtZX1gKSxhd2FpdCB0aGlzLnJlZ2lzdGVyV2luZG93KGksbixyLnNuYXBSZXNpemluZ0JlaGF2aW9yKX1lbWl0X2V2ZW50KGUsLi4udCl7dGhpcy5lbWl0dGVyLmVtaXQoZSwuLi50KX1oYW5kbGVTbmFwRXZlbnRzKGUsdCl7c3dpdGNoKHRoaXMuZW1pdF9ldmVudChcImFsbC1ldmVudHNcIix7dHlwZTplLmFjdGlvbixwYXlsb2FkOmUucGF5bG9hZH0pLGUuYWN0aW9uKXtjYXNlXCJjbGllbnRSZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXJlZ2lzdGVyZWRcIix7Y2xpZW50SWQ6ZS5wYXlsb2FkLmNsaWVudElkLHdpbmRvd0hhbmRsZTpgIyR7ZS5wYXlsb2FkLndpbmRvd0hhbmRsZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gLG93bmluZ1Byb2Nlc3NJZDplLnBheWxvYWQub3duaW5nUHJvY2Vzc0lkfSk7YnJlYWs7Y2FzZVwiY2xpZW50VW5SZWdpc3RlcmVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJtb3ZlU2l6ZUNvbXBsZXRlZFwiOnRoaXMuZW1pdF9ldmVudChcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50c0F0dGFjaGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50cy1hdHRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZXRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZXRhY2hlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJncm91cHNDaGFuZ2VkXCI6dGhpcy5lbWl0X2V2ZW50KFwiZ3JvdXBzLWNoYW5nZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50QWN0aXZhdGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnREZWFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1kZWFjdGl2YXRlZFwiLHsuLi5lLnBheWxvYWR9KX19aGV4U3RyaW5nVG9OdW1iZXIoZSl7Y29uc3QgdD1lPy50cmltKCk7cmV0dXJuL14weFswLTlhLWZdKyQvaS50ZXN0KHQpP051bWJlcih0KTpOYU59YXN5bmMgYnVpbGRfY29tbWFuZF9saW5lKGUpe2xldCB0PWAtLWlkICR7dGhpcy5zZXJ2ZXJfaWR9IGA7ZT8uc2hvd0RlYnVnJiYodCs9XCIgLS1zaG93LWRlYnVnIFwiKSxlPy5kaXNhYmxlR1BVQWNjZWxlcmF0ZWREcmFnZ2luZyYmKHQrPVwiIC0tZGlzYWJsZS1ncHUtYWNjZWxlcmF0ZWQtZHJhZ2dpbmcgdHJ1ZSBcIiksZT8uZGlzYWJsZUJsdXJEcm9wUHJldmlldyYmKHQrPVwiIC0tYmx1ci1kcm9wLXByZXZpZXcgZmFsc2UgXCIpLHZvaWQgMCE9PWU/LmJsdXJFZmZlY3RQZXJmb3JtYW5jZVRocmVzaG9sZCYmKHQrPWAgLS1ibHVyLWVmZmVjdC1wZXJmb3JtYW5jZS10aHJlc2hvbGQ9JHtlPy5ibHVyRWZmZWN0UGVyZm9ybWFuY2VUaHJlc2hvbGR9IGApLGU/LmRpc2FibGVVc2VyVW5zdGljayYmKHQrPVwiIC0tZGlzYWJsZS11c2VyLXVuc3RpY2sgXCIpLCEwIT09ZT8ua2V5VG9TdGljayYmXCJzdHJpbmdcIiE9dHlwZW9mIGU/LmtleVRvU3RpY2t8fCh0Kz1gIC0ta3M9JHshMD09PWUua2V5VG9TdGljaz9cImN0cmxcIjplLmtleVRvU3RpY2t9IGApLGU/LmtleVRvVW5zdGljayYmKHQrPWAgLS1rdXM9JHtlLmtleVRvVW5zdGlja30gYCksZT8ua2V5VG9Hcm91cFN0aWNrJiYodCs9YCAtLWtncz0ke2Uua2V5VG9Hcm91cFN0aWNrfSBgKSxlPy5ibG9ja092ZXJsYXBHcm91cFNuYXBwaW5nJiYodCs9XCIgLS1ibG9jay1vdmVybGFwLWdyb3VwLXNuYXBwaW5nIFwiKSxlPy5oaWRlVGFza2JhckVudHJ5JiYodCs9XCIgLS1uby10YiBcIiksZT8udGFza2Jhckljb25Hcm91cCYmKHQrPWAgLS10Yi1pZD0ke2U/LnRhc2tiYXJJY29uR3JvdXB9IGApLGU/LnRhc2tiYXJJY29uJiYodCs9YCAtLXRiLWljb249JHtlPy50YXNrYmFySWNvbn0gYCksZT8uZGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmcmJih0Kz1cIiAtLW5vLWhiIFwiKSxlPy5hdXRvSGlkZUNsaWVudFRhc2tiYXJJY29ucyYmKHQrPVwiIC0tdGItYXV0by1oaWRlIFwiKSxlPy50aGVtZSYmKHQrPWAgLS10aG09JHtlLnRoZW1lfSBgKSxlPy5kZWZhdWx0UmVzaXppbmdCZWhhdmlvciYmKHQrPWAgLS1yZXM9JHtlPy5kZWZhdWx0UmVzaXppbmdCZWhhdmlvcn0gYCk7Y29uc3Qgbj1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7cmV0dXJuIHQrPWAtLXJ1bnRpbWUtcG9ydCAke24ucG9ydH0gYCx0Kz1gLS1ydW50aW1lLXZlcnNpb24gJHtuLnZlcnNpb259IGAsdC50cmltKCl9fWNvbnN0IHA9YXN5bmMgZT0+e2xldCB0PShhd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCkpLmFyZ3NbXCJsb2NhbC1zdGFydHVwLXVybFwiXS5yZXBsYWNlKFwiY29uZmlnLmpzb25cIixcIlwiKTtjb25zdCBuPXQuaW5jbHVkZXMoXCJcXFxcXCIpP1wiXFxcXFwiOlwiL1wiO3JldHVybiB0LmVuZHNXaXRoKG4pJiYodD10LnNsaWNlKDAsLTEpKSxbdCxcImFzc2V0c1wiLGUuYWxpYXMsZS52ZXJzaW9uLGUudGFyZ2V0XS5qb2luKG4pfSxoPSgpPT5cInVuZGVmaW5lZFwiIT10eXBlb2YgY3J5cHRvJiZcInJhbmRvbVVVSURcImluIGNyeXB0byYmXCJmdW5jdGlvblwiPT10eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQ/Y3J5cHRvLnJhbmRvbVVVSUQoKTpcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csZT0+KGVeY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0mMTU+PmUvNCkudG9TdHJpbmcoMTYpKSxkPWU9Pi9eYXBwOlxcL1teL10rXFwvW14vXSskLy50ZXN0KGU/P1wiXCIpLHU9ZT0+e2NvbnN0IHQ9bmV3IE1hcDtyZXR1cm4gZS5mb3JFYWNoKGU9Pntjb25zdCBuPSFlLm5hbWUsaT1lLm5hbWU/LnN0YXJ0c1dpdGgoYyk/PyExLGE9ZS5jdXN0b21EYXRhPy5zbmFwQ2xpZW50SWQ7KG58fGl8fGQoZS5uYW1lKSkmJmEmJnQuc2V0KGEsZSl9KSx0fSxmPShlLHQsbik9PntPYmplY3QudmFsdWVzKGUpLmZvckVhY2goZT0+e2UuYXR0YWNoZWRDbGllbnRJZD09PXQ/ZS5hdHRhY2hlZENsaWVudElkPW46ZS50YXJnZXRDbGllbnRJZD09PXQmJihlLnRhcmdldENsaWVudElkPW4pfSl9LHY9ZT0+e2lmKCFkKGUpKXJldHVybmAke2N9JHtoKCl9YDtjb25zdCB0PWUuc3BsaXQoXCIvXCIpO3JldHVybiB0W3QubGVuZ3RoLTFdPWgoKSx0LmpvaW4oXCIvXCIpfTtleHBvcnR7bCBhcyBTbmFwU2VydmVyfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBPcGVuRmluIH0gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCAqIGFzIFNuYXAgZnJvbSBcIkBvcGVuZmluL3NuYXAtc2RrXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiQG9wZW5maW4vc25hcC1zZGtcIjtcbmltcG9ydCB7IGRvZXNBcHBBc3NldEV4aXN0LCBkb3dubG9hZEFwcEFzc2V0IH0gZnJvbSBcIi4vYXBwLWFzc2V0XCI7XG5cbmNvbnN0IFRFU1RfQVBQX1dJTkRPV19JRCA9IFwic25hcC1leGFtcGxlLW5hdGl2ZS10ZXN0LWFwcC1pZFwiO1xuY29uc3Qgc25hcERlZmF1bHRVcmwgPSBcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vcmVsZWFzZS9zbmFwLzEuNi4wL3NuYXAuemlwXCI7XG5jb25zdCBzbmFwVmVyc2lvbiA9IFwiMS42LjBcIjtcbmNvbnN0IHNuYXBBbGlhcyA9IFwib3BlbmZpbi1zbmFwXCI7XG5jb25zdCBzbmFwVGFyZ2V0ID0gXCJPcGVuRmluU25hcC5leGVcIjtcblxuLy8gVGhlIERPTSBlbGVtZW50c1xubGV0IGNoa1Nob3dEZWJ1Z1dpbmRvdzogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXA6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0N0cmxUb1NuYXA6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0Rpc2FibGVHUFVEcmFnZ2luZzogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZUJsdXJEcm9wOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29uczogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5cbmxldCBjaGtIaWRlVGFza0JhckVudHJ5OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtDdXN0b21UYXNrQmFySWNvbjogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXA6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0Rpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCB0eHRQcmltYXJ5VXJsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCB0eHRGYWxsYmFja1VybDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgZmllbGRQcmltYXJ5VXJsOiBIVE1MRWxlbWVudCB8IG51bGw7XG5sZXQgZmllbGRGYWxsYmFja1VybDogSFRNTEVsZW1lbnQgfCBudWxsO1xubGV0IHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGg6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxubGV0IGJ0blN0YXJ0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuU3RvcDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bk5hdGl2ZVRlc3RBcHA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5XaW5kb3dUZXN0QXBwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuU2hvd0hpZGVEZWJ1Z1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IHNlbEF0dGFjaFBvc2l0aW9uOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsU25hcEtleTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IHNlbFVuc25hcEtleTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IHNlbFJlc2l6ZTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IHNlbFRoZW1lOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQXR0YWNoVG9XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5EZXRhY2hGcm9tV2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuTWluaW1pemVHcm91cDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkdldExheW91dDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkdldEF0dGFjaGVkOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0R3JvdXBzOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VydmVyU3RhdHVzOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB8IG51bGw7XG5sZXQgbG9nZ2luZzogSFRNTFByZUVsZW1lbnQgfCBudWxsO1xubGV0IGRlYnVnV2luZG93U2hvd24gPSBmYWxzZTtcblxubGV0IHNlcnZlclN0YXRlOiBcInN0YXJ0aW5nXCIgfCBcInN0YXJ0ZWRcIiB8IFwic3RvcHBpbmdcIiB8IFwic3RvcHBlZFwiID0gXCJzdG9wcGVkXCI7XG5sZXQgaXNXaW5kb3dPcGVuID0gZmFsc2U7XG5sZXQgaXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xubGV0IHNlcnZlcjogU25hcC5TbmFwU2VydmVyIHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIEN1c3RvbSBsb2dnZXIgdGhhdCBpbXBsZW1lbnRzIHRoZSBMb2dnZXIgaW50ZXJmYWNlIHVzaW5nIGxvZ0luZm9ybWF0aW9uIGFuZCBsb2dFcnJvciBmdW5jdGlvbnNcbiAqL1xuY29uc3QgY3VzdG9tTG9nZ2VyID0ge1xuXHRpbmZvOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0luZm9ybWF0aW9uKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9LFxuXHRlcnJvcjogKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcblx0XHRsb2dFcnJvcihgJHttZXNzYWdlfSR7b3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCA/IGAgJHtvcHRpb25hbFBhcmFtcy5qb2luKFwiIFwiKX1gIDogXCJcIn1gKTtcblx0fSxcblx0d2FybjogKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcblx0XHRsb2dFcnJvcihgJHttZXNzYWdlfSR7b3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCA/IGAgJHtvcHRpb25hbFBhcmFtcy5qb2luKFwiIFwiKX1gIDogXCJcIn1gKTtcblx0fSxcblx0dHJhY2U6IChtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG5cdFx0bG9nSW5mb3JtYXRpb24oYCR7bWVzc2FnZX0ke29wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDAgPyBgICR7b3B0aW9uYWxQYXJhbXMuam9pbihcIiBcIil9YCA6IFwiXCJ9YCk7XG5cdH0sXG5cdGRlYnVnOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0luZm9ybWF0aW9uKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9XG59O1xuXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGZpbmlzaCBsb2FkaW5nXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBQbGF0Zm9ybSBoYXMgbG9hZGVkIHNvIGluaXRpYWxpemUgdGhlIERPTVxuXHRhd2FpdCBpbml0aWFsaXplRE9NKCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVET00oKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNoa1Nob3dEZWJ1Z1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrU2hvd0RlYnVnV2luZG93XCIpO1xuXHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXBcIik7XG5cdGNoa0N0cmxUb1NuYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0N0cmxUb1NuYXBcIik7XG5cdGNoa0Rpc2FibGVHUFVEcmFnZ2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZUdQVURyYWdnaW5nXCIpO1xuXHRjaGtEaXNhYmxlQmx1ckRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0Rpc2FibGVCbHVyRHJvcFwiKTtcblx0Y2hrSGlkZVRhc2tCYXJFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrSGlkZVRhc2tCYXJFbnRyeVwiKTtcblx0Y2hrQ3VzdG9tVGFza0Jhckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0N1c3RvbVRhc2tCYXJJY29uXCIpO1xuXHRjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXG5cdFx0XCIjY2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXBcIlxuXHQpO1xuXG5cdGNoa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29uc1wiKTtcblx0Y2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0Rpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nXCIpO1xuXHRjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoXCIpO1xuXHR0eHRQcmltYXJ5VXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiN0eHRQcmltYXJ5VXJsXCIpO1xuXHR0eHRGYWxsYmFja1VybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjdHh0RmFsbGJhY2tVcmxcIik7XG5cdGZpZWxkUHJpbWFyeVVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI2ZpZWxkUHJpbWFyeVVybFwiKTtcblx0ZmllbGRGYWxsYmFja1VybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI2ZpZWxkRmFsbGJhY2tVcmxcIik7XG5cdHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNyb3dDdXN0b21TbmFwQXBwQXNzZXRQYXRoXCIpO1xuXG5cdGJ0blN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU3RhcnRcIik7XG5cdGJ0blN0b3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdG9wXCIpO1xuXHRzZXJ2ZXJTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQYXJhZ3JhcGhFbGVtZW50PihcIiNzZXJ2ZXJTdGF0dXNcIik7XG5cdGJ0bk5hdGl2ZVRlc3RBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5OYXRpdmVUZXN0QXBwXCIpO1xuXHRidG5XaW5kb3dUZXN0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuV2luZG93VGVzdEFwcFwiKTtcblx0c2VsQXR0YWNoUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxBdHRhY2hQb3NpdGlvblwiKTtcblx0c2VsU25hcEtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbEtleVRvU25hcFwiKTtcblx0c2VsVW5zbmFwS2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsS2V5VG9VbnNuYXBcIik7XG5cdHNlbFJlc2l6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbFJlc2l6ZUJlaGF2aW91clwiKTtcblx0c2VsVGhlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxUaGVtZVwiKTtcblx0YnRuQXR0YWNoVG9XaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5BdHRhY2hUb1dpbmRvd1wiKTtcblx0YnRuRGV0YWNoRnJvbVdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkRldGFjaEZyb21XaW5kb3dcIik7XG5cdGJ0bk1pbmltaXplR3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5NaW5pbWl6ZUdyb3VwXCIpO1xuXHRidG5HZXRMYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRMYXlvdXRcIik7XG5cdGJ0bkdldEF0dGFjaGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0QXR0YWNoZWRcIik7XG5cdGJ0bkdldEdyb3VwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldEdyb3Vwc1wiKTtcblx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3dcIik7XG5cdGxvZ2dpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQcmVFbGVtZW50PihcIiNsb2dnaW5nXCIpO1xuXHRidG5DbGVhckxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNsZWFyTG9nXCIpO1xuXHRidG5TaG93SGlkZURlYnVnV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU2hvd0hpZGVEZWJ1Z1dpbmRvd1wiKTtcblxuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0Y2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXAgJiZcblx0XHRjaGtDdHJsVG9TbmFwICYmXG5cdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nICYmXG5cdFx0Y2hrRGlzYWJsZUJsdXJEcm9wICYmXG5cdFx0Y2hrSGlkZVRhc2tCYXJFbnRyeSAmJlxuXHRcdGNoa0N1c3RvbVRhc2tCYXJJY29uICYmXG5cdFx0Y2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXAgJiZcblx0XHRjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29ucyAmJlxuXHRcdGNoa0Rpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nICYmXG5cdFx0Y2hrQ3VzdG9tU25hcEFwcEFzc2V0UGF0aCAmJlxuXHRcdHR4dFByaW1hcnlVcmwgJiZcblx0XHR0eHRGYWxsYmFja1VybCAmJlxuXHRcdGZpZWxkUHJpbWFyeVVybCAmJlxuXHRcdGZpZWxkRmFsbGJhY2tVcmwgJiZcblx0XHRyb3dDdXN0b21TbmFwQXBwQXNzZXRQYXRoICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdGJ0bk1pbmltaXplR3JvdXAgJiZcblx0XHRidG5HZXRMYXlvdXQgJiZcblx0XHRidG5HZXRBdHRhY2hlZCAmJlxuXHRcdGJ0bkdldEdyb3VwcyAmJlxuXHRcdGJ0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3cgJiZcblx0XHRidG5DbGVhckxvZyAmJlxuXHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3dcblx0KSB7XG5cdFx0dHh0UHJpbWFyeVVybC52YWx1ZSA9IFwiaHR0cHM6Ly9leGFtcGxlb2ZiYWR1cmwuY29tL3NuYXAuemlwXCI7XG5cdFx0dHh0RmFsbGJhY2tVcmwudmFsdWUgPSBzbmFwRGVmYXVsdFVybDtcblx0XHRjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgZGlzcGxheSA9IGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGg/LmNoZWNrZWQgPyBcIlwiIDogXCJub25lXCI7XG5cdFx0XHRpZiAoZmllbGRQcmltYXJ5VXJsKSB7XG5cdFx0XHRcdGZpZWxkUHJpbWFyeVVybC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZEZhbGxiYWNrVXJsKSB7XG5cdFx0XHRcdGZpZWxkRmFsbGJhY2tVcmwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0XHRjb25zdCBtYW5pZmVzdCA9IGF3YWl0IGFwcC5nZXRNYW5pZmVzdCgpO1xuXG5cdFx0aWYgKG1hbmlmZXN0LmFwcEFzc2V0cz8uc29tZSgoYXNzZXQ6IHsgYWxpYXM/OiBzdHJpbmcgfSkgPT4gYXNzZXQuYWxpYXMgPT09IFwib3BlbmZpbi1zbmFwXCIpKSB7XG5cdFx0XHRyb3dDdXN0b21TbmFwQXBwQXNzZXRQYXRoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9XG5cblx0XHRpZiAobWFuaWZlc3QuYXBwQXNzZXRzPy5bMF0/LnNyYyA9PT0gXCJTTkFQX0FTU0VUX1VSTFwiKSB7XG5cdFx0XHRsb2dFcnJvcihcblx0XHRcdFx0XCJQbGVhc2UgcmVxdWVzdCB0aGUgU05BUF9BU1NFVF9VUkwgZnJvbSBIRVJFIGFuZCB1cGRhdGUgbWFuaWZlc3QuZmluLmpzb24gYmVmb3JlIHJ1bm5pbmcgdGhlIHNhbXBsZVwiXG5cdFx0XHQpO1xuXHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrQ3RybFRvU25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUJsdXJEcm9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RhcnRpbmdcIjtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBTdGFydGluZyBTbmFwIFNlcnZlciB3aXRoIElkICR7ZmluLm1lLmlkZW50aXR5LnV1aWR9YCk7XG5cdFx0XHRcdFx0c2VydmVyID0gbmV3IFNuYXAuU25hcFNlcnZlcihmaW4ubWUuaWRlbnRpdHkudXVpZCk7XG5cdFx0XHRcdFx0bGV0IGtleVRvU25hcDogdW5kZWZpbmVkIHwgXCJjdHJsXCIgfCBcInNoaWZ0XCIgfCBib29sZWFuO1xuXHRcdFx0XHRcdGxldCBrZXlUb1Vuc25hcDogdW5kZWZpbmVkIHwgXCJjdHJsXCIgfCBcInNoaWZ0XCI7XG5cblx0XHRcdFx0XHRpZiAoY2hrQ3RybFRvU25hcD8uY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc25hcEtleVZhbHVlID0gc2VsU25hcEtleT8udmFsdWU7XG5cdFx0XHRcdFx0XHRpZiAoc25hcEtleVZhbHVlID09PSBcImN0cmxcIikge1xuXHRcdFx0XHRcdFx0XHRrZXlUb1NuYXAgPSBcImN0cmxcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoc25hcEtleVZhbHVlID09PSBcInNoaWZ0XCIpIHtcblx0XHRcdFx0XHRcdFx0a2V5VG9TbmFwID0gXCJzaGlmdFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXA/LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGtleVRvVW5zbmFwVmFsdWUgPSBzZWxVbnNuYXBLZXk/LnZhbHVlO1xuXHRcdFx0XHRcdFx0aWYgKGtleVRvVW5zbmFwVmFsdWUgPT09IFwiY3RybFwiKSB7XG5cdFx0XHRcdFx0XHRcdGtleVRvVW5zbmFwID0gXCJjdHJsXCI7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGtleVRvVW5zbmFwVmFsdWUgPT09IFwic2hpZnRcIikge1xuXHRcdFx0XHRcdFx0XHRrZXlUb1Vuc25hcCA9IFwic2hpZnRcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBvcHRpb25zOiBTZXJ2ZXJPcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0c2hvd0RlYnVnOiBjaGtTaG93RGVidWdXaW5kb3c/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkaXNhYmxlVXNlclVuc3RpY2s6IGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwPy5jaGVja2VkLFxuXHRcdFx0XHRcdFx0a2V5VG9TdGljazoga2V5VG9TbmFwLFxuXHRcdFx0XHRcdFx0a2V5VG9VbnN0aWNrOiBrZXlUb1Vuc25hcCxcblx0XHRcdFx0XHRcdGRpc2FibGVHUFVBY2NlbGVyYXRlZERyYWdnaW5nOiBjaGtEaXNhYmxlR1BVRHJhZ2dpbmc/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkaXNhYmxlQmx1ckRyb3BQcmV2aWV3OiBjaGtEaXNhYmxlQmx1ckRyb3A/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRoaWRlVGFza2JhckVudHJ5OiBjaGtIaWRlVGFza0JhckVudHJ5Py5jaGVja2VkLFxuXHRcdFx0XHRcdFx0dGFza2Jhckljb246IGNoa0N1c3RvbVRhc2tCYXJJY29uPy5jaGVja2VkID8gXCJodHRwczovL29wZW5maW4uY28vZmF2aWNvbi5pY29cIiA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdHRhc2tiYXJJY29uR3JvdXA6IGNoa0dyb3VwV2l0aFBsYXRmb3JtVGFza2Jhckdyb3VwPy5jaGVja2VkXG5cdFx0XHRcdFx0XHRcdD8gYG9wZW5maW5fYXBwc19ncm91cC4ke2Zpbi5tZS5pZGVudGl0eS51dWlkfWBcblx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRhdXRvSGlkZUNsaWVudFRhc2tiYXJJY29uczogY2hrQXV0b0hpZGVDbGllbnRUYXNrYmFySWNvbnM/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZzogY2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmc/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkZWZhdWx0UmVzaXppbmdCZWhhdmlvcjogc2VsUmVzaXplPy52YWx1ZSBhcyBTbmFwLlJlc2l6aW5nQmVoYXZpb3IsXG5cdFx0XHRcdFx0XHR0aGVtZTogc2VsVGhlbWU/LnZhbHVlIGFzIFwic25hcC1vcmlnaW5hbFwiIHwgXCJzbmFwLWxpZ2h0MVwiIHwgXCJzbmFwLWRhcmsxXCJcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0aWYgKGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGg/LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHByaW1hcnlVcmwgPSB0eHRQcmltYXJ5VXJsPy52YWx1ZSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmFsbGJhY2tVcmwgPSB0eHRGYWxsYmFja1VybD8udmFsdWU7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHZhbGlkYXRlZEFwcEFzc2V0ID0gYXdhaXQgdmFsaWRhdGVBcHBBc3NldFNvdXJjZShwcmltYXJ5VXJsLCBmYWxsYmFja1VybCk7XG5cdFx0XHRcdFx0XHRpZiAoIXZhbGlkYXRlZEFwcEFzc2V0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdFx0bG9nRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XCJGYWlsZWQgdG8gZmV0Y2ggdGhlIGFwcCBhc3NldCBmcm9tIGJvdGggcHJpbWFyeSBhbmQgZmFsbGJhY2sgVVJMcy4gQ2Fubm90IHN0YXJ0IHRoZSBTbmFwIHNlcnZlciB3aXRoIGN1c3RvbSBhcHAgYXNzZXQgcGF0aC5cIlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRvcHRpb25zLmN1c3RvbVNuYXBBc3NldFNvdXJjZSA9IHZhbGlkYXRlZEFwcEFzc2V0LnZhbGlkYXRlZFVybDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RhcnQob3B0aW9ucyk7XG5cblx0XHRcdFx0XHRpZiAoY2hrU2hvd0RlYnVnV2luZG93Py5jaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRkZWJ1Z1dpbmRvd1Nob3duID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZGVidWdXaW5kb3dTaG93biA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZW5hYmxlQXV0b1dpbmRvd1JlZ2lzdHJhdGlvbigpO1xuXG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtcmVnaXN0ZXJlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50UmVnaXN0ZXJlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IFJlZ2lzdGVyZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50VW5SZWdpc3RlcmVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgVW5yZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRcdGlmIChldmVudC5jbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93T3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50cy1hdHRhY2hlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50c0F0dGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnRzIEF0dGFjaGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRcdGlmIChldmVudC5hdHRhY2hlZENsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWRldGFjaGVkXCIsIChldmVudDogU25hcC5DbGllbnREZXRhY2hlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERldGFjaGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRcdGlmIChldmVudC5jbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtYWN0aXZhdGVkXCIsIChldmVudDogU25hcC5DbGllbnRBY3RpdmF0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBBY3RpdmF0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWRlYWN0aXZhdGVkXCIsIChldmVudDogU25hcC5DbGllbnREZWFjdGl2YXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERlYWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIiwgKGV2ZW50OiBTbmFwLk1vdmVTaXplQ29tcGxldGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBNb3ZlIFNpemUgQ29tcGxldGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImdyb3Vwcy1jaGFuZ2VkXCIsIChldmVudDogU25hcC5Hcm91cHNDaGFuZ2VkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBHcm91cHMgQ2hhbmdlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0YXJ0ZWQgU25hcCBTZXJ2ZXJcIik7XG5cblx0XHRcdFx0XHRjb25zdCB3aW4gPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG5cdFx0XHRcdFx0Y29uc3QgbmF0aXZlSWQgPSBhd2FpdCB3aW4uZ2V0TmF0aXZlSWQoKTtcblxuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5yZWdpc3RlcldpbmRvdyhmaW4ubWUuaWRlbnRpdHkudXVpZCwgbmF0aXZlSWQpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRcdFx0YFJlZ2lzdGVyaW5nIFBsYXRmb3JtIFdpbmRvdyB3aXRoIElkICR7ZmluLm1lLmlkZW50aXR5LnV1aWR9IGFuZCBoYW5kbGUgJHtuYXRpdmVJZH1gXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGVkXCI7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuU3RvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdG9wcGluZ1wiO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdG9wcGluZyBTbmFwIFNlcnZlclwiKTtcblx0XHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RvcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0b3BwZWQgU25hcCBTZXJ2ZXJcIik7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdHNlcnZlciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RvcHBlZFwiO1xuXHRcdFx0XHRcdGlzV2luZG93T3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0Y29uc3QgcnVudGltZUluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7XG5cdFx0XHRcdGNvbnN0IGFwcEFzc2V0SW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHsgYWxpYXM6IFwic25hcC1uYXRpdmUtdGVzdC1hcHBcIiB9KTtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdFx0Y29uc3QgbG9jYWxBcHBVcmwgPSAocnVudGltZUluZm8uYXJncyBhcyBhbnkpW1wibG9jYWwtc3RhcnR1cC11cmxcIl0ucmVwbGFjZShcImNvbmZpZy5qc29uXCIsIFwiXCIpO1xuXHRcdFx0XHRhd2FpdCBsYXVuY2hBcHAoXG5cdFx0XHRcdFx0XCJOYXRpdmUgVGVzdCBBcHBcIixcblx0XHRcdFx0XHRURVNUX0FQUF9XSU5ET1dfSUQsXG5cdFx0XHRcdFx0YCR7bG9jYWxBcHBVcmx9YXNzZXRzXFxcXCR7YXBwQXNzZXRJbmZvLmFsaWFzfVxcXFwke2FwcEFzc2V0SW5mby52ZXJzaW9ufVxcXFwke2FwcEFzc2V0SW5mby50YXJnZXR9YCxcblx0XHRcdFx0XHRbXSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIndhaXRGb3JXaW5kb3dPZk5hbWVcIixcblx0XHRcdFx0XHRcdHRpbWVvdXRNczogMTUwMDAsXG5cdFx0XHRcdFx0XHRtYXRjaFJlZ2V4OiBcIl5OYXRpdmUgVGVzdCBBcHAkXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlzV2luZG93T3BlbiA9IHRydWU7XG5cdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuV2luZG93VGVzdEFwcD8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0YXdhaXQgbGF1bmNoV2luZG93T3B0aW9uc0FwcCgpO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyICYmIHNlbEF0dGFjaFBvc2l0aW9uKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBzZWxBdHRhY2hQb3NpdGlvbi52YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuYXR0YWNoV2luZG93cyhmaW4ubWUuaWRlbnRpdHkudXVpZCwgVEVTVF9BUFBfV0lORE9XX0lELCB2YWx1ZSBhcyBTbmFwLkF0dGFjaFNpZGUsIDApO1xuXHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLmRldGFjaEZyb21Hcm91cChURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGdyb3VwSWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0R3JvdXBJZEZvcldpbmRvdyhURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5taW5pbWl6ZUdyb3VwKGdyb3VwSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuQ2xlYXJMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0bG9nQ2xlYXIoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRMYXlvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGxheW91dCA9IGF3YWl0IHNlcnZlci5nZXRMYXlvdXQoKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIkxheW91dFwiKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShsYXlvdXQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRBdHRhY2hlZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXR0YWNoZWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0QXR0YWNoZWQoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiQXR0YWNoZWRcIik7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoYXR0YWNoZWQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRHcm91cHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGdyb3VwcyA9IGF3YWl0IHNlcnZlci5nZXRBbGxHcm91cElkcygpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiR3JvdXAgSWRzXCIpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKEpTT04uc3RyaW5naWZ5KGdyb3VwcywgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRjb25zdCBncm91cElkID0gYXdhaXQgc2VydmVyLmdldEdyb3VwSWRGb3JXaW5kb3coZmluLm1lLmlkZW50aXR5Lm5hbWUpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBHcm91cCBJZCBGb3IgQ3VycmVudCBXaW5kb3c6ICR7Z3JvdXBJZH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRkZWJ1Z1dpbmRvd1Nob3duID0gIWRlYnVnV2luZG93U2hvd247XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLnNob3dEZWJ1Z1dpbmRvdyhkZWJ1Z1dpbmRvd1Nob3duKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHNob3J0IGhhc2ggc3RyaW5nIGZyb20gYSBVUkwgdG8gdXNlIGFzIGEgdmVyc2lvbiBpZGVudGlmaWVyLlxuICogQHBhcmFtIHVybCBUaGUgVVJMIHRvIGhhc2guXG4gKiBAcmV0dXJucyBBIGhleCBzdHJpbmcgaGFzaCBvZiB0aGUgVVJMLlxuICovXG5mdW5jdGlvbiBoYXNoVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0bGV0IGhhc2ggPSA1MzgxO1xuXHRjb25zdCBtYXhTYWZlSGFzaCA9IDRfMjk0Xzk2N18yOTE7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgY29kZVBvaW50ID0gdXJsLmNoYXJDb2RlQXQoaSk7XG5cdFx0Y29uc3QgbXVsdGlwbGllZEhhc2ggPSBoYXNoICogMzM7XG5cdFx0aGFzaCA9IChtdWx0aXBsaWVkSGFzaCArIGNvZGVQb2ludCkgJSBtYXhTYWZlSGFzaDtcblx0fVxuXHRjb25zdCBoYXNoSGV4ID0gTWF0aC5mbG9vcihoYXNoKS50b1N0cmluZygxNik7XG5cdHJldHVybiBoYXNoSGV4LnBhZFN0YXJ0KDgsIFwiMFwiKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBET00gZWxlbWVudHMgd2l0aCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNlcnZlclN0YXR1cygpOiB2b2lkIHtcblx0aWYgKFxuXHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdyAmJlxuXHRcdGNoa0N0cmxUb1NuYXAgJiZcblx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcCAmJlxuXHRcdGNoa0Rpc2FibGVHUFVEcmFnZ2luZyAmJlxuXHRcdGNoa0Rpc2FibGVCbHVyRHJvcCAmJlxuXHRcdGJ0blN0YXJ0ICYmXG5cdFx0YnRuU3RvcCAmJlxuXHRcdHNlcnZlclN0YXR1cyAmJlxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRidG5BdHRhY2hUb1dpbmRvdyAmJlxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cgJiZcblx0XHRzZWxBdHRhY2hQb3NpdGlvbiAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkICYmXG5cdFx0YnRuR2V0R3JvdXBzICYmXG5cdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdyAmJlxuXHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3dcblx0KSB7XG5cdFx0aWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0aW5nXCIgfHwgc2VydmVyU3RhdGUgPT09IFwic3RvcHBpbmdcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0N0cmxUb1NuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVCbHVyRHJvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IGBTbmFwIFNlcnZlciBpcyAke3NlcnZlclN0YXRlfWA7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIpIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtDdHJsVG9TbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVHUFVEcmFnZ2luZy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlQmx1ckRyb3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RvcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0R3JvdXBzLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIlNuYXAgU2VydmVyIGlzIHN0YXJ0ZWRcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtDdHJsVG9TbmFwLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtEaXNhYmxlQmx1ckRyb3AuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RvcHBlZFwiO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSB3aW5kb3cgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVdpbmRvd1N0YXR1cygpOiB2b2lkIHtcblx0aWYgKFxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRzZWxBdHRhY2hQb3NpdGlvbiAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdGJ0bk1pbmltaXplR3JvdXAgJiZcblx0XHRidG5XaW5kb3dUZXN0QXBwXG5cdCkge1xuXHRcdGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGluZ1wiIHx8IHNlcnZlclN0YXRlID09PSBcInN0b3BwaW5nXCIpIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuV2luZG93VGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRlZFwiICYmIGlzV2luZG93T3Blbikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gIWlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5NaW5pbWl6ZUdyb3VwLmRpc2FibGVkID0gIWlzV2luZG93QXR0YWNoZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGVkXCI7XG5cdFx0XHRidG5XaW5kb3dUZXN0QXBwLmRpc2FibGVkID0gc2VydmVyU3RhdGUgPT09IFwic3RvcHBlZFwiO1xuXHRcdFx0c2VsQXR0YWNoUG9zaXRpb24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuQXR0YWNoVG9XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5NaW5pbWl6ZUdyb3VwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGluZm9ybWF0aW9uIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBpbmZvcm1hdGlvbiBUaGUgaW5mb3JtYXRpb24gdG8gc2VuZC5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mb3JtYXRpb246IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fSR7aW5mb3JtYXRpb259XFxuXFxuYDtcblx0XHRsb2dnaW5nLnNjcm9sbFRvcCA9IGxvZ2dpbmcuc2Nyb2xsSGVpZ2h0O1xuXHR9XG59XG5cbi8qKlxuICogU2VuZCBlcnJvciB0byB0aGUgbG9nIGRpc3BsYXkuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dFcnJvcihlcnI6IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fUVSUk9SOiAke2Vycn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgbG9nIGRpc3BsYXkuXG4gKi9cbmZ1bmN0aW9uIGxvZ0NsZWFyKCk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gMDtcblx0fVxufVxuXG4vKipcbiAqIExhdW5jaCBhbiBhcHBsaWNhdGlvbiB1c2luZyBTbmFwLlxuICogQHBhcmFtIGFwcE5hbWUgVGhlIG5hbWUgb2YgdGhlIGFwcCB0aGF0IGlzIGJlaW5nIGxhdW5jaGVkLlxuICogQHBhcmFtIGNsaWVudElkIEFuIElkIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBsYXVuY2hlZCBhcHAuXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXBwIHRvIGxhdW5jaC5cbiAqIEBwYXJhbSBhcmdzIEFkZGl0aW9uYWwgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBmb3IgdGhlIGxhdW5jaC5cbiAqIEBwYXJhbSBzdHJhdGVneSBUaGUgc3RyYXRlZ3kgdG8gbGF1bmNoIHRoZSB3aW5kb3cgd2l0aC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbGF1bmNoQXBwKFxuXHRhcHBOYW1lOiBzdHJpbmcsXG5cdGNsaWVudElkOiBzdHJpbmcsXG5cdHBhdGg6IHN0cmluZyxcblx0YXJnczogc3RyaW5nW10sXG5cdHN0cmF0ZWd5OiBTbmFwLkxhdW5jaFN0cmF0ZWd5XG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgTGF1bmNoaW5nICR7YXBwTmFtZX1gKTtcblx0XHRcdGNvbnN0IGxhdW5jaFJlc3VsdCA9IGF3YWl0IHNlcnZlci5sYXVuY2goe1xuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRjbGllbnRJZCxcblx0XHRcdFx0YXJncyxcblx0XHRcdFx0c3RyYXRlZ3lcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAobGF1bmNoUmVzdWx0Py5wcm9jZXNzX2lkKSB7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGAke2FwcE5hbWV9IGxhdW5jaGVkIHdpdGggcHJvY2VzcyBpZCAke2xhdW5jaFJlc3VsdC5wcm9jZXNzX2lkfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBMYXVuY2hlcyBhIHdpbmRvdyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBjaGlsZCB3aW5kb3dzLlxuICovXG5hc3luYyBmdW5jdGlvbiBsYXVuY2hXaW5kb3dPcHRpb25zQXBwKCk6IFByb21pc2U8dm9pZD4ge1xuXHRpZiAoc2VydmVyU3RhdGUgIT09IFwic3RhcnRlZFwiKSB7XG5cdFx0bG9nRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3Qgc3RhcnRlZFwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3Qgd2luZG93T3B0aW9uc05hbWUgPSBcIndpbmRvdy1vcHRpb25zLWFwcFwiO1xuXHRjb25zdCBvcHRpb25zV2luZG93ID0gZmluLldpbmRvdy53cmFwU3luYyh7IHV1aWQ6IGZpbi5tZS5pZGVudGl0eS51dWlkLCBuYW1lOiB3aW5kb3dPcHRpb25zTmFtZSB9KTtcblxuXHR0cnkge1xuXHRcdGF3YWl0IG9wdGlvbnNXaW5kb3cuZ2V0SW5mbygpO1xuXHRcdGF3YWl0IG9wdGlvbnNXaW5kb3cuYnJpbmdUb0Zyb250KCk7XG5cdH0gY2F0Y2gge1xuXHRcdC8vIHdpbmRvdyBkb2VzIG5vdCBleGlzdCwgc28gY3JlYXRlIGl0XG5cdFx0YXdhaXQgZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogd2luZG93T3B0aW9uc05hbWUsXG5cdFx0XHRhdXRvU2hvdzogdHJ1ZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IDYwMCxcblx0XHRcdGRlZmF1bHRXaWR0aDogODAwLFxuXHRcdFx0dXJsOiBcImh0dHBzOi8vYnVpbHQtb24tb3BlbmZpbi5naXRodWIuaW8vY29udGFpbmVyLXN0YXJ0ZXIvbWFpbi91c2Utd2luZG93LW9wdGlvbnMvaHRtbC9hcHAuaHRtbFwiXG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIHNuYXAgYXBwIGFzc2V0IGZyb20gdGhlIHByb3ZpZGVkIHByaW1hcnkgYW5kIGZhbGxiYWNrIFVSTHMgdG8gZW5zdXJlIGl0IGlzIGF2YWlsYWJsZSBiZWZvcmUgc3RhcnRpbmcgdGhlIFNuYXAgc2VydmVyLlxuICogQHBhcmFtIHByaW1hcnlVcmwgVGhlIHByaW1hcnkgVVJMIHRvIHZhbGlkYXRlIHRoZSBzbmFwIGFwcCBhc3NldCBmcm9tLlxuICogQHBhcmFtIGZhbGxiYWNrVXJsIEFuIG9wdGlvbmFsIGZhbGxiYWNrIFVSTCB0byB2YWxpZGF0ZSB0aGUgc25hcCBhcHAgYXNzZXQgZnJvbSBpZiB0aGUgcHJpbWFyeSBVUkwgZmFpbHMuXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB2YWxpZGF0aW9uIHdhcyBzdWNjZXNzZnVsLCB0aGUgdmFsaWRhdGVkIFVSTCBpZiBzdWNjZXNzZnVsLCBhbmQgd2hldGhlciB0aGUgZmFsbGJhY2sgVVJMIHdhcyB1c2VkLlxuICovXG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUFwcEFzc2V0U291cmNlKFxuXHRwcmltYXJ5VXJsOiBzdHJpbmcsXG5cdGZhbGxiYWNrVXJsPzogc3RyaW5nXG4pOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgdmFsaWRhdGVkVXJsPzogc3RyaW5nOyBpc0ZhbGxiYWNrVXJsPzogYm9vbGVhbiB9PiB7XG5cdGNvbnN0IHNuYXBBc3NldEluZm86IE9wZW5GaW4uQXBwQXNzZXRJbmZvID0ge1xuXHRcdGFsaWFzOiBzbmFwQWxpYXMsXG5cdFx0c3JjOiBzbmFwRGVmYXVsdFVybCxcblx0XHR2ZXJzaW9uOiBzbmFwVmVyc2lvbixcblx0XHR0YXJnZXQ6IHNuYXBUYXJnZXQsXG5cdFx0bWFuZGF0b3J5OiBmYWxzZVxuXHR9O1xuXHQvLyBiZWZvcmUgdHJ5aW5nIGN1c3RvbSB1cmxzIGNoZWNrIHRvIHNlZSBpZiB5b3UgYWxyZWFkeSBoYXZlIHNuYXBcblx0Y29uc3Qgc25hcERvd25sb2FkZWRBc3NldEluZm86IE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkID0gYXdhaXQgZG9lc0FwcEFzc2V0RXhpc3QoXG5cdFx0c25hcEFzc2V0SW5mby5hbGlhcyxcblx0XHRzbmFwQXNzZXRJbmZvLnZlcnNpb25cblx0KTtcblxuXHRpZiAoc25hcERvd25sb2FkZWRBc3NldEluZm8pIHtcblx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdGBXZSBoYXZlIGEgc25hcCBhc3NldCB0aGF0IG1hdGNoZXMgdGhlIGFsaWFzIGFuZCB2ZXJzaW9uLiBJdCBoYXMgdGhlIGZvbGxvd2luZyBkZXRhaWxzOiBhbGlhczogJHtzbmFwRG93bmxvYWRlZEFzc2V0SW5mby5hbGlhc30sIHZlcnNpb246ICR7c25hcERvd25sb2FkZWRBc3NldEluZm8udmVyc2lvbn0sIHNyYzogJHtzbmFwRG93bmxvYWRlZEFzc2V0SW5mby5zcmN9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHR2YWxpZGF0ZWRVcmw6IHNuYXBEb3dubG9hZGVkQXNzZXRJbmZvLnNyYyxcblx0XHRcdGlzRmFsbGJhY2tVcmw6IHNuYXBEb3dubG9hZGVkQXNzZXRJbmZvLnNyYyA9PT0gZmFsbGJhY2tVcmxcblx0XHR9O1xuXHR9XG5cblx0Ly8gU05BUCBkb3dubG9hZHMgYSBzcGVjaWZpYyBhbGlhcyArIHZlcnNpb24gY29tYmluYXRpb24uXG5cdC8vIFRoZSBydW50aW1lIGRvZXMgbm90IGFsbG93IGEgcmV0cnkgb2YgdGhlIHNhbWUgYXBwIGFzc2V0IGlmIHRoZSBvbmx5IHRoaW5nIHRoYXQgaGFzIGNoYW5nZWQgaXMgdGhlIHVybC5cblx0Ly8gU2luY2Ugd2UgaGF2ZSBubyBzbmFwIHZlcnNpb24gd2Ugd2FudCB0byB2YWxpZGF0ZSBvdXIgcHJpbWFyeSB1cmwuXG5cdGxvZ0luZm9ybWF0aW9uKGBWYWxpZGF0aW5nIHRoZSBwcmltYXJ5IGFzc2V0IHVybCBmb3IgdGhlIHNuYXAgYXNzZXQ6ICR7cHJpbWFyeVVybH1gKTtcblx0c25hcEFzc2V0SW5mby5hbGlhcyA9IGAke3NuYXBBbGlhc30tdmFsaWRhdGUtZG93bmxvYWRgOyAvLyB1c2UgYSBkaWZmZXJlbnQgYWxpYXMgZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkIHNvIHRoYXQgd2UgY2FuIGhhdmUgZGlmZmVyZW50IHZlcnNpb25zIGlmIG5lZWRlZCB3aXRob3V0IGNvbmZsaWN0IHdpdGggdGhlIGFjdHVhbCBzbmFwIGFzc2V0IGFsaWFzXG5cblx0c25hcEFzc2V0SW5mby50YXJnZXQgPSBcIk5vT3BcIjsgLy8gV2UgZG9uJ3Qgd2FudCB0byBhY3R1YWxseSBydW4gdGhlIHNuYXAgYXNzZXQgZHVyaW5nIHZhbGlkYXRpb24gc2luY2Ugd2UganVzdCB3YW50IHRvIGNoZWNrIGlmIHRoZSB1cmwgaXMgdmFsaWQgYW5kIHRoZSBhc3NldCBjYW4gYmUgZG93bmxvYWRlZCwgc28gdXNlIGEgTm9PcCB0YXJnZXQgdGhhdCB3aWxsIG5vdCBkbyBhbnl0aGluZyBpZiBpdCBpcyBydW4gZm9yIGFueSByZWFzb24gZHVyaW5nIHRoZSB2YWxpZGF0aW9uIHByb2Nlc3NcblxuXHQvLyBVcGRhdGUgYXNzZXQgaW5mbyB0byB0YXJnZXQgcHJpbWFyeSB1cmxcblx0c25hcEFzc2V0SW5mby5zcmMgPSBwcmltYXJ5VXJsOyAvLyB1cGRhdGUgdGhlIHNyYyB0byB0aGUgcHJpbWFyeSB1cmwgZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkXG5cdHNuYXBBc3NldEluZm8udmVyc2lvbiA9IGhhc2hVcmwocHJpbWFyeVVybCk7IC8vIHVzZSB0aGUgdXJsIGhhc2ggYXMgdGhlIHZlcnNpb24gZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkIHNvIHRoYXQgaWYgdGhlIHVybCBjaGFuZ2VzIHdlIHdpbGwgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiwgYnV0IGlmIHRoZSB1cmwgaXMgdGhlIHNhbWUgd2Ugd2lsbCBub3QgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiBzaW5jZSB3ZSBoYXZlIGFscmVhZHkgdmFsaWRhdGVkIGl0XG5cblx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXRQcmltYXJ5VXJsID0gYXdhaXQgZmV0Y2hBcHBBc3NldChzbmFwQXNzZXRJbmZvKTtcblx0bGV0IHZhbGlkYXRlZEFzc2V0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0aWYgKHZhbGlkYXRlZEFwcEFzc2V0UHJpbWFyeVVybCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGZhbGxiYWNrVXJsKSB7XG5cdFx0XHQvLyB2YWxpZGF0ZSBmYWxsYmFjayB1cmxcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBWYWxpZGF0aW5nIHRoZSBmYWxsYmFjayBhc3NldCB1cmwgZm9yIHRoZSBzbmFwIGFzc2V0OiAke2ZhbGxiYWNrVXJsfWApO1xuXHRcdFx0c25hcEFzc2V0SW5mby5zcmMgPSBmYWxsYmFja1VybDsgLy8gdXBkYXRlIHRoZSBzcmMgdG8gdGhlIGZhbGxiYWNrIHVybCBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWRcblx0XHRcdHNuYXBBc3NldEluZm8udmVyc2lvbiA9IGhhc2hVcmwoZmFsbGJhY2tVcmwpOyAvLyB1c2UgdGhlIHVybCBoYXNoIGFzIHRoZSB2ZXJzaW9uIGZvciB0aGUgdmFsaWRhdGlvbiBkb3dubG9hZCBzbyB0aGF0IGlmIHRoZSB1cmwgY2hhbmdlcyB3ZSB3aWxsIGF0dGVtcHQgdG8gZG93bmxvYWQgYWdhaW4sIGJ1dCBpZiB0aGUgdXJsIGlzIHRoZSBzYW1lIHdlIHdpbGwgbm90IGF0dGVtcHQgdG8gZG93bmxvYWQgYWdhaW4gc2luY2Ugd2UgaGF2ZSBhbHJlYWR5IHZhbGlkYXRlZCBpdFxuXHRcdFx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXRGYWxsYmFja1VybCA9IGF3YWl0IGZldGNoQXBwQXNzZXQoc25hcEFzc2V0SW5mbyk7XG5cblx0XHRcdGlmICh2YWxpZGF0ZWRBcHBBc3NldEZhbGxiYWNrVXJsKSB7XG5cdFx0XHRcdHZhbGlkYXRlZEFzc2V0VXJsID0gZmFsbGJhY2tVcmw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHZhbGlkYXRlZEFzc2V0VXJsID0gcHJpbWFyeVVybDtcblx0fVxuXG5cdGlmICh2YWxpZGF0ZWRBc3NldFVybCkge1xuXHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0YFN1Y2Nlc3NmdWxseSB2YWxpZGF0ZWQgdGhlIHVybCBmb3IgdGhlIHNuYXAgYXNzZXQ6ICR7dmFsaWRhdGVkQXNzZXRVcmx9LiBUaGlzIHVybCB3aWxsIGJlIHBhc3NlZCB0byBTbmFwIE9wdGlvbnMgdGhyb3VnaCB0aGUgY3VzdG9tU25hcEFzc2V0U291cmNlIHNldHRpbmcuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHR2YWxpZGF0ZWRVcmw6IHZhbGlkYXRlZEFzc2V0VXJsLFxuXHRcdFx0aXNGYWxsYmFja1VybDogdmFsaWRhdGVkQXNzZXRVcmwgPT09IGZhbGxiYWNrVXJsXG5cdFx0fTtcblx0fVxuXHRyZXR1cm4geyBzdWNjZXNzOiBmYWxzZSB9O1xufVxuXG4vKipcbiAqIERvd25sb2FkIGFuZCByZXR1cm4gYXBwIGFzc2V0IGluZm8gZm9yIHRoZSBwcm92aWRlZCBhcHAgYXNzZXQgZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSBhcHBBc3NldEluZm8gVGhlIGFwcCBhc3NldCBkZWZpbml0aW9uIHRvIGRvd25sb2FkLlxuICogQHJldHVybnMgVGhlIGFwcCBhc3NldCBpbmZvIGlmIGRvd25sb2FkZWQgb3IgZm91bmQsIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQXBwQXNzZXQoYXBwQXNzZXRJbmZvOiBPcGVuRmluLkFwcEFzc2V0SW5mbyk6IFByb21pc2U8T3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQ+IHtcblx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXQgPSBhd2FpdCBkb3dubG9hZEFwcEFzc2V0KGFwcEFzc2V0SW5mbywge1xuXHRcdGxvZ2dlcjogY3VzdG9tTG9nZ2VyLFxuXHRcdGFzc2V0RG93bmxvYWRQcm9ncmVzczogKHByb2dyZXNzOiBudW1iZXIsIHNyYzogc3RyaW5nLCBhbGlhczogc3RyaW5nKSA9PiB7XG5cdFx0XHQvLyBzaG93aW5nIGEgZGlmZmVyZW5jZSBhcyB0aGUgZG93bmxvYWQgQXBwIEFzc2V0IGFsc28gbG9ncyB0aGUgZG93bmxvYWQgcHJvZ3Jlc3MgdXNpbmcgbG9nSW5mb3JtYXRpb24gYW5kIGxvZ0Vycm9yIHRocm91Z2ggdGhlIGN1c3RvbSBsb2dnZXIuXG5cdFx0XHRjb25zb2xlLmxvZyhgRG93bmxvYWQgcHJvZ3Jlc3MgZm9yIGFsaWFzICcke2FsaWFzfScgZnJvbSAnJHtzcmN9JzogJHtwcm9ncmVzc30lYCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHZhbGlkYXRlZEFwcEFzc2V0O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9