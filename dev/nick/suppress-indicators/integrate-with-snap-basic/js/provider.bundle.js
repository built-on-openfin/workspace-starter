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

/***/ "./node_modules/@openfin/snap-sdk/openfin.snap.mjs"
/*!*********************************************************!*\
  !*** ./node_modules/@openfin/snap-sdk/openfin.snap.mjs ***!
  \*********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnapServer: () => (/* binding */ p)
/* harmony export */ });
var e={827:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,e.exports.once=function(e,t){return new Promise(function(n,i){function r(n){e.removeListener(t,a),i(n)}function a(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}w(e,t,a,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&w(e,"error",t,n)}(e,r,{once:!0})})},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var s=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function p(e,t,n,i){var r,a,s,p;if(o(n),void 0===(a=e._events)?(a=e._events=Object.create(null),e._eventsCount=0):(void 0!==a.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),a=e._events),s=a[t]),void 0===s)s=a[t]=n,++e._eventsCount;else if("function"==typeof s?s=a[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=c(e))>0&&s.length>r&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,p=l,console&&console.warn&&console.warn(p)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=l.bind(i);return r.listener=n,i.wrapFn=r,r}function d(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):f(r,r.length)}function u(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function w(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function r(a){i.once&&e.removeEventListener(t,r),n(a)})}}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,a=this._events;if(void 0!==a)r=r&&void 0===a.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var o=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw o.context=s,o}var c=a[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var p=c.length,l=f(c,p);for(n=0;n<p;++n)i(l[n],this,t)}return!0},a.prototype.addListener=function(e,t){return p(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return p(this,e,t,!0)},a.prototype.once=function(e,t){return o(t),this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,r,a,s;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,a=n.length-1;a>=0;a--)if(n[a]===t||n[a].listener===t){s=n[a].listener,r=a;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,a=Object.keys(n);for(i=0;i<a.length;++i)"removeListener"!==(r=a[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return d(this,e,!0)},a.prototype.rawListeners=function(e){return d(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},a.prototype.listenerCount=u,a.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i=n(827);const r="openfin-snap",a="1.6.1",s=(e,t)=>`${e} ${t instanceof Error?t.message:"string"==typeof t?t:JSON.stringify(t)}`,o=async()=>{try{return(await fin.System.getAppAssetInfo({alias:r})).version===a}catch(e){return!1}},c="internal-generated-window-";class p{constructor(e,t=1e4,n=5e3){if(this.server_id=e,this.emitter=new i.EventEmitter,this.__extensions=[],this.snapServerStatus="disconnected",this.healthCheckInitializing=!1,this.isSnapshotPreparedForApply=!1,this.pendingWindowRegistrations=0,this.preparedWindowRegistrationClientIds=new Set,this.pendingRegistrationPromises=new Set,!fin)throw new Error("OpenFin is not available");if(t<1e3)throw new Error(`healthCheckIntervalMs must be at least 1000ms (provided: ${t}ms). Values below this are excessive and cause unnecessary overhead.`);if(n<500)throw new Error(`healthCheckTimeoutMs must be at least 500ms (provided: ${n}ms). Timeout must allow sufficient time for network round-trip and server response.`);if(n>=t)throw new Error(`healthCheckTimeoutMs (${n}ms) must be less than healthCheckIntervalMs (${t}ms). This ensures the timeout completes before the next health check begins, allowing time for recovery.`);this.healthCheckIntervalMs=t,this.healthCheckTimeoutMs=n}async start(e){try{const e=await fin.System.getRuntimeInfo();"x64"!==e?.architecture&&console.warn(`The architecture of the connected OpenFin runtime is '${e.architecture}' - Window snapping is currently only supported with 64-bit applications. Snapping will be disabled.`)}catch(e){console.warn(`Could not get runtime info: ${e}`)}const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(t.rawValue){if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL")}e?.executablePath||await(async e=>{const t=await fin.Application.getCurrentSync().getManifest(),n=t.appAssets?.find(e=>e.alias===r);if(n)return void console.warn("Detected Snap package in app manifest appAssets",n);if(await o())return void console.info("Using existing Snap package");const i=e??`https://cdn.openfin.co/release/snap/${a}/snap.zip`;console.info(`Downloading Snap asset from: '${i}'`);const c={alias:r,src:`${i}`,target:"OpenFinSnap.exe",version:a};console.info("Downloading Snap package",c);try{await fin.System.downloadAsset(c,()=>{})}catch(e){throw new Error(s("Unable to download Snap package.",e))}})(e?.customSnapAssetSource);const n=await this.build_command_line(e);let i={alias:r,arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error(s("Failed to launch the Snap server.",e))}return this.connect()}async connect(){await this.internalConnect(!0)}__addExtension(e){this.__extensions.push(e)}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async showDebugWindow(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"showDebugWindow",payload:{show:e}}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e,t=!0){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e,reset:t}}))}async enterDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"enterBatchMode"}))}async exitDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"exitBatchMode"}))}async prepareToApplySnapshot(e,t){this.preparedWindowRegistrationClientIds.clear(),this.isSnapshotPreparedForApply=!1;if(!e||e.options?.closeExistingWindows||e.options?.closeSnapshotWindows)return this.needToResetLayout=!0,void await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}));this.needToResetLayout=!1;const n=e.snapshot,i=JSON.stringify(n,null,2),r=n.snap;if(!r)return;await(this.client?.dispatch("snap_api_invoke",{action:"prepareToApplyLayout"}));const a=t??w,s=(await this.getLayout())?.clients.map(e=>e.id)??[],o=u(n.windows),c=Array.from(o.keys()).filter(e=>s.includes(e));r.clients.filter(e=>c.includes(e.id)).forEach(e=>{const t=e.id,n=a(t);e.id=n,f(r.connections,t,n);const i=o.get(t);i.customData.snapClientId=n,i.name=n});const p=JSON.stringify(n,null,2);console.debug(`Snap SDK modified snapshot data before applying it.\nOriginal snapshot:\n${i}\nModified snapshot:\n${p}`),this.isSnapshotPreparedForApply=!0}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){if(!this.isSnapshotPreparedForApply)throw new Error("prepareToApplySnapshot must be called before applySnapshot.");try{if(!e.snap)return;const t=e.snap.clients?.map(e=>e.id)??[];if(0===t.length)return;await this.drainPendingWindowRegistrations(t),await this.setLayout(e.snap,this.needToResetLayout)}finally{this.isSnapshotPreparedForApply=!1,this.preparedWindowRegistrationClientIds.clear()}}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");e.appAssetInfo&&(e.path=await l({target:e.path,...e.appAssetInfo})),console.log("options: ",e);const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t,n){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t,resizingBehavior:n}}))}async enableAutoWindowRegistration(){const e=e=>{this.handleNewWindow(e)};return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async getClientIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{nativeWindowId:Number.NaN}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getClientIdForWindow",payload:t}));if(!n.payload.clientId)throw new Error("No client ID found for window");return n.payload.clientId}async getGroupIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getGroupIdForWindow",payload:t}));if(!n.payload.groupId)throw new Error("No group found for window");return n.payload.groupId}async getWindowResizable(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getResizable",payload:t}));if(null===n.payload.resizable)throw new Error("No window found for given ID");return n.payload.resizable}async setWindowResizable(e,t){const n="number"==typeof e?{nativeWindowId:e,resizable:t}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e,resizable:t}:{nativeWindowId:this.hexStringToNumber(e),resizable:t};await(this.client?.dispatch("snap_api_invoke",{action:"setResizable",payload:n}))}async getWindowsInGroup(e){const t=await(this.client?.dispatch("snap_api_invoke",{action:"getWindowsInGroup",payload:{groupId:e}}));return t.payload.windows?t.payload.windows.map(e=>({nativeId:e[0],clientId:e[1]})):[]}async getAllGroupIds(){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAllGroupIds"}))).payload.groupIds}async minimizeGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"minimizeGroup",payload:{groupId:e}}))}async restoreGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"restoreGroup",payload:{groupId:e}}))}getSnapServerStatus(){return this.snapServerStatus}handleSnapServerDisconnection(){this.stopHealthCheck(),this.client=void 0,this.setSnapServerStatus("disconnected"),console.warn("SnapSDK: Disconnected from Snap server, attempt reconnect."),this.internalConnect(!1)}async internalConnect(e){if(this.stopHealthCheck(),this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",async(t,n)=>{try{e&&await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:t.version,componentName:"snap-server"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}}),this.client.onDisconnection(()=>this.handleSnapServerDisconnection()),e)try{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"1.6.1",componentName:"snap-client"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}this.client.register("snap_updates",(e,t)=>this.handleSnapEvents(e,t)),this.setSnapServerStatus("connected"),this.startHealthCheck(),this.__extensions.forEach(e=>e.onConnected(this.client))}setSnapServerStatus(e){this.snapServerStatus!==e&&(this.snapServerStatus=e,"disconnected"===e?this.emit_event("snap-server-disconnected",{}):"no-response"===e&&this.emit_event("snap-server-no-response",{timestamp:Date.now()}))}startHealthCheck(){if("disconnected"!==this.snapServerStatus&&!this.healthCheckInitializing&&!this.healthCheckInterval){this.healthCheckInitializing=!0;try{this.healthCheckInterval=setInterval(async()=>{if("disconnected"!==this.snapServerStatus&&this.client)try{const e=new Promise((e,t)=>{setTimeout(()=>t(new Error("Snap server response timeout")),this.healthCheckTimeoutMs)}),t=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),n=await Promise.race([this.client?.dispatch("snap_api_invoke",{action:"healthCheck",payload:{nonce:t}})||Promise.reject(new Error("Client is not available")),e]);if(!this.client)return void this.setSnapServerStatus("disconnected");if(!n?.payload||n.payload.nonce!==t)throw new Error("Health check validation failed - nonce mismatch");"no-response"===this.snapServerStatus&&this.setSnapServerStatus("connected")}catch(e){this.client?this.setSnapServerStatus("no-response"):this.setSnapServerStatus("disconnected")}},this.healthCheckIntervalMs)}finally{this.healthCheckInitializing=!1}}}stopHealthCheck(){this.healthCheckInterval&&(clearInterval(this.healthCheckInterval),this.healthCheckInterval=void 0)}handleNewWindow(e){const t=this.handleNewWindowWork(e);this.pendingRegistrationPromises.add(t),t.finally(()=>{this.pendingRegistrationPromises.delete(t)})}async handleNewWindowWork(e){this.pendingWindowRegistrations+=1;try{await this.handleNewWindowImpl(e)}finally{this.pendingWindowRegistrations-=1}}async drainPendingWindowRegistrations(e){const t=new Set(e);let n=Array.from(t).filter(e=>!this.preparedWindowRegistrationClientIds.has(e));if(await new Promise(e=>{const i=performance.now(),r=setInterval(()=>{n=Array.from(t).filter(e=>!this.preparedWindowRegistrationClientIds.has(e)),(0===n.length||performance.now()-i>=p.PENDING_REGISTRATION_DRAIN_MS)&&(clearInterval(r),e())},25)}),n.length>0){const e=`SnapSDK: Timed out waiting for window registrations, missing=[${n.join(", ")}]`;throw console.warn(e),new Error(e)}const i=[...this.pendingRegistrationPromises];let r=!1;if(await Promise.race([Promise.all(i),new Promise(e=>{setTimeout(()=>{r=!0,e()},p.PENDING_REGISTRATION_DRAIN_MS)})]),r&&this.pendingRegistrationPromises.size>0){const e=`SnapSDK: Timed out draining window registrations after ${p.PENDING_REGISTRATION_DRAIN_MS}ms, still in flight=${this.pendingRegistrationPromises.size}`;throw console.warn(e),new Error(e)}}async handleNewWindowImpl(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const r=await t.getOptions();if(void 0!==r.includeInSnapshots&&!1===r.includeInSnapshots)return void console.log(`SnapSDK: Not registering ${e.uuid}:${e.name}, Window is explicitly excluded -includeInSnapshots == false`);const a=r.customData||{};a.snapClientId?i=a.snapClientId:await t.updateOptions({customData:{...a,snapClientId:i}}),console.log(`SnapSDK: Auto-registering window: snapClientId:${i}, handle ${n}, uuid:${e.uuid}, name:${e.name}`),this.preparedWindowRegistrationClientIds.add(i),await this.registerWindow(i,n,a.snapResizingBehavior)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}hexStringToNumber(e){const t=e?.trim();return/^0x[0-9a-f]+$/i.test(t)?Number(t):NaN}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug "),e?.disableGPUAcceleratedDragging&&(t+=" --disable-gpu-accelerated-dragging true "),e?.disableBlurDropPreview&&(t+=" --blur-drop-preview false "),void 0!==e?.blurEffectPerformanceThreshold&&(t+=` --blur-effect-performance-threshold=${e?.blurEffectPerformanceThreshold} `),e?.disableUserUnstick&&(t+=" --disable-user-unstick "),!0!==e?.keyToStick&&"string"!=typeof e?.keyToStick||(t+=` --ks=${!0===e.keyToStick?"ctrl":e.keyToStick} `),e?.keyToUnstick&&(t+=` --kus=${e.keyToUnstick} `),e?.keyToGroupStick&&(t+=` --kgs=${e.keyToGroupStick} `),e?.blockOverlapGroupSnapping&&(t+=" --block-overlap-group-snapping "),e?.hideTaskbarEntry&&(t+=" --no-tb "),e?.taskbarIconGroup&&(t+=` --tb-id=${e?.taskbarIconGroup} `),e?.taskbarIcon&&(t+=` --tb-icon=${e?.taskbarIcon} `),e?.disableRuntimeHeartbeating&&(t+=" --no-hb "),e?.autoHideClientTaskbarIcons&&(t+=" --tb-auto-hide "),e?.theme&&(t+=` --thm=${e.theme} `),e?.defaultResizingBehavior&&(t+=` --res=${e?.defaultResizingBehavior} `);const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}p.PENDING_REGISTRATION_DRAIN_MS=15e3;const l=async e=>{let t=(await fin.System.getRuntimeInfo()).args["local-startup-url"].replace("config.json","");const n=t.includes("\\")?"\\":"/";return t.endsWith(n)&&(t=t.slice(0,-1)),[t,"assets",e.alias,e.version,e.target].join(n)},h=()=>"undefined"!=typeof crypto&&"randomUUID"in crypto&&"function"==typeof crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),d=e=>/^app:\/[^/]+\/[^/]+$/.test(e??""),u=e=>{const t=new Map;return e.forEach(e=>{const n=!e.name,i=e.name?.startsWith(c)??!1,r=e.customData?.snapClientId;(n||i||d(e.name))&&r&&t.set(r,e)}),t},f=(e,t,n)=>{Object.values(e).forEach(e=>{e.attachedClientId===t?e.attachedClientId=n:e.targetClientId===t&&(e.targetClientId=n)})},w=e=>{if(!d(e))return`${c}${h()}`;const t=e.split("/");return t[t.length-1]=h(),t.join("/")};

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./client/src/provider.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _openfin_snap_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/snap-sdk */ "./node_modules/@openfin/snap-sdk/openfin.snap.mjs");
/* harmony import */ var _app_asset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-asset */ "./client/src/app-asset.ts");


