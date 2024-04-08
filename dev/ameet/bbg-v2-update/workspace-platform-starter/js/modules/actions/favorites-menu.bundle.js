/******/ var __webpack_modules__ = ({

/***/ "./client/src/framework/shapes/actions-shapes.ts":
/*!*******************************************************!*\
  !*** ./client/src/framework/shapes/actions-shapes.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomActionCallerType: () => (/* binding */ CustomActionCallerType)
/* harmony export */ });
/**
 * Use this in preference to CustomActionCallerType from workspace-platform to avoid the import of the whole of workspace package in modules.
 */
var CustomActionCallerType;
(function (CustomActionCallerType) {
    CustomActionCallerType["CustomButton"] = "CustomButton";
    CustomActionCallerType["StoreCustomButton"] = "StoreCustomButton";
    CustomActionCallerType["CustomDropdownItem"] = "CustomDropdownItem";
    CustomActionCallerType["GlobalContextMenu"] = "GlobalContextMenu";
    CustomActionCallerType["ViewTabContextMenu"] = "ViewTabContextMenu";
    CustomActionCallerType["PageTabContextMenu"] = "PageTabContextMenu";
    CustomActionCallerType["SaveButtonContextMenu"] = "SaveButtonContextMenu";
    CustomActionCallerType["API"] = "API";
})(CustomActionCallerType || (CustomActionCallerType = {}));


/***/ }),

/***/ "./client/src/framework/shapes/favorite-shapes.ts":
/*!********************************************************!*\
  !*** ./client/src/framework/shapes/favorite-shapes.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FAVORITE_TYPE_NAME_APP: () => (/* binding */ FAVORITE_TYPE_NAME_APP),
/* harmony export */   FAVORITE_TYPE_NAME_PAGE: () => (/* binding */ FAVORITE_TYPE_NAME_PAGE),
/* harmony export */   FAVORITE_TYPE_NAME_QUERY: () => (/* binding */ FAVORITE_TYPE_NAME_QUERY),
/* harmony export */   FAVORITE_TYPE_NAME_WORKSPACE: () => (/* binding */ FAVORITE_TYPE_NAME_WORKSPACE)
/* harmony export */ });
/**
 * Favorite type for App.
 */
const FAVORITE_TYPE_NAME_APP = "app";
/**
 * Favorite type for Workspace.
 */
const FAVORITE_TYPE_NAME_WORKSPACE = "workspace";
/**
 * Favorite type for Page.
 */
const FAVORITE_TYPE_NAME_PAGE = "page";
/**
 * Favorite type for Query.
 */
const FAVORITE_TYPE_NAME_QUERY = "query";


/***/ }),

/***/ "./client/src/framework/utils-position.ts":
/*!************************************************!*\
  !*** ./client/src/framework/utils-position.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   centerContentInIdentity: () => (/* binding */ centerContentInIdentity),
/* harmony export */   centerContentInRect: () => (/* binding */ centerContentInRect),
/* harmony export */   findMonitorContainingPoint: () => (/* binding */ findMonitorContainingPoint),
/* harmony export */   getAllVisibleWindows: () => (/* binding */ getAllVisibleWindows),
/* harmony export */   getBoundsCenter: () => (/* binding */ getBoundsCenter),
/* harmony export */   getIdentityBounds: () => (/* binding */ getIdentityBounds),
/* harmony export */   getWindowPositionOptions: () => (/* binding */ getWindowPositionOptions),
/* harmony export */   getWindowPositionUsingStrategy: () => (/* binding */ getWindowPositionUsingStrategy),
/* harmony export */   pointInRect: () => (/* binding */ pointInRect)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./client/src/framework/utils.ts");

/**
 * Provides x and y co-ordinates to position a window of a given size in relation to another window/view.
 * @param clientIdentity The identity of the view/window these x/y co-ordinates should be in relation to.
 * @param dimensions The dimensions of the window that will be placed in the center of the screen.
 * @param dimensions.width The width of the window that is going to be placed.
 * @param dimensions.height The height of the window that is going to be placed.
 * @returns The x, y co-ordinates to position the window
 */
async function centerContentInIdentity(clientIdentity, dimensions) {
    const bounds = await getIdentityBounds(clientIdentity);
    const boundsCenter = getBoundsCenter(bounds);
    const monitorInfo = await findMonitorContainingPoint(boundsCenter);
    return centerContentInRect(monitorInfo.availableRect, dimensions);
}
/**
 * Provides x and y co-ordinates to position content of a given size in relation to a rect.
 * @param availableRect The available rect to position the content in.
 * @param availableRect.left The available rect left to position the content in.
 * @param availableRect.top The available rect top to position the content in.
 * @param availableRect.right The available rect right to position the content in.
 * @param availableRect.bottom The available rect bottom to position the content in.
 * @param contentDimensions The dimensions of the content that will be placed in the center of the screen.
 * @param contentDimensions.width The width of the content that is going to be placed.
 * @param contentDimensions.height The height of the content that is going to be placed.
 * @returns The x, y co-ordinates to position the content
 */
function centerContentInRect(availableRect, contentDimensions) {
    const height = availableRect.bottom - availableRect.top;
    const width = availableRect.right - availableRect.left;
    const dividedRectWidth = width / 2;
    const dividedRectHeight = height / 2;
    const dividedDimensionWidth = contentDimensions.width / 2;
    const dividedDimensionHeight = contentDimensions.height / 2;
    const x = availableRect.left + dividedRectWidth - dividedDimensionWidth;
    const y = availableRect.top + dividedRectHeight - dividedDimensionHeight;
    return { x: Math.round(x), y: Math.round(y) };
}
/**
 * Returns the monitor details for the monitor a view/window is placed on.
 * @param clientIdentity The identity of the view/window to check against.
 * @returns The monitor the view/window lives on or undefined if no match was found.
 */
async function getIdentityBounds(clientIdentity) {
    let bounds;
    let currentWindow;
    try {
        const targetView = fin.View.wrapSync(clientIdentity);
        currentWindow = await targetView.getCurrentWindow();
    }
    catch {
        // we were not passed a view.
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
        try {
            const targetWindow = currentWindow ?? fin.Window.wrapSync(clientIdentity);
            bounds = await targetWindow.getBounds();
        }
        catch {
            // it wasn't a window
        }
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
        try {
            bounds = await fin.me.getBounds();
        }
        catch {
            // unable to get own bounds
        }
    }
    return bounds;
}
/**
 * Find the monitor which contains the point and returns it.
 * @param point The point coord to locate.
 * @param point.x The x coord
 * @param point.y The y coord
 * @returns The monitor containing the point.
 */
async function findMonitorContainingPoint(point) {
    const monitorInfo = await fin.System.getMonitorInfo();
    const x = point.x;
    const y = point.y;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(x) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(y)) {
        for (const monitor of monitorInfo.nonPrimaryMonitors) {
            if (pointInRect({ x, y }, monitor.monitorRect)) {
                return monitor;
            }
        }
    }
    return monitorInfo.primaryMonitor;
}
/**
 * Is the point in the rectangle.
 * @param point The coord to match.
 * @param point.x The x coord.
 * @param point.y The y coord.
 * @param rect The rect.
 * @param rect.top The rect top.
 * @param rect.left The rect left.
 * @param rect.bottom The rect bottom.
 * @param rect.right The rect right.
 * @returns True if the point is in the rect.
 */
function pointInRect(point, rect) {
    return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}
/**
 * Get the center for a bounding rectangle.
 * @param bounds The rect
 * @param bounds.top The rect top
 * @param bounds.left The rect left
 * @param bounds.width The rect width
 * @param bounds.height The rect height
 * @returns the x and y of the bounds center or an object not containing x or y.
 */
function getBoundsCenter(bounds) {
    let boundsCenterX;
    let boundsCenterY;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
        const halfWidth = bounds.width / 2;
        const halfHeight = bounds.height / 2;
        boundsCenterX = bounds.left + halfWidth;
        boundsCenterY = bounds.top + halfHeight;
        return { x: Math.round(boundsCenterX), y: Math.round(boundsCenterY) };
    }
    return {};
}
/**
 * Given browser settings what window positioning options should be used?
 * @param settings The browser settings that have been provided.
 * @returns a set of window positioning options.
 */
async function getWindowPositionOptions(settings) {
    const windowPositioningOptions = {};
    windowPositioningOptions.defaults = {};
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings)) {
        windowPositioningOptions.windowPositioningStrategy = settings.windowPositioningStrategy;
        windowPositioningOptions.disableWindowPositioningStrategy = settings.disableWindowPositioningStrategy;
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings?.defaultWindowOptions?.defaultLeft)) {
            windowPositioningOptions.defaults.left = settings.defaultWindowOptions.defaultLeft;
        }
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings?.defaultWindowOptions?.defaultTop)) {
            windowPositioningOptions.defaults.top = settings.defaultWindowOptions.defaultTop;
        }
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(windowPositioningOptions.defaults.left) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(windowPositioningOptions.defaults.top)) {
        const app = await fin.Application.getCurrent();
        const platformManifest = await app.getManifest();
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(platformManifest?.platform?.defaultWindowOptions?.defaultLeft)) {
            windowPositioningOptions.defaults.left = platformManifest.platform.defaultWindowOptions.defaultLeft;
        }
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(platformManifest?.platform?.defaultWindowOptions?.defaultTop)) {
            windowPositioningOptions.defaults.top = platformManifest.platform.defaultWindowOptions.defaultTop;
        }
    }
    return windowPositioningOptions;
}
/**
 * Get the window position using a strategy.
 * @param windowPositioningOptions The options for window positioning.
 * @param windowPositioningOptions.windowPositioningStrategy The strategy for window positioning.
 * @param windowPositioningOptions.windowPositioningStrategy.x The x coordinate.
 * @param windowPositioningOptions.windowPositioningStrategy.y The y coordinate.
 * @param windowPositioningOptions.disableWindowPositioningStrategy Whether to disable the window positioning strategy.
 * @param relatedTo The related monitor or identity or x/y position.
 * @returns The x and y coordinates of the window position.
 */
