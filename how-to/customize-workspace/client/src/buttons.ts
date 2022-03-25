import { BrowserButtonType, CustomBrowserButtonConfig, ToolbarButton } from "@openfin/workspace-platform";
import { getSettings } from "./settings";

export async function getDefaultToolbarButtons(): Promise<ToolbarButton[]> {
    let defaultButtons = [];
    let settings = await getSettings();
    let availableToolbarButtons = settings?.browserProvider?.toolbarButtons || [];

    availableToolbarButtons.forEach(entry => {
        if(entry.include){
            defaultButtons.push(entry.button);
        }
    });
    return defaultButtons;
}

export async function updateToolbarButtons(buttons: ToolbarButton[], buttonId:string, replacementButtonId:string) { 
    let index = buttons.findIndex(entry => {
        if(entry.type === BrowserButtonType.Custom) {
            if((entry as CustomBrowserButtonConfig).action.customData.sourceId === buttonId){
                return true;
            } 
        }
        return false;
    });

    if(index !== -1) {
        let settings = await getSettings();
        let availableToolbarButtons = settings?.browserProvider?.toolbarButtons || [];
        let replacement = availableToolbarButtons.find(entry => {
            if(entry.button.type === BrowserButtonType.Custom) {
                let customButton = entry.button as CustomBrowserButtonConfig;
                return customButton?.action?.customData?.sourceId === replacementButtonId
            } else {
                return false;
            }

        });
        buttons[index] = replacement.button;
        return buttons;
    }

    return buttons;
}