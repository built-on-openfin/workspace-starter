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
function updateIdToken(sourceText, idToken, idValue) {
    if (idToken === undefined ||
        idToken === null ||
        idToken.trim().length === 0 ||
        idValue === undefined ||
        idValue === null ||
        idValue.trim().length === 0) {
        return sourceText;
    }
    sourceText = sourceText.replaceAll(idToken, idValue);
    return sourceText;
}
async function manageIntent(intent, settings) {
    try {
        const response = await fetch(settings.snapshotUrl, {
            headers: {
                Accept: "application/json"
            }
        });
        if (response.status === 200) {
            console.log("Received snapshot response");
            let text = await response.text();
            if (intent?.context?.id !== undefined) {
                text = updateIdToken(text, settings.idToken, intent.context.id[settings.idName]);
                if (Array.isArray(settings.idTokens)) {
                    for (const idTokenEntry of settings.idTokens) {
                        text = updateIdToken(text, idTokenEntry.idToken, intent.context.id[idTokenEntry.idName]);
                    }
                }
            }
            const targetContextGroupName = await getContextGroupName(settings.contextGroupName, settings.contextGroupToken);
            if (targetContextGroupName !== undefined && settings.contextGroupToken !== undefined) {
                text = text.replaceAll(settings.contextGroupToken, targetContextGroupName);
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
}
async function launcherInit() {
    const settings = await getLauncherSettings();
    if (settings !== null) {
        await fin.me.interop.registerIntentHandler((intent) => {
            manageIntent(intent, settings)
                .then((_) => {
                console.log(`Intent ${settings.intentName} managed.`);
                return true;
            })
                .catch((err) => {
                console.error(`Error received while trying to resolve intent ${settings.intentName}`, err);
            });
        }, settings.intentName);
    }
}
window.addEventListener("DOMContentLoaded", launcherInit);



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLndpbmRvd3MuaW50ZW50LXNuYXBzaG90LWxhdW5jaGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiU0FBQTtTQUNBOzs7OztVQ0RBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7O0FDS0EsSUFBSSxxQkFBcUIsR0FBVyxDQUFDLENBQUMsQ0FBQztBQUV2QyxLQUFLLFVBQVUsbUJBQW1CO0lBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxJQUFJLFFBQVEsR0FBcUIsRUFBRSxDQUFDO0lBQ3BDLElBQUksT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ2hELFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO1lBQ2xHLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztZQUN4RixPQUFPLElBQUksQ0FBQztTQUNaO0tBQ0Q7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNqQixDQUFDO0FBRUQsS0FBSyxVQUFVLG1CQUFtQixDQUFDLGdCQUF3QixFQUFFLGlCQUF5QjtJQUNyRixJQUFJLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO0lBQzlDLElBQUksc0JBQXNCLEtBQUssU0FBUyxFQUFFO1FBQ3pDLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FB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QUcsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxVQUFVLFdBQVcsQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLGlEQUFpRCxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hCO0FBQ0YsQ0FBQztBQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jb21tb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWNvbW1vbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS1jb21tb24vLi9jbGllbnQvc3JjL3dpbmRvd3MvaW50ZW50LXdpbmRvdy9pbnRlbnQtc25hcHNob3QtbGF1bmNoZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuaW50ZXJmYWNlIExhdW5jaGVyU2V0dGluZ3Mge1xuXHRpbnRlbnROYW1lPzogc3RyaW5nO1xuXHRzbmFwc2hvdFVybD86IHN0cmluZztcblx0aWRUb2tlbj86IHN0cmluZztcblx0aWROYW1lPzogc3RyaW5nO1xuXHRpZFRva2Vucz86IHsgaWRUb2tlbjogc3RyaW5nOyBpZE5hbWU6IHN0cmluZyB9W107XG5cdGNvbnRleHRHcm91cE5hbWU/OiBzdHJpbmc7XG5cdGNvbnRleHRHcm91cFRva2VuPzogc3RyaW5nO1xufVxubGV0IGxhc3RDb250ZXh0R3JvdXBJbmRleDogbnVtYmVyID0gLTE7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldExhdW5jaGVyU2V0dGluZ3MoKTogUHJvbWlzZTxMYXVuY2hlclNldHRpbmdzPiB7XG5cdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBmaW4ubWUuZ2V0T3B0aW9ucygpO1xuXHRsZXQgc2V0dGluZ3M6IExhdW5jaGVyU2V0dGluZ3MgPSB7fTtcblx0aWYgKG9wdGlvbnM/LmN1c3RvbURhdGE/LnNldHRpbmdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMuY3VzdG9tRGF0YS5zZXR0aW5ncyk7XG5cdFx0aWYgKHNldHRpbmdzLnNuYXBzaG90VXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gc2V0dXAgaW50ZW50IGhhbmRsZXIgYXMgd2UgbmVlZCBhIHNuYXBzaG90VXJsIHNldHRpbmcgcGFzc2VkIHRvIGZldGNoLlwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoc2V0dGluZ3MuaW50ZW50TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHNldHVwIGludGVudCBoYW5kbGVyIGFzIHdlIG5lZWQgYSBpbnRlbnROYW1lIHNldHRpbmcgcGFzc2VkLlwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnRleHRHcm91cE5hbWUoY29udGV4dEdyb3VwTmFtZTogc3RyaW5nLCBjb250ZXh0R3JvdXBUb2tlbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcblx0bGV0IHRhcmdldENvbnRleHRHcm91cE5hbWUgPSBjb250ZXh0R3JvdXBOYW1lO1xuXHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc3QgYXZhaWxhYmxlQ29udGV4dEdyb3VwcyA9IGF3YWl0IGZpbi5tZS5pbnRlcm9wLmdldENvbnRleHRHcm91cHMoKTtcblx0XHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSA9PT0gXCIqXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIHNwZWNpZmllZCBjb250ZXh0IGdyb3VwIGlzIGFsbCAoKikgaW5kaWNhdGluZyB0aGUgdGFyZ2V0IGdyb3VwIHNob3VsZCBiZSByb3RhdGVkLlwiKTtcblx0XHRcdGxhc3RDb250ZXh0R3JvdXBJbmRleCsrO1xuXHRcdFx0aWYgKGxhc3RDb250ZXh0R3JvdXBJbmRleCA+IGF2YWlsYWJsZUNvbnRleHRHcm91cHMubGVuZ3RoKSB7XG5cdFx0XHRcdGxhc3RDb250ZXh0R3JvdXBJbmRleCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXRDb250ZXh0R3JvdXBOYW1lID0gYXZhaWxhYmxlQ29udGV4dEdyb3Vwc1tsYXN0Q29udGV4dEdyb3VwSW5kZXhdLmlkO1xuXHRcdH1cblx0XHRjb25zdCB0YXJnZXRDb250ZXh0R3JvdXAgPSBhdmFpbGFibGVDb250ZXh0R3JvdXBzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gdGFyZ2V0Q29udGV4dEdyb3VwTmFtZSk7XG5cdFx0aWYgKHRhcmdldENvbnRleHRHcm91cCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAoY29udGV4dEdyb3VwVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XCJQYXNzZWQgY29udGV4dEdyb3VwTmFtZSBpcyBpbnZhbGlkIGFuZCBjYW5ub3QgYmUgdXNlZCBmb3IgY29udGV4dEdyb3VwVG9rZW4gcmVwbGFjZW1lbnQuIFNldHRpbmcgY29udGV4dCBncm91cCB0byBmaXJzdCBpbiBhdmFpbGFibGUgbGlzdDpcIixcblx0XHRcdFx0XHRhdmFpbGFibGVDb250ZXh0R3JvdXBzWzBdLmlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRhcmdldENvbnRleHRHcm91cE5hbWUgPSBhdmFpbGFibGVDb250ZXh0R3JvdXBzWzBdLmlkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiVGhlIHBhc3NlZCBjb250ZXh0IGdyb3VwIG5hbWUgaXMgbm90IHZhbGlkIGFuZCBpc24ndCB1c2VkIGluIHRoZSBzbmFwc2hvdCBzbyB3aWxsIG5vdCBiZSB1c2VkIG9yIGRlZmF1bHRlZC5cIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0YXJnZXRDb250ZXh0R3JvdXBOYW1lID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFyZ2V0Q29udGV4dEdyb3VwTmFtZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlSWRUb2tlbihzb3VyY2VUZXh0OiBzdHJpbmcsIGlkVG9rZW46IHN0cmluZywgaWRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcblx0aWYgKFxuXHRcdGlkVG9rZW4gPT09IHVuZGVmaW5lZCB8fFxuXHRcdGlkVG9rZW4gPT09IG51bGwgfHxcblx0XHRpZFRva2VuLnRyaW0oKS5sZW5ndGggPT09IDAgfHxcblx0XHRpZFZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRpZFZhbHVlID09PSBudWxsIHx8XG5cdFx0aWRWYWx1ZS50cmltKCkubGVuZ3RoID09PSAwXG5cdCkge1xuXHRcdHJldHVybiBzb3VyY2VUZXh0O1xuXHR9XG5cdHNvdXJjZVRleHQgPSBzb3VyY2VUZXh0LnJlcGxhY2VBbGwoaWRUb2tlbiwgaWRWYWx1ZSk7XG5cdHJldHVybiBzb3VyY2VUZXh0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBtYW5hZ2VJbnRlbnQoaW50ZW50OiBPcGVuRmluLkludGVudCwgc2V0dGluZ3M6IExhdW5jaGVyU2V0dGluZ3MpIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHNldHRpbmdzLnNuYXBzaG90VXJsLCB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiUmVjZWl2ZWQgc25hcHNob3QgcmVzcG9uc2VcIik7XG5cdFx0XHRsZXQgdGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcblx0XHRcdGlmIChpbnRlbnQ/LmNvbnRleHQ/LmlkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dGV4dCA9IHVwZGF0ZUlkVG9rZW4odGV4dCwgc2V0dGluZ3MuaWRUb2tlbiwgaW50ZW50LmNvbnRleHQuaWRbc2V0dGluZ3MuaWROYW1lXSk7XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLmlkVG9rZW5zKSkge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgaWRUb2tlbkVudHJ5IG9mIHNldHRpbmdzLmlkVG9rZW5zKSB7XG5cdFx0XHRcdFx0XHR0ZXh0ID0gdXBkYXRlSWRUb2tlbih0ZXh0LCBpZFRva2VuRW50cnkuaWRUb2tlbiwgaW50ZW50LmNvbnRleHQuaWRbaWRUb2tlbkVudHJ5LmlkTmFtZV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB0YXJnZXRDb250ZXh0R3JvdXBOYW1lOiBzdHJpbmcgPSBhd2FpdCBnZXRDb250ZXh0R3JvdXBOYW1lKFxuXHRcdFx0XHRzZXR0aW5ncy5jb250ZXh0R3JvdXBOYW1lLFxuXHRcdFx0XHRzZXR0aW5ncy5jb250ZXh0R3JvdXBUb2tlblxuXHRcdFx0KTtcblx0XHRcdGlmICh0YXJnZXRDb250ZXh0R3JvdXBOYW1lICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3MuY29udGV4dEdyb3VwVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlQWxsKHNldHRpbmdzLmNvbnRleHRHcm91cFRva2VuLCB0YXJnZXRDb250ZXh0R3JvdXBOYW1lKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHNuYXBzaG90OiBPcGVuRmluLlNuYXBzaG90ID0gSlNPTi5wYXJzZSh0ZXh0KTtcblx0XHRcdGNvbnN0IHBsYXRmb3JtID0gZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCk7XG5cdFx0XHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGF3YWl0IGZpbi5tZS5pbnRlcm9wLmpvaW5Db250ZXh0R3JvdXAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSk7XG5cdFx0XHRcdGF3YWl0IGZpbi5tZS5pbnRlcm9wLnNldENvbnRleHQoaW50ZW50LmNvbnRleHQpO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgcGxhdGZvcm0uYXBwbHlTbmFwc2hvdChzbmFwc2hvdCk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciB3aGlsZSB0cnlpbmcgdG8gaGFuZGxlIGludGVudCByZXF1ZXN0IGZvcjpcIiwgaW50ZW50Lm5hbWUsIGVycm9yKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBsYXVuY2hlckluaXQoKSB7XG5cdGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0TGF1bmNoZXJTZXR0aW5ncygpO1xuXG5cdGlmIChzZXR0aW5ncyAhPT0gbnVsbCkge1xuXHRcdGF3YWl0IGZpbi5tZS5pbnRlcm9wLnJlZ2lzdGVySW50ZW50SGFuZGxlcigoaW50ZW50KSA9PiB7XG5cdFx0XHRtYW5hZ2VJbnRlbnQoaW50ZW50LCBzZXR0aW5ncylcblx0XHRcdFx0LnRoZW4oKF8pID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhgSW50ZW50ICR7c2V0dGluZ3MuaW50ZW50TmFtZX0gbWFuYWdlZC5gKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGBFcnJvciByZWNlaXZlZCB3aGlsZSB0cnlpbmcgdG8gcmVzb2x2ZSBpbnRlbnQgJHtzZXR0aW5ncy5pbnRlbnROYW1lfWAsIGVycik7XG5cdFx0XHRcdH0pO1xuXHRcdH0sIHNldHRpbmdzLmludGVudE5hbWUpO1xuXHR9XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBsYXVuY2hlckluaXQpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9