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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0td2luZG93LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7QUNKQSxNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQztBQUV4QyxNQUFNLFVBQVUsR0FBbUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDdEQsK0JBQStCO0lBQy9CLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFFOUQsZ0NBQWdDO0lBQ2hDLGFBQWEsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsS0FBSyxVQUFVLFlBQVk7SUFDMUIsSUFBSSxDQUFDLE1BQU0sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQy9DLE9BQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzdCO0lBRUQsT0FBTyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQUVEOzs7R0FHRztBQUNILEtBQUssVUFBVSxXQUFXO0lBQ3pCLE1BQU0sVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxLQUFLLFVBQVUsY0FBYztJQUM1QixNQUFNLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLGFBQWE7SUFDckIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0Isa0JBQWtCLENBQUMsQ0FBQztJQUM3RSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGVBQWUsQ0FBQyxDQUFDO0lBRTVFLElBQUksTUFBTSxFQUFFO1FBQ1gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztLQUNqRDtJQUNELElBQUksTUFBTSxFQUFFO1FBQ1gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUMvQztJQUNELElBQUksUUFBUSxFQUFFO1FBQ2IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNoRDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1wbGF0Zm9ybS13aW5kb3dzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLXBsYXRmb3JtLXdpbmRvd3Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1wbGF0Zm9ybS13aW5kb3dzLy4vY2xpZW50L3NyYy9wbGF0Zm9ybS13aW5kb3cudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuY29uc3QgQ09OVEFJTkVSX0lEID0gXCJsYXlvdXQtY29udGFpbmVyXCI7XG5cbmNvbnN0IHRoaXNXaW5kb3c6IE9wZW5GaW4uV2luZG93ID0gZmluLldpbmRvdy5nZXRDdXJyZW50U3luYygpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBJbml0aWFsaXplIHRoZSB3aW5kb3cgbGF5b3V0XG5cdGF3YWl0IGZpbi5QbGF0Zm9ybS5MYXlvdXQuaW5pdCh7IGNvbnRhaW5lcklkOiBDT05UQUlORVJfSUQgfSk7XG5cblx0Ly8gU2V0dXAgdGhlIHRpdGxlIGJhciBlbGVtZW50cy5cblx0c2V0dXBUaXRsZUJhcigpO1xufSk7XG5cbi8qKlxuICogTWF4aW1pemUgb3IgcmVzdG9yZSB0aGUgd2luZG93LlxuICogQHJldHVybnMgTm90aGluZy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbWF4T3JSZXN0b3JlKCk6IFByb21pc2U8dm9pZD4ge1xuXHRpZiAoKGF3YWl0IHRoaXNXaW5kb3cuZ2V0U3RhdGUoKSkgPT09IFwibm9ybWFsXCIpIHtcblx0XHRyZXR1cm4gdGhpc1dpbmRvdy5tYXhpbWl6ZSgpO1xuXHR9XG5cblx0cmV0dXJuIHRoaXNXaW5kb3cucmVzdG9yZSgpO1xufVxuXG4vKipcbiAqIENsb3NlIHRoZSB3aW5kb3cuXG4gKiBAcmV0dXJucyBOb3RoaW5nLlxuICovXG5hc3luYyBmdW5jdGlvbiBjbG9zZVdpbmRvdygpOiBQcm9taXNlPHZvaWQ+IHtcblx0YXdhaXQgdGhpc1dpbmRvdy5jbG9zZSgpO1xufVxuXG4vKipcbiAqIE1pbmltaXplIHRoZSB3aW5kb3cuXG4gKiBAcmV0dXJucyBOb3RoaW5nLlxuICovXG5hc3luYyBmdW5jdGlvbiBtaW5pbWl6ZVdpbmRvdygpOiBQcm9taXNlPHZvaWQ+IHtcblx0YXdhaXQgdGhpc1dpbmRvdy5taW5pbWl6ZSgpO1xufVxuXG4vKipcbiAqIFNldHVwIHRoZSB0aXRsZSBiYXIgZm9yIHRoZSB3aW5kb3cgYW5kIGl0J3MgYnV0dG9uIGNsaWNrIGhhbmRsZXJzLlxuICovXG5mdW5jdGlvbiBzZXR1cFRpdGxlQmFyKCk6IHZvaWQge1xuXHRjb25zdCBtaW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNtaW5pbWl6ZS1idXR0b25cIik7XG5cdGNvbnN0IG1heEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2V4cGFuZC1idXR0b25cIik7XG5cdGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjY2xvc2UtYnV0dG9uXCIpO1xuXG5cdGlmIChtaW5CdG4pIHtcblx0XHRtaW5CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1pbmltaXplV2luZG93KTtcblx0fVxuXHRpZiAobWF4QnRuKSB7XG5cdFx0bWF4QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtYXhPclJlc3RvcmUpO1xuXHR9XG5cdGlmIChjbG9zZUJ0bikge1xuXHRcdGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZVdpbmRvdyk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==