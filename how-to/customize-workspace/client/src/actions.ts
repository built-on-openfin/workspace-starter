import { BrowserButtonType, BrowserCreateWindowRequest, CustomActionCallerType, CustomActionsMap, getCurrentSync } from "@openfin/workspace-platform";
import { updateToolbarButtons } from "./buttons";

export async function getActions(): Promise<CustomActionsMap> {
    return {
        "pin-window": async (payload)=> {
            if(payload.callerType === CustomActionCallerType.CustomButton) {
                const platform = getCurrentSync();
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                let options = await browserWindow.openfinWindow.getOptions();
                let currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: true });
                if(currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    let newButtons = updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
                
            }
        },
        "unpin-window": async (payload)=> {
            if(payload.callerType === CustomActionCallerType.CustomButton) {
                const platform = getCurrentSync();
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                let options = await browserWindow.openfinWindow.getOptions();
                let currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: false });
                if(currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    let newButtons = updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
            }
        }
    }
}