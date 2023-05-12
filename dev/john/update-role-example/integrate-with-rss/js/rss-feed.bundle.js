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


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQ25DLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztvQkFDL0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDakM7Z0JBRUQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFFdEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNyQztTQUNEO0tBQ0Q7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXJzcy8uL2NsaWVudC9zcmMvc2hhcGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1yc3Mvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXJzcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWludGVncmF0ZS13aXRoLXJzcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1pbnRlZ3JhdGUtd2l0aC1yc3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0taW50ZWdyYXRlLXdpdGgtcnNzLy4vY2xpZW50L3NyYy9yc3MtZmVlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5cbi8qKlxuICogRGVmaW5pdGlvbiBvZiB0aGUgY3VzdG9tIHNldHRpbmdzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tU2V0dGluZ3Mge1xuXHQvKipcblx0ICogVGhlIHNldHRpbmdzIGZvciBSU1MuXG5cdCAqL1xuXHRyc3M/OiBSc3NTZXR0aW5ncztcbn1cblxuLyoqXG4gKiBUaGUgc2V0dGluZ3MgZm9yIHRoZSBSU1MgaW50ZWdyYXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzU2V0dGluZ3Mge1xuXHQvKipcblx0ICogSWNvbnMgZm9yIGRpc3BsYXkuXG5cdCAqL1xuXHRpY29uczoge1xuXHRcdFtpZDogc3RyaW5nXTogc3RyaW5nO1xuXHR9O1xuXHQvKipcblx0ICogVGhlIHVybCBmb3IgdGhlIHByb3h5LlxuXHQgKi9cblx0cHJveHlVcmw6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHZpZXcgdG8gbGF1bmNoIGZvciBhIGZlZWQuXG5cdCAqL1xuXHRmZWVkVmlldzogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBUaGUgZmVlZHMgdG8gbW9uaXRvci5cblx0ICovXG5cdGZlZWRzOiBSc3NGZWVkU2V0dGluZ3NbXTtcblxuXHQvKipcblx0ICogSW50ZXJ2YWwgZm9yIHBvbGxpbmcgdGhlIGZlZWRzLlxuXHQgKi9cblx0cG9sbGluZ0ludGVydmFsPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFNldHRpbmdzIGZvciBhIGZlZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzRmVlZFNldHRpbmdzIHtcblx0LyoqXG5cdCAqIFRoZSBmZWVkIGlkLlxuXHQgKi9cblx0aWQ6IHN0cmluZztcblxuXHQvKipcblx0ICogVGhlIHVybCBmb3IgdGhlIGZlZWQuXG5cdCAqL1xuXHR1cmw6IHN0cmluZztcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBjb21iaW5lZCB0eXBlIGZvciBhbGwgdGhlIGxheW91dCBpdGVtcy5cbiAqL1xuZXhwb3J0IHR5cGUgTGF5b3V0SXRlbUV4dGVuZGVkID1cblx0fCBPcGVuRmluLkxheW91dEl0ZW1Db25maWdcblx0fCBPcGVuRmluLkxheW91dFJvd1xuXHR8IE9wZW5GaW4uTGF5b3V0Q29sdW1uXG5cdHwgT3BlbkZpbi5MYXlvdXRDb21wb25lbnQ7XG5cbi8qKlxuICogQSBsaW5rIGluIGEgUlNTIGl0ZW0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzTGluayB7XG5cdC8qKlxuXHQgKiBUaGUgaHJlZiBmb3IgdGhlIGxpbmsuXG5cdCAqL1xuXHRocmVmPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHJlbCB0eXBlIGZvciB0aGUgbGluay5cblx0ICovXG5cdHJlbD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgYXV0aG9yIGlmIHRoZSBmZWVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0F1dGhvciB7XG5cdC8qKlxuXHQgKiBUaGUgbmFtZSBvZiB0aGUgYXV0aG9yLlxuXHQgKi9cblx0bmFtZT86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSByZXNvdXJjZSBsb2NhdG9yIGZvciB0aGUgYXV0aG9yLlxuXHQgKi9cblx0dXJpPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIGVudHJ5IGluIGFuIFJTUyBmZWVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0ZlZWRFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIGVudHJ5LlxuXHQgKi9cblx0aWQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBndWlkIGZvciB0aGUgZW50cnkuXG5cdCAqL1xuXHRndWlkPzoge1xuXHRcdGlzUGVybWFsaW5rOiBzdHJpbmc7XG5cdFx0XCIjdGV4dFwiOiBzdHJpbmc7XG5cdH07XG5cdC8qKlxuXHQgKiBUaGUgdGl0bGUuXG5cdCAqL1xuXHR0aXRsZT86IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBsaW5rIHRvIHRoZSBmZWVkIGl0ZW0uXG5cdCAqL1xuXHRsaW5rPzogUnNzTGluayB8IHN0cmluZztcblx0LyoqXG5cdCAqIERlc2NyaXB0aW9uIGZvciB0aGUgaXRlbS5cblx0ICovXG5cdGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGF1dGhvciBvZiB0aGUgaXRlbS5cblx0ICovXG5cdGF1dGhvcj86IFJzc0F1dGhvcjtcblx0LyoqXG5cdCAqIFRoZSBwdWJsaXNoZWQgZGF0ZSBvZiB0aGUgaXRlbS5cblx0ICovXG5cdHB1YkRhdGU/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBbHRlcm5hdGUgcHVibGlzaGVkIGRhdGUgZm9yIHRoZSBpdGVtLlxuXHQgKi9cblx0cHVibGlzaGVkPzogc3RyaW5nO1xuXHQvKipcblx0ICogV2hlbiB0aGUgaXRlbSB3YXMgdXBkYXRlZC5cblx0ICovXG5cdHVwZGF0ZWQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBNZWRpYSBpdGVtcyBzdWNoIGFzIGltYWdlcy5cblx0ICovXG5cdFwibWVkaWE6Z3JvdXBcIj86IHtcblx0XHRcIm1lZGlhOnRpdGxlXCI/OiBzdHJpbmc7XG5cdFx0XCJtZWRpYTpkZXNjcmlwdGlvblwiPzogc3RyaW5nO1xuXHRcdFwibWVkaWE6Y29udGVudFwiPzoge1xuXHRcdFx0dXJsOiBzdHJpbmc7XG5cdFx0XHR0eXBlOiBzdHJpbmc7XG5cdFx0XHR3aWR0aDogc3RyaW5nO1xuXHRcdFx0aGVpZ2h0OiBzdHJpbmc7XG5cdFx0fTtcblx0XHRcIm1lZGlhOnRodW1ibmFpbFwiPzoge1xuXHRcdFx0dXJsOiBzdHJpbmc7XG5cdFx0XHR3aWR0aDogc3RyaW5nO1xuXHRcdFx0aGVpZ2h0OiBzdHJpbmc7XG5cdFx0fTtcblx0fTtcbn1cblxuLyoqXG4gKiBEZXRhaWxzIGZvciB0aGUgZmVlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NGZWVkRGV0YWlscyB7XG5cdC8qKlxuXHQgKiBUaGUgZmVlZCBpZC5cblx0ICovXG5cdGlkPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGl0bGUgb2YgdGhlIGZlZWQuXG5cdCAqL1xuXHR0aXRsZT86IHN0cmluZztcblx0LyoqXG5cdCAqIERlc2NyaXB0aW9uIG9mIHRoZSBmZWVkLlxuXHQgKi9cblx0ZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBBdXRob3Igb2YgdGhlIGZlZWQuXG5cdCAqL1xuXHRhdXRob3I/OiBSc3NBdXRob3I7XG5cdC8qKlxuXHQgKiBMaW5rIHRvIHRoZSBmZWVkIGNvbnRlbnQuXG5cdCAqL1xuXHRsaW5rPzogUnNzTGluayB8IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBkYXRlIG9mIHRoZSBmZWVkIHB1Ymxpc2guXG5cdCAqL1xuXHRwdWJsaXNoZWQ/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgcHVibGlzaGVkIGRhdGUgb2YgdGhlIGZlZWQuXG5cdCAqL1xuXHRwdWJEYXRlPzogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGVudHJpZXMgaW4gdGhlIGZlZWQuXG5cdCAqL1xuXHRlbnRyeT86IFJzc0ZlZWRFbnRyeVtdO1xuXHQvKipcblx0ICogQWx0ZXJuYXRlIGl0ZW1zIGluIHRoZSBmZWVkLlxuXHQgKi9cblx0aXRlbT86IFJzc0ZlZWRFbnRyeVtdO1xufVxuXG4vKipcbiAqIEZlZWQgY29udGFpbmVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0ZlZWQge1xuXHQvKipcblx0ICogVGhlIGZlZWQgZGV0YWlscy5cblx0ICovXG5cdGZlZWQ/OiBSc3NGZWVkRGV0YWlscztcblx0LyoqXG5cdCAqIFRoZSBSU1MgaGVhZGVyLlxuXHQgKi9cblx0cnNzPzoge1xuXHRcdGNoYW5uZWw/OiBSc3NGZWVkRGV0YWlscztcblx0fTtcbn1cblxuLyoqXG4gKiBUaGUgY2FjaGUgb2YgYWxsIHRoZSBmZWVkcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NDYWNoZSB7XG5cdFtpZDogc3RyaW5nXTogUnNzRmVlZENhY2hlO1xufVxuXG4vKipcbiAqIFRoZSBjYWNoZSBmb3IgYSBmZWVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJzc0ZlZWRDYWNoZSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIGZlZWQuXG5cdCAqL1xuXHRpZDogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIHRpdGxlIG9mIHRoZSBmZWVkLlxuXHQgKi9cblx0dGl0bGU6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZmVlZC5cblx0ICovXG5cdGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgZW50cmllcyBpbiB0aGUgZmVlZC5cblx0ICovXG5cdGVudHJpZXM6IHsgW2VudHJ5SWQ6IHN0cmluZ106IFJzc0ZlZWRDYWNoZUVudHJ5IH07XG59XG5cbi8qKlxuICogQ2FjaGUgZW50cnkgZm9yIHByb2Nlc3NlZCBpdGVtcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NGZWVkQ2FjaGVFbnRyeSB7XG5cdC8qKlxuXHQgKiBUaGUgaWQgb2YgdGhlIGNhY2hlZCBpdGVtLlxuXHQgKi9cblx0aWQ6IHN0cmluZztcblx0LyoqXG5cdCAqIFRoZSB0aXRsZSBvZiB0aGUgY2FjaGVkIGl0ZW0uXG5cdCAqL1xuXHR0aXRsZTogc3RyaW5nO1xuXHQvKipcblx0ICogVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBjYWNoZWQgaXRlbS5cblx0ICovXG5cdGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdXJsIGZvciB0aGUgY2FjaGVkIGl0ZW0uXG5cdCAqL1xuXHR1cmw6IHN0cmluZztcblx0LyoqXG5cdCAqIE9wdGlvbmFsIHRodW1ibmFpbC5cblx0ICovXG5cdHRodW1ibmFpbFVybD86IHN0cmluZztcblx0LyoqXG5cdCAqIFRpbWVzdGFtcCB0aGUgaXRlbSB3YXMgbGFzdCB1cGRhdGVkLlxuXHQgKi9cblx0bGFzdFVwZGF0ZWQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUaGUgUlNTIGZlZWQgY2hhbm5lbCBuYW1lLlxuICovXG5leHBvcnQgY29uc3QgUlNTX0FQUF9DSEFOTkVMX05BTUUgPSBcInJzcy1mZWVkXCI7XG5cbi8qKlxuICogVGhlIFJTUyBmZWVkIG1haW4gd2luZG93IG5hbWUuXG4gKi9cbmV4cG9ydCBjb25zdCBSU1NfV0lORE9XX05BTUUgPSBcImludGVybmFsLWdlbmVyYXRlZC13aW5kb3ctcnNzLWZlZWRcIjtcblxuLyoqXG4gKiBUaGUgaW50ZXJvcCBjaGFubmVsIGFjdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0FDVElPTlMgPSB7XG5cdGZlZWRTdWJzY3JpYmU6IFwiZmVlZC1zdWJzY3JpYmVcIixcblx0ZmVlZFVwZGF0ZTogXCJmZWVkLXVwZGF0ZVwiXG59O1xuXG4vKipcbiAqIFBheWxvYWQgZm9yIHRoZSBjaGFubmVsIHN1YnNjcmliZSBhY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUnNzQ2hhbm5lbEZlZWRTdWJzY3JpYmVQYXlsb2FkIHtcblx0LyoqXG5cdCAqIFRoZSBpZCBvZiB0aGUgZmVlZCBiZWluZyBzdWJzY3JpYmVkLlxuXHQgKi9cblx0ZmVlZElkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUGF5bG9hZCBmb3IgdGhlIGNoYW5uZWwgdXBkYXRlIGFjdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSc3NDaGFubmVsRmVlZFVwZGF0ZVBheWxvYWQge1xuXHQvKipcblx0ICogVGhlIGlkIG9mIHRoZSBmZWVkIGJlaW5nIHVwZGF0ZWQuXG5cdCAqL1xuXHRmZWVkOiBSc3NGZWVkQ2FjaGU7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG5cdENIQU5ORUxfQUNUSU9OUyxcblx0UlNTX0FQUF9DSEFOTkVMX05BTUUsXG5cdFJTU19XSU5ET1dfTkFNRSxcblx0dHlwZSBSc3NDaGFubmVsRmVlZFVwZGF0ZVBheWxvYWQsXG5cdHR5cGUgUnNzRmVlZENhY2hlLFxuXHR0eXBlIFJzc0ZlZWRDYWNoZUVudHJ5XG59IGZyb20gXCIuL3NoYXBlc1wiO1xuXG4vKipcbiAqIFRoaXMgY29kZSBpcyBmb3IgdGhlIHJzcy12aWV3Lmh0bWwgdGhhdCBnZXRzIGxhdW5jaGVkIHdoZW4geW91IHZpZXcgYSB3aG9sZSBSU1MgZmVlZC5cbiAqL1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IGluaXRpYWxpemUoKSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgY29ubmVjdGlvbiB0byB0aGUgaW50ZXIgYXBwbGljYXRpb24gYnVzLlxuICovXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKCk6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuXHRjb25zdCBmZWVkSWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcImZlZWRJZFwiKTtcblxuXHRpZiAoIWZlZWRJZCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJObyBmZWVkSWQgd2FzIHBhc3NlZCBhcyBhIHF1ZXJ5IHBhcmFtXCIpO1xuXHR9XG5cblx0Y29uc3QgY2hhbm5lbCA9IGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChSU1NfQVBQX0NIQU5ORUxfTkFNRSk7XG5cblx0Y2hhbm5lbC5yZWdpc3RlcihDSEFOTkVMX0FDVElPTlMuZmVlZFVwZGF0ZSwgYXN5bmMgKHVua25vd25QYXlsb2FkKSA9PiB7XG5cdFx0Y29uc3QgcGF5bG9hZCA9IHVua25vd25QYXlsb2FkIGFzIFJzc0NoYW5uZWxGZWVkVXBkYXRlUGF5bG9hZDtcblx0XHRpZiAocGF5bG9hZD8uZmVlZCkge1xuXHRcdFx0YXdhaXQgdXBkYXRlRmVlZChwYXlsb2FkPy5mZWVkKTtcblx0XHR9XG5cdH0pO1xuXG5cdGF3YWl0IGNoYW5uZWwuZGlzcGF0Y2goQ0hBTk5FTF9BQ1RJT05TLmZlZWRTdWJzY3JpYmUsIHtcblx0XHRmZWVkSWRcblx0fSk7XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBmZWVkIGluIHRoZSBET00uXG4gKiBAcGFyYW0gZmVlZCBUaGUgZmVlZCB0byBkaXNwbGF5IGluIHRoZSBET00uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUZlZWQoZmVlZDogUnNzRmVlZENhY2hlKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChmZWVkLnRpdGxlKSB7XG5cdFx0ZG9jdW1lbnQudGl0bGUgPSBmZWVkLnRpdGxlO1xuXHRcdGNvbnN0IHRpdGxlRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmVlZC10aXRsZVwiKTtcblx0XHRpZiAodGl0bGVFbGVtKSB7XG5cdFx0XHR0aXRsZUVsZW0udGV4dENvbnRlbnQgPSBmZWVkLnRpdGxlO1xuXHRcdH1cblxuXHRcdGNvbnN0IGVudHJpZXM6IFJzc0ZlZWRDYWNoZUVudHJ5W10gPSBbXTtcblx0XHRmb3IgKGNvbnN0IGVudHJ5IGluIGZlZWQuZW50cmllcykge1xuXHRcdFx0ZW50cmllcy5wdXNoKGZlZWQuZW50cmllc1tlbnRyeV0pO1xuXHRcdH1cblx0XHRlbnRyaWVzLnNvcnQoKGEsIGIpID0+IGIubGFzdFVwZGF0ZWQgLSBhLmxhc3RVcGRhdGVkKTtcblxuXHRcdGNvbnN0IGZlZWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZlZWQtY29udGFpbmVyXCIpO1xuXHRcdGlmIChmZWVkQ29udGFpbmVyKSB7XG5cdFx0XHRmZWVkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cblx0XHRcdGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuXHRcdFx0XHRjb25zdCBlbnRyeUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdGVudHJ5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG5cdFx0XHRcdGVudHJ5Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYXAyMFwiKTtcblxuXHRcdFx0XHRjb25zdCB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0dGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZmlsbFwiKTtcblx0XHRcdFx0dGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29sXCIpO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJsZWZ0XCIpO1xuXHRcdFx0XHR0ZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJnYXAxMFwiKTtcblx0XHRcdFx0dGV4dENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3ZlcmZsb3ctaGlkZGVuXCIpO1xuXG5cdFx0XHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xuXHRcdFx0XHR0aXRsZS50ZXh0Q29udGVudCA9IGVudHJ5LnRpdGxlO1xuXG5cdFx0XHRcdGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdFx0ZGF0ZS50ZXh0Q29udGVudCA9IG5ldyBEYXRlKGVudHJ5Lmxhc3RVcGRhdGVkKS50b0xvY2FsZVN0cmluZygpO1xuXG5cdFx0XHRcdGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHRcdGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID1cblx0XHRcdFx0XHRlbnRyeS5kZXNjcmlwdGlvbi5sZW5ndGggPiAyMDAgPyBgJHtlbnRyeS5kZXNjcmlwdGlvbi5zbGljZSgwLCAyMDApfS4uLmAgOiBlbnRyeS5kZXNjcmlwdGlvbjtcblxuXHRcdFx0XHRjb25zdCB2aWV3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdFx0dmlldy50ZXh0Q29udGVudCA9IFwiVmlld1wiO1xuXHRcdFx0XHR2aWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtcblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5jcmVhdGVWaWV3KFxuXHRcdFx0XHRcdFx0eyB1cmw6IGVudHJ5LnVybCB9LFxuXHRcdFx0XHRcdFx0eyB1dWlkOiBwbGF0Zm9ybS5pZGVudGl0eS51dWlkLCBuYW1lOiBSU1NfV0lORE9XX05BTUUgfVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRleHRDb250YWluZXIuYXBwZW5kKHRpdGxlKTtcblx0XHRcdFx0dGV4dENvbnRhaW5lci5hcHBlbmQoZGF0ZSk7XG5cdFx0XHRcdHRleHRDb250YWluZXIuYXBwZW5kKGRlc2NyaXB0aW9uKTtcblx0XHRcdFx0dGV4dENvbnRhaW5lci5hcHBlbmQodmlldyk7XG5cblx0XHRcdFx0Y29uc3QgaW1hZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRpbWFnZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cdFx0XHRcdGltYWdlQ29udGFpbmVyLnN0eWxlLmZsZXggPSBcIjAgMCAyMDBweFwiO1xuXG5cdFx0XHRcdGlmIChlbnRyeS50aHVtYm5haWxVcmwpIHtcblx0XHRcdFx0XHRjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdFx0XHRcdHRodW1ibmFpbC5zcmMgPSBlbnRyeS50aHVtYm5haWxVcmw7XG5cdFx0XHRcdFx0dGh1bWJuYWlsLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0XHRcdFx0aW1hZ2VDb250YWluZXIuYXBwZW5kKHRodW1ibmFpbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbnRyeUNvbnRhaW5lci5hcHBlbmQodGV4dENvbnRhaW5lcik7XG5cdFx0XHRcdGVudHJ5Q29udGFpbmVyLmFwcGVuZChpbWFnZUNvbnRhaW5lcik7XG5cblx0XHRcdFx0ZmVlZENvbnRhaW5lci5hcHBlbmQoZW50cnlDb250YWluZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9