import { BrowserButtonType, CustomBrowserButtonConfig, ToolbarButton } from "@openfin/workspace-platform";

const availableToolbarButtons = [
    { include: true, button: {  // adding a custom tray icon for the window
        type: BrowserButtonType.Custom,
        tooltip: 'Pin this window',
        disabled: false,
        iconUrl: 'http://localhost:8080/icons/pin.svg',
        action: {
            // This action needs to be registed in customActions property in the call WorkspacePlatform.init
            id: 'pin-window',
            customData: {
                sourceId: "pin-window",
                replacementId: "unpin-window"
            }
        }
    }},
    { include: false, button: {  
        type: BrowserButtonType.Custom,
        tooltip: 'Unpin this window',
        disabled: false,
        iconUrl: 'http://localhost:8080/icons/pin-vertical.svg',
        action: {
            id: 'unpin-window',
            customData: {
                sourceId: "unpin-window",
                replacementId: "pin-window"
            }
        }
    }},
    { include: true, button: {
        type: BrowserButtonType.ShowHideTabs
    }},
    { include: true, button: {
        type: BrowserButtonType.ColorLinking
    }},
    { include: true, button: {
        type: BrowserButtonType.PresetLayouts
    }},
    { include: true, button: {
        type: BrowserButtonType.SavePage
    }}
];

export function getDefaultToolbarButtons(): ToolbarButton[] {
    let defaultButtons = [];
    availableToolbarButtons.forEach(entry => {
        if(entry.include){
            defaultButtons.push(entry.button);
        }
    });
    return defaultButtons;
}

export function updateToolbarButtons(buttons: ToolbarButton[], buttonId:string, replacementButtonId:string) { 
    let index = buttons.findIndex(entry => {
        if(entry.type === BrowserButtonType.Custom) {
            if((entry as CustomBrowserButtonConfig).action.customData.sourceId === buttonId){
                return true;
            } 
        }
        return false;
    });

    if(index !== -1) {
        let replacement = availableToolbarButtons.find(entry => entry.button?.action?.customData?.sourceId === replacementButtonId);
        buttons[index] = replacement.button;
        return buttons;
    }

    return buttons;
}