async function getWindowPositionUsingStrategy(windowPositioningOptions, relatedTo) {
    if (windowPositioningOptions?.disableWindowPositioningStrategy === true) {
        return;
    }
    let targetMonitor;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedTo)) {
        const monitors = await fin.System.getMonitorInfo();
        targetMonitor = monitors.primaryMonitor;
    }
    else if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedTo) && "monitorRect" in relatedTo) {
        targetMonitor = relatedTo;
    }
    else if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedTo) && "x" in relatedTo) {
        targetMonitor = await findMonitorContainingPoint(relatedTo);
    }
    else {
        const bounds = await getIdentityBounds(relatedTo);
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
            const monitors = await fin.System.getMonitorInfo();
            targetMonitor = monitors.primaryMonitor;
        }
        else {
            targetMonitor = await findMonitorContainingPoint({ x: bounds.left, y: bounds.top });
        }
    }
    const windowDefaultLeft = windowPositioningOptions?.defaults?.left ?? 0;
    const windowDefaultTop = windowPositioningOptions?.defaults?.top ?? 0;
    // Get the available rect for the display so we can take in to account
    // OS menus, task bar etc
    const availableLeft = targetMonitor.availableRect.left;
    const availableTop = targetMonitor.availableRect.top;
    const windowOffsetsX = windowPositioningOptions?.windowPositioningStrategy?.x ?? 30;
    const windowOffsetsY = windowPositioningOptions?.windowPositioningStrategy?.y ?? 30;
    const windowOffsetsMaxIncrements = windowPositioningOptions?.windowPositioningStrategy?.maxIncrements ?? 8;
    const visibleWindows = await getAllVisibleWindows();
    // Get the top left bounds for all the visible windows
    const topLeftBounds = await Promise.all(visibleWindows.map(async (win) => {
        try {
            const bounds = await win.getBounds();
            return {
                left: bounds.left,
                top: bounds.top,
                right: bounds.left + windowOffsetsX,
                bottom: bounds.top + windowOffsetsY
            };
        }
        catch {
            // return a dummy entry.
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
        }
    }));
    let minCountVal = 1000;
    let minCountIndex = windowOffsetsMaxIncrements;
    // Now see how many windows appear in each increment slot
    for (let i = 0; i < windowOffsetsMaxIncrements; i++) {
        const xPos = i * windowOffsetsX;
        const yPos = i * windowOffsetsY;
        const leftPos = windowDefaultLeft + xPos;
        const topPos = windowDefaultTop + yPos;
        const foundWins = topLeftBounds.filter((topLeftWinBounds) => topLeftWinBounds.left >= leftPos + availableLeft &&
            topLeftWinBounds.right <= leftPos + windowOffsetsX + availableLeft &&
            topLeftWinBounds.top >= topPos + availableTop &&
            topLeftWinBounds.bottom <= topPos + windowOffsetsY + availableTop);
        // If this slot has less than the current minimum use this slot
        if (foundWins.length < minCountVal) {
            minCountVal = foundWins.length;
            minCountIndex = i;
        }
    }
    const xOffset = minCountIndex * windowOffsetsX;
    const x = windowDefaultLeft + xOffset + availableLeft;
    const yOffset = minCountIndex * windowOffsetsY;
    const y = windowDefaultTop + yOffset + availableTop;
    return { left: x, top: y };
}
/**
 * Get a list of all the visible windows in the platform.
 * @returns The list of visible windows.
 */
async function getAllVisibleWindows() {
    const platform = fin.Platform.getCurrentSync();
    const windows = await platform.Application.getChildWindows();
    const availableWindows = [];
    for (const currentWindow of windows) {
        try {
            const isShowing = await currentWindow.isShowing();
            if (isShowing) {
                availableWindows.push(currentWindow);
            }
        }
        catch {
            // if the window is destroyed before determining if it is showing then
            // we should move to the next window but not throw.
        }
    }
    return availableWindows;
}


/***/ }),

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   getCommandLineArgs: () => (/* binding */ getCommandLineArgs),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isNumberValue: () => (/* binding */ isNumberValue),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID),
/* harmony export */   sanitizeString: () => (/* binding */ sanitizeString)
/* harmony export */ });
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
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "string";
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
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumber(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a number with a real value i.e. not NaN or Infinite.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumberValue(value) {
    return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "boolean";
}
/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
function isInteger(value) {
    return isNumber(value) && Number.isInteger(value);
}
/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
function objectClone(obj) {
    // eslint-disable-next-line no-restricted-syntax
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
/**
 * Do a deep comparison of the objects.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param matchPropertyOrder If true the properties must be in the same order.
 * @returns True if the objects are the same.
 */
function deepEqual(obj1, obj2, matchPropertyOrder = true) {
    if (isObject(obj1) && isObject(obj2)) {
        const objKeys1 = Object.keys(obj1);
        const objKeys2 = Object.keys(obj2);
        if (objKeys1.length !== objKeys2.length) {
            return false;
        }
        if (matchPropertyOrder && JSON.stringify(objKeys1) !== JSON.stringify(objKeys2)) {
            return false;
        }
        for (const key of objKeys1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value1 = obj1[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value2 = obj2[key];
            if (!deepEqual(value1, value2, matchPropertyOrder)) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i], matchPropertyOrder)) {
                return false;
            }
        }
    }
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * Deep merge two objects.
 * @param target The object to be merged into.
 * @param sources The objects to merge into the target.
 * @returns The merged object.
 */
function deepMerge(target, ...sources) {
    if (!Array.isArray(sources) || sources.length === 0) {
        return target;
    }
    const targetAsMap = target;
    const source = sources.shift();
    let keys;
    if (isObject(targetAsMap) && isObject(source)) {
        keys = Object.keys(source);
    }
    else if (Array.isArray(source)) {
        if (!Array.isArray(target)) {
            return source;
        }
        keys = Object.keys(source).map((k) => Number.parseInt(k, 10));
    }
    if (keys) {
        const sourceAsMap = source;
        for (const key of keys) {
            const value = sourceAsMap[key];
            if (isObject(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = {};
                }
                deepMerge(targetAsMap[key], value);
            }
            else if (Array.isArray(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = [];
                }
                deepMerge(targetAsMap[key], value);
            }
            else {
                targetAsMap[key] = value;
            }
        }
    }
    return deepMerge(target, ...sources);
}
/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
    if ("randomUUID" in globalThis.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return globalThis.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    /**
     * Get random hex value.
     * @param c The number to base the random value on.
     * @returns The random value.
     */
    function getRandomHex(c) {
        // eslint-disable-next-line no-bitwise
        const rnd = globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
        return (
        // eslint-disable-next-line no-bitwise
        (Number(c) ^ rnd).toString(16));
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
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
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isStringValue(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return "";
}
/**
 * Get the command line arguments from a command line string.
 * Examples of command line strings: arg1 key1=value1 key2="value with spaces" key3='value3' key4='value with more spaces'`.
 * @param commandLine The command line string.
 * @returns The command line arguments or an empty array if none
 */
function getCommandLineArgs(commandLine) {
    if (!isStringValue(commandLine)) {
        return [];
    }
    const matches = commandLine.match(/(\w+=)?("[^"]*"|'[^']*'|[^ ]+)/g);
    if (isEmpty(matches)) {
        return [];
    }
    return matches;
}


/***/ }),

/***/ "./client/src/modules/actions/favorites-menu/actions.ts":
/*!**************************************************************!*\
  !*** ./client/src/modules/actions/favorites-menu/actions.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FavoritesMenuProvider: () => (/* binding */ FavoritesMenuProvider)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/shapes/actions-shapes */ "./client/src/framework/shapes/actions-shapes.ts");
/* harmony import */ var workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/shapes/favorite-shapes */ "./client/src/framework/shapes/favorite-shapes.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workspace-platform-starter/utils-position */ "./client/src/framework/utils-position.ts");




/**
 * Implementation for the favorites menu actions provider.
 */
