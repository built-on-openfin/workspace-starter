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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7O0FDSkEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXZEOztHQUVHO0FBQ0gsS0FBSyxVQUFVLE9BQU87SUFDckIsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRTFDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMvQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksS0FBSyxFQUFFLENBQUM7WUFDWCxLQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO1FBQy9DLENBQUM7SUFDRixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDO1FBQ3RDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNsQixZQUFZLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQzdELENBQUM7SUFDRixDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNoRCxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyRSxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDdEIsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNyQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDcEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMvQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUN4QyxNQUFPLEdBQUcsQ0FBQyxFQUFxQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1icm93c2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLWJyb3dzZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1icm93c2VyLy4vY2xpZW50L3NyYy9wb3B1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxuY29uc3QgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZihTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRET00pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTSBjb21wb25lbnRzLlxuICovXG5hc3luYyBmdW5jdGlvbiBpbml0RE9NKCk6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCBvcHRpb25zID0gYXdhaXQgZmluLm1lLmdldE9wdGlvbnMoKTtcblxuXHRpZiAob3B0aW9ucy5jdXN0b21EYXRhPy50aXRsZSkge1xuXHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0XHRpZiAodGl0bGUpIHtcblx0XHRcdHRpdGxlLnRleHRDb250ZW50ID0gb3B0aW9ucy5jdXN0b21EYXRhPy50aXRsZTtcblx0XHR9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5jdXN0b21EYXRhPy5pbnN0cnVjdGlvbnMpIHtcblx0XHRjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luc3RydWN0aW9uc1wiKTtcblx0XHRpZiAoaW5zdHJ1Y3Rpb25zKSB7XG5cdFx0XHRpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBvcHRpb25zLmN1c3RvbURhdGE/Lmluc3RydWN0aW9ucztcblx0XHR9XG5cdH1cblxuXHRpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbURhdGE/LmJ1dHRvbnMpKSB7XG5cdFx0Y29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnV0dG9uc0NvbnRhaW5lclwiKTtcblxuXHRcdGlmIChidXR0b25zQ29udGFpbmVyKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGJ1dHRvbiBvZiBvcHRpb25zLmN1c3RvbURhdGEuYnV0dG9ucykge1xuXHRcdFx0XHRjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0XHRpZiAoIWJ1dHRvbi5kZWZhdWx0KSB7XG5cdFx0XHRcdFx0YnRuLmNsYXNzTGlzdC5hZGQoXCJzZWNvbmRhcnlcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuXHRcdFx0XHRidG4udGV4dENvbnRlbnQgPSBidXR0b24ubGFiZWw7XG5cdFx0XHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdGF3YWl0IChmaW4ubWUgYXMgT3BlbkZpbi5XaW5kb3cpLmRpc3BhdGNoUG9wdXBSZXN1bHQoYnRuLmlkKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJ1dHRvbnNDb250YWluZXIuYXBwZW5kKGJ0bik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=