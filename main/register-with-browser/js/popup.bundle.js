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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7O0FDSkEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXZEOztHQUVHO0FBQ0gsS0FBSyxVQUFVLE9BQU87SUFDckIsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRTFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMvQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxFQUFFLENBQUM7WUFDWCxLQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO1FBQy9DLENBQUM7SUFDRixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDO1FBQ3RDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNsQixZQUFZLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQzdELENBQUM7SUFDRixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNoRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyRSxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDdEIsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDcEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMvQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUN4QyxNQUFPLEdBQUcsQ0FBQyxFQUFxQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1icm93c2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLWJyb3dzZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1icm93c2VyLy4vY2xpZW50L3NyYy9wb3B1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0RE9NKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBET00gY29tcG9uZW50cy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdERPTSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGZpbi5tZS5nZXRPcHRpb25zKCk7XG5cblx0aWYgKG9wdGlvbnMuY3VzdG9tRGF0YT8udGl0bGUpIHtcblx0XHRjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5cdFx0aWYgKHRpdGxlKSB7XG5cdFx0XHR0aXRsZS50ZXh0Q29udGVudCA9IG9wdGlvbnMuY3VzdG9tRGF0YT8udGl0bGU7XG5cdFx0fVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuY3VzdG9tRGF0YT8uaW5zdHJ1Y3Rpb25zKSB7XG5cdFx0Y29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnN0cnVjdGlvbnNcIik7XG5cdFx0aWYgKGluc3RydWN0aW9ucykge1xuXHRcdFx0aW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gb3B0aW9ucy5jdXN0b21EYXRhPy5pbnN0cnVjdGlvbnM7XG5cdFx0fVxuXHR9XG5cblx0aWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21EYXRhPy5idXR0b25zKSkge1xuXHRcdGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J1dHRvbnNDb250YWluZXJcIik7XG5cblx0XHRpZiAoYnV0dG9uc0NvbnRhaW5lcikge1xuXHRcdFx0Zm9yIChjb25zdCBidXR0b24gb2Ygb3B0aW9ucy5jdXN0b21EYXRhLmJ1dHRvbnMpIHtcblx0XHRcdFx0Y29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdFx0aWYgKCFidXR0b24uZGVmYXVsdCkge1xuXHRcdFx0XHRcdGJ0bi5jbGFzc0xpc3QuYWRkKFwic2Vjb25kYXJ5XCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJ0bi50eXBlID0gXCJidXR0b25cIjtcblx0XHRcdFx0YnRuLnRleHRDb250ZW50ID0gYnV0dG9uLmxhYmVsO1xuXHRcdFx0XHRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRhd2FpdCAoZmluLm1lIGFzIE9wZW5GaW4uV2luZG93KS5kaXNwYXRjaFBvcHVwUmVzdWx0KGJ0bi5pZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRidXR0b25zQ29udGFpbmVyLmFwcGVuZChidG4pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9