class FavoritesMenuProvider {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._logger = loggerCreator("FavoritesMenuProvider");
        this._helpers = helpers;
        this._settings = definition.data;
        this._logger.info("Initializing");
    }
    /**
     * Get the actions from the module.
     * @param platform The platform module.
     * @returns The map of custom actions.
     */
    async get(platform) {
        const actionMap = {};
        actionMap["favorites-menu"] = async (payload) => {
            if (payload.callerType === workspace_platform_starter_shapes_actions_shapes__WEBPACK_IMPORTED_MODULE_0__.CustomActionCallerType.CustomButton && this._helpers) {
                const getClient = this._helpers?.getFavoriteClient;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(getClient)) {
                    const client = await getClient();
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(client)) {
                        const favInfo = client.getInfo();
                        const menuEntries = [];
                        if (favInfo.enabledTypes) {
                            let hadEntries = false;
                            for (const type of favInfo.enabledTypes) {
                                const saved = await client.getSavedFavorites(type);
                                if (saved && saved.length > 0) {
                                    if (hadEntries) {
                                        menuEntries.push({ type: "separator" });
                                    }
                                    saved.sort((f1, f2) => (f1.label ?? "").localeCompare(f2.label ?? ""));
                                    for (const entry of saved) {
                                        menuEntries.push({
                                            label: entry.label ?? "",
                                            icon: entry.icon,
                                            data: entry
                                        });
                                    }
                                    hadEntries = true;
                                }
                            }
                        }
                        const menuClient = await this._helpers.getMenuClient();
                        const popupMenuStyle = this._settings?.popupMenuStyle ?? menuClient.getPopupMenuStyle();
                        const result = await menuClient.showPopupMenu({ x: payload.x, y: 48 }, payload.windowIdentity, "There are no favorites", menuEntries, {
                            popupMenuStyle
                        });
                        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(result)) {
                            this._logger?.info("Favorites Menu Dismissed");
                        }
                        else {
                            this._logger?.info("Favorites Menu Item Selected", result);
                            if (result.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__.FAVORITE_TYPE_NAME_APP) {
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this._helpers?.launchApp)) {
                                    let launchPreference;
                                    const bounds = await (0,workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_3__.getWindowPositionUsingStrategy)(undefined, // go with defaults
                                    payload.windowIdentity);
                                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(bounds)) {
                                        launchPreference = { bounds };
                                    }
                                    await this._helpers?.launchApp(result.typeId, launchPreference);
                                }
                            }
                            else if (result.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__.FAVORITE_TYPE_NAME_PAGE) {
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this._helpers?.launchPage)) {
                                    await this._helpers?.launchPage(result.typeId, undefined, this._logger);
                                }
                            }
                            else if (result.type === workspace_platform_starter_shapes_favorite_shapes__WEBPACK_IMPORTED_MODULE_1__.FAVORITE_TYPE_NAME_WORKSPACE) {
                                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(this._helpers?.launchWorkspace)) {
                                    await this._helpers?.launchWorkspace(result.typeId);
                                }
                            }
                            else {
                                this._logger?.info(`Favorites Type ${result.type} no yet supported`, result);
                            }
                        }
                    }
                }
            }
        };
        return actionMap;
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
/*!************************************************************!*\
  !*** ./client/src/modules/actions/favorites-menu/index.ts ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "./client/src/modules/actions/favorites-menu/actions.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    actions: new _actions__WEBPACK_IMPORTED_MODULE_0__.FavoritesMenuProvider()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvYWN0aW9ucy1zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy1wb3NpdGlvbi50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay91dGlscy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvYWN0aW9ucy9mYXZvcml0ZXMtbWVudS9hY3Rpb25zLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL2Zhdm9yaXRlcy1tZW51L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQ3VzdG9tQWN0aW9uc01hcCwgVG9vbGJhckJ1dHRvbiwgV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlLXBsYXRmb3JtXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMsIE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVMaXN0IH0gZnJvbSBcIi4vbW9kdWxlLXNoYXBlc1wiO1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGFuIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25zPE8gPSB1bmtub3duPiBleHRlbmRzIE1vZHVsZUltcGxlbWVudGF0aW9uPE8sIEFjdGlvbkhlbHBlcnM+IHtcblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0Z2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD47XG59XG5cbi8qKlxuICogQSBsaXN0IG9mIG1vZHVsZXMgdGhhdCBwcm92aWRlIGFjdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCBieSB0aGUgcGxhdGZvcm0uXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbnNQcm92aWRlck9wdGlvbnMgPSBNb2R1bGVMaXN0O1xuXG4vKipcbiAqIEV4dGVuZGVkIGhlbHBlcnMgdXNlZCBieSBhY3Rpb24gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25IZWxwZXJzIGV4dGVuZHMgTW9kdWxlSGVscGVycyB7XG5cdC8qKlxuXHQgKiBVcGRhdGUgdG9vbGJhciBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9ucyBUaGUgbGlzdCBvZiBhbGwgYnV0dG9ucy5cblx0ICogQHBhcmFtIGJ1dHRvbklkIFRoZSBidXR0b24gdG8gdXBkYXRlLlxuXHQgKiBAcGFyYW0gcmVwbGFjZW1lbnRCdXR0b25JZCBUaGUgcmVwbGFjZW1lbnQgZm9yIHRoZSBidXR0b24uXG5cdCAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGJ1dHRvbnMuXG5cdCAqL1xuXHR1cGRhdGVUb29sYmFyQnV0dG9uczogKFxuXHRcdGJ1dHRvbnM6IFRvb2xiYXJCdXR0b25bXSxcblx0XHRidXR0b25JZDogc3RyaW5nLFxuXHRcdHJlcGxhY2VtZW50QnV0dG9uSWQ6IHN0cmluZ1xuXHQpID0+IFByb21pc2U8VG9vbGJhckJ1dHRvbltdPjtcbn1cblxuLyoqXG4gKiBVc2UgdGhpcyBpbiBwcmVmZXJlbmNlIHRvIEN1c3RvbUFjdGlvbkNhbGxlclR5cGUgZnJvbSB3b3Jrc3BhY2UtcGxhdGZvcm0gdG8gYXZvaWQgdGhlIGltcG9ydCBvZiB0aGUgd2hvbGUgb2Ygd29ya3NwYWNlIHBhY2thZ2UgaW4gbW9kdWxlcy5cbiAqL1xuZXhwb3J0IGVudW0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSB7XG5cdEN1c3RvbUJ1dHRvbiA9IFwiQ3VzdG9tQnV0dG9uXCIsXG5cdFN0b3JlQ3VzdG9tQnV0dG9uID0gXCJTdG9yZUN1c3RvbUJ1dHRvblwiLFxuXHRDdXN0b21Ecm9wZG93bkl0ZW0gPSBcIkN1c3RvbURyb3Bkb3duSXRlbVwiLFxuXHRHbG9iYWxDb250ZXh0TWVudSA9IFwiR2xvYmFsQ29udGV4dE1lbnVcIixcblx0Vmlld1RhYkNvbnRleHRNZW51ID0gXCJWaWV3VGFiQ29udGV4dE1lbnVcIixcblx0UGFnZVRhYkNvbnRleHRNZW51ID0gXCJQYWdlVGFiQ29udGV4dE1lbnVcIixcblx0U2F2ZUJ1dHRvbkNvbnRleHRNZW51ID0gXCJTYXZlQnV0dG9uQ29udGV4dE1lbnVcIixcblx0QVBJID0gXCJBUElcIlxufVxuIiwiaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybVN0b3JhZ2VNZXRhZGF0YSB9IGZyb20gXCIuL3BsYXRmb3JtLXNoYXBlc1wiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIEFwcC5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9BUFAgPSBcImFwcFwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFdvcmtzcGFjZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UgPSBcIndvcmtzcGFjZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFBhZ2UuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUEFHRSA9IFwicGFnZVwiO1xuXG4vKipcbiAqIEZhdm9yaXRlIHR5cGUgZm9yIFF1ZXJ5LlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1FVRVJZID0gXCJxdWVyeVwiO1xuXG4vKipcbiAqIE5hbWVzIGZvciBhbGwgdGhlIGZhdm9yaXRlIHR5cGVzLlxuICovXG5leHBvcnQgdHlwZSBGYXZvcml0ZVR5cGVOYW1lcyA9XG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9BUFBcblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUEFHRVxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfUVVFUlk7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgdGhlIGZhdm9yaXRlIHByb3ZpZGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlUHJvdmlkZXJPcHRpb25zIHtcblx0LyoqXG5cdCAqIElzIHRoZSBwcm92aWRlciBlbmFibGVkLCBkZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0ZW5hYmxlZD86IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgeW91IHdhbnQgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIGZhdm9yaXRlIGFjdGlvblxuXHQgKi9cblx0ZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpY29uIHRvIHVzZSB0byBpbmRpY2F0ZSB0aGF0IHRoaXMgZmF2b3JpdGUgY2FuIGJlIHVuc2V0XG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbjogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBXaGF0IGNvbW1hbmRzIHNob3VsZCBpbnRlZ3JhdGlvbnMgY2hlY2sgZm9yIGlmIHRoZXkgaW50ZW50IHRvIHN1cHBvcnQgdGhlIGRpc3BsYXkgb2YgZmF2b3JpdGVzXG5cdCAqL1xuXHRmYXZvcml0ZUNvbW1hbmQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBjb25uZWN0aW9uIHByb3ZpZGVyIGNhbiBoYXZlIGFjdGlvbnMgcmVnaXN0ZXJlZCBhZ2FpbnN0IGl0IGZyb20gdGhlIHBsYXRmb3JtLiBUaGlzIHByb3ZpZGVzIGEgZGVmYXVsdCBsaXN0IG9mXG5cdCAqIGFjdGlvbnMgdGhhdCBjb25uZWN0aW9ucyBzaG91bGQgYmUgYWJsZSB0byB1c2UgaWYgYWN0aW9ucyBhcmUgZW5hYmxlZCBmb3IgdGhhdCBjb25uZWN0aW9uLlxuXHQgKi9cblx0c3VwcG9ydGVkRmF2b3JpdGVUeXBlcz86IEZhdm9yaXRlVHlwZU5hbWVzW107XG59XG5cbi8qKlxuICogV2hlbiBhbiBlbnRyeSBpcyBtYWRlIGl0IHJlcHJlc2VudHMgYSB0eXBlIHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtLiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvb2t1cCBhbmQgbGF1bmNoIHRoZSB0aGluZyB0aGlzIGVudHJ5IHJlZmVycyB0by5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIEEgdW5pcXVlIGd1aWQgdG8gcmVwcmVzZW50IHRoaXMgZmF2b3JpdGUgZW50cnkgc28gdGhhdCBpdCBjYW4gYmUgdXBkYXRlZCBvciByZW1vdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWQgZm9yIHRoZSBmYXZvcml0ZSB0eXBlIHRoaXMgZW50cnkgcmVwcmVzZW50c1xuXHQgKi9cblx0dHlwZUlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgdHlwZSBvZiBmYXZvcml0ZSBlbnRyeSBkb2VzIHRoaXMgZW50cnkgcmVwcmVzZW50XG5cdCAqL1xuXHR0eXBlOiBGYXZvcml0ZVR5cGVOYW1lcztcblxuXHQvKipcblx0ICogVGhlIHRpbWVzdGFtcCBmb3IgdGhlIGVudHJ5LlxuXHQgKi9cblx0dGltZXN0YW1wPzogRGF0ZTtcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgbGFiZWwgdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0bGFiZWw/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIERvZXMgdGhpcyBmYXZvcml0ZSBoYXZlIGEgc3VnZ2VzdGVkIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBhdm9pZCBhIGxvb2t1cFxuXHQgKi9cblx0aWNvbj86IHN0cmluZztcbn1cblxuLyoqXG4gKiBJbmZvIHRvIHJldHVybiB0byBpbnRlcmVzdGVkIHBhcnRpZXMgdG8gaGVscCB0aGVtIHN1cHBvcnQgZmF2b3JpdGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVJbmZvIHtcblx0LyoqXG5cdCAqIFRoZSBwYXRoIHRvIGFuIGljb24gdGhhdCBjYW4gYmUgdXNlZCB0byBpbmRpY2F0ZSB0aGUgYWJpbGl0eSB0byBmYXZvcml0ZVxuXHQgKi9cblx0ZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIHJlbW92ZSB0aGlzIGZhdm9yaXRlXG5cdCAqL1xuXHR1bmZhdm9yaXRlSWNvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIEEgY29tbWFuZCB0aGF0IHN1cHBvcnRpbmcgbW9kdWxlcyBzaG91bGQgbGlzdGVuIGZvciBpZiB0aGV5IGFyZSB0byBkaXNwbGF5IGZhdm9yaXRlcyB0aGF0IGZhbGwgdW5kZXIgdGhlbVxuXHQgKi9cblx0Y29tbWFuZD86IHN0cmluZztcblx0LyoqXG5cdCAqIFdoYXQgdHlwZXMgb2YgZmF2b3JpdGUgaXRlbSBhcmUgc3VwcG9ydGVkIG9uIHRoaXMgcGxhdGZvcm0sIHRoaXMgYWxzbyBkZXRlcm1pbmVzIHRoZSBvcmRlcmluZyBpbiB0aGUgZG9jayBtZW51LlxuXHQgKi9cblx0ZW5hYmxlZFR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcblx0LyoqXG5cdCAqIElzIGZhdm9yaXRlIHN1cHBvcnQgZW5hYmxlZCBvbiB0aGlzIHBsYXRmb3JtLlxuXHQgKi9cblx0aXNFbmFibGVkOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgY2xpZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBhY2Nlc3MgdG8gc29tZSBvciBhbGwgb2YgdGhlIGZhdm9yaXRlIGZ1bmN0aW9uYWxpdHlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUNsaWVudCB7XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IHN1cHBvcnRpbmcgaW5mb3JtYXRpb24gYWJvdXQgd2hldGhlciBmYXZvcml0ZXMgYXJlIGluaXRpYWxpemVkIGZvciB0aGUgcGxhdGZvcm0gYW5kIHN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm5zIFN1cHBvcnRpbmcgaW5mb3JtYXRpb24uXG5cdCAqL1xuXHRnZXRJbmZvKCk6IEZhdm9yaXRlSW5mbztcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYWxsIChvciBzb21lIGlmIGJ5IHR5cGUpIG9mIHRoZSBzYXZlZCBmYXZvcml0ZXNcblx0ICogQHBhcmFtIGJ5VHlwZSB0aGUgdHlwZSBvZiBzYXZlZCBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHNhdmVkIGZhdm9yaXRlcyBvciBhbiBlbXB0eSBhcnJheSBpZiBpdCB3YXMgdW5hYmxlIHRvIGdldCBhbnkgYmFja1xuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZXMoYnlUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXMpOiBQcm9taXNlPEZhdm9yaXRlRW50cnlbXSB8IHVuZGVmaW5lZD47XG5cdC8qKlxuXHQgKiBUaGUgYWJpbGl0eSB0byByZXF1ZXN0IGEgcGFydGljdWxhciBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIHRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcmV0dXJucyB0aGUgc2F2ZWQgZmF2b3JpdGUgaWYgYXZhaWxhYmxlIG9yIGZhbHNlIGlmIGl0IGRpZG4ndCBleGlzdFxuXHQgKi9cblx0Z2V0U2F2ZWRGYXZvcml0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxGYXZvcml0ZUVudHJ5IHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHNhdmUgYSBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGZhdm9yaXRlIHRoZSBGYXZvcml0ZSB5b3Ugd2lzaCB0byBzYXZlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgc2F2ZWRcblx0ICovXG5cdHNldFNhdmVkRmF2b3JpdGU/KGZhdm9yaXRlOiBGYXZvcml0ZUVudHJ5KTogUHJvbWlzZTxib29sZWFuPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlbW92ZS9kZWxldGUgYSBzYXZlZCBmYXZvcml0ZS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmF2b3JpdGUgdG8gZGVsZXRlXG5cdCAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBmYXZvcml0ZSB3YXMgZGVsZXRlZC5cblx0ICovXG5cdGRlbGV0ZVNhdmVkRmF2b3JpdGU/KGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmYXZvcml0ZSBhbmQgbWV0YSBkYXRhIHJlbGF0ZWQgdG8gaXRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogSW5mb3JtYXRpb24gcmVsYXRlZCB0byB0aGUgcGxhdGZvcm0gcHJvdmlkaW5nIHRoZSBwYXlsb2FkLlxuXHQgKi9cblx0bWV0YURhdGE6IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhO1xuXHQvKipcblx0ICogVGhlIGZhdm9yaXRlIGVudHJ5XG5cdCAqL1xuXHRwYXlsb2FkOiBGYXZvcml0ZUVudHJ5O1xufVxuXG4vKipcbiAqIEEgcmVxdWVzdCB0eXBlIGZvciB0aGUgRmF2b3JpdGVFbmRwb2ludCB0aGF0IGdldHMgYWxsIHNhdmVkIGZhdm9yaXRlIGVudHJpZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBpZiBzcGVjaWZpZWQgc2hvdWxkIGJlIHVzZWQgdG8gZmlsdGVyIHRoZSByZXNwb25zZSB0byBvbmx5IHNlbmQgdGhlIGVudHJpZXMgdGhhdCBhcmUgcmVsZXZhbnRcblx0ICovXG5cdGZhdm9yaXRlVHlwZT86IEZhdm9yaXRlVHlwZU5hbWVzO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgZmF2b3JpdGVzIHdhcyBmdWxmaWxsZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlTGlzdFJlc3BvbnNlIHtcblx0LyoqXG5cdCAqIFRoZSBsaXN0IG9mIGZhdm9yaXRlIGVudHJpZXMgd2l0aCBpbmZvcm1hdGlvbiBvZiB3aGF0IHBsYXRmb3JtIHZlcnNpb25zIHRoZXkgd2VyZSBvcmlnaW5hbGx5IHNhdmVkIGFnYWluc3Rcblx0ICovXG5cdGVudHJpZXM6IEVuZHBvaW50RmF2b3JpdGVFbnRyeVtdO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciBnZXR0aW5nIGEgc3BlY2lmaWMgZmF2b3JpdGUgZW50cnlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgc3BlY2lmaWMgZW50cnkgdGhhdCBoYXMgYmVlbiBzYXZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVzcG9uc2UgYWZ0ZXIgdGhlIHJlcXVlc3QgZm9yIGEgc3BlY2lmaWMgZmF2b3JpdGUgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgdHlwZSBFbmRwb2ludEZhdm9yaXRlR2V0UmVzcG9uc2UgPSBFbmRwb2ludEZhdm9yaXRlRW50cnk7XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVTZXRSZXF1ZXN0IGV4dGVuZHMgRW5kcG9pbnRGYXZvcml0ZUVudHJ5IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHNldFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgcmVtb3ZpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVSZW1vdmVSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGlzIHRvIGJlIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJQcm92aWRlck9wdGlvbnMsIFdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlcy9icm93c2VyLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8qKlxuICogUHJvdmlkZXMgeCBhbmQgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gYSB3aW5kb3cgb2YgYSBnaXZlbiBzaXplIGluIHJlbGF0aW9uIHRvIGFub3RoZXIgd2luZG93L3ZpZXcuXG4gKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGlkZW50aXR5IG9mIHRoZSB2aWV3L3dpbmRvdyB0aGVzZSB4L3kgY28tb3JkaW5hdGVzIHNob3VsZCBiZSBpbiByZWxhdGlvbiB0by5cbiAqIEBwYXJhbSBkaW1lbnNpb25zIFRoZSBkaW1lbnNpb25zIG9mIHRoZSB3aW5kb3cgdGhhdCB3aWxsIGJlIHBsYWNlZCBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXG4gKiBAcGFyYW0gZGltZW5zaW9ucy53aWR0aCBUaGUgd2lkdGggb2YgdGhlIHdpbmRvdyB0aGF0IGlzIGdvaW5nIHRvIGJlIHBsYWNlZC5cbiAqIEBwYXJhbSBkaW1lbnNpb25zLmhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3aW5kb3cgdGhhdCBpcyBnb2luZyB0byBiZSBwbGFjZWQuXG4gKiBAcmV0dXJucyBUaGUgeCwgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gdGhlIHdpbmRvd1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2VudGVyQ29udGVudEluSWRlbnRpdHkoXG5cdGNsaWVudElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5LFxuXHRkaW1lbnNpb25zOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH1cbik6IFByb21pc2U8eyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgdW5kZWZpbmVkPiB7XG5cdGNvbnN0IGJvdW5kcyA9IGF3YWl0IGdldElkZW50aXR5Qm91bmRzKGNsaWVudElkZW50aXR5KTtcblx0Y29uc3QgYm91bmRzQ2VudGVyID0gZ2V0Qm91bmRzQ2VudGVyKGJvdW5kcyk7XG5cdGNvbnN0IG1vbml0b3JJbmZvID0gYXdhaXQgZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQoYm91bmRzQ2VudGVyKTtcblx0cmV0dXJuIGNlbnRlckNvbnRlbnRJblJlY3QobW9uaXRvckluZm8uYXZhaWxhYmxlUmVjdCwgZGltZW5zaW9ucyk7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgeCBhbmQgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gY29udGVudCBvZiBhIGdpdmVuIHNpemUgaW4gcmVsYXRpb24gdG8gYSByZWN0LlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QgVGhlIGF2YWlsYWJsZSByZWN0IHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QubGVmdCBUaGUgYXZhaWxhYmxlIHJlY3QgbGVmdCB0byBwb3NpdGlvbiB0aGUgY29udGVudCBpbi5cbiAqIEBwYXJhbSBhdmFpbGFibGVSZWN0LnRvcCBUaGUgYXZhaWxhYmxlIHJlY3QgdG9wIHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QucmlnaHQgVGhlIGF2YWlsYWJsZSByZWN0IHJpZ2h0IHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QuYm90dG9tIFRoZSBhdmFpbGFibGUgcmVjdCBib3R0b20gdG8gcG9zaXRpb24gdGhlIGNvbnRlbnQgaW4uXG4gKiBAcGFyYW0gY29udGVudERpbWVuc2lvbnMgVGhlIGRpbWVuc2lvbnMgb2YgdGhlIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHBsYWNlZCBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXG4gKiBAcGFyYW0gY29udGVudERpbWVuc2lvbnMud2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHRoYXQgaXMgZ29pbmcgdG8gYmUgcGxhY2VkLlxuICogQHBhcmFtIGNvbnRlbnREaW1lbnNpb25zLmhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBjb250ZW50IHRoYXQgaXMgZ29pbmcgdG8gYmUgcGxhY2VkLlxuICogQHJldHVybnMgVGhlIHgsIHkgY28tb3JkaW5hdGVzIHRvIHBvc2l0aW9uIHRoZSBjb250ZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJDb250ZW50SW5SZWN0KFxuXHRhdmFpbGFibGVSZWN0OiB7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXI7IHJpZ2h0OiBudW1iZXI7IGJvdHRvbTogbnVtYmVyIH0sXG5cdGNvbnRlbnREaW1lbnNpb25zOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH1cbik6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG5cdGNvbnN0IGhlaWdodCA9IGF2YWlsYWJsZVJlY3QuYm90dG9tIC0gYXZhaWxhYmxlUmVjdC50b3A7XG5cdGNvbnN0IHdpZHRoID0gYXZhaWxhYmxlUmVjdC5yaWdodCAtIGF2YWlsYWJsZVJlY3QubGVmdDtcblx0Y29uc3QgZGl2aWRlZFJlY3RXaWR0aCA9IHdpZHRoIC8gMjtcblx0Y29uc3QgZGl2aWRlZFJlY3RIZWlnaHQgPSBoZWlnaHQgLyAyO1xuXHRjb25zdCBkaXZpZGVkRGltZW5zaW9uV2lkdGggPSBjb250ZW50RGltZW5zaW9ucy53aWR0aCAvIDI7XG5cdGNvbnN0IGRpdmlkZWREaW1lbnNpb25IZWlnaHQgPSBjb250ZW50RGltZW5zaW9ucy5oZWlnaHQgLyAyO1xuXHRjb25zdCB4ID0gYXZhaWxhYmxlUmVjdC5sZWZ0ICsgZGl2aWRlZFJlY3RXaWR0aCAtIGRpdmlkZWREaW1lbnNpb25XaWR0aDtcblx0Y29uc3QgeSA9IGF2YWlsYWJsZVJlY3QudG9wICsgZGl2aWRlZFJlY3RIZWlnaHQgLSBkaXZpZGVkRGltZW5zaW9uSGVpZ2h0O1xuXG5cdHJldHVybiB7IHg6IE1hdGgucm91bmQoeCksIHk6IE1hdGgucm91bmQoeSkgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtb25pdG9yIGRldGFpbHMgZm9yIHRoZSBtb25pdG9yIGEgdmlldy93aW5kb3cgaXMgcGxhY2VkIG9uLlxuICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgdmlldy93aW5kb3cgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm5zIFRoZSBtb25pdG9yIHRoZSB2aWV3L3dpbmRvdyBsaXZlcyBvbiBvciB1bmRlZmluZWQgaWYgbm8gbWF0Y2ggd2FzIGZvdW5kLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SWRlbnRpdHlCb3VuZHMoXG5cdGNsaWVudElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5XG4pOiBQcm9taXNlPE9wZW5GaW4uQm91bmRzIHwgdW5kZWZpbmVkPiB7XG5cdGxldCBib3VuZHM6IE9wZW5GaW4uQm91bmRzIHwgdW5kZWZpbmVkO1xuXHRsZXQgY3VycmVudFdpbmRvdzogT3BlbkZpbi5XaW5kb3cgfCB1bmRlZmluZWQ7XG5cblx0dHJ5IHtcblx0XHRjb25zdCB0YXJnZXRWaWV3ID0gZmluLlZpZXcud3JhcFN5bmMoY2xpZW50SWRlbnRpdHkpO1xuXHRcdGN1cnJlbnRXaW5kb3cgPSBhd2FpdCB0YXJnZXRWaWV3LmdldEN1cnJlbnRXaW5kb3coKTtcblx0fSBjYXRjaCB7XG5cdFx0Ly8gd2Ugd2VyZSBub3QgcGFzc2VkIGEgdmlldy5cblx0fVxuXG5cdGlmIChpc0VtcHR5KGJvdW5kcykpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gY3VycmVudFdpbmRvdyA/PyBmaW4uV2luZG93LndyYXBTeW5jKGNsaWVudElkZW50aXR5KTtcblx0XHRcdGJvdW5kcyA9IGF3YWl0IHRhcmdldFdpbmRvdy5nZXRCb3VuZHMoKTtcblx0XHR9IGNhdGNoIHtcblx0XHRcdC8vIGl0IHdhc24ndCBhIHdpbmRvd1xuXHRcdH1cblx0fVxuXG5cdGlmIChpc0VtcHR5KGJvdW5kcykpIHtcblx0XHR0cnkge1xuXHRcdFx0Ym91bmRzID0gYXdhaXQgZmluLm1lLmdldEJvdW5kcygpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0Ly8gdW5hYmxlIHRvIGdldCBvd24gYm91bmRzXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGJvdW5kcztcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBtb25pdG9yIHdoaWNoIGNvbnRhaW5zIHRoZSBwb2ludCBhbmQgcmV0dXJucyBpdC5cbiAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgY29vcmQgdG8gbG9jYXRlLlxuICogQHBhcmFtIHBvaW50LnggVGhlIHggY29vcmRcbiAqIEBwYXJhbSBwb2ludC55IFRoZSB5IGNvb3JkXG4gKiBAcmV0dXJucyBUaGUgbW9uaXRvciBjb250YWluaW5nIHRoZSBwb2ludC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRNb25pdG9yQ29udGFpbmluZ1BvaW50KHBvaW50OiB7XG5cdHg/OiBudW1iZXI7XG5cdHk/OiBudW1iZXI7XG59KTogUHJvbWlzZTxPcGVuRmluLk1vbml0b3JEZXRhaWxzPiB7XG5cdGNvbnN0IG1vbml0b3JJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRNb25pdG9ySW5mbygpO1xuXG5cdGNvbnN0IHggPSBwb2ludC54O1xuXHRjb25zdCB5ID0gcG9pbnQueTtcblx0aWYgKCFpc0VtcHR5KHgpICYmICFpc0VtcHR5KHkpKSB7XG5cdFx0Zm9yIChjb25zdCBtb25pdG9yIG9mIG1vbml0b3JJbmZvLm5vblByaW1hcnlNb25pdG9ycykge1xuXHRcdFx0aWYgKHBvaW50SW5SZWN0KHsgeCwgeSB9LCBtb25pdG9yLm1vbml0b3JSZWN0KSkge1xuXHRcdFx0XHRyZXR1cm4gbW9uaXRvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbW9uaXRvckluZm8ucHJpbWFyeU1vbml0b3I7XG59XG5cbi8qKlxuICogSXMgdGhlIHBvaW50IGluIHRoZSByZWN0YW5nbGUuXG4gKiBAcGFyYW0gcG9pbnQgVGhlIGNvb3JkIHRvIG1hdGNoLlxuICogQHBhcmFtIHBvaW50LnggVGhlIHggY29vcmQuXG4gKiBAcGFyYW0gcG9pbnQueSBUaGUgeSBjb29yZC5cbiAqIEBwYXJhbSByZWN0IFRoZSByZWN0LlxuICogQHBhcmFtIHJlY3QudG9wIFRoZSByZWN0IHRvcC5cbiAqIEBwYXJhbSByZWN0LmxlZnQgVGhlIHJlY3QgbGVmdC5cbiAqIEBwYXJhbSByZWN0LmJvdHRvbSBUaGUgcmVjdCBib3R0b20uXG4gKiBAcGFyYW0gcmVjdC5yaWdodCBUaGUgcmVjdCByaWdodC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHBvaW50IGlzIGluIHRoZSByZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRJblJlY3QoXG5cdHBvaW50OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0sXG5cdHJlY3Q6IHtcblx0XHR0b3A6IG51bWJlcjtcblx0XHRsZWZ0OiBudW1iZXI7XG5cdFx0Ym90dG9tOiBudW1iZXI7XG5cdFx0cmlnaHQ6IG51bWJlcjtcblx0fVxuKTogYm9vbGVhbiB7XG5cdHJldHVybiBwb2ludC54ID49IHJlY3QubGVmdCAmJiBwb2ludC54IDw9IHJlY3QucmlnaHQgJiYgcG9pbnQueSA+PSByZWN0LnRvcCAmJiBwb2ludC55IDw9IHJlY3QuYm90dG9tO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY2VudGVyIGZvciBhIGJvdW5kaW5nIHJlY3RhbmdsZS5cbiAqIEBwYXJhbSBib3VuZHMgVGhlIHJlY3RcbiAqIEBwYXJhbSBib3VuZHMudG9wIFRoZSByZWN0IHRvcFxuICogQHBhcmFtIGJvdW5kcy5sZWZ0IFRoZSByZWN0IGxlZnRcbiAqIEBwYXJhbSBib3VuZHMud2lkdGggVGhlIHJlY3Qgd2lkdGhcbiAqIEBwYXJhbSBib3VuZHMuaGVpZ2h0IFRoZSByZWN0IGhlaWdodFxuICogQHJldHVybnMgdGhlIHggYW5kIHkgb2YgdGhlIGJvdW5kcyBjZW50ZXIgb3IgYW4gb2JqZWN0IG5vdCBjb250YWluaW5nIHggb3IgeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kc0NlbnRlcihib3VuZHM/OiBPcGVuRmluLkJvdW5kcyk6IHsgeD86IG51bWJlcjsgeT86IG51bWJlciB9IHtcblx0bGV0IGJvdW5kc0NlbnRlclg6IG51bWJlciB8IHVuZGVmaW5lZDtcblx0bGV0IGJvdW5kc0NlbnRlclk6IG51bWJlciB8IHVuZGVmaW5lZDtcblx0aWYgKCFpc0VtcHR5KGJvdW5kcykpIHtcblx0XHRjb25zdCBoYWxmV2lkdGggPSBib3VuZHMud2lkdGggLyAyO1xuXHRcdGNvbnN0IGhhbGZIZWlnaHQgPSBib3VuZHMuaGVpZ2h0IC8gMjtcblx0XHRib3VuZHNDZW50ZXJYID0gYm91bmRzLmxlZnQgKyBoYWxmV2lkdGg7XG5cdFx0Ym91bmRzQ2VudGVyWSA9IGJvdW5kcy50b3AgKyBoYWxmSGVpZ2h0O1xuXHRcdHJldHVybiB7IHg6IE1hdGgucm91bmQoYm91bmRzQ2VudGVyWCksIHk6IE1hdGgucm91bmQoYm91bmRzQ2VudGVyWSkgfTtcblx0fVxuXHRyZXR1cm4ge307XG59XG5cbi8qKlxuICogR2l2ZW4gYnJvd3NlciBzZXR0aW5ncyB3aGF0IHdpbmRvdyBwb3NpdGlvbmluZyBvcHRpb25zIHNob3VsZCBiZSB1c2VkP1xuICogQHBhcmFtIHNldHRpbmdzIFRoZSBicm93c2VyIHNldHRpbmdzIHRoYXQgaGF2ZSBiZWVuIHByb3ZpZGVkLlxuICogQHJldHVybnMgYSBzZXQgb2Ygd2luZG93IHBvc2l0aW9uaW5nIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXaW5kb3dQb3NpdGlvbk9wdGlvbnMoXG5cdHNldHRpbmdzPzogQnJvd3NlclByb3ZpZGVyT3B0aW9uc1xuKTogUHJvbWlzZTxXaW5kb3dQb3NpdGlvbmluZ09wdGlvbnM+IHtcblx0Y29uc3Qgd2luZG93UG9zaXRpb25pbmdPcHRpb25zOiBXaW5kb3dQb3NpdGlvbmluZ09wdGlvbnMgPSB7fTtcblx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRlZmF1bHRzID0ge307XG5cdGlmICghaXNFbXB0eShzZXR0aW5ncykpIHtcblx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMud2luZG93UG9zaXRpb25pbmdTdHJhdGVneSA9IHNldHRpbmdzLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k7XG5cdFx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRpc2FibGVXaW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5ID0gc2V0dGluZ3MuZGlzYWJsZVdpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k7XG5cdFx0aWYgKCFpc0VtcHR5KHNldHRpbmdzPy5kZWZhdWx0V2luZG93T3B0aW9ucz8uZGVmYXVsdExlZnQpKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMubGVmdCA9IHNldHRpbmdzLmRlZmF1bHRXaW5kb3dPcHRpb25zLmRlZmF1bHRMZWZ0O1xuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkoc2V0dGluZ3M/LmRlZmF1bHRXaW5kb3dPcHRpb25zPy5kZWZhdWx0VG9wKSkge1xuXHRcdFx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRlZmF1bHRzLnRvcCA9IHNldHRpbmdzLmRlZmF1bHRXaW5kb3dPcHRpb25zLmRlZmF1bHRUb3A7XG5cdFx0fVxuXHR9XG5cdGlmIChpc0VtcHR5KHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy5sZWZ0KSB8fCBpc0VtcHR5KHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy50b3ApKSB7XG5cdFx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0XHRjb25zdCBwbGF0Zm9ybU1hbmlmZXN0OiBPcGVuRmluLk1hbmlmZXN0ID0gYXdhaXQgYXBwLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKCFpc0VtcHR5KHBsYXRmb3JtTWFuaWZlc3Q/LnBsYXRmb3JtPy5kZWZhdWx0V2luZG93T3B0aW9ucz8uZGVmYXVsdExlZnQpKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMubGVmdCA9IHBsYXRmb3JtTWFuaWZlc3QucGxhdGZvcm0uZGVmYXVsdFdpbmRvd09wdGlvbnMuZGVmYXVsdExlZnQ7XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eShwbGF0Zm9ybU1hbmlmZXN0Py5wbGF0Zm9ybT8uZGVmYXVsdFdpbmRvd09wdGlvbnM/LmRlZmF1bHRUb3ApKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMudG9wID0gcGxhdGZvcm1NYW5pZmVzdC5wbGF0Zm9ybS5kZWZhdWx0V2luZG93T3B0aW9ucy5kZWZhdWx0VG9wO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gd2luZG93UG9zaXRpb25pbmdPcHRpb25zO1xufVxuXG4vKipcbiAqIEdldCB0aGUgd2luZG93IHBvc2l0aW9uIHVzaW5nIGEgc3RyYXRlZ3kuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zIFRoZSBvcHRpb25zIGZvciB3aW5kb3cgcG9zaXRpb25pbmcuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kgVGhlIHN0cmF0ZWd5IGZvciB3aW5kb3cgcG9zaXRpb25pbmcuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kueCBUaGUgeCBjb29yZGluYXRlLlxuICogQHBhcmFtIHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5LnkgVGhlIHkgY29vcmRpbmF0ZS5cbiAqIEBwYXJhbSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGlzYWJsZVdpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kgV2hldGhlciB0byBkaXNhYmxlIHRoZSB3aW5kb3cgcG9zaXRpb25pbmcgc3RyYXRlZ3kuXG4gKiBAcGFyYW0gcmVsYXRlZFRvIFRoZSByZWxhdGVkIG1vbml0b3Igb3IgaWRlbnRpdHkgb3IgeC95IHBvc2l0aW9uLlxuICogQHJldHVybnMgVGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgb2YgdGhlIHdpbmRvdyBwb3NpdGlvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd1Bvc2l0aW9uVXNpbmdTdHJhdGVneShcblx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zPzogV2luZG93UG9zaXRpb25pbmdPcHRpb25zLFxuXHRyZWxhdGVkVG8/OiBPcGVuRmluLk1vbml0b3JEZXRhaWxzIHwgT3BlbkZpbi5JZGVudGl0eSB8IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVxuKTogUHJvbWlzZTx7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXIgfSB8IHVuZGVmaW5lZD4ge1xuXHRpZiAod2luZG93UG9zaXRpb25pbmdPcHRpb25zPy5kaXNhYmxlV2luZG93UG9zaXRpb25pbmdTdHJhdGVneSA9PT0gdHJ1ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRsZXQgdGFyZ2V0TW9uaXRvcjogT3BlbkZpbi5Nb25pdG9yRGV0YWlscyB8IHVuZGVmaW5lZDtcblxuXHRpZiAoaXNFbXB0eShyZWxhdGVkVG8pKSB7XG5cdFx0Y29uc3QgbW9uaXRvcnMgPSBhd2FpdCBmaW4uU3lzdGVtLmdldE1vbml0b3JJbmZvKCk7XG5cdFx0dGFyZ2V0TW9uaXRvciA9IG1vbml0b3JzLnByaW1hcnlNb25pdG9yO1xuXHR9IGVsc2UgaWYgKCFpc0VtcHR5KHJlbGF0ZWRUbykgJiYgXCJtb25pdG9yUmVjdFwiIGluIHJlbGF0ZWRUbykge1xuXHRcdHRhcmdldE1vbml0b3IgPSByZWxhdGVkVG87XG5cdH0gZWxzZSBpZiAoIWlzRW1wdHkocmVsYXRlZFRvKSAmJiBcInhcIiBpbiByZWxhdGVkVG8pIHtcblx0XHR0YXJnZXRNb25pdG9yID0gYXdhaXQgZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQocmVsYXRlZFRvKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBib3VuZHMgPSBhd2FpdCBnZXRJZGVudGl0eUJvdW5kcyhyZWxhdGVkVG8pO1xuXHRcdGlmIChpc0VtcHR5KGJvdW5kcykpIHtcblx0XHRcdGNvbnN0IG1vbml0b3JzID0gYXdhaXQgZmluLlN5c3RlbS5nZXRNb25pdG9ySW5mbygpO1xuXHRcdFx0dGFyZ2V0TW9uaXRvciA9IG1vbml0b3JzLnByaW1hcnlNb25pdG9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRNb25pdG9yID0gYXdhaXQgZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQoeyB4OiBib3VuZHMubGVmdCwgeTogYm91bmRzLnRvcCB9KTtcblx0XHR9XG5cdH1cblx0Y29uc3Qgd2luZG93RGVmYXVsdExlZnQgPSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LmRlZmF1bHRzPy5sZWZ0ID8/IDA7XG5cdGNvbnN0IHdpbmRvd0RlZmF1bHRUb3AgPSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LmRlZmF1bHRzPy50b3AgPz8gMDtcblxuXHQvLyBHZXQgdGhlIGF2YWlsYWJsZSByZWN0IGZvciB0aGUgZGlzcGxheSBzbyB3ZSBjYW4gdGFrZSBpbiB0byBhY2NvdW50XG5cdC8vIE9TIG1lbnVzLCB0YXNrIGJhciBldGNcblx0Y29uc3QgYXZhaWxhYmxlTGVmdCA9IHRhcmdldE1vbml0b3IuYXZhaWxhYmxlUmVjdC5sZWZ0O1xuXHRjb25zdCBhdmFpbGFibGVUb3AgPSB0YXJnZXRNb25pdG9yLmF2YWlsYWJsZVJlY3QudG9wO1xuXHRjb25zdCB3aW5kb3dPZmZzZXRzWDogbnVtYmVyID0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zPy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5Py54ID8/IDMwO1xuXHRjb25zdCB3aW5kb3dPZmZzZXRzWTogbnVtYmVyID0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zPy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5Py55ID8/IDMwO1xuXHRjb25zdCB3aW5kb3dPZmZzZXRzTWF4SW5jcmVtZW50czogbnVtYmVyID1cblx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k/Lm1heEluY3JlbWVudHMgPz8gODtcblx0Y29uc3QgdmlzaWJsZVdpbmRvd3MgPSBhd2FpdCBnZXRBbGxWaXNpYmxlV2luZG93cygpO1xuXHQvLyBHZXQgdGhlIHRvcCBsZWZ0IGJvdW5kcyBmb3IgYWxsIHRoZSB2aXNpYmxlIHdpbmRvd3Ncblx0Y29uc3QgdG9wTGVmdEJvdW5kcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuXHRcdHZpc2libGVXaW5kb3dzLm1hcChhc3luYyAod2luKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBib3VuZHMgPSBhd2FpdCB3aW4uZ2V0Qm91bmRzKCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0bGVmdDogYm91bmRzLmxlZnQsXG5cdFx0XHRcdFx0dG9wOiBib3VuZHMudG9wLFxuXHRcdFx0XHRcdHJpZ2h0OiBib3VuZHMubGVmdCArIHdpbmRvd09mZnNldHNYLFxuXHRcdFx0XHRcdGJvdHRvbTogYm91bmRzLnRvcCArIHdpbmRvd09mZnNldHNZXG5cdFx0XHRcdH07XG5cdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0Ly8gcmV0dXJuIGEgZHVtbXkgZW50cnkuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdFx0cmlnaHQ6IDAsXG5cdFx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSlcblx0KTtcblxuXHRsZXQgbWluQ291bnRWYWw6IG51bWJlciA9IDEwMDA7XG5cdGxldCBtaW5Db3VudEluZGV4ID0gd2luZG93T2Zmc2V0c01heEluY3JlbWVudHM7XG5cblx0Ly8gTm93IHNlZSBob3cgbWFueSB3aW5kb3dzIGFwcGVhciBpbiBlYWNoIGluY3JlbWVudCBzbG90XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93T2Zmc2V0c01heEluY3JlbWVudHM7IGkrKykge1xuXHRcdGNvbnN0IHhQb3MgPSBpICogd2luZG93T2Zmc2V0c1g7XG5cdFx0Y29uc3QgeVBvcyA9IGkgKiB3aW5kb3dPZmZzZXRzWTtcblx0XHRjb25zdCBsZWZ0UG9zID0gd2luZG93RGVmYXVsdExlZnQgKyB4UG9zO1xuXHRcdGNvbnN0IHRvcFBvcyA9IHdpbmRvd0RlZmF1bHRUb3AgKyB5UG9zO1xuXHRcdGNvbnN0IGZvdW5kV2lucyA9IHRvcExlZnRCb3VuZHMuZmlsdGVyKFxuXHRcdFx0KHRvcExlZnRXaW5Cb3VuZHMpID0+XG5cdFx0XHRcdHRvcExlZnRXaW5Cb3VuZHMubGVmdCA+PSBsZWZ0UG9zICsgYXZhaWxhYmxlTGVmdCAmJlxuXHRcdFx0XHR0b3BMZWZ0V2luQm91bmRzLnJpZ2h0IDw9IGxlZnRQb3MgKyB3aW5kb3dPZmZzZXRzWCArIGF2YWlsYWJsZUxlZnQgJiZcblx0XHRcdFx0dG9wTGVmdFdpbkJvdW5kcy50b3AgPj0gdG9wUG9zICsgYXZhaWxhYmxlVG9wICYmXG5cdFx0XHRcdHRvcExlZnRXaW5Cb3VuZHMuYm90dG9tIDw9IHRvcFBvcyArIHdpbmRvd09mZnNldHNZICsgYXZhaWxhYmxlVG9wXG5cdFx0KTtcblx0XHQvLyBJZiB0aGlzIHNsb3QgaGFzIGxlc3MgdGhhbiB0aGUgY3VycmVudCBtaW5pbXVtIHVzZSB0aGlzIHNsb3Rcblx0XHRpZiAoZm91bmRXaW5zLmxlbmd0aCA8IG1pbkNvdW50VmFsKSB7XG5cdFx0XHRtaW5Db3VudFZhbCA9IGZvdW5kV2lucy5sZW5ndGg7XG5cdFx0XHRtaW5Db3VudEluZGV4ID0gaTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCB4T2Zmc2V0ID0gbWluQ291bnRJbmRleCAqIHdpbmRvd09mZnNldHNYO1xuXHRjb25zdCB4ID0gd2luZG93RGVmYXVsdExlZnQgKyB4T2Zmc2V0ICsgYXZhaWxhYmxlTGVmdDtcblx0Y29uc3QgeU9mZnNldCA9IG1pbkNvdW50SW5kZXggKiB3aW5kb3dPZmZzZXRzWTtcblx0Y29uc3QgeSA9IHdpbmRvd0RlZmF1bHRUb3AgKyB5T2Zmc2V0ICsgYXZhaWxhYmxlVG9wO1xuXG5cdHJldHVybiB7IGxlZnQ6IHgsIHRvcDogeSB9O1xufVxuXG4vKipcbiAqIEdldCBhIGxpc3Qgb2YgYWxsIHRoZSB2aXNpYmxlIHdpbmRvd3MgaW4gdGhlIHBsYXRmb3JtLlxuICogQHJldHVybnMgVGhlIGxpc3Qgb2YgdmlzaWJsZSB3aW5kb3dzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsVmlzaWJsZVdpbmRvd3MoKTogUHJvbWlzZTxPcGVuRmluLldpbmRvd1tdPiB7XG5cdGNvbnN0IHBsYXRmb3JtID0gZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCk7XG5cdGNvbnN0IHdpbmRvd3MgPSBhd2FpdCBwbGF0Zm9ybS5BcHBsaWNhdGlvbi5nZXRDaGlsZFdpbmRvd3MoKTtcblx0Y29uc3QgYXZhaWxhYmxlV2luZG93czogT3BlbkZpbi5XaW5kb3dbXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGN1cnJlbnRXaW5kb3cgb2Ygd2luZG93cykge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpc1Nob3dpbmcgPSBhd2FpdCBjdXJyZW50V2luZG93LmlzU2hvd2luZygpO1xuXHRcdFx0aWYgKGlzU2hvd2luZykge1xuXHRcdFx0XHRhdmFpbGFibGVXaW5kb3dzLnB1c2goY3VycmVudFdpbmRvdyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHQvLyBpZiB0aGUgd2luZG93IGlzIGRlc3Ryb3llZCBiZWZvcmUgZGV0ZXJtaW5pbmcgaWYgaXQgaXMgc2hvd2luZyB0aGVuXG5cdFx0XHQvLyB3ZSBzaG91bGQgbW92ZSB0byB0aGUgbmV4dCB3aW5kb3cgYnV0IG5vdCB0aHJvdy5cblx0XHR9XG5cdH1cblx0cmV0dXJuIGF2YWlsYWJsZVdpbmRvd3M7XG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogRG8gYSBkZWVwIGNvbXBhcmlzb24gb2YgdGhlIG9iamVjdHMuXG4gKiBAcGFyYW0gb2JqMSBUaGUgZmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gb2JqMiBUaGUgc2Vjb25kIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIG1hdGNoUHJvcGVydHlPcmRlciBJZiB0cnVlIHRoZSBwcm9wZXJ0aWVzIG11c3QgYmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBvYmplY3RzIGFyZSB0aGUgc2FtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBFcXVhbChvYmoxOiB1bmtub3duLCBvYmoyOiB1bmtub3duLCBtYXRjaFByb3BlcnR5T3JkZXI6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XG5cdGlmIChpc09iamVjdChvYmoxKSAmJiBpc09iamVjdChvYmoyKSkge1xuXHRcdGNvbnN0IG9iaktleXMxID0gT2JqZWN0LmtleXMob2JqMSk7XG5cdFx0Y29uc3Qgb2JqS2V5czIgPSBPYmplY3Qua2V5cyhvYmoyKTtcblxuXHRcdGlmIChvYmpLZXlzMS5sZW5ndGggIT09IG9iaktleXMyLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChtYXRjaFByb3BlcnR5T3JkZXIgJiYgSlNPTi5zdHJpbmdpZnkob2JqS2V5czEpICE9PSBKU09OLnN0cmluZ2lmeShvYmpLZXlzMikpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IGtleSBvZiBvYmpLZXlzMSkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMSA9IChvYmoxIGFzIGFueSlba2V5XTtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0XHRjb25zdCB2YWx1ZTIgPSAob2JqMiBhcyBhbnkpW2tleV07XG5cblx0XHRcdGlmICghZGVlcEVxdWFsKHZhbHVlMSwgdmFsdWUyLCBtYXRjaFByb3BlcnR5T3JkZXIpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmoxKSAmJiBBcnJheS5pc0FycmF5KG9iajIpKSB7XG5cdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICghZGVlcEVxdWFsKG9iajFbaV0sIG9iajJbaV0sIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoxKSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqMik7XG59XG5cbi8qKlxuICogRGVlcCBtZXJnZSB0d28gb2JqZWN0cy5cbiAqIEBwYXJhbSB0YXJnZXQgVGhlIG9iamVjdCB0byBiZSBtZXJnZWQgaW50by5cbiAqIEBwYXJhbSBzb3VyY2VzIFRoZSBvYmplY3RzIHRvIG1lcmdlIGludG8gdGhlIHRhcmdldC5cbiAqIEByZXR1cm5zIFRoZSBtZXJnZWQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlPFQgPSB1bmtub3duPih0YXJnZXQ6IFQsIC4uLnNvdXJjZXM6IFRbXSk6IFQge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoc291cmNlcykgfHwgc291cmNlcy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0QXNNYXAgPSB0YXJnZXQgYXMgeyBbaWQ6IHN0cmluZ106IHVua25vd24gfTtcblx0Y29uc3Qgc291cmNlID0gc291cmNlcy5zaGlmdCgpO1xuXG5cdGxldCBrZXlzO1xuXHRpZiAoaXNPYmplY3QodGFyZ2V0QXNNYXApICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuXHRcdFx0cmV0dXJuIHNvdXJjZTtcblx0XHR9XG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSkubWFwKChrKSA9PiBOdW1iZXIucGFyc2VJbnQoaywgMTApKTtcblx0fVxuXG5cdGlmIChrZXlzKSB7XG5cdFx0Y29uc3Qgc291cmNlQXNNYXAgPSBzb3VyY2UgYXMgeyBbaWQ6IHN0cmluZ106IHVua25vd24gfTtcblx0XHRmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZUFzTWFwW2tleV07XG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHRhcmdldEFzTWFwW2tleV0pKSB7XG5cdFx0XHRcdFx0dGFyZ2V0QXNNYXBba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZXBNZXJnZSh0YXJnZXRBc01hcFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHRhcmdldEFzTWFwW2tleV0pKSB7XG5cdFx0XHRcdFx0dGFyZ2V0QXNNYXBba2V5XSA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZXBNZXJnZSh0YXJnZXRBc01hcFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRlZXBNZXJnZSh0YXJnZXQsIC4uLnNvdXJjZXMpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nVmFsdWUoZXJyKSkge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBmcm9tIGEgY29tbWFuZCBsaW5lIHN0cmluZy5cbiAqIEV4YW1wbGVzIG9mIGNvbW1hbmQgbGluZSBzdHJpbmdzOiBhcmcxIGtleTE9dmFsdWUxIGtleTI9XCJ2YWx1ZSB3aXRoIHNwYWNlc1wiIGtleTM9J3ZhbHVlMycga2V5ND0ndmFsdWUgd2l0aCBtb3JlIHNwYWNlcydgLlxuICogQHBhcmFtIGNvbW1hbmRMaW5lIFRoZSBjb21tYW5kIGxpbmUgc3RyaW5nLlxuICogQHJldHVybnMgVGhlIGNvbW1hbmQgbGluZSBhcmd1bWVudHMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgbm9uZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbWFuZExpbmVBcmdzKGNvbW1hbmRMaW5lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdGlmICghaXNTdHJpbmdWYWx1ZShjb21tYW5kTGluZSkpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgbWF0Y2hlcyA9IGNvbW1hbmRMaW5lLm1hdGNoKC8oXFx3Kz0pPyhcIlteXCJdKlwifCdbXiddKid8W14gXSspL2cpO1xuXHRpZiAoaXNFbXB0eShtYXRjaGVzKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRyZXR1cm4gbWF0Y2hlcztcbn1cbiIsImltcG9ydCB0eXBlIHtcblx0Q3VzdG9tQWN0aW9uUGF5bG9hZCxcblx0Q3VzdG9tQWN0aW9uc01hcCxcblx0V29ya3NwYWNlUGxhdGZvcm1Nb2R1bGVcbn0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSwgdHlwZSBBY3Rpb25zIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hY3Rpb25zLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMYXVuY2hQcmVmZXJlbmNlIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQge1xuXHRGQVZPUklURV9UWVBFX05BTUVfQVBQLFxuXHRGQVZPUklURV9UWVBFX05BTUVfUEFHRSxcblx0RkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSxcblx0dHlwZSBGYXZvcml0ZUVudHJ5XG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciwgTG9nZ2VyQ3JlYXRvciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBQb3B1cE1lbnVFbnRyeSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbWVudS1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlRGVmaW5pdGlvbiwgTW9kdWxlSGVscGVycyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0V2luZG93UG9zaXRpb25Vc2luZ1N0cmF0ZWd5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzLXBvc2l0aW9uXCI7XG5pbXBvcnQgdHlwZSB7IEZhdm9yaXRlc01lbnVTZXR0aW5ncyB9IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgZmF2b3JpdGVzIG1lbnUgYWN0aW9ucyBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEZhdm9yaXRlc01lbnVQcm92aWRlciBpbXBsZW1lbnRzIEFjdGlvbnM8RmF2b3JpdGVzTWVudVNldHRpbmdzPiB7XG5cdC8qKlxuXHQgKiBUaGUgbG9nZ2VyIGZvciBkaXNwbGF5aW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9sb2dnZXI/OiBMb2dnZXI7XG5cblx0LyoqXG5cdCAqIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlLlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX2hlbHBlcnM6IE1vZHVsZUhlbHBlcnMgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIG1lbnUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfc2V0dGluZ3M6IEZhdm9yaXRlc01lbnVTZXR0aW5ncyB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB0aGUgbW9kdWxlLlxuXHQgKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgbW9kdWxlIGZyb20gY29uZmlndXJhdGlvbiBpbmNsdWRlIGN1c3RvbSBvcHRpb25zLlxuXHQgKiBAcGFyYW0gbG9nZ2VyQ3JlYXRvciBGb3IgbG9nZ2luZyBlbnRyaWVzLlxuXHQgKiBAcGFyYW0gaGVscGVycyBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhcHBsaWNhdGlvbiBjb3JlLlxuXHQgKiBAcmV0dXJucyBOb3RoaW5nLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGluaXRpYWxpemUoXG5cdFx0ZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxGYXZvcml0ZXNNZW51U2V0dGluZ3M+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9sb2dnZXIgPSBsb2dnZXJDcmVhdG9yKFwiRmF2b3JpdGVzTWVudVByb3ZpZGVyXCIpO1xuXHRcdHRoaXMuX2hlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdHRoaXMuX3NldHRpbmdzID0gZGVmaW5pdGlvbi5kYXRhO1xuXG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJJbml0aWFsaXppbmdcIik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0KHBsYXRmb3JtOiBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSk6IFByb21pc2U8Q3VzdG9tQWN0aW9uc01hcD4ge1xuXHRcdGNvbnN0IGFjdGlvbk1hcDogQ3VzdG9tQWN0aW9uc01hcCA9IHt9O1xuXG5cdFx0YWN0aW9uTWFwW1wiZmF2b3JpdGVzLW1lbnVcIl0gPSBhc3luYyAocGF5bG9hZDogQ3VzdG9tQWN0aW9uUGF5bG9hZCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKHBheWxvYWQuY2FsbGVyVHlwZSA9PT0gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZS5DdXN0b21CdXR0b24gJiYgdGhpcy5faGVscGVycykge1xuXHRcdFx0XHRjb25zdCBnZXRDbGllbnQgPSB0aGlzLl9oZWxwZXJzPy5nZXRGYXZvcml0ZUNsaWVudDtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KGdldENsaWVudCkpIHtcblx0XHRcdFx0XHRjb25zdCBjbGllbnQgPSBhd2FpdCBnZXRDbGllbnQoKTtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY2xpZW50KSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZmF2SW5mbyA9IGNsaWVudC5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBtZW51RW50cmllczogUG9wdXBNZW51RW50cnk8RmF2b3JpdGVFbnRyeT5bXSA9IFtdO1xuXG5cdFx0XHRcdFx0XHRpZiAoZmF2SW5mby5lbmFibGVkVHlwZXMpIHtcblx0XHRcdFx0XHRcdFx0bGV0IGhhZEVudHJpZXMgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCB0eXBlIG9mIGZhdkluZm8uZW5hYmxlZFR5cGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2F2ZWQgPSBhd2FpdCBjbGllbnQuZ2V0U2F2ZWRGYXZvcml0ZXModHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHNhdmVkICYmIHNhdmVkLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChoYWRFbnRyaWVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1lbnVFbnRyaWVzLnB1c2goeyB0eXBlOiBcInNlcGFyYXRvclwiIH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHRzYXZlZC5zb3J0KChmMSwgZjIpID0+IChmMS5sYWJlbCA/PyBcIlwiKS5sb2NhbGVDb21wYXJlKGYyLmxhYmVsID8/IFwiXCIpKTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBzYXZlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZW51RW50cmllcy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsYWJlbDogZW50cnkubGFiZWwgPz8gXCJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uOiBlbnRyeS5pY29uLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGE6IGVudHJ5XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aGFkRW50cmllcyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IG1lbnVDbGllbnQgPSBhd2FpdCB0aGlzLl9oZWxwZXJzLmdldE1lbnVDbGllbnQoKTtcblx0XHRcdFx0XHRcdGNvbnN0IHBvcHVwTWVudVN0eWxlID0gdGhpcy5fc2V0dGluZ3M/LnBvcHVwTWVudVN0eWxlID8/IG1lbnVDbGllbnQuZ2V0UG9wdXBNZW51U3R5bGUoKTtcblxuXHRcdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgbWVudUNsaWVudC5zaG93UG9wdXBNZW51PEZhdm9yaXRlRW50cnk+KFxuXHRcdFx0XHRcdFx0XHR7IHg6IHBheWxvYWQueCwgeTogNDggfSxcblx0XHRcdFx0XHRcdFx0cGF5bG9hZC53aW5kb3dJZGVudGl0eSxcblx0XHRcdFx0XHRcdFx0XCJUaGVyZSBhcmUgbm8gZmF2b3JpdGVzXCIsXG5cdFx0XHRcdFx0XHRcdG1lbnVFbnRyaWVzLFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0cG9wdXBNZW51U3R5bGVcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkocmVzdWx0KSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJGYXZvcml0ZXMgTWVudSBEaXNtaXNzZWRcIik7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oXCJGYXZvcml0ZXMgTWVudSBJdGVtIFNlbGVjdGVkXCIsIHJlc3VsdCk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdC50eXBlID09PSBGQVZPUklURV9UWVBFX05BTUVfQVBQKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcCkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBsYXVuY2hQcmVmZXJlbmNlOiBMYXVuY2hQcmVmZXJlbmNlIHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgYm91bmRzID0gYXdhaXQgZ2V0V2luZG93UG9zaXRpb25Vc2luZ1N0cmF0ZWd5KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1bmRlZmluZWQsIC8vIGdvIHdpdGggZGVmYXVsdHNcblx0XHRcdFx0XHRcdFx0XHRcdFx0cGF5bG9hZC53aW5kb3dJZGVudGl0eVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShib3VuZHMpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxhdW5jaFByZWZlcmVuY2UgPSB7IGJvdW5kcyB9O1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8ubGF1bmNoQXBwKHJlc3VsdC50eXBlSWQsIGxhdW5jaFByZWZlcmVuY2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQudHlwZSA9PT0gRkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8ubGF1bmNoUGFnZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaFBhZ2UocmVzdWx0LnR5cGVJZCwgdW5kZWZpbmVkLCB0aGlzLl9sb2dnZXIpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChyZXN1bHQudHlwZSA9PT0gRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5sYXVuY2hXb3Jrc3BhY2UpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5sYXVuY2hXb3Jrc3BhY2UocmVzdWx0LnR5cGVJZCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhgRmF2b3JpdGVzIFR5cGUgJHtyZXN1bHQudHlwZX0gbm8geWV0IHN1cHBvcnRlZGAsIHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjdGlvbk1hcDtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSB7IE1vZHVsZUltcGxlbWVudGF0aW9uLCBNb2R1bGVUeXBlcyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbW9kdWxlLXNoYXBlc1wiO1xuaW1wb3J0IHsgRmF2b3JpdGVzTWVudVByb3ZpZGVyIH0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuXG4vKipcbiAqIERlZmluZSB0aGUgZW50cnkgcG9pbnRzIGZvciB0aGUgbW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgZW50cnlQb2ludHM6IHsgW3R5cGUgaW4gTW9kdWxlVHlwZXNdPzogTW9kdWxlSW1wbGVtZW50YXRpb24gfSA9IHtcblx0YWN0aW9uczogbmV3IEZhdm9yaXRlc01lbnVQcm92aWRlcigpXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9