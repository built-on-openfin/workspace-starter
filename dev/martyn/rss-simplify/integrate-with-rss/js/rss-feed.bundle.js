/******/ var __webpack_modules__ = ({

/***/ "./client/src/shapes.ts":
/*!******************************!*\
  !*** ./client/src/shapes.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHANNEL_ACTIONS": () => (/* binding */ CHANNEL_ACTIONS),
/* harmony export */   "RSS_APP_CHANNEL_NAME": () => (/* binding */ RSS_APP_CHANNEL_NAME),
/* harmony export */   "RSS_WINDOW_NAME": () => (/* binding */ RSS_WINDOW_NAME)
/* harmony export */ });
/**
 * The RSS feed channel name.
 */
const RSS_APP_CHANNEL_NAME = "rss-feed";
/**
 * The RSS feed main window name.
 */
const RSS_WINDOW_NAME = "internal-generated-window-rss-feed";
/**
 * The interop channel actions.
 */
const CHANNEL_ACTIONS = {
    feedSubscribe: "feed-subscribe",
    feedUpdate: "feed-update"
};


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
/*!********************************!*\
  !*** ./client/src/rss-feed.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes */ "./client/src/shapes.ts");

/**
 * This code is for the rss-view.html that gets launched when you view a whole RSS feed.
 */
window.addEventListener("DOMContentLoaded", async () => initialize());
/**
 * Initialize the connection to the inter application bus.
 */
async function initialize() {
    const url = new URL(window.location.href);
    const feedId = url.searchParams.get("feedId");
    if (!feedId) {
        console.error("No feedId was passed as a query param");
    }
    const channel = await fin.InterApplicationBus.Channel.connect(_shapes__WEBPACK_IMPORTED_MODULE_0__.RSS_APP_CHANNEL_NAME);
    channel.register(_shapes__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_ACTIONS.feedUpdate, async (unknownPayload) => {
        const payload = unknownPayload;
        if (payload?.feed) {
            await updateFeed(payload?.feed);
        }
    });
    await channel.dispatch(_shapes__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_ACTIONS.feedSubscribe, {
        feedId
    });
}
/**
 * Update the feed in the DOM.
 * @param feed The feed to display in the DOM.
 */
