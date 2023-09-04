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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1lbnUuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7OztBQ0pBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUV2RDs7R0FFRztBQUNILEtBQUssVUFBVSxPQUFPO0lBQ3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUUxQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsRUFBRTtRQUNuRCxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFL0QsSUFBSSxhQUFhLEVBQUU7WUFDbEIsS0FBSyxNQUFNLFNBQVMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtnQkFDdkQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ3BELE1BQU8sR0FBRyxDQUFDLEVBQXFCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxhQUFhLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUV0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFFakIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUVuQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1NBQ0Q7S0FDRDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1kb2NrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLWRvY2svd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tcmVnaXN0ZXItd2l0aC1kb2NrLy4vY2xpZW50L3NyYy9jdXN0b20tbWVudS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0RE9NKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBET00gY29tcG9uZW50cy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdERPTSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IGZpbi5tZS5nZXRPcHRpb25zKCk7XG5cblx0aWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5jdXN0b21EYXRhPy5tZW51RW50cmllcykpIHtcblx0XHRjb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZW51Q29udGFpbmVyXCIpO1xuXG5cdFx0aWYgKG1lbnVDb250YWluZXIpIHtcblx0XHRcdGZvciAoY29uc3QgbWVudUVudHJ5IG9mIG9wdGlvbnMuY3VzdG9tRGF0YS5tZW51RW50cmllcykge1xuXHRcdFx0XHRjb25zdCBtZW51RW50cnlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRtZW51RW50cnlCdXR0b24uY2xhc3NMaXN0LmFkZChcIm1lbnUtaXRlbVwiKTtcblx0XHRcdFx0bWVudUVudHJ5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgKGZpbi5tZSBhcyBPcGVuRmluLldpbmRvdykuZGlzcGF0Y2hQb3B1cFJlc3VsdChtZW51RW50cnkuaWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0bWVudUNvbnRhaW5lci5hcHBlbmQobWVudUVudHJ5QnV0dG9uKTtcblxuXHRcdFx0XHRjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHRcdFx0aWNvbi5zcmMgPSBtZW51RW50cnkuaWNvbjtcblx0XHRcdFx0aWNvbi53aWR0aCA9IDE2O1xuXHRcdFx0XHRpY29uLmhlaWdodCA9IDE2O1xuXG5cdFx0XHRcdGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRcdFx0dGV4dC50ZXh0Q29udGVudCA9IG1lbnVFbnRyeS5sYWJlbDtcblxuXHRcdFx0XHRtZW51RW50cnlCdXR0b24uYXBwZW5kKGljb24pO1xuXHRcdFx0XHRtZW51RW50cnlCdXR0b24uYXBwZW5kKHRleHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9