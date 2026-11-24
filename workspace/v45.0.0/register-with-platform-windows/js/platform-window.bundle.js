/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperties(exports, { [Symbol.toStringTag]: { value: 'Module' }, __esModule: { value: true } });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
/*!***************************************!*\
  !*** ./client/src/platform-window.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
const CONTAINER_ID = "layout-container";
const thisWindow = fin.Window.getCurrentSync();
window.addEventListener("DOMContentLoaded", async () => {
    // Initialize the window layout
    await fin.Platform.Layout.init({ containerId: CONTAINER_ID });
    // Setup the title bar elements.
    setupTitleBar();
});
/**
 * Maximize or restore the window.
 * @returns Nothing.
 */
async function maxOrRestore() {
    if ((await thisWindow.getState()) === "normal") {
        return thisWindow.maximize();
    }
    return thisWindow.restore();
}
/**
 * Close the window.
 * @returns Nothing.
 */
async function closeWindow() {
    await thisWindow.close();
}
/**
 * Minimize the window.
 * @returns Nothing.
 */
async function minimizeWindow() {
    await thisWindow.minimize();
}
/**
 * Setup the title bar for the window and it's button click handlers.
 */
function setupTitleBar() {
    const minBtn = document.querySelector("#minimize-button");
    const maxBtn = document.querySelector("#expand-button");
    const closeBtn = document.querySelector("#close-button");
    if (minBtn) {
        minBtn.addEventListener("click", minimizeWindow);
    }
    if (maxBtn) {
        maxBtn.addEventListener("click", maxOrRestore);
    }
    if (closeBtn) {
        closeBtn.addEventListener("click", closeWindow);
    }
}
;

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2luZG93LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7VUNEQTtVQUNBO1VBQ0Esb0NBQW9DLHdCQUF3QixpQkFBaUIsZ0JBQWdCLGVBQWU7VUFDNUcsRTs7Ozs7Ozs7QUNEQSxNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUV4QyxNQUFNLFVBQVUsR0FBbUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDdEQsK0JBQStCO0lBQy9CLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFFOUQsZ0NBQWdDO0lBQ2hDLGFBQWEsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLFlBQVk7SUFDMUIsSUFBSSxDQUFDLE1BQU0sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDaEQsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsV0FBVztJQUN6QixNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLGNBQWM7SUFDNUIsTUFBTSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxhQUFhO0lBQ3JCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGtCQUFrQixDQUFDLENBQUM7SUFDN0UsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixlQUFlLENBQUMsQ0FBQztJQUU1RSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELElBQUksUUFBUSxFQUFFLENBQUM7UUFDZCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtcGxhdGZvcm0td2luZG93cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1wbGF0Zm9ybS13aW5kb3dzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtcGxhdGZvcm0td2luZG93cy8uL2NsaWVudC9zcmMvcGxhdGZvcm0td2luZG93LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG5jb25zdCBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGV4cG9ydHMsIHsgW1N5bWJvbC50b1N0cmluZ1RhZ106IHsgdmFsdWU6ICdNb2R1bGUnIH0sIF9fZXNNb2R1bGU6IHsgdmFsdWU6IHRydWUgfSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5jb25zdCBDT05UQUlORVJfSUQgPSBcImxheW91dC1jb250YWluZXJcIjtcblxuY29uc3QgdGhpc1dpbmRvdzogT3BlbkZpbi5XaW5kb3cgPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG5cdC8vIEluaXRpYWxpemUgdGhlIHdpbmRvdyBsYXlvdXRcblx0YXdhaXQgZmluLlBsYXRmb3JtLkxheW91dC5pbml0KHsgY29udGFpbmVySWQ6IENPTlRBSU5FUl9JRCB9KTtcblxuXHQvLyBTZXR1cCB0aGUgdGl0bGUgYmFyIGVsZW1lbnRzLlxuXHRzZXR1cFRpdGxlQmFyKCk7XG59KTtcblxuLyoqXG4gKiBNYXhpbWl6ZSBvciByZXN0b3JlIHRoZSB3aW5kb3cuXG4gKiBAcmV0dXJucyBOb3RoaW5nLlxuICovXG5hc3luYyBmdW5jdGlvbiBtYXhPclJlc3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmICgoYXdhaXQgdGhpc1dpbmRvdy5nZXRTdGF0ZSgpKSA9PT0gXCJub3JtYWxcIikge1xuXHRcdHJldHVybiB0aGlzV2luZG93Lm1heGltaXplKCk7XG5cdH1cblxuXHRyZXR1cm4gdGhpc1dpbmRvdy5yZXN0b3JlKCk7XG59XG5cbi8qKlxuICogQ2xvc2UgdGhlIHdpbmRvdy5cbiAqIEByZXR1cm5zIE5vdGhpbmcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNsb3NlV2luZG93KCk6IFByb21pc2U8dm9pZD4ge1xuXHRhd2FpdCB0aGlzV2luZG93LmNsb3NlKCk7XG59XG5cbi8qKlxuICogTWluaW1pemUgdGhlIHdpbmRvdy5cbiAqIEByZXR1cm5zIE5vdGhpbmcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG1pbmltaXplV2luZG93KCk6IFByb21pc2U8dm9pZD4ge1xuXHRhd2FpdCB0aGlzV2luZG93Lm1pbmltaXplKCk7XG59XG5cbi8qKlxuICogU2V0dXAgdGhlIHRpdGxlIGJhciBmb3IgdGhlIHdpbmRvdyBhbmQgaXQncyBidXR0b24gY2xpY2sgaGFuZGxlcnMuXG4gKi9cbmZ1bmN0aW9uIHNldHVwVGl0bGVCYXIoKTogdm9pZCB7XG5cdGNvbnN0IG1pbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI21pbmltaXplLWJ1dHRvblwiKTtcblx0Y29uc3QgbWF4QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjZXhwYW5kLWJ1dHRvblwiKTtcblx0Y29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNjbG9zZS1idXR0b25cIik7XG5cblx0aWYgKG1pbkJ0bikge1xuXHRcdG1pbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWluaW1pemVXaW5kb3cpO1xuXHR9XG5cdGlmIChtYXhCdG4pIHtcblx0XHRtYXhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1heE9yUmVzdG9yZSk7XG5cdH1cblx0aWYgKGNsb3NlQnRuKSB7XG5cdFx0Y2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlV2luZG93KTtcblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9