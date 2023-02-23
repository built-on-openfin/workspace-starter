/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./client/src/popup.ts ***!
  \*****************************/
document.addEventListener("DOMContentLoaded", init);
async function init() {
    const options = await fin.me.getOptions();
    if (options.customData?.title) {
        const title = document.querySelector("#title");
        title.textContent = options.customData?.title;
    }
    if (options.customData?.instructions) {
        const instructions = document.querySelector("#instructions");
        instructions.textContent = options.customData?.instructions;
    }
    if (Array.isArray(options.customData?.buttons)) {
        const buttonsContainer = document.querySelector("#buttonsContainer");
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXBELEtBQUssVUFBVSxJQUFJO0lBQ2xCLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUUxQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFO1FBQzlCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztLQUM5QztJQUVELElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUU7UUFDckMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3RCxZQUFZLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO0tBQzVEO0lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUU7UUFDL0MsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFckUsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNwQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMvQjtZQUNELEdBQUcsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUMvQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUN4QyxNQUFPLEdBQUcsQ0FBQyxFQUFxQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztZQUNILGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QjtLQUNEO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1yZWdpc3Rlci13aXRoLWJyb3dzZXIvLi9jbGllbnQvc3JjL3BvcHVwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuXG5hc3luYyBmdW5jdGlvbiBpbml0KCkge1xuXHRjb25zdCBvcHRpb25zID0gYXdhaXQgZmluLm1lLmdldE9wdGlvbnMoKTtcblxuXHRpZiAob3B0aW9ucy5jdXN0b21EYXRhPy50aXRsZSkge1xuXHRcdGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcblx0XHR0aXRsZS50ZXh0Q29udGVudCA9IG9wdGlvbnMuY3VzdG9tRGF0YT8udGl0bGU7XG5cdH1cblxuXHRpZiAob3B0aW9ucy5jdXN0b21EYXRhPy5pbnN0cnVjdGlvbnMpIHtcblx0XHRjb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luc3RydWN0aW9uc1wiKTtcblx0XHRpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBvcHRpb25zLmN1c3RvbURhdGE/Lmluc3RydWN0aW9ucztcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuY3VzdG9tRGF0YT8uYnV0dG9ucykpIHtcblx0XHRjb25zdCBidXR0b25zQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidXR0b25zQ29udGFpbmVyXCIpO1xuXG5cdFx0Zm9yIChjb25zdCBidXR0b24gb2Ygb3B0aW9ucy5jdXN0b21EYXRhLmJ1dHRvbnMpIHtcblx0XHRcdGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRpZiAoIWJ1dHRvbi5kZWZhdWx0KSB7XG5cdFx0XHRcdGJ0bi5jbGFzc0xpc3QuYWRkKFwic2Vjb25kYXJ5XCIpO1xuXHRcdFx0fVxuXHRcdFx0YnRuLnR5cGUgPSBcImJ1dHRvblwiO1xuXHRcdFx0YnRuLnRleHRDb250ZW50ID0gYnV0dG9uLmxhYmVsO1xuXHRcdFx0YnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGF3YWl0IChmaW4ubWUgYXMgT3BlbkZpbi5XaW5kb3cpLmRpc3BhdGNoUG9wdXBSZXN1bHQoYnRuLmlkKTtcblx0XHRcdH0pO1xuXHRcdFx0YnV0dG9uc0NvbnRhaW5lci5hcHBlbmQoYnRuKTtcblx0XHR9XG5cdH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==