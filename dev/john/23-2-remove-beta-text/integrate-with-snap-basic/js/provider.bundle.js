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
/* harmony export */   SnapServer: () => (/* binding */ p)
/* harmony export */ });
var e={827:e=>{var t,n="object"==typeof Reflect?Reflect:null,i=n&&"function"==typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,e.exports.once=function(e,t){return new Promise(function(n,i){function r(n){e.removeListener(t,a),i(n)}function a(){"function"==typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}w(e,t,a,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&w(e,"error",t,n)}(e,r,{once:!0})})},a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var s=10;function o(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function p(e,t,n,i){var r,a,s,p;if(o(n),void 0===(a=e._events)?(a=e._events=Object.create(null),e._eventsCount=0):(void 0!==a.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),a=e._events),s=a[t]),void 0===s)s=a[t]=n,++e._eventsCount;else if("function"==typeof s?s=a[t]=i?[n,s]:[s,n]:i?s.unshift(n):s.push(n),(r=c(e))>0&&s.length>r&&!s.warned){s.warned=!0;var l=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");l.name="MaxListenersExceededWarning",l.emitter=e,l.type=t,l.count=s.length,p=l,console&&console.warn&&console.warn(p)}return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(e,t,n){var i={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=l.bind(i);return r.listener=n,i.wrapFn=r,r}function d(e,t,n){var i=e._events;if(void 0===i)return[];var r=i[t];return void 0===r?[]:"function"==typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):f(r,r.length)}function u(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function f(e,t){for(var n=new Array(t),i=0;i<t;++i)n[i]=e[i];return n}function w(e,t,n,i){if("function"==typeof e.on)i.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,function r(a){i.once&&e.removeEventListener(t,r),n(a)})}}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return c(this)},a.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,a=this._events;if(void 0!==a)r=r&&void 0===a.error;else if(!r)return!1;if(r){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var o=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw o.context=s,o}var c=a[e];if(void 0===c)return!1;if("function"==typeof c)i(c,this,t);else{var p=c.length,l=f(c,p);for(n=0;n<p;++n)i(l[n],this,t)}return!0},a.prototype.addListener=function(e,t){return p(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return p(this,e,t,!0)},a.prototype.once=function(e,t){return o(t),this.on(e,h(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return o(t),this.prependListener(e,h(this,e,t)),this},a.prototype.removeListener=function(e,t){var n,i,r,a,s;if(o(t),void 0===(i=this._events))return this;if(void 0===(n=i[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=Object.create(null):(delete i[e],i.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(r=-1,a=n.length-1;a>=0;a--)if(n[a]===t||n[a].listener===t){s=n[a].listener,r=a;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(i[e]=n[0]),void 0!==i.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,n,i;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,a=Object.keys(n);for(i=0;i<a.length;++i)"removeListener"!==(r=a[i])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(i=t.length-1;i>=0;i--)this.removeListener(e,t[i]);return this},a.prototype.listeners=function(e){return d(this,e,!0)},a.prototype.rawListeners=function(e){return d(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):u.call(e,t)},a.prototype.listenerCount=u,a.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i=n(827);const r="openfin-snap",a="1.6.1",s=(e,t)=>`${e} ${t instanceof Error?t.message:"string"==typeof t?t:JSON.stringify(t)}`,o=async()=>{try{return(await fin.System.getAppAssetInfo({alias:r})).version===a}catch(e){return!1}},c="internal-generated-window-";class p{constructor(e,t=1e4,n=5e3){if(this.server_id=e,this.emitter=new i.EventEmitter,this.__extensions=[],this.snapServerStatus="disconnected",this.healthCheckInitializing=!1,this.isSnapshotPreparedForApply=!1,this.pendingWindowRegistrations=0,this.preparedWindowRegistrationClientIds=new Set,this.pendingRegistrationPromises=new Set,!fin)throw new Error("OpenFin is not available");if(t<1e3)throw new Error(`healthCheckIntervalMs must be at least 1000ms (provided: ${t}ms). Values below this are excessive and cause unnecessary overhead.`);if(n<500)throw new Error(`healthCheckTimeoutMs must be at least 500ms (provided: ${n}ms). Timeout must allow sufficient time for network round-trip and server response.`);if(n>=t)throw new Error(`healthCheckTimeoutMs (${n}ms) must be less than healthCheckIntervalMs (${t}ms). This ensures the timeout completes before the next health check begins, allowing time for recovery.`);this.healthCheckIntervalMs=t,this.healthCheckTimeoutMs=n}async start(e){try{const e=await fin.System.getRuntimeInfo();"x64"!==e?.architecture&&console.warn(`The architecture of the connected OpenFin runtime is '${e.architecture}' - Window snapping is currently only supported with 64-bit applications. Snapping will be disabled.`)}catch(e){console.warn(`Could not get runtime info: ${e}`)}const t=await fin.System.queryPermissionForCurrentContext("System.launchExternalProcess");if(!t.granted)throw new Error("The 'System.launchExternalProcess' permission is required to launch the Snap server");if(t.rawValue){if(e?.executablePath&&!t.rawValue?.executables?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from an executable path");if(!e?.executablePath&&!t.rawValue?.assets?.enabled)throw new Error("The 'System.launchExternalProcess.assets' permission is required to launch the Snap server from a URL")}e?.executablePath||await(async e=>{const t=await fin.Application.getCurrentSync().getManifest(),n=t.appAssets?.find(e=>e.alias===r);if(n)return void console.warn("Detected Snap package in app manifest appAssets",n);if(await o())return void console.info("Using existing Snap package");const i=e??`https://cdn.openfin.co/release/snap/${a}/snap.zip`;console.info(`Downloading Snap asset from: '${i}'`);const c={alias:r,src:`${i}`,target:"OpenFinSnap.exe",version:a};console.info("Downloading Snap package",c);try{await fin.System.downloadAsset(c,()=>{})}catch(e){throw new Error(s("Unable to download Snap package.",e))}})(e?.customSnapAssetSource);const n=await this.build_command_line(e);let i={alias:r,arguments:n,lifetime:"window"};e?.executablePath&&(i={path:e.executablePath,arguments:n,lifetime:"window"});try{this.snap_identity=await fin.System.launchExternalProcess(i)}catch(e){throw new Error(s("Failed to launch the Snap server.",e))}return this.connect()}async connect(){await this.internalConnect(!0)}__addExtension(e){this.__extensions.push(e)}async stop(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"shutdown"}))}async showDebugWindow(e){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"showDebugWindow",payload:{show:e}}))}async getLayout(){if(!this.client)throw new Error("Snap server is not running");const e=await(this.client?.dispatch("snap_api_invoke",{action:"serialiseLayout"}));return e?.payload.layout}async setLayout(e,t=!0){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"deserialiseLayout",payload:{layout:e,reset:t}}))}async enterDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"enterBatchMode"}))}async exitDeferredLayout(){if(!this.client)throw new Error("Snap server is not running");await(this.client?.dispatch("snap_api_invoke",{action:"exitBatchMode"}))}async prepareToApplySnapshot(e,t){this.preparedWindowRegistrationClientIds.clear(),this.isSnapshotPreparedForApply=!1;if(!e||e.options?.closeExistingWindows||e.options?.closeSnapshotWindows)return this.needToResetLayout=!0,void await(this.client?.dispatch("snap_api_invoke",{action:"resetAll"}));this.needToResetLayout=!1;const n=e.snapshot,i=JSON.stringify(n,null,2),r=n.snap;if(!r)return;await(this.client?.dispatch("snap_api_invoke",{action:"prepareToApplyLayout"}));const a=t??w,s=(await this.getLayout())?.clients.map(e=>e.id)??[],o=u(n.windows),c=Array.from(o.keys()).filter(e=>s.includes(e));r.clients.filter(e=>c.includes(e.id)).forEach(e=>{const t=e.id,n=a(t);e.id=n,f(r.connections,t,n);const i=o.get(t);i.customData.snapClientId=n,i.name=n});const p=JSON.stringify(n,null,2);console.debug(`Snap SDK modified snapshot data before applying it.\nOriginal snapshot:\n${i}\nModified snapshot:\n${p}`),this.isSnapshotPreparedForApply=!0}async decorateSnapshot(e){return{...e,snap:await this.getLayout()}}async applySnapshot(e){if(!this.isSnapshotPreparedForApply)throw new Error("prepareToApplySnapshot must be called before applySnapshot.");try{if(!e.snap)return;const t=e.snap.clients?.map(e=>e.id)??[];if(0===t.length)return;await this.drainPendingWindowRegistrations(t),await this.setLayout(e.snap,this.needToResetLayout)}finally{this.isSnapshotPreparedForApply=!1,this.preparedWindowRegistrationClientIds.clear()}}async launch(e){if(!this.client)throw new Error("Not connected to an Snap server");e.appAssetInfo&&(e.path=await l({target:e.path,...e.appAssetInfo})),console.log("options: ",e);const t={action:"startProcess",payload:{...e,args:e.args||[]}};if(e.strategy){const{type:n,...i}=e.strategy;t.payload.strategy={type:n,parameters:{...i}}}const n=await(this.client?.dispatch("snap_api_invoke",t));if(n?.payload?.success)return{process_id:n.payload.process_id};throw new Error(`Failed to launch process: ${n?.payload?.error}`)}async registerWindow(e,t,n){await(this.client?.dispatch("snap_api_invoke",{action:"hookAndRegisterWindow",payload:{clientId:e,windowHandle:t,resizingBehavior:n}}))}async enableAutoWindowRegistration(){const e=e=>{this.handleNewWindow(e)};return await fin.Platform.getCurrentSync().addListener("window-created",e),async()=>{await fin.System.removeListener("window-created",e)}}async attachWindows(e,t,n,i){await(this.client?.dispatch("snap_api_invoke",{action:"attach",payload:{targetClientId:e,toAttachClientId:t,targetSide:n,offset:i}}))}async detachFromGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"detachFromGroup",payload:{clientId:e}}))}async getAttached(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAttachedInstances",payload:{clientId:e}}))).payload.attached}async hasAttachments(e){return(await(this.client?.dispatch("snap_api_invoke",{action:"hasAttachments",payload:{clientId:e}}))).payload.hasAttachments}addEventListener(e,t){this.emitter.on(e,t)}removeEventListener(e,t){this.emitter.off(e,t)}once(e,t){this.emitter.once(e,t)}async getClientIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{nativeWindowId:Number.NaN}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getClientIdForWindow",payload:t}));if(!n.payload.clientId)throw new Error("No client ID found for window");return n.payload.clientId}async getGroupIdForWindow(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getGroupIdForWindow",payload:t}));if(!n.payload.groupId)throw new Error("No group found for window");return n.payload.groupId}async getWindowResizable(e){const t="number"==typeof e?{nativeWindowId:e}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e}:{nativeWindowId:this.hexStringToNumber(e)},n=await(this.client?.dispatch("snap_api_invoke",{action:"getResizable",payload:t}));if(null===n.payload.resizable)throw new Error("No window found for given ID");return n.payload.resizable}async setWindowResizable(e,t){const n="number"==typeof e?{nativeWindowId:e,resizable:t}:Number.isNaN(this.hexStringToNumber(e))?{clientId:e,resizable:t}:{nativeWindowId:this.hexStringToNumber(e),resizable:t};await(this.client?.dispatch("snap_api_invoke",{action:"setResizable",payload:n}))}async getWindowsInGroup(e){const t=await(this.client?.dispatch("snap_api_invoke",{action:"getWindowsInGroup",payload:{groupId:e}}));return t.payload.windows?t.payload.windows.map(e=>({nativeId:e[0],clientId:e[1]})):[]}async getAllGroupIds(){return(await(this.client?.dispatch("snap_api_invoke",{action:"getAllGroupIds"}))).payload.groupIds}async minimizeGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"minimizeGroup",payload:{groupId:e}}))}async restoreGroup(e){await(this.client?.dispatch("snap_api_invoke",{action:"restoreGroup",payload:{groupId:e}}))}getSnapServerStatus(){return this.snapServerStatus}handleSnapServerDisconnection(){this.stopHealthCheck(),this.client=void 0,this.setSnapServerStatus("disconnected"),console.warn("SnapSDK: Disconnected from Snap server, attempt reconnect."),this.internalConnect(!1)}async internalConnect(e){if(this.stopHealthCheck(),this.client=await fin.InterApplicationBus.Channel.connect(`snap-server-core-${this.server_id}`),this.client.register("snap_handshake",async(t,n)=>{try{e&&await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:t.version,componentName:"snap-server"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}}),this.client.onDisconnection(()=>this.handleSnapServerDisconnection()),e)try{await fin.System.registerUsage({type:"adapter-feature",data:{apiVersion:"1.6.1",componentName:"snap-client"}})}catch{console.warn("SnapSDK: Failed to register usage for Snap Server")}this.client.register("snap_updates",(e,t)=>this.handleSnapEvents(e,t)),this.setSnapServerStatus("connected"),this.startHealthCheck(),this.__extensions.forEach(e=>e.onConnected(this.client))}setSnapServerStatus(e){this.snapServerStatus!==e&&(this.snapServerStatus=e,"disconnected"===e?this.emit_event("snap-server-disconnected",{}):"no-response"===e&&this.emit_event("snap-server-no-response",{timestamp:Date.now()}))}startHealthCheck(){if("disconnected"!==this.snapServerStatus&&!this.healthCheckInitializing&&!this.healthCheckInterval){this.healthCheckInitializing=!0;try{this.healthCheckInterval=setInterval(async()=>{if("disconnected"!==this.snapServerStatus&&this.client)try{const e=new Promise((e,t)=>{setTimeout(()=>t(new Error("Snap server response timeout")),this.healthCheckTimeoutMs)}),t=Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),n=await Promise.race([this.client?.dispatch("snap_api_invoke",{action:"healthCheck",payload:{nonce:t}})||Promise.reject(new Error("Client is not available")),e]);if(!this.client)return void this.setSnapServerStatus("disconnected");if(!n?.payload||n.payload.nonce!==t)throw new Error("Health check validation failed - nonce mismatch");"no-response"===this.snapServerStatus&&this.setSnapServerStatus("connected")}catch(e){this.client?this.setSnapServerStatus("no-response"):this.setSnapServerStatus("disconnected")}},this.healthCheckIntervalMs)}finally{this.healthCheckInitializing=!1}}}stopHealthCheck(){this.healthCheckInterval&&(clearInterval(this.healthCheckInterval),this.healthCheckInterval=void 0)}handleNewWindow(e){const t=this.handleNewWindowWork(e);this.pendingRegistrationPromises.add(t),t.finally(()=>{this.pendingRegistrationPromises.delete(t)})}async handleNewWindowWork(e){this.pendingWindowRegistrations+=1;try{await this.handleNewWindowImpl(e)}finally{this.pendingWindowRegistrations-=1}}async drainPendingWindowRegistrations(e){const t=new Set(e);let n=Array.from(t).filter(e=>!this.preparedWindowRegistrationClientIds.has(e));if(await new Promise(e=>{const i=performance.now(),r=setInterval(()=>{n=Array.from(t).filter(e=>!this.preparedWindowRegistrationClientIds.has(e)),(0===n.length||performance.now()-i>=p.PENDING_REGISTRATION_DRAIN_MS)&&(clearInterval(r),e())},25)}),n.length>0){const e=`SnapSDK: Timed out waiting for window registrations, missing=[${n.join(", ")}]`;throw console.warn(e),new Error(e)}const i=[...this.pendingRegistrationPromises];let r=!1;if(await Promise.race([Promise.all(i),new Promise(e=>{setTimeout(()=>{r=!0,e()},p.PENDING_REGISTRATION_DRAIN_MS)})]),r&&this.pendingRegistrationPromises.size>0){const e=`SnapSDK: Timed out draining window registrations after ${p.PENDING_REGISTRATION_DRAIN_MS}ms, still in flight=${this.pendingRegistrationPromises.size}`;throw console.warn(e),new Error(e)}}async handleNewWindowImpl(e){const t=await fin.Window.wrap({uuid:e.uuid,name:e.name}),n=await t.getNativeId();let i=t.identity.name;const r=await t.getOptions();if(void 0!==r.includeInSnapshots&&!1===r.includeInSnapshots)return void console.log(`SnapSDK: Not registering ${e.uuid}:${e.name}, Window is explicitly excluded -includeInSnapshots == false`);const a=r.customData||{};a.snapClientId?i=a.snapClientId:await t.updateOptions({customData:{...a,snapClientId:i}}),console.log(`SnapSDK: Auto-registering window: snapClientId:${i}, handle ${n}, uuid:${e.uuid}, name:${e.name}`),this.preparedWindowRegistrationClientIds.add(i),await this.registerWindow(i,n,a.snapResizingBehavior)}emit_event(e,...t){this.emitter.emit(e,...t)}handleSnapEvents(e,t){switch(this.emit_event("all-events",{type:e.action,payload:e.payload}),e.action){case"clientRegistered":this.emit_event("client-registered",{clientId:e.payload.clientId,windowHandle:`#${e.payload.windowHandle.toString(16).toUpperCase()}`,owningProcessId:e.payload.owningProcessId});break;case"clientUnRegistered":this.emit_event("client-unregistered",{...e.payload});break;case"moveSizeCompleted":this.emit_event("move-size-completed",{...e.payload});break;case"clientsAttached":this.emit_event("clients-attached",{...e.payload});break;case"clientDetached":this.emit_event("client-detached",{...e.payload});break;case"groupsChanged":this.emit_event("groups-changed",{...e.payload});break;case"clientActivated":this.emit_event("client-activated",{...e.payload});break;case"clientDeactivated":this.emit_event("client-deactivated",{...e.payload})}}hexStringToNumber(e){const t=e?.trim();return/^0x[0-9a-f]+$/i.test(t)?Number(t):NaN}async build_command_line(e){let t=`--id ${this.server_id} `;e?.showDebug&&(t+=" --show-debug "),e?.disableGPUAcceleratedDragging&&(t+=" --disable-gpu-accelerated-dragging true "),e?.disableBlurDropPreview&&(t+=" --blur-drop-preview false "),void 0!==e?.blurEffectPerformanceThreshold&&(t+=` --blur-effect-performance-threshold=${e?.blurEffectPerformanceThreshold} `),e?.disableUserUnstick&&(t+=" --disable-user-unstick "),!0!==e?.keyToStick&&"string"!=typeof e?.keyToStick||(t+=` --ks=${!0===e.keyToStick?"ctrl":e.keyToStick} `),e?.keyToUnstick&&(t+=` --kus=${e.keyToUnstick} `),e?.keyToGroupStick&&(t+=` --kgs=${e.keyToGroupStick} `),e?.blockOverlapGroupSnapping&&(t+=" --block-overlap-group-snapping "),e?.hideTaskbarEntry&&(t+=" --no-tb "),e?.taskbarIconGroup&&(t+=` --tb-id=${e?.taskbarIconGroup} `),e?.taskbarIcon&&(t+=` --tb-icon=${e?.taskbarIcon} `),e?.disableRuntimeHeartbeating&&(t+=" --no-hb "),e?.autoHideClientTaskbarIcons&&(t+=" --tb-auto-hide "),e?.theme&&(t+=` --thm=${e.theme} `),e?.defaultResizingBehavior&&(t+=` --res=${e?.defaultResizingBehavior} `);const n=await fin.System.getRuntimeInfo();return t+=`--runtime-port ${n.port} `,t+=`--runtime-version ${n.version} `,t.trim()}}p.PENDING_REGISTRATION_DRAIN_MS=15e3;const l=async e=>{let t=(await fin.System.getRuntimeInfo()).args["local-startup-url"].replace("config.json","");const n=t.includes("\\")?"\\":"/";return t.endsWith(n)&&(t=t.slice(0,-1)),[t,"assets",e.alias,e.version,e.target].join(n)},h=()=>"undefined"!=typeof crypto&&"randomUUID"in crypto&&"function"==typeof crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),d=e=>/^app:\/[^/]+\/[^/]+$/.test(e??""),u=e=>{const t=new Map;return e.forEach(e=>{const n=!e.name,i=e.name?.startsWith(c)??!1,r=e.customData?.snapClientId;(n||i||d(e.name))&&r&&t.set(r,e)}),t},f=(e,t,n)=>{Object.values(e).forEach(e=>{e.attachedClientId===t?e.attachedClientId=n:e.targetClientId===t&&(e.targetClientId=n)})},w=e=>{if(!d(e))return`${c}${h()}`;const t=e.split("/");return t[t.length-1]=h(),t.join("/")};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWEsRUFBRSxpQkFBaUIsS0FBSyxXQUFXO1NBQ2hELENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILEtBQUssVUFBVSxhQUFhLENBQUMsWUFBa0M7SUFDOUQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLDREQUFnQixDQUFDLFlBQVksRUFBRTtRQUM5RCxNQUFNLEVBQUUsWUFBWTtRQUNwQixxQkFBcUIsRUFBRSxDQUFDLFFBQWdCLEVBQUUsR0FBVyxFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQ3ZFLDhJQUE4STtZQUM5SSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxLQUFLLFdBQVcsR0FBRyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbkYsQ0FBQztLQUNELENBQUMsQ0FBQztJQUNILE9BQU8saUJBQWlCLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljLy4vY2xpZW50L3NyYy9hcHAtYXNzZXQudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvLi4vLi4vbm9kZV9tb2R1bGVzL0BvcGVuZmluL3NuYXAtc2RrL29wZW5maW4uc25hcC5tanMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1zbmFwLWJhc2ljL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXNuYXAtYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtc25hcC1iYXNpYy8uL2NsaWVudC9zcmMvcHJvdmlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBPcGVuRmluIH0gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGEgbG9nZ2VyLlxuICovXG5pbnRlcmZhY2UgTG9nZ2VyIHtcblx0LyoqXG5cdCAqIExvZyBkYXRhIGFzIGluZm9ybWF0aW9uLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0aW5mbyhtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgZXJyb3IuXG5cdCAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGxvZy5cblx0ICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIE9wdGlvbmFsIHBhcmFtZXRlcnMgZm9yIGRldGFpbHMuXG5cdCAqL1xuXHRlcnJvcihtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZDtcblxuXHQvKipcblx0ICogTG9nIGRhdGEgYXMgd2FybmluZy5cblx0ICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gbG9nLlxuXHQgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMgT3B0aW9uYWwgcGFyYW1ldGVycyBmb3IgZGV0YWlscy5cblx0ICovXG5cdHdhcm4obWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIExvZyBkYXRhIGFzIHRyYWNlLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0dHJhY2UobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQ7XG5cblx0LyoqXG5cdCAqIExvZyBkYXRhIGFzIGRlYnVnLlxuXHQgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBsb2cuXG5cdCAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyBPcHRpb25hbCBwYXJhbWV0ZXJzIGZvciBkZXRhaWxzLlxuXHQgKi9cblx0ZGVidWcobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQ7XG59XG5cbi8qKlxuICogRm9yIGZ1bmN0aW9uYWxpdHkgdGhhdCByZXF1aXJlcyBhbiBhcHAgYXNzZXQsIHRoaXMgZnVuY3Rpb24gd2lsbCBhdHRlbXB0IHRvIGZldGNoIHRoZSBhcHAgYXNzZXQgZnJvbSB0aGUgcGFzc2VkIGRlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwQXNzZXREZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBhcHAgYXNzZXQgdG8gZmV0Y2guXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvYmplY3QgY29udGFpbmluZyBhIGxvZ2dlciB0byBsb2cgYW55IGluZm8gb3IgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBwcm9jZXNzIGFuZCBhIGZ1bmN0aW9uIHRvIGNhcHR1cmUgcHJvZ3Jlc3MuXG4gKiBAcGFyYW0gb3B0aW9ucy5sb2dnZXIgLSBBIGxvZ2dlciB0byBsb2cgYW55IGVycm9ycyB0aGF0IG9jY3VyIGR1cmluZyB0aGUgZmV0Y2hpbmcgb2YgdGhlIGFwcCBhc3NldC5cbiAqIEBwYXJhbSBvcHRpb25zLmFzc2V0RG93bmxvYWRQcm9ncmVzcyAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVwb3J0IHRoZSBwcm9ncmVzcyBvZiB0aGUgYXNzZXQgZG93bmxvYWQuXG4gKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgYXBwIGFzc2V0IGluZm8gaWYgdGhlIGFwcCBhc3NldCB3YXMgc3VjY2Vzc2Z1bGx5IGZldGNoZWQsIG9yIHVuZGVmaW5lZCBpZiBib3RoIGF0dGVtcHRzIGZhaWxlZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXBwQXNzZXQoXG5cdGFwcEFzc2V0RGVmaW5pdGlvbjogT3BlbkZpbi5BcHBBc3NldEluZm8sXG5cdG9wdGlvbnM/OiB7XG5cdFx0bG9nZ2VyPzogTG9nZ2VyO1xuXHRcdGFzc2V0RG93bmxvYWRQcm9ncmVzcz86IChwcm9ncmVzczogbnVtYmVyLCBzcmM6IHN0cmluZywgYWxpYXM6IHN0cmluZykgPT4gdm9pZDtcblx0fVxuKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHRjb25zdCBzcmMgPSBhcHBBc3NldERlZmluaXRpb24uc3JjO1xuXHRjb25zdCBsb2dnZXIgPSBvcHRpb25zPy5sb2dnZXI7XG5cdGlmICghaXNTdHJpbmdWYWx1ZShzcmMpKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihcIkNhbm5vdCBpbml0aWFsaXplIEFwcCBBc3NldCBEb3dubG9hZCB3aXRob3V0IHNyYyBiZWluZyBkZWZpbmVkXCIpO1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRpZiAoIWFwcEFzc2V0RGVmaW5pdGlvbi5zcmMuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcblx0XHRsb2dnZXI/LmVycm9yKFxuXHRcdFx0XCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIFVSTCBmb3IgdGhlIGFwcCBhc3NldCBzcmMuIE9ubHkgSFRUUCBhbmQgSFRUUFMgcHJvdG9jb2xzIGFyZSBzdXBwb3J0ZWQuIFdpdGggaHR0cHMgcHJlZmVycmVkIGZvciBzZWN1cml0eSByZWFzb25zLlwiXG5cdFx0KTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgYWxpYXMgPSBhcHBBc3NldERlZmluaXRpb24uYWxpYXM7XG5cdGlmICghaXNTdHJpbmdWYWx1ZShhbGlhcykpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgYWxpYXMgYmVpbmcgZGVmaW5lZFwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0ID0gYXBwQXNzZXREZWZpbml0aW9uLnRhcmdldDtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKHRhcmdldCkpIHtcblx0XHRsb2dnZXI/LmVycm9yKFwiQ2Fubm90IGluaXRpYWxpemUgQXBwIEFzc2V0IERvd25sb2FkIHdpdGhvdXQgdGFyZ2V0IGJlaW5nIGRlZmluZWRcIik7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdGNvbnN0IHZlcnNpb24gPSBhcHBBc3NldERlZmluaXRpb24udmVyc2lvbjtcblx0aWYgKCFpc1N0cmluZ1ZhbHVlKHZlcnNpb24pKSB7XG5cdFx0bG9nZ2VyPy5lcnJvcihcIkNhbm5vdCBpbml0aWFsaXplIEFwcCBBc3NldCBEb3dubG9hZCB3aXRob3V0IHZlcnNpb24gYmVpbmcgZGVmaW5lZFwiKTtcblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0QXNzZXREZWZpbml0aW9uOiBPcGVuRmluLkFwcEFzc2V0SW5mbyA9IHtcblx0XHRhbGlhcyxcblx0XHRzcmMsXG5cdFx0dGFyZ2V0LFxuXHRcdHZlcnNpb24sXG5cdFx0bWFuZGF0b3J5OiBhcHBBc3NldERlZmluaXRpb24ubWFuZGF0b3J5LFxuXHRcdGFyZ3M6IGFwcEFzc2V0RGVmaW5pdGlvbi5hcmdzXG5cdH07XG5cblx0Y29uc3QgYXBwQXNzZXRJbmZvID0gYXdhaXQgZG9lc0FwcEFzc2V0RXhpc3QodGFyZ2V0QXNzZXREZWZpbml0aW9uLmFsaWFzLCB0YXJnZXRBc3NldERlZmluaXRpb24udmVyc2lvbik7XG5cdGlmIChhcHBBc3NldEluZm8pIHtcblx0XHRvcHRpb25zPy5sb2dnZXI/LmluZm8oXG5cdFx0XHRgQXBwIGFzc2V0IHdpdGggYWxpYXMgJHt0YXJnZXRBc3NldERlZmluaXRpb24uYWxpYXN9IHZlcnNpb24gJHt0YXJnZXRBc3NldERlZmluaXRpb24udmVyc2lvbn0gYW5kIHNyYyAke3RhcmdldEFzc2V0RGVmaW5pdGlvbi5zcmN9IGFscmVhZHkgZXhpc3RzLiBObyBuZWVkIHRvIGRvd25sb2FkLmBcblx0XHQpO1xuXHRcdHJldHVybiBhcHBBc3NldEluZm87XG5cdH1cblxuXHRjb25zdCBoYXNEb3dubG9hZEFwcEFzc2V0cyA9IGF3YWl0IGdldENhbkRvd25sb2FkQXBwQXNzZXRzKGxvZ2dlcik7XG5cblx0aWYgKCFoYXNEb3dubG9hZEFwcEFzc2V0cykge1xuXHRcdGxvZ2dlcj8ud2FybihcIlRoZSBwbGF0Zm9ybSBkb2VzIG5vdCBoYXZlIHRoZSBjYXBhYmlsaXR5IG9yIHBlcm1pc3Npb24gdG8gZG93bmxvYWQgYXBwIGFzc2V0cy5cIik7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdHJldHVybiBkb3dubG9hZEFwcEFzc2V0RGVmaW5pdGlvbih0YXJnZXRBc3NldERlZmluaXRpb24sIG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGFwcCBhc3NldCBleGlzdHMgYW5kIG9wdGlvbmFsbHkgdmFsaWRhdGUgdmVyc2lvbiBhbmQgc291cmNlIFVSTC5cbiAqIEBwYXJhbSBhbGlhcyBUaGUgYWxpYXMgeW91IHdhbnQgdG8gY2hlY2sgZm9yXG4gKiBAcGFyYW0gdmVyc2lvbiBUaGUgdmVyc2lvbiB5b3Ugd2FudCB0byBjaGVjayBmb3IgKG9wdGlvbmFsKVxuICogQHBhcmFtIHNyYyBUaGUgc291cmNlIFVSTCB5b3Ugd2FudCB0byBjaGVjayBmb3IgKG9wdGlvbmFsKVxuICogQHJldHVybnMgVGhlIGFwcCBhc3NldCBpbmZvIGlmIGl0IGV4aXN0cywgb3RoZXJ3aXNlIHVuZGVmaW5lZFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9lc0FwcEFzc2V0RXhpc3QoXG5cdGFsaWFzOiBzdHJpbmcsXG5cdHZlcnNpb24/OiBzdHJpbmcsXG5cdHNyYz86IHN0cmluZ1xuKTogUHJvbWlzZTxPcGVuRmluLkFwcEFzc2V0SW5mbyB8IHVuZGVmaW5lZD4ge1xuXHR0cnkge1xuXHRcdGNvbnN0IGFwcEFzc2V0SW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHsgYWxpYXMgfSk7XG5cdFx0aWYgKHZlcnNpb24gJiYgYXBwQXNzZXRJbmZvLnZlcnNpb24gIT09IHZlcnNpb24pIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmIChzcmMgJiYgYXBwQXNzZXRJbmZvLnNyYyAhPT0gc3JjKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRyZXR1cm4gYXBwQXNzZXRJbmZvO1xuXHR9IGNhdGNoIHtcblx0XHQvLyBhc3NldCBkb2VzIG5vdCBleGlzdCBvciB1cmwgZG9lcyBub3QgbWF0Y2gsIHJldHVybiB1bmRlZmluZWRcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIERvd25sb2FkIGFuIGFwcCBhc3NldCBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZGVmaW5pdGlvbiBhbmQgb3B0aW9ucy5cbiAqIEBwYXJhbSBhcHBBc3NldERlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIGFwcCBhc3NldCB0byBkb3dubG9hZC5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9iamVjdCBjb250YWluaW5nIGEgbG9nZ2VyIHRvIGxvZyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBwcm9jZXNzLCBhbmQgYSBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBvcnQgdGhlIHByb2dyZXNzIG9mIHRoZSBhc3NldCBkb3dubG9hZC5cbiAqIEBwYXJhbSBvcHRpb25zLmxvZ2dlciAtIEEgbG9nZ2VyIHRvIGxvZyBhbnkgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBkb3dubG9hZGluZyBvZiB0aGUgYXBwIGFzc2V0LlxuICogQHBhcmFtIG9wdGlvbnMuYXNzZXREb3dubG9hZFByb2dyZXNzIC0gQSBjYWxsYmFjayBmdW5jdGlvbiB0byByZXBvcnQgdGhlIHByb2dyZXNzIG9mIHRoZSBhc3NldCBkb3dubG9hZC5cbiAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBhcHAgYXNzZXQgaW5mbyBpZiB0aGUgYXBwIGFzc2V0IHdhcyBzdWNjZXNzZnVsbHkgZG93bmxvYWRlZCwgb3IgdW5kZWZpbmVkIGlmIGFuIGVycm9yIG9jY3VycmVkIGR1cmluZyB0aGUgZG93bmxvYWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkQXBwQXNzZXREZWZpbml0aW9uKFxuXHRhcHBBc3NldERlZmluaXRpb246IE9wZW5GaW4uQXBwQXNzZXRJbmZvLFxuXHRvcHRpb25zPzoge1xuXHRcdGxvZ2dlcj86IExvZ2dlcjtcblx0XHRhc3NldERvd25sb2FkUHJvZ3Jlc3M/OiAocHJvZ3Jlc3M6IG51bWJlciwgc3JjOiBzdHJpbmcsIGFsaWFzOiBzdHJpbmcpID0+IHZvaWQ7XG5cdH1cbik6IFByb21pc2U8T3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQ+IHtcblx0bGV0IGZldGNoZWRPckV4aXN0aW5nQXBwQXNzZXQ6IE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkO1xuXHR0cnkge1xuXHRcdGF3YWl0IGZpbi5TeXN0ZW0uZG93bmxvYWRBc3NldChhcHBBc3NldERlZmluaXRpb24sIChwcm9ncmVzcykgPT4ge1xuXHRcdFx0Y29uc3QgZG93bmxvYWRlZFBlcmNlbnQgPSBNYXRoLmZsb29yKChwcm9ncmVzcy5kb3dubG9hZGVkQnl0ZXMgLyBwcm9ncmVzcy50b3RhbEJ5dGVzKSAqIDEwMCk7XG5cdFx0XHRpZiAob3B0aW9ucz8uYXNzZXREb3dubG9hZFByb2dyZXNzKSB7XG5cdFx0XHRcdG9wdGlvbnMuYXNzZXREb3dubG9hZFByb2dyZXNzKGRvd25sb2FkZWRQZXJjZW50LCBhcHBBc3NldERlZmluaXRpb24uc3JjLCBhcHBBc3NldERlZmluaXRpb24uYWxpYXMpO1xuXHRcdFx0fVxuXHRcdFx0b3B0aW9ucz8ubG9nZ2VyPy5pbmZvKFxuXHRcdFx0XHRgRG93bmxvYWRlZCAke2Rvd25sb2FkZWRQZXJjZW50fSUgb2YgYXBwIGFzc2V0IHdpdGggYWxpYXMgJHthcHBBc3NldERlZmluaXRpb24uYWxpYXN9IGFuZCB2ZXJzaW9uICR7YXBwQXNzZXREZWZpbml0aW9uLnZlcnNpb259IGFuZCB1cmwgJHthcHBBc3NldERlZmluaXRpb24uc3JjfWBcblx0XHRcdCk7XG5cdFx0fSk7XG5cdFx0Ly8gZXh0cmEgY29uZmlybWF0aW9uIHVzaW5nIHRoZSBhcHByb2FjaCAgdXNlZCB0byB2YWxpZGF0ZSB0aGUgZXhpc3RlbmNlIG9mIGFuIGFzc2V0LlxuXHRcdGZldGNoZWRPckV4aXN0aW5nQXBwQXNzZXQgPSBhd2FpdCBkb2VzQXBwQXNzZXRFeGlzdChcblx0XHRcdGFwcEFzc2V0RGVmaW5pdGlvbi5hbGlhcyxcblx0XHRcdGFwcEFzc2V0RGVmaW5pdGlvbi52ZXJzaW9uLFxuXHRcdFx0YXBwQXNzZXREZWZpbml0aW9uLnNyY1xuXHRcdCk7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdG9wdGlvbnM/LmxvZ2dlcj8uZXJyb3IoYFVuYWJsZSB0byBmZXRjaCBBcHAgQXNzZXQgJHtmb3JtYXRFcnJvcihlcnIpfWApO1xuXHR9XG5cdHJldHVybiBmZXRjaGVkT3JFeGlzdGluZ0FwcEFzc2V0O1xufVxuXG4vKipcbiAqIERvIHdlIGhhdmUgdGhlIHBlcm1pc3Npb25zIHRvIGRvd25sb2FkIGFwcCBhc3NldHMuXG4gKiBAcGFyYW0gbG9nZ2VyIE9wdGlvbmFsIGxvZ2dlciB0byBsb2cgZXJyb3JzLlxuICogQHJldHVybnMgVHJ1ZSBpZiB3ZSBoYXZlIHBlcm1pc3Npb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDYW5Eb3dubG9hZEFwcEFzc2V0cyhsb2dnZXI/OiBMb2dnZXIpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0bGV0IGNhbkRvd25sb2FkQXBwQXNzZXRzOiBib29sZWFuID0gZmFsc2U7XG5cdHRyeSB7XG5cdFx0Y29uc3QgY2FuRG93bmxvYWRBcHBBc3NldHNSZXNwb25zZSA9XG5cdFx0XHRhd2FpdCBmaW4uU3lzdGVtLnF1ZXJ5UGVybWlzc2lvbkZvckN1cnJlbnRDb250ZXh0KFwiU3lzdGVtLmRvd25sb2FkQXNzZXRcIik7XG5cdFx0Y2FuRG93bmxvYWRBcHBBc3NldHMgPSBjYW5Eb3dubG9hZEFwcEFzc2V0c1Jlc3BvbnNlPy5ncmFudGVkO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGxvZ2dlcj8uZXJyb3IoYEVycm9yIHdoaWxlIHF1ZXJ5aW5nIGZvciBTeXN0ZW0uZG93bmxvYWRBc3NldCBwZXJtaXNzaW9uICR7Zm9ybWF0RXJyb3IoZXJyb3IpfWApO1xuXHRcdGNhbkRvd25sb2FkQXBwQXNzZXRzID0gZmFsc2U7XG5cdH1cblx0cmV0dXJuIGNhbkRvd25sb2FkQXBwQXNzZXRzO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gIWlzRW1wdHkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGVycjogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc0VtcHR5KGVycikpIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fSBlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZ1ZhbHVlKGVycikpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9IGVsc2UgaWYgKGlzT2JqZWN0KGVycikgJiYgXCJtZXNzYWdlXCIgaW4gZXJyICYmIGlzU3RyaW5nKGVyci5tZXNzYWdlKSkge1xuXHRcdHJldHVybiBlcnIubWVzc2FnZTtcblx0fVxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cbiIsInZhciBlPXs4Mjc6ZT0+e3ZhciB0LG49XCJvYmplY3RcIj09dHlwZW9mIFJlZmxlY3Q/UmVmbGVjdDpudWxsLGk9biYmXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5hcHBseT9uLmFwcGx5OmZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoZSx0LG4pfTt0PW4mJlwiZnVuY3Rpb25cIj09dHlwZW9mIG4ub3duS2V5cz9uLm93bktleXM6T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scz9mdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSkuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSkpfTpmdW5jdGlvbihlKXtyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZSl9O3ZhciByPU51bWJlci5pc05hTnx8ZnVuY3Rpb24oZSl7cmV0dXJuIGUhPWV9O2Z1bmN0aW9uIGEoKXthLmluaXQuY2FsbCh0aGlzKX1lLmV4cG9ydHM9YSxlLmV4cG9ydHMub25jZT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihuLGkpe2Z1bmN0aW9uIHIobil7ZS5yZW1vdmVMaXN0ZW5lcih0LGEpLGkobil9ZnVuY3Rpb24gYSgpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVtb3ZlTGlzdGVuZXImJmUucmVtb3ZlTGlzdGVuZXIoXCJlcnJvclwiLHIpLG4oW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKX13KGUsdCxhLHtvbmNlOiEwfSksXCJlcnJvclwiIT09dCYmZnVuY3Rpb24oZSx0LG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIGUub24mJncoZSxcImVycm9yXCIsdCxuKX0oZSxyLHtvbmNlOiEwfSl9KX0sYS5FdmVudEVtaXR0ZXI9YSxhLnByb3RvdHlwZS5fZXZlbnRzPXZvaWQgMCxhLnByb3RvdHlwZS5fZXZlbnRzQ291bnQ9MCxhLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzPXZvaWQgMDt2YXIgcz0xMDtmdW5jdGlvbiBvKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyt0eXBlb2YgZSl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gdm9pZCAwPT09ZS5fbWF4TGlzdGVuZXJzP2EuZGVmYXVsdE1heExpc3RlbmVyczplLl9tYXhMaXN0ZW5lcnN9ZnVuY3Rpb24gcChlLHQsbixpKXt2YXIgcixhLHMscDtpZihvKG4pLHZvaWQgMD09PShhPWUuX2V2ZW50cyk/KGE9ZS5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksZS5fZXZlbnRzQ291bnQ9MCk6KHZvaWQgMCE9PWEubmV3TGlzdGVuZXImJihlLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHQsbi5saXN0ZW5lcj9uLmxpc3RlbmVyOm4pLGE9ZS5fZXZlbnRzKSxzPWFbdF0pLHZvaWQgMD09PXMpcz1hW3RdPW4sKytlLl9ldmVudHNDb3VudDtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHM/cz1hW3RdPWk/W24sc106W3Msbl06aT9zLnVuc2hpZnQobik6cy5wdXNoKG4pLChyPWMoZSkpPjAmJnMubGVuZ3RoPnImJiFzLndhcm5lZCl7cy53YXJuZWQ9ITA7dmFyIGw9bmV3IEVycm9yKFwiUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiBcIitzLmxlbmd0aCtcIiBcIitTdHJpbmcodCkrXCIgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdFwiKTtsLm5hbWU9XCJNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmdcIixsLmVtaXR0ZXI9ZSxsLnR5cGU9dCxsLmNvdW50PXMubGVuZ3RoLHA9bCxjb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybihwKX1yZXR1cm4gZX1mdW5jdGlvbiBsKCl7aWYoIXRoaXMuZmlyZWQpcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSx0aGlzLndyYXBGbiksdGhpcy5maXJlZD0hMCwwPT09YXJndW1lbnRzLmxlbmd0aD90aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpOnRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsYXJndW1lbnRzKX1mdW5jdGlvbiBoKGUsdCxuKXt2YXIgaT17ZmlyZWQ6ITEsd3JhcEZuOnZvaWQgMCx0YXJnZXQ6ZSx0eXBlOnQsbGlzdGVuZXI6bn0scj1sLmJpbmQoaSk7cmV0dXJuIHIubGlzdGVuZXI9bixpLndyYXBGbj1yLHJ9ZnVuY3Rpb24gZChlLHQsbil7dmFyIGk9ZS5fZXZlbnRzO2lmKHZvaWQgMD09PWkpcmV0dXJuW107dmFyIHI9aVt0XTtyZXR1cm4gdm9pZCAwPT09cj9bXTpcImZ1bmN0aW9uXCI9PXR5cGVvZiByP24/W3IubGlzdGVuZXJ8fHJdOltyXTpuP2Z1bmN0aW9uKGUpe2Zvcih2YXIgdD1uZXcgQXJyYXkoZS5sZW5ndGgpLG49MDtuPHQubGVuZ3RoOysrbil0W25dPWVbbl0ubGlzdGVuZXJ8fGVbbl07cmV0dXJuIHR9KHIpOmYocixyLmxlbmd0aCl9ZnVuY3Rpb24gdShlKXt2YXIgdD10aGlzLl9ldmVudHM7aWYodm9pZCAwIT09dCl7dmFyIG49dFtlXTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuKXJldHVybiAxO2lmKHZvaWQgMCE9PW4pcmV0dXJuIG4ubGVuZ3RofXJldHVybiAwfWZ1bmN0aW9uIGYoZSx0KXtmb3IodmFyIG49bmV3IEFycmF5KHQpLGk9MDtpPHQ7KytpKW5baV09ZVtpXTtyZXR1cm4gbn1mdW5jdGlvbiB3KGUsdCxuLGkpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGUub24paS5vbmNlP2Uub25jZSh0LG4pOmUub24odCxuKTtlbHNle2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUuYWRkRXZlbnRMaXN0ZW5lcil0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnK3R5cGVvZiBlKTtlLmFkZEV2ZW50TGlzdGVuZXIodCxmdW5jdGlvbiByKGEpe2kub25jZSYmZS5yZW1vdmVFdmVudExpc3RlbmVyKHQsciksbihhKX0pfX1PYmplY3QuZGVmaW5lUHJvcGVydHkoYSxcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gc30sc2V0OmZ1bmN0aW9uKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlfHxlPDB8fHIoZSkpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnK2UrXCIuXCIpO3M9ZX19KSxhLmluaXQ9ZnVuY3Rpb24oKXt2b2lkIDAhPT10aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50cyE9PU9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCksdGhpcy5fbWF4TGlzdGVuZXJzPXRoaXMuX21heExpc3RlbmVyc3x8dm9pZCAwfSxhLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24oZSl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGV8fGU8MHx8cihlKSl0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcrZStcIi5cIik7cmV0dXJuIHRoaXMuX21heExpc3RlbmVycz1lLHRoaXN9LGEucHJvdG90eXBlLmdldE1heExpc3RlbmVycz1mdW5jdGlvbigpe3JldHVybiBjKHRoaXMpfSxhLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl0LnB1c2goYXJndW1lbnRzW25dKTt2YXIgcj1cImVycm9yXCI9PT1lLGE9dGhpcy5fZXZlbnRzO2lmKHZvaWQgMCE9PWEpcj1yJiZ2b2lkIDA9PT1hLmVycm9yO2Vsc2UgaWYoIXIpcmV0dXJuITE7aWYocil7dmFyIHM7aWYodC5sZW5ndGg+MCYmKHM9dFswXSkscyBpbnN0YW5jZW9mIEVycm9yKXRocm93IHM7dmFyIG89bmV3IEVycm9yKFwiVW5oYW5kbGVkIGVycm9yLlwiKyhzP1wiIChcIitzLm1lc3NhZ2UrXCIpXCI6XCJcIikpO3Rocm93IG8uY29udGV4dD1zLG99dmFyIGM9YVtlXTtpZih2b2lkIDA9PT1jKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGMpaShjLHRoaXMsdCk7ZWxzZXt2YXIgcD1jLmxlbmd0aCxsPWYoYyxwKTtmb3Iobj0wO248cDsrK24paShsW25dLHRoaXMsdCl9cmV0dXJuITB9LGEucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHAodGhpcyxlLHQsITEpfSxhLnByb3RvdHlwZS5vbj1hLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixhLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gcCh0aGlzLGUsdCwhMCl9LGEucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0KSx0aGlzLm9uKGUsaCh0aGlzLGUsdCkpLHRoaXN9LGEucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gbyh0KSx0aGlzLnByZXBlbmRMaXN0ZW5lcihlLGgodGhpcyxlLHQpKSx0aGlzfSxhLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbihlLHQpe3ZhciBuLGkscixhLHM7aWYobyh0KSx2b2lkIDA9PT0oaT10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PShuPWlbZV0pKXJldHVybiB0aGlzO2lmKG49PT10fHxuLmxpc3RlbmVyPT09dCkwPT09LS10aGlzLl9ldmVudHNDb3VudD90aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKTooZGVsZXRlIGlbZV0saS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLG4ubGlzdGVuZXJ8fHQpKTtlbHNlIGlmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pe2ZvcihyPS0xLGE9bi5sZW5ndGgtMTthPj0wO2EtLSlpZihuW2FdPT09dHx8blthXS5saXN0ZW5lcj09PXQpe3M9blthXS5saXN0ZW5lcixyPWE7YnJlYWt9aWYocjwwKXJldHVybiB0aGlzOzA9PT1yP24uc2hpZnQoKTpmdW5jdGlvbihlLHQpe2Zvcig7dCsxPGUubGVuZ3RoO3QrKyllW3RdPWVbdCsxXTtlLnBvcCgpfShuLHIpLDE9PT1uLmxlbmd0aCYmKGlbZV09blswXSksdm9pZCAwIT09aS5yZW1vdmVMaXN0ZW5lciYmdGhpcy5lbWl0KFwicmVtb3ZlTGlzdGVuZXJcIixlLHN8fHQpfXJldHVybiB0aGlzfSxhLnByb3RvdHlwZS5vZmY9YS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIsYS5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3ZhciB0LG4saTtpZih2b2lkIDA9PT0obj10aGlzLl9ldmVudHMpKXJldHVybiB0aGlzO2lmKHZvaWQgMD09PW4ucmVtb3ZlTGlzdGVuZXIpcmV0dXJuIDA9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLl9ldmVudHNDb3VudD0wKTp2b2lkIDAhPT1uW2VdJiYoMD09PS0tdGhpcy5fZXZlbnRzQ291bnQ/dGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCk6ZGVsZXRlIG5bZV0pLHRoaXM7aWYoMD09PWFyZ3VtZW50cy5sZW5ndGgpe3ZhciByLGE9T2JqZWN0LmtleXMobik7Zm9yKGk9MDtpPGEubGVuZ3RoOysraSlcInJlbW92ZUxpc3RlbmVyXCIhPT0ocj1hW2ldKSYmdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMocik7cmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKFwicmVtb3ZlTGlzdGVuZXJcIiksdGhpcy5fZXZlbnRzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5fZXZlbnRzQ291bnQ9MCx0aGlzfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mKHQ9bltlXSkpdGhpcy5yZW1vdmVMaXN0ZW5lcihlLHQpO2Vsc2UgaWYodm9pZCAwIT09dClmb3IoaT10Lmxlbmd0aC0xO2k+PTA7aS0tKXRoaXMucmVtb3ZlTGlzdGVuZXIoZSx0W2ldKTtyZXR1cm4gdGhpc30sYS5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKGUpe3JldHVybiBkKHRoaXMsZSwhMCl9LGEucHJvdG90eXBlLnJhd0xpc3RlbmVycz1mdW5jdGlvbihlKXtyZXR1cm4gZCh0aGlzLGUsITEpfSxhLmxpc3RlbmVyQ291bnQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmxpc3RlbmVyQ291bnQ/ZS5saXN0ZW5lckNvdW50KHQpOnUuY2FsbChlLHQpfSxhLnByb3RvdHlwZS5saXN0ZW5lckNvdW50PXUsYS5wcm90b3R5cGUuZXZlbnROYW1lcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9ldmVudHNDb3VudD4wP3QodGhpcy5fZXZlbnRzKTpbXX19fSx0PXt9O2Z1bmN0aW9uIG4oaSl7dmFyIHI9dFtpXTtpZih2b2lkIDAhPT1yKXJldHVybiByLmV4cG9ydHM7dmFyIGE9dFtpXT17ZXhwb3J0czp7fX07cmV0dXJuIGVbaV0oYSxhLmV4cG9ydHMsbiksYS5leHBvcnRzfW4uZD0oZSx0KT0+e2Zvcih2YXIgaSBpbiB0KW4ubyh0LGkpJiYhbi5vKGUsaSkmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLGkse2VudW1lcmFibGU6ITAsZ2V0OnRbaV19KX0sbi5vPShlLHQpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KTt2YXIgaT1uKDgyNyk7Y29uc3Qgcj1cIm9wZW5maW4tc25hcFwiLGE9XCIxLjYuMVwiLHM9KGUsdCk9PmAke2V9ICR7dCBpbnN0YW5jZW9mIEVycm9yP3QubWVzc2FnZTpcInN0cmluZ1wiPT10eXBlb2YgdD90OkpTT04uc3RyaW5naWZ5KHQpfWAsbz1hc3luYygpPT57dHJ5e3JldHVybihhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6cn0pKS52ZXJzaW9uPT09YX1jYXRjaChlKXtyZXR1cm4hMX19LGM9XCJpbnRlcm5hbC1nZW5lcmF0ZWQtd2luZG93LVwiO2NsYXNzIHB7Y29uc3RydWN0b3IoZSx0PTFlNCxuPTVlMyl7aWYodGhpcy5zZXJ2ZXJfaWQ9ZSx0aGlzLmVtaXR0ZXI9bmV3IGkuRXZlbnRFbWl0dGVyLHRoaXMuX19leHRlbnNpb25zPVtdLHRoaXMuc25hcFNlcnZlclN0YXR1cz1cImRpc2Nvbm5lY3RlZFwiLHRoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmc9ITEsdGhpcy5pc1NuYXBzaG90UHJlcGFyZWRGb3JBcHBseT0hMSx0aGlzLnBlbmRpbmdXaW5kb3dSZWdpc3RyYXRpb25zPTAsdGhpcy5wcmVwYXJlZFdpbmRvd1JlZ2lzdHJhdGlvbkNsaWVudElkcz1uZXcgU2V0LHRoaXMucGVuZGluZ1JlZ2lzdHJhdGlvblByb21pc2VzPW5ldyBTZXQsIWZpbil0aHJvdyBuZXcgRXJyb3IoXCJPcGVuRmluIGlzIG5vdCBhdmFpbGFibGVcIik7aWYodDwxZTMpdGhyb3cgbmV3IEVycm9yKGBoZWFsdGhDaGVja0ludGVydmFsTXMgbXVzdCBiZSBhdCBsZWFzdCAxMDAwbXMgKHByb3ZpZGVkOiAke3R9bXMpLiBWYWx1ZXMgYmVsb3cgdGhpcyBhcmUgZXhjZXNzaXZlIGFuZCBjYXVzZSB1bm5lY2Vzc2FyeSBvdmVyaGVhZC5gKTtpZihuPDUwMCl0aHJvdyBuZXcgRXJyb3IoYGhlYWx0aENoZWNrVGltZW91dE1zIG11c3QgYmUgYXQgbGVhc3QgNTAwbXMgKHByb3ZpZGVkOiAke259bXMpLiBUaW1lb3V0IG11c3QgYWxsb3cgc3VmZmljaWVudCB0aW1lIGZvciBuZXR3b3JrIHJvdW5kLXRyaXAgYW5kIHNlcnZlciByZXNwb25zZS5gKTtpZihuPj10KXRocm93IG5ldyBFcnJvcihgaGVhbHRoQ2hlY2tUaW1lb3V0TXMgKCR7bn1tcykgbXVzdCBiZSBsZXNzIHRoYW4gaGVhbHRoQ2hlY2tJbnRlcnZhbE1zICgke3R9bXMpLiBUaGlzIGVuc3VyZXMgdGhlIHRpbWVvdXQgY29tcGxldGVzIGJlZm9yZSB0aGUgbmV4dCBoZWFsdGggY2hlY2sgYmVnaW5zLCBhbGxvd2luZyB0aW1lIGZvciByZWNvdmVyeS5gKTt0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWxNcz10LHRoaXMuaGVhbHRoQ2hlY2tUaW1lb3V0TXM9bn1hc3luYyBzdGFydChlKXt0cnl7Y29uc3QgZT1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7XCJ4NjRcIiE9PWU/LmFyY2hpdGVjdHVyZSYmY29uc29sZS53YXJuKGBUaGUgYXJjaGl0ZWN0dXJlIG9mIHRoZSBjb25uZWN0ZWQgT3BlbkZpbiBydW50aW1lIGlzICcke2UuYXJjaGl0ZWN0dXJlfScgLSBXaW5kb3cgc25hcHBpbmcgaXMgY3VycmVudGx5IG9ubHkgc3VwcG9ydGVkIHdpdGggNjQtYml0IGFwcGxpY2F0aW9ucy4gU25hcHBpbmcgd2lsbCBiZSBkaXNhYmxlZC5gKX1jYXRjaChlKXtjb25zb2xlLndhcm4oYENvdWxkIG5vdCBnZXQgcnVudGltZSBpbmZvOiAke2V9YCl9Y29uc3QgdD1hd2FpdCBmaW4uU3lzdGVtLnF1ZXJ5UGVybWlzc2lvbkZvckN1cnJlbnRDb250ZXh0KFwiU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzc1wiKTtpZighdC5ncmFudGVkKXRocm93IG5ldyBFcnJvcihcIlRoZSAnU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2VzcycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyXCIpO2lmKHQucmF3VmFsdWUpe2lmKGU/LmV4ZWN1dGFibGVQYXRoJiYhdC5yYXdWYWx1ZT8uZXhlY3V0YWJsZXM/LmVuYWJsZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlICdTeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzLmFzc2V0cycgcGVybWlzc2lvbiBpcyByZXF1aXJlZCB0byBsYXVuY2ggdGhlIFNuYXAgc2VydmVyIGZyb20gYW4gZXhlY3V0YWJsZSBwYXRoXCIpO2lmKCFlPy5leGVjdXRhYmxlUGF0aCYmIXQucmF3VmFsdWU/LmFzc2V0cz8uZW5hYmxlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgJ1N5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MuYXNzZXRzJyBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkIHRvIGxhdW5jaCB0aGUgU25hcCBzZXJ2ZXIgZnJvbSBhIFVSTFwiKX1lPy5leGVjdXRhYmxlUGF0aHx8YXdhaXQoYXN5bmMgZT0+e2NvbnN0IHQ9YXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnRTeW5jKCkuZ2V0TWFuaWZlc3QoKSxuPXQuYXBwQXNzZXRzPy5maW5kKGU9PmUuYWxpYXM9PT1yKTtpZihuKXJldHVybiB2b2lkIGNvbnNvbGUud2FybihcIkRldGVjdGVkIFNuYXAgcGFja2FnZSBpbiBhcHAgbWFuaWZlc3QgYXBwQXNzZXRzXCIsbik7aWYoYXdhaXQgbygpKXJldHVybiB2b2lkIGNvbnNvbGUuaW5mbyhcIlVzaW5nIGV4aXN0aW5nIFNuYXAgcGFja2FnZVwiKTtjb25zdCBpPWU/P2BodHRwczovL2Nkbi5vcGVuZmluLmNvL3JlbGVhc2Uvc25hcC8ke2F9L3NuYXAuemlwYDtjb25zb2xlLmluZm8oYERvd25sb2FkaW5nIFNuYXAgYXNzZXQgZnJvbTogJyR7aX0nYCk7Y29uc3QgYz17YWxpYXM6cixzcmM6YCR7aX1gLHRhcmdldDpcIk9wZW5GaW5TbmFwLmV4ZVwiLHZlcnNpb246YX07Y29uc29sZS5pbmZvKFwiRG93bmxvYWRpbmcgU25hcCBwYWNrYWdlXCIsYyk7dHJ5e2F3YWl0IGZpbi5TeXN0ZW0uZG93bmxvYWRBc3NldChjLCgpPT57fSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKHMoXCJVbmFibGUgdG8gZG93bmxvYWQgU25hcCBwYWNrYWdlLlwiLGUpKX19KShlPy5jdXN0b21TbmFwQXNzZXRTb3VyY2UpO2NvbnN0IG49YXdhaXQgdGhpcy5idWlsZF9jb21tYW5kX2xpbmUoZSk7bGV0IGk9e2FsaWFzOnIsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn07ZT8uZXhlY3V0YWJsZVBhdGgmJihpPXtwYXRoOmUuZXhlY3V0YWJsZVBhdGgsYXJndW1lbnRzOm4sbGlmZXRpbWU6XCJ3aW5kb3dcIn0pO3RyeXt0aGlzLnNuYXBfaWRlbnRpdHk9YXdhaXQgZmluLlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3MoaSl9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKHMoXCJGYWlsZWQgdG8gbGF1bmNoIHRoZSBTbmFwIHNlcnZlci5cIixlKSl9cmV0dXJuIHRoaXMuY29ubmVjdCgpfWFzeW5jIGNvbm5lY3QoKXthd2FpdCB0aGlzLmludGVybmFsQ29ubmVjdCghMCl9X19hZGRFeHRlbnNpb24oZSl7dGhpcy5fX2V4dGVuc2lvbnMucHVzaChlKX1hc3luYyBzdG9wKCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJzaHV0ZG93blwifSkpfWFzeW5jIHNob3dEZWJ1Z1dpbmRvdyhlKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNob3dEZWJ1Z1dpbmRvd1wiLHBheWxvYWQ6e3Nob3c6ZX19KSl9YXN5bmMgZ2V0TGF5b3V0KCl7aWYoIXRoaXMuY2xpZW50KXRocm93IG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIGlzIG5vdCBydW5uaW5nXCIpO2NvbnN0IGU9YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNlcmlhbGlzZUxheW91dFwifSkpO3JldHVybiBlPy5wYXlsb2FkLmxheW91dH1hc3luYyBzZXRMYXlvdXQoZSx0PSEwKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImRlc2VyaWFsaXNlTGF5b3V0XCIscGF5bG9hZDp7bGF5b3V0OmUscmVzZXQ6dH19KSl9YXN5bmMgZW50ZXJEZWZlcnJlZExheW91dCgpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3QgcnVubmluZ1wiKTthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZW50ZXJCYXRjaE1vZGVcIn0pKX1hc3luYyBleGl0RGVmZXJyZWRMYXlvdXQoKXtpZighdGhpcy5jbGllbnQpdGhyb3cgbmV3IEVycm9yKFwiU25hcCBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmdcIik7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImV4aXRCYXRjaE1vZGVcIn0pKX1hc3luYyBwcmVwYXJlVG9BcHBseVNuYXBzaG90KGUsdCl7dGhpcy5wcmVwYXJlZFdpbmRvd1JlZ2lzdHJhdGlvbkNsaWVudElkcy5jbGVhcigpLHRoaXMuaXNTbmFwc2hvdFByZXBhcmVkRm9yQXBwbHk9ITE7aWYoIWV8fGUub3B0aW9ucz8uY2xvc2VFeGlzdGluZ1dpbmRvd3N8fGUub3B0aW9ucz8uY2xvc2VTbmFwc2hvdFdpbmRvd3MpcmV0dXJuIHRoaXMubmVlZFRvUmVzZXRMYXlvdXQ9ITAsdm9pZCBhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwicmVzZXRBbGxcIn0pKTt0aGlzLm5lZWRUb1Jlc2V0TGF5b3V0PSExO2NvbnN0IG49ZS5zbmFwc2hvdCxpPUpTT04uc3RyaW5naWZ5KG4sbnVsbCwyKSxyPW4uc25hcDtpZighcilyZXR1cm47YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInByZXBhcmVUb0FwcGx5TGF5b3V0XCJ9KSk7Y29uc3QgYT10Pz93LHM9KGF3YWl0IHRoaXMuZ2V0TGF5b3V0KCkpPy5jbGllbnRzLm1hcChlPT5lLmlkKT8/W10sbz11KG4ud2luZG93cyksYz1BcnJheS5mcm9tKG8ua2V5cygpKS5maWx0ZXIoZT0+cy5pbmNsdWRlcyhlKSk7ci5jbGllbnRzLmZpbHRlcihlPT5jLmluY2x1ZGVzKGUuaWQpKS5mb3JFYWNoKGU9Pntjb25zdCB0PWUuaWQsbj1hKHQpO2UuaWQ9bixmKHIuY29ubmVjdGlvbnMsdCxuKTtjb25zdCBpPW8uZ2V0KHQpO2kuY3VzdG9tRGF0YS5zbmFwQ2xpZW50SWQ9bixpLm5hbWU9bn0pO2NvbnN0IHA9SlNPTi5zdHJpbmdpZnkobixudWxsLDIpO2NvbnNvbGUuZGVidWcoYFNuYXAgU0RLIG1vZGlmaWVkIHNuYXBzaG90IGRhdGEgYmVmb3JlIGFwcGx5aW5nIGl0Llxcbk9yaWdpbmFsIHNuYXBzaG90OlxcbiR7aX1cXG5Nb2RpZmllZCBzbmFwc2hvdDpcXG4ke3B9YCksdGhpcy5pc1NuYXBzaG90UHJlcGFyZWRGb3JBcHBseT0hMH1hc3luYyBkZWNvcmF0ZVNuYXBzaG90KGUpe3JldHVybnsuLi5lLHNuYXA6YXdhaXQgdGhpcy5nZXRMYXlvdXQoKX19YXN5bmMgYXBwbHlTbmFwc2hvdChlKXtpZighdGhpcy5pc1NuYXBzaG90UHJlcGFyZWRGb3JBcHBseSl0aHJvdyBuZXcgRXJyb3IoXCJwcmVwYXJlVG9BcHBseVNuYXBzaG90IG11c3QgYmUgY2FsbGVkIGJlZm9yZSBhcHBseVNuYXBzaG90LlwiKTt0cnl7aWYoIWUuc25hcClyZXR1cm47Y29uc3QgdD1lLnNuYXAuY2xpZW50cz8ubWFwKGU9PmUuaWQpPz9bXTtpZigwPT09dC5sZW5ndGgpcmV0dXJuO2F3YWl0IHRoaXMuZHJhaW5QZW5kaW5nV2luZG93UmVnaXN0cmF0aW9ucyh0KSxhd2FpdCB0aGlzLnNldExheW91dChlLnNuYXAsdGhpcy5uZWVkVG9SZXNldExheW91dCl9ZmluYWxseXt0aGlzLmlzU25hcHNob3RQcmVwYXJlZEZvckFwcGx5PSExLHRoaXMucHJlcGFyZWRXaW5kb3dSZWdpc3RyYXRpb25DbGllbnRJZHMuY2xlYXIoKX19YXN5bmMgbGF1bmNoKGUpe2lmKCF0aGlzLmNsaWVudCl0aHJvdyBuZXcgRXJyb3IoXCJOb3QgY29ubmVjdGVkIHRvIGFuIFNuYXAgc2VydmVyXCIpO2UuYXBwQXNzZXRJbmZvJiYoZS5wYXRoPWF3YWl0IGwoe3RhcmdldDplLnBhdGgsLi4uZS5hcHBBc3NldEluZm99KSksY29uc29sZS5sb2coXCJvcHRpb25zOiBcIixlKTtjb25zdCB0PXthY3Rpb246XCJzdGFydFByb2Nlc3NcIixwYXlsb2FkOnsuLi5lLGFyZ3M6ZS5hcmdzfHxbXX19O2lmKGUuc3RyYXRlZ3kpe2NvbnN0e3R5cGU6biwuLi5pfT1lLnN0cmF0ZWd5O3QucGF5bG9hZC5zdHJhdGVneT17dHlwZTpuLHBhcmFtZXRlcnM6ey4uLml9fX1jb25zdCBuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHQpKTtpZihuPy5wYXlsb2FkPy5zdWNjZXNzKXJldHVybntwcm9jZXNzX2lkOm4ucGF5bG9hZC5wcm9jZXNzX2lkfTt0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsYXVuY2ggcHJvY2VzczogJHtuPy5wYXlsb2FkPy5lcnJvcn1gKX1hc3luYyByZWdpc3RlcldpbmRvdyhlLHQsbil7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcImhvb2tBbmRSZWdpc3RlcldpbmRvd1wiLHBheWxvYWQ6e2NsaWVudElkOmUsd2luZG93SGFuZGxlOnQscmVzaXppbmdCZWhhdmlvcjpufX0pKX1hc3luYyBlbmFibGVBdXRvV2luZG93UmVnaXN0cmF0aW9uKCl7Y29uc3QgZT1lPT57dGhpcy5oYW5kbGVOZXdXaW5kb3coZSl9O3JldHVybiBhd2FpdCBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKS5hZGRMaXN0ZW5lcihcIndpbmRvdy1jcmVhdGVkXCIsZSksYXN5bmMoKT0+e2F3YWl0IGZpbi5TeXN0ZW0ucmVtb3ZlTGlzdGVuZXIoXCJ3aW5kb3ctY3JlYXRlZFwiLGUpfX1hc3luYyBhdHRhY2hXaW5kb3dzKGUsdCxuLGkpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJhdHRhY2hcIixwYXlsb2FkOnt0YXJnZXRDbGllbnRJZDplLHRvQXR0YWNoQ2xpZW50SWQ6dCx0YXJnZXRTaWRlOm4sb2Zmc2V0Oml9fSkpfWFzeW5jIGRldGFjaEZyb21Hcm91cChlKXthd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZGV0YWNoRnJvbUdyb3VwXCIscGF5bG9hZDp7Y2xpZW50SWQ6ZX19KSl9YXN5bmMgZ2V0QXR0YWNoZWQoZSl7cmV0dXJuKGF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRBdHRhY2hlZEluc3RhbmNlc1wiLHBheWxvYWQ6e2NsaWVudElkOmV9fSkpKS5wYXlsb2FkLmF0dGFjaGVkfWFzeW5jIGhhc0F0dGFjaG1lbnRzKGUpe3JldHVybihhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaGFzQXR0YWNobWVudHNcIixwYXlsb2FkOntjbGllbnRJZDplfX0pKSkucGF5bG9hZC5oYXNBdHRhY2htZW50c31hZGRFdmVudExpc3RlbmVyKGUsdCl7dGhpcy5lbWl0dGVyLm9uKGUsdCl9cmVtb3ZlRXZlbnRMaXN0ZW5lcihlLHQpe3RoaXMuZW1pdHRlci5vZmYoZSx0KX1vbmNlKGUsdCl7dGhpcy5lbWl0dGVyLm9uY2UoZSx0KX1hc3luYyBnZXRDbGllbnRJZEZvcldpbmRvdyhlKXtjb25zdCB0PVwibnVtYmVyXCI9PXR5cGVvZiBlP3tuYXRpdmVXaW5kb3dJZDplfTpOdW1iZXIuaXNOYU4odGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSk/e25hdGl2ZVdpbmRvd0lkOk51bWJlci5OYU59OntuYXRpdmVXaW5kb3dJZDp0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpfSxuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRDbGllbnRJZEZvcldpbmRvd1wiLHBheWxvYWQ6dH0pKTtpZighbi5wYXlsb2FkLmNsaWVudElkKXRocm93IG5ldyBFcnJvcihcIk5vIGNsaWVudCBJRCBmb3VuZCBmb3Igd2luZG93XCIpO3JldHVybiBuLnBheWxvYWQuY2xpZW50SWR9YXN5bmMgZ2V0R3JvdXBJZEZvcldpbmRvdyhlKXtjb25zdCB0PVwibnVtYmVyXCI9PXR5cGVvZiBlP3tuYXRpdmVXaW5kb3dJZDplfTpOdW1iZXIuaXNOYU4odGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSk/e2NsaWVudElkOmV9OntuYXRpdmVXaW5kb3dJZDp0aGlzLmhleFN0cmluZ1RvTnVtYmVyKGUpfSxuPWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRHcm91cElkRm9yV2luZG93XCIscGF5bG9hZDp0fSkpO2lmKCFuLnBheWxvYWQuZ3JvdXBJZCl0aHJvdyBuZXcgRXJyb3IoXCJObyBncm91cCBmb3VuZCBmb3Igd2luZG93XCIpO3JldHVybiBuLnBheWxvYWQuZ3JvdXBJZH1hc3luYyBnZXRXaW5kb3dSZXNpemFibGUoZSl7Y29uc3QgdD1cIm51bWJlclwiPT10eXBlb2YgZT97bmF0aXZlV2luZG93SWQ6ZX06TnVtYmVyLmlzTmFOKHRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkpP3tjbGllbnRJZDplfTp7bmF0aXZlV2luZG93SWQ6dGhpcy5oZXhTdHJpbmdUb051bWJlcihlKX0sbj1hd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0UmVzaXphYmxlXCIscGF5bG9hZDp0fSkpO2lmKG51bGw9PT1uLnBheWxvYWQucmVzaXphYmxlKXRocm93IG5ldyBFcnJvcihcIk5vIHdpbmRvdyBmb3VuZCBmb3IgZ2l2ZW4gSURcIik7cmV0dXJuIG4ucGF5bG9hZC5yZXNpemFibGV9YXN5bmMgc2V0V2luZG93UmVzaXphYmxlKGUsdCl7Y29uc3Qgbj1cIm51bWJlclwiPT10eXBlb2YgZT97bmF0aXZlV2luZG93SWQ6ZSxyZXNpemFibGU6dH06TnVtYmVyLmlzTmFOKHRoaXMuaGV4U3RyaW5nVG9OdW1iZXIoZSkpP3tjbGllbnRJZDplLHJlc2l6YWJsZTp0fTp7bmF0aXZlV2luZG93SWQ6dGhpcy5oZXhTdHJpbmdUb051bWJlcihlKSxyZXNpemFibGU6dH07YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInNldFJlc2l6YWJsZVwiLHBheWxvYWQ6bn0pKX1hc3luYyBnZXRXaW5kb3dzSW5Hcm91cChlKXtjb25zdCB0PWF3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJnZXRXaW5kb3dzSW5Hcm91cFwiLHBheWxvYWQ6e2dyb3VwSWQ6ZX19KSk7cmV0dXJuIHQucGF5bG9hZC53aW5kb3dzP3QucGF5bG9hZC53aW5kb3dzLm1hcChlPT4oe25hdGl2ZUlkOmVbMF0sY2xpZW50SWQ6ZVsxXX0pKTpbXX1hc3luYyBnZXRBbGxHcm91cElkcygpe3JldHVybihhd2FpdCh0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiZ2V0QWxsR3JvdXBJZHNcIn0pKSkucGF5bG9hZC5ncm91cElkc31hc3luYyBtaW5pbWl6ZUdyb3VwKGUpe2F3YWl0KHRoaXMuY2xpZW50Py5kaXNwYXRjaChcInNuYXBfYXBpX2ludm9rZVwiLHthY3Rpb246XCJtaW5pbWl6ZUdyb3VwXCIscGF5bG9hZDp7Z3JvdXBJZDplfX0pKX1hc3luYyByZXN0b3JlR3JvdXAoZSl7YXdhaXQodGhpcy5jbGllbnQ/LmRpc3BhdGNoKFwic25hcF9hcGlfaW52b2tlXCIse2FjdGlvbjpcInJlc3RvcmVHcm91cFwiLHBheWxvYWQ6e2dyb3VwSWQ6ZX19KSl9Z2V0U25hcFNlcnZlclN0YXR1cygpe3JldHVybiB0aGlzLnNuYXBTZXJ2ZXJTdGF0dXN9aGFuZGxlU25hcFNlcnZlckRpc2Nvbm5lY3Rpb24oKXt0aGlzLnN0b3BIZWFsdGhDaGVjaygpLHRoaXMuY2xpZW50PXZvaWQgMCx0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIiksY29uc29sZS53YXJuKFwiU25hcFNESzogRGlzY29ubmVjdGVkIGZyb20gU25hcCBzZXJ2ZXIsIGF0dGVtcHQgcmVjb25uZWN0LlwiKSx0aGlzLmludGVybmFsQ29ubmVjdCghMSl9YXN5bmMgaW50ZXJuYWxDb25uZWN0KGUpe2lmKHRoaXMuc3RvcEhlYWx0aENoZWNrKCksdGhpcy5jbGllbnQ9YXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KGBzbmFwLXNlcnZlci1jb3JlLSR7dGhpcy5zZXJ2ZXJfaWR9YCksdGhpcy5jbGllbnQucmVnaXN0ZXIoXCJzbmFwX2hhbmRzaGFrZVwiLGFzeW5jKHQsbik9Pnt0cnl7ZSYmYXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjp0LnZlcnNpb24sY29tcG9uZW50TmFtZTpcInNuYXAtc2VydmVyXCJ9fSl9Y2F0Y2h7Y29uc29sZS53YXJuKFwiU25hcFNESzogRmFpbGVkIHRvIHJlZ2lzdGVyIHVzYWdlIGZvciBTbmFwIFNlcnZlclwiKX19KSx0aGlzLmNsaWVudC5vbkRpc2Nvbm5lY3Rpb24oKCk9PnRoaXMuaGFuZGxlU25hcFNlcnZlckRpc2Nvbm5lY3Rpb24oKSksZSl0cnl7YXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiYWRhcHRlci1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjpcIjEuNi4xXCIsY29tcG9uZW50TmFtZTpcInNuYXAtY2xpZW50XCJ9fSl9Y2F0Y2h7Y29uc29sZS53YXJuKFwiU25hcFNESzogRmFpbGVkIHRvIHJlZ2lzdGVyIHVzYWdlIGZvciBTbmFwIFNlcnZlclwiKX10aGlzLmNsaWVudC5yZWdpc3RlcihcInNuYXBfdXBkYXRlc1wiLChlLHQpPT50aGlzLmhhbmRsZVNuYXBFdmVudHMoZSx0KSksdGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiY29ubmVjdGVkXCIpLHRoaXMuc3RhcnRIZWFsdGhDaGVjaygpLHRoaXMuX19leHRlbnNpb25zLmZvckVhY2goZT0+ZS5vbkNvbm5lY3RlZCh0aGlzLmNsaWVudCkpfXNldFNuYXBTZXJ2ZXJTdGF0dXMoZSl7dGhpcy5zbmFwU2VydmVyU3RhdHVzIT09ZSYmKHRoaXMuc25hcFNlcnZlclN0YXR1cz1lLFwiZGlzY29ubmVjdGVkXCI9PT1lP3RoaXMuZW1pdF9ldmVudChcInNuYXAtc2VydmVyLWRpc2Nvbm5lY3RlZFwiLHt9KTpcIm5vLXJlc3BvbnNlXCI9PT1lJiZ0aGlzLmVtaXRfZXZlbnQoXCJzbmFwLXNlcnZlci1uby1yZXNwb25zZVwiLHt0aW1lc3RhbXA6RGF0ZS5ub3coKX0pKX1zdGFydEhlYWx0aENoZWNrKCl7aWYoXCJkaXNjb25uZWN0ZWRcIiE9PXRoaXMuc25hcFNlcnZlclN0YXR1cyYmIXRoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmcmJiF0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWwpe3RoaXMuaGVhbHRoQ2hlY2tJbml0aWFsaXppbmc9ITA7dHJ5e3RoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbD1zZXRJbnRlcnZhbChhc3luYygpPT57aWYoXCJkaXNjb25uZWN0ZWRcIiE9PXRoaXMuc25hcFNlcnZlclN0YXR1cyYmdGhpcy5jbGllbnQpdHJ5e2NvbnN0IGU9bmV3IFByb21pc2UoKGUsdCk9PntzZXRUaW1lb3V0KCgpPT50KG5ldyBFcnJvcihcIlNuYXAgc2VydmVyIHJlc3BvbnNlIHRpbWVvdXRcIikpLHRoaXMuaGVhbHRoQ2hlY2tUaW1lb3V0TXMpfSksdD1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpLG49YXdhaXQgUHJvbWlzZS5yYWNlKFt0aGlzLmNsaWVudD8uZGlzcGF0Y2goXCJzbmFwX2FwaV9pbnZva2VcIix7YWN0aW9uOlwiaGVhbHRoQ2hlY2tcIixwYXlsb2FkOntub25jZTp0fX0pfHxQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDbGllbnQgaXMgbm90IGF2YWlsYWJsZVwiKSksZV0pO2lmKCF0aGlzLmNsaWVudClyZXR1cm4gdm9pZCB0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIik7aWYoIW4/LnBheWxvYWR8fG4ucGF5bG9hZC5ub25jZSE9PXQpdGhyb3cgbmV3IEVycm9yKFwiSGVhbHRoIGNoZWNrIHZhbGlkYXRpb24gZmFpbGVkIC0gbm9uY2UgbWlzbWF0Y2hcIik7XCJuby1yZXNwb25zZVwiPT09dGhpcy5zbmFwU2VydmVyU3RhdHVzJiZ0aGlzLnNldFNuYXBTZXJ2ZXJTdGF0dXMoXCJjb25uZWN0ZWRcIil9Y2F0Y2goZSl7dGhpcy5jbGllbnQ/dGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwibm8tcmVzcG9uc2VcIik6dGhpcy5zZXRTbmFwU2VydmVyU3RhdHVzKFwiZGlzY29ubmVjdGVkXCIpfX0sdGhpcy5oZWFsdGhDaGVja0ludGVydmFsTXMpfWZpbmFsbHl7dGhpcy5oZWFsdGhDaGVja0luaXRpYWxpemluZz0hMX19fXN0b3BIZWFsdGhDaGVjaygpe3RoaXMuaGVhbHRoQ2hlY2tJbnRlcnZhbCYmKGNsZWFySW50ZXJ2YWwodGhpcy5oZWFsdGhDaGVja0ludGVydmFsKSx0aGlzLmhlYWx0aENoZWNrSW50ZXJ2YWw9dm9pZCAwKX1oYW5kbGVOZXdXaW5kb3coZSl7Y29uc3QgdD10aGlzLmhhbmRsZU5ld1dpbmRvd1dvcmsoZSk7dGhpcy5wZW5kaW5nUmVnaXN0cmF0aW9uUHJvbWlzZXMuYWRkKHQpLHQuZmluYWxseSgoKT0+e3RoaXMucGVuZGluZ1JlZ2lzdHJhdGlvblByb21pc2VzLmRlbGV0ZSh0KX0pfWFzeW5jIGhhbmRsZU5ld1dpbmRvd1dvcmsoZSl7dGhpcy5wZW5kaW5nV2luZG93UmVnaXN0cmF0aW9ucys9MTt0cnl7YXdhaXQgdGhpcy5oYW5kbGVOZXdXaW5kb3dJbXBsKGUpfWZpbmFsbHl7dGhpcy5wZW5kaW5nV2luZG93UmVnaXN0cmF0aW9ucy09MX19YXN5bmMgZHJhaW5QZW5kaW5nV2luZG93UmVnaXN0cmF0aW9ucyhlKXtjb25zdCB0PW5ldyBTZXQoZSk7bGV0IG49QXJyYXkuZnJvbSh0KS5maWx0ZXIoZT0+IXRoaXMucHJlcGFyZWRXaW5kb3dSZWdpc3RyYXRpb25DbGllbnRJZHMuaGFzKGUpKTtpZihhd2FpdCBuZXcgUHJvbWlzZShlPT57Y29uc3QgaT1wZXJmb3JtYW5jZS5ub3coKSxyPXNldEludGVydmFsKCgpPT57bj1BcnJheS5mcm9tKHQpLmZpbHRlcihlPT4hdGhpcy5wcmVwYXJlZFdpbmRvd1JlZ2lzdHJhdGlvbkNsaWVudElkcy5oYXMoZSkpLCgwPT09bi5sZW5ndGh8fHBlcmZvcm1hbmNlLm5vdygpLWk+PXAuUEVORElOR19SRUdJU1RSQVRJT05fRFJBSU5fTVMpJiYoY2xlYXJJbnRlcnZhbChyKSxlKCkpfSwyNSl9KSxuLmxlbmd0aD4wKXtjb25zdCBlPWBTbmFwU0RLOiBUaW1lZCBvdXQgd2FpdGluZyBmb3Igd2luZG93IHJlZ2lzdHJhdGlvbnMsIG1pc3Npbmc9WyR7bi5qb2luKFwiLCBcIil9XWA7dGhyb3cgY29uc29sZS53YXJuKGUpLG5ldyBFcnJvcihlKX1jb25zdCBpPVsuLi50aGlzLnBlbmRpbmdSZWdpc3RyYXRpb25Qcm9taXNlc107bGV0IHI9ITE7aWYoYXdhaXQgUHJvbWlzZS5yYWNlKFtQcm9taXNlLmFsbChpKSxuZXcgUHJvbWlzZShlPT57c2V0VGltZW91dCgoKT0+e3I9ITAsZSgpfSxwLlBFTkRJTkdfUkVHSVNUUkFUSU9OX0RSQUlOX01TKX0pXSksciYmdGhpcy5wZW5kaW5nUmVnaXN0cmF0aW9uUHJvbWlzZXMuc2l6ZT4wKXtjb25zdCBlPWBTbmFwU0RLOiBUaW1lZCBvdXQgZHJhaW5pbmcgd2luZG93IHJlZ2lzdHJhdGlvbnMgYWZ0ZXIgJHtwLlBFTkRJTkdfUkVHSVNUUkFUSU9OX0RSQUlOX01TfW1zLCBzdGlsbCBpbiBmbGlnaHQ9JHt0aGlzLnBlbmRpbmdSZWdpc3RyYXRpb25Qcm9taXNlcy5zaXplfWA7dGhyb3cgY29uc29sZS53YXJuKGUpLG5ldyBFcnJvcihlKX19YXN5bmMgaGFuZGxlTmV3V2luZG93SW1wbChlKXtjb25zdCB0PWF3YWl0IGZpbi5XaW5kb3cud3JhcCh7dXVpZDplLnV1aWQsbmFtZTplLm5hbWV9KSxuPWF3YWl0IHQuZ2V0TmF0aXZlSWQoKTtsZXQgaT10LmlkZW50aXR5Lm5hbWU7Y29uc3Qgcj1hd2FpdCB0LmdldE9wdGlvbnMoKTtpZih2b2lkIDAhPT1yLmluY2x1ZGVJblNuYXBzaG90cyYmITE9PT1yLmluY2x1ZGVJblNuYXBzaG90cylyZXR1cm4gdm9pZCBjb25zb2xlLmxvZyhgU25hcFNESzogTm90IHJlZ2lzdGVyaW5nICR7ZS51dWlkfToke2UubmFtZX0sIFdpbmRvdyBpcyBleHBsaWNpdGx5IGV4Y2x1ZGVkIC1pbmNsdWRlSW5TbmFwc2hvdHMgPT0gZmFsc2VgKTtjb25zdCBhPXIuY3VzdG9tRGF0YXx8e307YS5zbmFwQ2xpZW50SWQ/aT1hLnNuYXBDbGllbnRJZDphd2FpdCB0LnVwZGF0ZU9wdGlvbnMoe2N1c3RvbURhdGE6ey4uLmEsc25hcENsaWVudElkOml9fSksY29uc29sZS5sb2coYFNuYXBTREs6IEF1dG8tcmVnaXN0ZXJpbmcgd2luZG93OiBzbmFwQ2xpZW50SWQ6JHtpfSwgaGFuZGxlICR7bn0sIHV1aWQ6JHtlLnV1aWR9LCBuYW1lOiR7ZS5uYW1lfWApLHRoaXMucHJlcGFyZWRXaW5kb3dSZWdpc3RyYXRpb25DbGllbnRJZHMuYWRkKGkpLGF3YWl0IHRoaXMucmVnaXN0ZXJXaW5kb3coaSxuLGEuc25hcFJlc2l6aW5nQmVoYXZpb3IpfWVtaXRfZXZlbnQoZSwuLi50KXt0aGlzLmVtaXR0ZXIuZW1pdChlLC4uLnQpfWhhbmRsZVNuYXBFdmVudHMoZSx0KXtzd2l0Y2godGhpcy5lbWl0X2V2ZW50KFwiYWxsLWV2ZW50c1wiLHt0eXBlOmUuYWN0aW9uLHBheWxvYWQ6ZS5wYXlsb2FkfSksZS5hY3Rpb24pe2Nhc2VcImNsaWVudFJlZ2lzdGVyZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtcmVnaXN0ZXJlZFwiLHtjbGllbnRJZDplLnBheWxvYWQuY2xpZW50SWQsd2luZG93SGFuZGxlOmAjJHtlLnBheWxvYWQud2luZG93SGFuZGxlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWAsb3duaW5nUHJvY2Vzc0lkOmUucGF5bG9hZC5vd25pbmdQcm9jZXNzSWR9KTticmVhaztjYXNlXCJjbGllbnRVblJlZ2lzdGVyZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtdW5yZWdpc3RlcmVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcIm1vdmVTaXplQ29tcGxldGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwibW92ZS1zaXplLWNvbXBsZXRlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnRzQXR0YWNoZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnRzLWF0dGFjaGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudERldGFjaGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LWRldGFjaGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImdyb3Vwc0NoYW5nZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJncm91cHMtY2hhbmdlZFwiLHsuLi5lLnBheWxvYWR9KTticmVhaztjYXNlXCJjbGllbnRBY3RpdmF0ZWRcIjp0aGlzLmVtaXRfZXZlbnQoXCJjbGllbnQtYWN0aXZhdGVkXCIsey4uLmUucGF5bG9hZH0pO2JyZWFrO2Nhc2VcImNsaWVudERlYWN0aXZhdGVkXCI6dGhpcy5lbWl0X2V2ZW50KFwiY2xpZW50LWRlYWN0aXZhdGVkXCIsey4uLmUucGF5bG9hZH0pfX1oZXhTdHJpbmdUb051bWJlcihlKXtjb25zdCB0PWU/LnRyaW0oKTtyZXR1cm4vXjB4WzAtOWEtZl0rJC9pLnRlc3QodCk/TnVtYmVyKHQpOk5hTn1hc3luYyBidWlsZF9jb21tYW5kX2xpbmUoZSl7bGV0IHQ9YC0taWQgJHt0aGlzLnNlcnZlcl9pZH0gYDtlPy5zaG93RGVidWcmJih0Kz1cIiAtLXNob3ctZGVidWcgXCIpLGU/LmRpc2FibGVHUFVBY2NlbGVyYXRlZERyYWdnaW5nJiYodCs9XCIgLS1kaXNhYmxlLWdwdS1hY2NlbGVyYXRlZC1kcmFnZ2luZyB0cnVlIFwiKSxlPy5kaXNhYmxlQmx1ckRyb3BQcmV2aWV3JiYodCs9XCIgLS1ibHVyLWRyb3AtcHJldmlldyBmYWxzZSBcIiksdm9pZCAwIT09ZT8uYmx1ckVmZmVjdFBlcmZvcm1hbmNlVGhyZXNob2xkJiYodCs9YCAtLWJsdXItZWZmZWN0LXBlcmZvcm1hbmNlLXRocmVzaG9sZD0ke2U/LmJsdXJFZmZlY3RQZXJmb3JtYW5jZVRocmVzaG9sZH0gYCksZT8uZGlzYWJsZVVzZXJVbnN0aWNrJiYodCs9XCIgLS1kaXNhYmxlLXVzZXItdW5zdGljayBcIiksITAhPT1lPy5rZXlUb1N0aWNrJiZcInN0cmluZ1wiIT10eXBlb2YgZT8ua2V5VG9TdGlja3x8KHQrPWAgLS1rcz0keyEwPT09ZS5rZXlUb1N0aWNrP1wiY3RybFwiOmUua2V5VG9TdGlja30gYCksZT8ua2V5VG9VbnN0aWNrJiYodCs9YCAtLWt1cz0ke2Uua2V5VG9VbnN0aWNrfSBgKSxlPy5rZXlUb0dyb3VwU3RpY2smJih0Kz1gIC0ta2dzPSR7ZS5rZXlUb0dyb3VwU3RpY2t9IGApLGU/LmJsb2NrT3ZlcmxhcEdyb3VwU25hcHBpbmcmJih0Kz1cIiAtLWJsb2NrLW92ZXJsYXAtZ3JvdXAtc25hcHBpbmcgXCIpLGU/LmhpZGVUYXNrYmFyRW50cnkmJih0Kz1cIiAtLW5vLXRiIFwiKSxlPy50YXNrYmFySWNvbkdyb3VwJiYodCs9YCAtLXRiLWlkPSR7ZT8udGFza2Jhckljb25Hcm91cH0gYCksZT8udGFza2Jhckljb24mJih0Kz1gIC0tdGItaWNvbj0ke2U/LnRhc2tiYXJJY29ufSBgKSxlPy5kaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZyYmKHQrPVwiIC0tbm8taGIgXCIpLGU/LmF1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zJiYodCs9XCIgLS10Yi1hdXRvLWhpZGUgXCIpLGU/LnRoZW1lJiYodCs9YCAtLXRobT0ke2UudGhlbWV9IGApLGU/LmRlZmF1bHRSZXNpemluZ0JlaGF2aW9yJiYodCs9YCAtLXJlcz0ke2U/LmRlZmF1bHRSZXNpemluZ0JlaGF2aW9yfSBgKTtjb25zdCBuPWF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKTtyZXR1cm4gdCs9YC0tcnVudGltZS1wb3J0ICR7bi5wb3J0fSBgLHQrPWAtLXJ1bnRpbWUtdmVyc2lvbiAke24udmVyc2lvbn0gYCx0LnRyaW0oKX19cC5QRU5ESU5HX1JFR0lTVFJBVElPTl9EUkFJTl9NUz0xNWUzO2NvbnN0IGw9YXN5bmMgZT0+e2xldCB0PShhd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCkpLmFyZ3NbXCJsb2NhbC1zdGFydHVwLXVybFwiXS5yZXBsYWNlKFwiY29uZmlnLmpzb25cIixcIlwiKTtjb25zdCBuPXQuaW5jbHVkZXMoXCJcXFxcXCIpP1wiXFxcXFwiOlwiL1wiO3JldHVybiB0LmVuZHNXaXRoKG4pJiYodD10LnNsaWNlKDAsLTEpKSxbdCxcImFzc2V0c1wiLGUuYWxpYXMsZS52ZXJzaW9uLGUudGFyZ2V0XS5qb2luKG4pfSxoPSgpPT5cInVuZGVmaW5lZFwiIT10eXBlb2YgY3J5cHRvJiZcInJhbmRvbVVVSURcImluIGNyeXB0byYmXCJmdW5jdGlvblwiPT10eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQ/Y3J5cHRvLnJhbmRvbVVVSUQoKTpcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csZT0+KGVeY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0mMTU+PmUvNCkudG9TdHJpbmcoMTYpKSxkPWU9Pi9eYXBwOlxcL1teL10rXFwvW14vXSskLy50ZXN0KGU/P1wiXCIpLHU9ZT0+e2NvbnN0IHQ9bmV3IE1hcDtyZXR1cm4gZS5mb3JFYWNoKGU9Pntjb25zdCBuPSFlLm5hbWUsaT1lLm5hbWU/LnN0YXJ0c1dpdGgoYyk/PyExLHI9ZS5jdXN0b21EYXRhPy5zbmFwQ2xpZW50SWQ7KG58fGl8fGQoZS5uYW1lKSkmJnImJnQuc2V0KHIsZSl9KSx0fSxmPShlLHQsbik9PntPYmplY3QudmFsdWVzKGUpLmZvckVhY2goZT0+e2UuYXR0YWNoZWRDbGllbnRJZD09PXQ/ZS5hdHRhY2hlZENsaWVudElkPW46ZS50YXJnZXRDbGllbnRJZD09PXQmJihlLnRhcmdldENsaWVudElkPW4pfSl9LHc9ZT0+e2lmKCFkKGUpKXJldHVybmAke2N9JHtoKCl9YDtjb25zdCB0PWUuc3BsaXQoXCIvXCIpO3JldHVybiB0W3QubGVuZ3RoLTFdPWgoKSx0LmpvaW4oXCIvXCIpfTtleHBvcnR7cCBhcyBTbmFwU2VydmVyfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBPcGVuRmluIH0gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCAqIGFzIFNuYXAgZnJvbSBcIkBvcGVuZmluL3NuYXAtc2RrXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlck9wdGlvbnMgfSBmcm9tIFwiQG9wZW5maW4vc25hcC1zZGtcIjtcbmltcG9ydCB7IGRvZXNBcHBBc3NldEV4aXN0LCBkb3dubG9hZEFwcEFzc2V0IH0gZnJvbSBcIi4vYXBwLWFzc2V0XCI7XG5cbmNvbnN0IFRFU1RfQVBQX1dJTkRPV19JRCA9IFwic25hcC1leGFtcGxlLW5hdGl2ZS10ZXN0LWFwcC1pZFwiO1xuY29uc3Qgc25hcERlZmF1bHRVcmwgPSBcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vcmVsZWFzZS9zbmFwLzEuNi4xL3NuYXAuemlwXCI7XG5jb25zdCBzbmFwVmVyc2lvbiA9IFwiMS42LjFcIjtcbmNvbnN0IHNuYXBBbGlhcyA9IFwib3BlbmZpbi1zbmFwXCI7XG5jb25zdCBzbmFwVGFyZ2V0ID0gXCJPcGVuRmluU25hcC5leGVcIjtcblxuLy8gVGhlIERPTSBlbGVtZW50c1xubGV0IGNoa1Nob3dEZWJ1Z1dpbmRvdzogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXA6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0N0cmxUb1NuYXA6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0Rpc2FibGVHUFVEcmFnZ2luZzogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrRGlzYWJsZUJsdXJEcm9wOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29uczogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5cbmxldCBjaGtIaWRlVGFza0JhckVudHJ5OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtDdXN0b21UYXNrQmFySWNvbjogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgY2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXA6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsO1xubGV0IGNoa0Rpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCBjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCB0eHRQcmltYXJ5VXJsOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbDtcbmxldCB0eHRGYWxsYmFja1VybDogSFRNTElucHV0RWxlbWVudCB8IG51bGw7XG5sZXQgZmllbGRQcmltYXJ5VXJsOiBIVE1MRWxlbWVudCB8IG51bGw7XG5sZXQgZmllbGRGYWxsYmFja1VybDogSFRNTEVsZW1lbnQgfCBudWxsO1xubGV0IHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGg6IEhUTUxFbGVtZW50IHwgbnVsbDtcblxubGV0IGJ0blN0YXJ0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuU3RvcDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bk5hdGl2ZVRlc3RBcHA6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5XaW5kb3dUZXN0QXBwOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuU2hvd0hpZGVEZWJ1Z1dpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IHNlbEF0dGFjaFBvc2l0aW9uOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgc2VsU25hcEtleTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IHNlbFVuc25hcEtleTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IHNlbFJlc2l6ZTogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IHNlbFRoZW1lOiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQXR0YWNoVG9XaW5kb3c6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5EZXRhY2hGcm9tV2luZG93OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuTWluaW1pemVHcm91cDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkdldExheW91dDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkdldEF0dGFjaGVkOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0R3JvdXBzOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdzogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgc2VydmVyU3RhdHVzOiBIVE1MUGFyYWdyYXBoRWxlbWVudCB8IG51bGw7XG5sZXQgbG9nZ2luZzogSFRNTFByZUVsZW1lbnQgfCBudWxsO1xubGV0IGRlYnVnV2luZG93U2hvd24gPSBmYWxzZTtcblxubGV0IHNlcnZlclN0YXRlOiBcInN0YXJ0aW5nXCIgfCBcInN0YXJ0ZWRcIiB8IFwic3RvcHBpbmdcIiB8IFwic3RvcHBlZFwiID0gXCJzdG9wcGVkXCI7XG5sZXQgaXNXaW5kb3dPcGVuID0gZmFsc2U7XG5sZXQgaXNXaW5kb3dBdHRhY2hlZCA9IGZhbHNlO1xubGV0IHNlcnZlcjogU25hcC5TbmFwU2VydmVyIHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIEN1c3RvbSBsb2dnZXIgdGhhdCBpbXBsZW1lbnRzIHRoZSBMb2dnZXIgaW50ZXJmYWNlIHVzaW5nIGxvZ0luZm9ybWF0aW9uIGFuZCBsb2dFcnJvciBmdW5jdGlvbnNcbiAqL1xuY29uc3QgY3VzdG9tTG9nZ2VyID0ge1xuXHRpbmZvOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0luZm9ybWF0aW9uKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9LFxuXHRlcnJvcjogKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcblx0XHRsb2dFcnJvcihgJHttZXNzYWdlfSR7b3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCA/IGAgJHtvcHRpb25hbFBhcmFtcy5qb2luKFwiIFwiKX1gIDogXCJcIn1gKTtcblx0fSxcblx0d2FybjogKG1lc3NhZ2U6IHVua25vd24sIC4uLm9wdGlvbmFsUGFyYW1zOiB1bmtub3duW10pOiB2b2lkID0+IHtcblx0XHRsb2dFcnJvcihgJHttZXNzYWdlfSR7b3B0aW9uYWxQYXJhbXMubGVuZ3RoID4gMCA/IGAgJHtvcHRpb25hbFBhcmFtcy5qb2luKFwiIFwiKX1gIDogXCJcIn1gKTtcblx0fSxcblx0dHJhY2U6IChtZXNzYWdlOiB1bmtub3duLCAuLi5vcHRpb25hbFBhcmFtczogdW5rbm93bltdKTogdm9pZCA9PiB7XG5cdFx0bG9nSW5mb3JtYXRpb24oYCR7bWVzc2FnZX0ke29wdGlvbmFsUGFyYW1zLmxlbmd0aCA+IDAgPyBgICR7b3B0aW9uYWxQYXJhbXMuam9pbihcIiBcIil9YCA6IFwiXCJ9YCk7XG5cdH0sXG5cdGRlYnVnOiAobWVzc2FnZTogdW5rbm93biwgLi4ub3B0aW9uYWxQYXJhbXM6IHVua25vd25bXSk6IHZvaWQgPT4ge1xuXHRcdGxvZ0luZm9ybWF0aW9uKGAke21lc3NhZ2V9JHtvcHRpb25hbFBhcmFtcy5sZW5ndGggPiAwID8gYCAke29wdGlvbmFsUGFyYW1zLmpvaW4oXCIgXCIpfWAgOiBcIlwifWApO1xuXHR9XG59O1xuXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGZpbmlzaCBsb2FkaW5nXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBQbGF0Zm9ybSBoYXMgbG9hZGVkIHNvIGluaXRpYWxpemUgdGhlIERPTVxuXHRhd2FpdCBpbml0aWFsaXplRE9NKCk7XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVET00oKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNoa1Nob3dEZWJ1Z1dpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrU2hvd0RlYnVnV2luZG93XCIpO1xuXHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXBcIik7XG5cdGNoa0N0cmxUb1NuYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0N0cmxUb1NuYXBcIik7XG5cdGNoa0Rpc2FibGVHUFVEcmFnZ2luZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrRGlzYWJsZUdQVURyYWdnaW5nXCIpO1xuXHRjaGtEaXNhYmxlQmx1ckRyb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0Rpc2FibGVCbHVyRHJvcFwiKTtcblx0Y2hrSGlkZVRhc2tCYXJFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjY2hrSGlkZVRhc2tCYXJFbnRyeVwiKTtcblx0Y2hrQ3VzdG9tVGFza0Jhckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0N1c3RvbVRhc2tCYXJJY29uXCIpO1xuXHRjaGtHcm91cFdpdGhQbGF0Zm9ybVRhc2tiYXJHcm91cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXG5cdFx0XCIjY2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXBcIlxuXHQpO1xuXG5cdGNoa0F1dG9IaWRlQ2xpZW50VGFza2Jhckljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29uc1wiKTtcblx0Y2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2Noa0Rpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nXCIpO1xuXHRjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoXCIpO1xuXHR0eHRQcmltYXJ5VXJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiN0eHRQcmltYXJ5VXJsXCIpO1xuXHR0eHRGYWxsYmFja1VybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudD4oXCIjdHh0RmFsbGJhY2tVcmxcIik7XG5cdGZpZWxkUHJpbWFyeVVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI2ZpZWxkUHJpbWFyeVVybFwiKTtcblx0ZmllbGRGYWxsYmFja1VybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI2ZpZWxkRmFsbGJhY2tVcmxcIik7XG5cdHJvd0N1c3RvbVNuYXBBcHBBc3NldFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNyb3dDdXN0b21TbmFwQXBwQXNzZXRQYXRoXCIpO1xuXG5cdGJ0blN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU3RhcnRcIik7XG5cdGJ0blN0b3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5TdG9wXCIpO1xuXHRzZXJ2ZXJTdGF0dXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQYXJhZ3JhcGhFbGVtZW50PihcIiNzZXJ2ZXJTdGF0dXNcIik7XG5cdGJ0bk5hdGl2ZVRlc3RBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5OYXRpdmVUZXN0QXBwXCIpO1xuXHRidG5XaW5kb3dUZXN0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuV2luZG93VGVzdEFwcFwiKTtcblx0c2VsQXR0YWNoUG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxBdHRhY2hQb3NpdGlvblwiKTtcblx0c2VsU25hcEtleSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbEtleVRvU25hcFwiKTtcblx0c2VsVW5zbmFwS2V5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MU2VsZWN0RWxlbWVudD4oXCIjc2VsS2V5VG9VbnNuYXBcIik7XG5cdHNlbFJlc2l6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI3NlbFJlc2l6ZUJlaGF2aW91clwiKTtcblx0c2VsVGhlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNzZWxUaGVtZVwiKTtcblx0YnRuQXR0YWNoVG9XaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5BdHRhY2hUb1dpbmRvd1wiKTtcblx0YnRuRGV0YWNoRnJvbVdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkRldGFjaEZyb21XaW5kb3dcIik7XG5cdGJ0bk1pbmltaXplR3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5NaW5pbWl6ZUdyb3VwXCIpO1xuXHRidG5HZXRMYXlvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5HZXRMYXlvdXRcIik7XG5cdGJ0bkdldEF0dGFjaGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuR2V0QXR0YWNoZWRcIik7XG5cdGJ0bkdldEdyb3VwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldEdyb3Vwc1wiKTtcblx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3dcIik7XG5cdGxvZ2dpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQcmVFbGVtZW50PihcIiNsb2dnaW5nXCIpO1xuXHRidG5DbGVhckxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNsZWFyTG9nXCIpO1xuXHRidG5TaG93SGlkZURlYnVnV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuU2hvd0hpZGVEZWJ1Z1dpbmRvd1wiKTtcblxuXHRpZiAoXG5cdFx0Y2hrU2hvd0RlYnVnV2luZG93ICYmXG5cdFx0Y2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXAgJiZcblx0XHRjaGtDdHJsVG9TbmFwICYmXG5cdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nICYmXG5cdFx0Y2hrRGlzYWJsZUJsdXJEcm9wICYmXG5cdFx0Y2hrSGlkZVRhc2tCYXJFbnRyeSAmJlxuXHRcdGNoa0N1c3RvbVRhc2tCYXJJY29uICYmXG5cdFx0Y2hrR3JvdXBXaXRoUGxhdGZvcm1UYXNrYmFyR3JvdXAgJiZcblx0XHRjaGtBdXRvSGlkZUNsaWVudFRhc2tiYXJJY29ucyAmJlxuXHRcdGNoa0Rpc2FibGVSdW50aW1lSGVhcnRiZWF0aW5nICYmXG5cdFx0Y2hrQ3VzdG9tU25hcEFwcEFzc2V0UGF0aCAmJlxuXHRcdHR4dFByaW1hcnlVcmwgJiZcblx0XHR0eHRGYWxsYmFja1VybCAmJlxuXHRcdGZpZWxkUHJpbWFyeVVybCAmJlxuXHRcdGZpZWxkRmFsbGJhY2tVcmwgJiZcblx0XHRyb3dDdXN0b21TbmFwQXBwQXNzZXRQYXRoICYmXG5cdFx0YnRuU3RhcnQgJiZcblx0XHRidG5TdG9wICYmXG5cdFx0c2VydmVyU3RhdHVzICYmXG5cdFx0YnRuTmF0aXZlVGVzdEFwcCAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdGJ0bk1pbmltaXplR3JvdXAgJiZcblx0XHRidG5HZXRMYXlvdXQgJiZcblx0XHRidG5HZXRBdHRhY2hlZCAmJlxuXHRcdGJ0bkdldEdyb3VwcyAmJlxuXHRcdGJ0bkdldEdyb3Vwc0ZvckN1cnJlbnRXaW5kb3cgJiZcblx0XHRidG5DbGVhckxvZyAmJlxuXHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3dcblx0KSB7XG5cdFx0dHh0UHJpbWFyeVVybC52YWx1ZSA9IFwiaHR0cHM6Ly9leGFtcGxlb2ZiYWR1cmwuY29tL3NuYXAuemlwXCI7XG5cdFx0dHh0RmFsbGJhY2tVcmwudmFsdWUgPSBzbmFwRGVmYXVsdFVybDtcblx0XHRjaGtDdXN0b21TbmFwQXBwQXNzZXRQYXRoLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0Y29uc3QgZGlzcGxheSA9IGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGg/LmNoZWNrZWQgPyBcIlwiIDogXCJub25lXCI7XG5cdFx0XHRpZiAoZmllbGRQcmltYXJ5VXJsKSB7XG5cdFx0XHRcdGZpZWxkUHJpbWFyeVVybC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZEZhbGxiYWNrVXJsKSB7XG5cdFx0XHRcdGZpZWxkRmFsbGJhY2tVcmwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0XHRjb25zdCBtYW5pZmVzdCA9IGF3YWl0IGFwcC5nZXRNYW5pZmVzdCgpO1xuXG5cdFx0aWYgKG1hbmlmZXN0LmFwcEFzc2V0cz8uc29tZSgoYXNzZXQ6IHsgYWxpYXM/OiBzdHJpbmcgfSkgPT4gYXNzZXQuYWxpYXMgPT09IFwib3BlbmZpbi1zbmFwXCIpKSB7XG5cdFx0XHRyb3dDdXN0b21TbmFwQXBwQXNzZXRQYXRoLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblx0XHR9XG5cblx0XHRpZiAobWFuaWZlc3QuYXBwQXNzZXRzPy5bMF0/LnNyYyA9PT0gXCJTTkFQX0FTU0VUX1VSTFwiKSB7XG5cdFx0XHRsb2dFcnJvcihcblx0XHRcdFx0XCJQbGVhc2UgcmVxdWVzdCB0aGUgU05BUF9BU1NFVF9VUkwgZnJvbSBIRVJFIGFuZCB1cGRhdGUgbWFuaWZlc3QuZmluLmpzb24gYmVmb3JlIHJ1bm5pbmcgdGhlIHNhbXBsZVwiXG5cdFx0XHQpO1xuXHRcdFx0dXBkYXRlU2VydmVyU3RhdHVzKCk7XG5cdFx0XHRjaGtTaG93RGVidWdXaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrQ3RybFRvU25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlR1BVRHJhZ2dpbmcuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUJsdXJEcm9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YnRuU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RhcnRpbmdcIjtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBTdGFydGluZyBTbmFwIFNlcnZlciB3aXRoIElkICR7ZmluLm1lLmlkZW50aXR5LnV1aWR9YCk7XG5cdFx0XHRcdFx0c2VydmVyID0gbmV3IFNuYXAuU25hcFNlcnZlcihmaW4ubWUuaWRlbnRpdHkudXVpZCk7XG5cdFx0XHRcdFx0bGV0IGtleVRvU25hcDogdW5kZWZpbmVkIHwgXCJjdHJsXCIgfCBcInNoaWZ0XCIgfCBib29sZWFuO1xuXHRcdFx0XHRcdGxldCBrZXlUb1Vuc25hcDogdW5kZWZpbmVkIHwgXCJjdHJsXCIgfCBcInNoaWZ0XCI7XG5cblx0XHRcdFx0XHRpZiAoY2hrQ3RybFRvU25hcD8uY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc25hcEtleVZhbHVlID0gc2VsU25hcEtleT8udmFsdWU7XG5cdFx0XHRcdFx0XHRpZiAoc25hcEtleVZhbHVlID09PSBcImN0cmxcIikge1xuXHRcdFx0XHRcdFx0XHRrZXlUb1NuYXAgPSBcImN0cmxcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoc25hcEtleVZhbHVlID09PSBcInNoaWZ0XCIpIHtcblx0XHRcdFx0XHRcdFx0a2V5VG9TbmFwID0gXCJzaGlmdFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghY2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXA/LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGtleVRvVW5zbmFwVmFsdWUgPSBzZWxVbnNuYXBLZXk/LnZhbHVlO1xuXHRcdFx0XHRcdFx0aWYgKGtleVRvVW5zbmFwVmFsdWUgPT09IFwiY3RybFwiKSB7XG5cdFx0XHRcdFx0XHRcdGtleVRvVW5zbmFwID0gXCJjdHJsXCI7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGtleVRvVW5zbmFwVmFsdWUgPT09IFwic2hpZnRcIikge1xuXHRcdFx0XHRcdFx0XHRrZXlUb1Vuc25hcCA9IFwic2hpZnRcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBvcHRpb25zOiBTZXJ2ZXJPcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0c2hvd0RlYnVnOiBjaGtTaG93RGVidWdXaW5kb3c/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkaXNhYmxlVXNlclVuc3RpY2s6IGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwPy5jaGVja2VkLFxuXHRcdFx0XHRcdFx0a2V5VG9TdGljazoga2V5VG9TbmFwLFxuXHRcdFx0XHRcdFx0a2V5VG9VbnN0aWNrOiBrZXlUb1Vuc25hcCxcblx0XHRcdFx0XHRcdGRpc2FibGVHUFVBY2NlbGVyYXRlZERyYWdnaW5nOiBjaGtEaXNhYmxlR1BVRHJhZ2dpbmc/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkaXNhYmxlQmx1ckRyb3BQcmV2aWV3OiBjaGtEaXNhYmxlQmx1ckRyb3A/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRoaWRlVGFza2JhckVudHJ5OiBjaGtIaWRlVGFza0JhckVudHJ5Py5jaGVja2VkLFxuXHRcdFx0XHRcdFx0dGFza2Jhckljb246IGNoa0N1c3RvbVRhc2tCYXJJY29uPy5jaGVja2VkID8gXCJodHRwczovL29wZW5maW4uY28vZmF2aWNvbi5pY29cIiA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdHRhc2tiYXJJY29uR3JvdXA6IGNoa0dyb3VwV2l0aFBsYXRmb3JtVGFza2Jhckdyb3VwPy5jaGVja2VkXG5cdFx0XHRcdFx0XHRcdD8gYG9wZW5maW5fYXBwc19ncm91cC4ke2Zpbi5tZS5pZGVudGl0eS51dWlkfWBcblx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRhdXRvSGlkZUNsaWVudFRhc2tiYXJJY29uczogY2hrQXV0b0hpZGVDbGllbnRUYXNrYmFySWNvbnM/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkaXNhYmxlUnVudGltZUhlYXJ0YmVhdGluZzogY2hrRGlzYWJsZVJ1bnRpbWVIZWFydGJlYXRpbmc/LmNoZWNrZWQsXG5cdFx0XHRcdFx0XHRkZWZhdWx0UmVzaXppbmdCZWhhdmlvcjogc2VsUmVzaXplPy52YWx1ZSBhcyBTbmFwLlJlc2l6aW5nQmVoYXZpb3IsXG5cdFx0XHRcdFx0XHR0aGVtZTogc2VsVGhlbWU/LnZhbHVlIGFzIFwic25hcC1vcmlnaW5hbFwiIHwgXCJzbmFwLWxpZ2h0MVwiIHwgXCJzbmFwLWRhcmsxXCJcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0aWYgKGNoa0N1c3RvbVNuYXBBcHBBc3NldFBhdGg/LmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHByaW1hcnlVcmwgPSB0eHRQcmltYXJ5VXJsPy52YWx1ZSA/PyBcIlwiO1xuXHRcdFx0XHRcdFx0Y29uc3QgZmFsbGJhY2tVcmwgPSB0eHRGYWxsYmFja1VybD8udmFsdWU7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHZhbGlkYXRlZEFwcEFzc2V0ID0gYXdhaXQgdmFsaWRhdGVBcHBBc3NldFNvdXJjZShwcmltYXJ5VXJsLCBmYWxsYmFja1VybCk7XG5cdFx0XHRcdFx0XHRpZiAoIXZhbGlkYXRlZEFwcEFzc2V0LnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRcdFx0bG9nRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFx0XCJGYWlsZWQgdG8gZmV0Y2ggdGhlIGFwcCBhc3NldCBmcm9tIGJvdGggcHJpbWFyeSBhbmQgZmFsbGJhY2sgVVJMcy4gQ2Fubm90IHN0YXJ0IHRoZSBTbmFwIHNlcnZlciB3aXRoIGN1c3RvbSBhcHAgYXNzZXQgcGF0aC5cIlxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRvcHRpb25zLmN1c3RvbVNuYXBBc3NldFNvdXJjZSA9IHZhbGlkYXRlZEFwcEFzc2V0LnZhbGlkYXRlZFVybDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RhcnQob3B0aW9ucyk7XG5cblx0XHRcdFx0XHRpZiAoY2hrU2hvd0RlYnVnV2luZG93Py5jaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRkZWJ1Z1dpbmRvd1Nob3duID0gdHJ1ZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZGVidWdXaW5kb3dTaG93biA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZW5hYmxlQXV0b1dpbmRvd1JlZ2lzdHJhdGlvbigpO1xuXG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtcmVnaXN0ZXJlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50UmVnaXN0ZXJlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IFJlZ2lzdGVyZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LXVucmVnaXN0ZXJlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50VW5SZWdpc3RlcmVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnQgVW5yZWdpc3RlcmVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRcdGlmIChldmVudC5jbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93T3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRpc1dpbmRvd0F0dGFjaGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50cy1hdHRhY2hlZFwiLCAoZXZlbnQ6IFNuYXAuQ2xpZW50c0F0dGFjaGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBDbGllbnRzIEF0dGFjaGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRcdGlmIChldmVudC5hdHRhY2hlZENsaWVudElkID09PSBURVNUX0FQUF9XSU5ET1dfSUQpIHtcblx0XHRcdFx0XHRcdFx0aXNXaW5kb3dBdHRhY2hlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWRldGFjaGVkXCIsIChldmVudDogU25hcC5DbGllbnREZXRhY2hlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERldGFjaGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHRcdGlmIChldmVudC5jbGllbnRJZCA9PT0gVEVTVF9BUFBfV0lORE9XX0lEKSB7XG5cdFx0XHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGllbnQtYWN0aXZhdGVkXCIsIChldmVudDogU25hcC5DbGllbnRBY3RpdmF0ZWRFdmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYENsaWVudCBBY3RpdmF0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnQpfWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNlcnZlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpZW50LWRlYWN0aXZhdGVkXCIsIChldmVudDogU25hcC5DbGllbnREZWFjdGl2YXRlZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihgQ2xpZW50IERlYWN0aXZhdGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdmUtc2l6ZS1jb21wbGV0ZWRcIiwgKGV2ZW50OiBTbmFwLk1vdmVTaXplQ29tcGxldGVkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBNb3ZlIFNpemUgQ29tcGxldGVkOiAke0pTT04uc3RyaW5naWZ5KGV2ZW50KX1gKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImdyb3Vwcy1jaGFuZ2VkXCIsIChldmVudDogU25hcC5Hcm91cHNDaGFuZ2VkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBHcm91cHMgQ2hhbmdlZDogJHtKU09OLnN0cmluZ2lmeShldmVudCl9YCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0YXJ0ZWQgU25hcCBTZXJ2ZXJcIik7XG5cblx0XHRcdFx0XHRjb25zdCB3aW4gPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG5cdFx0XHRcdFx0Y29uc3QgbmF0aXZlSWQgPSBhd2FpdCB3aW4uZ2V0TmF0aXZlSWQoKTtcblxuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5yZWdpc3RlcldpbmRvdyhmaW4ubWUuaWRlbnRpdHkudXVpZCwgbmF0aXZlSWQpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRcdFx0YFJlZ2lzdGVyaW5nIFBsYXRmb3JtIFdpbmRvdyB3aXRoIElkICR7ZmluLm1lLmlkZW50aXR5LnV1aWR9IGFuZCBoYW5kbGUgJHtuYXRpdmVJZH1gXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdGFydGVkXCI7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuU3RvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHNlcnZlclN0YXRlID0gXCJzdG9wcGluZ1wiO1xuXHRcdFx0XHRcdHVwZGF0ZVNlcnZlclN0YXR1cygpO1xuXG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXCJTdG9wcGluZyBTbmFwIFNlcnZlclwiKTtcblx0XHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuZGV0YWNoRnJvbUdyb3VwKFRFU1RfQVBQX1dJTkRPV19JRCk7XG5cdFx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuc3RvcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIlN0b3BwZWQgU25hcCBTZXJ2ZXJcIik7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGxvZ0Vycm9yKGZvcm1hdEVycm9yKGVycikpO1xuXHRcdFx0XHR9IGZpbmFsbHkge1xuXHRcdFx0XHRcdHNlcnZlciA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRzZXJ2ZXJTdGF0ZSA9IFwic3RvcHBlZFwiO1xuXHRcdFx0XHRcdGlzV2luZG93T3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0Y29uc3QgcnVudGltZUluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCk7XG5cdFx0XHRcdGNvbnN0IGFwcEFzc2V0SW5mbyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHsgYWxpYXM6IFwic25hcC1uYXRpdmUtdGVzdC1hcHBcIiB9KTtcblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdFx0Y29uc3QgbG9jYWxBcHBVcmwgPSAocnVudGltZUluZm8uYXJncyBhcyBhbnkpW1wibG9jYWwtc3RhcnR1cC11cmxcIl0ucmVwbGFjZShcImNvbmZpZy5qc29uXCIsIFwiXCIpO1xuXHRcdFx0XHRhd2FpdCBsYXVuY2hBcHAoXG5cdFx0XHRcdFx0XCJOYXRpdmUgVGVzdCBBcHBcIixcblx0XHRcdFx0XHRURVNUX0FQUF9XSU5ET1dfSUQsXG5cdFx0XHRcdFx0YCR7bG9jYWxBcHBVcmx9YXNzZXRzXFxcXCR7YXBwQXNzZXRJbmZvLmFsaWFzfVxcXFwke2FwcEFzc2V0SW5mby52ZXJzaW9ufVxcXFwke2FwcEFzc2V0SW5mby50YXJnZXR9YCxcblx0XHRcdFx0XHRbXSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIndhaXRGb3JXaW5kb3dPZk5hbWVcIixcblx0XHRcdFx0XHRcdHRpbWVvdXRNczogMTUwMDAsXG5cdFx0XHRcdFx0XHRtYXRjaFJlZ2V4OiBcIl5OYXRpdmUgVGVzdCBBcHAkXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlzV2luZG93T3BlbiA9IHRydWU7XG5cdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0dXBkYXRlV2luZG93U3RhdHVzKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuV2luZG93VGVzdEFwcD8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0YXdhaXQgbGF1bmNoV2luZG93T3B0aW9uc0FwcCgpO1xuXHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyICYmIHNlbEF0dGFjaFBvc2l0aW9uKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBzZWxBdHRhY2hQb3NpdGlvbi52YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCBzZXJ2ZXIuYXR0YWNoV2luZG93cyhmaW4ubWUuaWRlbnRpdHkudXVpZCwgVEVTVF9BUFBfV0lORE9XX0lELCB2YWx1ZSBhcyBTbmFwLkF0dGFjaFNpZGUsIDApO1xuXHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHVwZGF0ZVdpbmRvd1N0YXR1cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLmRldGFjaEZyb21Hcm91cChURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdGlzV2luZG93QXR0YWNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGdyb3VwSWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0R3JvdXBJZEZvcldpbmRvdyhURVNUX0FQUF9XSU5ET1dfSUQpO1xuXHRcdFx0XHRcdGF3YWl0IHNlcnZlci5taW5pbWl6ZUdyb3VwKGdyb3VwSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0YnRuQ2xlYXJMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdFx0bG9nQ2xlYXIoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRMYXlvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGxheW91dCA9IGF3YWl0IHNlcnZlci5nZXRMYXlvdXQoKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcIkxheW91dFwiKTtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihKU09OLnN0cmluZ2lmeShsYXlvdXQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRBdHRhY2hlZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXR0YWNoZWQgPSBhd2FpdCBzZXJ2ZXIuZ2V0QXR0YWNoZWQoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiQXR0YWNoZWRcIik7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oSlNPTi5zdHJpbmdpZnkoYXR0YWNoZWQsIHVuZGVmaW5lZCwgXCIgIFwiKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRidG5HZXRHcm91cHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0aWYgKHNlcnZlcikge1xuXHRcdFx0XHRcdGNvbnN0IGdyb3VwcyA9IGF3YWl0IHNlcnZlci5nZXRBbGxHcm91cElkcygpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiR3JvdXAgSWRzXCIpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKEpTT04uc3RyaW5naWZ5KGdyb3VwcywgdW5kZWZpbmVkLCBcIiAgXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRjb25zdCBncm91cElkID0gYXdhaXQgc2VydmVyLmdldEdyb3VwSWRGb3JXaW5kb3coZmluLm1lLmlkZW50aXR5Lm5hbWUpO1xuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBHcm91cCBJZCBGb3IgQ3VycmVudCBXaW5kb3c6ICR7Z3JvdXBJZH1gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGlmIChzZXJ2ZXIpIHtcblx0XHRcdFx0XHRkZWJ1Z1dpbmRvd1Nob3duID0gIWRlYnVnV2luZG93U2hvd247XG5cdFx0XHRcdFx0YXdhaXQgc2VydmVyLnNob3dEZWJ1Z1dpbmRvdyhkZWJ1Z1dpbmRvd1Nob3duKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR1cGRhdGVTZXJ2ZXJTdGF0dXMoKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHNob3J0IGhhc2ggc3RyaW5nIGZyb20gYSBVUkwgdG8gdXNlIGFzIGEgdmVyc2lvbiBpZGVudGlmaWVyLlxuICogQHBhcmFtIHVybCBUaGUgVVJMIHRvIGhhc2guXG4gKiBAcmV0dXJucyBBIGhleCBzdHJpbmcgaGFzaCBvZiB0aGUgVVJMLlxuICovXG5mdW5jdGlvbiBoYXNoVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcblx0bGV0IGhhc2ggPSA1MzgxO1xuXHRjb25zdCBtYXhTYWZlSGFzaCA9IDRfMjk0Xzk2N18yOTE7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdXJsLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgY29kZVBvaW50ID0gdXJsLmNoYXJDb2RlQXQoaSk7XG5cdFx0Y29uc3QgbXVsdGlwbGllZEhhc2ggPSBoYXNoICogMzM7XG5cdFx0aGFzaCA9IChtdWx0aXBsaWVkSGFzaCArIGNvZGVQb2ludCkgJSBtYXhTYWZlSGFzaDtcblx0fVxuXHRjb25zdCBoYXNoSGV4ID0gTWF0aC5mbG9vcihoYXNoKS50b1N0cmluZygxNik7XG5cdHJldHVybiBoYXNoSGV4LnBhZFN0YXJ0KDgsIFwiMFwiKTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBET00gZWxlbWVudHMgd2l0aCB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVNlcnZlclN0YXR1cygpOiB2b2lkIHtcblx0aWYgKFxuXHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdyAmJlxuXHRcdGNoa0N0cmxUb1NuYXAgJiZcblx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcCAmJlxuXHRcdGNoa0Rpc2FibGVHUFVEcmFnZ2luZyAmJlxuXHRcdGNoa0Rpc2FibGVCbHVyRHJvcCAmJlxuXHRcdGJ0blN0YXJ0ICYmXG5cdFx0YnRuU3RvcCAmJlxuXHRcdHNlcnZlclN0YXR1cyAmJlxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRidG5BdHRhY2hUb1dpbmRvdyAmJlxuXHRcdGJ0bkRldGFjaEZyb21XaW5kb3cgJiZcblx0XHRzZWxBdHRhY2hQb3NpdGlvbiAmJlxuXHRcdGJ0bkdldExheW91dCAmJlxuXHRcdGJ0bkdldEF0dGFjaGVkICYmXG5cdFx0YnRuR2V0R3JvdXBzICYmXG5cdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdyAmJlxuXHRcdGJ0blNob3dIaWRlRGVidWdXaW5kb3dcblx0KSB7XG5cdFx0aWYgKHNlcnZlclN0YXRlID09PSBcInN0YXJ0aW5nXCIgfHwgc2VydmVyU3RhdGUgPT09IFwic3RvcHBpbmdcIikge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0N0cmxUb1NuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZVNoaWZ0VG9VbnNuYXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVCbHVyRHJvcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdGFydC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IGBTbmFwIFNlcnZlciBpcyAke3NlcnZlclN0YXRlfWA7XG5cdFx0fSBlbHNlIGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGVkXCIpIHtcblx0XHRcdGNoa1Nob3dEZWJ1Z1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtDdHJsVG9TbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVTaGlmdFRvVW5zbmFwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGNoa0Rpc2FibGVHUFVEcmFnZ2luZy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRjaGtEaXNhYmxlQmx1ckRyb3AuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RhcnQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuU3RvcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0TGF5b3V0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0YnRuR2V0R3JvdXBzLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5HZXRHcm91cHNGb3JDdXJyZW50V2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRzZXJ2ZXJTdGF0dXMudGV4dENvbnRlbnQgPSBcIlNuYXAgU2VydmVyIGlzIHN0YXJ0ZWRcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2hrU2hvd0RlYnVnV2luZG93LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtDdHJsVG9TbmFwLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtEaXNhYmxlU2hpZnRUb1Vuc25hcC5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0Y2hrRGlzYWJsZUdQVURyYWdnaW5nLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRjaGtEaXNhYmxlQmx1ckRyb3AuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdGJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRidG5TdG9wLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bkdldExheW91dC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRBdHRhY2hlZC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5HZXRHcm91cHMuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuR2V0R3JvdXBzRm9yQ3VycmVudFdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5TaG93SGlkZURlYnVnV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdHNlcnZlclN0YXR1cy50ZXh0Q29udGVudCA9IFwiU25hcCBTZXJ2ZXIgaXMgc3RvcHBlZFwiO1xuXHRcdH1cblx0fVxuXHR1cGRhdGVXaW5kb3dTdGF0dXMoKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSB3aW5kb3cgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVdpbmRvd1N0YXR1cygpOiB2b2lkIHtcblx0aWYgKFxuXHRcdGJ0bk5hdGl2ZVRlc3RBcHAgJiZcblx0XHRzZWxBdHRhY2hQb3NpdGlvbiAmJlxuXHRcdGJ0bkF0dGFjaFRvV2luZG93ICYmXG5cdFx0YnRuRGV0YWNoRnJvbVdpbmRvdyAmJlxuXHRcdGJ0bk1pbmltaXplR3JvdXAgJiZcblx0XHRidG5XaW5kb3dUZXN0QXBwXG5cdCkge1xuXHRcdGlmIChzZXJ2ZXJTdGF0ZSA9PT0gXCJzdGFydGluZ1wiIHx8IHNlcnZlclN0YXRlID09PSBcInN0b3BwaW5nXCIpIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuV2luZG93VGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdGJ0bk1pbmltaXplR3JvdXAuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoc2VydmVyU3RhdGUgPT09IFwic3RhcnRlZFwiICYmIGlzV2luZG93T3Blbikge1xuXHRcdFx0YnRuTmF0aXZlVGVzdEFwcC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRzZWxBdHRhY2hQb3NpdGlvbi5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5BdHRhY2hUb1dpbmRvdy5kaXNhYmxlZCA9IGlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5EZXRhY2hGcm9tV2luZG93LmRpc2FibGVkID0gIWlzV2luZG93QXR0YWNoZWQ7XG5cdFx0XHRidG5NaW5pbWl6ZUdyb3VwLmRpc2FibGVkID0gIWlzV2luZG93QXR0YWNoZWQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJ0bk5hdGl2ZVRlc3RBcHAuZGlzYWJsZWQgPSBzZXJ2ZXJTdGF0ZSA9PT0gXCJzdG9wcGVkXCI7XG5cdFx0XHRidG5XaW5kb3dUZXN0QXBwLmRpc2FibGVkID0gc2VydmVyU3RhdGUgPT09IFwic3RvcHBlZFwiO1xuXHRcdFx0c2VsQXR0YWNoUG9zaXRpb24uZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuQXR0YWNoVG9XaW5kb3cuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0YnRuRGV0YWNoRnJvbVdpbmRvdy5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRidG5NaW5pbWl6ZUdyb3VwLmRpc2FibGVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTZW5kIGluZm9ybWF0aW9uIHRvIHRoZSBsb2cgZGlzcGxheS5cbiAqIEBwYXJhbSBpbmZvcm1hdGlvbiBUaGUgaW5mb3JtYXRpb24gdG8gc2VuZC5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mb3JtYXRpb246IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fSR7aW5mb3JtYXRpb259XFxuXFxuYDtcblx0XHRsb2dnaW5nLnNjcm9sbFRvcCA9IGxvZ2dpbmcuc2Nyb2xsSGVpZ2h0O1xuXHR9XG59XG5cbi8qKlxuICogU2VuZCBlcnJvciB0byB0aGUgbG9nIGRpc3BsYXkuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBzZW5kLlxuICovXG5mdW5jdGlvbiBsb2dFcnJvcihlcnI6IHN0cmluZyk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBgJHtsb2dnaW5nLnRleHRDb250ZW50fUVSUk9SOiAke2Vycn1cXG5cXG5gO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gbG9nZ2luZy5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgbG9nIGRpc3BsYXkuXG4gKi9cbmZ1bmN0aW9uIGxvZ0NsZWFyKCk6IHZvaWQge1xuXHRpZiAobG9nZ2luZykge1xuXHRcdGxvZ2dpbmcudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdGxvZ2dpbmcuc2Nyb2xsVG9wID0gMDtcblx0fVxufVxuXG4vKipcbiAqIExhdW5jaCBhbiBhcHBsaWNhdGlvbiB1c2luZyBTbmFwLlxuICogQHBhcmFtIGFwcE5hbWUgVGhlIG5hbWUgb2YgdGhlIGFwcCB0aGF0IGlzIGJlaW5nIGxhdW5jaGVkLlxuICogQHBhcmFtIGNsaWVudElkIEFuIElkIHRvIGFzc29jaWF0ZSB3aXRoIHRoZSBsYXVuY2hlZCBhcHAuXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0aGUgYXBwIHRvIGxhdW5jaC5cbiAqIEBwYXJhbSBhcmdzIEFkZGl0aW9uYWwgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBmb3IgdGhlIGxhdW5jaC5cbiAqIEBwYXJhbSBzdHJhdGVneSBUaGUgc3RyYXRlZ3kgdG8gbGF1bmNoIHRoZSB3aW5kb3cgd2l0aC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbGF1bmNoQXBwKFxuXHRhcHBOYW1lOiBzdHJpbmcsXG5cdGNsaWVudElkOiBzdHJpbmcsXG5cdHBhdGg6IHN0cmluZyxcblx0YXJnczogc3RyaW5nW10sXG5cdHN0cmF0ZWd5OiBTbmFwLkxhdW5jaFN0cmF0ZWd5XG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRpZiAoc2VydmVyKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgTGF1bmNoaW5nICR7YXBwTmFtZX1gKTtcblx0XHRcdGNvbnN0IGxhdW5jaFJlc3VsdCA9IGF3YWl0IHNlcnZlci5sYXVuY2goe1xuXHRcdFx0XHRwYXRoLFxuXHRcdFx0XHRjbGllbnRJZCxcblx0XHRcdFx0YXJncyxcblx0XHRcdFx0c3RyYXRlZ3lcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAobGF1bmNoUmVzdWx0Py5wcm9jZXNzX2lkKSB7XG5cdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGAke2FwcE5hbWV9IGxhdW5jaGVkIHdpdGggcHJvY2VzcyBpZCAke2xhdW5jaFJlc3VsdC5wcm9jZXNzX2lkfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0bG9nRXJyb3IoZm9ybWF0RXJyb3IoZXJyKSk7XG5cdH1cbn1cblxuLyoqXG4gKiBMYXVuY2hlcyBhIHdpbmRvdyB0aGF0IGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBjaGlsZCB3aW5kb3dzLlxuICovXG5hc3luYyBmdW5jdGlvbiBsYXVuY2hXaW5kb3dPcHRpb25zQXBwKCk6IFByb21pc2U8dm9pZD4ge1xuXHRpZiAoc2VydmVyU3RhdGUgIT09IFwic3RhcnRlZFwiKSB7XG5cdFx0bG9nRXJyb3IoXCJTbmFwIHNlcnZlciBpcyBub3Qgc3RhcnRlZFwiKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3Qgd2luZG93T3B0aW9uc05hbWUgPSBcIndpbmRvdy1vcHRpb25zLWFwcFwiO1xuXHRjb25zdCBvcHRpb25zV2luZG93ID0gZmluLldpbmRvdy53cmFwU3luYyh7IHV1aWQ6IGZpbi5tZS5pZGVudGl0eS51dWlkLCBuYW1lOiB3aW5kb3dPcHRpb25zTmFtZSB9KTtcblxuXHR0cnkge1xuXHRcdGF3YWl0IG9wdGlvbnNXaW5kb3cuZ2V0SW5mbygpO1xuXHRcdGF3YWl0IG9wdGlvbnNXaW5kb3cuYnJpbmdUb0Zyb250KCk7XG5cdH0gY2F0Y2gge1xuXHRcdC8vIHdpbmRvdyBkb2VzIG5vdCBleGlzdCwgc28gY3JlYXRlIGl0XG5cdFx0YXdhaXQgZmluLldpbmRvdy5jcmVhdGUoe1xuXHRcdFx0bmFtZTogd2luZG93T3B0aW9uc05hbWUsXG5cdFx0XHRhdXRvU2hvdzogdHJ1ZSxcblx0XHRcdGRlZmF1bHRIZWlnaHQ6IDYwMCxcblx0XHRcdGRlZmF1bHRXaWR0aDogODAwLFxuXHRcdFx0dXJsOiBcImh0dHBzOi8vYnVpbHQtb24tb3BlbmZpbi5naXRodWIuaW8vY29udGFpbmVyLXN0YXJ0ZXIvbWFpbi91c2Utd2luZG93LW9wdGlvbnMvaHRtbC9hcHAuaHRtbFwiXG5cdFx0fSk7XG5cdH1cbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhlIHNuYXAgYXBwIGFzc2V0IGZyb20gdGhlIHByb3ZpZGVkIHByaW1hcnkgYW5kIGZhbGxiYWNrIFVSTHMgdG8gZW5zdXJlIGl0IGlzIGF2YWlsYWJsZSBiZWZvcmUgc3RhcnRpbmcgdGhlIFNuYXAgc2VydmVyLlxuICogQHBhcmFtIHByaW1hcnlVcmwgVGhlIHByaW1hcnkgVVJMIHRvIHZhbGlkYXRlIHRoZSBzbmFwIGFwcCBhc3NldCBmcm9tLlxuICogQHBhcmFtIGZhbGxiYWNrVXJsIEFuIG9wdGlvbmFsIGZhbGxiYWNrIFVSTCB0byB2YWxpZGF0ZSB0aGUgc25hcCBhcHAgYXNzZXQgZnJvbSBpZiB0aGUgcHJpbWFyeSBVUkwgZmFpbHMuXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB2YWxpZGF0aW9uIHdhcyBzdWNjZXNzZnVsLCB0aGUgdmFsaWRhdGVkIFVSTCBpZiBzdWNjZXNzZnVsLCBhbmQgd2hldGhlciB0aGUgZmFsbGJhY2sgVVJMIHdhcyB1c2VkLlxuICovXG5hc3luYyBmdW5jdGlvbiB2YWxpZGF0ZUFwcEFzc2V0U291cmNlKFxuXHRwcmltYXJ5VXJsOiBzdHJpbmcsXG5cdGZhbGxiYWNrVXJsPzogc3RyaW5nXG4pOiBQcm9taXNlPHsgc3VjY2VzczogYm9vbGVhbjsgdmFsaWRhdGVkVXJsPzogc3RyaW5nOyBpc0ZhbGxiYWNrVXJsPzogYm9vbGVhbiB9PiB7XG5cdGNvbnN0IHNuYXBBc3NldEluZm86IE9wZW5GaW4uQXBwQXNzZXRJbmZvID0ge1xuXHRcdGFsaWFzOiBzbmFwQWxpYXMsXG5cdFx0c3JjOiBzbmFwRGVmYXVsdFVybCxcblx0XHR2ZXJzaW9uOiBzbmFwVmVyc2lvbixcblx0XHR0YXJnZXQ6IHNuYXBUYXJnZXQsXG5cdFx0bWFuZGF0b3J5OiBmYWxzZVxuXHR9O1xuXHQvLyBiZWZvcmUgdHJ5aW5nIGN1c3RvbSB1cmxzIGNoZWNrIHRvIHNlZSBpZiB5b3UgYWxyZWFkeSBoYXZlIHNuYXBcblx0Y29uc3Qgc25hcERvd25sb2FkZWRBc3NldEluZm86IE9wZW5GaW4uQXBwQXNzZXRJbmZvIHwgdW5kZWZpbmVkID0gYXdhaXQgZG9lc0FwcEFzc2V0RXhpc3QoXG5cdFx0c25hcEFzc2V0SW5mby5hbGlhcyxcblx0XHRzbmFwQXNzZXRJbmZvLnZlcnNpb25cblx0KTtcblxuXHRpZiAoc25hcERvd25sb2FkZWRBc3NldEluZm8pIHtcblx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdGBXZSBoYXZlIGEgc25hcCBhc3NldCB0aGF0IG1hdGNoZXMgdGhlIGFsaWFzIGFuZCB2ZXJzaW9uLiBJdCBoYXMgdGhlIGZvbGxvd2luZyBkZXRhaWxzOiBhbGlhczogJHtzbmFwRG93bmxvYWRlZEFzc2V0SW5mby5hbGlhc30sIHZlcnNpb246ICR7c25hcERvd25sb2FkZWRBc3NldEluZm8udmVyc2lvbn0sIHNyYzogJHtzbmFwRG93bmxvYWRlZEFzc2V0SW5mby5zcmN9YFxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHR2YWxpZGF0ZWRVcmw6IHNuYXBEb3dubG9hZGVkQXNzZXRJbmZvLnNyYyxcblx0XHRcdGlzRmFsbGJhY2tVcmw6IHNuYXBEb3dubG9hZGVkQXNzZXRJbmZvLnNyYyA9PT0gZmFsbGJhY2tVcmxcblx0XHR9O1xuXHR9XG5cblx0Ly8gU05BUCBkb3dubG9hZHMgYSBzcGVjaWZpYyBhbGlhcyArIHZlcnNpb24gY29tYmluYXRpb24uXG5cdC8vIFRoZSBydW50aW1lIGRvZXMgbm90IGFsbG93IGEgcmV0cnkgb2YgdGhlIHNhbWUgYXBwIGFzc2V0IGlmIHRoZSBvbmx5IHRoaW5nIHRoYXQgaGFzIGNoYW5nZWQgaXMgdGhlIHVybC5cblx0Ly8gU2luY2Ugd2UgaGF2ZSBubyBzbmFwIHZlcnNpb24gd2Ugd2FudCB0byB2YWxpZGF0ZSBvdXIgcHJpbWFyeSB1cmwuXG5cdGxvZ0luZm9ybWF0aW9uKGBWYWxpZGF0aW5nIHRoZSBwcmltYXJ5IGFzc2V0IHVybCBmb3IgdGhlIHNuYXAgYXNzZXQ6ICR7cHJpbWFyeVVybH1gKTtcblx0c25hcEFzc2V0SW5mby5hbGlhcyA9IGAke3NuYXBBbGlhc30tdmFsaWRhdGUtZG93bmxvYWRgOyAvLyB1c2UgYSBkaWZmZXJlbnQgYWxpYXMgZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkIHNvIHRoYXQgd2UgY2FuIGhhdmUgZGlmZmVyZW50IHZlcnNpb25zIGlmIG5lZWRlZCB3aXRob3V0IGNvbmZsaWN0IHdpdGggdGhlIGFjdHVhbCBzbmFwIGFzc2V0IGFsaWFzXG5cblx0c25hcEFzc2V0SW5mby50YXJnZXQgPSBcIk5vT3BcIjsgLy8gV2UgZG9uJ3Qgd2FudCB0byBhY3R1YWxseSBydW4gdGhlIHNuYXAgYXNzZXQgZHVyaW5nIHZhbGlkYXRpb24gc2luY2Ugd2UganVzdCB3YW50IHRvIGNoZWNrIGlmIHRoZSB1cmwgaXMgdmFsaWQgYW5kIHRoZSBhc3NldCBjYW4gYmUgZG93bmxvYWRlZCwgc28gdXNlIGEgTm9PcCB0YXJnZXQgdGhhdCB3aWxsIG5vdCBkbyBhbnl0aGluZyBpZiBpdCBpcyBydW4gZm9yIGFueSByZWFzb24gZHVyaW5nIHRoZSB2YWxpZGF0aW9uIHByb2Nlc3NcblxuXHQvLyBVcGRhdGUgYXNzZXQgaW5mbyB0byB0YXJnZXQgcHJpbWFyeSB1cmxcblx0c25hcEFzc2V0SW5mby5zcmMgPSBwcmltYXJ5VXJsOyAvLyB1cGRhdGUgdGhlIHNyYyB0byB0aGUgcHJpbWFyeSB1cmwgZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkXG5cdHNuYXBBc3NldEluZm8udmVyc2lvbiA9IGhhc2hVcmwocHJpbWFyeVVybCk7IC8vIHVzZSB0aGUgdXJsIGhhc2ggYXMgdGhlIHZlcnNpb24gZm9yIHRoZSB2YWxpZGF0aW9uIGRvd25sb2FkIHNvIHRoYXQgaWYgdGhlIHVybCBjaGFuZ2VzIHdlIHdpbGwgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiwgYnV0IGlmIHRoZSB1cmwgaXMgdGhlIHNhbWUgd2Ugd2lsbCBub3QgYXR0ZW1wdCB0byBkb3dubG9hZCBhZ2FpbiBzaW5jZSB3ZSBoYXZlIGFscmVhZHkgdmFsaWRhdGVkIGl0XG5cblx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXRQcmltYXJ5VXJsID0gYXdhaXQgZmV0Y2hBcHBBc3NldChzbmFwQXNzZXRJbmZvKTtcblx0bGV0IHZhbGlkYXRlZEFzc2V0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0aWYgKHZhbGlkYXRlZEFwcEFzc2V0UHJpbWFyeVVybCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGZhbGxiYWNrVXJsKSB7XG5cdFx0XHQvLyB2YWxpZGF0ZSBmYWxsYmFjayB1cmxcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBWYWxpZGF0aW5nIHRoZSBmYWxsYmFjayBhc3NldCB1cmwgZm9yIHRoZSBzbmFwIGFzc2V0OiAke2ZhbGxiYWNrVXJsfWApO1xuXHRcdFx0c25hcEFzc2V0SW5mby5zcmMgPSBmYWxsYmFja1VybDsgLy8gdXBkYXRlIHRoZSBzcmMgdG8gdGhlIGZhbGxiYWNrIHVybCBmb3IgdGhlIHZhbGlkYXRpb24gZG93bmxvYWRcblx0XHRcdHNuYXBBc3NldEluZm8udmVyc2lvbiA9IGhhc2hVcmwoZmFsbGJhY2tVcmwpOyAvLyB1c2UgdGhlIHVybCBoYXNoIGFzIHRoZSB2ZXJzaW9uIGZvciB0aGUgdmFsaWRhdGlvbiBkb3dubG9hZCBzbyB0aGF0IGlmIHRoZSB1cmwgY2hhbmdlcyB3ZSB3aWxsIGF0dGVtcHQgdG8gZG93bmxvYWQgYWdhaW4sIGJ1dCBpZiB0aGUgdXJsIGlzIHRoZSBzYW1lIHdlIHdpbGwgbm90IGF0dGVtcHQgdG8gZG93bmxvYWQgYWdhaW4gc2luY2Ugd2UgaGF2ZSBhbHJlYWR5IHZhbGlkYXRlZCBpdFxuXHRcdFx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXRGYWxsYmFja1VybCA9IGF3YWl0IGZldGNoQXBwQXNzZXQoc25hcEFzc2V0SW5mbyk7XG5cblx0XHRcdGlmICh2YWxpZGF0ZWRBcHBBc3NldEZhbGxiYWNrVXJsKSB7XG5cdFx0XHRcdHZhbGlkYXRlZEFzc2V0VXJsID0gZmFsbGJhY2tVcmw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHZhbGlkYXRlZEFzc2V0VXJsID0gcHJpbWFyeVVybDtcblx0fVxuXG5cdGlmICh2YWxpZGF0ZWRBc3NldFVybCkge1xuXHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0YFN1Y2Nlc3NmdWxseSB2YWxpZGF0ZWQgdGhlIHVybCBmb3IgdGhlIHNuYXAgYXNzZXQ6ICR7dmFsaWRhdGVkQXNzZXRVcmx9LiBUaGlzIHVybCB3aWxsIGJlIHBhc3NlZCB0byBTbmFwIE9wdGlvbnMgdGhyb3VnaCB0aGUgY3VzdG9tU25hcEFzc2V0U291cmNlIHNldHRpbmcuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHR2YWxpZGF0ZWRVcmw6IHZhbGlkYXRlZEFzc2V0VXJsLFxuXHRcdFx0aXNGYWxsYmFja1VybDogdmFsaWRhdGVkQXNzZXRVcmwgPT09IGZhbGxiYWNrVXJsXG5cdFx0fTtcblx0fVxuXHRyZXR1cm4geyBzdWNjZXNzOiBmYWxzZSB9O1xufVxuXG4vKipcbiAqIERvd25sb2FkIGFuZCByZXR1cm4gYXBwIGFzc2V0IGluZm8gZm9yIHRoZSBwcm92aWRlZCBhcHAgYXNzZXQgZGVmaW5pdGlvbi5cbiAqIEBwYXJhbSBhcHBBc3NldEluZm8gVGhlIGFwcCBhc3NldCBkZWZpbml0aW9uIHRvIGRvd25sb2FkLlxuICogQHJldHVybnMgVGhlIGFwcCBhc3NldCBpbmZvIGlmIGRvd25sb2FkZWQgb3IgZm91bmQsIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQXBwQXNzZXQoYXBwQXNzZXRJbmZvOiBPcGVuRmluLkFwcEFzc2V0SW5mbyk6IFByb21pc2U8T3BlbkZpbi5BcHBBc3NldEluZm8gfCB1bmRlZmluZWQ+IHtcblx0Y29uc3QgdmFsaWRhdGVkQXBwQXNzZXQgPSBhd2FpdCBkb3dubG9hZEFwcEFzc2V0KGFwcEFzc2V0SW5mbywge1xuXHRcdGxvZ2dlcjogY3VzdG9tTG9nZ2VyLFxuXHRcdGFzc2V0RG93bmxvYWRQcm9ncmVzczogKHByb2dyZXNzOiBudW1iZXIsIHNyYzogc3RyaW5nLCBhbGlhczogc3RyaW5nKSA9PiB7XG5cdFx0XHQvLyBzaG93aW5nIGEgZGlmZmVyZW5jZSBhcyB0aGUgZG93bmxvYWQgQXBwIEFzc2V0IGFsc28gbG9ncyB0aGUgZG93bmxvYWQgcHJvZ3Jlc3MgdXNpbmcgbG9nSW5mb3JtYXRpb24gYW5kIGxvZ0Vycm9yIHRocm91Z2ggdGhlIGN1c3RvbSBsb2dnZXIuXG5cdFx0XHRjb25zb2xlLmxvZyhgRG93bmxvYWQgcHJvZ3Jlc3MgZm9yIGFsaWFzICcke2FsaWFzfScgZnJvbSAnJHtzcmN9JzogJHtwcm9ncmVzc30lYCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHZhbGlkYXRlZEFwcEFzc2V0O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9