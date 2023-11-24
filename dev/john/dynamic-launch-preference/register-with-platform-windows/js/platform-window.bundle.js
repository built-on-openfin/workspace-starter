/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2luZG93LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNKQSxNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUV4QyxNQUFNLFVBQVUsR0FBbUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDdEQsK0JBQStCO0lBQy9CLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFFOUQsZ0NBQWdDO0lBQ2hDLGFBQWEsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLFlBQVk7SUFDMUIsSUFBSSxDQUFDLE1BQU0sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDaEQsT0FBTyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELE9BQU8sVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsV0FBVztJQUN6QixNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLGNBQWM7SUFDNUIsTUFBTSxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxhQUFhO0lBQ3JCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGtCQUFrQixDQUFDLENBQUM7SUFDN0UsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixlQUFlLENBQUMsQ0FBQztJQUU1RSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELElBQUksUUFBUSxFQUFFLENBQUM7UUFDZCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtcGxhdGZvcm0td2luZG93cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1wbGF0Zm9ybS13aW5kb3dzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtcGxhdGZvcm0td2luZG93cy8uL2NsaWVudC9zcmMvcGxhdGZvcm0td2luZG93LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5cbmNvbnN0IENPTlRBSU5FUl9JRCA9IFwibGF5b3V0LWNvbnRhaW5lclwiO1xuXG5jb25zdCB0aGlzV2luZG93OiBPcGVuRmluLldpbmRvdyA9IGZpbi5XaW5kb3cuZ2V0Q3VycmVudFN5bmMoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcblx0Ly8gSW5pdGlhbGl6ZSB0aGUgd2luZG93IGxheW91dFxuXHRhd2FpdCBmaW4uUGxhdGZvcm0uTGF5b3V0LmluaXQoeyBjb250YWluZXJJZDogQ09OVEFJTkVSX0lEIH0pO1xuXG5cdC8vIFNldHVwIHRoZSB0aXRsZSBiYXIgZWxlbWVudHMuXG5cdHNldHVwVGl0bGVCYXIoKTtcbn0pO1xuXG4vKipcbiAqIE1heGltaXplIG9yIHJlc3RvcmUgdGhlIHdpbmRvdy5cbiAqIEByZXR1cm5zIE5vdGhpbmcuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIG1heE9yUmVzdG9yZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKChhd2FpdCB0aGlzV2luZG93LmdldFN0YXRlKCkpID09PSBcIm5vcm1hbFwiKSB7XG5cdFx0cmV0dXJuIHRoaXNXaW5kb3cubWF4aW1pemUoKTtcblx0fVxuXG5cdHJldHVybiB0aGlzV2luZG93LnJlc3RvcmUoKTtcbn1cblxuLyoqXG4gKiBDbG9zZSB0aGUgd2luZG93LlxuICogQHJldHVybnMgTm90aGluZy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2xvc2VXaW5kb3coKTogUHJvbWlzZTx2b2lkPiB7XG5cdGF3YWl0IHRoaXNXaW5kb3cuY2xvc2UoKTtcbn1cblxuLyoqXG4gKiBNaW5pbWl6ZSB0aGUgd2luZG93LlxuICogQHJldHVybnMgTm90aGluZy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbWluaW1pemVXaW5kb3coKTogUHJvbWlzZTx2b2lkPiB7XG5cdGF3YWl0IHRoaXNXaW5kb3cubWluaW1pemUoKTtcbn1cblxuLyoqXG4gKiBTZXR1cCB0aGUgdGl0bGUgYmFyIGZvciB0aGUgd2luZG93IGFuZCBpdCdzIGJ1dHRvbiBjbGljayBoYW5kbGVycy5cbiAqL1xuZnVuY3Rpb24gc2V0dXBUaXRsZUJhcigpOiB2b2lkIHtcblx0Y29uc3QgbWluQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjbWluaW1pemUtYnV0dG9uXCIpO1xuXHRjb25zdCBtYXhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNleHBhbmQtYnV0dG9uXCIpO1xuXHRjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2Nsb3NlLWJ1dHRvblwiKTtcblxuXHRpZiAobWluQnRuKSB7XG5cdFx0bWluQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtaW5pbWl6ZVdpbmRvdyk7XG5cdH1cblx0aWYgKG1heEJ0bikge1xuXHRcdG1heEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWF4T3JSZXN0b3JlKTtcblx0fVxuXHRpZiAoY2xvc2VCdG4pIHtcblx0XHRjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VXaW5kb3cpO1xuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=