const TEST_APP_WINDOW_ID = "snap-example-native-test-app-id";
const snapDefaultUrl = "https://cdn.openfin.co/release/snap/1.6.1/snap.zip";
const snapVersion = "1.6.1";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDdkIsY0FBYyxDQUNiLHNEQUFzRCxpQkFBaUIsc0ZBQXNGLENBQzdKLENBQUM7UUFDRixPQUFPO1lBQ04sT0FBTyxFQUFFLElBQUk7WUFDYixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLGFBQWEsRUFBRSxpQkFBaUIsS0FBSyxXQUFXO1NBQ2hELENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILEtBQUssVUFBVSxhQUFhLENBQUMsWUFBa0M7SUFDOUQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLDREQUFnQixDQUFDLFlBQVksRUFBRTtRQUM5RCxNQUFNLEVBQUUsWUFBWTtRQUNwQixxQkFBcUIsRUFBRSxDQUFDLFFBQWdCLEVBQUUsR0FBVyxFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQ3ZFLDhJQUE4STtZQUM5SSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxLQUFLLFdBQVcsR0FBRyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbkYsQ0FBQztLQUNELENBQUMsQ0FBQztJQUNILE9BQU8saUJBQWlCLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vY2xpZW50L3NyYy9hcHAtYXNzZXQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vc25hcC1zZGsvb3BlbmZpbi5zbmFwLm1qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vY2xpZW50L3NyYy9wcm92aWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE9wZW5GaW4gfSBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBsb2dnZXIuXG4gKi9cbmludGVyZmFjZSBMb2dnZXIge1xuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgaW5mb3JtYXRpb24uXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRpbmZvKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YSBhcyBlcnJvci5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdGVycm9yKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBMb2cgZGF0YSBhcyB3YXJuaW5nLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0d2FybihtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgdHJhY2UuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHR0cmFjZShtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgZGVidWcuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRkZWJ1ZyhtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcbn1cblxuLyoqXG4gKiBGb3IgZnVuY3Rpb25hbGl0eSB0aGF0IHJlcXVpcmVzIGFuIGFwcCBhc3NldCwgdGhpcyBmdW5jdGlvbiB3aWxsIGF0dGVtcHQgdG8gZmV0Y2ggdGhlIGFwcCBhc3NldCBmcm9tIHRoZSBwYXNzZWQgZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSBhcHBBc3NldERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGFwcCBhc3NldCB0byBmZXRjaC5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9iamVjdCBjb250YWluaW5nIGEgbG9nZ2VyIHRvIGxvZyBhbnkgaW5mbyBvciBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIHByb2Nlc3MgYW5kIGEgZnVuY3Rpb24gdG8gY2FwdHVyZSBwcm9ncmVzcy5cbiAqIEBwYXJhbSBvcHRpb25zLmxvZ2dlciAtIEEgbG9nZ2VyIHRvIGxvZyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBmZXRjaGluZyBvZiB0aGUgYXBwIGFzc2V0LlxuICogQHBhcmFtIG9wdGlvbnMuYXNzZXREb3dubG9hZFByb2dyZXNzIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBvcnQgdGhlIHByb2dyZXNzIG9mIHRoZSBhc3NldCBkb3dubG9hZC5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhcHAgYXNzZXQgaW5mbyBpZiB0aGUgYXBwIGFzc2V0IHdhcyBzdWNjZXNzZnVsbHkgZmV0Y2hlZCwgb3IgdW5kZWZpbmVkIGlmIGJvdGggYXR0ZW1wdHMgZmFpbGVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRBcHBBc3NldChcblx0YXBwQXNzZXREZWZpbml0aW9uOiBPcGVuRmluLkFwcEFzc2V0SW5mbyxcblx0b3B0aW9ucz86IHtcblx0XHRsb2dnZXI/OiBMb2dnZXI7XG5cdFx0YXNzZXREb3dubG9hZFByb2dyZXNzPzogKHByb2dyZXNzOiBudW1iZXIsIHNyYzogc3RyaW5nLCBhbGlhczogc3RyaW5nKSA9PiB2b2lkO1xuXHR9XG4pOiBQcm9taXNlPE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkPiB7XG5cdGNvbnN0IHNyYyA9IGFwcEFzc2V0RGVmaW5pdGlvbi5zcmM7XG5cdGNvbnN0IGxvZ2dlciA9IG9wdGlvbnM/LmxvZ2dlcjtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKHNyYykpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgc3JjIGJlaW5nIGRlZmluZWRcIik7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICghYXBwQXNzZXREZWZpbml0aW9uLnNyYy5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXG5cdFx0XHRcIlBsZWFzZSBwcm92aWRlIGEgdmFsaWQgVVJMIGZvciB0aGUgYXBwIGFzc2V0IHNyYy4gT25seSBIVFRQIGFuZCBIVFRQUyBwcm90b2NvbHMgYXJlIHN1cHBvcnRlZC4gV2l0aCBodHRwcyBwcmVmZXJyZWQgZm9yIHNlY3VyaXR5IHJlYXNvbnMuXCJcblx0XHQpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRjb25zdCBhbGlhcyA9IGFwcEFzc2V0RGVmaW5pdGlvbi5hbGlhcztcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKGFsaWFzKSkge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJDYW5ub3QgaW5pdGlhbGl6ZSBBcHAgQXNzZXQgRG93bmxvYWQgd2l0aG91dCBhbGlhcyBiZWluZyBkZWZpbmVkXCIpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXQgPSBhcHBBc3NldERlZmluaXRpb24udGFyZ2V0O1xuXHRpZiAoIWlzU3RyaW5nVmFsdWUodGFyZ2V0KSkge1xuXHRcdGxvZ2dlcj8uZXJyb3IoXCJDYW5ub3QgaW5pdGlhbGl6ZSBBcHAgQXNzZXQgRG93bmxvYWQgd2l0aG91dCB0YXJnZXQgYmVpbmcgZGVmaW5lZFwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgdmVyc2lvbiA9IGFwcEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9uO1xuXHRpZiAoIWlzU3RyaW5nVmFsdWUodmVyc2lvbikpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgdmVyc2lvbiBiZWluZyBkZWZpbmVkXCIpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc3NldERlZmluaXRpb246IE9wZW5GaW4uQXBwQXNzZXRJbmZvID0ge1xuXHRcdGFsaWFzLFxuXHRcdHNyYyxcblx0XHR0YXJnZXQsXG5cdFx0dmVyc2lvbixcblx0XHRtYW5kYXRvcnk6IGFwcEFzc2V0RGVmaW5pdGlvbi5tYW5kYXRvcnksXG5cdFx0YXJnczogYXBwQXNzZXREZWZpbml0aW9uLmFyZ3Ncblx0fTtcblxuXHRjb25zdCBhcHBBc3NldEluZm8gPSBhd2FpdCBkb2VzQXBwQXNzZXRFeGlzdCh0YXJnZXRBc3NldERlZmluaXRpb24uYWxpYXMsIHRhcmdldEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9uKTtcblx0aWYgKGFwcEFzc2V0SW5mbykge1xuXHRcdG9wdGlvbnM/LmxvZ2dlcj8uaW5mbyhcblx0XHRcdGBBcHAgYXNzZXQgd2l0aCBhbGlhcyAke3RhcmdldEFzc2V0RGVmaW5pdGlvbi5hbGlhc30gdmVyc2lvbiAke3RhcmdldEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9ufSBhbmQgc3JjICR7dGFyZ2V0QXNzZXREZWZpbml0aW9uLnNyY30gYWxyZWFkeSBleGlzdHMuIE5vIG5lZWQgdG8gZG93bmxvYWQuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIGFwcEFzc2V0SW5mbztcblx0fVxuXG5cdGNvbnN0IGhhc0Rvd25sb2FkQXBwQXNzZXRzID0gYXdhaXQgZ2V0Q2FuRG93bmxvYWRBcHBBc3NldHMobG9nZ2VyKTtcblxuXHRpZiAoIWhhc0Rvd25sb2FkQXBwQXNzZXRzKSB7XG5cdFx0bG9nZ2VyPy53YXJuKFwiVGhlIHBsYXRmb3JtIGRvZXMgbm90IGhhdmUgdGhlIGNhcGFiaWxpdHkgb3IgcGVybWlzc2lvbiB0byBkb3dubG9hZCBhcHAgYXNzZXRzLlwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0cmV0dXJuIGRvd25sb2FkQXBwQXNzZXREZWZpbml0aW9uKHRhcmdldEFzc2V0RGVmaW5pdGlvbiwgb3B0aW9ucyk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gYXBwIGFzc2V0IGV4aXN0cyBhbmQgb3B0aW9uYWxseSB2YWxpZGF0ZSB2ZXJzaW9uIGFuZCBzb3VyY2UgVVJMLlxuICogQHBhcmFtIGFsaWFzIFRoZSBhbGlhcyB5b3Ugd2FudCB0byBjaGVjayBmb3JcbiAqIEBwYXJhbSB2ZXJzaW9uIFRoZSB2ZXJzaW9uIHlvdSB3YW50IHRvIGNoZWNrIGZvciAob3B0aW9uYWwpXG4gKiBAcGFyYW0gc3JjIFRoZSBzb3VyY2UgVVJMIHlvdSB3YW50IHRvIGNoZWNrIGZvciAob3B0aW9uYWwpXG4gKiBAcmV0dXJucyBUaGUgYXBwIGFzc2V0IGluZm8gaWYgaXQgZXhpc3RzLCBvdGhlcndpc2UgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb2VzQXBwQXNzZXRFeGlzdChcblx0YWxpYXM6IHN0cmluZyxcblx0dmVyc2lvbj86IHN0cmluZyxcblx0c3JjPzogc3RyaW5nXG4pOiBQcm9taXNlPE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkPiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oeyBhbGlhcyB9KTtcblx0XHRpZiAodmVyc2lvbiAmJiBhcHBBc3NldEluZm8udmVyc2lvbiAhPT0gdmVyc2lvbikge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKHNyYyAmJiBhcHBBc3NldEluZm8uc3JjICE9PSBzcmMpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBhcHBBc3NldEluZm87XG5cdH0gY2F0Y2gge1xuXHRcdC8vIGFzc2V0IGRvZXMgbm90IGV4aXN0IG9yIHVybCBkb2VzIG5vdCBtYXRjaCwgcmV0dXJuIHVuZGVmaW5lZFxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogRG93bmxvYWQgYW4gYXBwIGFzc2V0IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkZWZpbml0aW9uIGFuZCBvcHRpb25zLlxuICogQHBhcmFtIGFwcEFzc2V0RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgYXBwIGFzc2V0IHRvIGRvd25sb2FkLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBsb2dnZXIgdG8gbG9nIGFueSBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIHByb2Nlc3MsIGFuZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlcG9ydCB0aGUgcHJvZ3Jlc3Mgb2YgdGhlIGFzc2V0IGRvd25sb2FkLlxuICogQHBhcmFtIG9wdGlvbnMubG9nZ2VyIC0gQSBsb2dnZXIgdG8gbG9nIGFueSBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIGRvd25sb2FkaW5nIG9mIHRoZSBhcHAgYXNzZXQuXG4gKiBAcGFyYW0gb3B0aW9ucy5hc3NldERvd25sb2FkUHJvZ3Jlc3MgLSBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlcG9ydCB0aGUgcHJvZ3Jlc3Mgb2YgdGhlIGFzc2V0IGRvd25sb2FkLlxuICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGFwcCBhc3NldCBpbmZvIGlmIHRoZSBhcHAgYXNzZXQgd2FzIHN1Y2Nlc3NmdWxseSBkb3dubG9hZGVkLCBvciB1bmRlZmluZWQgaWYgYW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRoZSBkb3dubG9hZC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRBcHBBc3NldERlZmluaXRpb24oXG5cdGFwcEFzc2V0RGVmaW5pdGlvbjogT3BlbkZpbi5BcHBBc3NldEluZm8sXG5cdG9wdGlvbnM/OiB7XG5cdFx0bG9nZ2VyPzogTG9nZ2VyO1xuXHRcdGFzc2V0RG93bmxvYWRQcm9ncmVzcz86IChwcm9ncmVzczogbnVtYmVyLCBzcmM6IHN0cmluZywgYWxpYXM6IHN0cmluZykgPT4gdm9pZDtcblx0fVxuKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHRsZXQgZmV0Y2hlZE9yRXhpc3RpbmdBcHBBc3NldDogT3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQ7XG5cdHRyeSB7XG5cdFx0YXdhaXQgZmluLlN5c3RlbS5kb3dubG9hZEFzc2V0KGFwcEFzc2V0RGVmaW5pdGlvbiwgKHByb2dyZXNzKSA9PiB7XG5cdFx0XHRjb25zdCBkb3dubG9hZGVkUGVyY2VudCA9IE1hdGguZmxvb3IoKHByb2dyZXNzLmRvd25sb2FkZWRCeXRlcyAvIHByb2dyZXNzLnRvdGFsQnl0ZXMpICogMTAwKTtcblx0XHRcdGlmIChvcHRpb25zPy5hc3NldERvd25sb2FkUHJvZ3Jlc3MpIHtcblx0XHRcdFx0b3B0aW9ucy5hc3NldERvd25sb2FkUHJvZ3Jlc3MoZG93bmxvYWRlZFBlcmNlbnQsIGFwcEFzc2V0RGVmaW5pdGlvbi5zcmMsIGFwcEFzc2V0RGVmaW5pdGlvbi5hbGlhcyk7XG5cdFx0XHR9XG5cdFx0XHRvcHRpb25zPy5sb2dnZXI/LmluZm8oXG5cdFx0XHRcdGBEb3dubG9hZGVkICR7ZG93bmxvYWRlZFBlcmNlbnR9JSBvZiBhcHAgYXNzZXQgd2l0aCBhbGlhcyAke2FwcEFzc2V0RGVmaW5pdGlvbi5hbGlhc30gYW5kIHZlcnNpb24gJHthcHBBc3NldERlZmluaXRpb24udmVyc2lvbn0gYW5kIHVybCAke2FwcEFzc2V0RGVmaW5pdGlvbi5zcmN9YFxuXHRcdFx0KTtcblx0XHR9KTtcblx0XHQvLyBleHRyYSBjb25maXJtYXRpb24gdXNpbmcgdGhlIGFwcHJvYWNoICB1c2VkIHRvIHZhbGlkYXRlIHRoZSBleGlzdGVuY2Ugb2YgYW4gYXNzZXQuXG5cdFx0ZmV0Y2hlZE9yRXhpc3RpbmdBcHBBc3NldCA9IGF3YWl0IGRvZXNBcHBBc3NldEV4aXN0KFxuXHRcdFx0YXBwQXNzZXREZWZpbml0aW9uLmFsaWFzLFxuXHRcdFx0YXBwQXNzZXREZWZpbml0aW9uLnZlcnNpb24sXG5cdFx0XHRhcHBBc3NldERlZmluaXRpb24uc3JjXG5cdFx0KTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0b3B0aW9ucz8ubG9nZ2VyPy5lcnJvcihgVW5hYmxlIHRvIGZldGNoIEFwcCBBc3NldCAke2Zvcm1hdEVycm9yKGVycil9YCk7XG5cdH1cblx0cmV0dXJuIGZldGNoZWRPckV4aXN0aW5nQXBwQXNzZXQ7XG59XG5cbi8qKlxuICogRG8gd2UgaGF2ZSB0aGUgcGVybWlzc2lvbnMgdG8gZG93bmxvYWQgYXBwIGFzc2V0cy5cbiAqIEBwYXJhbSBsb2dnZXIgT3B0aW9uYWwgbG9nZ2VyIHRvIGxvZyBlcnJvcnMuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHdlIGhhdmUgcGVybWlzc2lvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENhbkRvd25sb2FkQXBwQXNzZXRzKGxvZ2dlcj86IExvZ2dlcik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRsZXQgY2FuRG93bmxvYWRBcHBBc3NldHM6IGJvb2xlYW4gPSBmYWxzZTtcblx0dHJ5IHtcblx0XHRjb25zdCBjYW5Eb3dubG9hZEFwcEFzc2V0c1Jlc3BvbnNlID1cblx0XHRcdGF3YWl0IGZpbi5TeXN0ZW0ucXVlcnlQZXJtaXNzaW9uRm9yQ3VycmVudENvbnRleHQoXCJTeXN0ZW0uZG93bmxvYWRBc3NldFwiKTtcblx0XHRjYW5Eb3dubG9hZEFwcEFzc2V0cyA9IGNhbkRvd25sb2FkQXBwQXNzZXRzUmVzcG9uc2U/LmdyYW50ZWQ7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihgRXJyb3Igd2hpbGUgcXVlcnlpbmcgZm9yIFN5c3RlbS5kb3dubG9hZEFzc2V0IHBlcm1pc3Npb24gJHtmb3JtYXRFcnJvcihlcnJvcil9YCk7XG5cdFx0Y2FuRG93bmxvYWRBcHBBc3NldHMgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gY2FuRG93bmxvYWRBcHBBc3NldHM7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiAhaXNFbXB0eSh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5mdW5jdGlvbiBpc1N0cmluZ1ZhbHVlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0cmV0dXJuIGlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID4gMDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSB1bmRlZmluZWQgb3IgbnVsbC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bGwgfCB1bmRlZmluZWQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGw7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgb2JqZWN0IHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG59XG5cbi8qKlxuICogRm9ybWF0IGFuIGVycm9yIHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gZm9ybWF0LlxuICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nVmFsdWUoZXJyKSkge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuIiwidmFyIGU9ezgyNzplPT57dmFyIHQsbj1cIm9iamVjdFwiPT10eXBlb2YgUmVmbGVjdD9SZWZsZWN0Om51bGwsaT1uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLmFwcGx5P24uYXBwbHk6ZnVuY3Rpb24oZSx0LG4pe3JldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChlLHQsbil9O3Q9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5vd25LZXlzP24ub3duS2V5czpPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzP2Z1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKSl9OmZ1bmN0aW9uKGUpe3JldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlKX07dmFyIHI9TnVtYmVyLmlzTmFOfHxmdW5jdGlvbihlKXtyZXR1cm4gZSE9ZX07ZnVuY3Rpb24gYSgpe2EuaW5pdC5jYWxsKHRoaXMpfWUuZXhwb3J0cz1hLGUuZXhwb3J0cy5vbmNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4saSl7ZnVuY3Rpb24gcihuKXtlLnJlbW92ZUxpc3RlbmVyKHQsYSksaShuKX1mdW5jdGlvbiBhKCl7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5yZW1vdmVMaXN0ZW5lciYmZS5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsciksbihbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpfXcoZSx0LGEse29uY2U6ITB9KSxcImVycm9yXCIhPT10JiZmdW5jdGlvbihlLHQsbil7XCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbiYmdyhlLFwiZXJyb3JcIix0LG4pfShlLHIse29uY2U6ITB9KX0pfSxhLkV2ZW50RW1pdHRlcj1hLGEucHJvdG90eXBlLl9ldmVudHM9dm9pZCAwLGEucHJvdG90eXBlLl9ldmVudHNDb3VudD0wLGEucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnM9dm9pZCAwO3ZhciBzPTEwO2Z1bmN0aW9uIG8oZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKX1mdW5jdGlvbiBjKGUpe3JldHVybiB2b2lkIDA9PT1lLl9tYXhMaXN0ZW5lcnM/YS5kZWZhdWx0TWF4TGlzdGVuZXJzOmUuX21heExpc3RlbmVyc31mdW5jdGlvbiBwKGUsdCxuLGkpe3ZhciByLGEscyxwO2lmKG8obiksdm9pZCAwPT09KGE9ZS5fZXZlbnRzKT8oYT1lLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSxlLl9ldmVudHNDb3VudD0wKToodm9pZCAwIT09YS5uZXdMaXN0ZW5lciYmKGUuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxuLmxpc3RlbmVyP24ubGlzdGVuZXI6biksYT1lLl9ldmVudHMpLHM9YVt0XSksdm9pZCAwPT09cylzPWFbdF09biwrK2UuX2V2ZW50c0NvdW50O2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygcz9zPWFbdF09aT9bbixzXTpbcyxuXTppP3MudW5zaGlmdChuKTpzLnB1c2gobiksKHI9YyhlKSk+MCYmcy5sZW5ndGg+ciYmIXMud2FybmVkKXtzLndhcm5lZD0hMDt2YXIgbD1uZXcgRXJyb3IoXCJQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuIFwiK3MubGVuZ3RoK1wiIFwiK1N0cmluZyh0KStcIiBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0XCIpO2wubmFtZT1cIk1heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZ1wiLGwuZW1pdHRlcj1lLGwudHlwZT10LGwuY291bnQ9cy5sZW5ndGgscD1sLGNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKHApfXJldHVybiBlfWZ1bmN0aW9uIGwoKXtpZighdGhpcy5maXJlZClyZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLHRoaXMud3JhcEZuKSx0aGlzLmZpcmVkPSEwLDA9PT1hcmd1bWVudHMubGVuZ3RoP3RoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk6dGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCxhcmd1bWVudHMpfWZ1bmN0aW9uIGgoZSx0LG4pe3ZhciBpPXtmaXJlZDohMSx3cmFwRm46dm9pZCAwLHRhcmdldDplLHR5cGU6dCxsaXN0ZW5lcjpufSxyPWwuYmluZChpKTtyZXR1cm4gci5saXN0ZW5lcj1uLGkud3JhcEZuPXIscn1mdW5jdGlvbiBkKGUsdCxuKXt2YXIgaT1lLl9ldmVudHM7aWYodm9pZCAwPT09aSlyZXR1cm5bXTt2YXIgcj1pW3RdO3JldHVybiB2b2lkIDA9PT1yP1tdOlwiZnVuY3Rpb25cIj09dHlwZW9mIHI/bj9bci5saXN0ZW5lcnx8cl06W3JdOm4/ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBBcnJheShlLmxlbmd0aCksbj0wO248dC5sZW5ndGg7KytuKXRbbl09ZVtuXS5saXN0ZW5lcnx8ZVtuXTtyZXR1cm4gdH0ocik6ZihyLHIubGVuZ3RoKX1mdW5jdGlvbiB1KGUpe3ZhciB0PXRoaXMuX2V2ZW50cztpZih2b2lkIDAhPT10KXt2YXIgbj10W2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG4pcmV0dXJuIDE7aWYodm9pZCAwIT09bilyZXR1cm4gbi5sZW5ndGh9cmV0dXJuIDB9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgbj1uZXcgQXJyYXkodCksaT0wO2k8dDsrK2kpbltpXT1lW2ldO3JldHVybiBufWZ1bmN0aW9uIHcoZSx0LG4saSl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbilpLm9uY2U/ZS5vbmNlKHQsbik6ZS5vbih0LG4pO2Vsc2V7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZS5hZGRFdmVudExpc3RlbmVyKXRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcrdHlwZW9mIGUpO2UuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uIHIoYSl7aS5vbmNlJiZlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxyKSxuKGEpfSl9fU9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLFwiZGVmYXVsdE1heExpc3RlbmVyc1wiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBzfSxzZXQ6ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8cihlKSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrZStcIi5cIik7cz1lfX0pLGEuaW5pdD1mdW5jdGlvbigpe3ZvaWQgMCE9PXRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzIT09T2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKSx0aGlzLl9tYXhMaXN0ZW5lcnM9dGhpcy5fbWF4TGlzdGVuZXJzfHx2b2lkIDB9LGEucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbihlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZXx8ZTwwfHxyKGUpKXRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJytlK1wiLlwiKTtyZXR1cm4gdGhpcy5fbWF4TGlzdGVuZXJzPWUsdGhpc30sYS5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKCl7cmV0dXJuIGModGhpcyl9LGEucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVtdLG49MTtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKXQucHVzaChhcmd1bWVudHNbbl0pO3ZhciByPVwiZXJyb3JcIj09PWUsYT10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09YSlyPXImJnZvaWQgMD09PWEuZXJyb3I7ZWxzZSBpZighcilyZXR1cm4hMTtpZihyKXt2YXIgcztpZih0Lmxlbmd0aD4wJiYocz10WzBdKSxzIGluc3RhbmNlb2YgRXJyb3IpdGhyb3cgczt2YXIgbz1uZXcgRXJyb3IoXCJVbmhhbmRsZWQgZXJyb3IuXCIrKHM/XCIgKFwiK3MubWVzc2FnZStcIilcIjpcIlwiKSk7dGhyb3cgby5jb250ZXh0PXMsb312YXIgYz1hW2VdO2lmKHZvaWQgMD09PWMpcmV0dXJuITE7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYylpKGMsdGhpcyx0KTtlbHNle3ZhciBwPWMubGVuZ3RoLGw9ZihjLHApO2ZvcihuPTA7bjxwOysrbilpKGxbbl0sdGhpcyx0KX1yZXR1cm4hMH0sYS5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcCh0aGlzLGUsdCwhMSl9LGEucHJvdG90eXBlLm9uPWEucHJvdG90eXBlLmFkZExpc3RlbmVyLGEucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBwKHRoaXMsZSx0LCEwKX0sYS5wcm90b3R5cGUub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBvKHQpLHRoaXMub24oZSxoKHRoaXMsZSx0KSksdGhpc30sYS5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3JldHVybiBvKHQpLHRoaXMucHJlcGVuZExpc3RlbmVyKGUsaCh0aGlzLGUsdCkpLHRoaXN9LGEucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7dmFyIG4saSxyLGEscztpZihvKHQpLHZvaWQgMD09PShpPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09KG49aVtlXSkpcmV0dXJuIHRoaXM7aWYobj09PXR8fG4ubGlzdGVuZXI9PT10KTA9PT0tLXRoaXMuX2V2ZW50c0NvdW50P3RoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpOihkZWxldGUgaVtlXSxpLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsbi5saXN0ZW5lcnx8dCkpO2Vsc2UgaWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbil7Zm9yKHI9LTEsYT1uLmxlbmd0aC0xO2E+PTA7YS0tKWlmKG5bYV09PT10fHxuW2FdLmxpc3RlbmVyPT09dCl7cz1uW2FdLmxpc3RlbmVyLHI9YTticmVha31pZihyPDApcmV0dXJuIHRoaXM7MD09PXI/bi5zaGlmdCgpOmZ1bmN0aW9uKGUsdCl7Zm9yKDt0KzE8ZS5sZW5ndGg7dCsrKWVbdF09ZVt0KzFdO2UucG9wKCl9KG4sciksMT09PW4ubGVuZ3RoJiYoaVtlXT1uWzBdKSx2b2lkIDAhPT1pLnJlbW92ZUxpc3RlbmVyJiZ0aGlzLmVtaXQoXCJyZW1vdmVMaXN0ZW5lclwiLGUsc3x8dCl9cmV0dXJuIHRoaXN9LGEucHJvdG90eXBlLm9mZj1hLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcixhLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7dmFyIHQsbixpO2lmKHZvaWQgMD09PShuPXRoaXMuX2V2ZW50cykpcmV0dXJuIHRoaXM7aWYodm9pZCAwPT09bi5yZW1vdmVMaXN0ZW5lcilyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuX2V2ZW50c0NvdW50PTApOnZvaWQgMCE9PW5bZV0mJigwPT09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTpkZWxldGUgbltlXSksdGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aCl7dmFyIHIsYT1PYmplY3Qua2V5cyhuKTtmb3IoaT0wO2k8YS5sZW5ndGg7KytpKVwicmVtb3ZlTGlzdGVuZXJcIiE9PShyPWFbaV0pJiZ0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhyKTtyZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJyZW1vdmVMaXN0ZW5lclwiKSx0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wLHRoaXN9aWYoXCJmdW5jdGlvblwiPT10eXBlb2YodD1uW2VdKSl0aGlzLnJlbW92ZUxpc3RlbmVyKGUsdCk7ZWxzZSBpZih2b2lkIDAhPT10KWZvcihpPXQubGVuZ3RoLTE7aT49MDtpLS0pdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHRbaV0pO3JldHVybiB0aGlzfSxhLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIGQodGhpcyxlLCEwKX0sYS5wcm90b3R5cGUucmF3TGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiBkKHRoaXMsZSwhMSl9LGEubGlzdGVuZXJDb3VudD1mdW5jdGlvbihlLHQpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUubGlzdGVuZXJDb3VudD9lLmxpc3RlbmVyQ291bnQodCk6dS5jYWxsKGUsdCl9LGEucHJvdG90eXBlLmxpc3RlbmVyQ291bnQ9dSxhLnByb3RvdHlwZS5ldmVudE5hbWVzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50PjA/dCh0aGlzLl9ldmVudHMpOltdfX19LHQ9e307ZnVuY3Rpb24gbihpKXt2YXIgcj10W2ldO2lmKHZvaWQgMCE9PXIpcmV0dXJuIHIuZXhwb3J0czt2YXIgYT10W2ldPXtleHBvcnRzOnt9fTtyZXR1cm4gZVtpXShhLGEuZXhwb3J0cyxuKSxhLmV4cG9ydHN9bi5kPShlLHQpPT57Zm9yKHZhciBpIGluIHQpbi5vKHQsaSkmJiFuLm8oZSxpKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsaSx7ZW51bWVyYWJsZTohMCxnZXQ6dFtpXX0pfSxuLm89KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpO3ZhciBpPW4oODI3KTtjb25zdCByPVwib3BlbmZpbi1zbmFwXCIsYT1cIjEuNi4xXCIscz0oZSx0KT0+YCR7ZX0gJHt0IGluc3RhbmNlb2YgRXJyb3I/dC5tZXNzYWdlOlwic3RyaW5nXCI9PXR5cGVvZiB0P3Q6SlNPTi5zdHJpbmdpZnkodCl9YCxvPWFzeW5jKCk9Pnt0cnl7cmV0dXJuKGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHthbGlhczpyfSkpLnZlcnNpb249PT1hfWNhdGNoKGUpe3JldHVybiExfX0sYz1cImludGVybmFsLWdlbmVyYXRlZC13aW5kb3ctXCI7Y2xhc3MgcHtjb25zdHJ1Y3RvcihlLHQ9MWU0LG49NWUzKXtpZih0aGlzLnNlcnZlcl9pZD1lLHRoaXMuZW1pdHRlcj1uZXcgaS5FdmVudEVtaXR0ZXIsdGhpcy5fX2V4dGVuc2lvbnM9W10sdGhpcy5zbmFwU2VydmVyU3RhdHVzPVwiZGlzY29ubmVjdGVkXCIsdGhpcy5oZWFsdGhDaGVja0luaXRpYWxpemluZz0hMSx0aGlzLmlzU25hcHNob3RQcmVwYXJlZEZvckFwcGx5PSExLHRoaXMucGVuZGluZ1dpbmRvd1JlZ2lzdHJhdGlvbnM9MCx0aGlzLnByZXBhcmVkV2luZG93UmVnaXN0cmF0aW9uQ2xpZW50SWRzPW5ldyBTZXQsdGhpcy5wZW5kaW5nUmVnaXN0cmF0aW9uUHJvbWlzZXM9bmV3IFNldCwhZmluKXRocm93IG5ldyBFcnJvcihcIk9wZW5GaW4gaXMgbm90IGF2YWlsYWJsZVwiKTtpZih0PDFlMyl0aHJvdyBuZXcgRXJyb3IoYGhlYWx0aENoZWNrSW50ZXJ2YWxNcyBtdXN0IGJlIGF0IGxlYXN0IDEwMDBtcyAocHJvdmlkZWQ6ICR7dH1tcykuIFZhbHVlcyBiZWxvdyB0aGlzIGFyZSBleGNlc3NpdmUgYW5kIGNhdXNlIHVubmVjZXNzYXJ5IG92ZXJoZWFkLmApO2lmKG48NTAwKXRocm93IG5ldyBFcnJvcihgaGVhbHRoQ2hlY2tUaW1lb3V0TXMgbXVzdCBiZSBhdCBsZWFzdCA1MDBtcyAocHJvdmlkZWQ6ICR7bn1tcykuIFRpbWVvdXQgbXVzdCBhbGxvdyBzdWZmaWNpZW50IHRpbWUgZm9yIG5ldHdvcmsgcm91bmQtdHJpcCBhbmQgc2VydmVyIHJlc3BvbnNlLmApO2lmKG4+PXQpdGhyb3cgbmV3IEVycm9yKGBoZWFsdGhDaGVja1RpbWVvdXRNcyAoJHtufW1zKSBtdXN0IGJlIGxlc3MgdGhhbiBoZWFsdGhDaGVja0ludGVydmFsTXMgKCR7dH1tcykuIFRoaXMgZW5zdXJlcyB0aGUgdGltZW91dCBjb21wbGV0ZXMgYmVmb3JlIHRoZSBuZXh0IGhlYWx0aCBjaGVjayBiZWdpbnMsIGFsbG93aW5nIHRpbWUgZm9yIHJlY292ZXJ5LmApO3RoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbE1zPXQsdGhpcy5oZWFsdGhDaGVja1RpbWVvdXRNcz1ufWFzeW5jIHN0YXJ0KGUpe3RyeXtjb25zdCBlPWF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtcIng2NFwiIT09ZT8uYXJjaGl0ZWN0dXJlJiZjb25zb2xlLndhcm4oYFRoZSBhcmNoaXRlY3R1cmUgb2YgdGhlIGNvbm5lY3RlZCBPcGVuRmluIHJ1bnRpbWUgaXMgJyR7ZS5hcmNoaXRlY3R1cmV9JyAtIFdpbmRvdyBzbmFwcGluZyBpcyBjdXJyZW50bHkgb25seSBzdXBwb3J0ZWQgd2l0aCA2NC1iaXQgYXBwbGljYXRpb25zLiBTbmFwcGluZyB3aWxsIGJlIGRpc2FibGVkLmApfWNhdGNoKGUpe2NvbnNvbGUud2FybihgQ291bGQgbm90IGdldCBydW50aW1lIGluZm86ICR7ZX1gKX1jb25zdCB0PWF3YWl0IGZpbi5TeXN0ZW0ucXVlcnlQZXJtaXNzaW9uRm9yQ3VycmVudENvbnRleHQoXCJTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzXCIpO2lmKCF0LmdyYW50ZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXJcIik7aWYodC5yYXdWYWx1ZSl7aWYoZT8uZXhlY3V0YWJsZVBhdGgmJiF0LnJhd1ZhbHVlPy5leGVjdXRhYmxlcz8uZW5hYmxlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MuYXNzZXRzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgZnJvbSBhbiBleGVjdXRhYmxlIHBhdGhcIik7aWYoIWU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uYXNzZXRzPy5lbmFibGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcy5hc3NldHMnIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlciBmcm9tIGEgVVJMXCIpfWU/LmV4ZWN1dGFibGVQYXRofHxhd2FpdChhc3luYyBlPT57Y29uc3QgdD1hd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudFN5bmMoKS5nZXRNYW5pZmVzdCgpLG49dC5hcHBBc3NldHM/LmZpbmQoZT0+ZS5hbGlhcz09PXIpO2lmKG4pcmV0dXJuIHZvaWQgY29uc29sZS53YXJuKFwiRGV0ZWN0ZWQgU25hcCBwYWNrYWdlIGluIGFwcCBtYW5pZmVzdCBhcHBBc3NldHNcIixuKTtpZihhd2FpdCBvKCkpcmV0dXJuIHZvaWQgY29uc29sZS5pbmZvKFwiVXNpbmcgZXhpc3RpbmcgU25hcCBwYWNrYWdlXCIpO2NvbnN0IGk9ZT8/YGh0dHBzOi8vY2RuLm9wZW5maW4uY28vcmVsZWFzZS9zbmFwLyR7YX0vc25hcC56aXBgO2NvbnNvbGUuaW5mbyhgRG93bmxvYWRpbmcgU25hcCBhc3NldCBmcm9tOiAnJHtpfSdgKTtjb25zdCBjPXthbGlhczpyLHNyYzpgJHtpfWAsdGFyZ2V0OlwiT3BlbkZpblNuYXAuZXhlXCIsdmVyc2lvbjphfTtjb25zb2xlLmluZm8oXCJEb3dubG9hZGluZyBTbmFwIHBhY2thZ2VcIixjKTt0cnl7YXdhaXQgZmluLlN5c3RlbS5kb3dubG9hZEFzc2V0KGMsKCk9Pnt9KX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IocyhcIlVuYWJsZSB0byBkb3dubG9hZCBTbmFwIHBhY2thZ2UuXCIsZSkpfX0pKGU/LmN1c3RvbVNuYXBBc3NldFNvdXJjZSk7Y29uc3Qgbj1hd2FpdCB0aGlzLmJ1aWxkX2NvbW1hbmRfbGluZShlKTtsZXQgaT17YWxpYXM6cixhcmd1bWVudHM6bixsaWZldGltZTpcIndpbmRvd1wifTtlPy5leGVjdXRhYmxlUGF0aCYmKGk9e3BhdGg6ZS5leGVjdXRhYmxlUGF0aCxhcmd1bWVudHM6bixsaWZldGltZTpcIndpbmRvd1wifSk7dHJ5e3RoaXMuc25hcF9pZGVudGl0eT1hd2FpdCBmaW4uU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcyhpKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IocyhcIkZhaWxlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyLlwiLGUpKX1yZXR1cm4gdGhpcy5jb25uZWN0KCl9YXN5bmMgY29ubmVjdCgpe2F3YWl0IHRoaXMuaW50ZXJuYWxDb25uZWN0KCEwKX1fX2FkZEV4dGVuc2lvbihlKXt0aGlzLl9fZXh0ZW5zaW9ucy5wdXNoKGUpfWFzeW5jIHN0b3AoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNodXRkb3duXCJ9KSl9YXN5bmMgc2hvd0RlYnVnV2luZG93KGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwic2hvd0RlYnVnV2luZG93XCIscGF5bG9hZDp7c2hvdzplfX0pKX1hc3luYyBnZXRMYXlvdXQoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7Y29uc3QgZT1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwic2VyaWFsaXNlTGF5b3V0XCJ9KSk7cmV0dXJuIGU/LnBheWxvYWQubGF5b3V0fWFzeW5jIHNldExheW91dChlLHQ9ITApe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGVzZXJpYWxpc2VMYXlvdXRcIixwYXlsb2FkOntsYXlvdXQ6ZSxyZXNldDp0fX0pKX1hc3luYyBlbnRlckRlZmVycmVkTGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJlbnRlckJhdGNoTW9kZVwifSkpfWFzeW5jIGV4aXREZWZlcnJlZExheW91dCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZXhpdEJhdGNoTW9kZVwifSkpfWFzeW5jIHByZXBhcmVUb0FwcGx5U25hcHNob3QoZSx0KXt0aGlzLnByZXBhcmVkV2luZG93UmVnaXN0cmF0aW9uQ2xpZW50SWRzLmNsZWFyKCksdGhpcy5pc1NuYXBzaG90UHJlcGFyZWRGb3JBcHBseT0hMTtpZighZXx8ZS5vcHRpb25zPy5jbG9zZUV4aXN0aW5nV2luZG93c3x8ZS5vcHRpb25zPy5jbG9zZVNuYXBzaG90V2luZG93cylyZXR1cm4gdGhpcy5uZWVkVG9SZXNldExheW91dD0hMCx2b2lkIGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJyZXNldEFsbFwifSkpO3RoaXMubmVlZFRvUmVzZXRMYXlvdXQ9ITE7Y29uc3Qgbj1lLnNuYXBzaG90LGk9SlNPTi5zdHJpbmdpZnkobixudWxsLDIpLHI9bi5zbmFwO2lmKCFyKXJldHVybjthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwicHJlcGFyZVRvQXBwbHlMYXlvdXRcIn0pKTtjb25zdCBhPXQ/P3cscz0oYXdhaXQgdGhpcy5nZXRMYXlvdXQoKSk/LmNsaWVudHMubWFwKGU9PmUuaWQpPz9bXSxvPXUobi53aW5kb3dzKSxjPUFycmF5LmZyb20oby5rZXlzKCkpLmZpbHRlcihlPT5zLmluY2x1ZGVzKGUpKTtyLmNsaWVudHMuZmlsdGVyKGU9PmMuaW5jbHVkZXMoZS5pZCkpLmZvckVhY2goZT0+e2NvbnN0IHQ9ZS5pZCxuPWEodCk7ZS5pZD1uLGYoci5jb25uZWN0aW9ucyx0LG4pO2NvbnN0IGk9by5nZXQodCk7aS5jdXN0b21EYXRhLnNuYXBDbGllbnRJZD1uLGkubmFtZT1ufSk7Y29uc3QgcD1KU09OLnN0cmluZ2lmeShuLG51bGwsMik7Y29uc29sZS5kZWJ1ZyhgU25hcCBTREsgbW9kaWZpZWQgc25hcHNob3QgZGF0YSBiZWZvcmUgYXBwbHlpbmcgaXQuXFxuT3JpZ2luYWwgc25hcHNob3Q6XFxuJHtpfVxcbk1vZGlmaWVkIHNuYXBzaG90OlxcbiR7cH1gKSx0aGlzLmlzU25hcHNob3RQcmVwYXJlZEZvckFwcGx5PSEwfWFzeW5jIGRlY29yYXRlU25hcHNob3QoZSl7cmV0dXJuey4uLmUsc25hcDphd2FpdCB0aGlzLmdldExheW91dCgpfX1hc3luYyBhcHBseVNuYXBzaG90KGUpe2lmKCF0aGlzLmlzU25hcHNob3RQcmVwYXJlZEZvckFwcGx5KXRocm93IG5ldyBFcnJvcihcInByZXBhcmVUb0FwcGx5U25hcHNob3QgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGFwcGx5U25hcHNob3QuXCIpO3RyeXtpZighZS5zbmFwKXJldHVybjtjb25zdCB0PWUuc25hcC5jbGllbnRzPy5tYXAoZT0+ZS5pZCk/P1tdO2lmKDA9PT10Lmxlbmd0aClyZXR1cm47YXdhaXQgdGhpcy5kcmFpblBlbmRpbmdXaW5kb3dSZWdpc3RyYXRpb25zKHQpLGF3YWl0IHRoaXMuc2V0TGF5b3V0KGUuc25hcCx0aGlzLm5lZWRUb1Jlc2V0TGF5b3V0KX1maW5hbGx5e3RoaXMuaXNTbmFwc2hvdFByZXBhcmVkRm9yQXBwbHk9ITEsdGhpcy5wcmVwYXJlZFdpbmRvd1JlZ2lzdHJhdGlvbkNsaWVudElkcy5jbGVhcigpfX1hc3luYyBsYXVuY2goZSl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIk5vdCBjb25uZWN0ZWQgdG8gYW4gU25hcCBzZXJ2ZXJcIik7ZS5hcHBBc3NldEluZm8mJihlLnBhdGg9YXdhaXQgbCh7dGFyZ2V0OmUucGF0aCwuLi5lLmFwcEFzc2V0SW5mb30pKSxjb25zb2xlLmxvZyhcIm9wdGlvbnM6IFwiLGUpO2NvbnN0IHQ9e2FjdGlvbjpcInN0YXJ0UHJvY2Vzc1wiLHBheWxvYWQ6ey4uLmUsYXJnczplLmFyZ3N8fFtdfX07aWYoZS5zdHJhdGVneSl7Y29uc3R7dHlwZTpuLC4uLml9PWUuc3RyYXRlZ3k7dC5wYXlsb2FkLnN0cmF0ZWd5PXt0eXBlOm4scGFyYW1ldGVyczp7Li4uaX19fWNvbnN0IG49YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIsdCkpO2lmKG4/LnBheWxvYWQ/LnN1Y2Nlc3MpcmV0dXJue3Byb2Nlc3NfaWQ6bi5wYXlsb2FkLnByb2Nlc3NfaWR9O3Rocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxhdW5jaCBwcm9jZXNzOiAke24/LnBheWxvYWQ/LmVycm9yfWApfWFzeW5jIHJlZ2lzdGVyV2luZG93KGUsdCxuKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaG9va0FuZFJlZ2lzdGVyV2luZG93XCIscGF5bG9hZDp7Y2xpZW50SWQ6ZSx3aW5kb3dIYW5kbGU6dCxyZXNpemluZ0JlaGF2aW9yOm59fSkpfWFzeW5jIGVuYWJsZUF1dG9XaW5kb3dSZWdpc3RyYXRpb24oKXtjb25zdCBlPWU9Pnt0aGlzLmhhbmRsZU5ld1dpbmRvdyhlKX07cmV0dXJuIGF3YWl0IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpLmFkZExpc3RlbmVyKFwid2luZG93LWNyZWF0ZWRcIixlKSxhc3luYygpPT57YXdhaXQgZmluLlN5c3RlbS5yZW1vdmVMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSl9fWFzeW5jIGF0dGFjaFdpbmRvd3MoZSx0LG4saSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImF0dGFjaFwiLHBheWxvYWQ6e3RhcmdldENsaWVudElkOmUsdG9BdHRhY2hDbGllbnRJZDp0LHRhcmdldFNpZGU6bixvZmZzZXQ6aX19KSl9YXN5bmMgZGV0YWNoRnJvbUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJkZXRhY2hGcm9tR3JvdXBcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKX1hc3luYyBnZXRBdHRhY2hlZChlKXtyZXR1cm4oYXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEF0dGFjaGVkSW5zdGFuY2VzXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSkpLnBheWxvYWQuYXR0YWNoZWR9YXN5bmMgaGFzQXR0YWNobWVudHMoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJoYXNBdHRhY2htZW50c1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmhhc0F0dGFjaG1lbnRzfWFkZEV2ZW50TGlzdGVuZXIoZSx0KXt0aGlzLmVtaXR0ZXIub24oZSx0KX1yZW1vdmVFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9mZihlLHQpfW9uY2UoZSx0KXt0aGlzLmVtaXR0ZXIub25jZShlLHQpfWFzeW5jIGdldENsaWVudElkRm9yV2luZG93KGUpe2NvbnN0IHQ9XCJudW1iZXJcIj09dHlwZW9mIGU/e25hdGl2ZVdpbmRvd0lkOmV9Ok51bWJlci5pc05hTih0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpKT97bmF0aXZlV2luZG93SWQ6TnVtYmVyLk5hTn06e25hdGl2ZVdpbmRvd0lkOnRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSl9LG49YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldENsaWVudElkRm9yV2luZG93XCIscGF5bG9hZDp0fSkpO2lmKCFuLnBheWxvYWQuY2xpZW50SWQpdGhyb3cgbmV3IEVycm9yKFwiTm8gY2xpZW50IElEIGZvdW5kIGZvciB3aW5kb3dcIik7cmV0dXJuIG4ucGF5bG9hZC5jbGllbnRJZH1hc3luYyBnZXRHcm91cElkRm9yV2luZG93KGUpe2NvbnN0IHQ9XCJudW1iZXJcIj09dHlwZW9mIGU/e25hdGl2ZVdpbmRvd0lkOmV9Ok51bWJlci5pc05hTih0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpKT97Y2xpZW50SWQ6ZX06e25hdGl2ZVdpbmRvd0lkOnRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSl9LG49YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldEdyb3VwSWRGb3JXaW5kb3dcIixwYXlsb2FkOnR9KSk7aWYoIW4ucGF5bG9hZC5ncm91cElkKXRocm93IG5ldyBFcnJvcihcIk5vIGdyb3VwIGZvdW5kIGZvciB3aW5kb3dcIik7cmV0dXJuIG4ucGF5bG9hZC5ncm91cElkfWFzeW5jIGdldFdpbmRvd1Jlc2l6YWJsZShlKXtjb25zdCB0PVwibnVtYmVyXCI9PXR5cGVvZiBlP3tuYXRpdmVXaW5kb3dJZDplfTpOdW1iZXIuaXNOYU4odGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSk/e2NsaWVudElkOmV9OntuYXRpdmVXaW5kb3dJZDp0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpfSxuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRSZXNpemFibGVcIixwYXlsb2FkOnR9KSk7aWYobnVsbD09PW4ucGF5bG9hZC5yZXNpemFibGUpdGhyb3cgbmV3IEVycm9yKFwiTm8gd2luZG93IGZvdW5kIGZvciBnaXZlbiBJRFwiKTtyZXR1cm4gbi5wYXlsb2FkLnJlc2l6YWJsZX1hc3luYyBzZXRXaW5kb3dSZXNpemFibGUoZSx0KXtjb25zdCBuPVwibnVtYmVyXCI9PXR5cGVvZiBlP3tuYXRpdmVXaW5kb3dJZDplLHJlc2l6YWJsZTp0fTpOdW1iZXIuaXNOYU4odGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSk/e2NsaWVudElkOmUscmVzaXphYmxlOnR9OntuYXRpdmVXaW5kb3dJZDp0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpLHJlc2l6YWJsZTp0fTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwic2V0UmVzaXphYmxlXCIscGF5bG9hZDpufSkpfWFzeW5jIGdldFdpbmRvd3NJbkdyb3VwKGUpe2NvbnN0IHQ9YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImdldFdpbmRvd3NJbkdyb3VwXCIscGF5bG9hZDp7Z3JvdXBJZDplfX0pKTtyZXR1cm4gdC5wYXlsb2FkLndpbmRvd3M/dC5wYXlsb2FkLndpbmRvd3MubWFwKGU9Pih7bmF0aXZlSWQ6ZVswXSxjbGllbnRJZDplWzFdfSkpOltdfWFzeW5jIGdldEFsbEdyb3VwSWRzKCl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRBbGxHcm91cElkc1wifSkpKS5wYXlsb2FkLmdyb3VwSWRzfWFzeW5jIG1pbmltaXplR3JvdXAoZSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcIm1pbmltaXplR3JvdXBcIixwYXlsb2FkOntncm91cElkOmV9fSkpfWFzeW5jIHJlc3RvcmVHcm91cChlKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwicmVzdG9yZUdyb3VwXCIscGF5bG9hZDp7Z3JvdXBJZDplfX0pKX1nZXRTbmFwU2VydmVyU3RhdHVzKCl7cmV0dXJuIHRoaXMuc25hcFNlcnZlclN0YXR1c31oYW5kbGVTbmFwU2VydmVyRGlzY29ubmVjdGlvbigpe3RoaXMuc3RvcEhlYWx0aENoZWNrKCksdGhpcy5jbGllbnQ9dm9pZCAwLHRoaXMuc2V0U25hcFNlcnZlclN0YXR1cyhcImRpc2Nvbm5lY3RlZFwiKSxjb25zb2xlLndhcm4oXCJTbmFwU0RLOiBEaXNjb25uZWN0ZWQgZnJvbSBTbmFwIHNlcnZlciwgYXR0ZW1wdCByZWNvbm5lY3QuXCIpLHRoaXMuaW50ZXJuYWxDb25uZWN0KCExKX1hc3luYyBpbnRlcm5hbENvbm5lY3QoZSl7aWYodGhpcy5zdG9wSGVhbHRoQ2hlY2soKSx0aGlzLmNsaWVudD1hd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoYHNuYXAtc2VydmVyLWNvcmUtJHt0aGlzLnNlcnZlcl9pZH1gKSx0aGlzLmNsaWVudC5yZWdpc3RlcihcInNuYXBfaGFuZHNoYWtlXCIsYXN5bmModCxuKT0+e3RyeXtlJiZhd2FpdCBmaW4uU3lzdGVtLnJlZ2lzdGVyVXNhZ2Uoe3R5cGU6XCJhZGFwdGVyLWZlYXR1cmVcIixkYXRhOnthcGlWZXJzaW9uOnQudmVyc2lvbixjb21wb25lbnROYW1lOlwic25hcC1zZXJ2ZXJcIn19KX1jYXRjaHtjb25zb2xlLndhcm4oXCJTbmFwU0RLOiBGYWlsZWQgdG8gcmVnaXN0ZXIgdXNhZ2UgZm9yIFNuYXAgU2VydmVyXCIpfX0pLHRoaXMuY2xpZW50Lm9uRGlzY29ubmVjdGlvbigoKT0+dGhpcy5oYW5kbGVTbmFwU2VydmVyRGlzY29ubmVjdGlvbigpKSxlKXRyeXthd2FpdCBmaW4uU3lzdGVtLnJlZ2lzdGVyVXNhZ2Uoe3R5cGU6XCJhZGFwdGVyLWZlYXR1cmVcIixkYXRhOnthcGlWZXJzaW9uOlwiMS42LjFcIixjb21wb25lbnROYW1lOlwic25hcC1jbGllbnRcIn19KX1jYXRjaHtjb25zb2xlLndhcm4oXCJTbmFwU0RLOiBGYWlsZWQgdG8gcmVnaXN0ZXIgdXNhZ2UgZm9yIFNuYXAgU2VydmVyXCIpfXRoaXMuY2xpZW50LnJlZ2lzdGVyKFwic25hcF91cGRhdGVzXCIsKGUsdCk9PnRoaXMuaGFuZGxlU25hcEV2ZW50cyhlLHQpKSx0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJjb25uZWN0ZWRcIiksdGhpcy5zdGFydEhlYWx0aENoZWNrKCksdGhpcy5fX2V4dGVuc2lvbnMuZm9yRWFjaChlPT5lLm9uQ29ubmVjdGVkKHRoaXMuY2xpZW50KSl9c2V0U25hcFNlcnZlclN0YXR1cyhlKXt0aGlzLnNuYXBTZXJ2ZXJTdGF0dXMhPT1lJiYodGhpcy5zbmFwU2VydmVyU3RhdHVzPWUsXCJkaXNjb25uZWN0ZWRcIj09PWU/dGhpcy5lbWl0X2V2ZW50KFwic25hcC1zZXJ2ZXItZGlzY29ubmVjdGVkXCIse30pOlwibm8tcmVzcG9uc2VcIj09PWUmJnRoaXMuZW1pdF9ldmVudChcInNuYXAtc2VydmVyLW5vLXJlc3BvbnNlXCIse3RpbWVzdGFtcDpEYXRlLm5vdygpfSkpfXN0YXJ0SGVhbHRoQ2hlY2soKXtpZihcImRpc2Nvbm5lY3RlZFwiIT09dGhpcy5zbmFwU2VydmVyU3RhdHVzJiYhdGhpcy5oZWFsdGhDaGVja0luaXRpYWxpemluZyYmIXRoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbCl7dGhpcy5oZWFsdGhDaGVja0luaXRpYWxpemluZz0hMDt0cnl7dGhpcy5oZWFsdGhDaGVja0ludGVydmFsPXNldEludGVydmFsKGFzeW5jKCk9PntpZihcImRpc2Nvbm5lY3RlZFwiIT09dGhpcy5zbmFwU2VydmVyU3RhdHVzJiZ0aGlzLmNsaWVudCl0cnl7Y29uc3QgZT1uZXcgUHJvbWlzZSgoZSx0KT0+e3NldFRpbWVvdXQoKCk9PnQobmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgcmVzcG9uc2UgdGltZW91dFwiKSksdGhpcy5oZWFsdGhDaGVja1RpbWVvdXRNcyl9KSx0PU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiksbj1hd2FpdCBQcm9taXNlLnJhY2UoW3RoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJoZWFsdGhDaGVja1wiLHBheWxvYWQ6e25vbmNlOnR9fSl8fFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNsaWVudCBpcyBub3QgYXZhaWxhYmxlXCIpKSxlXSk7aWYoIXRoaXMuY2xpZW50KXJldHVybiB2b2lkIHRoaXMuc2V0U25hcFNlcnZlclN0YXR1cyhcImRpc2Nvbm5lY3RlZFwiKTtpZighbj8ucGF5bG9hZHx8bi5wYXlsb2FkLm5vbmNlIT09dCl0aHJvdyBuZXcgRXJyb3IoXCJIZWFsdGggY2hlY2sgdmFsaWRhdGlvbiBmYWlsZWQgLSBub25jZSBtaXNtYXRjaFwiKTtcIm5vLXJlc3BvbnNlXCI9PT10aGlzLnNuYXBTZXJ2ZXJTdGF0dXMmJnRoaXMuc2V0U25hcFNlcnZlclN0YXR1cyhcImNvbm5lY3RlZFwiKX1jYXRjaChlKXt0aGlzLmNsaWVudD90aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJuby1yZXNwb25zZVwiKTp0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIil9fSx0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWxNcyl9ZmluYWxseXt0aGlzLmhlYWx0aENoZWNrSW5pdGlhbGl6aW5nPSExfX19c3RvcEhlYWx0aENoZWNrKCl7dGhpcy5oZWFsdGhDaGVja0ludGVydmFsJiYoY2xlYXJJbnRlcnZhbCh0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWwpLHRoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbD12b2lkIDApfWhhbmRsZU5ld1dpbmRvdyhlKXtjb25zdCB0PXRoaXMuaGFuZGxlTmV3V2luZG93V29yayhlKTt0aGlzLnBlbmRpbmdSZWdpc3RyYXRpb25Qcm9taXNlcy5hZGQodCksdC5maW5hbGx5KCgpPT57dGhpcy5wZW5kaW5nUmVnaXN0cmF0aW9uUHJvbWlzZXMuZGVsZXRlKHQpfSl9YXN5bmMgaGFuZGxlTmV3V2luZG93V29yayhlKXt0aGlzLnBlbmRpbmdXaW5kb3dSZWdpc3RyYXRpb25zKz0xO3RyeXthd2FpdCB0aGlzLmhhbmRsZU5ld1dpbmRvd0ltcGwoZSl9ZmluYWxseXt0aGlzLnBlbmRpbmdXaW5kb3dSZWdpc3RyYXRpb25zLT0xfX1hc3luYyBkcmFpblBlbmRpbmdXaW5kb3dSZWdpc3RyYXRpb25zKGUpe2NvbnN0IHQ9bmV3IFNldChlKTtsZXQgbj1BcnJheS5mcm9tKHQpLmZpbHRlcihlPT4hdGhpcy5wcmVwYXJlZFdpbmRvd1JlZ2lzdHJhdGlvbkNsaWVudElkcy5oYXMoZSkpO2lmKGF3YWl0IG5ldyBQcm9taXNlKGU9Pntjb25zdCBpPXBlcmZvcm1hbmNlLm5vdygpLHI9c2V0SW50ZXJ2YWwoKCk9PntuPUFycmF5LmZyb20odCkuZmlsdGVyKGU9PiF0aGlzLnByZXBhcmVkV2luZG93UmVnaXN0cmF0aW9uQ2xpZW50SWRzLmhhcyhlKSksKDA9PT1uLmxlbmd0aHx8cGVyZm9ybWFuY2Uubm93KCktaT49cC5QRU5ESU5HX1JFR0lTVFJBVElPTl9EUkFJTl9NUykmJihjbGVhckludGVydmFsKHIpLGUoKSl9LDI1KX0pLG4ubGVuZ3RoPjApe2NvbnN0IGU9YFNuYXBTREs6IFRpbWVkIG91dCB3YWl0aW5nIGZvciB3aW5kb3cgcmVnaXN0cmF0aW9ucywgbWlzc2luZz1bJHtuLmpvaW4oXCIsIFwiKX1dYDt0aHJvdyBjb25zb2xlLndhcm4oZSksbmV3IEVycm9yKGUpfWNvbnN0IGk9Wy4uLnRoaXMucGVuZGluZ1JlZ2lzdHJhdGlvblByb21pc2VzXTtsZXQgcj0hMTtpZihhd2FpdCBQcm9taXNlLnJhY2UoW1Byb21pc2UuYWxsKGkpLG5ldyBQcm9taXNlKGU9PntzZXRUaW1lb3V0KCgpPT57cj0hMCxlKCl9LHAuUEVORElOR19SRUdJU1RSQVRJT05fRFJBSU5fTVMpfSldKSxyJiZ0aGlzLnBlbmRpbmdSZWdpc3RyYXRpb25Qcm9taXNlcy5zaXplPjApe2NvbnN0IGU9YFNuYXBTREs6IFRpbWVkIG91dCBkcmFpbmluZyB3aW5kb3cgcmVnaXN0cmF0aW9ucyBhZnRlciAke3AuUEVORElOR19SRUdJU1RSQVRJT05fRFJBSU5fTVN9bXMsIHN0aWxsIGluIGZsaWdodD0ke3RoaXMucGVuZGluZ1JlZ2lzdHJhdGlvblByb21pc2VzLnNpemV9YDt0aHJvdyBjb25zb2xlLndhcm4oZSksbmV3IEVycm9yKGUpfX1hc3luYyBoYW5kbGVOZXdXaW5kb3dJbXBsKGUpe2NvbnN0IHQ9YXdhaXQgZmluLldpbmRvdy53cmFwKHt1dWlkOmUudXVpZCxuYW1lOmUubmFtZX0pLG49YXdhaXQgdC5nZXROYXRpdmVJZCgpO2xldCBpPXQuaWRlbnRpdHkubmFtZTtjb25zdCByPWF3YWl0IHQuZ2V0T3B0aW9ucygpO2lmKHZvaWQgMCE9PXIuaW5jbHVkZUluU25hcHNob3RzJiYhMT09PXIuaW5jbHVkZUluU25hcHNob3RzKXJldHVybiB2b2lkIGNvbnNvbGUubG9nKGBTbmFwU0RLOiBOb3QgcmVnaXN0ZXJpbmcgJHtlLnV1aWR9OiR7ZS5uYW1lfSwgV2luZG93IGlzIGV4cGxpY2l0bHkgZXhjbHVkZWQgLWluY2x1ZGVJblNuYXBzaG90cyA9PSBmYWxzZWApO2NvbnN0IGE9ci5jdXN0b21EYXRhfHx7fTthLnNuYXBDbGllbnRJZD9pPWEuc25hcENsaWVudElkOmF3YWl0IHQudXBkYXRlT3B0aW9ucyh7Y3VzdG9tRGF0YTp7Li4uYSxzbmFwQ2xpZW50SWQ6aX19KSxjb25zb2xlLmxvZyhgU25hcFNESzogQXV0by1yZWdpc3RlcmluZyB3aW5kb3c6IHNuYXBDbGllbnRJZDoke2l9LCBoYW5kbGUgJHtufSwgdXVpZDoke2UudXVpZH0sIG5hbWU6JHtlLm5hbWV9YCksdGhpcy5wcmVwYXJlZFdpbmRvd1JlZ2lzdHJhdGlvbkNsaWVudElkcy5hZGQoaSksYXdhaXQgdGhpcy5yZWdpc3RlcldpbmRvdyhpLG4sYS5zbmFwUmVzaXppbmdCZWhhdmlvcil9ZW1pdF9ldmVudChlLC4uLnQpe3RoaXMuZW1pdHRlci5lbWl0KGUsLi4udCl9aGFuZGxlU25hcEV2ZW50cyhlLHQpe3N3aXRjaCh0aGlzLmVtaXRfZXZlbnQoXCJhbGwtZXZlbnRzXCIse3R5cGU6ZS5hY3Rpb24scGF5bG9hZDplLnBheWxvYWR9KSxlLmFjdGlvbil7Y2FzZVwiY2xpZW50UmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1yZWdpc3RlcmVkXCIse2NsaWVudElkOmUucGF5bG9hZC5jbGllbnRJZCx3aW5kb3dIYW5kbGU6YCMke2UucGF5bG9hZC53aW5kb3dIYW5kbGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCxvd25pbmdQcm9jZXNzSWQ6ZS5wYXlsb2FkLm93bmluZ1Byb2Nlc3NJZH0pO2JyZWFrO2Nhc2VcImNsaWVudFVuUmVnaXN0ZXJlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC11bnJlZ2lzdGVyZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwibW92ZVNpemVDb21wbGV0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJtb3ZlLXNpemUtY29tcGxldGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudHNBdHRhY2hlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudHMtYXR0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGV0YWNoZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGV0YWNoZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiZ3JvdXBzQ2hhbmdlZFwiOnRoaXMuZW1pdF9ldmVudChcImdyb3Vwcy1jaGFuZ2VkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudEFjdGl2YXRlZFwiOnRoaXMuZW1pdF9ldmVudChcImNsaWVudC1hY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSk7YnJlYWs7Y2FzZVwiY2xpZW50RGVhY3RpdmF0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIix7Li4uZS5wYXlsb2FkfSl9fWhleFN0cmluZ1RvTnVtYmVyKGUpe2NvbnN0IHQ9ZT8udHJpbSgpO3JldHVybi9eMHhbMC05YS1mXSskL2kudGVzdCh0KT9OdW1iZXIodCk6TmFOfWFzeW5jIGJ1aWxkX2NvbW1hbmRfbGluZShlKXtsZXQgdD1gLS1pZCAke3RoaXMuc2VydmVyX2lkfSBgO2U/LnNob3dEZWJ1ZyYmKHQrPVwiIC0tc2hvdy1kZWJ1ZyBcIiksZT8uZGlzYWJsZUdQVUFjY2VsZXJhdGVkRHJhZ2dpbmcmJih0Kz1cIiAtLWRpc2FibGUtZ3B1LWFjY2VsZXJhdGVkLWRyYWdnaW5nIHRydWUgXCIpLGU/LmRpc2FibGVCbHVyRHJvcFByZXZpZXcmJih0Kz1cIiAtLWJsdXItZHJvcC1wcmV2aWV3IGZhbHNlIFwiKSx2b2lkIDAhPT1lPy5ibHVyRWZmZWN0UGVyZm9ybWFuY2VUaHJlc2hvbGQmJih0Kz1gIC0tYmx1ci1lZmZlY3QtcGVyZm9ybWFuY2UtdGhyZXNob2xkPSR7ZT8uYmx1ckVmZmVjdFBlcmZvcm1hbmNlVGhyZXNob2xkfSBgKSxlPy5kaXNhYmxlVXNlclVuc3RpY2smJih0Kz1cIiAtLWRpc2FibGUtdXNlci11bnN0aWNrIFwiKSwhMCE9PWU/LmtleVRvU3RpY2smJlwic3RyaW5nXCIhPXR5cGVvZiBlPy5rZXlUb1N0aWNrfHwodCs9YCAtLWtzPSR7ITA9PT1lLmtleVRvU3RpY2s/XCJjdHJsXCI6ZS5rZXlUb1N0aWNrfSBgKSxlPy5rZXlUb1Vuc3RpY2smJih0Kz1gIC0ta3VzPSR7ZS5rZXlUb1Vuc3RpY2t9IGApLGU/LmtleVRvR3JvdXBTdGljayYmKHQrPWAgLS1rZ3M9JHtlLmtleVRvR3JvdXBTdGlja30gYCksZT8uYmxvY2tPdmVybGFwR3JvdXBTbmFwcGluZyYmKHQrPVwiIC0tYmxvY2stb3ZlcmxhcC1ncm91cC1zbmFwcGluZyBcIiksZT8uaGlkZVRhc2tiYXJFbnRyeSYmKHQrPVwiIC0tbm8tdGIgXCIpLGU/LnRhc2tiYXJJY29uR3JvdXAmJih0Kz1gIC0tdGItaWQ9JHtlPy50YXNrYmFySWNvbkdyb3VwfSBgKSxlPy50YXNrYmFySWNvbiYmKHQrPWAgLS10Yi1pY29uPSR7ZT8udGFza2Jhckljb259IGApLGU/LmRpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nJiYodCs9XCIgLS1uby1oYiBcIiksZT8uYXV0b0hpZGVDbGllbnRUYXNrYmFySWNvbnMmJih0Kz1cIiAtLXRiLWF1dG8taGlkZSBcIiksZT8udGhlbWUmJih0Kz1gIC0tdGhtPSR7ZS50aGVtZX0gYCksZT8uZGVmYXVsdFJlc2l6aW5nQmVoYXZpb3ImJih0Kz1gIC0tcmVzPSR7ZT8uZGVmYXVsdFJlc2l6aW5nQmVoYXZpb3J9IGApO2NvbnN0IG49YXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpO3JldHVybiB0Kz1gLS1ydW50aW1lLXBvcnQgJHtuLnBvcnR9IGAsdCs9YC0tcnVudGltZS12ZXJzaW9uICR7bi52ZXJzaW9ufSBgLHQudHJpbSgpfX1wLlBFTkRJTkdfUkVHSVNUUkFUSU9OX0RSQUlOX01TPTE1ZTM7Y29uc3QgbD1hc3luYyBlPT57bGV0IHQ9KGF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKSkuYXJnc1tcImxvY2FsLXN0YXJ0dXAtdXJsXCJdLnJlcGxhY2UoXCJjb25maWcuanNvblwiLFwiXCIpO2NvbnN0IG49dC5pbmNsdWRlcyhcIlxcXFxcIik/XCJcXFxcXCI6XCIvXCI7cmV0dXJuIHQuZW5kc1dpdGgobikmJih0PXQuc2xpY2UoMCwtMSkpLFt0LFwiYXNzZXRzXCIsZS5hbGlhcyxlLnZlcnNpb24sZS50YXJnZXRdLmpvaW4obil9LGg9KCk9PlwidW5kZWZpbmVkXCIhPXR5cGVvZiBjcnlwdG8mJlwicmFuZG9tVVVJRFwiaW4gY3J5cHRvJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBjcnlwdG8ucmFuZG9tVVVJRD9jcnlwdG8ucmFuZG9tVVVJRCgpOlwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZyxlPT4oZV5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSYxNT4+ZS80KS50b1N0cmluZygxNikpLGQ9ZT0+L15hcHA6XFwvW14vXStcXC9bXi9dKyQvLnRlc3QoZT8/XCJcIiksdT1lPT57Y29uc3QgdD1uZXcgTWFwO3JldHVybiBlLmZvckVhY2goZT0+e2NvbnN0IG49IWUubmFtZSxpPWUubmFtZT8uc3RhcnRzV2l0aChjKT8/ITEscj1lLmN1c3RvbURhdGE/LnNuYXBDbGllbnRJZDsobnx8aXx8ZChlLm5hbWUpKSYmciYmdC5zZXQocixlKX0pLHR9LGY9KGUsdCxuKT0+e09iamVjdC52YWx1ZXMoZSkuZm9yRWFjaChlPT57ZS5hdHRhY2hlZENsaWVudElkPT09dD9lLmF0dGFjaGVkQ2xpZW50SWQ9bjplLnRhcmdldENsaWVudElkPT09dCYmKGUudGFyZ2V0Q2xpZW50SWQ9bil9KX0sdz1lPT57aWYoIWQoZSkpcmV0dXJuYCR7Y30ke2goKX1gO2NvbnN0IHQ9ZS5zcGxpdChcIi9cIik7cmV0dXJuIHRbdC5sZW5ndGgtMV09aCgpLHQuam9pbihcIi9cIil9O2V4cG9ydHtwIGFzIFNuYXBTZXJ2ZXJ9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlci92YWx1ZSBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0aWYoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSkge1xuXHRcdHZhciBpID0gMDtcblx0XHR3aGlsZShpIDwgZGVmaW5pdGlvbi5sZW5ndGgpIHtcblx0XHRcdHZhciBrZXkgPSBkZWZpbml0aW9uW2krK107XG5cdFx0XHR2YXIgYmluZGluZyA9IGRlZmluaXRpb25baSsrXTtcblx0XHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0XHRpZihiaW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogZGVmaW5pdGlvbltpKytdIH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBiaW5kaW5nIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYoYmluZGluZyA9PT0gMCkgeyBpKys7IH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE9wZW5GaW4gfSBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0ICogYXMgU25hcCBmcm9tIFwiQG9wZW5maW4vc25hcC1zZGtcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyT3B0aW9ucyB9IGZyb20gXCJAb3BlbmZpbi9zbmFwLXNka1wiO1xuaW1wb3J0IHsgZG9lc0FwcEFzc2V0RXhpc3QsIGRvd25sb2FkQXBwQXNzZXQgfSBmcm9tIFwiLi9hcHAtYXNzZXRcIjtcblxuY29uc3QgVEVTVF9BUFBfV0lORE9XX0lEID0gXCJzbmFwLWV4YW1wbGUtbmF0aXZlLXRlc3QtYXBwLWlkXCI7XG5jb25zdCBzbmFwRGVmYXVsdFVybCA9IFwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9yZWxlYXNlL3NuYXAvMS42LjEvc25hcC56aXBcIjtcbmNvbnN0IHNuYXBWZXJzaW9uID0gXCIxLjYuMVwiO1xuY29uc3Qgc25hcEFsaWFzID0gXCJvcGVuZmluLXNuYXBcIjtcbmNvbnN0IHNuYXBUYXJnZXQgPSBcIk9wZW5GaW5TbmFwLmV4ZVwiO1xuXG4vLyBUaGUgRE9NIGVsZW1lbnRzXG5sZXQgY2hrU2hvd0RlYnVnV2luZG93OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrQ3RybFRvU25hcDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZUdQVURyYWdnaW5nOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtEaXNhYmxlQmx1ckRyb3A6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcblxubGV0IGNoa0hpZGVUYXNrQmFyRW50cnk6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0N1c3RvbVRhc2tCYXJJY29uOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmc6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGg6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IHR4dFByaW1hcnlVcmw6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IHR4dEZhbGxiYWNrVXJsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBmaWVsZFByaW1hcnlVcmw6IEhUTUxFbGVtZW50IHwgbnVsbDtcbmxldCBmaWVsZEZhbGxiYWNrVXJsOiBIVE1MRWxlbWVudCB8IG51bGw7XG5sZXQgcm93Q3VzdG9tU25hcEFwcEFzc2V0UGF0aDogSFRNTEVsZW1lbnQgfCBudWxsO1xuXG5sZXQgYnRuU3RhcnQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5TdG9wOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuTmF0aXZlVGVzdEFwcDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bldpbmRvd1Rlc3RBcHA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5TaG93SGlkZURlYnVnV2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VsQXR0YWNoUG9zaXRpb246IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBzZWxTbmFwS2V5OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsVW5zbmFwS2V5OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsUmVzaXplOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsVGhlbWU6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBidG5BdHRhY2hUb1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkRldGFjaEZyb21XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5NaW5pbWl6ZUdyb3VwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0TGF5b3V0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0QXR0YWNoZWQ6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRHcm91cHM6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQ2xlYXJMb2c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBzZXJ2ZXJTdGF0dXM6IEhUTUxQYXJhZ3JhcGhFbGVtZW50IHwgbnVsbDtcbmxldCBsb2dnaW5nOiBIVE1MUHJlRWxlbWVudCB8IG51bGw7XG5sZXQgZGVidWdXaW5kb3dTaG93biA9IGZhbHNlO1xuXG5sZXQgc2VydmVyU3RhdGU6IFwic3RhcnRpbmdcIiB8IFwic3RhcnRlZFwiIHwgXCJzdG9wcGluZ1wiIHwgXCJzdG9wcGVkXCIgPSBcInN0b3BwZWRcIjtcbmxldCBpc1dpbmRvd09wZW4gPSBmYWxzZTtcbmxldCBpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5sZXQgc2VydmVyOiBTbmFwLlNuYXBTZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3VzdG9tIGxvZ2dlciB0aGF0IGltcGxlbWVudHMgdGhlIExvZ2dlciBpbnRlcmZhY2UgdXNpbmcgbG9nSW5mb3JtYXRpb24gYW5kIGxvZ0Vycm9yIGZ1bmN0aW9uc1xuICovXG5jb25zdCBjdXN0b21Mb2dnZXIgPSB7XG5cdGluZm86IChtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG5cdFx0bG9nSW5mb3JtYXRpb24oYCR7bWVzc2FnZX0ke29wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDAgPyBgICR7b3B0aW9uYWxQYXJhbXMuam9pbihcIiBcIil9YCA6IFwiXCJ9YCk7XG5cdH0sXG5cdGVycm9yOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0Vycm9yKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9LFxuXHR3YXJuOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0Vycm9yKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9LFxuXHR0cmFjZTogKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcblx0XHRsb2dJbmZvcm1hdGlvbihgJHttZXNzYWdlfSR7b3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCA/IGAgJHtvcHRpb25hbFBhcmFtcy5qb2luKFwiIFwiKX1gIDogXCJcIn1gKTtcblx0fSxcblx0ZGVidWc6IChtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG5cdFx0bG9nSW5mb3JtYXRpb24oYCR7bWVzc2FnZX0ke29wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDAgPyBgICR7b3B0aW9uYWxQYXJhbXMuam9pbihcIiBcIil9YCA6IFwiXCJ9YCk7XG5cdH1cbn07XG5cbi8vIFdhaXQgZm9yIHRoZSBET00gdG8gZmluaXNoIGxvYWRpbmdcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG5cdC8vIFBsYXRmb3JtIGhhcyBsb2FkZWQgc28gaW5pdGlhbGl6ZSB0aGUgRE9NXG5cdGF3YWl0IGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTSBlbGVtZW50cy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y2hrU2hvd0RlYnVnV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtTaG93RGVidWdXaW5kb3dcIik7XG5cdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcFwiKTtcblx0Y2hrQ3RybFRvU25hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrQ3RybFRvU25hcFwiKTtcblx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtEaXNhYmxlR1BVRHJhZ2dpbmdcIik7XG5cdGNoa0Rpc2FibGVCbHVyRHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZUJsdXJEcm9wXCIpO1xuXHRjaGtIaWRlVGFza0JhckVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtIaWRlVGFza0JhckVudHJ5XCIpO1xuXHRjaGtDdXN0b21UYXNrQmFySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrQ3VzdG9tVGFza0Jhckljb25cIik7XG5cdGNoa0dyb3VwV2l0aFBsYXRmb3JtVGFza2Jhckdyb3VwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50Pihcblx0XHRcIiNjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cFwiXG5cdCk7XG5cblx0Y2hrQXV0b0hpZGVDbGllbnRUYXNrYmFySWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zXCIpO1xuXHRjaGtEaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmdcIik7XG5cdGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0N1c3RvbVNuYXBBcHBBc3NldFBhdGhcIik7XG5cdHR4dFByaW1hcnlVcmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI3R4dFByaW1hcnlVcmxcIik7XG5cdHR4dEZhbGxiYWNrVXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiN0eHRGYWxsYmFja1VybFwiKTtcblx0ZmllbGRQcmltYXJ5VXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIjZmllbGRQcmltYXJ5VXJsXCIpO1xuXHRmaWVsZEZhbGxiYWNrVXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIjZmllbGRGYWxsYmFja1VybFwiKTtcblx0cm93Q3VzdG9tU25hcEFwcEFzc2V0UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI3Jvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGhcIik7XG5cblx0YnRuU3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdGFydFwiKTtcblx0YnRuU3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blN0b3BcIik7XG5cdHNlcnZlclN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFBhcmFncmFwaEVsZW1lbnQ+KFwiI3NlcnZlclN0YXR1c1wiKTtcblx0YnRuTmF0aXZlVGVzdEFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bk5hdGl2ZVRlc3RBcHBcIik7XG5cdGJ0bldpbmRvd1Rlc3RBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5XaW5kb3dUZXN0QXBwXCIpO1xuXHRzZWxBdHRhY2hQb3NpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbEF0dGFjaFBvc2l0aW9uXCIpO1xuXHRzZWxTbmFwS2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsS2V5VG9TbmFwXCIpO1xuXHRzZWxVbnNuYXBLZXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxLZXlUb1Vuc25hcFwiKTtcblx0c2VsUmVzaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsUmVzaXplQmVoYXZpb3VyXCIpO1xuXHRzZWxUaGVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbFRoZW1lXCIpO1xuXHRidG5BdHRhY2hUb1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkF0dGFjaFRvV2luZG93XCIpO1xuXHRidG5EZXRhY2hGcm9tV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuRGV0YWNoRnJvbVdpbmRvd1wiKTtcblx0YnRuTWluaW1pemVHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bk1pbmltaXplR3JvdXBcIik7XG5cdGJ0bkdldExheW91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldExheW91dFwiKTtcblx0YnRuR2V0QXR0YWNoZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRBdHRhY2hlZFwiKTtcblx0YnRuR2V0R3JvdXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0R3JvdXBzXCIpO1xuXHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvd1wiKTtcblx0bG9nZ2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFByZUVsZW1lbnQ+KFwiI2xvZ2dpbmdcIik7XG5cdGJ0bkNsZWFyTG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQ2xlYXJMb2dcIik7XG5cdGJ0blNob3dIaWRlRGVidWdXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TaG93SGlkZURlYnVnV2luZG93XCIpO1xuXG5cdGlmIChcblx0XHRjaGtTaG93RGVidWdXaW5kb3cgJiZcblx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcCAmJlxuXHRcdGNoa0N0cmxUb1NuYXAgJiZcblx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcgJiZcblx0XHRjaGtEaXNhYmxlQmx1ckRyb3AgJiZcblx0XHRjaGtIaWRlVGFza0JhckVudHJ5ICYmXG5cdFx0Y2hrQ3VzdG9tVGFza0Jhckljb24gJiZcblx0XHRjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cCAmJlxuXHRcdGNoa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zICYmXG5cdFx0Y2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmcgJiZcblx0XHRjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoICYmXG5cdFx0dHh0UHJpbWFyeVVybCAmJlxuXHRcdHR4dEZhbGxiYWNrVXJsICYmXG5cdFx0ZmllbGRQcmltYXJ5VXJsICYmXG5cdFx0ZmllbGRGYWxsYmFja1VybCAmJlxuXHRcdHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGggJiZcblx0XHRidG5TdGFydCAmJlxuXHRcdGJ0blN0b3AgJiZcblx0XHRzZXJ2ZXJTdGF0dXMgJiZcblx0XHRidG5OYXRpdmVUZXN0QXBwICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0YnRuTWluaW1pemVHcm91cCAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkICYmXG5cdFx0YnRuR2V0R3JvdXBzICYmXG5cdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdyAmJlxuXHRcdGJ0bkNsZWFyTG9nICYmXG5cdFx0YnRuU2hvd0hpZGVEZWJ1Z1dpbmRvd1xuXHQpIHtcblx0XHR0eHRQcmltYXJ5VXJsLnZhbHVlID0gXCJodHRwczovL2V4YW1wbGVvZmJhZHVybC5jb20vc25hcC56aXBcIjtcblx0XHR0eHRGYWxsYmFja1VybC52YWx1ZSA9IHNuYXBEZWZhdWx0VXJsO1xuXHRcdGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGguYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHRjb25zdCBkaXNwbGF5ID0gY2hrQ3VzdG9tU25hcEFwcEFzc2V0UGF0aD8uY2hlY2tlZCA/IFwiXCIgOiBcIm5vbmVcIjtcblx0XHRcdGlmIChmaWVsZFByaW1hcnlVcmwpIHtcblx0XHRcdFx0ZmllbGRQcmltYXJ5VXJsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkRmFsbGJhY2tVcmwpIHtcblx0XHRcdFx0ZmllbGRGYWxsYmFja1VybC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRjb25zdCBhcHAgPSBhd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudCgpO1xuXHRcdGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgYXBwLmdldE1hbmlmZXN0KCk7XG5cblx0XHRpZiAobWFuaWZlc3QuYXBwQXNzZXRzPy5zb21lKChhc3NldDogeyBhbGlhcz86IHN0cmluZyB9KSA9PiBhc3NldC5hbGlhcyA9PT0gXCJvcGVuZmluLXNuYXBcIikpIHtcblx0XHRcdHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGguc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdH1cblxuXHRcdGlmIChtYW5pZmVzdC5hcHBBc3NldHM/LlswXT8uc3JjID09PSBcIlNOQVBfQVNTRVRfVVJMXCIpIHtcblx0XHRcdGxvZ0Vycm9yKFxuXHRcdFx0XHRcIlBsZWFzZSByZXF1ZXN0IHRoZSBTTkFQX0FTU0VUX1VSTCBmcm9tIEhFUkUgYW5kIHVwZGF0ZSBtYW5pZmVzdC5maW4uanNvbiBiZWZvcmUgcnVubmluZyB0aGUgc2FtcGxlXCJcblx0XHRcdCk7XG5cdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtDdHJsVG9TbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVHUFVEcmFnZ2luZy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlQmx1ckRyb3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGluZ1wiO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFN0YXJ0aW5nIFNuYXAgU2VydmVyIHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH1gKTtcblx0XHRcdFx0XHRzZXJ2ZXIgPSBuZXcgU25hcC5TbmFwU2VydmVyKGZpbi5tZS5pZGVudGl0eS51dWlkKTtcblx0XHRcdFx0XHRsZXQga2V5VG9TbmFwOiB1bmRlZmluZWQgfCBcImN0cmxcIiB8IFwic2hpZnRcIiB8IGJvb2xlYW47XG5cdFx0XHRcdFx0bGV0IGtleVRvVW5zbmFwOiB1bmRlZmluZWQgfCBcImN0cmxcIiB8IFwic2hpZnRcIjtcblxuXHRcdFx0XHRcdGlmIChjaGtDdHJsVG9TbmFwPy5jaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzbmFwS2V5VmFsdWUgPSBzZWxTbmFwS2V5Py52YWx1ZTtcblx0XHRcdFx0XHRcdGlmIChzbmFwS2V5VmFsdWUgPT09IFwiY3RybFwiKSB7XG5cdFx0XHRcdFx0XHRcdGtleVRvU25hcCA9IFwiY3RybFwiO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChzbmFwS2V5VmFsdWUgPT09IFwic2hpZnRcIikge1xuXHRcdFx0XHRcdFx0XHRrZXlUb1NuYXAgPSBcInNoaWZ0XCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcD8uY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qga2V5VG9VbnNuYXBWYWx1ZSA9IHNlbFVuc25hcEtleT8udmFsdWU7XG5cdFx0XHRcdFx0XHRpZiAoa2V5VG9VbnNuYXBWYWx1ZSA9PT0gXCJjdHJsXCIpIHtcblx0XHRcdFx0XHRcdFx0a2V5VG9VbnNuYXAgPSBcImN0cmxcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoa2V5VG9VbnNuYXBWYWx1ZSA9PT0gXCJzaGlmdFwiKSB7XG5cdFx0XHRcdFx0XHRcdGtleVRvVW5zbmFwID0gXCJzaGlmdFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGNvbnN0IG9wdGlvbnM6IFNlcnZlck9wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRzaG93RGVidWc6IGNoa1Nob3dEZWJ1Z1dpbmRvdz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRpc2FibGVVc2VyVW5zdGljazogY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXA/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRrZXlUb1N0aWNrOiBrZXlUb1NuYXAsXG5cdFx0XHRcdFx0XHRrZXlUb1Vuc3RpY2s6IGtleVRvVW5zbmFwLFxuXHRcdFx0XHRcdFx0ZGlzYWJsZUdQVUFjY2VsZXJhdGVkRHJhZ2dpbmc6IGNoa0Rpc2FibGVHUFVEcmFnZ2luZz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRpc2FibGVCbHVyRHJvcFByZXZpZXc6IGNoa0Rpc2FibGVCbHVyRHJvcD8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGhpZGVUYXNrYmFyRW50cnk6IGNoa0hpZGVUYXNrQmFyRW50cnk/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHR0YXNrYmFySWNvbjogY2hrQ3VzdG9tVGFza0Jhckljb24/LmNoZWNrZWQgPyBcImh0dHBzOi8vb3BlbmZpbi5jby9mYXZpY29uLmljb1wiIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0dGFza2Jhckljb25Hcm91cDogY2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXA/LmNoZWNrZWRcblx0XHRcdFx0XHRcdFx0PyBgb3BlbmZpbl9hcHBzX2dyb3VwLiR7ZmluLm1lLmlkZW50aXR5LnV1aWR9YFxuXHRcdFx0XHRcdFx0XHQ6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdGF1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zOiBjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29ucz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nOiBjaGtEaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZz8uY2hlY2tlZCxcblx0XHRcdFx0XHRcdGRlZmF1bHRSZXNpemluZ0JlaGF2aW9yOiBzZWxSZXNpemU/LnZhbHVlIGFzIFNuYXAuUmVzaXppbmdCZWhhdmlvcixcblx0XHRcdFx0XHRcdHRoZW1lOiBzZWxUaGVtZT8udmFsdWUgYXMgXCJzbmFwLW9yaWdpbmFsXCIgfCBcInNuYXAtbGlnaHQxXCIgfCBcInNuYXAtZGFyazFcIlxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoY2hrQ3VzdG9tU25hcEFwcEFzc2V0UGF0aD8uY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJpbWFyeVVybCA9IHR4dFByaW1hcnlVcmw/LnZhbHVlID8/IFwiXCI7XG5cdFx0XHRcdFx0XHRjb25zdCBmYWxsYmFja1VybCA9IHR4dEZhbGxiYWNrVXJsPy52YWx1ZTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXQgPSBhd2FpdCB2YWxpZGF0ZUFwcEFzc2V0U291cmNlKHByaW1hcnlVcmwsIGZhbGxiYWNrVXJsKTtcblx0XHRcdFx0XHRcdGlmICghdmFsaWRhdGVkQXBwQXNzZXQuc3VjY2Vzcykge1xuXHRcdFx0XHRcdFx0XHRsb2dFcnJvcihcblx0XHRcdFx0XHRcdFx0XHRcIkZhaWxlZCB0byBmZXRjaCB0aGUgYXBwIGFzc2V0IGZyb20gYm90aCBwcmltYXJ5IGFuZCBmYWxsYmFjayBVUkxzLiBDYW5ub3Qgc3RhcnQgdGhlIFNuYXAgc2VydmVyIHdpdGggY3VzdG9tIGFwcCBhc3NldCBwYXRoLlwiXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG9wdGlvbnMuY3VzdG9tU25hcEFzc2V0U291cmNlID0gdmFsaWRhdGVkQXBwQXNzZXQudmFsaWRhdGVkVXJsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5zdGFydChvcHRpb25zKTtcblxuXHRcdFx0XHRcdGlmIChjaGtTaG93RGVidWdXaW5kb3c/LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGRlYnVnV2luZG93U2hvd24gPSB0cnVlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkZWJ1Z1dpbmRvd1Nob3duID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5lbmFibGVBdXRvV2luZG93UmVnaXN0cmF0aW9uKCk7XG5cblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1yZWdpc3RlcmVkXCIsIChldmVudDogU25hcC5DbGllbnRSZWdpc3RlcmVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgUmVnaXN0ZXJlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtdW5yZWdpc3RlcmVkXCIsIChldmVudDogU25hcC5DbGllbnRVblJlZ2lzdGVyZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBVbnJlZ2lzdGVyZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmNsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dPcGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnRzLWF0dGFjaGVkXCIsIChldmVudDogU25hcC5DbGllbnRzQXR0YWNoZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudHMgQXR0YWNoZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmF0dGFjaGVkQ2xpZW50SWQgPT09IFRFU1RfQVBQX1dJTkRPV19JRCkge1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtZGV0YWNoZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudERldGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgRGV0YWNoZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LmNsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWVudC1hY3RpdmF0ZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudEFjdGl2YXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IEFjdGl2YXRlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtZGVhY3RpdmF0ZWRcIiwgKGV2ZW50OiBTbmFwLkNsaWVudERlYWN0aXZhdGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgRGVhY3RpdmF0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwibW92ZS1zaXplLWNvbXBsZXRlZFwiLCAoZXZlbnQ6IFNuYXAuTW92ZVNpemVDb21wbGV0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYE1vdmUgU2l6ZSBDb21wbGV0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiZ3JvdXBzLWNoYW5nZWRcIiwgKGV2ZW50OiBTbmFwLkdyb3Vwc0NoYW5nZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYEdyb3VwcyBDaGFuZ2VkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RhcnRlZCBTbmFwIFNlcnZlclwiKTtcblxuXHRcdFx0XHRcdGNvbnN0IHdpbiA9IGZpbi5XaW5kb3cuZ2V0Q3VycmVudFN5bmMoKTtcblx0XHRcdFx0XHRjb25zdCBuYXRpdmVJZCA9IGF3YWl0IHdpbi5nZXROYXRpdmVJZCgpO1xuXG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLnJlZ2lzdGVyV2luZG93KGZpbi5tZS5pZGVudGl0eS51dWlkLCBuYXRpdmVJZCk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRgUmVnaXN0ZXJpbmcgUGxhdGZvcm0gV2luZG93IHdpdGggSWQgJHtmaW4ubWUuaWRlbnRpdHkudXVpZH0gYW5kIGhhbmRsZSAke25hdGl2ZUlkfWBcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0YXJ0ZWRcIjtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5TdG9wLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0c2VydmVyU3RhdGUgPSBcInN0b3BwaW5nXCI7XG5cdFx0XHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0b3BwaW5nIFNuYXAgU2VydmVyXCIpO1xuXHRcdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRcdGF3YWl0IHNlcnZlci5kZXRhY2hGcm9tR3JvdXAoVEVTVF9BUFBfV0lORE9XX0lEKTtcblx0XHRcdFx0XHRcdGF3YWl0IHNlcnZlci5zdG9wKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiU3RvcHBlZCBTbmFwIFNlcnZlclwiKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdFx0XHRcdH0gZmluYWxseSB7XG5cdFx0XHRcdFx0c2VydmVyID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdG9wcGVkXCI7XG5cdFx0XHRcdFx0aXNXaW5kb3dPcGVuID0gZmFsc2U7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBydW50aW1lSW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtcblx0XHRcdFx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oeyBhbGlhczogXCJzbmFwLW5hdGl2ZS10ZXN0LWFwcFwiIH0pO1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0XHRjb25zdCBsb2NhbEFwcFVybCA9IChydW50aW1lSW5mby5hcmdzIGFzIGFueSlbXCJsb2NhbC1zdGFydHVwLXVybFwiXS5yZXBsYWNlKFwiY29uZmlnLmpzb25cIiwgXCJcIik7XG5cdFx0XHRcdGF3YWl0IGxhdW5jaEFwcChcblx0XHRcdFx0XHRcIk5hdGl2ZSBUZXN0IEFwcFwiLFxuXHRcdFx0XHRcdFRFU1RfQVBQX1dJTkRPV19JRCxcblx0XHRcdFx0XHRgJHtsb2NhbEFwcFVybH1hc3NldHNcXFxcJHthcHBBc3NldEluZm8uYWxpYXN9XFxcXCR7YXBwQXNzZXRJbmZvLnZlcnNpb259XFxcXCR7YXBwQXNzZXRJbmZvLnRhcmdldH1gLFxuXHRcdFx0XHRcdFtdLFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHR5cGU6IFwid2FpdEZvcldpbmRvd09mTmFtZVwiLFxuXHRcdFx0XHRcdFx0dGltZW91dE1zOiAxNTAwMCxcblx0XHRcdFx0XHRcdG1hdGNoUmVnZXg6IFwiXk5hdGl2ZSBUZXN0IEFwcCRcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdFx0aXNXaW5kb3dPcGVuID0gdHJ1ZTtcblx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5XaW5kb3dUZXN0QXBwPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRhd2FpdCBsYXVuY2hXaW5kb3dPcHRpb25zQXBwKCk7XG5cdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIgJiYgc2VsQXR0YWNoUG9zaXRpb24pIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IHNlbEF0dGFjaFBvc2l0aW9uLnZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5hdHRhY2hXaW5kb3dzKGZpbi5tZS5pZGVudGl0eS51dWlkLCBURVNUX0FQUF9XSU5ET1dfSUQsIHZhbHVlIGFzIFNuYXAuQXR0YWNoU2lkZSwgMCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuTWluaW1pemVHcm91cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgZ3JvdXBJZCA9IGF3YWl0IHNlcnZlci5nZXRHcm91cElkRm9yV2luZG93KFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLm1pbmltaXplR3JvdXAoZ3JvdXBJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5DbGVhckxvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdFx0XHRsb2dDbGVhcigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkdldExheW91dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgbGF5b3V0ID0gYXdhaXQgc2VydmVyLmdldExheW91dCgpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiTGF5b3V0XCIpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKEpTT04uc3RyaW5naWZ5KGxheW91dCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkdldEF0dGFjaGVkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRjb25zdCBhdHRhY2hlZCA9IGF3YWl0IHNlcnZlci5nZXRBdHRhY2hlZChmaW4ubWUuaWRlbnRpdHkudXVpZCk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJBdHRhY2hlZFwiKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShhdHRhY2hlZCwgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bkdldEdyb3Vwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgZ3JvdXBzID0gYXdhaXQgc2VydmVyLmdldEFsbEdyb3VwSWRzKCk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJHcm91cCBJZHNcIik7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoZ3JvdXBzLCB1bmRlZmluZWQsIFwiICBcIikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGJ0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGdyb3VwSWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0R3JvdXBJZEZvcldpbmRvdyhmaW4ubWUuaWRlbnRpdHkubmFtZSk7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYEdyb3VwIElkIEZvciBDdXJyZW50IFdpbmRvdzogJHtncm91cElkfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGRlYnVnV2luZG93U2hvd24gPSAhZGVidWdXaW5kb3dTaG93bjtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc2hvd0RlYnVnV2luZG93KGRlYnVnV2luZG93U2hvd24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgc2hvcnQgaGFzaCBzdHJpbmcgZnJvbSBhIFVSTCB0byB1c2UgYXMgYSB2ZXJzaW9uIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0gdXJsIFRoZSBVUkwgdG8gaGFzaC5cbiAqIEByZXR1cm5zIEEgaGV4IHN0cmluZyBoYXNoIG9mIHRoZSBVUkwuXG4gKi9cbmZ1bmN0aW9uIGhhc2hVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRsZXQgaGFzaCA9IDUzODE7XG5cdGNvbnN0IG1heFNhZmVIYXNoID0gNF8yOTRfOTY3XzI5MTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB1cmwubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBjb2RlUG9pbnQgPSB1cmwuY2hhckNvZGVBdChpKTtcblx0XHRjb25zdCBtdWx0aXBsaWVkSGFzaCA9IGhhc2ggKiAzMztcblx0XHRoYXNoID0gKG11bHRpcGxpZWRIYXNoICsgY29kZVBvaW50KSAlIG1heFNhZmVIYXNoO1xuXHR9XG5cdGNvbnN0IGhhc2hIZXggPSBNYXRoLmZsb29yKGhhc2gpLnRvU3RyaW5nKDE2KTtcblx0cmV0dXJuIGhhc2hIZXgucGFkU3RhcnQoOCwgXCIwXCIpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIERPTSBlbGVtZW50cyB3aXRoIHRoZSBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlU2VydmVyU3RhdHVzKCk6IHZvaWQge1xuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0Y2hrQ3RybFRvU25hcCAmJlxuXHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwICYmXG5cdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nICYmXG5cdFx0Y2hrRGlzYWJsZUJsdXJEcm9wICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdHNlbEF0dGFjaFBvc2l0aW9uICYmXG5cdFx0YnRuR2V0TGF5b3V0ICYmXG5cdFx0YnRuR2V0QXR0YWNoZWQgJiZcblx0XHRidG5HZXRHcm91cHMgJiZcblx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93ICYmXG5cdFx0YnRuU2hvd0hpZGVEZWJ1Z1dpbmRvd1xuXHQpIHtcblx0XHRpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRpbmdcIiB8fCBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGluZ1wiKSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrQ3RybFRvU25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUJsdXJEcm9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEdyb3Vwcy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gYFNuYXAgU2VydmVyIGlzICR7c2VydmVyU3RhdGV9YDtcblx0XHR9IGVsc2UgaWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0ZWRcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0N0cmxUb1NuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVCbHVyRHJvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRMYXlvdXQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRHcm91cHMuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RhcnRlZFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGNoa0N0cmxUb1NuYXAuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGNoa0Rpc2FibGVCbHVyRHJvcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEF0dGFjaGVkLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldEdyb3Vwcy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0c2VydmVyU3RhdHVzLnRleHRDb250ZW50ID0gXCJTbmFwIFNlcnZlciBpcyBzdG9wcGVkXCI7XG5cdFx0fVxuXHR9XG5cdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIHdpbmRvdyBzdGF0ZS5cbiAqL1xuZnVuY3Rpb24gdXBkYXRlV2luZG93U3RhdHVzKCk6IHZvaWQge1xuXHRpZiAoXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdHNlbEF0dGFjaFBvc2l0aW9uICYmXG5cdFx0YnRuQXR0YWNoVG9XaW5kb3cgJiZcblx0XHRidG5EZXRhY2hGcm9tV2luZG93ICYmXG5cdFx0YnRuTWluaW1pemVHcm91cCAmJlxuXHRcdGJ0bldpbmRvd1Rlc3RBcHBcblx0KSB7XG5cdFx0aWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0aW5nXCIgfHwgc2VydmVyU3RhdGUgPT09IFwic3RvcHBpbmdcIikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5XaW5kb3dUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuTWluaW1pemVHcm91cC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIgJiYgaXNXaW5kb3dPcGVuKSB7XG5cdFx0XHRidG5OYXRpdmVUZXN0QXBwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlbEF0dGFjaFBvc2l0aW9uLmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkF0dGFjaFRvV2luZG93LmRpc2FibGVkID0gaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bkRldGFjaEZyb21XaW5kb3cuZGlzYWJsZWQgPSAhaXNXaW5kb3dBdHRhY2hlZDtcblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuZGlzYWJsZWQgPSAhaXNXaW5kb3dBdHRhY2hlZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHNlcnZlclN0YXRlID09PSBcInN0b3BwZWRcIjtcblx0XHRcdGJ0bldpbmRvd1Rlc3RBcHAuZGlzYWJsZWQgPSBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGVkXCI7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFNlbmQgaW5mb3JtYXRpb24gdG8gdGhlIGxvZyBkaXNwbGF5LlxuICogQHBhcmFtIGluZm9ybWF0aW9uIFRoZSBpbmZvcm1hdGlvbiB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dJbmZvcm1hdGlvbihpbmZvcm1hdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9JHtpbmZvcm1hdGlvbn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGVycm9yIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIHNlbmQuXG4gKi9cbmZ1bmN0aW9uIGxvZ0Vycm9yKGVycjogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IGAke2xvZ2dpbmcudGV4dENvbnRlbnR9RVJST1I6ICR7ZXJyfVxcblxcbmA7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSBsb2dnaW5nLnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIENsZWFyIHRoZSBsb2cgZGlzcGxheS5cbiAqL1xuZnVuY3Rpb24gbG9nQ2xlYXIoKTogdm9pZCB7XG5cdGlmIChsb2dnaW5nKSB7XG5cdFx0bG9nZ2luZy50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nZ2luZy5zY3JvbGxUb3AgPSAwO1xuXHR9XG59XG5cbi8qKlxuICogTGF1bmNoIGFuIGFwcGxpY2F0aW9uIHVzaW5nIFNuYXAuXG4gKiBAcGFyYW0gYXBwTmFtZSBUaGUgbmFtZSBvZiB0aGUgYXBwIHRoYXQgaXMgYmVpbmcgbGF1bmNoZWQuXG4gKiBAcGFyYW0gY2xpZW50SWQgQW4gSWQgdG8gYXNzb2NpYXRlIHdpdGggdGhlIGxhdW5jaGVkIGFwcC5cbiAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBhcHAgdG8gbGF1bmNoLlxuICogQHBhcmFtIGFyZ3MgQWRkaXRpb25hbCBjb21tYW5kIGxpbmUgYXJndW1lbnRzIGZvciB0aGUgbGF1bmNoLlxuICogQHBhcmFtIHN0cmF0ZWd5IFRoZSBzdHJhdGVneSB0byBsYXVuY2ggdGhlIHdpbmRvdyB3aXRoLlxuICovXG5hc3luYyBmdW5jdGlvbiBsYXVuY2hBcHAoXG5cdGFwcE5hbWU6IHN0cmluZyxcblx0Y2xpZW50SWQ6IHN0cmluZyxcblx0cGF0aDogc3RyaW5nLFxuXHRhcmdzOiBzdHJpbmdbXSxcblx0c3RyYXRlZ3k6IFNuYXAuTGF1bmNoU3RyYXRlZ3lcbik6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBMYXVuY2hpbmcgJHthcHBOYW1lfWApO1xuXHRcdFx0Y29uc3QgbGF1bmNoUmVzdWx0ID0gYXdhaXQgc2VydmVyLmxhdW5jaCh7XG5cdFx0XHRcdHBhdGgsXG5cdFx0XHRcdGNsaWVudElkLFxuXHRcdFx0XHRhcmdzLFxuXHRcdFx0XHRzdHJhdGVneVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChsYXVuY2hSZXN1bHQ/LnByb2Nlc3NfaWQpIHtcblx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYCR7YXBwTmFtZX0gbGF1bmNoZWQgd2l0aCBwcm9jZXNzIGlkICR7bGF1bmNoUmVzdWx0LnByb2Nlc3NfaWR9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGNhdGNoIChlcnIpIHtcblx0XHRsb2dFcnJvcihmb3JtYXRFcnJvcihlcnIpKTtcblx0fVxufVxuXG4vKipcbiAqIExhdW5jaGVzIGEgd2luZG93IHRoYXQgY2FuIGJlIHVzZWQgdG8gY3JlYXRlIGNoaWxkIHdpbmRvd3MuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGxhdW5jaFdpbmRvd09wdGlvbnNBcHAoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChzZXJ2ZXJTdGF0ZSAhPT0gXCJzdGFydGVkXCIpIHtcblx0XHRsb2dFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBzdGFydGVkXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCB3aW5kb3dPcHRpb25zTmFtZSA9IFwid2luZG93LW9wdGlvbnMtYXBwXCI7XG5cdGNvbnN0IG9wdGlvbnNXaW5kb3cgPSBmaW4uV2luZG93LndyYXBTeW5jKHsgdXVpZDogZmluLm1lLmlkZW50aXR5LnV1aWQsIG5hbWU6IHdpbmRvd09wdGlvbnNOYW1lIH0pO1xuXG5cdHRyeSB7XG5cdFx0YXdhaXQgb3B0aW9uc1dpbmRvdy5nZXRJbmZvKCk7XG5cdFx0YXdhaXQgb3B0aW9uc1dpbmRvdy5icmluZ1RvRnJvbnQoKTtcblx0fSBjYXRjaCB7XG5cdFx0Ly8gd2luZG93IGRvZXMgbm90IGV4aXN0LCBzbyBjcmVhdGUgaXRcblx0XHRhd2FpdCBmaW4uV2luZG93LmNyZWF0ZSh7XG5cdFx0XHRuYW1lOiB3aW5kb3dPcHRpb25zTmFtZSxcblx0XHRcdGF1dG9TaG93OiB0cnVlLFxuXHRcdFx0ZGVmYXVsdEhlaWdodDogNjAwLFxuXHRcdFx0ZGVmYXVsdFdpZHRoOiA4MDAsXG5cdFx0XHR1cmw6IFwiaHR0cHM6Ly9idWlsdC1vbi1vcGVuZmluLmdpdGh1Yi5pby9jb250YWluZXItc3RhcnRlci9tYWluL3VzZS13aW5kb3ctb3B0aW9ucy9odG1sL2FwcC5odG1sXCJcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIFZhbGlkYXRlcyB0aGUgc25hcCBhcHAgYXNzZXQgZnJvbSB0aGUgcHJvdmlkZWQgcHJpbWFyeSBhbmQgZmFsbGJhY2sgVVJMcyB0byBlbnN1cmUgaXQgaXMgYXZhaWxhYmxlIGJlZm9yZSBzdGFydGluZyB0aGUgU25hcCBzZXJ2ZXIuXG4gKiBAcGFyYW0gcHJpbWFyeVVybCBUaGUgcHJpbWFyeSBVUkwgdG8gdmFsaWRhdGUgdGhlIHNuYXAgYXBwIGFzc2V0IGZyb20uXG4gKiBAcGFyYW0gZmFsbGJhY2tVcmwgQW4gb3B0aW9uYWwgZmFsbGJhY2sgVVJMIHRvIHZhbGlkYXRlIHRoZSBzbmFwIGFwcCBhc3NldCBmcm9tIGlmIHRoZSBwcmltYXJ5IFVSTCBmYWlscy5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHZhbGlkYXRpb24gd2FzIHN1Y2Nlc3NmdWwsIHRoZSB2YWxpZGF0ZWQgVVJMIGlmIHN1Y2Nlc3NmdWwsIGFuZCB3aGV0aGVyIHRoZSBmYWxsYmFjayBVUkwgd2FzIHVzZWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHZhbGlkYXRlQXBwQXNzZXRTb3VyY2UoXG5cdHByaW1hcnlVcmw6IHN0cmluZyxcblx0ZmFsbGJhY2tVcmw/OiBzdHJpbmdcbik6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyB2YWxpZGF0ZWRVcmw/OiBzdHJpbmc7IGlzRmFsbGJhY2tVcmw/OiBib29sZWFuIH0+IHtcblx0Y29uc3Qgc25hcEFzc2V0SW5mbzogT3BlbkZpbi5BcHBBc3NldEluZm8gPSB7XG5cdFx0YWxpYXM6IHNuYXBBbGlhcyxcblx0XHRzcmM6IHNuYXBEZWZhdWx0VXJsLFxuXHRcdHZlcnNpb246IHNuYXBWZXJzaW9uLFxuXHRcdHRhcmdldDogc25hcFRhcmdldCxcblx0XHRtYW5kYXRvcnk6IGZhbHNlXG5cdH07XG5cdC8vIGJlZm9yZSB0cnlpbmcgY3VzdG9tIHVybHMgY2hlY2sgdG8gc2VlIGlmIHlvdSBhbHJlYWR5IGhhdmUgc25hcFxuXHRjb25zdCBzbmFwRG93bmxvYWRlZEFzc2V0SW5mbzogT3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQgPSBhd2FpdCBkb2VzQXBwQXNzZXRFeGlzdChcblx0XHRzbmFwQXNzZXRJbmZvLmFsaWFzLFxuXHRcdHNuYXBBc3NldEluZm8udmVyc2lvblxuXHQpO1xuXG5cdGlmIChzbmFwRG93bmxvYWRlZEFzc2V0SW5mbykge1xuXHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0YFdlIGhhdmUgYSBzbmFwIGFzc2V0IHRoYXQgbWF0Y2hlcyB0aGUgYWxpYXMgYW5kIHZlcnNpb24uIEl0IGhhcyB0aGUgZm9sbG93aW5nIGRldGFpbHM6IGFsaWFzOiAke3NuYXBEb3dubG9hZGVkQXNzZXRJbmZvLmFsaWFzfSwgdmVyc2lvbjogJHtzbmFwRG93bmxvYWRlZEFzc2V0SW5mby52ZXJzaW9ufSwgc3JjOiAke3NuYXBEb3dubG9hZGVkQXNzZXRJbmZvLnNyY31gXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdHZhbGlkYXRlZFVybDogc25hcERvd25sb2FkZWRBc3NldEluZm8uc3JjLFxuXHRcdFx0aXNGYWxsYmFja1VybDogc25hcERvd25sb2FkZWRBc3NldEluZm8uc3JjID09PSBmYWxsYmFja1VybFxuXHRcdH07XG5cdH1cblxuXHQvLyBTTkFQIGRvd25sb2FkcyBhIHNwZWNpZmljIGFsaWFzICsgdmVyc2lvbiBjb21iaW5hdGlvbi5cblx0Ly8gVGhlIHJ1bnRpbWUgZG9lcyBub3QgYWxsb3cgYSByZXRyeSBvZiB0aGUgc2FtZSBhcHAgYXNzZXQgaWYgdGhlIG9ubHkgdGhpbmcgdGhhdCBoYXMgY2hhbmdlZCBpcyB0aGUgdXJsLlxuXHQvLyBTaW5jZSB3ZSBoYXZlIG5vIHNuYXAgdmVyc2lvbiB3ZSB3YW50IHRvIHZhbGlkYXRlIG91ciBwcmltYXJ5IHVybC5cblx0bG9nSW5mb3JtYXRpb24oYFZhbGlkYXRpbmcgdGhlIHByaW1hcnkgYXNzZXQgdXJsIGZvciB0aGUgc25hcCBhc3NldDogJHtwcmltYXJ5VXJsfWApO1xuXHRzbmFwQXNzZXRJbmZvLmFsaWFzID0gYCR7c25hcEFsaWFzfS12YWxpZGF0ZS1kb3dubG9hZGA7IC8vIHVzZSBhIGRpZmZlcmVudCBhbGlhcyBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWQgc28gdGhhdCB3ZSBjYW4gaGF2ZSBkaWZmZXJlbnQgdmVyc2lvbnMgaWYgbmVlZGVkIHdpdGhvdXQgY29uZmxpY3Qgd2l0aCB0aGUgYWN0dWFsIHNuYXAgYXNzZXQgYWxpYXNcblxuXHRzbmFwQXNzZXRJbmZvLnRhcmdldCA9IFwiTm9PcFwiOyAvLyBXZSBkb24ndCB3YW50IHRvIGFjdHVhbGx5IHJ1biB0aGUgc25hcCBhc3NldCBkdXJpbmcgdmFsaWRhdGlvbiBzaW5jZSB3ZSBqdXN0IHdhbnQgdG8gY2hlY2sgaWYgdGhlIHVybCBpcyB2YWxpZCBhbmQgdGhlIGFzc2V0IGNhbiBiZSBkb3dubG9hZGVkLCBzbyB1c2UgYSBOb09wIHRhcmdldCB0aGF0IHdpbGwgbm90IGRvIGFueXRoaW5nIGlmIGl0IGlzIHJ1biBmb3IgYW55IHJlYXNvbiBkdXJpbmcgdGhlIHZhbGlkYXRpb24gcHJvY2Vzc1xuXG5cdC8vIFVwZGF0ZSBhc3NldCBpbmZvIHRvIHRhcmdldCBwcmltYXJ5IHVybFxuXHRzbmFwQXNzZXRJbmZvLnNyYyA9IHByaW1hcnlVcmw7IC8vIHVwZGF0ZSB0aGUgc3JjIHRvIHRoZSBwcmltYXJ5IHVybCBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWRcblx0c25hcEFzc2V0SW5mby52ZXJzaW9uID0gaGFzaFVybChwcmltYXJ5VXJsKTsgLy8gdXNlIHRoZSB1cmwgaGFzaCBhcyB0aGUgdmVyc2lvbiBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWQgc28gdGhhdCBpZiB0aGUgdXJsIGNoYW5nZXMgd2Ugd2lsbCBhdHRlbXB0IHRvIGRvd25sb2FkIGFnYWluLCBidXQgaWYgdGhlIHVybCBpcyB0aGUgc2FtZSB3ZSB3aWxsIG5vdCBhdHRlbXB0IHRvIGRvd25sb2FkIGFnYWluIHNpbmNlIHdlIGhhdmUgYWxyZWFkeSB2YWxpZGF0ZWQgaXRcblxuXHRjb25zdCB2YWxpZGF0ZWRBcHBBc3NldFByaW1hcnlVcmwgPSBhd2FpdCBmZXRjaEFwcEFzc2V0KHNuYXBBc3NldEluZm8pO1xuXHRsZXQgdmFsaWRhdGVkQXNzZXRVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuXHRpZiAodmFsaWRhdGVkQXBwQXNzZXRQcmltYXJ5VXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRpZiAoZmFsbGJhY2tVcmwpIHtcblx0XHRcdC8vIHZhbGlkYXRlIGZhbGxiYWNrIHVybFxuXHRcdFx0bG9nSW5mb3JtYXRpb24oYFZhbGlkYXRpbmcgdGhlIGZhbGxiYWNrIGFzc2V0IHVybCBmb3IgdGhlIHNuYXAgYXNzZXQ6ICR7ZmFsbGJhY2tVcmx9YCk7XG5cdFx0XHRzbmFwQXNzZXRJbmZvLnNyYyA9IGZhbGxiYWNrVXJsOyAvLyB1cGRhdGUgdGhlIHNyYyB0byB0aGUgZmFsbGJhY2sgdXJsIGZvciB0aGUgdmFsaWRhdGlvbiBkb3dubG9hZFxuXHRcdFx0c25hcEFzc2V0SW5mby52ZXJzaW9uID0gaGFzaFVybChmYWxsYmFja1VybCk7IC8vIHVzZSB0aGUgdXJsIGhhc2ggYXMgdGhlIHZlcnNpb24gZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkIHNvIHRoYXQgaWYgdGhlIHVybCBjaGFuZ2VzIHdlIHdpbGwgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiwgYnV0IGlmIHRoZSB1cmwgaXMgdGhlIHNhbWUgd2Ugd2lsbCBub3QgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiBzaW5jZSB3ZSBoYXZlIGFscmVhZHkgdmFsaWRhdGVkIGl0XG5cdFx0XHRjb25zdCB2YWxpZGF0ZWRBcHBBc3NldEZhbGxiYWNrVXJsID0gYXdhaXQgZmV0Y2hBcHBBc3NldChzbmFwQXNzZXRJbmZvKTtcblxuXHRcdFx0aWYgKHZhbGlkYXRlZEFwcEFzc2V0RmFsbGJhY2tVcmwpIHtcblx0XHRcdFx0dmFsaWRhdGVkQXNzZXRVcmwgPSBmYWxsYmFja1VybDtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0dmFsaWRhdGVkQXNzZXRVcmwgPSBwcmltYXJ5VXJsO1xuXHR9XG5cblx0aWYgKHZhbGlkYXRlZEFzc2V0VXJsKSB7XG5cdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRgU3VjY2Vzc2Z1bGx5IHZhbGlkYXRlZCB0aGUgdXJsIGZvciB0aGUgc25hcCBhc3NldDogJHt2YWxpZGF0ZWRBc3NldFVybH0uIFRoaXMgdXJsIHdpbGwgYmUgcGFzc2VkIHRvIFNuYXAgT3B0aW9ucyB0aHJvdWdoIHRoZSBjdXN0b21TbmFwQXNzZXRTb3VyY2Ugc2V0dGluZy5gXG5cdFx0KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdHZhbGlkYXRlZFVybDogdmFsaWRhdGVkQXNzZXRVcmwsXG5cdFx0XHRpc0ZhbGxiYWNrVXJsOiB2YWxpZGF0ZWRBc3NldFVybCA9PT0gZmFsbGJhY2tVcmxcblx0XHR9O1xuXHR9XG5cdHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlIH07XG59XG5cbi8qKlxuICogRG93bmxvYWQgYW5kIHJldHVybiBhcHAgYXNzZXQgaW5mbyBmb3IgdGhlIHByb3ZpZGVkIGFwcCBhc3NldCBkZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcEFzc2V0SW5mbyBUaGUgYXBwIGFzc2V0IGRlZmluaXRpb24gdG8gZG93bmxvYWQuXG4gKiBAcmV0dXJucyBUaGUgYXBwIGFzc2V0IGluZm8gaWYgZG93bmxvYWRlZCBvciBmb3VuZCwgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBcHBBc3NldChhcHBBc3NldEluZm86IE9wZW5GaW4uQXBwQXNzZXRJbmZvKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHRjb25zdCB2YWxpZGF0ZWRBcHBBc3NldCA9IGF3YWl0IGRvd25sb2FkQXBwQXNzZXQoYXBwQXNzZXRJbmZvLCB7XG5cdFx0bG9nZ2VyOiBjdXN0b21Mb2dnZXIsXG5cdFx0YXNzZXREb3dubG9hZFByb2dyZXNzOiAocHJvZ3Jlc3M6IG51bWJlciwgc3JjOiBzdHJpbmcsIGFsaWFzOiBzdHJpbmcpID0+IHtcblx0XHRcdC8vIHNob3dpbmcgYSBkaWZmZXJlbmNlIGFzIHRoZSBkb3dubG9hZCBBcHAgQXNzZXQgYWxzbyBsb2dzIHRoZSBkb3dubG9hZCBwcm9ncmVzcyB1c2luZyBsb2dJbmZvcm1hdGlvbiBhbmQgbG9nRXJyb3IgdGhyb3VnaCB0aGUgY3VzdG9tIGxvZ2dlci5cblx0XHRcdGNvbnNvbGUubG9nKGBEb3dubG9hZCBwcm9ncmVzcyBmb3IgYWxpYXMgJyR7YWxpYXN9JyBmcm9tICcke3NyY30nOiAke3Byb2dyZXNzfSVgKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gdmFsaWRhdGVkQXBwQXNzZXQ7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=