import { BrowserCreateWindowRequest, CustomActionCallerType, CustomActionsMap, getCurrentSync } from "@openfin/workspace-platform";
import { toggleNotificationCenter } from "@openfin/workspace/notifications";
import { getDefaultWindowOptions } from "./browser";
import { updateToolbarButtons } from "./buttons";
import { show } from "./home";
import { showShareOptions } from "./share";

async function getViewWindowIdentity(view:OpenFin.View): Promise<OpenFin.Identity> {
    let currentWindow = await view.getCurrentWindow();
    
    if (currentWindow.identity.name === undefined || currentWindow.identity.name === fin.me.identity.uuid) {

    let windowIdentity = new Promise<OpenFin.Identity>( (resolve,reject) => {
        view.once("target-changed", async () => {
            let hostWindow = await view.getCurrentWindow();
            resolve( hostWindow.identity );
        });
    });

    return await windowIdentity;
    } else {
    return  currentWindow.identity;
    }
}

export async function getActions(): Promise<CustomActionsMap> {
    return {
        "move-view-to-new-window": async(payload) => {
            if(payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
                const platform = getCurrentSync();
                let initialView = await platform.createView({name: payload.selectedViews[0].name} as OpenFin.PlatformViewCreationOptions);
                if(payload.selectedViews.length > 1) {
                    let windowIdentity = await getViewWindowIdentity(initialView);
                    for(let i = 1; i < payload.selectedViews.length; i++) {
                         platform.createView({name: payload.selectedViews[i].name} as OpenFin.PlatformViewCreationOptions, windowIdentity, initialView.identity);
                    }
                }
            }
        },
        "move-page-to-new-window": async(payload) => {
            if(payload.callerType === CustomActionCallerType.PageTabContextMenu) {
                const platform = getCurrentSync();
                const windowOptions = await getDefaultWindowOptions();
                const win = platform.Browser.wrapSync(payload.windowIdentity);
                const page = await win.getPage(payload.pageId);
                windowOptions.workspacePlatform.pages = [page];
                await platform.createWindow(windowOptions);
                await win.removePage(page.pageId);
            }
        },
        "pin-window": async (payload)=> {
            if(payload.callerType === CustomActionCallerType.CustomButton) {
                const platform = getCurrentSync();
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                let options = await browserWindow.openfinWindow.getOptions();
                let currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: true });
                if(currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    let newButtons = await updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
                
            }

            if(payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
                const platform = getCurrentSync();
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                let options = await browserWindow.openfinWindow.getOptions();
                let currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ alwaysOnTop: true });
                if(currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    let newButtons = await updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
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
                    let newButtons = await updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
            }
        },
        "home-show": async ()=> {
            await show();
        },
        "notification-toggle": async ()=> {
            await toggleNotificationCenter();
        },
        "share": async (payload)=> {
            if(payload.callerType === CustomActionCallerType.CustomButton) {
                await showShareOptions(payload);
            }
        },
        "change-opacity": async (payload)=> {
            if(payload.callerType === CustomActionCallerType.CustomButton) {
                const platform = getCurrentSync();
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                let options = await browserWindow.openfinWindow.getOptions();
                let currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ opacity: 0.7 });
                if(currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    let newButtons = await updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
            }
        },
        "restore-opacity": async (payload)=> {
            if(payload.callerType === CustomActionCallerType.CustomButton) {
                const platform = getCurrentSync();
                const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
                let options = await browserWindow.openfinWindow.getOptions();
                let currentToolbarOptions = (options as BrowserCreateWindowRequest).workspacePlatform.toolbarOptions;
                await browserWindow.openfinWindow.updateOptions({ opacity: 1 });
                
                if(currentToolbarOptions !== undefined && currentToolbarOptions !== null) {
                    let newButtons = await updateToolbarButtons(currentToolbarOptions.buttons, payload.customData.sourceId,  payload.customData.replacementId);
                    await browserWindow.replaceToolbarOptions({ buttons: newButtons });
                }
            }
        }
    }
}