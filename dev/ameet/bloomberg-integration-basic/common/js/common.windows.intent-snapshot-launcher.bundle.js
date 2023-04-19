/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************************************************************!*\
  !*** ./client/src/windows/intent-window/intent-snapshot-launcher.ts ***!
  \**********************************************************************/
__webpack_require__.r(__webpack_exports__);
let lastContextGroupIndex = -1;
async function getLauncherSettings() {
    const options = await fin.me.getOptions();
    let settings = {};
    if (options?.customData?.settings !== undefined) {
        settings = Object.assign(settings, options.customData.settings);
        if (settings.snapshotUrl === undefined) {
            console.error("Unable to setup intent handler as we need a snapshotUrl setting passed to fetch.");
            return null;
        }
        if (settings.intentName === undefined) {
            console.error("Unable to setup intent handler as we need a intentName setting passed.");
            return null;
        }
    }
    return settings;
}
async function getContextGroupName(contextGroupName, contextGroupToken) {
    let targetContextGroupName = contextGroupName;
    if (targetContextGroupName !== undefined) {
        const availableContextGroups = await fin.me.interop.getContextGroups();
        if (targetContextGroupName === "*") {
            console.log("The specified context group is all (*) indicating the target group should be rotated.");
            lastContextGroupIndex++;
            if (lastContextGroupIndex > availableContextGroups.length) {
                lastContextGroupIndex = 0;
            }
            targetContextGroupName = availableContextGroups[lastContextGroupIndex].id;
        }
        const targetContextGroup = availableContextGroups.find((entry) => entry.id === targetContextGroupName);
        if (targetContextGroup === undefined) {
            if (contextGroupToken !== undefined) {
                console.warn("Passed contextGroupName is invalid and cannot be used for contextGroupToken replacement. Setting context group to first in available list:", availableContextGroups[0].id);
                targetContextGroupName = availableContextGroups[0].id;
            }
            else {
                console.warn("The passed context group name is not valid and isn't used in the snapshot so will not be used or defaulted.");
                targetContextGroupName = undefined;
            }
        }
    }
    return targetContextGroupName;
}
async function launcherInit() {
    const settings = await getLauncherSettings();
    if (settings !== null) {
        const snapshotUrl = settings.snapshotUrl;
        const idName = settings.idName;
        const contextGroupName = settings.contextGroupName;
        const contextGroupToken = settings.contextGroupToken;
        const idToken = settings.idToken;
        const intentName = settings.intentName;
        await fin.me.interop.registerIntentHandler(async (intent) => {
            try {
                const response = await fetch(snapshotUrl, {
                    headers: {
                        Accept: "application/json"
                    }
                });
                if (response.status === 200) {
                    console.log("Received snapshot response");
                    let text = await response.text();
                    if (idName !== undefined &&
                        intent?.context?.id !== undefined &&
                        intent.context.id[idName] !== undefined) {
                        text = text.replaceAll(idToken, intent.context.id[idName]);
                    }
                    const targetContextGroupName = await getContextGroupName(contextGroupName, contextGroupToken);
                    if (targetContextGroupName !== undefined && contextGroupToken !== undefined) {
                        text = text.replaceAll(contextGroupToken, targetContextGroupName);
                    }
                    const snapshot = JSON.parse(text);
                    const platform = fin.Platform.getCurrentSync();
                    if (targetContextGroupName !== undefined) {
                        await fin.me.interop.joinContextGroup(targetContextGroupName);
                        await fin.me.interop.setContext(intent.context);
                    }
                    await platform.applySnapshot(snapshot);
                }
            }
            catch (error) {
                console.error("Error while trying to handle intent request for:", intent.name, error);
            }
        }, intentName);
    }
}
window.addEventListener("DOMContentLoaded", launcherInit);



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLndpbmRvd3MuaW50ZW50LXNuYXBzaG90LWxhdW5jaGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiU0FBQTtTQUNBOzs7OztVQ0RBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7O0FDSUEsSUFBSSxxQkFBcUIsR0FBVyxDQUFDLENBQUMsQ0FBQztBQUV2QyxLQUFLLFVBQVUsbUJBQW1CO0lBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxJQUFJLFFBQVEsR0FBcUIsRUFBRSxDQUFDO0lBQ3BDLElBQUksT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ2hELFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO1lBQ2xHLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztZQUN4RixPQUFPLElBQUksQ0FBQztTQUNaO0tBQ0Q7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNqQixDQUFDO0FBRUQsS0FBSyxVQUFVLG1CQUFtQixDQUFDLGdCQUF3QixFQUFFLGlCQUF5QjtJQUNyRixJQUFJLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO0lBQzlDLElBQUksc0JBQXNCLEtBQUssU0FBUyxFQUFFO1FBQ3pDLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FB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b0JBQ0QsTUFBTSxRQUFRLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQy9DLElBQUksc0JBQXNCLEtBQUssU0FBUyxFQUFFO3dCQUN6QyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLENBQUM7d0JBQzlELE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDaEQ7b0JBQ0QsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN2QzthQUNEO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrREFBa0QsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3RGO1FBQ0YsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ2Y7QUFDRixDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWNvbW1vbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0tY29tbW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWNvbW1vbi8uL2NsaWVudC9zcmMvd2luZG93cy9pbnRlbnQtd2luZG93L2ludGVudC1zbmFwc2hvdC1sYXVuY2hlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5pbnRlcmZhY2UgTGF1bmNoZXJTZXR0aW5ncyB7XG5cdGludGVudE5hbWU/OiBzdHJpbmc7XG5cdHNuYXBzaG90VXJsPzogc3RyaW5nO1xuXHRpZFRva2VuPzogc3RyaW5nO1xuXHRpZE5hbWU/OiBzdHJpbmc7XG5cdGNvbnRleHRHcm91cE5hbWU/OiBzdHJpbmc7XG5cdGNvbnRleHRHcm91cFRva2VuPzogc3RyaW5nO1xufVxubGV0IGxhc3RDb250ZXh0R3JvdXBJbmRleDogbnVtYmVyID0gLTE7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldExhdW5jaGVyU2V0dGluZ3MoKTogUHJvbWlzZTxMYXVuY2hlclNldHRpbmdzPiB7XG5cdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBmaW4ubWUuZ2V0T3B0aW9ucygpO1xuXHRsZXQgc2V0dGluZ3M6IExhdW5jaGVyU2V0dGluZ3MgPSB7fTtcblx0aWYgKG9wdGlvbnM/LmN1c3RvbURhdGE/LnNldHRpbmdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMuY3VzdG9tRGF0YS5zZXR0aW5ncyk7XG5cdFx0aWYgKHNldHRpbmdzLnNuYXBzaG90VXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gc2V0dXAgaW50ZW50IGhhbmRsZXIgYXMgd2UgbmVlZCBhIHNuYXBzaG90VXJsIHNldHRpbmcgcGFzc2VkIHRvIGZldGNoLlwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoc2V0dGluZ3MuaW50ZW50TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHNldHVwIGludGVudCBoYW5kbGVyIGFzIHdlIG5lZWQgYSBpbnRlbnROYW1lIHNldHRpbmcgcGFzc2VkLlwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnRleHRHcm91cE5hbWUoY29udGV4dEdyb3VwTmFtZTogc3RyaW5nLCBjb250ZXh0R3JvdXBUb2tlbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcblx0bGV0IHRhcmdldENvbnRleHRHcm91cE5hbWUgPSBjb250ZXh0R3JvdXBOYW1lO1xuXHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc3QgYXZhaWxhYmxlQ29udGV4dEdyb3VwcyA9IGF3YWl0IGZpbi5tZS5pbnRlcm9wLmdldENvbnRleHRHcm91cHMoKTtcblx0XHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSA9PT0gXCIqXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIHNwZWNpZmllZCBjb250ZXh0IGdyb3VwIGlzIGFsbCAoKikgaW5kaWNhdGluZyB0aGUgdGFyZ2V0IGdyb3VwIHNob3VsZCBiZSByb3RhdGVkLlwiKTtcblx0XHRcdGxhc3RDb250ZXh0R3JvdXBJbmRleCsrO1xuXHRcdFx0aWYgKGxhc3RDb250ZXh0R3JvdXBJbmRleCA+IGF2YWlsYWJsZUNvbnRleHRHcm91cHMubGVuZ3RoKSB7XG5cdFx0XHRcdGxhc3RDb250ZXh0R3JvdXBJbmRleCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXRDb250ZXh0R3JvdXBOYW1lID0gYXZhaWxhYmxlQ29udGV4dEdyb3Vwc1tsYXN0Q29udGV4dEdyb3VwSW5kZXhdLmlkO1xuXHRcdH1cblx0XHRjb25zdCB0YXJnZXRDb250ZXh0R3JvdXAgPSBhdmFpbGFibGVDb250ZXh0R3JvdXBzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gdGFyZ2V0Q29udGV4dEdyb3VwTmFtZSk7XG5cdFx0aWYgKHRhcmdldENvbnRleHRHcm91cCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAoY29udGV4dEdyb3VwVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XCJQYXNzZWQgY29udGV4dEdyb3VwTmFtZSBpcyBpbnZhbGlkIGFuZCBjYW5ub3QgYmUgdXNlZCBmb3IgY29udGV4dEdyb3VwVG9rZW4gcmVwbGFjZW1lbnQuIFNldHRpbmcgY29udGV4dCBncm91cCB0byBmaXJzdCBpbiBhdmFpbGFibGUgbGlzdDpcIixcblx0XHRcdFx0XHRhdmFpbGFibGVDb250ZXh0R3JvdXBzWzBdLmlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRhcmdldENvbnRleHRHcm91cE5hbWUgPSBhdmFpbGFibGVDb250ZXh0R3JvdXBzWzBdLmlkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiVGhlIHBhc3NlZCBjb250ZXh0IGdyb3VwIG5hbWUgaXMgbm90IHZhbGlkIGFuZCBpc24ndCB1c2VkIGluIHRoZSBzbmFwc2hvdCBzbyB3aWxsIG5vdCBiZSB1c2VkIG9yIGRlZmF1bHRlZC5cIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0YXJnZXRDb250ZXh0R3JvdXBOYW1lID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFyZ2V0Q29udGV4dEdyb3VwTmFtZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbGF1bmNoZXJJbml0KCkge1xuXHRjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldExhdW5jaGVyU2V0dGluZ3MoKTtcblxuXHRpZiAoc2V0dGluZ3MgIT09IG51bGwpIHtcblx0XHRjb25zdCBzbmFwc2hvdFVybDogc3RyaW5nID0gc2V0dGluZ3Muc25hcHNob3RVcmw7XG5cdFx0Y29uc3QgaWROYW1lOiBzdHJpbmcgPSBzZXR0aW5ncy5pZE5hbWU7XG5cdFx0Y29uc3QgY29udGV4dEdyb3VwTmFtZTogc3RyaW5nID0gc2V0dGluZ3MuY29udGV4dEdyb3VwTmFtZTtcblx0XHRjb25zdCBjb250ZXh0R3JvdXBUb2tlbjogc3RyaW5nID0gc2V0dGluZ3MuY29udGV4dEdyb3VwVG9rZW47XG5cdFx0Y29uc3QgaWRUb2tlbjogc3RyaW5nID0gc2V0dGluZ3MuaWRUb2tlbjtcblx0XHRjb25zdCBpbnRlbnROYW1lOiBzdHJpbmcgPSBzZXR0aW5ncy5pbnRlbnROYW1lO1xuXG5cdFx0YXdhaXQgZmluLm1lLmludGVyb3AucmVnaXN0ZXJJbnRlbnRIYW5kbGVyKGFzeW5jIChpbnRlbnQpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc25hcHNob3RVcmwsIHtcblx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRBY2NlcHQ6IFwiYXBwbGljYXRpb24vanNvblwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJSZWNlaXZlZCBzbmFwc2hvdCByZXNwb25zZVwiKTtcblx0XHRcdFx0XHRsZXQgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRpZE5hbWUgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdFx0aW50ZW50Py5jb250ZXh0Py5pZCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRpbnRlbnQuY29udGV4dC5pZFtpZE5hbWVdICE9PSB1bmRlZmluZWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2VBbGwoaWRUb2tlbiwgaW50ZW50LmNvbnRleHQuaWRbaWROYW1lXSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgdGFyZ2V0Q29udGV4dEdyb3VwTmFtZTogc3RyaW5nID0gYXdhaXQgZ2V0Q29udGV4dEdyb3VwTmFtZShcblx0XHRcdFx0XHRcdGNvbnRleHRHcm91cE5hbWUsXG5cdFx0XHRcdFx0XHRjb250ZXh0R3JvdXBUb2tlblxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKHRhcmdldENvbnRleHRHcm91cE5hbWUgIT09IHVuZGVmaW5lZCAmJiBjb250ZXh0R3JvdXBUb2tlbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlQWxsKGNvbnRleHRHcm91cFRva2VuLCB0YXJnZXRDb250ZXh0R3JvdXBOYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3Qgc25hcHNob3Q6IE9wZW5GaW4uU25hcHNob3QgPSBKU09OLnBhcnNlKHRleHQpO1xuXHRcdFx0XHRcdGNvbnN0IHBsYXRmb3JtID0gZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCk7XG5cdFx0XHRcdFx0aWYgKHRhcmdldENvbnRleHRHcm91cE5hbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0YXdhaXQgZmluLm1lLmludGVyb3Auam9pbkNvbnRleHRHcm91cCh0YXJnZXRDb250ZXh0R3JvdXBOYW1lKTtcblx0XHRcdFx0XHRcdGF3YWl0IGZpbi5tZS5pbnRlcm9wLnNldENvbnRleHQoaW50ZW50LmNvbnRleHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRhd2FpdCBwbGF0Zm9ybS5hcHBseVNuYXBzaG90KHNuYXBzaG90KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBoYW5kbGUgaW50ZW50IHJlcXVlc3QgZm9yOlwiLCBpbnRlbnQubmFtZSwgZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0sIGludGVudE5hbWUpO1xuXHR9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBsYXVuY2hlckluaXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9