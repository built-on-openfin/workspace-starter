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
/*!***********************************!*\
  !*** ./client/src/custom-menu.ts ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
document.addEventListener("DOMContentLoaded", initDOM);
/**
 * Initialize the DOM components.
 */
async function initDOM() {
    const options = await fin.me.getOptions();
    if (Array.isArray(options.customData?.menuEntries)) {
        const menuContainer = document.querySelector("#menuContainer");
        if (menuContainer) {
            for (const menuEntry of options.customData.menuEntries) {
                const menuEntryButton = document.createElement("div");
                menuEntryButton.classList.add("menu-item");
                menuEntryButton.addEventListener("click", async () => {
                    await fin.me.dispatchPopupResult(menuEntry.id);
                });
                menuContainer.append(menuEntryButton);
                const icon = document.createElement("img");
                icon.src = menuEntry.icon;
                icon.width = 16;
                icon.height = 16;
                const text = document.createElement("span");
                text.textContent = menuEntry.label;
                menuEntryButton.append(icon);
                menuEntryButton.append(text);
            }
        }
    }
}


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1lbnUuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7O0FDSkEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXZEOztHQUVHO0FBQ0gsS0FBSyxVQUFVLE9BQU87SUFDckIsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRTFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUM7UUFDcEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRS9ELElBQUksYUFBYSxFQUFFLENBQUM7WUFDbkIsS0FBSyxNQUFNLFNBQVMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN4RCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDM0MsZUFBZSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtvQkFDcEQsTUFBTyxHQUFHLENBQUMsRUFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDO2dCQUNILGFBQWEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRXRDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBRW5DLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLWRvY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXJlZ2lzdGVyLXdpdGgtZG9jay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLWRvY2svLi9jbGllbnQvc3JjL2N1c3RvbS1tZW51LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRET00pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTSBjb21wb25lbnRzLlxuICovXG5hc3luYyBmdW5jdGlvbiBpbml0RE9NKCk6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCBvcHRpb25zID0gYXdhaXQgZmluLm1lLmdldE9wdGlvbnMoKTtcblxuXHRpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmN1c3RvbURhdGE/Lm1lbnVFbnRyaWVzKSkge1xuXHRcdGNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbnVDb250YWluZXJcIik7XG5cblx0XHRpZiAobWVudUNvbnRhaW5lcikge1xuXHRcdFx0Zm9yIChjb25zdCBtZW51RW50cnkgb2Ygb3B0aW9ucy5jdXN0b21EYXRhLm1lbnVFbnRyaWVzKSB7XG5cdFx0XHRcdGNvbnN0IG1lbnVFbnRyeUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdG1lbnVFbnRyeUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwibWVudS1pdGVtXCIpO1xuXHRcdFx0XHRtZW51RW50cnlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRhd2FpdCAoZmluLm1lIGFzIE9wZW5GaW4uV2luZG93KS5kaXNwYXRjaFBvcHVwUmVzdWx0KG1lbnVFbnRyeS5pZCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRtZW51Q29udGFpbmVyLmFwcGVuZChtZW51RW50cnlCdXR0b24pO1xuXG5cdFx0XHRcdGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdFx0XHRpY29uLnNyYyA9IG1lbnVFbnRyeS5pY29uO1xuXHRcdFx0XHRpY29uLndpZHRoID0gMTY7XG5cdFx0XHRcdGljb24uaGVpZ2h0ID0gMTY7XG5cblx0XHRcdFx0Y29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXHRcdFx0XHR0ZXh0LnRleHRDb250ZW50ID0gbWVudUVudHJ5LmxhYmVsO1xuXG5cdFx0XHRcdG1lbnVFbnRyeUJ1dHRvbi5hcHBlbmQoaWNvbik7XG5cdFx0XHRcdG1lbnVFbnRyeUJ1dHRvbi5hcHBlbmQodGV4dCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=