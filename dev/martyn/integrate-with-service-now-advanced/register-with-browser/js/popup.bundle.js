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
/*!*****************************!*\
  !*** ./client/src/popup.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", initDOM);
/**
 * Initialize the DOM components.
 */
async function initDOM() {
    const options = await fin.me.getOptions();
    if (options.customData?.title) {
        const title = document.querySelector("#title");
        if (title) {
            title.textContent = options.customData?.title;
        }
    }
    if (options.customData?.instructions) {
        const instructions = document.querySelector("#instructions");
        if (instructions) {
            instructions.textContent = options.customData?.instructions;
        }
    }
    if (Array.isArray(options.customData?.buttons)) {
        const buttonsContainer = document.querySelector("#buttonsContainer");
        if (buttonsContainer) {
            for (const button of options.customData.buttons) {
                const btn = document.createElement("button");
                if (!button.default) {
                    btn.classList.add("secondary");
                }
                btn.type = "button";
                btn.textContent = button.label;
                btn.addEventListener("click", async () => {
                    await fin.me.dispatchPopupResult(btn.id);
                });
                buttonsContainer.append(btn);
            }
        }
    }
}


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7OztBQ0pBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV2RDs7R0FFRztBQUNILEtBQUssVUFBVSxPQUFPO0lBQ3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUUxQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDL0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1gsS0FBSyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUMvQyxDQUFDO0lBQ0YsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQztRQUN0QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdELElBQUksWUFBWSxFQUFFLENBQUM7WUFDbEIsWUFBWSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztRQUM3RCxDQUFDO0lBQ0YsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDaEQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFckUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RCLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakQsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDckIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDL0IsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDeEMsTUFBTyxHQUFHLENBQUMsRUFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxDQUFDO2dCQUNILGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0YsQ0FBQztJQUNGLENBQUM7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtYnJvd3Nlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1icm93c2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtYnJvd3Nlci8uL2NsaWVudC9zcmMvcG9wdXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdERPTSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgRE9NIGNvbXBvbmVudHMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluaXRET00oKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBmaW4ubWUuZ2V0T3B0aW9ucygpO1xuXG5cdGlmIChvcHRpb25zLmN1c3RvbURhdGE/LnRpdGxlKSB7XG5cdFx0Y29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuXHRcdGlmICh0aXRsZSkge1xuXHRcdFx0dGl0bGUudGV4dENvbnRlbnQgPSBvcHRpb25zLmN1c3RvbURhdGE/LnRpdGxlO1xuXHRcdH1cblx0fVxuXG5cdGlmIChvcHRpb25zLmN1c3RvbURhdGE/Lmluc3RydWN0aW9ucykge1xuXHRcdGNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5zdHJ1Y3Rpb25zXCIpO1xuXHRcdGlmIChpbnN0cnVjdGlvbnMpIHtcblx0XHRcdGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IG9wdGlvbnMuY3VzdG9tRGF0YT8uaW5zdHJ1Y3Rpb25zO1xuXHRcdH1cblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuY3VzdG9tRGF0YT8uYnV0dG9ucykpIHtcblx0XHRjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXR0b25zQ29udGFpbmVyXCIpO1xuXG5cdFx0aWYgKGJ1dHRvbnNDb250YWluZXIpIHtcblx0XHRcdGZvciAoY29uc3QgYnV0dG9uIG9mIG9wdGlvbnMuY3VzdG9tRGF0YS5idXR0b25zKSB7XG5cdFx0XHRcdGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRcdGlmICghYnV0dG9uLmRlZmF1bHQpIHtcblx0XHRcdFx0XHRidG4uY2xhc3NMaXN0LmFkZChcInNlY29uZGFyeVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRidG4udHlwZSA9IFwiYnV0dG9uXCI7XG5cdFx0XHRcdGJ0bi50ZXh0Q29udGVudCA9IGJ1dHRvbi5sYWJlbDtcblx0XHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgKGZpbi5tZSBhcyBPcGVuRmluLldpbmRvdykuZGlzcGF0Y2hQb3B1cFJlc3VsdChidG4uaWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoYnRuKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==