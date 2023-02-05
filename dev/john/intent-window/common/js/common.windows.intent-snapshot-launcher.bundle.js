var __webpack_exports__ = {};
/*!**********************************************************************!*\
  !*** ./client/src/windows/intent-window/intent-snapshot-launcher.ts ***!
  \**********************************************************************/
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
        }, intentName);
    }
}
window.addEventListener("DOMContentLoaded", launcherInit);


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLndpbmRvd3MuaW50ZW50LXNuYXBzaG90LWxhdW5jaGVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBUUEsSUFBSSxxQkFBcUIsR0FBVyxDQUFDLENBQUMsQ0FBQztBQUV2QyxLQUFLLFVBQVUsbUJBQW1CO0lBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxJQUFJLFFBQVEsR0FBcUIsRUFBRSxDQUFDO0lBQ3BDLElBQUksT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQ2hELFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO1lBQ2xHLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztZQUN4RixPQUFPLElBQUksQ0FBQztTQUNaO0tBQ0Q7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNqQixDQUFDO0FBRUQsS0FBSyxVQUFVLG1CQUFtQixDQUFDLGdCQUF3QixFQUFFLGlCQUF5QjtJQUNyRixJQUFJLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO0lBQzlDLElBQUksc0JBQXNCLEtBQUssU0FBUyxFQUFFO1FBQ3pDLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3ZFLElBQUksc0JBQXNCLEtBQUssR0FBRyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUZBQXVGLENBQUMsQ0FBQztZQUNyRyxx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QUMsY0FBYyxFQUFFLENBQUM7Z0JBQy9DLElBQUksc0JBQXNCLEtBQUssU0FBUyxFQUFFO29CQUN6QyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzlELE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0YsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ2Y7QUFDRixDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLWNvbW1vbi8uL2NsaWVudC9zcmMvd2luZG93cy9pbnRlbnQtd2luZG93L2ludGVudC1zbmFwc2hvdC1sYXVuY2hlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgTGF1bmNoZXJTZXR0aW5ncyB7XG5cdGludGVudE5hbWU/OiBzdHJpbmc7XG5cdHNuYXBzaG90VXJsPzogc3RyaW5nO1xuXHRpZFRva2VuPzogc3RyaW5nO1xuXHRpZE5hbWU/OiBzdHJpbmc7XG5cdGNvbnRleHRHcm91cE5hbWU/OiBzdHJpbmc7XG5cdGNvbnRleHRHcm91cFRva2VuPzogc3RyaW5nO1xufVxubGV0IGxhc3RDb250ZXh0R3JvdXBJbmRleDogbnVtYmVyID0gLTE7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldExhdW5jaGVyU2V0dGluZ3MoKTogUHJvbWlzZTxMYXVuY2hlclNldHRpbmdzPiB7XG5cdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBmaW4ubWUuZ2V0T3B0aW9ucygpO1xuXHRsZXQgc2V0dGluZ3M6IExhdW5jaGVyU2V0dGluZ3MgPSB7fTtcblx0aWYgKG9wdGlvbnM/LmN1c3RvbURhdGE/LnNldHRpbmdzICE9PSB1bmRlZmluZWQpIHtcblx0XHRzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIG9wdGlvbnMuY3VzdG9tRGF0YS5zZXR0aW5ncyk7XG5cdFx0aWYgKHNldHRpbmdzLnNuYXBzaG90VXJsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gc2V0dXAgaW50ZW50IGhhbmRsZXIgYXMgd2UgbmVlZCBhIHNuYXBzaG90VXJsIHNldHRpbmcgcGFzc2VkIHRvIGZldGNoLlwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRpZiAoc2V0dGluZ3MuaW50ZW50TmFtZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIHNldHVwIGludGVudCBoYW5kbGVyIGFzIHdlIG5lZWQgYSBpbnRlbnROYW1lIHNldHRpbmcgcGFzc2VkLlwiKTtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc2V0dGluZ3M7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnRleHRHcm91cE5hbWUoY29udGV4dEdyb3VwTmFtZTogc3RyaW5nLCBjb250ZXh0R3JvdXBUb2tlbjogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcblx0bGV0IHRhcmdldENvbnRleHRHcm91cE5hbWUgPSBjb250ZXh0R3JvdXBOYW1lO1xuXHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc3QgYXZhaWxhYmxlQ29udGV4dEdyb3VwcyA9IGF3YWl0IGZpbi5tZS5pbnRlcm9wLmdldENvbnRleHRHcm91cHMoKTtcblx0XHRpZiAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSA9PT0gXCIqXCIpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIHNwZWNpZmllZCBjb250ZXh0IGdyb3VwIGlzIGFsbCAoKikgaW5kaWNhdGluZyB0aGUgdGFyZ2V0IGdyb3VwIHNob3VsZCBiZSByb3RhdGVkLlwiKTtcblx0XHRcdGxhc3RDb250ZXh0R3JvdXBJbmRleCsrO1xuXHRcdFx0aWYgKGxhc3RDb250ZXh0R3JvdXBJbmRleCA+IGF2YWlsYWJsZUNvbnRleHRHcm91cHMubGVuZ3RoKSB7XG5cdFx0XHRcdGxhc3RDb250ZXh0R3JvdXBJbmRleCA9IDA7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXRDb250ZXh0R3JvdXBOYW1lID0gYXZhaWxhYmxlQ29udGV4dEdyb3Vwc1tsYXN0Q29udGV4dEdyb3VwSW5kZXhdLmlkO1xuXHRcdH1cblx0XHRjb25zdCB0YXJnZXRDb250ZXh0R3JvdXAgPSBhdmFpbGFibGVDb250ZXh0R3JvdXBzLmZpbmQoKGVudHJ5KSA9PiBlbnRyeS5pZCA9PT0gdGFyZ2V0Q29udGV4dEdyb3VwTmFtZSk7XG5cdFx0aWYgKHRhcmdldENvbnRleHRHcm91cCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAoY29udGV4dEdyb3VwVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XCJQYXNzZWQgY29udGV4dEdyb3VwTmFtZSBpcyBpbnZhbGlkIGFuZCBjYW5ub3QgYmUgdXNlZCBmb3IgY29udGV4dEdyb3VwVG9rZW4gcmVwbGFjZW1lbnQuIFNldHRpbmcgY29udGV4dCBncm91cCB0byBmaXJzdCBpbiBhdmFpbGFibGUgbGlzdDpcIixcblx0XHRcdFx0XHRhdmFpbGFibGVDb250ZXh0R3JvdXBzWzBdLmlkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRhcmdldENvbnRleHRHcm91cE5hbWUgPSBhdmFpbGFibGVDb250ZXh0R3JvdXBzWzBdLmlkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFwiVGhlIHBhc3NlZCBjb250ZXh0IGdyb3VwIG5hbWUgaXMgbm90IHZhbGlkIGFuZCBpc24ndCB1c2VkIGluIHRoZSBzbmFwc2hvdCBzbyB3aWxsIG5vdCBiZSB1c2VkIG9yIGRlZmF1bHRlZC5cIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0YXJnZXRDb250ZXh0R3JvdXBOYW1lID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFyZ2V0Q29udGV4dEdyb3VwTmFtZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbGF1bmNoZXJJbml0KCkge1xuXHRjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldExhdW5jaGVyU2V0dGluZ3MoKTtcblxuXHRpZiAoc2V0dGluZ3MgIT09IG51bGwpIHtcblx0XHRjb25zdCBzbmFwc2hvdFVybDogc3RyaW5nID0gc2V0dGluZ3Muc25hcHNob3RVcmw7XG5cdFx0Y29uc3QgaWROYW1lOiBzdHJpbmcgPSBzZXR0aW5ncy5pZE5hbWU7XG5cdFx0Y29uc3QgY29udGV4dEdyb3VwTmFtZTogc3RyaW5nID0gc2V0dGluZ3MuY29udGV4dEdyb3VwTmFtZTtcblx0XHRjb25zdCBjb250ZXh0R3JvdXBUb2tlbjogc3RyaW5nID0gc2V0dGluZ3MuY29udGV4dEdyb3VwVG9rZW47XG5cdFx0Y29uc3QgaWRUb2tlbjogc3RyaW5nID0gc2V0dGluZ3MuaWRUb2tlbjtcblx0XHRjb25zdCBpbnRlbnROYW1lOiBzdHJpbmcgPSBzZXR0aW5ncy5pbnRlbnROYW1lO1xuXG5cdFx0YXdhaXQgZmluLm1lLmludGVyb3AucmVnaXN0ZXJJbnRlbnRIYW5kbGVyKGFzeW5jIChpbnRlbnQpID0+IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goc25hcHNob3RVcmwsIHtcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJSZWNlaXZlZCBzbmFwc2hvdCByZXNwb25zZVwiKTtcblx0XHRcdFx0bGV0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRpZE5hbWUgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdGludGVudD8uY29udGV4dD8uaWQgIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdGludGVudC5jb250ZXh0LmlkW2lkTmFtZV0gIT09IHVuZGVmaW5lZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlQWxsKGlkVG9rZW4sIGludGVudC5jb250ZXh0LmlkW2lkTmFtZV0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgdGFyZ2V0Q29udGV4dEdyb3VwTmFtZTogc3RyaW5nID0gYXdhaXQgZ2V0Q29udGV4dEdyb3VwTmFtZShjb250ZXh0R3JvdXBOYW1lLCBjb250ZXh0R3JvdXBUb2tlbik7XG5cdFx0XHRcdGlmICh0YXJnZXRDb250ZXh0R3JvdXBOYW1lICE9PSB1bmRlZmluZWQgJiYgY29udGV4dEdyb3VwVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2VBbGwoY29udGV4dEdyb3VwVG9rZW4sIHRhcmdldENvbnRleHRHcm91cE5hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnN0IHNuYXBzaG90OiBPcGVuRmluLlNuYXBzaG90ID0gSlNPTi5wYXJzZSh0ZXh0KTtcblx0XHRcdFx0Y29uc3QgcGxhdGZvcm0gPSBmaW4uUGxhdGZvcm0uZ2V0Q3VycmVudFN5bmMoKTtcblx0XHRcdFx0aWYgKHRhcmdldENvbnRleHRHcm91cE5hbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGF3YWl0IGZpbi5tZS5pbnRlcm9wLmpvaW5Db250ZXh0R3JvdXAodGFyZ2V0Q29udGV4dEdyb3VwTmFtZSk7XG5cdFx0XHRcdFx0YXdhaXQgZmluLm1lLmludGVyb3Auc2V0Q29udGV4dChpbnRlbnQuY29udGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YXdhaXQgcGxhdGZvcm0uYXBwbHlTbmFwc2hvdChzbmFwc2hvdCk7XG5cdFx0XHR9XG5cdFx0fSwgaW50ZW50TmFtZSk7XG5cdH1cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGxhdW5jaGVySW5pdCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=