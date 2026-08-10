/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2luZG93LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7OztBQ0pBLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDO0FBRXhDLE1BQU0sVUFBVSxHQUFtQixHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLElBQUksRUFBRTtJQUN0RCwrQkFBK0I7SUFDL0IsTUFBTSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUU5RCxnQ0FBZ0M7SUFDaEMsYUFBYSxFQUFFLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsWUFBWTtJQUMxQixJQUFJLENBQUMsTUFBTSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUNoRCxPQUFPLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7R0FHRztBQUNILEtBQUssVUFBVSxXQUFXO0lBQ3pCLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsY0FBYztJQUM1QixNQUFNLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGFBQWE7SUFDckIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0Isa0JBQWtCLENBQUMsQ0FBQztJQUM3RSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGVBQWUsQ0FBQyxDQUFDO0lBRTVFLElBQUksTUFBTSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNkLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1wbGF0Zm9ybS13aW5kb3dzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLXBsYXRmb3JtLXdpbmRvd3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1wbGF0Zm9ybS13aW5kb3dzLy4vY2xpZW50L3NyYy9wbGF0Zm9ybS13aW5kb3cudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbmNvbnN0IF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYoU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5jb25zdCBDT05UQUlORVJfSUQgPSBcImxheW91dC1jb250YWluZXJcIjtcblxuY29uc3QgdGhpc1dpbmRvdzogT3BlbkZpbi5XaW5kb3cgPSBmaW4uV2luZG93LmdldEN1cnJlbnRTeW5jKCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBhc3luYyAoKSA9PiB7XG5cdC8vIEluaXRpYWxpemUgdGhlIHdpbmRvdyBsYXlvdXRcblx0YXdhaXQgZmluLlBsYXRmb3JtLkxheW91dC5pbml0KHsgY29udGFpbmVySWQ6IENPTlRBSU5FUl9JRCB9KTtcblxuXHQvLyBTZXR1cCB0aGUgdGl0bGUgYmFyIGVsZW1lbnRzLlxuXHRzZXR1cFRpdGxlQmFyKCk7XG59KTtcblxuLyoqXG4gKiBNYXhpbWl6ZSBvciByZXN0b3JlIHRoZSB3aW5kb3cuXG4gKiBAcmV0dXJucyBOb3RoaW5nLlxuICovXG5hc3luYyBmdW5jdGlvbiBtYXhPclJlc3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmICgoYXdhaXQgdGhpc1dpbmRvdy5nZXRTdGF0ZSgpKSA9PT0gXCJub3JtYWxcIikge1xuXHRcdHJldHVybiB0aGlzV2luZG93Lm1heGltaXplKCk7XG5cdH1cblxuXHRyZXR1cm4gdGhpc1dpbmRvdy5yZXN0b3JlKCk7XG59XG5cbi8qKlxuICogQ2xvc2UgdGhlIHdpbmRvdy5cbiAqIEByZXR1cm5zIE5vdGhpbmcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNsb3NlV2luZG93KCk6IFByb21pc2U8dm9pZD4ge1xuXHRhd2FpdCB0aGlzV2luZG93LmNsb3NlKCk7XG59XG5cbi8qKlxuICogTWluaW1pemUgdGhlIHdpbmRvdy5cbiAqIEByZXR1cm5zIE5vdGhpbmcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG1pbmltaXplV2luZG93KCk6IFByb21pc2U8dm9pZD4ge1xuXHRhd2FpdCB0aGlzV2luZG93Lm1pbmltaXplKCk7XG59XG5cbi8qKlxuICogU2V0dXAgdGhlIHRpdGxlIGJhciBmb3IgdGhlIHdpbmRvdyBhbmQgaXQncyBidXR0b24gY2xpY2sgaGFuZGxlcnMuXG4gKi9cbmZ1bmN0aW9uIHNldHVwVGl0bGVCYXIoKTogdm9pZCB7XG5cdGNvbnN0IG1pbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI21pbmltaXplLWJ1dHRvblwiKTtcblx0Y29uc3QgbWF4QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjZXhwYW5kLWJ1dHRvblwiKTtcblx0Y29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNjbG9zZS1idXR0b25cIik7XG5cblx0aWYgKG1pbkJ0bikge1xuXHRcdG1pbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWluaW1pemVXaW5kb3cpO1xuXHR9XG5cdGlmIChtYXhCdG4pIHtcblx0XHRtYXhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1heE9yUmVzdG9yZSk7XG5cdH1cblx0aWYgKGNsb3NlQnRuKSB7XG5cdFx0Y2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlV2luZG93KTtcblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9