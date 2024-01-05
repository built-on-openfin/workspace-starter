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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OzRCQUNGLENBQUM7aUNBQU0sQ0FBQztnQ0FDUCxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsTUFBTSxDQUFDLElBQUksbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQzlFLENBQUM7d0JBQ0YsQ0FBQztvQkFDRixDQUFDO2dCQUNGLENBQUM7WUFDRixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBRUYsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztDQUNEOzs7Ozs7O1NDdEpEO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNMa0Q7QUFFbEQ7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsT0FBTyxFQUFFLElBQUksMkRBQXFCLEVBQUU7Q0FDcEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3NoYXBlcy9hY3Rpb25zLXNoYXBlcy50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9zaGFwZXMvZmF2b3JpdGUtc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLXBvc2l0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9hY3Rpb25zL2Zhdm9yaXRlcy1tZW51L2FjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2FjdGlvbnMvZmF2b3JpdGVzLW1lbnUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBDdXN0b21BY3Rpb25zTWFwLCBUb29sYmFyQnV0dG9uLCBXb3Jrc3BhY2VQbGF0Zm9ybU1vZHVsZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB0eXBlIHsgTW9kdWxlSGVscGVycywgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZUxpc3QgfSBmcm9tIFwiLi9tb2R1bGUtc2hhcGVzXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBmb3IgYW4gYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbnM8TyA9IHVua25vd24+IGV4dGVuZHMgTW9kdWxlSW1wbGVtZW50YXRpb248TywgQWN0aW9uSGVscGVycz4ge1xuXHQvKipcblx0ICogR2V0IHRoZSBhY3Rpb25zIGZyb20gdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIHBsYXRmb3JtIFRoZSBwbGF0Zm9ybSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIFRoZSBtYXAgb2YgY3VzdG9tIGFjdGlvbnMuXG5cdCAqL1xuXHRnZXQocGxhdGZvcm06IFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlKTogUHJvbWlzZTxDdXN0b21BY3Rpb25zTWFwPjtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2YgbW9kdWxlcyB0aGF0IHByb3ZpZGUgYWN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIGJ5IHRoZSBwbGF0Zm9ybS5cbiAqL1xuZXhwb3J0IHR5cGUgQWN0aW9uc1Byb3ZpZGVyT3B0aW9ucyA9IE1vZHVsZUxpc3Q7XG5cbi8qKlxuICogRXh0ZW5kZWQgaGVscGVycyB1c2VkIGJ5IGFjdGlvbiBtb2R1bGVzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbkhlbHBlcnMgZXh0ZW5kcyBNb2R1bGVIZWxwZXJzIHtcblx0LyoqXG5cdCAqIFVwZGF0ZSB0b29sYmFyIGJ1dHRvbnMuXG5cdCAqIEBwYXJhbSBidXR0b25zIFRoZSBsaXN0IG9mIGFsbCBidXR0b25zLlxuXHQgKiBAcGFyYW0gYnV0dG9uSWQgVGhlIGJ1dHRvbiB0byB1cGRhdGUuXG5cdCAqIEBwYXJhbSByZXBsYWNlbWVudEJ1dHRvbklkIFRoZSByZXBsYWNlbWVudCBmb3IgdGhlIGJ1dHRvbi5cblx0ICogQHJldHVybnMgVGhlIHVwZGF0ZWQgYnV0dG9ucy5cblx0ICovXG5cdHVwZGF0ZVRvb2xiYXJCdXR0b25zOiAoXG5cdFx0YnV0dG9uczogVG9vbGJhckJ1dHRvbltdLFxuXHRcdGJ1dHRvbklkOiBzdHJpbmcsXG5cdFx0cmVwbGFjZW1lbnRCdXR0b25JZDogc3RyaW5nXG5cdCkgPT4gUHJvbWlzZTxUb29sYmFyQnV0dG9uW10+O1xufVxuXG4vKipcbiAqIFVzZSB0aGlzIGluIHByZWZlcmVuY2UgdG8gQ3VzdG9tQWN0aW9uQ2FsbGVyVHlwZSBmcm9tIHdvcmtzcGFjZS1wbGF0Zm9ybSB0byBhdm9pZCB0aGUgaW1wb3J0IG9mIHRoZSB3aG9sZSBvZiB3b3Jrc3BhY2UgcGFja2FnZSBpbiBtb2R1bGVzLlxuICovXG5leHBvcnQgZW51bSBDdXN0b21BY3Rpb25DYWxsZXJUeXBlIHtcblx0Q3VzdG9tQnV0dG9uID0gXCJDdXN0b21CdXR0b25cIixcblx0U3RvcmVDdXN0b21CdXR0b24gPSBcIlN0b3JlQ3VzdG9tQnV0dG9uXCIsXG5cdEN1c3RvbURyb3Bkb3duSXRlbSA9IFwiQ3VzdG9tRHJvcGRvd25JdGVtXCIsXG5cdEdsb2JhbENvbnRleHRNZW51ID0gXCJHbG9iYWxDb250ZXh0TWVudVwiLFxuXHRWaWV3VGFiQ29udGV4dE1lbnUgPSBcIlZpZXdUYWJDb250ZXh0TWVudVwiLFxuXHRQYWdlVGFiQ29udGV4dE1lbnUgPSBcIlBhZ2VUYWJDb250ZXh0TWVudVwiLFxuXHRTYXZlQnV0dG9uQ29udGV4dE1lbnUgPSBcIlNhdmVCdXR0b25Db250ZXh0TWVudVwiLFxuXHRBUEkgPSBcIkFQSVwiXG59XG4iLCJpbXBvcnQgdHlwZSB7IFBsYXRmb3JtU3RvcmFnZU1ldGFkYXRhIH0gZnJvbSBcIi4vcGxhdGZvcm0tc2hhcGVzXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgQXBwLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCA9IFwiYXBwXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgV29ya3NwYWNlLlxuICovXG5leHBvcnQgY29uc3QgRkFWT1JJVEVfVFlQRV9OQU1FX1dPUktTUEFDRSA9IFwid29ya3NwYWNlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUGFnZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFID0gXCJwYWdlXCI7XG5cbi8qKlxuICogRmF2b3JpdGUgdHlwZSBmb3IgUXVlcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBGQVZPUklURV9UWVBFX05BTUVfUVVFUlkgPSBcInF1ZXJ5XCI7XG5cbi8qKlxuICogTmFtZXMgZm9yIGFsbCB0aGUgZmF2b3JpdGUgdHlwZXMuXG4gKi9cbmV4cG9ydCB0eXBlIEZhdm9yaXRlVHlwZU5hbWVzID1cblx0fCB0eXBlb2YgRkFWT1JJVEVfVFlQRV9OQU1FX0FQUFxuXHR8IHR5cGVvZiBGQVZPUklURV9UWVBFX05BTUVfV09SS1NQQUNFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFXG5cdHwgdHlwZW9mIEZBVk9SSVRFX1RZUEVfTkFNRV9RVUVSWTtcblxuLyoqXG4gKiBPcHRpb25zIGZvciB0aGUgZmF2b3JpdGUgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVQcm92aWRlck9wdGlvbnMge1xuXHQvKipcblx0ICogSXMgdGhlIHByb3ZpZGVyIGVuYWJsZWQsIGRlZmF1bHRzIHRvIHRydWUuXG5cdCAqL1xuXHRlbmFibGVkPzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogVGhlIGljb24gdGhhdCBzaG91bGQgYmUgdXNlZCBpZiB5b3Ugd2FudCB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgZmF2b3JpdGUgYWN0aW9uXG5cdCAqL1xuXHRmYXZvcml0ZUljb246IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGljb24gdG8gdXNlIHRvIGluZGljYXRlIHRoYXQgdGhpcyBmYXZvcml0ZSBjYW4gYmUgdW5zZXRcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFdoYXQgY29tbWFuZHMgc2hvdWxkIGludGVncmF0aW9ucyBjaGVjayBmb3IgaWYgdGhleSBpbnRlbnQgdG8gc3VwcG9ydCB0aGUgZGlzcGxheSBvZiBmYXZvcml0ZXNcblx0ICovXG5cdGZhdm9yaXRlQ29tbWFuZD86IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIGNvbm5lY3Rpb24gcHJvdmlkZXIgY2FuIGhhdmUgYWN0aW9ucyByZWdpc3RlcmVkIGFnYWluc3QgaXQgZnJvbSB0aGUgcGxhdGZvcm0uIFRoaXMgcHJvdmlkZXMgYSBkZWZhdWx0IGxpc3Qgb2Zcblx0ICogYWN0aW9ucyB0aGF0IGNvbm5lY3Rpb25zIHNob3VsZCBiZSBhYmxlIHRvIHVzZSBpZiBhY3Rpb25zIGFyZSBlbmFibGVkIGZvciB0aGF0IGNvbm5lY3Rpb24uXG5cdCAqL1xuXHRzdXBwb3J0ZWRGYXZvcml0ZVR5cGVzPzogRmF2b3JpdGVUeXBlTmFtZXNbXTtcbn1cblxuLyoqXG4gKiBXaGVuIGFuIGVudHJ5IGlzIG1hZGUgaXQgcmVwcmVzZW50cyBhIHR5cGUgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm0uIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9va3VwIGFuZCBsYXVuY2ggdGhlIHRoaW5nIHRoaXMgZW50cnkgcmVmZXJzIHRvLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogQSB1bmlxdWUgZ3VpZCB0byByZXByZXNlbnQgdGhpcyBmYXZvcml0ZSBlbnRyeSBzbyB0aGF0IGl0IGNhbiBiZSB1cGRhdGVkIG9yIHJlbW92ZWRcblx0ICovXG5cdGlkOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBpZCBmb3IgdGhlIGZhdm9yaXRlIHR5cGUgdGhpcyBlbnRyeSByZXByZXNlbnRzXG5cdCAqL1xuXHR0eXBlSWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogV2hhdCB0eXBlIG9mIGZhdm9yaXRlIGVudHJ5IGRvZXMgdGhpcyBlbnRyeSByZXByZXNlbnRcblx0ICovXG5cdHR5cGU6IEZhdm9yaXRlVHlwZU5hbWVzO1xuXG5cdC8qKlxuXHQgKiBUaGUgdGltZXN0YW1wIGZvciB0aGUgZW50cnkuXG5cdCAqL1xuXHR0aW1lc3RhbXA/OiBEYXRlO1xuXG5cdC8qKlxuXHQgKiBEb2VzIHRoaXMgZmF2b3JpdGUgaGF2ZSBhIHN1Z2dlc3RlZCBsYWJlbCB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRsYWJlbD86IHN0cmluZztcblxuXHQvKipcblx0ICogRG9lcyB0aGlzIGZhdm9yaXRlIGhhdmUgYSBzdWdnZXN0ZWQgaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIGEgbG9va3VwXG5cdCAqL1xuXHRpY29uPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEluZm8gdG8gcmV0dXJuIHRvIGludGVyZXN0ZWQgcGFydGllcyB0byBoZWxwIHRoZW0gc3VwcG9ydCBmYXZvcml0ZXNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZUluZm8ge1xuXHQvKipcblx0ICogVGhlIHBhdGggdG8gYW4gaWNvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIGluZGljYXRlIHRoZSBhYmlsaXR5IHRvIGZhdm9yaXRlXG5cdCAqL1xuXHRmYXZvcml0ZUljb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgcGF0aCB0byBhbiBpY29uIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5kaWNhdGUgdGhlIGFiaWxpdHkgdG8gcmVtb3ZlIHRoaXMgZmF2b3JpdGVcblx0ICovXG5cdHVuZmF2b3JpdGVJY29uPzogc3RyaW5nO1xuXHQvKipcblx0ICogQSBjb21tYW5kIHRoYXQgc3VwcG9ydGluZyBtb2R1bGVzIHNob3VsZCBsaXN0ZW4gZm9yIGlmIHRoZXkgYXJlIHRvIGRpc3BsYXkgZmF2b3JpdGVzIHRoYXQgZmFsbCB1bmRlciB0aGVtXG5cdCAqL1xuXHRjb21tYW5kPzogc3RyaW5nO1xuXHQvKipcblx0ICogV2hhdCB0eXBlcyBvZiBmYXZvcml0ZSBpdGVtIGFyZSBzdXBwb3J0ZWQgb24gdGhpcyBwbGF0Zm9ybSwgdGhpcyBhbHNvIGRldGVybWluZXMgdGhlIG9yZGVyaW5nIGluIHRoZSBkb2NrIG1lbnUuXG5cdCAqL1xuXHRlbmFibGVkVHlwZXM/OiBGYXZvcml0ZVR5cGVOYW1lc1tdO1xuXHQvKipcblx0ICogSXMgZmF2b3JpdGUgc3VwcG9ydCBlbmFibGVkIG9uIHRoaXMgcGxhdGZvcm0uXG5cdCAqL1xuXHRpc0VuYWJsZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQSBjbGllbnQgdGhhdCBjYW4gYmUgdXNlZCB0byBwcm92aWRlIGFjY2VzcyB0byBzb21lIG9yIGFsbCBvZiB0aGUgZmF2b3JpdGUgZnVuY3Rpb25hbGl0eVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEZhdm9yaXRlQ2xpZW50IHtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3Qgc3VwcG9ydGluZyBpbmZvcm1hdGlvbiBhYm91dCB3aGV0aGVyIGZhdm9yaXRlcyBhcmUgaW5pdGlhbGl6ZWQgZm9yIHRoZSBwbGF0Zm9ybSBhbmQgc3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMgU3VwcG9ydGluZyBpbmZvcm1hdGlvbi5cblx0ICovXG5cdGdldEluZm8oKTogRmF2b3JpdGVJbmZvO1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVxdWVzdCBhbGwgKG9yIHNvbWUgaWYgYnkgdHlwZSkgb2YgdGhlIHNhdmVkIGZhdm9yaXRlc1xuXHQgKiBAcGFyYW0gYnlUeXBlIHRoZSB0eXBlIG9mIHNhdmVkIGZhdm9yaXRlIHlvdSBhcmUgbG9va2luZyBmb3Jcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc2F2ZWQgZmF2b3JpdGVzIG9yIGFuIGVtcHR5IGFycmF5IGlmIGl0IHdhcyB1bmFibGUgdG8gZ2V0IGFueSBiYWNrXG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlcyhieVR5cGU/OiBGYXZvcml0ZVR5cGVOYW1lcyk6IFByb21pc2U8RmF2b3JpdGVFbnRyeVtdIHwgdW5kZWZpbmVkPjtcblx0LyoqXG5cdCAqIFRoZSBhYmlsaXR5IHRvIHJlcXVlc3QgYSBwYXJ0aWN1bGFyIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgdGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB5b3UgYXJlIGxvb2tpbmcgZm9yXG5cdCAqIEByZXR1cm5zIHRoZSBzYXZlZCBmYXZvcml0ZSBpZiBhdmFpbGFibGUgb3IgZmFsc2UgaWYgaXQgZGlkbid0IGV4aXN0XG5cdCAqL1xuXHRnZXRTYXZlZEZhdm9yaXRlKGlkOiBzdHJpbmcpOiBQcm9taXNlPEZhdm9yaXRlRW50cnkgfCB1bmRlZmluZWQ+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gc2F2ZSBhIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gZmF2b3JpdGUgdGhlIEZhdm9yaXRlIHlvdSB3aXNoIHRvIHNhdmVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBzYXZlZFxuXHQgKi9cblx0c2V0U2F2ZWRGYXZvcml0ZT8oZmF2b3JpdGU6IEZhdm9yaXRlRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+O1xuXHQvKipcblx0ICogVGhlIGFiaWxpdHkgdG8gcmVtb3ZlL2RlbGV0ZSBhIHNhdmVkIGZhdm9yaXRlLlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmYXZvcml0ZSB0byBkZWxldGVcblx0ICogQHJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGZhdm9yaXRlIHdhcyBkZWxldGVkLlxuXHQgKi9cblx0ZGVsZXRlU2F2ZWRGYXZvcml0ZT8oaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZhdm9yaXRlIGFuZCBtZXRhIGRhdGEgcmVsYXRlZCB0byBpdFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBJbmZvcm1hdGlvbiByZWxhdGVkIHRvIHRoZSBwbGF0Zm9ybSBwcm92aWRpbmcgdGhlIHBheWxvYWQuXG5cdCAqL1xuXHRtZXRhRGF0YTogUGxhdGZvcm1TdG9yYWdlTWV0YWRhdGE7XG5cdC8qKlxuXHQgKiBUaGUgZmF2b3JpdGUgZW50cnlcblx0ICovXG5cdHBheWxvYWQ6IEZhdm9yaXRlRW50cnk7XG59XG5cbi8qKlxuICogQSByZXF1ZXN0IHR5cGUgZm9yIHRoZSBGYXZvcml0ZUVuZHBvaW50IHRoYXQgZ2V0cyBhbGwgc2F2ZWQgZmF2b3JpdGUgZW50cmllc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVxdWVzdCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHBsYXRmb3JtIG1ha2luZyB0aGUgcmVxdWVzdFxuXHQgKi9cblx0cGxhdGZvcm06IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSB0eXBlIGlmIHNwZWNpZmllZCBzaG91bGQgYmUgdXNlZCB0byBmaWx0ZXIgdGhlIHJlc3BvbnNlIHRvIG9ubHkgc2VuZCB0aGUgZW50cmllcyB0aGF0IGFyZSByZWxldmFudFxuXHQgKi9cblx0ZmF2b3JpdGVUeXBlPzogRmF2b3JpdGVUeXBlTmFtZXM7XG59XG5cbi8qKlxuICogVGhlIHJlc3BvbnNlIGFmdGVyIHRoZSByZXF1ZXN0IGZvciBmYXZvcml0ZXMgd2FzIGZ1bGZpbGxlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVMaXN0UmVzcG9uc2Uge1xuXHQvKipcblx0ICogVGhlIGxpc3Qgb2YgZmF2b3JpdGUgZW50cmllcyB3aXRoIGluZm9ybWF0aW9uIG9mIHdoYXQgcGxhdGZvcm0gdmVyc2lvbnMgdGhleSB3ZXJlIG9yaWdpbmFsbHkgc2F2ZWQgYWdhaW5zdFxuXHQgKi9cblx0ZW50cmllczogRW5kcG9pbnRGYXZvcml0ZUVudHJ5W107XG59XG5cbi8qKlxuICogVGhlIHJlcXVlc3QgZm9yIGdldHRpbmcgYSBzcGVjaWZpYyBmYXZvcml0ZSBlbnRyeVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXF1ZXN0IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgcGxhdGZvcm0gbWFraW5nIHRoZSByZXF1ZXN0XG5cdCAqL1xuXHRwbGF0Zm9ybTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBzcGVjaWZpYyBlbnRyeSB0aGF0IGhhcyBiZWVuIHNhdmVkXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXNwb25zZSBhZnRlciB0aGUgcmVxdWVzdCBmb3IgYSBzcGVjaWZpYyBmYXZvcml0ZSB3YXMgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCB0eXBlIEVuZHBvaW50RmF2b3JpdGVHZXRSZXNwb25zZSA9IEVuZHBvaW50RmF2b3JpdGVFbnRyeTtcblxuLyoqXG4gKiBUaGUgcmVxdWVzdCBmb3IgZ2V0dGluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVNldFJlcXVlc3QgZXh0ZW5kcyBFbmRwb2ludEZhdm9yaXRlRW50cnkge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgc2V0XG5cdCAqL1xuXHRpZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSByZXF1ZXN0IGZvciByZW1vdmluZyBhIHNwZWNpZmljIGZhdm9yaXRlIGVudHJ5XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRW5kcG9pbnRGYXZvcml0ZVJlbW92ZVJlcXVlc3Qge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBwbGF0Zm9ybSBtYWtpbmcgdGhlIHJlcXVlc3Rcblx0ICovXG5cdHBsYXRmb3JtOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIHNwZWNpZmljIGVudHJ5IHRoYXQgaXMgdG8gYmUgcmVtb3ZlZFxuXHQgKi9cblx0aWQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgQnJvd3NlclByb3ZpZGVyT3B0aW9ucywgV2luZG93UG9zaXRpb25pbmdPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzL2Jyb3dzZXItc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBQcm92aWRlcyB4IGFuZCB5IGNvLW9yZGluYXRlcyB0byBwb3NpdGlvbiBhIHdpbmRvdyBvZiBhIGdpdmVuIHNpemUgaW4gcmVsYXRpb24gdG8gYW5vdGhlciB3aW5kb3cvdmlldy5cbiAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgaWRlbnRpdHkgb2YgdGhlIHZpZXcvd2luZG93IHRoZXNlIHgveSBjby1vcmRpbmF0ZXMgc2hvdWxkIGJlIGluIHJlbGF0aW9uIHRvLlxuICogQHBhcmFtIGRpbWVuc2lvbnMgVGhlIGRpbWVuc2lvbnMgb2YgdGhlIHdpbmRvdyB0aGF0IHdpbGwgYmUgcGxhY2VkIGluIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlbi5cbiAqIEBwYXJhbSBkaW1lbnNpb25zLndpZHRoIFRoZSB3aWR0aCBvZiB0aGUgd2luZG93IHRoYXQgaXMgZ29pbmcgdG8gYmUgcGxhY2VkLlxuICogQHBhcmFtIGRpbWVuc2lvbnMuaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHdpbmRvdyB0aGF0IGlzIGdvaW5nIHRvIGJlIHBsYWNlZC5cbiAqIEByZXR1cm5zIFRoZSB4LCB5IGNvLW9yZGluYXRlcyB0byBwb3NpdGlvbiB0aGUgd2luZG93XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjZW50ZXJDb250ZW50SW5JZGVudGl0eShcblx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHksXG5cdGRpbWVuc2lvbnM6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfVxuKTogUHJvbWlzZTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0gfCB1bmRlZmluZWQ+IHtcblx0Y29uc3QgYm91bmRzID0gYXdhaXQgZ2V0SWRlbnRpdHlCb3VuZHMoY2xpZW50SWRlbnRpdHkpO1xuXHRjb25zdCBib3VuZHNDZW50ZXIgPSBnZXRCb3VuZHNDZW50ZXIoYm91bmRzKTtcblx0Y29uc3QgbW9uaXRvckluZm8gPSBhd2FpdCBmaW5kTW9uaXRvckNvbnRhaW5pbmdQb2ludChib3VuZHNDZW50ZXIpO1xuXHRyZXR1cm4gY2VudGVyQ29udGVudEluUmVjdChtb25pdG9ySW5mby5hdmFpbGFibGVSZWN0LCBkaW1lbnNpb25zKTtcbn1cblxuLyoqXG4gKiBQcm92aWRlcyB4IGFuZCB5IGNvLW9yZGluYXRlcyB0byBwb3NpdGlvbiBjb250ZW50IG9mIGEgZ2l2ZW4gc2l6ZSBpbiByZWxhdGlvbiB0byBhIHJlY3QuXG4gKiBAcGFyYW0gYXZhaWxhYmxlUmVjdCBUaGUgYXZhaWxhYmxlIHJlY3QgdG8gcG9zaXRpb24gdGhlIGNvbnRlbnQgaW4uXG4gKiBAcGFyYW0gYXZhaWxhYmxlUmVjdC5sZWZ0IFRoZSBhdmFpbGFibGUgcmVjdCBsZWZ0IHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QudG9wIFRoZSBhdmFpbGFibGUgcmVjdCB0b3AgdG8gcG9zaXRpb24gdGhlIGNvbnRlbnQgaW4uXG4gKiBAcGFyYW0gYXZhaWxhYmxlUmVjdC5yaWdodCBUaGUgYXZhaWxhYmxlIHJlY3QgcmlnaHQgdG8gcG9zaXRpb24gdGhlIGNvbnRlbnQgaW4uXG4gKiBAcGFyYW0gYXZhaWxhYmxlUmVjdC5ib3R0b20gVGhlIGF2YWlsYWJsZSByZWN0IGJvdHRvbSB0byBwb3NpdGlvbiB0aGUgY29udGVudCBpbi5cbiAqIEBwYXJhbSBjb250ZW50RGltZW5zaW9ucyBUaGUgZGltZW5zaW9ucyBvZiB0aGUgY29udGVudCB0aGF0IHdpbGwgYmUgcGxhY2VkIGluIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlbi5cbiAqIEBwYXJhbSBjb250ZW50RGltZW5zaW9ucy53aWR0aCBUaGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgdGhhdCBpcyBnb2luZyB0byBiZSBwbGFjZWQuXG4gKiBAcGFyYW0gY29udGVudERpbWVuc2lvbnMuaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIGNvbnRlbnQgdGhhdCBpcyBnb2luZyB0byBiZSBwbGFjZWQuXG4gKiBAcmV0dXJucyBUaGUgeCwgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gdGhlIGNvbnRlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNlbnRlckNvbnRlbnRJblJlY3QoXG5cdGF2YWlsYWJsZVJlY3Q6IHsgbGVmdDogbnVtYmVyOyB0b3A6IG51bWJlcjsgcmlnaHQ6IG51bWJlcjsgYm90dG9tOiBudW1iZXIgfSxcblx0Y29udGVudERpbWVuc2lvbnM6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXIgfVxuKTogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHtcblx0Y29uc3QgaGVpZ2h0ID0gYXZhaWxhYmxlUmVjdC5ib3R0b20gLSBhdmFpbGFibGVSZWN0LnRvcDtcblx0Y29uc3Qgd2lkdGggPSBhdmFpbGFibGVSZWN0LnJpZ2h0IC0gYXZhaWxhYmxlUmVjdC5sZWZ0O1xuXHRjb25zdCBkaXZpZGVkUmVjdFdpZHRoID0gd2lkdGggLyAyO1xuXHRjb25zdCBkaXZpZGVkUmVjdEhlaWdodCA9IGhlaWdodCAvIDI7XG5cdGNvbnN0IGRpdmlkZWREaW1lbnNpb25XaWR0aCA9IGNvbnRlbnREaW1lbnNpb25zLndpZHRoIC8gMjtcblx0Y29uc3QgZGl2aWRlZERpbWVuc2lvbkhlaWdodCA9IGNvbnRlbnREaW1lbnNpb25zLmhlaWdodCAvIDI7XG5cdGNvbnN0IHggPSBhdmFpbGFibGVSZWN0LmxlZnQgKyBkaXZpZGVkUmVjdFdpZHRoIC0gZGl2aWRlZERpbWVuc2lvbldpZHRoO1xuXHRjb25zdCB5ID0gYXZhaWxhYmxlUmVjdC50b3AgKyBkaXZpZGVkUmVjdEhlaWdodCAtIGRpdmlkZWREaW1lbnNpb25IZWlnaHQ7XG5cblx0cmV0dXJuIHsgeDogTWF0aC5yb3VuZCh4KSwgeTogTWF0aC5yb3VuZCh5KSB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1vbml0b3IgZGV0YWlscyBmb3IgdGhlIG1vbml0b3IgYSB2aWV3L3dpbmRvdyBpcyBwbGFjZWQgb24uXG4gKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGlkZW50aXR5IG9mIHRoZSB2aWV3L3dpbmRvdyB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybnMgVGhlIG1vbml0b3IgdGhlIHZpZXcvd2luZG93IGxpdmVzIG9uIG9yIHVuZGVmaW5lZCBpZiBubyBtYXRjaCB3YXMgZm91bmQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRJZGVudGl0eUJvdW5kcyhcblx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uSWRlbnRpdHlcbik6IFByb21pc2U8T3BlbkZpbi5Cb3VuZHMgfCB1bmRlZmluZWQ+IHtcblx0bGV0IGJvdW5kczogT3BlbkZpbi5Cb3VuZHMgfCB1bmRlZmluZWQ7XG5cdGxldCBjdXJyZW50V2luZG93OiBPcGVuRmluLldpbmRvdyB8IHVuZGVmaW5lZDtcblxuXHR0cnkge1xuXHRcdGNvbnN0IHRhcmdldFZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhjbGllbnRJZGVudGl0eSk7XG5cdFx0Y3VycmVudFdpbmRvdyA9IGF3YWl0IHRhcmdldFZpZXcuZ2V0Q3VycmVudFdpbmRvdygpO1xuXHR9IGNhdGNoIHtcblx0XHQvLyB3ZSB3ZXJlIG5vdCBwYXNzZWQgYSB2aWV3LlxuXHR9XG5cblx0aWYgKGlzRW1wdHkoYm91bmRzKSkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCB0YXJnZXRXaW5kb3cgPSBjdXJyZW50V2luZG93ID8/IGZpbi5XaW5kb3cud3JhcFN5bmMoY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0Ym91bmRzID0gYXdhaXQgdGFyZ2V0V2luZG93LmdldEJvdW5kcygpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0Ly8gaXQgd2Fzbid0IGEgd2luZG93XG5cdFx0fVxuXHR9XG5cblx0aWYgKGlzRW1wdHkoYm91bmRzKSkge1xuXHRcdHRyeSB7XG5cdFx0XHRib3VuZHMgPSBhd2FpdCBmaW4ubWUuZ2V0Qm91bmRzKCk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHQvLyB1bmFibGUgdG8gZ2V0IG93biBib3VuZHNcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYm91bmRzO1xufVxuXG4vKipcbiAqIEZpbmQgdGhlIG1vbml0b3Igd2hpY2ggY29udGFpbnMgdGhlIHBvaW50IGFuZCByZXR1cm5zIGl0LlxuICogQHBhcmFtIHBvaW50IFRoZSBwb2ludCBjb29yZCB0byBsb2NhdGUuXG4gKiBAcGFyYW0gcG9pbnQueCBUaGUgeCBjb29yZFxuICogQHBhcmFtIHBvaW50LnkgVGhlIHkgY29vcmRcbiAqIEByZXR1cm5zIFRoZSBtb25pdG9yIGNvbnRhaW5pbmcgdGhlIHBvaW50LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQocG9pbnQ6IHtcblx0eD86IG51bWJlcjtcblx0eT86IG51bWJlcjtcbn0pOiBQcm9taXNlPE9wZW5GaW4uTW9uaXRvckRldGFpbHM+IHtcblx0Y29uc3QgbW9uaXRvckluZm8gPSBhd2FpdCBmaW4uU3lzdGVtLmdldE1vbml0b3JJbmZvKCk7XG5cblx0Y29uc3QgeCA9IHBvaW50Lng7XG5cdGNvbnN0IHkgPSBwb2ludC55O1xuXHRpZiAoIWlzRW1wdHkoeCkgJiYgIWlzRW1wdHkoeSkpIHtcblx0XHRmb3IgKGNvbnN0IG1vbml0b3Igb2YgbW9uaXRvckluZm8ubm9uUHJpbWFyeU1vbml0b3JzKSB7XG5cdFx0XHRpZiAocG9pbnRJblJlY3QoeyB4LCB5IH0sIG1vbml0b3IubW9uaXRvclJlY3QpKSB7XG5cdFx0XHRcdHJldHVybiBtb25pdG9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtb25pdG9ySW5mby5wcmltYXJ5TW9uaXRvcjtcbn1cblxuLyoqXG4gKiBJcyB0aGUgcG9pbnQgaW4gdGhlIHJlY3RhbmdsZS5cbiAqIEBwYXJhbSBwb2ludCBUaGUgY29vcmQgdG8gbWF0Y2guXG4gKiBAcGFyYW0gcG9pbnQueCBUaGUgeCBjb29yZC5cbiAqIEBwYXJhbSBwb2ludC55IFRoZSB5IGNvb3JkLlxuICogQHBhcmFtIHJlY3QgVGhlIHJlY3QuXG4gKiBAcGFyYW0gcmVjdC50b3AgVGhlIHJlY3QgdG9wLlxuICogQHBhcmFtIHJlY3QubGVmdCBUaGUgcmVjdCBsZWZ0LlxuICogQHBhcmFtIHJlY3QuYm90dG9tIFRoZSByZWN0IGJvdHRvbS5cbiAqIEBwYXJhbSByZWN0LnJpZ2h0IFRoZSByZWN0IHJpZ2h0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW4gdGhlIHJlY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2ludEluUmVjdChcblx0cG9pbnQ6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSxcblx0cmVjdDoge1xuXHRcdHRvcDogbnVtYmVyO1xuXHRcdGxlZnQ6IG51bWJlcjtcblx0XHRib3R0b206IG51bWJlcjtcblx0XHRyaWdodDogbnVtYmVyO1xuXHR9XG4pOiBib29sZWFuIHtcblx0cmV0dXJuIHBvaW50LnggPj0gcmVjdC5sZWZ0ICYmIHBvaW50LnggPD0gcmVjdC5yaWdodCAmJiBwb2ludC55ID49IHJlY3QudG9wICYmIHBvaW50LnkgPD0gcmVjdC5ib3R0b207XG59XG5cbi8qKlxuICogR2V0IHRoZSBjZW50ZXIgZm9yIGEgYm91bmRpbmcgcmVjdGFuZ2xlLlxuICogQHBhcmFtIGJvdW5kcyBUaGUgcmVjdFxuICogQHBhcmFtIGJvdW5kcy50b3AgVGhlIHJlY3QgdG9wXG4gKiBAcGFyYW0gYm91bmRzLmxlZnQgVGhlIHJlY3QgbGVmdFxuICogQHBhcmFtIGJvdW5kcy53aWR0aCBUaGUgcmVjdCB3aWR0aFxuICogQHBhcmFtIGJvdW5kcy5oZWlnaHQgVGhlIHJlY3QgaGVpZ2h0XG4gKiBAcmV0dXJucyB0aGUgeCBhbmQgeSBvZiB0aGUgYm91bmRzIGNlbnRlciBvciBhbiBvYmplY3Qgbm90IGNvbnRhaW5pbmcgeCBvciB5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRzQ2VudGVyKGJvdW5kcz86IE9wZW5GaW4uQm91bmRzKTogeyB4PzogbnVtYmVyOyB5PzogbnVtYmVyIH0ge1xuXHRsZXQgYm91bmRzQ2VudGVyWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXHRsZXQgYm91bmRzQ2VudGVyWTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXHRpZiAoIWlzRW1wdHkoYm91bmRzKSkge1xuXHRcdGNvbnN0IGhhbGZXaWR0aCA9IGJvdW5kcy53aWR0aCAvIDI7XG5cdFx0Y29uc3QgaGFsZkhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLyAyO1xuXHRcdGJvdW5kc0NlbnRlclggPSBib3VuZHMubGVmdCArIGhhbGZXaWR0aDtcblx0XHRib3VuZHNDZW50ZXJZID0gYm91bmRzLnRvcCArIGhhbGZIZWlnaHQ7XG5cdFx0cmV0dXJuIHsgeDogTWF0aC5yb3VuZChib3VuZHNDZW50ZXJYKSwgeTogTWF0aC5yb3VuZChib3VuZHNDZW50ZXJZKSB9O1xuXHR9XG5cdHJldHVybiB7fTtcbn1cblxuLyoqXG4gKiBHaXZlbiBicm93c2VyIHNldHRpbmdzIHdoYXQgd2luZG93IHBvc2l0aW9uaW5nIG9wdGlvbnMgc2hvdWxkIGJlIHVzZWQ/XG4gKiBAcGFyYW0gc2V0dGluZ3MgVGhlIGJyb3dzZXIgc2V0dGluZ3MgdGhhdCBoYXZlIGJlZW4gcHJvdmlkZWQuXG4gKiBAcmV0dXJucyBhIHNldCBvZiB3aW5kb3cgcG9zaXRpb25pbmcgb3B0aW9ucy5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd1Bvc2l0aW9uT3B0aW9ucyhcblx0c2V0dGluZ3M/OiBCcm93c2VyUHJvdmlkZXJPcHRpb25zXG4pOiBQcm9taXNlPFdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucz4ge1xuXHRjb25zdCB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM6IFdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucyA9IHt9O1xuXHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMgPSB7fTtcblx0aWYgKCFpc0VtcHR5KHNldHRpbmdzKSkge1xuXHRcdHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5ID0gc2V0dGluZ3Mud2luZG93UG9zaXRpb25pbmdTdHJhdGVneTtcblx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGlzYWJsZVdpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kgPSBzZXR0aW5ncy5kaXNhYmxlV2luZG93UG9zaXRpb25pbmdTdHJhdGVneTtcblx0XHRpZiAoIWlzRW1wdHkoc2V0dGluZ3M/LmRlZmF1bHRXaW5kb3dPcHRpb25zPy5kZWZhdWx0TGVmdCkpIHtcblx0XHRcdHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy5sZWZ0ID0gc2V0dGluZ3MuZGVmYXVsdFdpbmRvd09wdGlvbnMuZGVmYXVsdExlZnQ7XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eShzZXR0aW5ncz8uZGVmYXVsdFdpbmRvd09wdGlvbnM/LmRlZmF1bHRUb3ApKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMudG9wID0gc2V0dGluZ3MuZGVmYXVsdFdpbmRvd09wdGlvbnMuZGVmYXVsdFRvcDtcblx0XHR9XG5cdH1cblx0aWYgKGlzRW1wdHkod2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRlZmF1bHRzLmxlZnQpIHx8IGlzRW1wdHkod2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRlZmF1bHRzLnRvcCkpIHtcblx0XHRjb25zdCBhcHAgPSBhd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudCgpO1xuXHRcdGNvbnN0IHBsYXRmb3JtTWFuaWZlc3Q6IE9wZW5GaW4uTWFuaWZlc3QgPSBhd2FpdCBhcHAuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAoIWlzRW1wdHkocGxhdGZvcm1NYW5pZmVzdD8ucGxhdGZvcm0/LmRlZmF1bHRXaW5kb3dPcHRpb25zPy5kZWZhdWx0TGVmdCkpIHtcblx0XHRcdHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy5sZWZ0ID0gcGxhdGZvcm1NYW5pZmVzdC5wbGF0Zm9ybS5kZWZhdWx0V2luZG93T3B0aW9ucy5kZWZhdWx0TGVmdDtcblx0XHR9XG5cdFx0aWYgKCFpc0VtcHR5KHBsYXRmb3JtTWFuaWZlc3Q/LnBsYXRmb3JtPy5kZWZhdWx0V2luZG93T3B0aW9ucz8uZGVmYXVsdFRvcCkpIHtcblx0XHRcdHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy50b3AgPSBwbGF0Zm9ybU1hbmlmZXN0LnBsYXRmb3JtLmRlZmF1bHRXaW5kb3dPcHRpb25zLmRlZmF1bHRUb3A7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM7XG59XG5cbi8qKlxuICogR2V0IHRoZSB3aW5kb3cgcG9zaXRpb24gdXNpbmcgYSBzdHJhdGVneS5cbiAqIEBwYXJhbSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHdpbmRvdyBwb3NpdGlvbmluZy5cbiAqIEBwYXJhbSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMud2luZG93UG9zaXRpb25pbmdTdHJhdGVneSBUaGUgc3RyYXRlZ3kgZm9yIHdpbmRvdyBwb3NpdGlvbmluZy5cbiAqIEBwYXJhbSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMud2luZG93UG9zaXRpb25pbmdTdHJhdGVneS54IFRoZSB4IGNvb3JkaW5hdGUuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kueSBUaGUgeSBjb29yZGluYXRlLlxuICogQHBhcmFtIHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kaXNhYmxlV2luZG93UG9zaXRpb25pbmdTdHJhdGVneSBXaGV0aGVyIHRvIGRpc2FibGUgdGhlIHdpbmRvdyBwb3NpdGlvbmluZyBzdHJhdGVneS5cbiAqIEBwYXJhbSByZWxhdGVkVG8gVGhlIHJlbGF0ZWQgbW9uaXRvciBvciBpZGVudGl0eSBvciB4L3kgcG9zaXRpb24uXG4gKiBAcmV0dXJucyBUaGUgeCBhbmQgeSBjb29yZGluYXRlcyBvZiB0aGUgd2luZG93IHBvc2l0aW9uLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0V2luZG93UG9zaXRpb25Vc2luZ1N0cmF0ZWd5KFxuXHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/OiBXaW5kb3dQb3NpdGlvbmluZ09wdGlvbnMsXG5cdHJlbGF0ZWRUbz86IE9wZW5GaW4uTW9uaXRvckRldGFpbHMgfCBPcGVuRmluLklkZW50aXR5IHwgeyB4OiBudW1iZXI7IHk6IG51bWJlciB9XG4pOiBQcm9taXNlPHsgbGVmdDogbnVtYmVyOyB0b3A6IG51bWJlciB9IHwgdW5kZWZpbmVkPiB7XG5cdGlmICh3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LmRpc2FibGVXaW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5ID09PSB0cnVlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGxldCB0YXJnZXRNb25pdG9yOiBPcGVuRmluLk1vbml0b3JEZXRhaWxzIHwgdW5kZWZpbmVkO1xuXG5cdGlmIChpc0VtcHR5KHJlbGF0ZWRUbykpIHtcblx0XHRjb25zdCBtb25pdG9ycyA9IGF3YWl0IGZpbi5TeXN0ZW0uZ2V0TW9uaXRvckluZm8oKTtcblx0XHR0YXJnZXRNb25pdG9yID0gbW9uaXRvcnMucHJpbWFyeU1vbml0b3I7XG5cdH0gZWxzZSBpZiAoIWlzRW1wdHkocmVsYXRlZFRvKSAmJiBcIm1vbml0b3JSZWN0XCIgaW4gcmVsYXRlZFRvKSB7XG5cdFx0dGFyZ2V0TW9uaXRvciA9IHJlbGF0ZWRUbztcblx0fSBlbHNlIGlmICghaXNFbXB0eShyZWxhdGVkVG8pICYmIFwieFwiIGluIHJlbGF0ZWRUbykge1xuXHRcdHRhcmdldE1vbml0b3IgPSBhd2FpdCBmaW5kTW9uaXRvckNvbnRhaW5pbmdQb2ludChyZWxhdGVkVG8pO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGJvdW5kcyA9IGF3YWl0IGdldElkZW50aXR5Qm91bmRzKHJlbGF0ZWRUbyk7XG5cdFx0aWYgKGlzRW1wdHkoYm91bmRzKSkge1xuXHRcdFx0Y29uc3QgbW9uaXRvcnMgPSBhd2FpdCBmaW4uU3lzdGVtLmdldE1vbml0b3JJbmZvKCk7XG5cdFx0XHR0YXJnZXRNb25pdG9yID0gbW9uaXRvcnMucHJpbWFyeU1vbml0b3I7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldE1vbml0b3IgPSBhd2FpdCBmaW5kTW9uaXRvckNvbnRhaW5pbmdQb2ludCh7IHg6IGJvdW5kcy5sZWZ0LCB5OiBib3VuZHMudG9wIH0pO1xuXHRcdH1cblx0fVxuXHRjb25zdCB3aW5kb3dEZWZhdWx0TGVmdCA9IHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucz8uZGVmYXVsdHM/LmxlZnQgPz8gMDtcblx0Y29uc3Qgd2luZG93RGVmYXVsdFRvcCA9IHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucz8uZGVmYXVsdHM/LnRvcCA/PyAwO1xuXG5cdC8vIEdldCB0aGUgYXZhaWxhYmxlIHJlY3QgZm9yIHRoZSBkaXNwbGF5IHNvIHdlIGNhbiB0YWtlIGluIHRvIGFjY291bnRcblx0Ly8gT1MgbWVudXMsIHRhc2sgYmFyIGV0Y1xuXHRjb25zdCBhdmFpbGFibGVMZWZ0ID0gdGFyZ2V0TW9uaXRvci5hdmFpbGFibGVSZWN0LmxlZnQ7XG5cdGNvbnN0IGF2YWlsYWJsZVRvcCA9IHRhcmdldE1vbml0b3IuYXZhaWxhYmxlUmVjdC50b3A7XG5cdGNvbnN0IHdpbmRvd09mZnNldHNYOiBudW1iZXIgPSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k/LnggPz8gMzA7XG5cdGNvbnN0IHdpbmRvd09mZnNldHNZOiBudW1iZXIgPSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k/LnkgPz8gMzA7XG5cdGNvbnN0IHdpbmRvd09mZnNldHNNYXhJbmNyZW1lbnRzOiBudW1iZXIgPVxuXHRcdHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucz8ud2luZG93UG9zaXRpb25pbmdTdHJhdGVneT8ubWF4SW5jcmVtZW50cyA/PyA4O1xuXHRjb25zdCB2aXNpYmxlV2luZG93cyA9IGF3YWl0IGdldEFsbFZpc2libGVXaW5kb3dzKCk7XG5cdC8vIEdldCB0aGUgdG9wIGxlZnQgYm91bmRzIGZvciBhbGwgdGhlIHZpc2libGUgd2luZG93c1xuXHRjb25zdCB0b3BMZWZ0Qm91bmRzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG5cdFx0dmlzaWJsZVdpbmRvd3MubWFwKGFzeW5jICh3aW4pID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IGJvdW5kcyA9IGF3YWl0IHdpbi5nZXRCb3VuZHMoKTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRsZWZ0OiBib3VuZHMubGVmdCxcblx0XHRcdFx0XHR0b3A6IGJvdW5kcy50b3AsXG5cdFx0XHRcdFx0cmlnaHQ6IGJvdW5kcy5sZWZ0ICsgd2luZG93T2Zmc2V0c1gsXG5cdFx0XHRcdFx0Ym90dG9tOiBib3VuZHMudG9wICsgd2luZG93T2Zmc2V0c1lcblx0XHRcdFx0fTtcblx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHQvLyByZXR1cm4gYSBkdW1teSBlbnRyeS5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRsZWZ0OiAwLFxuXHRcdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0XHRyaWdodDogMCxcblx0XHRcdFx0XHRib3R0b206IDBcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9KVxuXHQpO1xuXG5cdGxldCBtaW5Db3VudFZhbDogbnVtYmVyID0gMTAwMDtcblx0bGV0IG1pbkNvdW50SW5kZXggPSB3aW5kb3dPZmZzZXRzTWF4SW5jcmVtZW50cztcblxuXHQvLyBOb3cgc2VlIGhvdyBtYW55IHdpbmRvd3MgYXBwZWFyIGluIGVhY2ggaW5jcmVtZW50IHNsb3Rcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3dPZmZzZXRzTWF4SW5jcmVtZW50czsgaSsrKSB7XG5cdFx0Y29uc3QgeFBvcyA9IGkgKiB3aW5kb3dPZmZzZXRzWDtcblx0XHRjb25zdCB5UG9zID0gaSAqIHdpbmRvd09mZnNldHNZO1xuXHRcdGNvbnN0IGxlZnRQb3MgPSB3aW5kb3dEZWZhdWx0TGVmdCArIHhQb3M7XG5cdFx0Y29uc3QgdG9wUG9zID0gd2luZG93RGVmYXVsdFRvcCArIHlQb3M7XG5cdFx0Y29uc3QgZm91bmRXaW5zID0gdG9wTGVmdEJvdW5kcy5maWx0ZXIoXG5cdFx0XHQodG9wTGVmdFdpbkJvdW5kcykgPT5cblx0XHRcdFx0dG9wTGVmdFdpbkJvdW5kcy5sZWZ0ID49IGxlZnRQb3MgKyBhdmFpbGFibGVMZWZ0ICYmXG5cdFx0XHRcdHRvcExlZnRXaW5Cb3VuZHMucmlnaHQgPD0gbGVmdFBvcyArIHdpbmRvd09mZnNldHNYICsgYXZhaWxhYmxlTGVmdCAmJlxuXHRcdFx0XHR0b3BMZWZ0V2luQm91bmRzLnRvcCA+PSB0b3BQb3MgKyBhdmFpbGFibGVUb3AgJiZcblx0XHRcdFx0dG9wTGVmdFdpbkJvdW5kcy5ib3R0b20gPD0gdG9wUG9zICsgd2luZG93T2Zmc2V0c1kgKyBhdmFpbGFibGVUb3Bcblx0XHQpO1xuXHRcdC8vIElmIHRoaXMgc2xvdCBoYXMgbGVzcyB0aGFuIHRoZSBjdXJyZW50IG1pbmltdW0gdXNlIHRoaXMgc2xvdFxuXHRcdGlmIChmb3VuZFdpbnMubGVuZ3RoIDwgbWluQ291bnRWYWwpIHtcblx0XHRcdG1pbkNvdW50VmFsID0gZm91bmRXaW5zLmxlbmd0aDtcblx0XHRcdG1pbkNvdW50SW5kZXggPSBpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHhPZmZzZXQgPSBtaW5Db3VudEluZGV4ICogd2luZG93T2Zmc2V0c1g7XG5cdGNvbnN0IHggPSB3aW5kb3dEZWZhdWx0TGVmdCArIHhPZmZzZXQgKyBhdmFpbGFibGVMZWZ0O1xuXHRjb25zdCB5T2Zmc2V0ID0gbWluQ291bnRJbmRleCAqIHdpbmRvd09mZnNldHNZO1xuXHRjb25zdCB5ID0gd2luZG93RGVmYXVsdFRvcCArIHlPZmZzZXQgKyBhdmFpbGFibGVUb3A7XG5cblx0cmV0dXJuIHsgbGVmdDogeCwgdG9wOiB5IH07XG59XG5cbi8qKlxuICogR2V0IGEgbGlzdCBvZiBhbGwgdGhlIHZpc2libGUgd2luZG93cyBpbiB0aGUgcGxhdGZvcm0uXG4gKiBAcmV0dXJucyBUaGUgbGlzdCBvZiB2aXNpYmxlIHdpbmRvd3MuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxWaXNpYmxlV2luZG93cygpOiBQcm9taXNlPE9wZW5GaW4uV2luZG93W10+IHtcblx0Y29uc3QgcGxhdGZvcm0gPSBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtcblx0Y29uc3Qgd2luZG93cyA9IGF3YWl0IHBsYXRmb3JtLkFwcGxpY2F0aW9uLmdldENoaWxkV2luZG93cygpO1xuXHRjb25zdCBhdmFpbGFibGVXaW5kb3dzOiBPcGVuRmluLldpbmRvd1tdID0gW107XG5cdGZvciAoY29uc3QgY3VycmVudFdpbmRvdyBvZiB3aW5kb3dzKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGlzU2hvd2luZyA9IGF3YWl0IGN1cnJlbnRXaW5kb3cuaXNTaG93aW5nKCk7XG5cdFx0XHRpZiAoaXNTaG93aW5nKSB7XG5cdFx0XHRcdGF2YWlsYWJsZVdpbmRvd3MucHVzaChjdXJyZW50V2luZG93KTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIHtcblx0XHRcdC8vIGlmIHRoZSB3aW5kb3cgaXMgZGVzdHJveWVkIGJlZm9yZSBkZXRlcm1pbmluZyBpZiBpdCBpcyBzaG93aW5nIHRoZW5cblx0XHRcdC8vIHdlIHNob3VsZCBtb3ZlIHRvIHRoZSBuZXh0IHdpbmRvdyBidXQgbm90IHRocm93LlxuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXZhaWxhYmxlV2luZG93cztcbn1cbiIsIi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgdW5kZWZpbmVkIG9yIG51bGwuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudWxsIHwgdW5kZWZpbmVkIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG9iamVjdCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nIHRoYXQgaXMgbm90IGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyIHdpdGggYSByZWFsIHZhbHVlIGkuZS4gbm90IE5hTiBvciBJbmZpbml0ZS5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgIU51bWJlci5pc05hTih2YWx1ZSkgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBib29sZWFuLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgYm9vbGVhbiB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBpbnRlZ2VyLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIG51bWJlciB7XG5cdHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSk7XG59XG5cbi8qKlxuICogRGVlcCBjbG9uZSBhbiBvYmplY3QuXG4gKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyBUaGUgY2xvbmUgb2YgdGhlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdENsb25lPFQ+KG9iajogVCk6IFQge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuLyoqXG4gKiBEbyBhIGRlZXAgY29tcGFyaXNvbiBvZiB0aGUgb2JqZWN0cy5cbiAqIEBwYXJhbSBvYmoxIFRoZSBmaXJzdCBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSBvYmoyIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gbWF0Y2hQcm9wZXJ0eU9yZGVyIElmIHRydWUgdGhlIHByb3BlcnRpZXMgbXVzdCBiZSBpbiB0aGUgc2FtZSBvcmRlci5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIG9iamVjdHMgYXJlIHRoZSBzYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcEVxdWFsKG9iajE6IHVua25vd24sIG9iajI6IHVua25vd24sIG1hdGNoUHJvcGVydHlPcmRlcjogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcblx0aWYgKGlzT2JqZWN0KG9iajEpICYmIGlzT2JqZWN0KG9iajIpKSB7XG5cdFx0Y29uc3Qgb2JqS2V5czEgPSBPYmplY3Qua2V5cyhvYmoxKTtcblx0XHRjb25zdCBvYmpLZXlzMiA9IE9iamVjdC5rZXlzKG9iajIpO1xuXG5cdFx0aWYgKG9iaktleXMxLmxlbmd0aCAhPT0gb2JqS2V5czIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKG1hdGNoUHJvcGVydHlPcmRlciAmJiBKU09OLnN0cmluZ2lmeShvYmpLZXlzMSkgIT09IEpTT04uc3RyaW5naWZ5KG9iaktleXMyKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3Qga2V5IG9mIG9iaktleXMxKSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXHRcdFx0Y29uc3QgdmFsdWUxID0gKG9iajEgYXMgYW55KVtrZXldO1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMiA9IChvYmoyIGFzIGFueSlba2V5XTtcblxuXHRcdFx0aWYgKCFkZWVwRXF1YWwodmFsdWUxLCB2YWx1ZTIsIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iajEpICYmIEFycmF5LmlzQXJyYXkob2JqMikpIHtcblx0XHRpZiAob2JqMS5sZW5ndGggIT09IG9iajIubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqMS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFkZWVwRXF1YWwob2JqMVtpXSwgb2JqMltpXSwgbWF0Y2hQcm9wZXJ0eU9yZGVyKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKTtcbn1cblxuLyoqXG4gKiBEZWVwIG1lcmdlIHR3byBvYmplY3RzLlxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGJlIG1lcmdlZCBpbnRvLlxuICogQHBhcmFtIHNvdXJjZXMgVGhlIG9iamVjdHMgdG8gbWVyZ2UgaW50byB0aGUgdGFyZ2V0LlxuICogQHJldHVybnMgVGhlIG1lcmdlZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWVyZ2U8VCA9IHVua25vd24+KHRhcmdldDogVCwgLi4uc291cmNlczogVFtdKTogVCB7XG5cdGlmICghQXJyYXkuaXNBcnJheShzb3VyY2VzKSB8fCBzb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRjb25zdCB0YXJnZXRBc01hcCA9IHRhcmdldCBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRjb25zdCBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XG5cblx0bGV0IGtleXM7XG5cdGlmIChpc09iamVjdCh0YXJnZXRBc01hcCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG5cdFx0XHRyZXR1cm4gc291cmNlO1xuXHRcdH1cblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKS5tYXAoKGspID0+IE51bWJlci5wYXJzZUludChrLCAxMCkpO1xuXHR9XG5cblx0aWYgKGtleXMpIHtcblx0XHRjb25zdCBzb3VyY2VBc01hcCA9IHNvdXJjZSBhcyB7IFtpZDogc3RyaW5nXTogdW5rbm93biB9O1xuXHRcdGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gc291cmNlQXNNYXBba2V5XTtcblx0XHRcdGlmIChpc09iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0ge307XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXNNYXBba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVlcE1lcmdlKHRhcmdldEFzTWFwW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldEFzTWFwW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGVlcE1lcmdlKHRhcmdldCwgLi4uc291cmNlcyk7XG59XG5cbi8qKlxuICogUG9seWZpbGxzIHJhbmRvbVVVSUQgaWYgcnVubmluZyBpbiBhIG5vbi1zZWN1cmUgY29udGV4dC5cbiAqIEByZXR1cm5zIFRoZSByYW5kb20gVVVJRC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVVSUQoKTogc3RyaW5nIHtcblx0aWYgKFwicmFuZG9tVVVJRFwiIGluIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0cmV0dXJuIGdsb2JhbFRoaXMuY3J5cHRvLnJhbmRvbVVVSUQoKTtcblx0fVxuXHQvLyBQb2x5ZmlsbCB0aGUgd2luZG93LmNyeXB0by5yYW5kb21VVUlEIGlmIHdlIGFyZSBydW5uaW5nIGluIGEgbm9uIHNlY3VyZSBjb250ZXh0IHRoYXQgZG9lc24ndCBoYXZlIGl0XG5cdC8vIHdlIGFyZSBzdGlsbCB1c2luZyB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyB3aGljaCBpcyBhbHdheXMgYXZhaWxhYmxlXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMTE3NTIzLzI4MDAyMThcblx0LyoqXG5cdCAqIEdldCByYW5kb20gaGV4IHZhbHVlLlxuXHQgKiBAcGFyYW0gYyBUaGUgbnVtYmVyIHRvIGJhc2UgdGhlIHJhbmRvbSB2YWx1ZSBvbi5cblx0ICogQHJldHVybnMgVGhlIHJhbmRvbSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGdldFJhbmRvbUhleChjOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG5cdFx0Y29uc3Qgcm5kID0gZ2xvYmFsVGhpcy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmICgxNSA+PiAoTnVtYmVyKGMpIC8gNCkpO1xuXHRcdHJldHVybiAoXG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdFx0KE51bWJlcihjKSBeIHJuZCkudG9TdHJpbmcoMTYpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4gXCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLCBnZXRSYW5kb21IZXgpO1xufVxuXG4vKipcbiAqIEZvcm1hdCBhbiBlcnJvciB0byBhIHJlYWRhYmxlIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGZvcm1hdC5cbiAqIEByZXR1cm5zIFRoZSBmb3JtYXR0ZWQgZXJyb3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNFbXB0eShlcnIpKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH0gZWxzZSBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShlcnIpKSB7XG5cdFx0cmV0dXJuIGVycjtcblx0fSBlbHNlIGlmIChpc09iamVjdChlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiBpc1N0cmluZyhlcnIubWVzc2FnZSkpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQSBiYXNpYyBzdHJpbmcgc2FuaXRpemUgZnVuY3Rpb24gdGhhdCByZW1vdmVzIGFuZ2xlIGJyYWNrZXRzIDw+IGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gY29udGVudCB0aGUgY29udGVudCB0byBzYW5pdGl6ZVxuICogQHJldHVybnMgYSBzdHJpbmcgd2l0aG91dCBhbmdsZSBicmFja2V0cyA8PlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHJpbmcoY29udGVudDogdW5rbm93bik6IHN0cmluZyB7XG5cdGlmIChpc1N0cmluZ1ZhbHVlKGNvbnRlbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnRcblx0XHRcdC5yZXBsYWNlKC88W14+XSo+Py9nbSwgXCJcIilcblx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csIFwiPlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZsdDsvZywgXCI8XCIpXG5cdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgXCImXCIpXG5cdFx0XHQucmVwbGFjZSgvJm5ic3A7L2csIFwiIFwiKVxuXHRcdFx0LnJlcGxhY2UoL1xcblxccypcXG4vZywgXCJcXG5cIik7XG5cdH1cblx0cmV0dXJuIFwiXCI7XG59XG4iLCJpbXBvcnQgdHlwZSB7XG5cdEN1c3RvbUFjdGlvblBheWxvYWQsXG5cdEN1c3RvbUFjdGlvbnNNYXAsXG5cdFdvcmtzcGFjZVBsYXRmb3JtTW9kdWxlXG59IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2UtcGxhdGZvcm1cIjtcbmltcG9ydCB7IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUsIHR5cGUgQWN0aW9ucyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYWN0aW9ucy1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTGF1bmNoUHJlZmVyZW5jZSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHtcblx0RkFWT1JJVEVfVFlQRV9OQU1FX0FQUCxcblx0RkFWT1JJVEVfVFlQRV9OQU1FX1BBR0UsXG5cdEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UsXG5cdHR5cGUgRmF2b3JpdGVFbnRyeVxufSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2Zhdm9yaXRlLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIsIExvZ2dlckNyZWF0b3IgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgUG9wdXBNZW51RW50cnkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21lbnUtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcbmltcG9ydCB7IGdldFdpbmRvd1Bvc2l0aW9uVXNpbmdTdHJhdGVneSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlscy1wb3NpdGlvblwiO1xuaW1wb3J0IHR5cGUgeyBGYXZvcml0ZXNNZW51U2V0dGluZ3MgfSBmcm9tIFwiLi9zaGFwZXNcIjtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBmb3IgdGhlIGZhdm9yaXRlcyBtZW51IGFjdGlvbnMgcHJvdmlkZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBGYXZvcml0ZXNNZW51UHJvdmlkZXIgaW1wbGVtZW50cyBBY3Rpb25zPEZhdm9yaXRlc01lbnVTZXR0aW5ncz4ge1xuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBtZW51LlxuXHQgKiBAaW50ZXJuYWxcblx0ICovXG5cdHByaXZhdGUgX3NldHRpbmdzOiBGYXZvcml0ZXNNZW51U2V0dGluZ3MgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgdGhlIG1vZHVsZS5cblx0ICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgdGhlIG1vZHVsZSBmcm9tIGNvbmZpZ3VyYXRpb24gaW5jbHVkZSBjdXN0b20gb3B0aW9ucy5cblx0ICogQHBhcmFtIGxvZ2dlckNyZWF0b3IgRm9yIGxvZ2dpbmcgZW50cmllcy5cblx0ICogQHBhcmFtIGhlbHBlcnMgSGVscGVyIG1ldGhvZHMgZm9yIHRoZSBtb2R1bGUgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYXBwbGljYXRpb24gY29yZS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbml0aWFsaXplKFxuXHRcdGRlZmluaXRpb246IE1vZHVsZURlZmluaXRpb248RmF2b3JpdGVzTWVudVNldHRpbmdzPixcblx0XHRsb2dnZXJDcmVhdG9yOiBMb2dnZXJDcmVhdG9yLFxuXHRcdGhlbHBlcnM6IE1vZHVsZUhlbHBlcnNcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihcIkZhdm9yaXRlc01lbnVQcm92aWRlclwiKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblx0XHR0aGlzLl9zZXR0aW5ncyA9IGRlZmluaXRpb24uZGF0YTtcblxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgYWN0aW9ucyBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBwbGF0Zm9ybSBUaGUgcGxhdGZvcm0gbW9kdWxlLlxuXHQgKiBAcmV0dXJucyBUaGUgbWFwIG9mIGN1c3RvbSBhY3Rpb25zLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldChwbGF0Zm9ybTogV29ya3NwYWNlUGxhdGZvcm1Nb2R1bGUpOiBQcm9taXNlPEN1c3RvbUFjdGlvbnNNYXA+IHtcblx0XHRjb25zdCBhY3Rpb25NYXA6IEN1c3RvbUFjdGlvbnNNYXAgPSB7fTtcblxuXHRcdGFjdGlvbk1hcFtcImZhdm9yaXRlcy1tZW51XCJdID0gYXN5bmMgKHBheWxvYWQ6IEN1c3RvbUFjdGlvblBheWxvYWQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdGlmIChwYXlsb2FkLmNhbGxlclR5cGUgPT09IEN1c3RvbUFjdGlvbkNhbGxlclR5cGUuQ3VzdG9tQnV0dG9uICYmIHRoaXMuX2hlbHBlcnMpIHtcblx0XHRcdFx0Y29uc3QgZ2V0Q2xpZW50ID0gdGhpcy5faGVscGVycz8uZ2V0RmF2b3JpdGVDbGllbnQ7XG5cdFx0XHRcdGlmICghaXNFbXB0eShnZXRDbGllbnQpKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0Q2xpZW50KCk7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGNsaWVudCkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGZhdkluZm8gPSBjbGllbnQuZ2V0SW5mbygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgbWVudUVudHJpZXM6IFBvcHVwTWVudUVudHJ5PEZhdm9yaXRlRW50cnk+W10gPSBbXTtcblxuXHRcdFx0XHRcdFx0aWYgKGZhdkluZm8uZW5hYmxlZFR5cGVzKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBoYWRFbnRyaWVzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgdHlwZSBvZiBmYXZJbmZvLmVuYWJsZWRUeXBlcykge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHNhdmVkID0gYXdhaXQgY2xpZW50LmdldFNhdmVkRmF2b3JpdGVzKHR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzYXZlZCAmJiBzYXZlZC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoaGFkRW50cmllcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtZW51RW50cmllcy5wdXNoKHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0c2F2ZWQuc29ydCgoZjEsIGYyKSA9PiAoZjEubGFiZWwgPz8gXCJcIikubG9jYWxlQ29tcGFyZShmMi5sYWJlbCA/PyBcIlwiKSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdGZvciAoY29uc3QgZW50cnkgb2Ygc2F2ZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bWVudUVudHJpZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6IGVudHJ5LmxhYmVsID8/IFwiXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWNvbjogZW50cnkuaWNvbixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhOiBlbnRyeVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGhhZEVudHJpZXMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRjb25zdCBtZW51Q2xpZW50ID0gYXdhaXQgdGhpcy5faGVscGVycy5nZXRNZW51Q2xpZW50KCk7XG5cdFx0XHRcdFx0XHRjb25zdCBwb3B1cE1lbnVTdHlsZSA9IHRoaXMuX3NldHRpbmdzPy5wb3B1cE1lbnVTdHlsZSA/PyBtZW51Q2xpZW50LmdldFBvcHVwTWVudVN0eWxlKCk7XG5cblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1lbnVDbGllbnQuc2hvd1BvcHVwTWVudTxGYXZvcml0ZUVudHJ5Pihcblx0XHRcdFx0XHRcdFx0eyB4OiBwYXlsb2FkLngsIHk6IDQ4IH0sXG5cdFx0XHRcdFx0XHRcdHBheWxvYWQud2luZG93SWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFwiVGhlcmUgYXJlIG5vIGZhdm9yaXRlc1wiLFxuXHRcdFx0XHRcdFx0XHRtZW51RW50cmllcyxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHBvcHVwTWVudVN0eWxlXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGlmIChpc0VtcHR5KHJlc3VsdCkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRmF2b3JpdGVzIE1lbnUgRGlzbWlzc2VkXCIpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9nZ2VyPy5pbmZvKFwiRmF2b3JpdGVzIE1lbnUgSXRlbSBTZWxlY3RlZFwiLCByZXN1bHQpO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQudHlwZSA9PT0gRkFWT1JJVEVfVFlQRV9OQU1FX0FQUCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh0aGlzLl9oZWxwZXJzPy5sYXVuY2hBcHApKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgbGF1bmNoUHJlZmVyZW5jZTogTGF1bmNoUHJlZmVyZW5jZSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGJvdW5kcyA9IGF3YWl0IGdldFdpbmRvd1Bvc2l0aW9uVXNpbmdTdHJhdGVneShcblx0XHRcdFx0XHRcdFx0XHRcdFx0dW5kZWZpbmVkLCAvLyBnbyB3aXRoIGRlZmF1bHRzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBheWxvYWQud2luZG93SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoYm91bmRzKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsYXVuY2hQcmVmZXJlbmNlID0geyBib3VuZHMgfTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2hlbHBlcnM/LmxhdW5jaEFwcChyZXN1bHQudHlwZUlkLCBsYXVuY2hQcmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9QQUdFKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2hlbHBlcnM/LmxhdW5jaFBhZ2UpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhd2FpdCB0aGlzLl9oZWxwZXJzPy5sYXVuY2hQYWdlKHJlc3VsdC50eXBlSWQsIHVuZGVmaW5lZCwgdGhpcy5fbG9nZ2VyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09IEZBVk9SSVRFX1RZUEVfTkFNRV9XT1JLU1BBQ0UpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5faGVscGVycz8ubGF1bmNoV29ya3NwYWNlKHJlc3VsdC50eXBlSWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9sb2dnZXI/LmluZm8oYEZhdm9yaXRlcyBUeXBlICR7cmVzdWx0LnR5cGV9IG5vIHlldCBzdXBwb3J0ZWRgLCByZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY3Rpb25NYXA7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgeyBNb2R1bGVJbXBsZW1lbnRhdGlvbiwgTW9kdWxlVHlwZXMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IEZhdm9yaXRlc01lbnVQcm92aWRlciB9IGZyb20gXCIuL2FjdGlvbnNcIjtcblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVudHJ5IHBvaW50cyBmb3IgdGhlIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudHJ5UG9pbnRzOiB7IFt0eXBlIGluIE1vZHVsZVR5cGVzXT86IE1vZHVsZUltcGxlbWVudGF0aW9uIH0gPSB7XG5cdGFjdGlvbnM6IG5ldyBGYXZvcml0ZXNNZW51UHJvdmlkZXIoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==