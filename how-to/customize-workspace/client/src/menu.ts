import { GlobalContextMenuItemTemplate, GlobalContextMenuOptionType, PageTabContextMenuItemTemplate, PageTabContextMenuOptionType, ViewTabContextMenuTemplate, ViewTabMenuOptionType } from "@openfin/workspace-platform";

export async function getGlobalMenu(defaultGlobalContextMenu: GlobalContextMenuItemTemplate[] = []): Promise<GlobalContextMenuItemTemplate[]> {
    const menuTemplateWithStorefront:GlobalContextMenuItemTemplate[] = [
        {
            type: 'normal',
            label: 'Close Window',
            data: {
                type: GlobalContextMenuOptionType.CloseWindow
            }
        },
        {
            type: 'separator',
            data: undefined
        },
        {
            type: 'normal',
            label: 'Open Store',
            data: {
                type: GlobalContextMenuOptionType.OpenStorefront
            }
        },
        {
            label: 'Open Home',
            data: {
                type: GlobalContextMenuOptionType.Custom,
                action: {
                    id: 'home-show'
                }
            }
        },
        {
            label: 'Toggle Notification Center',
            data: {
                type: GlobalContextMenuOptionType.Custom,
                action: {
                    id: 'notification-toggle'
                }
            }
        },
        {
            type: 'separator',
            data: undefined
        },
        {
            type: 'normal',
            label: 'Quit App',
            data: {
                type: GlobalContextMenuOptionType.Quit
            }
        }
    ];
    return menuTemplateWithStorefront;
}

export async function getPageMenu(defaultPageContextMenu: PageTabContextMenuItemTemplate[] = []): Promise<PageTabContextMenuItemTemplate[]> {
    const menuTemplate:PageTabContextMenuItemTemplate[] = [
        {
            label: 'Move Page to new Window',
            data: {
                type: PageTabContextMenuOptionType.Custom,
                action: {
                    id: 'move-page-to-new-window'
                }
            }
        },
        {
            type: 'separator',
            data: undefined
        },
        ...defaultPageContextMenu
    ];
    return menuTemplate;
}

export async function getViewMenu(defaultViewContextMenu: ViewTabContextMenuTemplate[] = []): Promise<ViewTabContextMenuTemplate[]> {
    const menuTemplate:ViewTabContextMenuTemplate[] = [
        {
            label: 'Move View(s) to new Window',
            data: {
                type: ViewTabMenuOptionType.Custom,
                action: {
                    id: 'move-view-to-new-window'
                }
            }
        },
        {
            type: 'separator',
            data: undefined
        },
        ...defaultViewContextMenu
    ];
    return menuTemplate;
}