async function updateFeed(feed) {
    if (feed.title) {
        document.title = feed.title;
        const titleElem = document.querySelector("#feed-title");
        if (titleElem) {
            titleElem.textContent = feed.title;
        }
        const entries = [];
        for (const entry in feed.entries) {
            entries.push(feed.entries[entry]);
        }
        entries.sort((a, b) => b.lastUpdated - a.lastUpdated);
        const feedContainer = document.querySelector("#feed-container");
        if (feedContainer) {
            feedContainer.innerHTML = "";
            for (const entry of entries) {
                const entryContainer = document.createElement("div");
                entryContainer.classList.add("row");
                entryContainer.classList.add("gap20");
                const textContainer = document.createElement("div");
                textContainer.classList.add("fill");
                textContainer.classList.add("col");
                textContainer.classList.add("left");
                textContainer.classList.add("gap10");
                textContainer.classList.add("overflow-hidden");
                const title = document.createElement("h4");
                title.textContent = entry.title;
                const date = document.createElement("p");
                date.textContent = new Date(entry.lastUpdated).toLocaleString();
                const description = document.createElement("p");
                description.textContent =
                    entry.description.length > 200 ? `${entry.description.slice(0, 200)}...` : entry.description;
                const view = document.createElement("button");
                view.textContent = "View";
                view.addEventListener("click", async () => {
                    const platform = fin.Platform.getCurrentSync();
                    await platform.createView({ url: entry.url }, { uuid: platform.identity.uuid, name: _shapes__WEBPACK_IMPORTED_MODULE_0__.RSS_WINDOW_NAME });
                });
                textContainer.append(title);
                textContainer.append(date);
                textContainer.append(description);
                textContainer.append(view);
                const imageContainer = document.createElement("div");
                imageContainer.style.display = "flex";
                imageContainer.style.flex = "0 0 200px";
                if (entry.thumbnailUrl) {
                    const thumbnail = document.createElement("img");
                    thumbnail.src = entry.thumbnailUrl;
                    thumbnail.style.width = "100%";
                    imageContainer.append(thumbnail);
                }
                entryContainer.append(textContainer);
                entryContainer.append(imageContainer);
                feedContainer.append(entryContainer);
            }
        }
    }
}

})();


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztvQkFDbkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO29CQUMvQixjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNqQztnQkFFRCxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNyQyxjQUFjLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUV0QyxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0Q7S0FDRDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtcnNzLy4vY2xpZW50L3NyYy9zaGFwZXMudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXJzcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtcnNzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtcnNzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXJzcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1yc3MvLi9jbGllbnQvc3JjL3Jzcy1mZWVkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuLyoqXG4gKiBEZWZpbml0aW9uIG9mIHRoZSBjdXN0b20gc2V0dGluZ3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDdXN0b21TZXR0aW5ncyB7XG5cdC8qKlxuXHQgKiBUaGUgc2V0dGluZ3MgZm9yIFJTUy5cblx0ICovXG5cdHJzcz86IFJzc1NldHRpbmdzO1xufVxuXG4vKipcbiAqIFRoZSBzZXR0aW5ncyBmb3IgdGhlIFJTUyBpbnRlZ3JhdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NTZXR0aW5ncyB7XG5cdC8qKlxuXHQgKiBJY29ucyBmb3IgZGlzcGxheS5cblx0ICovXG5cdGljb25zOiB7XG5cdFx0W2lkOiBzdHJpbmddOiBzdHJpbmc7XG5cdH07XG5cdC8qKlxuXHQgKiBUaGUgdXJsIGZvciB0aGUgcHJveHkuXG5cdCAqL1xuXHRwcm94eVVybDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgdmlldyB0byBsYXVuY2ggZm9yIGEgZmVlZC5cblx0ICovXG5cdGZlZWRWaWV3OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFRoZSBmZWVkcyB0byBtb25pdG9yLlxuXHQgKi9cblx0ZmVlZHM6IFJzc0ZlZWRTZXR0aW5nc1tdO1xuXG5cdC8qKlxuXHQgKiBJbnRlcnZhbCBmb3IgcG9sbGluZyB0aGUgZmVlZHMuXG5cdCAqL1xuXHRwb2xsaW5nSW50ZXJ2YWw/OiBudW1iZXI7XG59XG5cbi8qKlxuICogU2V0dGluZ3MgZm9yIGEgZmVlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NGZWVkU2V0dGluZ3Mge1xuXHQvKipcblx0ICogVGhlIGZlZWQgaWQuXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgdXJsIGZvciB0aGUgZmVlZC5cblx0ICovXG5cdHVybDogc3RyaW5nO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGNvbWJpbmVkIHR5cGUgZm9yIGFsbCB0aGUgbGF5b3V0IGl0ZW1zLlxuICovXG5leHBvcnQgdHlwZSBMYXlvdXRJdGVtRXh0ZW5kZWQgPVxuXHR8IE9wZW5GaW4uTGF5b3V0SXRlbUNvbmZpZ1xuXHR8IE9wZW5GaW4uTGF5b3V0Um93XG5cdHwgT3BlbkZpbi5MYXlvdXRDb2x1bW5cblx0fCBPcGVuRmluLkxheW91dENvbXBvbmVudDtcblxuLyoqXG4gKiBBIGxpbmsgaW4gYSBSU1MgaXRlbS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NMaW5rIHtcblx0LyoqXG5cdCAqIFRoZSBocmVmIGZvciB0aGUgbGluay5cblx0ICovXG5cdGhyZWY/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgcmVsIHR5cGUgZm9yIHRoZSBsaW5rLlxuXHQgKi9cblx0cmVsPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFRoZSBhdXRob3IgaWYgdGhlIGZlZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzQXV0aG9yIHtcblx0LyoqXG5cdCAqIFRoZSBuYW1lIG9mIHRoZSBhdXRob3IuXG5cdCAqL1xuXHRuYW1lPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHJlc291cmNlIGxvY2F0b3IgZm9yIHRoZSBhdXRob3IuXG5cdCAqL1xuXHR1cmk/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gZW50cnkgaW4gYW4gUlNTIGZlZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzRmVlZEVudHJ5IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgZW50cnkuXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGd1aWQgZm9yIHRoZSBlbnRyeS5cblx0ICovXG5cdGd1aWQ/OiB7XG5cdFx0aXNQZXJtYWxpbms6IHN0cmluZztcblx0XHRcIiN0ZXh0XCI6IHN0cmluZztcblx0fTtcblx0LyoqXG5cdCAqIFRoZSB0aXRsZS5cblx0ICovXG5cdHRpdGxlPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGxpbmsgdG8gdGhlIGZlZWQgaXRlbS5cblx0ICovXG5cdGxpbms/OiBSc3NMaW5rIHwgc3RyaW5nO1xuXHQvKipcblx0ICogRGVzY3JpcHRpb24gZm9yIHRoZSBpdGVtLlxuXHQgKi9cblx0ZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgYXV0aG9yIG9mIHRoZSBpdGVtLlxuXHQgKi9cblx0YXV0aG9yPzogUnNzQXV0aG9yO1xuXHQvKipcblx0ICogVGhlIHB1Ymxpc2hlZCBkYXRlIG9mIHRoZSBpdGVtLlxuXHQgKi9cblx0cHViRGF0ZT86IHN0cmluZztcblx0LyoqXG5cdCAqIEFsdGVybmF0ZSBwdWJsaXNoZWQgZGF0ZSBmb3IgdGhlIGl0ZW0uXG5cdCAqL1xuXHRwdWJsaXNoZWQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBXaGVuIHRoZSBpdGVtIHdhcyB1cGRhdGVkLlxuXHQgKi9cblx0dXBkYXRlZD86IHN0cmluZztcblx0LyoqXG5cdCAqIE1lZGlhIGl0ZW1zIHN1Y2ggYXMgaW1hZ2VzLlxuXHQgKi9cblx0XCJtZWRpYTpncm91cFwiPzoge1xuXHRcdFwibWVkaWE6dGl0bGVcIj86IHN0cmluZztcblx0XHRcIm1lZGlhOmRlc2NyaXB0aW9uXCI/OiBzdHJpbmc7XG5cdFx0XCJtZWRpYTpjb250ZW50XCI/OiB7XG5cdFx0XHR1cmw6IHN0cmluZztcblx0XHRcdHR5cGU6IHN0cmluZztcblx0XHRcdHdpZHRoOiBzdHJpbmc7XG5cdFx0XHRoZWlnaHQ6IHN0cmluZztcblx0XHR9O1xuXHRcdFwibWVkaWE6dGh1bWJuYWlsXCI/OiB7XG5cdFx0XHR1cmw6IHN0cmluZztcblx0XHRcdHdpZHRoOiBzdHJpbmc7XG5cdFx0XHRoZWlnaHQ6IHN0cmluZztcblx0XHR9O1xuXHR9O1xufVxuXG4vKipcbiAqIERldGFpbHMgZm9yIHRoZSBmZWVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0ZlZWREZXRhaWxzIHtcblx0LyoqXG5cdCAqIFRoZSBmZWVkIGlkLlxuXHQgKi9cblx0aWQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaXRsZSBvZiB0aGUgZmVlZC5cblx0ICovXG5cdHRpdGxlPzogc3RyaW5nO1xuXHQvKipcblx0ICogRGVzY3JpcHRpb24gb2YgdGhlIGZlZWQuXG5cdCAqL1xuXHRkZXNjcmlwdGlvbj86IHN0cmluZztcblx0LyoqXG5cdCAqIEF1dGhvciBvZiB0aGUgZmVlZC5cblx0ICovXG5cdGF1dGhvcj86IFJzc0F1dGhvcjtcblx0LyoqXG5cdCAqIExpbmsgdG8gdGhlIGZlZWQgY29udGVudC5cblx0ICovXG5cdGxpbms/OiBSc3NMaW5rIHwgc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGRhdGUgb2YgdGhlIGZlZWQgcHVibGlzaC5cblx0ICovXG5cdHB1Ymxpc2hlZD86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBwdWJsaXNoZWQgZGF0ZSBvZiB0aGUgZmVlZC5cblx0ICovXG5cdHB1YkRhdGU/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgZW50cmllcyBpbiB0aGUgZmVlZC5cblx0ICovXG5cdGVudHJ5PzogUnNzRmVlZEVudHJ5W107XG5cdC8qKlxuXHQgKiBBbHRlcm5hdGUgaXRlbXMgaW4gdGhlIGZlZWQuXG5cdCAqL1xuXHRpdGVtPzogUnNzRmVlZEVudHJ5W107XG59XG5cbi8qKlxuICogRmVlZCBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzRmVlZCB7XG5cdC8qKlxuXHQgKiBUaGUgZmVlZCBkZXRhaWxzLlxuXHQgKi9cblx0ZmVlZD86IFJzc0ZlZWREZXRhaWxzO1xuXHQvKipcblx0ICogVGhlIFJTUyBoZWFkZXIuXG5cdCAqL1xuXHRyc3M/OiB7XG5cdFx0Y2hhbm5lbD86IFJzc0ZlZWREZXRhaWxzO1xuXHR9O1xufVxuXG4vKipcbiAqIFRoZSBjYWNoZSBvZiBhbGwgdGhlIGZlZWRzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0NhY2hlIHtcblx0W2lkOiBzdHJpbmddOiBSc3NGZWVkQ2FjaGU7XG59XG5cbi8qKlxuICogVGhlIGNhY2hlIGZvciBhIGZlZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzRmVlZENhY2hlIHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgZmVlZC5cblx0ICovXG5cdGlkOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdGl0bGUgb2YgdGhlIGZlZWQuXG5cdCAqL1xuXHR0aXRsZTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBmZWVkLlxuXHQgKi9cblx0ZGVzY3JpcHRpb246IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBlbnRyaWVzIGluIHRoZSBmZWVkLlxuXHQgKi9cblx0ZW50cmllczogeyBbZW50cnlJZDogc3RyaW5nXTogUnNzRmVlZENhY2hlRW50cnkgfTtcbn1cblxuLyoqXG4gKiBDYWNoZSBlbnRyeSBmb3IgcHJvY2Vzc2VkIGl0ZW1zLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0ZlZWRDYWNoZUVudHJ5IHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgY2FjaGVkIGl0ZW0uXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHRpdGxlIG9mIHRoZSBjYWNoZWQgaXRlbS5cblx0ICovXG5cdHRpdGxlOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGNhY2hlZCBpdGVtLlxuXHQgKi9cblx0ZGVzY3JpcHRpb246IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSB1cmwgZm9yIHRoZSBjYWNoZWQgaXRlbS5cblx0ICovXG5cdHVybDogc3RyaW5nO1xuXHQvKipcblx0ICogT3B0aW9uYWwgdGh1bWJuYWlsLlxuXHQgKi9cblx0dGh1bWJuYWlsVXJsPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGltZXN0YW1wIHRoZSBpdGVtIHdhcyBsYXN0IHVwZGF0ZWQuXG5cdCAqL1xuXHRsYXN0VXBkYXRlZDogbnVtYmVyO1xufVxuXG4vKipcbiAqIFRoZSBSU1MgZmVlZCBjaGFubmVsIG5hbWUuXG4gKi9cbmV4cG9ydCBjb25zdCBSU1NfQVBQX0NIQU5ORUxfTkFNRSA9IFwicnNzLWZlZWRcIjtcblxuLyoqXG4gKiBUaGUgUlNTIGZlZWQgbWFpbiB3aW5kb3cgbmFtZS5cbiAqL1xuZXhwb3J0IGNvbnN0IFJTU19XSU5ET1dfTkFNRSA9IFwiaW50ZXJuYWwtZ2VuZXJhdGVkLXdpbmRvdy1yc3MtZmVlZFwiO1xuXG4vKipcbiAqIFRoZSBpbnRlcm9wIGNoYW5uZWwgYWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IENIQU5ORUxfQUNUSU9OUyA9IHtcblx0ZmVlZFN1YnNjcmliZTogXCJmZWVkLXN1YnNjcmliZVwiLFxuXHRmZWVkVXBkYXRlOiBcImZlZWQtdXBkYXRlXCJcbn07XG5cbi8qKlxuICogUGF5bG9hZCBmb3IgdGhlIGNoYW5uZWwgc3Vic2NyaWJlIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NDaGFubmVsRmVlZFN1YnNjcmliZVBheWxvYWQge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBmZWVkIGJlaW5nIHN1YnNjcmliZWQuXG5cdCAqL1xuXHRmZWVkSWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBQYXlsb2FkIGZvciB0aGUgY2hhbm5lbCB1cGRhdGUgYWN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0NoYW5uZWxGZWVkVXBkYXRlUGF5bG9hZCB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIGZlZWQgYmVpbmcgdXBkYXRlZC5cblx0ICovXG5cdGZlZWQ6IFJzc0ZlZWRDYWNoZTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcblx0Q0hBTk5FTF9BQ1RJT05TLFxuXHRSU1NfQVBQX0NIQU5ORUxfTkFNRSxcblx0UlNTX1dJTkRPV19OQU1FLFxuXHR0eXBlIFJzc0NoYW5uZWxGZWVkVXBkYXRlUGF5bG9hZCxcblx0dHlwZSBSc3NGZWVkQ2FjaGVcbn0gZnJvbSBcIi4vc2hhcGVzXCI7XG5cbi8qKlxuICogVGhpcyBjb2RlIGlzIGZvciB0aGUgcnNzLXZpZXcuaHRtbCB0aGF0IGdldHMgbGF1bmNoZWQgd2hlbiB5b3UgdmlldyBhIHdob2xlIFJTUyBmZWVkLlxuICovXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4gaW5pdGlhbGl6ZSgpKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBpbnRlciBhcHBsaWNhdGlvbiBidXMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG5cdGNvbnN0IGZlZWRJZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiZmVlZElkXCIpO1xuXG5cdGlmICghZmVlZElkKSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIk5vIGZlZWRJZCB3YXMgcGFzc2VkIGFzIGEgcXVlcnkgcGFyYW1cIik7XG5cdH1cblxuXHRjb25zdCBjaGFubmVsID0gYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KFJTU19BUFBfQ0hBTk5FTF9OQU1FKTtcblxuXHRjaGFubmVsLnJlZ2lzdGVyKENIQU5ORUxfQUNUSU9OUy5mZWVkVXBkYXRlLCBhc3luYyAodW5rbm93blBheWxvYWQpID0+IHtcblx0XHRjb25zdCBwYXlsb2FkID0gdW5rbm93blBheWxvYWQgYXMgUnNzQ2hhbm5lbEZlZWRVcGRhdGVQYXlsb2FkO1xuXHRcdGlmIChwYXlsb2FkPy5mZWVkKSB7XG5cdFx0XHRhd2FpdCB1cGRhdGVGZWVkKHBheWxvYWQ/LmZlZWQpO1xuXHRcdH1cblx0fSk7XG5cblx0YXdhaXQgY2hhbm5lbC5kaXNwYXRjaChDSEFOTkVMX0FDVElPTlMuZmVlZFN1YnNjcmliZSwge1xuXHRcdGZlZWRJZFxuXHR9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIGZlZWQgaW4gdGhlIERPTS5cbiAqIEBwYXJhbSBmZWVkIFRoZSBmZWVkIHRvIGRpc3BsYXkgaW4gdGhlIERPTS5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlRmVlZChmZWVkOiBSc3NGZWVkQ2FjaGUpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGZlZWQudGl0bGUpIHtcblx0XHRkb2N1bWVudC50aXRsZSA9IGZlZWQudGl0bGU7XG5cdFx0Y29uc3QgdGl0bGVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmZWVkLXRpdGxlXCIpO1xuXHRcdGlmICh0aXRsZUVsZW0pIHtcblx0XHRcdHRpdGxlRWxlbS50ZXh0Q29udGVudCA9IGZlZWQudGl0bGU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZW50cmllcyA9IFtdO1xuXHRcdGZvciAoY29uc3QgZW50cnkgaW4gZmVlZC5lbnRyaWVzKSB7XG5cdFx0XHRlbnRyaWVzLnB1c2goZmVlZC5lbnRyaWVzW2VudHJ5XSk7XG5cdFx0fVxuXHRcdGVudHJpZXMuc29ydCgoYSwgYikgPT4gYi5sYXN0VXBkYXRlZCAtIGEubGFzdFVwZGF0ZWQpO1xuXG5cdFx0Y29uc3QgZmVlZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmVlZC1jb250YWluZXJcIik7XG5cdFx0aWYgKGZlZWRDb250YWluZXIpIHtcblx0XHRcdGZlZWRDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuXHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG5cdFx0XHRcdGNvbnN0IGVudHJ5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0ZW50cnlDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcblx0XHRcdFx0ZW50cnlDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImdhcDIwXCIpO1xuXG5cdFx0XHRcdGNvbnN0IHRleHRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmaWxsXCIpO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2xcIik7XG5cdFx0XHRcdHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImxlZnRcIik7XG5cdFx0XHRcdHRleHRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImdhcDEwXCIpO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJvdmVyZmxvdy1oaWRkZW5cIik7XG5cblx0XHRcdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XG5cdFx0XHRcdHRpdGxlLnRleHRDb250ZW50ID0gZW50cnkudGl0bGU7XG5cblx0XHRcdFx0Y29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0XHRkYXRlLnRleHRDb250ZW50ID0gbmV3IERhdGUoZW50cnkubGFzdFVwZGF0ZWQpLnRvTG9jYWxlU3RyaW5nKCk7XG5cblx0XHRcdFx0Y29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdFx0ZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPVxuXHRcdFx0XHRcdGVudHJ5LmRlc2NyaXB0aW9uLmxlbmd0aCA+IDIwMCA/IGAke2VudHJ5LmRlc2NyaXB0aW9uLnNsaWNlKDAsIDIwMCl9Li4uYCA6IGVudHJ5LmRlc2NyaXB0aW9uO1xuXG5cdFx0XHRcdGNvbnN0IHZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0XHR2aWV3LnRleHRDb250ZW50ID0gXCJWaWV3XCI7XG5cdFx0XHRcdHZpZXcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRjb25zdCBwbGF0Zm9ybSA9IGZpbi5QbGF0Zm9ybS5nZXRDdXJyZW50U3luYygpO1xuXHRcdFx0XHRcdGF3YWl0IHBsYXRmb3JtLmNyZWF0ZVZpZXcoXG5cdFx0XHRcdFx0XHR7IHVybDogZW50cnkudXJsIH0sXG5cdFx0XHRcdFx0XHR7IHV1aWQ6IHBsYXRmb3JtLmlkZW50aXR5LnV1aWQsIG5hbWU6IFJTU19XSU5ET1dfTkFNRSB9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGV4dENvbnRhaW5lci5hcHBlbmQodGl0bGUpO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmFwcGVuZChkYXRlKTtcblx0XHRcdFx0dGV4dENvbnRhaW5lci5hcHBlbmQoZGVzY3JpcHRpb24pO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmFwcGVuZCh2aWV3KTtcblxuXHRcdFx0XHRjb25zdCBpbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGltYWdlQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblx0XHRcdFx0aW1hZ2VDb250YWluZXIuc3R5bGUuZmxleCA9IFwiMCAwIDIwMHB4XCI7XG5cblx0XHRcdFx0aWYgKGVudHJ5LnRodW1ibmFpbFVybCkge1xuXHRcdFx0XHRcdGNvbnN0IHRodW1ibmFpbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cdFx0XHRcdFx0dGh1bWJuYWlsLnNyYyA9IGVudHJ5LnRodW1ibmFpbFVybDtcblx0XHRcdFx0XHR0aHVtYm5haWwuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHRcdFx0XHRpbWFnZUNvbnRhaW5lci5hcHBlbmQodGh1bWJuYWlsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVudHJ5Q29udGFpbmVyLmFwcGVuZCh0ZXh0Q29udGFpbmVyKTtcblx0XHRcdFx0ZW50cnlDb250YWluZXIuYXBwZW5kKGltYWdlQ29udGFpbmVyKTtcblxuXHRcdFx0XHRmZWVkQ29udGFpbmVyLmFwcGVuZChlbnRyeUNvbnRhaW5lcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=