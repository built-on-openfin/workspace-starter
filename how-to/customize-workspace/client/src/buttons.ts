import { BrowserButtonType, CustomBrowserButtonConfig, ToolbarButton } from "@openfin/workspace-platform";
import { getCurrentTheme, getSettings } from "./settings";
import { ToolbarButtonDefinition } from "./shapes";

let allToolbarButtons: ToolbarButtonDefinition[];
let defaultToolbarButtons: ToolbarButton[];

async function getAvailableToolbarButtons(): Promise<ToolbarButtonDefinition[]> {
    if(Array.isArray(allToolbarButtons)){
        return allToolbarButtons;
    }
    let settings = await getSettings();
    let theme = await getCurrentTheme();
    let availableToolbarButtons = settings?.browserProvider?.toolbarButtons || [];
    let validatedToolbarButtons = [];

    availableToolbarButtons.forEach(entry => {
            if(entry.button["iconUrl"] !== undefined && theme?.label !== undefined &&
            entry.themes !== undefined && entry.themes[theme.label] !== undefined) {
                entry.button["iconUrl"] = entry.themes[theme.label];
            }
            validatedToolbarButtons.push(entry);
    });
    allToolbarButtons = validatedToolbarButtons;
    return validatedToolbarButtons;
}

export async function getDefaultToolbarButtons(): Promise<ToolbarButton[]> {
    if(Array.isArray(defaultToolbarButtons)){
        return defaultToolbarButtons;
    }

    let defaultButtons = [];
    let availableToolbarButtons = await getAvailableToolbarButtons();

    availableToolbarButtons.forEach(entry => {
        if(entry.include) {
            defaultButtons.push(entry.button);
        }
    });
    defaultToolbarButtons = defaultButtons;
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
        let availableToolbarButtons = await getAvailableToolbarButtons();
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