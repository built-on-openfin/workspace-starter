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
var e={827:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var a=Number.isNaN||function(e){return e!=e};function r(){r.init.call(this)}e.exports=r,e.exports.once=function(e,t){return new Promise(function(n,i){function a(n){e.removeListener(t,r),i(n)}function r(){"function"==typeof e.removeListener&&e.removeListener("error",a),n([].slice.call(arguments))}v(e,t,r,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,n)}(e,a,{once:!0})})},r.EventEmitter=r,r.prototype._events=void 0,r.prototype._eventsCount=0,r.prototype._maxListeners=void 0;var s=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?r.defaultMaxListeners:e._maxListeners}function l(e,t,n,i){var a,r,s,l;if(o(n),void 0===(r=e._events)?(r=e._events=Object.create(null),e._eventsCount=0):(void 0!==r.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),r=e._events),s=r[t]),void 0===s)s=r[t]=n,++e._eventsCount;else if("function"==typeof s?s=r[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(a=c(e))>0&&s.length>a&&!s.warned){s.warned=!0;var h=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");h.name="MaxListenersExceededWarning",h.emitter=e,h.type=t,h.count=s.length,l=h,console&&console.warn&&console.warn(l)}return e}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},a=h.bind(i);return a.listener=n,i.wrapFn=a,a}function d(e,t,n){var i=e._events;if(void 0===i)return[];var a=i[t];return void 0===a?[]:"function"==typeof a?n?[a.listener||a]:[a]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(a):f(a,a.length)}function u(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function v(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function a(r){i.once&&e.removeEventListener(t,a),n(r)})}}Object.defineProperty(r,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),r.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},r.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},r.prototype.getMaxListeners=function(){return c(this)},r.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var a="error"===e,r=this._events;if(void 0!==r)a=a&&void 0===r.error;else if(!a)return!1;if(a){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var o=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw o.context=s,o}var c=r[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var l=c.length,h=f(c,l);for(n=0;n<l;++n)i(h[n],this,t)}return!0},r.prototype.addListener=function(e,t){return l(this,e,t,!1)},r.prototype.on=r.prototype.addListener,r.prototype.prependListener=function(e,t){return l(this,e,t,!0)},r.prototype.once=function(e,t){return o(t),this.on(e,p(this,e,t)),this},r.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,p(this,e,t)),this},r.prototype.removeListener=function(e,t){var n,i,a,r,s;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(a=-1,r=n.length-1;r>=0;r--)if(n[r]===t||n[r].listener===t){s=n[r].listener,a=r;break}if(a<0)return this;0===a?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,a),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},r.prototype.off=r.prototype.removeListener,r.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var a,r=Object.keys(n);for(i=0;i<r.length;++i)"removeListener"!==(a=r[i])&&this.removeAllListeners(a);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},r.prototype.listeners=function(e){return d(this,e,!0)},r.prototype.rawListeners=function(e){return d(this,e,!1)},r.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},r.prototype.listenerCount=u,r.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i=n(827);const a="openfin-snap",r="1.5.0",s=(e,t)=>`${e} ${t instanceof Error?t.message:"string"==typeof t?t:JSON.stringify(t)}`,o=async()=>{try{return(await fin.System.getAppAssetInfo({alias:a})).version===r}catch(e){return!1}},c="internal-generated-window-";class l{constructor(e,t=1e4,n=5e3){if(this.server_id=e,this.emitter=new i.EventEmitter,this.__extensions=[],this.snapServerStatus="disconnected",this.healthCheckInitializing=!1,!fin)throw new Error("OpenFin is not available");if(t<1e3)throw new Error(`healthCheckIntervalMs must be at least 1000ms (provided: ${t}ms). Values below this are excessive and cause unnecessary overhead.`);if(n<500)throw new Error(`healthCheckTimeoutMs must be at least 500ms (provided: ${n}ms). Timeout must allow sufficient time for network round-trip and server response.`);if(n>=t)throw new Error(`healthCheckTimeoutMs (${n}ms) must be less than healthCheckIntervalMs (${t}ms). This ensures the timeout completes before the next health check begins, allowing time for recovery.`);this.healthCheckIntervalMs=t,this.healthCheckTimeoutMs=n}async start(e){try{const e=await fin.System.getRuntimeInfo();"x64"!==e?.architecture&&console.warn(`The architecture of the connected OpenFin runtime is '${e.architecture}' - Window snapping is currently only supported with 64-bit applications. Snapping will be disabled.`)}catch(e){console.warn(`Could not get runtime info: ${e}`)}const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(t.rawValue){if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL")}e?.executablePath||await(async e=>{const t=await fin.Application.getCurrentSync().getManifest(),n=t.appAssets?.find(e=>e.alias===a);if(n)return void console.warn("Detected Snap package in app manifest appAssets",n);if(await o())return void console.info("Using existing Snap package");const i=e??`https://cdn.openfin.co/release/snap/${r}/snap.zip`;console.info(`Downloading Snap asset from: '${i}'`);const c={alias:a,src:`${i}`,target:"OpenFinSnap.exe",version:r};console.info("Downloading Snap package",c);try{await fin.System.downloadAsset(c,()=>{})}catch(e){throw new Error(s("Unable to download Snap package.",e))}})(e?.customSnapAssetSource);const n=await this.build_command_line(e);let i={alias:a,arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error(s("Failed to launch the Snap server.",e))}return this.connect()}async connect(){await this.internalConnect(!0)}__addExtension(e){this.__extensions.push(e)}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async showDebugWindow(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"showDebugWindow",payload:{show:e}}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e,t=!0){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e,reset:t}}))}async enterDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"enterBatchMode"}))}async exitDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"exitBatchMode"}))}async prepareToApplySnapshot(e,t){if(!e||e.options?.closeExistingWindows||e.options?.closeSnapshotWindows)return this.needToResetLayout=!0,void await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}));this.needToResetLayout=!1;const n=e.snapshot,i=JSON.stringify(n,null,2),a=n.snap;if(!a)return;await(this.client?.dispatch("snap_api_invoke",{action:"prepareToApplyLayout"}));const r=t??v,s=(await this.getLayout())?.clients.map(e=>e.id)??[],o=u(n.windows),c=Array.from(o.keys()).filter(e=>s.includes(e));a.clients.filter(e=>c.includes(e.id)).forEach(e=>{const t=e.id,n=r(t);e.id=n,f(a.connections,t,n);const i=o.get(t);i.customData.snapClientId=n,i.name=n});const l=JSON.stringify(n,null,2);console.debug(`Snap SDK modified snapshot data before applying it.\nOriginal snapshot:\n${i}\nModified snapshot:\n${l}`)}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){e.snap&&await this.setLayout(e.snap,this.needToResetLayout)}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");e.appAssetInfo&&(e.path=await h({target:e.path,...e.appAssetInfo})),console.log("options: ",e);const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t,n){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t,resizingBehavior:n}}))}async enableAutoWindowRegistration(){const e=e=>this.handleNewWindow(e);return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async getClientIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{nativeWindowId:Number.NaN}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getClientIdForWindow",payload:t}));if(!n.payload.clientId)throw new Error("No client ID found for window");return n.payload.clientId}async getGroupIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getGroupIdForWindow",payload:t}));if(!n.payload.groupId)throw new Error("No group found for window");return n.payload.groupId}async getWindowResizable(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getResizable",payload:t}));if(null===n.payload.resizable)throw new Error("No window found for given ID");return n.payload.resizable}async setWindowResizable(e,t){const n="number"==typeof e?{nativeWindowId:e,resizable:t}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e,resizable:t}:{nativeWindowId:this.hexStringToNumber(e),resizable:t};await(this.client?.dispatch("snap_api_invoke",{action:"setResizable",payload:n}))}async getWindowsInGroup(e){const t=await(this.client?.dispatch("snap_api_invoke",{action:"getWindowsInGroup",payload:{groupId:e}}));return t.payload.windows?t.payload.windows.map(e=>({nativeId:e[0],clientId:e[1]})):[]}async getAllGroupIds(){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAllGroupIds"}))).payload.groupIds}async minimizeGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"minimizeGroup",payload:{groupId:e}}))}async restoreGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"restoreGroup",payload:{groupId:e}}))}getSnapServerStatus(){return this.snapServerStatus}handleSnapServerDisconnection(){this.stopHealthCheck(),this.client=void 0,this.setSnapServerStatus("disconnected"),console.warn("SnapSDK: Disconnected from Snap server, attempt reconnect."),this.internalConnect(!1)}async internalConnect(e){if(this.stopHealthCheck(),this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",async(t,n)=>{try{e&&await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:t.version,componentName:"snap-server"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}}),this.client.onDisconnection(()=>this.handleSnapServerDisconnection()),e)try{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"1.5.0",componentName:"snap-client"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}this.client.register("snap_updates",(e,t)=>this.handleSnapEvents(e,t)),this.setSnapServerStatus("connected"),this.startHealthCheck(),this.__extensions.forEach(e=>e.onConnected(this.client))}setSnapServerStatus(e){this.snapServerStatus!==e&&(this.snapServerStatus=e,"disconnected"===e?this.emit_event("snap-server-disconnected",{}):"no-response"===e&&this.emit_event("snap-server-no-response",{timestamp:Date.now()}))}startHealthCheck(){if("disconnected"!==this.snapServerStatus&&!this.healthCheckInitializing&&!this.healthCheckInterval){this.healthCheckInitializing=!0;try{this.healthCheckInterval=setInterval(async()=>{if("disconnected"!==this.snapServerStatus&&this.client)try{const e=new Promise((e,t)=>{setTimeout(()=>t(new Error("Snap server response timeout")),this.healthCheckTimeoutMs)}),t=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),n=await Promise.race([this.client?.dispatch("snap_api_invoke",{action:"healthCheck",payload:{nonce:t}})||Promise.reject(new Error("Client is not available")),e]);if(!this.client)return void this.setSnapServerStatus("disconnected");if(!n?.payload||n.payload.nonce!==t)throw new Error("Health check validation failed - nonce mismatch");"no-response"===this.snapServerStatus&&this.setSnapServerStatus("connected")}catch(e){this.client?this.setSnapServerStatus("no-response"):this.setSnapServerStatus("disconnected")}},this.healthCheckIntervalMs)}finally{this.healthCheckInitializing=!1}}}stopHealthCheck(){this.healthCheckInterval&&(clearInterval(this.healthCheckInterval),this.healthCheckInterval=void 0)}async handleNewWindow(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const a=await t.getOptions();if(void 0!==a.includeInSnapshots&&!1===a.includeInSnapshots)return void console.log(`SnapSDK: Not registering ${e.uuid}:${e.name}, Window is explicitly excluded -includeInSnapshots == false`);const r=a.customData||{};r.snapClientId?i=r.snapClientId:await t.updateOptions({customData:{...r,snapClientId:i}}),console.log(`SnapSDK: Auto-registering window: snapClientId:${i}, handle ${n}, uuid:${e.uuid}, name:${e.name}`),await this.registerWindow(i,n,r.snapResizingBehavior)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}hexStringToNumber(e){const t=e?.trim();return/^0x[0-9a-f]+$/i.test(t)?Number(t):NaN}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug "),e?.disableGPUAcceleratedDragging&&(t+=" --disable-gpu-accelerated-dragging true "),e?.disableBlurDropPreview&&(t+=" --blur-drop-preview false "),void 0!==e?.blurEffectPerformanceThreshold&&(t+=` --blur-effect-performance-threshold=${e?.blurEffectPerformanceThreshold} `),e?.disableUserUnstick&&(t+=" --disable-user-unstick "),!0!==e?.keyToStick&&"string"!=typeof e?.keyToStick||(t+=` --ks=${!0===e.keyToStick?"ctrl":e.keyToStick} `),e?.keyToUnstick&&(t+=` --kus=${e.keyToUnstick} `),e?.hideTaskbarEntry&&(t+=" --no-tb "),e?.taskbarIconGroup&&(t+=` --tb-id=${e?.taskbarIconGroup} `),e?.taskbarIcon&&(t+=` --tb-icon=${e?.taskbarIcon} `),e?.disableRuntimeHeartbeating&&(t+=" --no-hb "),e?.autoHideClientTaskbarIcons&&(t+=" --tb-auto-hide "),e?.theme&&(t+=` --thm=${e.theme} `),e?.defaultResizingBehavior&&(t+=` --res=${e?.defaultResizingBehavior} `);const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}const h=async e=>{let t=(await fin.System.getRuntimeInfo()).args["local-startup-url"].replace("config.json","");const n=t.includes("\\")?"\\":"/";return t.endsWith(n)&&(t=t.slice(0,-1)),[t,"assets",e.alias,e.version,e.target].join(n)},p=()=>"undefined"!=typeof crypto&&"randomUUID"in crypto&&"function"==typeof crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),d=e=>/^app:\/[^/]+\/[^/]+$/.test(e??""),u=e=>{const t=new Map;return e.forEach(e=>{const n=!e.name,i=e.name?.startsWith(c)??!1,a=e.customData?.snapClientId;(n||i||d(e.name))&&a&&t.set(a,e)}),t},f=(e,t,n)=>{Object.values(e).forEach(e=>{e.attachedClientId===t?e.attachedClientId=n:e.targetClientId===t&&(e.targetClientId=n)})},v=e=>{if(!d(e))return`${c}${p()}`;const t=e.split("/");return t[t.length-1]=p(),t.join("/")};

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
const snapDefaultUrl = "https://cdn.openfin.co/release/snap/1.5.0/snap.zip";
const snapVersion = "1.5.0";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdDQUFnQyxLQUFLLFdBQVcsR0FBRyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbkYsQ0FBQztLQUNELENBQUMsQ0FBQztJQUNILE9BQU8saUJBQWlCLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vY2xpZW50L3NyYy9hcHAtYXNzZXQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3NuYXAtc2RrL29wZW5maW4uc25hcC5tanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy8uL2NsaWVudC9zcmMvcHJvdmlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBPcGVuRmluIH0gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGEgbG9nZ2VyLlxuICovXG5pbnRlcmZhY2UgTG9nZ2VyIHtcblx0LyoqXG5cdCAqIExvZyBkYXRhIGFzIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0aW5mbyhtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgZXJyb3IuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRlcnJvcihtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgd2FybmluZy5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdHdhcm4obWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIExvZyBkYXRhIGFzIHRyYWNlLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0dHJhY2UobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIExvZyBkYXRhIGFzIGRlYnVnLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0ZGVidWcobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQ7XG59XG5cbi8qKlxuICogRm9yIGZ1bmN0aW9uYWxpdHkgdGhhdCByZXF1aXJlcyBhbiBhcHAgYXNzZXQsIHRoaXMgZnVuY3Rpb24gd2lsbCBhdHRlbXB0IHRvIGZldGNoIHRoZSBhcHAgYXNzZXQgZnJvbSB0aGUgcGFzc2VkIGRlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwQXNzZXREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBhcHAgYXNzZXQgdG8gZmV0Y2guXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvYmplY3QgY29udGFpbmluZyBhIGxvZ2dlciB0byBsb2cgYW55IGluZm8gb3IgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBwcm9jZXNzIGFuZCBhIGZ1bmN0aW9uIHRvIGNhcHR1cmUgcHJvZ3Jlc3MuXG4gKiBAcGFyYW0gb3B0aW9ucy5sb2dnZXIgLSBBIGxvZ2dlciB0byBsb2cgYW55IGVycm9ycyB0aGF0IG9jY3VyIGR1cmluZyB0aGUgZmV0Y2hpbmcgb2YgdGhlIGFwcCBhc3NldC5cbiAqIEBwYXJhbSBvcHRpb25zLmFzc2V0RG93bmxvYWRQcm9ncmVzcyAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVwb3J0IHRoZSBwcm9ncmVzcyBvZiB0aGUgYXNzZXQgZG93bmxvYWQuXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXBwIGFzc2V0IGluZm8gaWYgdGhlIGFwcCBhc3NldCB3YXMgc3VjY2Vzc2Z1bGx5IGZldGNoZWQsIG9yIHVuZGVmaW5lZCBpZiBib3RoIGF0dGVtcHRzIGZhaWxlZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXBwQXNzZXQoXG5cdGFwcEFzc2V0RGVmaW5pdGlvbjogT3BlbkZpbi5BcHBBc3NldEluZm8sXG5cdG9wdGlvbnM/OiB7XG5cdFx0bG9nZ2VyPzogTG9nZ2VyO1xuXHRcdGFzc2V0RG93bmxvYWRQcm9ncmVzcz86IChwcm9ncmVzczogbnVtYmVyLCBzcmM6IHN0cmluZywgYWxpYXM6IHN0cmluZykgPT4gdm9pZDtcblx0fVxuKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHRjb25zdCBzcmMgPSBhcHBBc3NldERlZmluaXRpb24uc3JjO1xuXHRjb25zdCBsb2dnZXIgPSBvcHRpb25zPy5sb2dnZXI7XG5cdGlmICghaXNTdHJpbmdWYWx1ZShzcmMpKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihcIkNhbm5vdCBpbml0aWFsaXplIEFwcCBBc3NldCBEb3dubG9hZCB3aXRob3V0IHNyYyBiZWluZyBkZWZpbmVkXCIpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRpZiAoIWFwcEFzc2V0RGVmaW5pdGlvbi5zcmMuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRsb2dnZXI/LmVycm9yKFxuXHRcdFx0XCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIFVSTCBmb3IgdGhlIGFwcCBhc3NldCBzcmMuIE9ubHkgSFRUUCBhbmQgSFRUUFMgcHJvdG9jb2xzIGFyZSBzdXBwb3J0ZWQuIFdpdGggaHR0cHMgcHJlZmVycmVkIGZvciBzZWN1cml0eSByZWFzb25zLlwiXG5cdFx0KTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgYWxpYXMgPSBhcHBBc3NldERlZmluaXRpb24uYWxpYXM7XG5cdGlmICghaXNTdHJpbmdWYWx1ZShhbGlhcykpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgYWxpYXMgYmVpbmcgZGVmaW5lZFwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0ID0gYXBwQXNzZXREZWZpbml0aW9uLnRhcmdldDtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKHRhcmdldCkpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgdGFyZ2V0IGJlaW5nIGRlZmluZWRcIik7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdGNvbnN0IHZlcnNpb24gPSBhcHBBc3NldERlZmluaXRpb24udmVyc2lvbjtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKHZlcnNpb24pKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihcIkNhbm5vdCBpbml0aWFsaXplIEFwcCBBc3NldCBEb3dubG9hZCB3aXRob3V0IHZlcnNpb24gYmVpbmcgZGVmaW5lZFwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0QXNzZXREZWZpbml0aW9uOiBPcGVuRmluLkFwcEFzc2V0SW5mbyA9IHtcblx0XHRhbGlhcyxcblx0XHRzcmMsXG5cdFx0dGFyZ2V0LFxuXHRcdHZlcnNpb24sXG5cdFx0bWFuZGF0b3J5OiBhcHBBc3NldERlZmluaXRpb24ubWFuZGF0b3J5LFxuXHRcdGFyZ3M6IGFwcEFzc2V0RGVmaW5pdGlvbi5hcmdzXG5cdH07XG5cblx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZG9lc0FwcEFzc2V0RXhpc3QodGFyZ2V0QXNzZXREZWZpbml0aW9uLmFsaWFzLCB0YXJnZXRBc3NldERlZmluaXRpb24udmVyc2lvbik7XG5cdGlmIChhcHBBc3NldEluZm8pIHtcblx0XHRvcHRpb25zPy5sb2dnZXI/LmluZm8oXG5cdFx0XHRgQXBwIGFzc2V0IHdpdGggYWxpYXMgJHt0YXJnZXRBc3NldERlZmluaXRpb24uYWxpYXN9IHZlcnNpb24gJHt0YXJnZXRBc3NldERlZmluaXRpb24udmVyc2lvbn0gYW5kIHNyYyAke3RhcmdldEFzc2V0RGVmaW5pdGlvbi5zcmN9IGFscmVhZHkgZXhpc3RzLiBObyBuZWVkIHRvIGRvd25sb2FkLmBcblx0XHQpO1xuXHRcdHJldHVybiBhcHBBc3NldEluZm87XG5cdH1cblxuXHRjb25zdCBoYXNEb3dubG9hZEFwcEFzc2V0cyA9IGF3YWl0IGdldENhbkRvd25sb2FkQXBwQXNzZXRzKGxvZ2dlcik7XG5cblx0aWYgKCFoYXNEb3dubG9hZEFwcEFzc2V0cykge1xuXHRcdGxvZ2dlcj8ud2FybihcIlRoZSBwbGF0Zm9ybSBkb2VzIG5vdCBoYXZlIHRoZSBjYXBhYmlsaXR5IG9yIHBlcm1pc3Npb24gdG8gZG93bmxvYWQgYXBwIGFzc2V0cy5cIik7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiBkb3dubG9hZEFwcEFzc2V0RGVmaW5pdGlvbih0YXJnZXRBc3NldERlZmluaXRpb24sIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGFwcCBhc3NldCBleGlzdHMgYW5kIG9wdGlvbmFsbHkgdmFsaWRhdGUgdmVyc2lvbiBhbmQgc291cmNlIFVSTC5cbiAqIEBwYXJhbSBhbGlhcyBUaGUgYWxpYXMgeW91IHdhbnQgdG8gY2hlY2sgZm9yXG4gKiBAcGFyYW0gdmVyc2lvbiBUaGUgdmVyc2lvbiB5b3Ugd2FudCB0byBjaGVjayBmb3IgKG9wdGlvbmFsKVxuICogQHBhcmFtIHNyYyBUaGUgc291cmNlIFVSTCB5b3Ugd2FudCB0byBjaGVjayBmb3IgKG9wdGlvbmFsKVxuICogQHJldHVybnMgVGhlIGFwcCBhc3NldCBpbmZvIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHVuZGVmaW5lZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9lc0FwcEFzc2V0RXhpc3QoXG5cdGFsaWFzOiBzdHJpbmcsXG5cdHZlcnNpb24/OiBzdHJpbmcsXG5cdHNyYz86IHN0cmluZ1xuKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHR0cnkge1xuXHRcdGNvbnN0IGFwcEFzc2V0SW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHsgYWxpYXMgfSk7XG5cdFx0aWYgKHZlcnNpb24gJiYgYXBwQXNzZXRJbmZvLnZlcnNpb24gIT09IHZlcnNpb24pIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmIChzcmMgJiYgYXBwQXNzZXRJbmZvLnNyYyAhPT0gc3JjKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRyZXR1cm4gYXBwQXNzZXRJbmZvO1xuXHR9IGNhdGNoIHtcblx0XHQvLyBhc3NldCBkb2VzIG5vdCBleGlzdCBvciB1cmwgZG9lcyBub3QgbWF0Y2gsIHJldHVybiB1bmRlZmluZWRcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIERvd25sb2FkIGFuIGFwcCBhc3NldCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGVmaW5pdGlvbiBhbmQgb3B0aW9ucy5cbiAqIEBwYXJhbSBhcHBBc3NldERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGFwcCBhc3NldCB0byBkb3dubG9hZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9iamVjdCBjb250YWluaW5nIGEgbG9nZ2VyIHRvIGxvZyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBwcm9jZXNzLCBhbmQgYSBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBvcnQgdGhlIHByb2dyZXNzIG9mIHRoZSBhc3NldCBkb3dubG9hZC5cbiAqIEBwYXJhbSBvcHRpb25zLmxvZ2dlciAtIEEgbG9nZ2VyIHRvIGxvZyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBkb3dubG9hZGluZyBvZiB0aGUgYXBwIGFzc2V0LlxuICogQHBhcmFtIG9wdGlvbnMuYXNzZXREb3dubG9hZFByb2dyZXNzIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBvcnQgdGhlIHByb2dyZXNzIG9mIHRoZSBhc3NldCBkb3dubG9hZC5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhcHAgYXNzZXQgaW5mbyBpZiB0aGUgYXBwIGFzc2V0IHdhcyBzdWNjZXNzZnVsbHkgZG93bmxvYWRlZCwgb3IgdW5kZWZpbmVkIGlmIGFuIGVycm9yIG9jY3VycmVkIGR1cmluZyB0aGUgZG93bmxvYWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXBwQXNzZXREZWZpbml0aW9uKFxuXHRhcHBBc3NldERlZmluaXRpb246IE9wZW5GaW4uQXBwQXNzZXRJbmZvLFxuXHRvcHRpb25zPzoge1xuXHRcdGxvZ2dlcj86IExvZ2dlcjtcblx0XHRhc3NldERvd25sb2FkUHJvZ3Jlc3M/OiAocHJvZ3Jlc3M6IG51bWJlciwgc3JjOiBzdHJpbmcsIGFsaWFzOiBzdHJpbmcpID0+IHZvaWQ7XG5cdH1cbik6IFByb21pc2U8T3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQ+IHtcblx0bGV0IGZldGNoZWRPckV4aXN0aW5nQXBwQXNzZXQ6IE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkO1xuXHR0cnkge1xuXHRcdGF3YWl0IGZpbi5TeXN0ZW0uZG93bmxvYWRBc3NldChhcHBBc3NldERlZmluaXRpb24sIChwcm9ncmVzcykgPT4ge1xuXHRcdFx0Y29uc3QgZG93bmxvYWRlZFBlcmNlbnQgPSBNYXRoLmZsb29yKChwcm9ncmVzcy5kb3dubG9hZGVkQnl0ZXMgLyBwcm9ncmVzcy50b3RhbEJ5dGVzKSAqIDEwMCk7XG5cdFx0XHRpZiAob3B0aW9ucz8uYXNzZXREb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRcdG9wdGlvbnMuYXNzZXREb3dubG9hZFByb2dyZXNzKGRvd25sb2FkZWRQZXJjZW50LCBhcHBBc3NldERlZmluaXRpb24uc3JjLCBhcHBBc3NldERlZmluaXRpb24uYWxpYXMpO1xuXHRcdFx0fVxuXHRcdFx0b3B0aW9ucz8ubG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRgRG93bmxvYWRlZCAke2Rvd25sb2FkZWRQZXJjZW50fSUgb2YgYXBwIGFzc2V0IHdpdGggYWxpYXMgJHthcHBBc3NldERlZmluaXRpb24uYWxpYXN9IGFuZCB2ZXJzaW9uICR7YXBwQXNzZXREZWZpbml0aW9uLnZlcnNpb259IGFuZCB1cmwgJHthcHBBc3NldERlZmluaXRpb24uc3JjfWBcblx0XHRcdCk7XG5cdFx0fSk7XG5cdFx0Ly8gZXh0cmEgY29uZmlybWF0aW9uIHVzaW5nIHRoZSBhcHByb2FjaCAgdXNlZCB0byB2YWxpZGF0ZSB0aGUgZXhpc3RlbmNlIG9mIGFuIGFzc2V0LlxuXHRcdGZldGNoZWRPckV4aXN0aW5nQXBwQXNzZXQgPSBhd2FpdCBkb2VzQXBwQXNzZXRFeGlzdChcblx0XHRcdGFwcEFzc2V0RGVmaW5pdGlvbi5hbGlhcyxcblx0XHRcdGFwcEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9uLFxuXHRcdFx0YXBwQXNzZXREZWZpbml0aW9uLnNyY1xuXHRcdCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdG9wdGlvbnM/LmxvZ2dlcj8uZXJyb3IoYFVuYWJsZSB0byBmZXRjaCBBcHAgQXNzZXQgJHtmb3JtYXRFcnJvcihlcnIpfWApO1xuXHR9XG5cdHJldHVybiBmZXRjaGVkT3JFeGlzdGluZ0FwcEFzc2V0O1xufVxuXG4vKipcbiAqIERvIHdlIGhhdmUgdGhlIHBlcm1pc3Npb25zIHRvIGRvd25sb2FkIGFwcCBhc3NldHMuXG4gKiBAcGFyYW0gbG9nZ2VyIE9wdGlvbmFsIGxvZ2dlciB0byBsb2cgZXJyb3JzLlxuICogQHJldHVybnMgVHJ1ZSBpZiB3ZSBoYXZlIHBlcm1pc3Npb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYW5Eb3dubG9hZEFwcEFzc2V0cyhsb2dnZXI/OiBMb2dnZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0bGV0IGNhbkRvd25sb2FkQXBwQXNzZXRzOiBib29sZWFuID0gZmFsc2U7XG5cdHRyeSB7XG5cdFx0Y29uc3QgY2FuRG93bmxvYWRBcHBBc3NldHNSZXNwb25zZSA9XG5cdFx0XHRhd2FpdCBmaW4uU3lzdGVtLnF1ZXJ5UGVybWlzc2lvbkZvckN1cnJlbnRDb250ZXh0KFwiU3lzdGVtLmRvd25sb2FkQXNzZXRcIik7XG5cdFx0Y2FuRG93bmxvYWRBcHBBc3NldHMgPSBjYW5Eb3dubG9hZEFwcEFzc2V0c1Jlc3BvbnNlPy5ncmFudGVkO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlcj8uZXJyb3IoYEVycm9yIHdoaWxlIHF1ZXJ5aW5nIGZvciBTeXN0ZW0uZG93bmxvYWRBc3NldCBwZXJtaXNzaW9uICR7Zm9ybWF0RXJyb3IoZXJyb3IpfWApO1xuXHRcdGNhbkRvd25sb2FkQXBwQXNzZXRzID0gZmFsc2U7XG5cdH1cblx0cmV0dXJuIGNhbkRvd25sb2FkQXBwQXNzZXRzO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gIWlzRW1wdHkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZ1ZhbHVlKGVycikpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cbiIsInZhciBlPXs4Mjc6ZT0+e3ZhciB0LG49XCJvYmplY3RcIj09dHlwZW9mIFJlZmxlY3Q/UmVmbGVjdDpudWxsLGk9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5hcHBseT9uLmFwcGx5OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoZSx0LG4pfTt0PW4mJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4ub3duS2V5cz9uLm93bktleXM6T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz9mdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSkuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSkpfTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSl9O3ZhciBhPU51bWJlci5pc05hTnx8ZnVuY3Rpb24oZSl7cmV0dXJuIGUhPWV9O2Z1bmN0aW9uIHIoKXtyLmluaXQuY2FsbCh0aGlzKX1lLmV4cG9ydHM9cixlLmV4cG9ydHMub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihuLGkpe2Z1bmN0aW9uIGEobil7ZS5yZW1vdmVMaXN0ZW5lcih0LHIpLGkobil9ZnVuY3Rpb24gcigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVtb3ZlTGlzdGVuZXImJmUucmVtb3ZlTGlzdGVuZXIoXCJlcnJvclwiLGEpLG4oW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX12KGUsdCxyLHtvbmNlOiEwfSksXCJlcnJvclwiIT09dCYmZnVuY3Rpb24oZSx0LG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUub24mJnYoZSxcImVycm9yXCIsdCxuKX0oZSxhLHtvbmNlOiEwfSl9KX0sci5FdmVudEVtaXR0ZXI9cixyLnByb3RvdHlwZS5fZXZlbnRzPXZvaWQgMCxyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQ9MCxyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXZvaWQgMDt2YXIgcz0xMDtmdW5jdGlvbiBvKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyt0eXBlb2YgZSl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gdm9pZCAwPT09ZS5fbWF4TGlzdGVuZXJzP3IuZGVmYXVsdE1heExpc3RlbmVyczplLl9tYXhMaXN0ZW5lcnN9ZnVuY3Rpb24gbChlLHQsbixpKXt2YXIgYSxyLHMsbDtpZihvKG4pLHZvaWQgMD09PShyPWUuX2V2ZW50cyk/KHI9ZS5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksZS5fZXZlbnRzQ291bnQ9MCk6KHZvaWQgMCE9PXIubmV3TGlzdGVuZXImJihlLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHQsbi5saXN0ZW5lcj9uLmxpc3RlbmVyOm4pLHI9ZS5fZXZlbnRzKSxzPXJbdF0pLHZvaWQgMD09PXMpcz1yW3RdPW4sKytlLl9ldmVudHNDb3VudDtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHM/cz1yW3RdPWk/W24sc106W3Msbl06aT9zLnVuc2hpZnQobik6cy5wdXNoKG4pLChhPWMoZSkpPjAmJnMubGVuZ3RoPmEmJiFzLndhcm5lZCl7cy53YXJuZWQ9ITA7dmFyIGg9bmV3IEVycm9yKFwiUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiBcIitzLmxlbmd0aCtcIiBcIitTdHJpbmcodCkrXCIgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdFwiKTtoLm5hbWU9XCJNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmdcIixoLmVtaXR0ZXI9ZSxoLnR5cGU9dCxoLmNvdW50PXMubGVuZ3RoLGw9aCxjb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybihsKX1yZXR1cm4gZX1mdW5jdGlvbiBoKCl7aWYoIXRoaXMuZmlyZWQpcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSx0aGlzLndyYXBGbiksdGhpcy5maXJlZD0hMCwwPT09YXJndW1lbnRzLmxlbmd0aD90aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpOnRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsYXJndW1lbnRzKX1mdW5jdGlvbiBwKGUsdCxuKXt2YXIgaT17ZmlyZWQ6ITEsd3JhcEZuOnZvaWQgMCx0YXJnZXQ6ZSx0eXBlOnQsbGlzdGVuZXI6bn0sYT1oLmJpbmQoaSk7cmV0dXJuIGEubGlzdGVuZXI9bixpLndyYXBGbj1hLGF9ZnVuY3Rpb24gZChlLHQsbil7dmFyIGk9ZS5fZXZlbnRzO2lmKHZvaWQgMD09PWkpcmV0dXJuW107dmFyIGE9aVt0XTtyZXR1cm4gdm9pZCAwPT09YT9bXTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBhP24/W2EubGlzdGVuZXJ8fGFdOlthXTpuP2Z1bmN0aW9uKGUpe2Zvcih2YXIgdD1uZXcgQXJyYXkoZS5sZW5ndGgpLG49MDtuPHQubGVuZ3RoOysrbil0W25dPWVbbl0ubGlzdGVuZXJ8fGVbbl07cmV0dXJuIHR9KGEpOmYoYSxhLmxlbmd0aCl9ZnVuY3Rpb24gdShlKXt2YXIgdD10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09dCl7dmFyIG49dFtlXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXJldHVybiAxO2lmKHZvaWQgMCE9PW4pcmV0dXJuIG4ubGVuZ3RofXJldHVybiAwfWZ1bmN0aW9uIGYoZSx0KXtmb3IodmFyIG49bmV3IEFycmF5KHQpLGk9MDtpPHQ7KytpKW5baV09ZVtpXTtyZXR1cm4gbn1mdW5jdGlvbiB2KGUsdCxuLGkpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUub24paS5vbmNlP2Uub25jZSh0LG4pOmUub24odCxuKTtlbHNle2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUuYWRkRXZlbnRMaXN0ZW5lcil0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKTtlLmFkZEV2ZW50TGlzdGVuZXIodCxmdW5jdGlvbiBhKHIpe2kub25jZSYmZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsYSksbihyKX0pfX1PYmplY3QuZGVmaW5lUHJvcGVydHkocixcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gc30sc2V0OmZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fGEoZSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK2UrXCIuXCIpO3M9ZX19KSxyLmluaXQ9ZnVuY3Rpb24oKXt2b2lkIDAhPT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50cyE9PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCksdGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dm9pZCAwfSxyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8YShlKSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrZStcIi5cIik7cmV0dXJuIHRoaXMuX21heExpc3RlbmVycz1lLHRoaXN9LHIucHJvdG90eXBlLmdldE1heExpc3RlbmVycz1mdW5jdGlvbigpe3JldHVybiBjKHRoaXMpfSxyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl0LnB1c2goYXJndW1lbnRzW25dKTt2YXIgYT1cImVycm9yXCI9PT1lLHI9dGhpcy5fZXZlbnRzO2lmKHZvaWQgMCE9PXIpYT1hJiZ2b2lkIDA9PT1yLmVycm9yO2Vsc2UgaWYoIWEpcmV0dXJuITE7aWYoYSl7dmFyIHM7aWYodC5sZW5ndGg+MCYmKHM9dFswXSkscyBpbnN0YW5jZW9mIEVycm9yKXRocm93IHM7dmFyIG89bmV3IEVycm9yKFwiVW5oYW5kbGVkIGVycm9yLlwiKyhzP1wiIChcIitzLm1lc3NhZ2UrXCIpXCI6XCJcIikpO3Rocm93IG8uY29udGV4dD1zLG99dmFyIGM9cltlXTtpZih2b2lkIDA9PT1jKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGMpaShjLHRoaXMsdCk7ZWxzZXt2YXIgbD1jLmxlbmd0aCxoPWYoYyxsKTtmb3Iobj0wO248bDsrK24paShoW25dLHRoaXMsdCl9cmV0dXJuITB9LHIucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGwodGhpcyxlLHQsITEpfSxyLnByb3RvdHlwZS5vbj1yLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbCh0aGlzLGUsdCwhMCl9LHIucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0KSx0aGlzLm9uKGUscCh0aGlzLGUsdCkpLHRoaXN9LHIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0KSx0aGlzLnByZXBlbmRMaXN0ZW5lcihlLHAodGhpcyxlLHQpKSx0aGlzfSxyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3ZhciBuLGksYSxyLHM7aWYobyh0KSx2b2lkIDA9PT0oaT10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PShuPWlbZV0pKXJldHVybiB0aGlzO2lmKG49PT10fHxuLmxpc3RlbmVyPT09dCkwPT09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTooZGVsZXRlIGlbZV0saS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLG4ubGlzdGVuZXJ8fHQpKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pe2ZvcihhPS0xLHI9bi5sZW5ndGgtMTtyPj0wO3ItLSlpZihuW3JdPT09dHx8bltyXS5saXN0ZW5lcj09PXQpe3M9bltyXS5saXN0ZW5lcixhPXI7YnJlYWt9aWYoYTwwKXJldHVybiB0aGlzOzA9PT1hP24uc2hpZnQoKTpmdW5jdGlvbihlLHQpe2Zvcig7dCsxPGUubGVuZ3RoO3QrKyllW3RdPWVbdCsxXTtlLnBvcCgpfShuLGEpLDE9PT1uLmxlbmd0aCYmKGlbZV09blswXSksdm9pZCAwIT09aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLHN8fHQpfXJldHVybiB0aGlzfSxyLnByb3RvdHlwZS5vZmY9ci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIsci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LG4saTtpZih2b2lkIDA9PT0obj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PW4ucmVtb3ZlTGlzdGVuZXIpcmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKTp2b2lkIDAhPT1uW2VdJiYoMD09PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCk6ZGVsZXRlIG5bZV0pLHRoaXM7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpe3ZhciBhLHI9T2JqZWN0LmtleXMobik7Zm9yKGk9MDtpPHIubGVuZ3RoOysraSlcInJlbW92ZUxpc3RlbmVyXCIhPT0oYT1yW2ldKSYmdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoYSk7cmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIiksdGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCx0aGlzfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mKHQ9bltlXSkpdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHQpO2Vsc2UgaWYodm9pZCAwIT09dClmb3IoaT10Lmxlbmd0aC0xO2k+PTA7aS0tKXRoaXMucmVtb3ZlTGlzdGVuZXIoZSx0W2ldKTtyZXR1cm4gdGhpc30sci5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiBkKHRoaXMsZSwhMCl9LHIucHJvdG90eXBlLnJhd0xpc3RlbmVycz1mdW5jdGlvbihlKXtyZXR1cm4gZCh0aGlzLGUsITEpfSxyLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmxpc3RlbmVyQ291bnQ/ZS5saXN0ZW5lckNvdW50KHQpOnUuY2FsbChlLHQpfSxyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PXUsci5wcm90b3R5cGUuZXZlbnROYW1lcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9ldmVudHNDb3VudD4wP3QodGhpcy5fZXZlbnRzKTpbXX19fSx0PXt9O2Z1bmN0aW9uIG4oaSl7dmFyIGE9dFtpXTtpZih2b2lkIDAhPT1hKXJldHVybiBhLmV4cG9ydHM7dmFyIHI9dFtpXT17ZXhwb3J0czp7fX07cmV0dXJuIGVbaV0ocixyLmV4cG9ydHMsbiksci5leHBvcnRzfW4uZD0oZSx0KT0+e2Zvcih2YXIgaSBpbiB0KW4ubyh0LGkpJiYhbi5vKGUsaSkmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLGkse2VudW1lcmFibGU6ITAsZ2V0OnRbaV19KX0sbi5vPShlLHQpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KTt2YXIgaT1uKDgyNyk7Y29uc3QgYT1cIm9wZW5maW4tc25hcFwiLHI9XCIxLjUuMFwiLHM9KGUsdCk9PmAke2V9ICR7dCBpbnN0YW5jZW9mIEVycm9yP3QubWVzc2FnZTpcInN0cmluZ1wiPT10eXBlb2YgdD90OkpTT04uc3RyaW5naWZ5KHQpfWAsbz1hc3luYygpPT57dHJ5e3JldHVybihhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6YX0pKS52ZXJzaW9uPT09cn1jYXRjaChlKXtyZXR1cm4hMX19LGM9XCJpbnRlcm5hbC1nZW5lcmF0ZWQtd2luZG93LVwiO2NsYXNzIGx7Y29uc3RydWN0b3IoZSx0PTFlNCxuPTVlMyl7aWYodGhpcy5zZXJ2ZXJfaWQ9ZSx0aGlzLmVtaXR0ZXI9bmV3IGkuRXZlbnRFbWl0dGVyLHRoaXMuX19leHRlbnNpb25zPVtdLHRoaXMuc25hcFNlcnZlclN0YXR1cz1cImRpc2Nvbm5lY3RlZFwiLHRoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmc9ITEsIWZpbil0aHJvdyBuZXcgRXJyb3IoXCJPcGVuRmluIGlzIG5vdCBhdmFpbGFibGVcIik7aWYodDwxZTMpdGhyb3cgbmV3IEVycm9yKGBoZWFsdGhDaGVja0ludGVydmFsTXMgbXVzdCBiZSBhdCBsZWFzdCAxMDAwbXMgKHByb3ZpZGVkOiAke3R9bXMpLiBWYWx1ZXMgYmVsb3cgdGhpcyBhcmUgZXhjZXNzaXZlIGFuZCBjYXVzZSB1bm5lY2Vzc2FyeSBvdmVyaGVhZC5gKTtpZihuPDUwMCl0aHJvdyBuZXcgRXJyb3IoYGhlYWx0aENoZWNrVGltZW91dE1zIG11c3QgYmUgYXQgbGVhc3QgNTAwbXMgKHByb3ZpZGVkOiAke259bXMpLiBUaW1lb3V0IG11c3QgYWxsb3cgc3VmZmljaWVudCB0aW1lIGZvciBuZXR3b3JrIHJvdW5kLXRyaXAgYW5kIHNlcnZlciByZXNwb25zZS5gKTtpZihuPj10KXRocm93IG5ldyBFcnJvcihgaGVhbHRoQ2hlY2tUaW1lb3V0TXMgKCR7bn1tcykgbXVzdCBiZSBsZXNzIHRoYW4gaGVhbHRoQ2hlY2tJbnRlcnZhbE1zICgke3R9bXMpLiBUaGlzIGVuc3VyZXMgdGhlIHRpbWVvdXQgY29tcGxldGVzIGJlZm9yZSB0aGUgbmV4dCBoZWFsdGggY2hlY2sgYmVnaW5zLCBhbGxvd2luZyB0aW1lIGZvciByZWNvdmVyeS5gKTt0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWxNcz10LHRoaXMuaGVhbHRoQ2hlY2tUaW1lb3V0TXM9bn1hc3luYyBzdGFydChlKXt0cnl7Y29uc3QgZT1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7XCJ4NjRcIiE9PWU/LmFyY2hpdGVjdHVyZSYmY29uc29sZS53YXJuKGBUaGUgYXJjaGl0ZWN0dXJlIG9mIHRoZSBjb25uZWN0ZWQgT3BlbkZpbiBydW50aW1lIGlzICcke2UuYXJjaGl0ZWN0dXJlfScgLSBXaW5kb3cgc25hcHBpbmcgaXMgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIHdpdGggNjQtYml0IGFwcGxpY2F0aW9ucy4gU25hcHBpbmcgd2lsbCBiZSBkaXNhYmxlZC5gKX1jYXRjaChlKXtjb25zb2xlLndhcm4oYENvdWxkIG5vdCBnZXQgcnVudGltZSBpbmZvOiAke2V9YCl9Y29uc3QgdD1hd2FpdCBmaW4uU3lzdGVtLnF1ZXJ5UGVybWlzc2lvbkZvckN1cnJlbnRDb250ZXh0KFwiU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzc1wiKTtpZighdC5ncmFudGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyXCIpO2lmKHQucmF3VmFsdWUpe2lmKGU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uZXhlY3V0YWJsZXM/LmVuYWJsZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzLmFzc2V0cycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyIGZyb20gYW4gZXhlY3V0YWJsZSBwYXRoXCIpO2lmKCFlPy5leGVjdXRhYmxlUGF0aCYmIXQucmF3VmFsdWU/LmFzc2V0cz8uZW5hYmxlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MuYXNzZXRzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgZnJvbSBhIFVSTFwiKX1lPy5leGVjdXRhYmxlUGF0aHx8YXdhaXQoYXN5bmMgZT0+e2NvbnN0IHQ9YXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnRTeW5jKCkuZ2V0TWFuaWZlc3QoKSxuPXQuYXBwQXNzZXRzPy5maW5kKGU9PmUuYWxpYXM9PT1hKTtpZihuKXJldHVybiB2b2lkIGNvbnNvbGUud2FybihcIkRldGVjdGVkIFNuYXAgcGFja2FnZSBpbiBhcHAgbWFuaWZlc3QgYXBwQXNzZXRzXCIsbik7aWYoYXdhaXQgbygpKXJldHVybiB2b2lkIGNvbnNvbGUuaW5mbyhcIlVzaW5nIGV4aXN0aW5nIFNuYXAgcGFja2FnZVwiKTtjb25zdCBpPWU/P2BodHRwczovL2Nkbi5vcGVuZmluLmNvL3JlbGVhc2Uvc25hcC8ke3J9L3NuYXAuemlwYDtjb25zb2xlLmluZm8oYERvd25sb2FkaW5nIFNuYXAgYXNzZXQgZnJvbTogJyR7aX0nYCk7Y29uc3QgYz17YWxpYXM6YSxzcmM6YCR7aX1gLHRhcmdldDpcIk9wZW5GaW5TbmFwLmV4ZVwiLHZlcnNpb246cn07Y29uc29sZS5pbmZvKFwiRG93bmxvYWRpbmcgU25hcCBwYWNrYWdlXCIsYyk7dHJ5e2F3YWl0IGZpbi5TeXN0ZW0uZG93bmxvYWRBc3NldChjLCgpPT57fSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKHMoXCJVbmFibGUgdG8gZG93bmxvYWQgU25hcCBwYWNrYWdlLlwiLGUpKX19KShlPy5jdXN0b21TbmFwQXNzZXRTb3VyY2UpO2NvbnN0IG49YXdhaXQgdGhpcy5idWlsZF9jb21tYW5kX2xpbmUoZSk7bGV0IGk9e2FsaWFzOmEsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn07ZT8uZXhlY3V0YWJsZVBhdGgmJihpPXtwYXRoOmUuZXhlY3V0YWJsZVBhdGgsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn0pO3RyeXt0aGlzLnNuYXBfaWRlbnRpdHk9YXdhaXQgZmluLlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MoaSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKHMoXCJGYWlsZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlci5cIixlKSl9cmV0dXJuIHRoaXMuY29ubmVjdCgpfWFzeW5jIGNvbm5lY3QoKXthd2FpdCB0aGlzLmludGVybmFsQ29ubmVjdCghMCl9X19hZGRFeHRlbnNpb24oZSl7dGhpcy5fX2V4dGVuc2lvbnMucHVzaChlKX1hc3luYyBzdG9wKCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJzaHV0ZG93blwifSkpfWFzeW5jIHNob3dEZWJ1Z1dpbmRvdyhlKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNob3dEZWJ1Z1dpbmRvd1wiLHBheWxvYWQ6e3Nob3c6ZX19KSl9YXN5bmMgZ2V0TGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2NvbnN0IGU9YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNlcmlhbGlzZUxheW91dFwifSkpO3JldHVybiBlPy5wYXlsb2FkLmxheW91dH1hc3luYyBzZXRMYXlvdXQoZSx0PSEwKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImRlc2VyaWFsaXNlTGF5b3V0XCIscGF5bG9hZDp7bGF5b3V0OmUscmVzZXQ6dH19KSl9YXN5bmMgZW50ZXJEZWZlcnJlZExheW91dCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZW50ZXJCYXRjaE1vZGVcIn0pKX1hc3luYyBleGl0RGVmZXJyZWRMYXlvdXQoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImV4aXRCYXRjaE1vZGVcIn0pKX1hc3luYyBwcmVwYXJlVG9BcHBseVNuYXBzaG90KGUsdCl7aWYoIWV8fGUub3B0aW9ucz8uY2xvc2VFeGlzdGluZ1dpbmRvd3N8fGUub3B0aW9ucz8uY2xvc2VTbmFwc2hvdFdpbmRvd3MpcmV0dXJuIHRoaXMubmVlZFRvUmVzZXRMYXlvdXQ9ITAsdm9pZCBhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwicmVzZXRBbGxcIn0pKTt0aGlzLm5lZWRUb1Jlc2V0TGF5b3V0PSExO2NvbnN0IG49ZS5zbmFwc2hvdCxpPUpTT04uc3RyaW5naWZ5KG4sbnVsbCwyKSxhPW4uc25hcDtpZighYSlyZXR1cm47YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInByZXBhcmVUb0FwcGx5TGF5b3V0XCJ9KSk7Y29uc3Qgcj10Pz92LHM9KGF3YWl0IHRoaXMuZ2V0TGF5b3V0KCkpPy5jbGllbnRzLm1hcChlPT5lLmlkKT8/W10sbz11KG4ud2luZG93cyksYz1BcnJheS5mcm9tKG8ua2V5cygpKS5maWx0ZXIoZT0+cy5pbmNsdWRlcyhlKSk7YS5jbGllbnRzLmZpbHRlcihlPT5jLmluY2x1ZGVzKGUuaWQpKS5mb3JFYWNoKGU9Pntjb25zdCB0PWUuaWQsbj1yKHQpO2UuaWQ9bixmKGEuY29ubmVjdGlvbnMsdCxuKTtjb25zdCBpPW8uZ2V0KHQpO2kuY3VzdG9tRGF0YS5zbmFwQ2xpZW50SWQ9bixpLm5hbWU9bn0pO2NvbnN0IGw9SlNPTi5zdHJpbmdpZnkobixudWxsLDIpO2NvbnNvbGUuZGVidWcoYFNuYXAgU0RLIG1vZGlmaWVkIHNuYXBzaG90IGRhdGEgYmVmb3JlIGFwcGx5aW5nIGl0Llxcbk9yaWdpbmFsIHNuYXBzaG90OlxcbiR7aX1cXG5Nb2RpZmllZCBzbmFwc2hvdDpcXG4ke2x9YCl9YXN5bmMgZGVjb3JhdGVTbmFwc2hvdChlKXtyZXR1cm57Li4uZSxzbmFwOmF3YWl0IHRoaXMuZ2V0TGF5b3V0KCl9fWFzeW5jIGFwcGx5U25hcHNob3QoZSl7ZS5zbmFwJiZhd2FpdCB0aGlzLnNldExheW91dChlLnNuYXAsdGhpcy5uZWVkVG9SZXNldExheW91dCl9YXN5bmMgbGF1bmNoKGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJOb3QgY29ubmVjdGVkIHRvIGFuIFNuYXAgc2VydmVyXCIpO2UuYXBwQXNzZXRJbmZvJiYoZS5wYXRoPWF3YWl0IGgoe3RhcmdldDplLnBhdGgsLi4uZS5hcHBBc3NldEluZm99KSksY29uc29sZS5sb2coXCJvcHRpb25zOiBcIixlKTtjb25zdCB0PXthY3Rpb246XCJzdGFydFByb2Nlc3NcIixwYXlsb2FkOnsuLi5lLGFyZ3M6ZS5hcmdzfHxbXX19O2lmKGUuc3RyYXRlZ3kpe2NvbnN0e3R5cGU6biwuLi5pfT1lLnN0cmF0ZWd5O3QucGF5bG9hZC5zdHJhdGVneT17dHlwZTpuLHBhcmFtZXRlcnM6ey4uLml9fX1jb25zdCBuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHQpKTtpZihuPy5wYXlsb2FkPy5zdWNjZXNzKXJldHVybntwcm9jZXNzX2lkOm4ucGF5bG9hZC5wcm9jZXNzX2lkfTt0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsYXVuY2ggcHJvY2VzczogJHtuPy5wYXlsb2FkPy5lcnJvcn1gKX1hc3luYyByZWdpc3RlcldpbmRvdyhlLHQsbil7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImhvb2tBbmRSZWdpc3RlcldpbmRvd1wiLHBheWxvYWQ6e2NsaWVudElkOmUsd2luZG93SGFuZGxlOnQscmVzaXppbmdCZWhhdmlvcjpufX0pKX1hc3luYyBlbmFibGVBdXRvV2luZG93UmVnaXN0cmF0aW9uKCl7Y29uc3QgZT1lPT50aGlzLmhhbmRsZU5ld1dpbmRvdyhlKTtyZXR1cm4gYXdhaXQgZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCkuYWRkTGlzdGVuZXIoXCJ3aW5kb3ctY3JlYXRlZFwiLGUpLGFzeW5jKCk9Pnthd2FpdCBmaW4uU3lzdGVtLnJlbW92ZUxpc3RlbmVyKFwid2luZG93LWNyZWF0ZWRcIixlKX19YXN5bmMgYXR0YWNoV2luZG93cyhlLHQsbixpKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiYXR0YWNoXCIscGF5bG9hZDp7dGFyZ2V0Q2xpZW50SWQ6ZSx0b0F0dGFjaENsaWVudElkOnQsdGFyZ2V0U2lkZTpuLG9mZnNldDppfX0pKX1hc3luYyBkZXRhY2hGcm9tR3JvdXAoZSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImRldGFjaEZyb21Hcm91cFwiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpfWFzeW5jIGdldEF0dGFjaGVkKGUpe3JldHVybihhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0QXR0YWNoZWRJbnN0YW5jZXNcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKSkucGF5bG9hZC5hdHRhY2hlZH1hc3luYyBoYXNBdHRhY2htZW50cyhlKXtyZXR1cm4oYXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImhhc0F0dGFjaG1lbnRzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuaGFzQXR0YWNobWVudHN9YWRkRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuZW1pdHRlci5vbihlLHQpfXJlbW92ZUV2ZW50TGlzdGVuZXIoZSx0KXt0aGlzLmVtaXR0ZXIub2ZmKGUsdCl9b25jZShlLHQpe3RoaXMuZW1pdHRlci5vbmNlKGUsdCl9YXN5bmMgZ2V0Q2xpZW50SWRGb3JXaW5kb3coZSl7Y29uc3QgdD1cIm51bWJlclwiPT10eXBlb2YgZT97bmF0aXZlV2luZG93SWQ6ZX06TnVtYmVyLmlzTmFOKHRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkpP3tuYXRpdmVXaW5kb3dJZDpOdW1iZXIuTmFOfTp7bmF0aXZlV2luZG93SWQ6dGhpcy5oZXhTdHJpbmdUb051bWJlcihlKX0sbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0Q2xpZW50SWRGb3JXaW5kb3dcIixwYXlsb2FkOnR9KSk7aWYoIW4ucGF5bG9hZC5jbGllbnRJZCl0aHJvdyBuZXcgRXJyb3IoXCJObyBjbGllbnQgSUQgZm91bmQgZm9yIHdpbmRvd1wiKTtyZXR1cm4gbi5wYXlsb2FkLmNsaWVudElkfWFzeW5jIGdldEdyb3VwSWRGb3JXaW5kb3coZSl7Y29uc3QgdD1cIm51bWJlclwiPT10eXBlb2YgZT97bmF0aXZlV2luZG93SWQ6ZX06TnVtYmVyLmlzTmFOKHRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkpP3tjbGllbnRJZDplfTp7bmF0aXZlV2luZG93SWQ6dGhpcy5oZXhTdHJpbmdUb051bWJlcihlKX0sbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0R3JvdXBJZEZvcldpbmRvd1wiLHBheWxvYWQ6dH0pKTtpZighbi5wYXlsb2FkLmdyb3VwSWQpdGhyb3cgbmV3IEVycm9yKFwiTm8gZ3JvdXAgZm91bmQgZm9yIHdpbmRvd1wiKTtyZXR1cm4gbi5wYXlsb2FkLmdyb3VwSWR9YXN5bmMgZ2V0V2luZG93UmVzaXphYmxlKGUpe2NvbnN0IHQ9XCJudW1iZXJcIj09dHlwZW9mIGU/e25hdGl2ZVdpbmRvd0lkOmV9Ok51bWJlci5pc05hTih0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpKT97Y2xpZW50SWQ6ZX06e25hdGl2ZVdpbmRvd0lkOnRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSl9LG49YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldFJlc2l6YWJsZVwiLHBheWxvYWQ6dH0pKTtpZihudWxsPT09bi5wYXlsb2FkLnJlc2l6YWJsZSl0aHJvdyBuZXcgRXJyb3IoXCJObyB3aW5kb3cgZm91bmQgZm9yIGdpdmVuIElEXCIpO3JldHVybiBuLnBheWxvYWQucmVzaXphYmxlfWFzeW5jIHNldFdpbmRvd1Jlc2l6YWJsZShlLHQpe2NvbnN0IG49XCJudW1iZXJcIj09dHlwZW9mIGU/e25hdGl2ZVdpbmRvd0lkOmUscmVzaXphYmxlOnR9Ok51bWJlci5pc05hTih0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpKT97Y2xpZW50SWQ6ZSxyZXNpemFibGU6dH06e25hdGl2ZVdpbmRvd0lkOnRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkscmVzaXphYmxlOnR9O2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJzZXRSZXNpemFibGVcIixwYXlsb2FkOm59KSl9YXN5bmMgZ2V0V2luZG93c0luR3JvdXAoZSl7Y29uc3QgdD1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0V2luZG93c0luR3JvdXBcIixwYXlsb2FkOntncm91cElkOmV9fSkpO3JldHVybiB0LnBheWxvYWQud2luZG93cz90LnBheWxvYWQud2luZG93cy5tYXAoZT0+KHtuYXRpdmVJZDplWzBdLGNsaWVudElkOmVbMV19KSk6W119YXN5bmMgZ2V0QWxsR3JvdXBJZHMoKXtyZXR1cm4oYXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEFsbEdyb3VwSWRzXCJ9KSkpLnBheWxvYWQuZ3JvdXBJZHN9YXN5bmMgbWluaW1pemVHcm91cChlKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwibWluaW1pemVHcm91cFwiLHBheWxvYWQ6e2dyb3VwSWQ6ZX19KSl9YXN5bmMgcmVzdG9yZUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXN0b3JlR3JvdXBcIixwYXlsb2FkOntncm91cElkOmV9fSkpfWdldFNuYXBTZXJ2ZXJTdGF0dXMoKXtyZXR1cm4gdGhpcy5zbmFwU2VydmVyU3RhdHVzfWhhbmRsZVNuYXBTZXJ2ZXJEaXNjb25uZWN0aW9uKCl7dGhpcy5zdG9wSGVhbHRoQ2hlY2soKSx0aGlzLmNsaWVudD12b2lkIDAsdGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiZGlzY29ubmVjdGVkXCIpLGNvbnNvbGUud2FybihcIlNuYXBTREs6IERpc2Nvbm5lY3RlZCBmcm9tIFNuYXAgc2VydmVyLCBhdHRlbXB0IHJlY29ubmVjdC5cIiksdGhpcy5pbnRlcm5hbENvbm5lY3QoITEpfWFzeW5jIGludGVybmFsQ29ubmVjdChlKXtpZih0aGlzLnN0b3BIZWFsdGhDaGVjaygpLHRoaXMuY2xpZW50PWF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChgc25hcC1zZXJ2ZXItY29yZS0ke3RoaXMuc2VydmVyX2lkfWApLHRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF9oYW5kc2hha2VcIixhc3luYyh0LG4pPT57dHJ5e2UmJmF3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246dC52ZXJzaW9uLGNvbXBvbmVudE5hbWU6XCJzbmFwLXNlcnZlclwifX0pfWNhdGNoe2NvbnNvbGUud2FybihcIlNuYXBTREs6IEZhaWxlZCB0byByZWdpc3RlciB1c2FnZSBmb3IgU25hcCBTZXJ2ZXJcIil9fSksdGhpcy5jbGllbnQub25EaXNjb25uZWN0aW9uKCgpPT50aGlzLmhhbmRsZVNuYXBTZXJ2ZXJEaXNjb25uZWN0aW9uKCkpLGUpdHJ5e2F3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImFkYXB0ZXItZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246XCIxLjUuMFwiLGNvbXBvbmVudE5hbWU6XCJzbmFwLWNsaWVudFwifX0pfWNhdGNoe2NvbnNvbGUud2FybihcIlNuYXBTREs6IEZhaWxlZCB0byByZWdpc3RlciB1c2FnZSBmb3IgU25hcCBTZXJ2ZXJcIil9dGhpcy5jbGllbnQucmVnaXN0ZXIoXCJzbmFwX3VwZGF0ZXNcIiwoZSx0KT0+dGhpcy5oYW5kbGVTbmFwRXZlbnRzKGUsdCkpLHRoaXMuc2V0U25hcFNlcnZlclN0YXR1cyhcImNvbm5lY3RlZFwiKSx0aGlzLnN0YXJ0SGVhbHRoQ2hlY2soKSx0aGlzLl9fZXh0ZW5zaW9ucy5mb3JFYWNoKGU9PmUub25Db25uZWN0ZWQodGhpcy5jbGllbnQpKX1zZXRTbmFwU2VydmVyU3RhdHVzKGUpe3RoaXMuc25hcFNlcnZlclN0YXR1cyE9PWUmJih0aGlzLnNuYXBTZXJ2ZXJTdGF0dXM9ZSxcImRpc2Nvbm5lY3RlZFwiPT09ZT90aGlzLmVtaXRfZXZlbnQoXCJzbmFwLXNlcnZlci1kaXNjb25uZWN0ZWRcIix7fSk6XCJuby1yZXNwb25zZVwiPT09ZSYmdGhpcy5lbWl0X2V2ZW50KFwic25hcC1zZXJ2ZXItbm8tcmVzcG9uc2VcIix7dGltZXN0YW1wOkRhdGUubm93KCl9KSl9c3RhcnRIZWFsdGhDaGVjaygpe2lmKFwiZGlzY29ubmVjdGVkXCIhPT10aGlzLnNuYXBTZXJ2ZXJTdGF0dXMmJiF0aGlzLmhlYWx0aENoZWNrSW5pdGlhbGl6aW5nJiYhdGhpcy5oZWFsdGhDaGVja0ludGVydmFsKXt0aGlzLmhlYWx0aENoZWNrSW5pdGlhbGl6aW5nPSEwO3RyeXt0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWw9c2V0SW50ZXJ2YWwoYXN5bmMoKT0+e2lmKFwiZGlzY29ubmVjdGVkXCIhPT10aGlzLnNuYXBTZXJ2ZXJTdGF0dXMmJnRoaXMuY2xpZW50KXRyeXtjb25zdCBlPW5ldyBQcm9taXNlKChlLHQpPT57c2V0VGltZW91dCgoKT0+dChuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciByZXNwb25zZSB0aW1lb3V0XCIpKSx0aGlzLmhlYWx0aENoZWNrVGltZW91dE1zKX0pLHQ9TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKk51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSxuPWF3YWl0IFByb21pc2UucmFjZShbdGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImhlYWx0aENoZWNrXCIscGF5bG9hZDp7bm9uY2U6dH19KXx8UHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2xpZW50IGlzIG5vdCBhdmFpbGFibGVcIikpLGVdKTtpZighdGhpcy5jbGllbnQpcmV0dXJuIHZvaWQgdGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiZGlzY29ubmVjdGVkXCIpO2lmKCFuPy5wYXlsb2FkfHxuLnBheWxvYWQubm9uY2UhPT10KXRocm93IG5ldyBFcnJvcihcIkhlYWx0aCBjaGVjayB2YWxpZGF0aW9uIGZhaWxlZCAtIG5vbmNlIG1pc21hdGNoXCIpO1wibm8tcmVzcG9uc2VcIj09PXRoaXMuc25hcFNlcnZlclN0YXR1cyYmdGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiY29ubmVjdGVkXCIpfWNhdGNoKGUpe3RoaXMuY2xpZW50P3RoaXMuc2V0U25hcFNlcnZlclN0YXR1cyhcIm5vLXJlc3BvbnNlXCIpOnRoaXMuc2V0U25hcFNlcnZlclN0YXR1cyhcImRpc2Nvbm5lY3RlZFwiKX19LHRoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbE1zKX1maW5hbGx5e3RoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmc9ITF9fX1zdG9wSGVhbHRoQ2hlY2soKXt0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWwmJihjbGVhckludGVydmFsKHRoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbCksdGhpcy5oZWFsdGhDaGVja0ludGVydmFsPXZvaWQgMCl9YXN5bmMgaGFuZGxlTmV3V2luZG93KGUpe2NvbnN0IHQ9YXdhaXQgZmluLldpbmRvdy53cmFwKHt1dWlkOmUudXVpZCxuYW1lOmUubmFtZX0pLG49YXdhaXQgdC5nZXROYXRpdmVJZCgpO2xldCBpPXQuaWRlbnRpdHkubmFtZTtjb25zdCBhPWF3YWl0IHQuZ2V0T3B0aW9ucygpO2lmKHZvaWQgMCE9PWEuaW5jbHVkZUluU25hcHNob3RzJiYhMT09PWEuaW5jbHVkZUluU25hcHNob3RzKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKGBTbmFwU0RLOiBOb3QgcmVnaXN0ZXJpbmcgJHtlLnV1aWR9OiR7ZS5uYW1lfSwgV2luZG93IGlzIGV4cGxpY2l0bHkgZXhjbHVkZWQgLWluY2x1ZGVJblNuYXBzaG90cyA9PSBmYWxzZWApO2NvbnN0IHI9YS5jdXN0b21EYXRhfHx7fTtyLnNuYXBDbGllbnRJZD9pPXIuc25hcENsaWVudElkOmF3YWl0IHQudXBkYXRlT3B0aW9ucyh7Y3VzdG9tRGF0YTp7Li4ucixzbmFwQ2xpZW50SWQ6aX19KSxjb25zb2xlLmxvZyhgU25hcFNESzogQXV0by1yZWdpc3RlcmluZyB3aW5kb3c6IHNuYXBDbGllbnRJZDoke2l9LCBoYW5kbGUgJHtufSwgdXVpZDoke2UudXVpZH0sIG5hbWU6JHtlLm5hbWV9YCksYXdhaXQgdGhpcy5yZWdpc3RlcldpbmRvdyhpLG4sci5zbmFwUmVzaXppbmdCZWhhdmlvcil9ZW1pdF9ldmVudChlLC4uLnQpe3RoaXMuZW1pdHRlci5lbWl0KGUsLi4udCl9aGFuZGxlU25hcEV2ZW50cyhlLHQpe3N3aXRjaCh0aGlzLmVtaXRfZXZlbnQoXCJhbGwtZXZlbnRzXCIse3R5cGU6ZS5hY3Rpb24scGF5bG9hZDplLnBheWxvYWR9KSxlLmFjdGlvbil7Y2FzZVwiY2xpZW50UmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1yZWdpc3RlcmVkXCIse2NsaWVudElkOmUucGF5bG9hZC5jbGllbnRJZCx3aW5kb3dIYW5kbGU6YCMke2UucGF5bG9hZC53aW5kb3dIYW5kbGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCxvd25pbmdQcm9jZXNzSWQ6ZS5wYXlsb2FkLm93bmluZ1Byb2Nlc3NJZH0pO2JyZWFrO2Nhc2VcImNsaWVudFVuUmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC11bnJlZ2lzdGVyZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwibW92ZVNpemVDb21wbGV0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJtb3ZlLXNpemUtY29tcGxldGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudHNBdHRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudHMtYXR0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGV0YWNoZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGV0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiZ3JvdXBzQ2hhbmdlZFwiOnRoaXMuZW1pdF9ldmVudChcImdyb3Vwcy1jaGFuZ2VkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudEFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1hY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGVhY3RpdmF0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSl9fWhleFN0cmluZ1RvTnVtYmVyKGUpe2NvbnN0IHQ9ZT8udHJpbSgpO3JldHVybi9eMHhbMC05YS1mXSskL2kudGVzdCh0KT9OdW1iZXIodCk6TmFOfWFzeW5jIGJ1aWxkX2NvbW1hbmRfbGluZShlKXtsZXQgdD1gLS1pZCAke3RoaXMuc2VydmVyX2lkfSBgO2U/LnNob3dEZWJ1ZyYmKHQrPVwiIC0tc2hvdy1kZWJ1ZyBcIiksZT8uZGlzYWJsZUdQVUFjY2VsZXJhdGVkRHJhZ2dpbmcmJih0Kz1cIiAtLWRpc2FibGUtZ3B1LWFjY2VsZXJhdGVkLWRyYWdnaW5nIHRydWUgXCIpLGU/LmRpc2FibGVCbHVyRHJvcFByZXZpZXcmJih0Kz1cIiAtLWJsdXItZHJvcC1wcmV2aWV3IGZhbHNlIFwiKSx2b2lkIDAhPT1lPy5ibHVyRWZmZWN0UGVyZm9ybWFuY2VUaHJlc2hvbGQmJih0Kz1gIC0tYmx1ci1lZmZlY3QtcGVyZm9ybWFuY2UtdGhyZXNob2xkPSR7ZT8uYmx1ckVmZmVjdFBlcmZvcm1hbmNlVGhyZXNob2xkfSBgKSxlPy5kaXNhYmxlVXNlclVuc3RpY2smJih0Kz1cIiAtLWRpc2FibGUtdXNlci11bnN0aWNrIFwiKSwhMCE9PWU/LmtleVRvU3RpY2smJlwic3RyaW5nXCIhPXR5cGVvZiBlPy5rZXlUb1N0aWNrfHwodCs9YCAtLWtzPSR7ITA9PT1lLmtleVRvU3RpY2s/XCJjdHJsXCI6ZS5rZXlUb1N0aWNrfSBgKSxlPy5rZXlUb1Vuc3RpY2smJih0Kz1gIC0ta3VzPSR7ZS5rZXlUb1Vuc3RpY2t9IGApLGU/LmhpZGVUYXNrYmFyRW50cnkmJih0Kz1cIiAtLW5vLXRiIFwiKSxlPy50YXNrYmFySWNvbkdyb3VwJiYodCs9YCAtLXRiLWlkPSR7ZT8udGFza2Jhckljb25Hcm91cH0gYCksZT8udGFza2Jhckljb24mJih0Kz1gIC0tdGItaWNvbj0ke2U/LnRhc2tiYXJJY29ufSBgKSxlPy5kaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZyYmKHQrPVwiIC0tbm8taGIgXCIpLGU/LmF1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zJiYodCs9XCIgLS10Yi1hdXRvLWhpZGUgXCIpLGU/LnRoZW1lJiYodCs9YCAtLXRobT0ke2UudGhlbWV9IGApLGU/LmRlZmF1bHRSZXNpemluZ0JlaGF2aW9yJiYodCs9YCAtLXJlcz0ke2U/LmRlZmF1bHRSZXNpemluZ0JlaGF2aW9yfSBgKTtjb25zdCBuPWF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtyZXR1cm4gdCs9YC0tcnVudGltZS1wb3J0ICR7bi5wb3J0fSBgLHQrPWAtLXJ1bnRpbWUtdmVyc2lvbiAke24udmVyc2lvbn0gYCx0LnRyaW0oKX19Y29uc3QgaD1hc3luYyBlPT57bGV0IHQ9KGF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKSkuYXJnc1tcImxvY2FsLXN0YXJ0dXAtdXJsXCJdLnJlcGxhY2UoXCJjb25maWcuanNvblwiLFwiXCIpO2NvbnN0IG49dC5pbmNsdWRlcyhcIlxcXFxcIik/XCJcXFxcXCI6XCIvXCI7cmV0dXJuIHQuZW5kc1dpdGgobikmJih0PXQuc2xpY2UoMCwtMSkpLFt0LFwiYXNzZXRzXCIsZS5hbGlhcyxlLnZlcnNpb24sZS50YXJnZXRdLmpvaW4obil9LHA9KCk9PlwidW5kZWZpbmVkXCIhPXR5cGVvZiBjcnlwdG8mJlwicmFuZG9tVVVJRFwiaW4gY3J5cHRvJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBjcnlwdG8ucmFuZG9tVVVJRD9jcnlwdG8ucmFuZG9tVVVJRCgpOlwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZyxlPT4oZV5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSYxNT4+ZS80KS50b1N0cmluZygxNikpLGQ9ZT0+L15hcHA6XFwvW14vXStcXC9bXi9dKyQvLnRlc3QoZT8/XCJcIiksdT1lPT57Y29uc3QgdD1uZXcgTWFwO3JldHVybiBlLmZvckVhY2goZT0+e2NvbnN0IG49IWUubmFtZSxpPWUubmFtZT8uc3RhcnRzV2l0aChjKT8/ITEsYT1lLmN1c3RvbURhdGE/LnNuYXBDbGllbnRJZDsobnx8aXx8ZChlLm5hbWUpKSYmYSYmdC5zZXQoYSxlKX0pLHR9LGY9KGUsdCxuKT0+e09iamVjdC52YWx1ZXMoZSkuZm9yRWFjaChlPT57ZS5hdHRhY2hlZENsaWVudElkPT09dD9lLmF0dGFjaGVkQ2xpZW50SWQ9bjplLnRhcmdldENsaWVudElkPT09dCYmKGUudGFyZ2V0Q2xpZW50SWQ9bil9KX0sdj1lPT57aWYoIWQoZSkpcmV0dXJuYCR7Y30ke3AoKX1gO2NvbnN0IHQ9ZS5zcGxpdChcIi9cIik7cmV0dXJuIHRbdC5sZW5ndGgtMV09cCgpLHQuam9pbihcIi9cIil9O2V4cG9ydHtsIGFzIFNuYXBTZXJ2ZXJ9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE9wZW5GaW4gfSBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0ICogYXMgU25hcCBmcm9tIFwiQG9wZW5maW4vc25hcC1zZGtcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCJAb3BlbmZpbi9zbmFwLXNka1wiO1xuaW1wb3J0IHsgZG9lc0FwcEFzc2V0RXhpc3QsIGRvd25sb2FkQXBwQXNzZXQgfSBmcm9tIFwiLi9hcHAtYXNzZXRcIjtcblxuY29uc3QgVEVTVF9BUFBfV0lORE9XX0lEID0gXCJzbmFwLWV4YW1wbGUtbmF0aXZlLXRlc3QtYXBwLWlkXCI7XG5jb25zdCBzbmFwRGVmYXVsdFVybCA9IFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9yZWxlYXNlL3NuYXAvMS41LjAvc25hcC56aXBcIjtcbmNvbnN0IHNuYXBWZXJzaW9uID0gXCIxLjUuMFwiO1xuY29uc3Qgc25hcEFsaWFzID0gXCJvcGVuZmluLXNuYXBcIjtcbmNvbnN0IHNuYXBUYXJnZXQgPSBcIk9wZW5GaW5TbmFwLmV4ZVwiO1xuXG4vLyBUaGUgRE9NIGVsZW1lbnRzXG5sZXQgY2hrU2hvd0RlYnVnV2luZG93OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrQ3RybFRvU25hcDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZUdQVURyYWdnaW5nOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtEaXNhYmxlQmx1ckRyb3A6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcblxubGV0IGNoa0hpZGVUYXNrQmFyRW50cnk6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0N1c3RvbVRhc2tCYXJJY29uOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmc6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGg6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IHR4dFByaW1hcnlVcmw6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IHR4dEZhbGxiYWNrVXJsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBmaWVsZFByaW1hcnlVcmw6IEhUTUxFbGVtZW50IHwgbnVsbDtcbmxldCBmaWVsZEZhbGxiYWNrVXJsOiBIVE1MRWxlbWVudCB8IG51bGw7XG5sZXQgcm93Q3VzdG9tU25hcEFwcEFzc2V0UGF0aDogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5sZXQgYnRuU3RhcnQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5TdG9wOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuTmF0aXZlVGVzdEFwcDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bldpbmRvd1Rlc3RBcHA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5TaG93SGlkZURlYnVnV2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VsQXR0YWNoUG9zaXRpb246IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBzZWxTbmFwS2V5OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsVW5zbmFwS2V5OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsUmVzaXplOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsVGhlbWU6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBidG5BdHRhY2hUb1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkRldGFjaEZyb21XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5NaW5pbWl6ZUdyb3VwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0TGF5b3V0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0QXR0YWNoZWQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRHcm91cHM6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQ2xlYXJMb2c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBzZXJ2ZXJTdGF0dXM6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHwgbnVsbDtcbmxldCBsb2dnaW5nOiBIVE1MUHJlRWxlbWVudCB8IG51bGw7XG5sZXQgZGVidWdXaW5kb3dTaG93biA9IGZhbHNlO1xuXG5sZXQgc2VydmVyU3RhdGU6IFwic3RhcnRpbmdcIiB8IFwic3RhcnRlZFwiIHwgXCJzdG9wcGluZ1wiIHwgXCJzdG9wcGVkXCIgPSBcInN0b3BwZWRcIjtcbmxldCBpc1dpbmRvd09wZW4gPSBmYWxzZTtcbmxldCBpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5sZXQgc2VydmVyOiBTbmFwLlNuYXBTZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3VzdG9tIGxvZ2dlciB0aGF0IGltcGxlbWVudHMgdGhlIExvZ2dlciBpbnRlcmZhY2UgdXNpbmcgbG9nSW5mb3JtYXRpb24gYW5kIGxvZ0Vycm9yIGZ1bmN0aW9uc1xuICovXG5jb25zdCBjdXN0b21Mb2dnZXIgPSB7XG5cdGluZm86IChtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG5cdFx0bG9nSW5mb3JtYXRpb24oYCR7bWVzc2FnZX0ke29wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDAgPyBgICR7b3B0aW9uYWxQYXJhbXMuam9pbihcIiBcIil9YCA6IFwiXCJ9YCk7XG5cdH0sXG5cdGVycm9yOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0Vycm9yKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9LFxuXHR3YXJuOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0Vycm9yKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9LFxuXHR0cmFjZTogKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcblx0XHRsb2dJbmZvcm1hdGlvbihgJHttZXNzYWdlfSR7b3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCA/IGAgJHtvcHRpb25hbFBhcmFtcy5qb2luKFwiIFwiKX1gIDogXCJcIn1gKTtcblx0fSxcblx0ZGVidWc6IChtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG5cdFx0bG9nSW5mb3JtYXRpb24oYCR7bWVzc2FnZX0ke29wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDAgPyBgICR7b3B0aW9uYWxQYXJhbXMuam9pbihcIiBcIil9YCA6IFwiXCJ9YCk7XG5cdH1cbn07XG5cbi8vIFdhaXQgZm9yIHRoZSBET00gdG8gZmluaXNoIGxvYWRpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG5cdC8vIFBsYXRmb3JtIGhhcyBsb2FkZWQgc28gaW5pdGlhbGl6ZSB0aGUgRE9NXG5cdGF3YWl0IGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTSBlbGVtZW50cy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y2hrU2hvd0RlYnVnV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtTaG93RGVidWdXaW5kb3dcIik7XG5cdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcFwiKTtcblx0Y2hrQ3RybFRvU25hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrQ3RybFRvU25hcFwiKTtcblx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtEaXNhYmxlR1BVRHJhZ2dpbmdcIik7XG5cdGNoa0Rpc2FibGVCbHVyRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZUJsdXJEcm9wXCIpO1xuXHRjaGtIaWRlVGFza0JhckVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtIaWRlVGFza0JhckVudHJ5XCIpO1xuXHRjaGtDdXN0b21UYXNrQmFySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrQ3VzdG9tVGFza0Jhckljb25cIik7XG5cdGNoa0dyb3VwV2l0aFBsYXRmb3JtVGFza2Jhckdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50Pihcblx0XHRcIiNjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cFwiXG5cdCk7XG5cblx0Y2hrQXV0b0hpZGVDbGllbnRUYXNrYmFySWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zXCIpO1xuXHRjaGtEaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmdcIik7XG5cdGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0N1c3RvbVNuYXBBcHBBc3NldFBhdGhcIik7XG5cdHR4dFByaW1hcnlVcmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI3R4dFByaW1hcnlVcmxcIik7XG5cdHR4dEZhbGxiYWNrVXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiN0eHRGYWxsYmFja1VybFwiKTtcblx0ZmllbGRQcmltYXJ5VXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIjZmllbGRQcmltYXJ5VXJsXCIpO1xuXHRmaWVsZEZhbGxiYWNrVXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIjZmllbGRGYWxsYmFja1VybFwiKTtcblx0cm93Q3VzdG9tU25hcEFwcEFzc2V0UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI3Jvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGhcIik7XG5cblx0YnRuU3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdGFydFwiKTtcblx0YnRuU3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blN0b3BcIik7XG5cdHNlcnZlclN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFBhcmFncmFwaEVsZW1lbnQ+KFwiI3NlcnZlclN0YXR1c1wiKTtcblx0YnRuTmF0aXZlVGVzdEFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bk5hdGl2ZVRlc3RBcHBcIik7XG5cdGJ0bldpbmRvd1Rlc3RBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5XaW5kb3dUZXN0QXBwXCIpO1xuXHRzZWxBdHRhY2hQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbEF0dGFjaFBvc2l0aW9uXCIpO1xuXHRzZWxTbmFwS2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsS2V5VG9TbmFwXCIpO1xuXHRzZWxVbnNuYXBLZXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxLZXlUb1Vuc25hcFwiKTtcblx0c2VsUmVzaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsUmVzaXplQmVoYXZpb3VyXCIpO1xuXHRzZWxUaGVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbFRoZW1lXCIpO1xuXHRidG5BdHRhY2hUb1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkF0dGFjaFRvV2luZG93XCIpO1xuXHRidG5EZXRhY2hGcm9tV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuRGV0YWNoRnJvbVdpbmRvd1wiKTtcblx0YnRuTWluaW1pemVHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bk1pbmltaXplR3JvdXBcIik7XG5cdGJ0bkdldExheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldExheW91dFwiKTtcblx0YnRuR2V0QXR0YWNoZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRBdHRhY2hlZFwiKTtcblx0YnRuR2V0R3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0R3JvdXBzXCIpO1xuXHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvd1wiKTtcblx0bG9nZ2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFByZUVsZW1lbnQ+KFwiI2xvZ2dpbmdcIik7XG5cdGJ0bkNsZWFyTG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQ2xlYXJMb2dcIik7XG5cdGJ0blNob3dIaWRlRGVidWdXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TaG93SGlkZURlYnVnV2luZG93XCIpO1xuXG5cdGlmIChcblx0XHRjaGtTaG93RGVidWdXaW5kb3cgJiZcblx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcCAmJlxuXHRcdGNoa0N0cmxUb1NuYXAgJiZcblx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcgJiZcblx0XHRjaGtEaXNhYmxlQmx1ckRyb3AgJiZcblx0XHRjaGtIaWRlVGFza0JhckVudHJ5ICYmXG5cdFx0Y2hrQ3VzdG9tVGFza0Jhckljb24gJiZcblx0XHRjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cCAmJlxuXHRcdGNoa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zICYmXG5cdFx0Y2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmcgJiZcblx0XHRjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoICYmXG5cdFx0dHh0UHJpbWFyeVVybCAmJlxuXHRcdHR4dEZhbGxiYWNrVXJsICYmXG5cdFx0ZmllbGRQcmltYXJ5VXJsICYmXG5cdFx0ZmllbGRGYWxsYmFja1VybCAmJlxuXHRcdHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGggJiZcblx0XHRidG5TdGFydCAmJlxuXHRcdGJ0blN0b3AgJiZcblx0XHRzZXJ2ZXJTdGF0dXMgJiZcblx0XHRidG5OYXRpdmVUZXN0QXBwICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0YnRuTWluaW1pemVHcm91cCAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkICYmXG5cdFx0YnRuR2V0R3JvdXBzICYmXG5cdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdyAmJlxuXHRcdGJ0bkNsZWFyTG9nICYmXG5cdFx0YnRuU2hvd0hpZGVEZWJ1Z1dpbmRvd1xuXHQpIHtcblx0XHR0eHRQcmltYXJ5VXJsLnZhbHVlID0gXCJodHRwczovL2V4YW1wbGVvZmJhZHVybC5jb20vc25hcC56aXBcIjtcblx0XHR0eHRGYWxsYmFja1VybC52YWx1ZSA9IHNuYXBEZWZhdWx0VXJsO1xuXHRcdGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGguYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHRjb25zdCBkaXNwbGF5ID0gY2hrQ3VzdG9tU25hcEFwcEFzc2V0UGF0aD8uY2hlY2tlZCA/IFwiXCIgOiBcIm5vbmVcIjtcblx0XHRcdGlmIChmaWVsZFByaW1hcnlVcmwpIHtcblx0XHRcdFx0ZmllbGRQcmltYXJ5VXJsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkRmFsbGJhY2tVcmwpIHtcblx0XHRcdFx0ZmllbGRGYWxsYmFja1VybC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRjb25zdCBhcHAgPSBhd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudCgpO1xuXHRcdGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgYXBwLmdldE1hbmlmZXN0KCk7XG5cblx0XHRpZiAobWFuaWZlc3QuYXBwQXNzZXRzPy5zb21lKChhc3NldDogeyBhbGlhcz86IHN0cmluZyB9KSA9PiBhc3NldC5hbGlhcyA9PT0gXCJvcGVuZmluLXNuYXBcIikpIHtcblx0XHRcdHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGguc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH1cblxuXHRcdGlmIChtYW5pZmVzdC5hcHBBc3NldHM/LlswXT8uc3JjID09PSBcIlNOQVBfQVNTRVRfVVJMXCIpIHtcblx0XHRcdGxvZ0Vycm9yKFxuXHRcdFx0XHRcIlBsZWFzZSByZXF1ZXN0IHRoZSBTTkFQX0FTU0VUX1VSTCBmcm9tIEhFUkUgYW5kIHVwZGF0ZSBtYW5pZmVzdC5maW4uanNvbiBiZWZvcmUgcnVubmluZyB0aGUgc2FtcGxlXCJcblx0XHRcdCk7XG5cdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtDdHJsVG9TbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVHUFVEcmFnZ2luZy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlQmx1ckRyb3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGluZ1wiO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFN0YXJ0aW5nIFNuYXAgU2VydmVyIHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH1gKTtcblx0XHRcdFx0XHRzZXJ2ZXIgPSBuZXcgU25hcC5TbmFwU2VydmVyKGZpbi5tZS5pZGVudGl0eS51dWlkKTtcblx0XHRcdFx0XHRsZXQga2V5VG9TbmFwOiB1bmRlZmluZWQgfCBcImN0cmxcIiB8IFwic2hpZnRcIiB8IGJvb2xlYW47XG5cdFx0XHRcdFx0bGV0IGtleVRvVW5zbmFwOiB1bmRlZmluZWQgfCBcImN0cmxcIiB8IFwic2hpZnRcIjtcblxuXHRcdFx0XHRcdGlmIChjaGtDdHJsVG9TbmFwPy5jaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzbmFwS2V5VmFsdWUgPSBzZWxTbmFwS2V5Py52YWx1ZTtcblx0XHRcdFx0XHRcdGlmIChzbmFwS2V5VmFsdWUgPT09IFwiY3RybFwiKSB7XG5cdFx0XHRcdFx0XHRcdGtleVRvU25hcCA9IFwiY3RybFwiO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChzbmFwS2V5VmFsdWUgPT09IFwic2hpZnRcIikge1xuXHRcdFx0XHRcdFx0XHRrZXlUb1NuYXAgPSBcInNoaWZ0XCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcD8uY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qga2V5VG9VbnNuYXBWYWx1ZSA9IHNlbFVuc25hcEtleT8udmFsdWU7XG5cdFx0XHRcdFx0XHRpZiAoa2V5VG9VbnNuYXBWYWx1ZSA9PT0gXCJjdHJsXCIpIHtcblx0XHRcdFx0XHRcdFx0a2V5VG9VbnNuYXAgPSBcImN0cmxcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoa2V5VG9VbnNuYXBWYWx1ZSA9PT0gXCJzaGlmdFwiKSB7XG5cdFx0XHRcdFx0XHRcdGtleVRvVW5zbmFwID0gXCJzaGlmdFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnM6IFNlcnZlck9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRzaG93RGVidWc6IGNoa1Nob3dEZWJ1Z1dpbmRvdz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRpc2FibGVVc2VyVW5zdGljazogY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXA/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRrZXlUb1N0aWNrOiBrZXlUb1NuYXAsXG5cdFx0XHRcdFx0XHRrZXlUb1Vuc3RpY2s6IGtleVRvVW5zbmFwLFxuXHRcdFx0XHRcdFx0ZGlzYWJsZUdQVUFjY2VsZXJhdGVkRHJhZ2dpbmc6IGNoa0Rpc2FibGVHUFVEcmFnZ2luZz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRpc2FibGVCbHVyRHJvcFByZXZpZXc6IGNoa0Rpc2FibGVCbHVyRHJvcD8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGhpZGVUYXNrYmFyRW50cnk6IGNoa0hpZGVUYXNrQmFyRW50cnk/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHR0YXNrYmFySWNvbjogY2hrQ3VzdG9tVGFza0Jhckljb24/LmNoZWNrZWQgPyBcImh0dHBzOi8vb3BlbmZpbi5jby9mYXZpY29uLmljb1wiIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0dGFza2Jhckljb25Hcm91cDogY2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXA/LmNoZWNrZWRcblx0XHRcdFx0XHRcdFx0PyBgb3BlbmZpbl9hcHBzX2dyb3VwLiR7ZmluLm1lLmlkZW50aXR5LnV1aWR9YFxuXHRcdFx0XHRcdFx0XHQ6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdGF1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zOiBjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29ucz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nOiBjaGtEaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRlZmF1bHRSZXNpemluZ0JlaGF2aW9yOiBzZWxSZXNpemU/LnZhbHVlIGFzIFNuYXAuUmVzaXppbmdCZWhhdmlvcixcblx0XHRcdFx0XHRcdHRoZW1lOiBzZWxUaGVtZT8udmFsdWUgYXMgXCJzbmFwLW9yaWdpbmFsXCIgfCBcInNuYXAtbGlnaHQxXCIgfCBcInNuYXAtZGFyazFcIlxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoY2hrQ3VzdG9tU25hcEFwcEFzc2V0UGF0aD8uY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJpbWFyeVVybCA9IHR4dFByaW1hcnlVcmw/LnZhbHVlID8/IFwiXCI7XG5cdFx0XHRcdFx0XHRjb25zdCBmYWxsYmFja1VybCA9IHR4dEZhbGxiYWNrVXJsPy52YWx1ZTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXQgPSBhd2FpdCB2YWxpZGF0ZUFwcEFzc2V0U291cmNlKHByaW1hcnlVcmwsIGZhbGxiYWNrVXJsKTtcblx0XHRcdFx0XHRcdGlmICghdmFsaWRhdGVkQXBwQXNzZXQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0XHRsb2dFcnJvcihcblx0XHRcdFx0XHRcdFx0XHRcIkZhaWxlZCB0byBmZXRjaCB0aGUgYXBwIGFzc2V0IGZyb20gYm90aCBwcmltYXJ5IGFuZCBmYWxsYmFjayBVUkxzLiBDYW5ub3Qgc3RhcnQgdGhlIFNuYXAgc2VydmVyIHdpdGggY3VzdG9tIGFwcCBhc3NldCBwYXRoLlwiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG9wdGlvbnMuY3VzdG9tU25hcEFzc2V0U291cmNlID0gdmFsaWRhdGVkQXBwQXNzZXQudmFsaWRhdGVkVXJsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5zdGFydChvcHRpb25zKTtcblxuXHRcdFx0XHRcdGlmIChjaGtTaG93RGVidWdXaW5kb3c/LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGRlYnVnV2luZG93U2hvd24gPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkZWJ1Z1dpbmRvd1Nob3duID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5lbmFibGVBdXRvV2luZG93UmVnaXN0cmF0aW9uKCk7XG5cblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1yZWdpc3RlcmVkXCIsIChldmVudDogU25hcC5DbGllbnRSZWdpc3RlcmVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgUmVnaXN0ZXJlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtdW5yZWdpc3RlcmVkXCIsIChldmVudDogU25hcC5DbGllbnRVblJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBVbnJlZ2lzdGVyZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmNsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dPcGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnRzLWF0dGFjaGVkXCIsIChldmVudDogU25hcC5DbGllbnRzQXR0YWNoZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudHMgQXR0YWNoZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmF0dGFjaGVkQ2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtZGV0YWNoZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudERldGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgRGV0YWNoZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmNsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1hY3RpdmF0ZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudEFjdGl2YXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IEFjdGl2YXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudERlYWN0aXZhdGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgRGVhY3RpdmF0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwibW92ZS1zaXplLWNvbXBsZXRlZFwiLCAoZXZlbnQ6IFNuYXAuTW92ZVNpemVDb21wbGV0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYE1vdmUgU2l6ZSBDb21wbGV0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiZ3JvdXBzLWNoYW5nZWRcIiwgKGV2ZW50OiBTbmFwLkdyb3Vwc0NoYW5nZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYEdyb3VwcyBDaGFuZ2VkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RhcnRlZCBTbmFwIFNlcnZlclwiKTtcblxuXHRcdFx0XHRcdGNvbnN0IHdpbiA9IGZpbi5XaW5kb3cuZ2V0Q3VycmVudFN5bmMoKTtcblx0XHRcdFx0XHRjb25zdCBuYXRpdmVJZCA9IGF3YWl0IHdpbi5nZXROYXRpdmVJZCgpO1xuXG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLnJlZ2lzdGVyV2luZG93KGZpbi5tZS5pZGVudGl0eS51dWlkLCBuYXRpdmVJZCk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRgUmVnaXN0ZXJpbmcgUGxhdGZvcm0gV2luZG93IHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0gYW5kIGhhbmRsZSAke25hdGl2ZUlkfWBcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0YXJ0ZWRcIjtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5TdG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0b3BwaW5nXCI7XG5cdFx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0b3BwaW5nIFNuYXAgU2VydmVyXCIpO1xuXHRcdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHNlcnZlci5kZXRhY2hGcm9tR3JvdXAoVEVTVF9BUFBfV0lORE9XX0lEKTtcblx0XHRcdFx0XHRcdGF3YWl0IHNlcnZlci5zdG9wKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBlZCBTbmFwIFNlcnZlclwiKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0c2VydmVyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdG9wcGVkXCI7XG5cdFx0XHRcdFx0aXNXaW5kb3dPcGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBydW50aW1lSW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtcblx0XHRcdFx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oeyBhbGlhczogXCJzbmFwLW5hdGl2ZS10ZXN0LWFwcFwiIH0pO1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0XHRjb25zdCBsb2NhbEFwcFVybCA9IChydW50aW1lSW5mby5hcmdzIGFzIGFueSlbXCJsb2NhbC1zdGFydHVwLXVybFwiXS5yZXBsYWNlKFwiY29uZmlnLmpzb25cIiwgXCJcIik7XG5cdFx0XHRcdGF3YWl0IGxhdW5jaEFwcChcblx0XHRcdFx0XHRcIk5hdGl2ZSBUZXN0IEFwcFwiLFxuXHRcdFx0XHRcdFRFU1RfQVBQX1dJTkRPV19JRCxcblx0XHRcdFx0XHRgJHtsb2NhbEFwcFVybH1hc3NldHNcXFxcJHthcHBBc3NldEluZm8uYWxpYXN9XFxcXCR7YXBwQXNzZXRJbmZvLnZlcnNpb259XFxcXCR7YXBwQXNzZXRJbmZvLnRhcmdldH1gLFxuXHRcdFx0XHRcdFtdLFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwid2FpdEZvcldpbmRvd09mTmFtZVwiLFxuXHRcdFx0XHRcdFx0dGltZW91dE1zOiAxNTAwMCxcblx0XHRcdFx0XHRcdG1hdGNoUmVnZXg6IFwiXk5hdGl2ZSBUZXN0IEFwcCRcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdFx0aXNXaW5kb3dPcGVuID0gdHJ1ZTtcblx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5XaW5kb3dUZXN0QXBwPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRhd2FpdCBsYXVuY2hXaW5kb3dPcHRpb25zQXBwKCk7XG5cdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIgJiYgc2VsQXR0YWNoUG9zaXRpb24pIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNlbEF0dGFjaFBvc2l0aW9uLnZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5hdHRhY2hXaW5kb3dzKGZpbi5tZS5pZGVudGl0eS51dWlkLCBURVNUX0FQUF9XSU5ET1dfSUQsIHZhbHVlIGFzIFNuYXAuQXR0YWNoU2lkZSwgMCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuTWluaW1pemVHcm91cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgZ3JvdXBJZCA9IGF3YWl0IHNlcnZlci5nZXRHcm91cElkRm9yV2luZG93KFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLm1pbmltaXplR3JvdXAoZ3JvdXBJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5DbGVhckxvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRsb2dDbGVhcigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkdldExheW91dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGF5b3V0ID0gYXdhaXQgc2VydmVyLmdldExheW91dCgpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiTGF5b3V0XCIpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKEpTT04uc3RyaW5naWZ5KGxheW91dCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkdldEF0dGFjaGVkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRjb25zdCBhdHRhY2hlZCA9IGF3YWl0IHNlcnZlci5nZXRBdHRhY2hlZChmaW4ubWUuaWRlbnRpdHkudXVpZCk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJBdHRhY2hlZFwiKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShhdHRhY2hlZCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkdldEdyb3Vwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgZ3JvdXBzID0gYXdhaXQgc2VydmVyLmdldEFsbEdyb3VwSWRzKCk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJHcm91cCBJZHNcIik7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoZ3JvdXBzLCB1bmRlZmluZWQsIFwiICBcIikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGJ0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGdyb3VwSWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0R3JvdXBJZEZvcldpbmRvdyhmaW4ubWUuaWRlbnRpdHkubmFtZSk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYEdyb3VwIElkIEZvciBDdXJyZW50IFdpbmRvdzogJHtncm91cElkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGRlYnVnV2luZG93U2hvd24gPSAhZGVidWdXaW5kb3dTaG93bjtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc2hvd0RlYnVnV2luZG93KGRlYnVnV2luZG93U2hvd24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgc2hvcnQgaGFzaCBzdHJpbmcgZnJvbSBhIFVSTCB0byB1c2UgYXMgYSB2ZXJzaW9uIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0gdXJsIFRoZSBVUkwgdG8gaGFzaC5cbiAqIEByZXR1cm5zIEEgaGV4IHN0cmluZyBoYXNoIG9mIHRoZSBVUkwuXG4gKi9cbmZ1bmN0aW9uIGhhc2hVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRsZXQgaGFzaCA9IDUzODE7XG5cdGNvbnN0IG1heFNhZmVIYXNoID0gNF8yOTRfOTY3XzI5MTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB1cmwubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBjb2RlUG9pbnQgPSB1cmwuY2hhckNvZGVBdChpKTtcblx0XHRjb25zdCBtdWx0aXBsaWVkSGFzaCA9IGhhc2ggKiAzMztcblx0XHRoYXNoID0gKG11bHRpcGxpZWRIYXNoICsgY29kZVBvaW50KSAlIG1heFNhZmVIYXNoO1xuXHR9XG5cdGNvbnN0IGhhc2hIZXggPSBNYXRoLmZsb29yKGhhc2gpLnRvU3RyaW5nKDE2KTtcblx0cmV0dXJuIGhhc2hIZXgucGFkU3RhcnQoOCwgXCIwXCIpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIERPTSBlbGVtZW50cyB3aXRoIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlU2VydmVyU3RhdHVzKCk6IHZvaWQge1xuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0Y2hrQ3RybFRvU25hcCAmJlxuXHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwICYmXG5cdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nICYmXG5cdFx0Y2hrRGlzYWJsZUJsdXJEcm9wICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdHNlbEF0dGFjaFBvc2l0aW9uICYmXG5cdFx0YnRuR2V0TGF5b3V0ICYmXG5cdFx0YnRuR2V0QXR0YWNoZWQgJiZcblx0XHRidG5HZXRHcm91cHMgJiZcblx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93ICYmXG5cdFx0YnRuU2hvd0hpZGVEZWJ1Z1dpbmRvd1xuXHQpIHtcblx0XHRpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRpbmdcIiB8fCBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGluZ1wiKSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrQ3RybFRvU25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUJsdXJEcm9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEdyb3Vwcy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gYFNuYXAgU2VydmVyIGlzICR7c2VydmVyU3RhdGV9YDtcblx0XHR9IGVsc2UgaWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0ZWRcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0N0cmxUb1NuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVCbHVyRHJvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRHcm91cHMuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RhcnRlZFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGNoa0N0cmxUb1NuYXAuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGNoa0Rpc2FibGVCbHVyRHJvcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEdyb3Vwcy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gXCJTbmFwIFNlcnZlciBpcyBzdG9wcGVkXCI7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIHdpbmRvdyBzdGF0ZS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlV2luZG93U3RhdHVzKCk6IHZvaWQge1xuXHRpZiAoXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdHNlbEF0dGFjaFBvc2l0aW9uICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0YnRuTWluaW1pemVHcm91cCAmJlxuXHRcdGJ0bldpbmRvd1Rlc3RBcHBcblx0KSB7XG5cdFx0aWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0aW5nXCIgfHwgc2VydmVyU3RhdGUgPT09IFwic3RvcHBpbmdcIikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5XaW5kb3dUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuTWluaW1pemVHcm91cC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIgJiYgaXNXaW5kb3dPcGVuKSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSAhaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuZGlzYWJsZWQgPSAhaXNXaW5kb3dBdHRhY2hlZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHNlcnZlclN0YXRlID09PSBcInN0b3BwZWRcIjtcblx0XHRcdGJ0bldpbmRvd1Rlc3RBcHAuZGlzYWJsZWQgPSBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGVkXCI7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFNlbmQgaW5mb3JtYXRpb24gdG8gdGhlIGxvZyBkaXNwbGF5LlxuICogQHBhcmFtIGluZm9ybWF0aW9uIFRoZSBpbmZvcm1hdGlvbiB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dJbmZvcm1hdGlvbihpbmZvcm1hdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9JHtpbmZvcm1hdGlvbn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGVycm9yIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIHNlbmQuXG4gKi9cbmZ1bmN0aW9uIGxvZ0Vycm9yKGVycjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9RVJST1I6ICR7ZXJyfVxcblxcbmA7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSBsb2dnaW5nLnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIENsZWFyIHRoZSBsb2cgZGlzcGxheS5cbiAqL1xuZnVuY3Rpb24gbG9nQ2xlYXIoKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSAwO1xuXHR9XG59XG5cbi8qKlxuICogTGF1bmNoIGFuIGFwcGxpY2F0aW9uIHVzaW5nIFNuYXAuXG4gKiBAcGFyYW0gYXBwTmFtZSBUaGUgbmFtZSBvZiB0aGUgYXBwIHRoYXQgaXMgYmVpbmcgbGF1bmNoZWQuXG4gKiBAcGFyYW0gY2xpZW50SWQgQW4gSWQgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGxhdW5jaGVkIGFwcC5cbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBhcHAgdG8gbGF1bmNoLlxuICogQHBhcmFtIGFyZ3MgQWRkaXRpb25hbCBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGZvciB0aGUgbGF1bmNoLlxuICogQHBhcmFtIHN0cmF0ZWd5IFRoZSBzdHJhdGVneSB0byBsYXVuY2ggdGhlIHdpbmRvdyB3aXRoLlxuICovXG5hc3luYyBmdW5jdGlvbiBsYXVuY2hBcHAoXG5cdGFwcE5hbWU6IHN0cmluZyxcblx0Y2xpZW50SWQ6IHN0cmluZyxcblx0cGF0aDogc3RyaW5nLFxuXHRhcmdzOiBzdHJpbmdbXSxcblx0c3RyYXRlZ3k6IFNuYXAuTGF1bmNoU3RyYXRlZ3lcbik6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBMYXVuY2hpbmcgJHthcHBOYW1lfWApO1xuXHRcdFx0Y29uc3QgbGF1bmNoUmVzdWx0ID0gYXdhaXQgc2VydmVyLmxhdW5jaCh7XG5cdFx0XHRcdHBhdGgsXG5cdFx0XHRcdGNsaWVudElkLFxuXHRcdFx0XHRhcmdzLFxuXHRcdFx0XHRzdHJhdGVneVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChsYXVuY2hSZXN1bHQ/LnByb2Nlc3NfaWQpIHtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYCR7YXBwTmFtZX0gbGF1bmNoZWQgd2l0aCBwcm9jZXNzIGlkICR7bGF1bmNoUmVzdWx0LnByb2Nlc3NfaWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0fVxufVxuXG4vKipcbiAqIExhdW5jaGVzIGEgd2luZG93IHRoYXQgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGNoaWxkIHdpbmRvd3MuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxhdW5jaFdpbmRvd09wdGlvbnNBcHAoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChzZXJ2ZXJTdGF0ZSAhPT0gXCJzdGFydGVkXCIpIHtcblx0XHRsb2dFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBzdGFydGVkXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCB3aW5kb3dPcHRpb25zTmFtZSA9IFwid2luZG93LW9wdGlvbnMtYXBwXCI7XG5cdGNvbnN0IG9wdGlvbnNXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHsgdXVpZDogZmluLm1lLmlkZW50aXR5LnV1aWQsIG5hbWU6IHdpbmRvd09wdGlvbnNOYW1lIH0pO1xuXG5cdHRyeSB7XG5cdFx0YXdhaXQgb3B0aW9uc1dpbmRvdy5nZXRJbmZvKCk7XG5cdFx0YXdhaXQgb3B0aW9uc1dpbmRvdy5icmluZ1RvRnJvbnQoKTtcblx0fSBjYXRjaCB7XG5cdFx0Ly8gd2luZG93IGRvZXMgbm90IGV4aXN0LCBzbyBjcmVhdGUgaXRcblx0XHRhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiB3aW5kb3dPcHRpb25zTmFtZSxcblx0XHRcdGF1dG9TaG93OiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogNjAwLFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiA4MDAsXG5cdFx0XHR1cmw6IFwiaHR0cHM6Ly9idWlsdC1vbi1vcGVuZmluLmdpdGh1Yi5pby9jb250YWluZXItc3RhcnRlci9tYWluL3VzZS13aW5kb3ctb3B0aW9ucy9odG1sL2FwcC5odG1sXCJcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgc25hcCBhcHAgYXNzZXQgZnJvbSB0aGUgcHJvdmlkZWQgcHJpbWFyeSBhbmQgZmFsbGJhY2sgVVJMcyB0byBlbnN1cmUgaXQgaXMgYXZhaWxhYmxlIGJlZm9yZSBzdGFydGluZyB0aGUgU25hcCBzZXJ2ZXIuXG4gKiBAcGFyYW0gcHJpbWFyeVVybCBUaGUgcHJpbWFyeSBVUkwgdG8gdmFsaWRhdGUgdGhlIHNuYXAgYXBwIGFzc2V0IGZyb20uXG4gKiBAcGFyYW0gZmFsbGJhY2tVcmwgQW4gb3B0aW9uYWwgZmFsbGJhY2sgVVJMIHRvIHZhbGlkYXRlIHRoZSBzbmFwIGFwcCBhc3NldCBmcm9tIGlmIHRoZSBwcmltYXJ5IFVSTCBmYWlscy5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHZhbGlkYXRpb24gd2FzIHN1Y2Nlc3NmdWwsIHRoZSB2YWxpZGF0ZWQgVVJMIGlmIHN1Y2Nlc3NmdWwsIGFuZCB3aGV0aGVyIHRoZSBmYWxsYmFjayBVUkwgd2FzIHVzZWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQXBwQXNzZXRTb3VyY2UoXG5cdHByaW1hcnlVcmw6IHN0cmluZyxcblx0ZmFsbGJhY2tVcmw/OiBzdHJpbmdcbik6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyB2YWxpZGF0ZWRVcmw/OiBzdHJpbmc7IGlzRmFsbGJhY2tVcmw/OiBib29sZWFuIH0+IHtcblx0Y29uc3Qgc25hcEFzc2V0SW5mbzogT3BlbkZpbi5BcHBBc3NldEluZm8gPSB7XG5cdFx0YWxpYXM6IHNuYXBBbGlhcyxcblx0XHRzcmM6IHNuYXBEZWZhdWx0VXJsLFxuXHRcdHZlcnNpb246IHNuYXBWZXJzaW9uLFxuXHRcdHRhcmdldDogc25hcFRhcmdldCxcblx0XHRtYW5kYXRvcnk6IGZhbHNlXG5cdH07XG5cdC8vIGJlZm9yZSB0cnlpbmcgY3VzdG9tIHVybHMgY2hlY2sgdG8gc2VlIGlmIHlvdSBhbHJlYWR5IGhhdmUgc25hcFxuXHRjb25zdCBzbmFwRG93bmxvYWRlZEFzc2V0SW5mbzogT3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQgPSBhd2FpdCBkb2VzQXBwQXNzZXRFeGlzdChcblx0XHRzbmFwQXNzZXRJbmZvLmFsaWFzLFxuXHRcdHNuYXBBc3NldEluZm8udmVyc2lvblxuXHQpO1xuXG5cdGlmIChzbmFwRG93bmxvYWRlZEFzc2V0SW5mbykge1xuXHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0YFdlIGhhdmUgYSBzbmFwIGFzc2V0IHRoYXQgbWF0Y2hlcyB0aGUgYWxpYXMgYW5kIHZlcnNpb24uIEl0IGhhcyB0aGUgZm9sbG93aW5nIGRldGFpbHM6IGFsaWFzOiAke3NuYXBEb3dubG9hZGVkQXNzZXRJbmZvLmFsaWFzfSwgdmVyc2lvbjogJHtzbmFwRG93bmxvYWRlZEFzc2V0SW5mby52ZXJzaW9ufSwgc3JjOiAke3NuYXBEb3dubG9hZGVkQXNzZXRJbmZvLnNyY31gXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdHZhbGlkYXRlZFVybDogc25hcERvd25sb2FkZWRBc3NldEluZm8uc3JjLFxuXHRcdFx0aXNGYWxsYmFja1VybDogc25hcERvd25sb2FkZWRBc3NldEluZm8uc3JjID09PSBmYWxsYmFja1VybFxuXHRcdH07XG5cdH1cblxuXHQvLyBTTkFQIGRvd25sb2FkcyBhIHNwZWNpZmljIGFsaWFzICsgdmVyc2lvbiBjb21iaW5hdGlvbi5cblx0Ly8gVGhlIHJ1bnRpbWUgZG9lcyBub3QgYWxsb3cgYSByZXRyeSBvZiB0aGUgc2FtZSBhcHAgYXNzZXQgaWYgdGhlIG9ubHkgdGhpbmcgdGhhdCBoYXMgY2hhbmdlZCBpcyB0aGUgdXJsLlxuXHQvLyBTaW5jZSB3ZSBoYXZlIG5vIHNuYXAgdmVyc2lvbiB3ZSB3YW50IHRvIHZhbGlkYXRlIG91ciBwcmltYXJ5IHVybC5cblx0bG9nSW5mb3JtYXRpb24oYFZhbGlkYXRpbmcgdGhlIHByaW1hcnkgYXNzZXQgdXJsIGZvciB0aGUgc25hcCBhc3NldDogJHtwcmltYXJ5VXJsfWApO1xuXHRzbmFwQXNzZXRJbmZvLmFsaWFzID0gYCR7c25hcEFsaWFzfS12YWxpZGF0ZS1kb3dubG9hZGA7IC8vIHVzZSBhIGRpZmZlcmVudCBhbGlhcyBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWQgc28gdGhhdCB3ZSBjYW4gaGF2ZSBkaWZmZXJlbnQgdmVyc2lvbnMgaWYgbmVlZGVkIHdpdGhvdXQgY29uZmxpY3Qgd2l0aCB0aGUgYWN0dWFsIHNuYXAgYXNzZXQgYWxpYXNcblxuXHRzbmFwQXNzZXRJbmZvLnRhcmdldCA9IFwiTm9PcFwiOyAvLyBXZSBkb24ndCB3YW50IHRvIGFjdHVhbGx5IHJ1biB0aGUgc25hcCBhc3NldCBkdXJpbmcgdmFsaWRhdGlvbiBzaW5jZSB3ZSBqdXN0IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHVybCBpcyB2YWxpZCBhbmQgdGhlIGFzc2V0IGNhbiBiZSBkb3dubG9hZGVkLCBzbyB1c2UgYSBOb09wIHRhcmdldCB0aGF0IHdpbGwgbm90IGRvIGFueXRoaW5nIGlmIGl0IGlzIHJ1biBmb3IgYW55IHJlYXNvbiBkdXJpbmcgdGhlIHZhbGlkYXRpb24gcHJvY2Vzc1xuXG5cdC8vIFVwZGF0ZSBhc3NldCBpbmZvIHRvIHRhcmdldCBwcmltYXJ5IHVybFxuXHRzbmFwQXNzZXRJbmZvLnNyYyA9IHByaW1hcnlVcmw7IC8vIHVwZGF0ZSB0aGUgc3JjIHRvIHRoZSBwcmltYXJ5IHVybCBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWRcblx0c25hcEFzc2V0SW5mby52ZXJzaW9uID0gaGFzaFVybChwcmltYXJ5VXJsKTsgLy8gdXNlIHRoZSB1cmwgaGFzaCBhcyB0aGUgdmVyc2lvbiBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWQgc28gdGhhdCBpZiB0aGUgdXJsIGNoYW5nZXMgd2Ugd2lsbCBhdHRlbXB0IHRvIGRvd25sb2FkIGFnYWluLCBidXQgaWYgdGhlIHVybCBpcyB0aGUgc2FtZSB3ZSB3aWxsIG5vdCBhdHRlbXB0IHRvIGRvd25sb2FkIGFnYWluIHNpbmNlIHdlIGhhdmUgYWxyZWFkeSB2YWxpZGF0ZWQgaXRcblxuXHRjb25zdCB2YWxpZGF0ZWRBcHBBc3NldFByaW1hcnlVcmwgPSBhd2FpdCBmZXRjaEFwcEFzc2V0KHNuYXBBc3NldEluZm8pO1xuXHRsZXQgdmFsaWRhdGVkQXNzZXRVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHRpZiAodmFsaWRhdGVkQXBwQXNzZXRQcmltYXJ5VXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZmFsbGJhY2tVcmwpIHtcblx0XHRcdC8vIHZhbGlkYXRlIGZhbGxiYWNrIHVybFxuXHRcdFx0bG9nSW5mb3JtYXRpb24oYFZhbGlkYXRpbmcgdGhlIGZhbGxiYWNrIGFzc2V0IHVybCBmb3IgdGhlIHNuYXAgYXNzZXQ6ICR7ZmFsbGJhY2tVcmx9YCk7XG5cdFx0XHRzbmFwQXNzZXRJbmZvLnNyYyA9IGZhbGxiYWNrVXJsOyAvLyB1cGRhdGUgdGhlIHNyYyB0byB0aGUgZmFsbGJhY2sgdXJsIGZvciB0aGUgdmFsaWRhdGlvbiBkb3dubG9hZFxuXHRcdFx0c25hcEFzc2V0SW5mby52ZXJzaW9uID0gaGFzaFVybChmYWxsYmFja1VybCk7IC8vIHVzZSB0aGUgdXJsIGhhc2ggYXMgdGhlIHZlcnNpb24gZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkIHNvIHRoYXQgaWYgdGhlIHVybCBjaGFuZ2VzIHdlIHdpbGwgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiwgYnV0IGlmIHRoZSB1cmwgaXMgdGhlIHNhbWUgd2Ugd2lsbCBub3QgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiBzaW5jZSB3ZSBoYXZlIGFscmVhZHkgdmFsaWRhdGVkIGl0XG5cdFx0XHRjb25zdCB2YWxpZGF0ZWRBcHBBc3NldEZhbGxiYWNrVXJsID0gYXdhaXQgZmV0Y2hBcHBBc3NldChzbmFwQXNzZXRJbmZvKTtcblxuXHRcdFx0aWYgKHZhbGlkYXRlZEFwcEFzc2V0RmFsbGJhY2tVcmwpIHtcblx0XHRcdFx0dmFsaWRhdGVkQXNzZXRVcmwgPSBmYWxsYmFja1VybDtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVkQXNzZXRVcmwgPSBwcmltYXJ5VXJsO1xuXHR9XG5cblx0aWYgKHZhbGlkYXRlZEFzc2V0VXJsKSB7XG5cdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRgU3VjY2Vzc2Z1bGx5IHZhbGlkYXRlZCB0aGUgdXJsIGZvciB0aGUgc25hcCBhc3NldDogJHt2YWxpZGF0ZWRBc3NldFVybH0uIFRoaXMgdXJsIHdpbGwgYmUgcGFzc2VkIHRvIFNuYXAgT3B0aW9ucyB0aHJvdWdoIHRoZSBjdXN0b21TbmFwQXNzZXRTb3VyY2Ugc2V0dGluZy5gXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdHZhbGlkYXRlZFVybDogdmFsaWRhdGVkQXNzZXRVcmwsXG5cdFx0XHRpc0ZhbGxiYWNrVXJsOiB2YWxpZGF0ZWRBc3NldFVybCA9PT0gZmFsbGJhY2tVcmxcblx0XHR9O1xuXHR9XG5cdHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlIH07XG59XG5cbi8qKlxuICogRG93bmxvYWQgYW5kIHJldHVybiBhcHAgYXNzZXQgaW5mbyBmb3IgdGhlIHByb3ZpZGVkIGFwcCBhc3NldCBkZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcEFzc2V0SW5mbyBUaGUgYXBwIGFzc2V0IGRlZmluaXRpb24gdG8gZG93bmxvYWQuXG4gKiBAcmV0dXJucyBUaGUgYXBwIGFzc2V0IGluZm8gaWYgZG93bmxvYWRlZCBvciBmb3VuZCwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBcHBBc3NldChhcHBBc3NldEluZm86IE9wZW5GaW4uQXBwQXNzZXRJbmZvKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHRjb25zdCB2YWxpZGF0ZWRBcHBBc3NldCA9IGF3YWl0IGRvd25sb2FkQXBwQXNzZXQoYXBwQXNzZXRJbmZvLCB7XG5cdFx0bG9nZ2VyOiBjdXN0b21Mb2dnZXIsXG5cdFx0YXNzZXREb3dubG9hZFByb2dyZXNzOiAocHJvZ3Jlc3M6IG51bWJlciwgc3JjOiBzdHJpbmcsIGFsaWFzOiBzdHJpbmcpID0+IHtcblx0XHRcdC8vIHNob3dpbmcgYSBkaWZmZXJlbmNlIGFzIHRoZSBkb3dubG9hZCBBcHAgQXNzZXQgYWxzbyBsb2dzIHRoZSBkb3dubG9hZCBwcm9ncmVzcyB1c2luZyBsb2dJbmZvcm1hdGlvbiBhbmQgbG9nRXJyb3IgdGhyb3VnaCB0aGUgY3VzdG9tIGxvZ2dlci5cblx0XHRcdGNvbnNvbGUubG9nKGBEb3dubG9hZCBwcm9ncmVzcyBmb3IgYWxpYXMgJyR7YWxpYXN9JyBmcm9tICcke3NyY30nOiAke3Byb2dyZXNzfSVgKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gdmFsaWRhdGVkQXBwQXNzZXQ7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=