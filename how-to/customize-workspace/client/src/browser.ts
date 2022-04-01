import { BrowserCreateWindowRequest, 
    BrowserOverrideCallback, 
    CreateSavedPageRequest, 
    getCurrentSync, 
    OpenGlobalContextMenuPayload, 
    OpenPageTabContextMenuPayload, 
    OpenViewTabContextMenuPayload, 
    Page, 
    UpdateSavedPageRequest } from '@openfin/workspace-platform';
import { getDefaultToolbarButtons } from './buttons';
import { getGlobalMenu, getPageMenu, getViewMenu } from './menu';
import { getSettings } from './settings';
import { PlatformStorage } from './platform-storage';
import { decorateSnapshot, applyDecoratedSnapshot } from './native-window-integration';

const pageBoundsStorage = new PlatformStorage("page-bounds", "Page Bounds");

async function savePageBounds(pageId:string) {

    let bounds = await getPageBounds(pageId);

    await pageBoundsStorage.saveToStorage<OpenFin.Bounds>(pageId, bounds);
}

async function deletePageBounds(pageId:string) {
    await pageBoundsStorage.clearStorageEntry(pageId);
}

export async function getPage(pageId:string) {
    let platform = getCurrentSync();
    return platform.Storage.getPage(pageId);
}

export async function getPages() {
    let platform = getCurrentSync();
    return platform.Storage.getPages();
}

export async function deletePage(pageId:string) {
    let platform = getCurrentSync();
    await deletePageBounds(pageId);
    return platform.Storage.deletePage(pageId);
}

export async function getPageBounds(pageId:string, fromStorage = false): Promise<OpenFin.Bounds> {

    let bounds = null;

    if(fromStorage) {
        bounds = await pageBoundsStorage.getFromStorage<OpenFin.Bounds>(pageId);
    } else {
        let platform = getCurrentSync();
        let pages = await platform.Browser.getAllAttachedPages();
        let windowId;
    
        pages.forEach(page => {
            if(page.pageId === pageId) {
                windowId = page.parentIdentity;
            }
        });
    
        if(windowId !== undefined) {
            let hostWindow = platform.Browser.wrapSync(windowId);
    
            bounds = await hostWindow.openfinWindow.getBounds();
        }
    }
    return bounds;
}

export async function launchPage(page:Page, bounds?: OpenFin.Bounds){
    let customBounds = bounds || await pageBoundsStorage.getFromStorage<OpenFin.Bounds>(page.pageId);
    let platform = getCurrentSync();
    let newWindow: BrowserCreateWindowRequest = {
        workspacePlatform: {
            pages: [page]
        }
    };

    if(bounds !== undefined){
        newWindow.height = customBounds.height;
        newWindow.width = customBounds.width;
        newWindow.x = customBounds.left;
        newWindow.y = customBounds.top;
        newWindow.defaultHeight = customBounds.height;
        newWindow.defaultWidth = customBounds.width;
        newWindow.defaultLeft = customBounds.left;
        newWindow.defaultTop = customBounds.top;
    }

    return platform.Browser.createWindow(newWindow);
}

export async function launchView(view:OpenFin.PlatformViewCreationOptions | string , targetIdentity?: OpenFin.Identity){
    let platform = getCurrentSync();
    let viewOptions;
    if(typeof view === "string"){
        viewOptions = { "url": view};
    } else {
        viewOptions = view;
    }
    return platform.createView(viewOptions, targetIdentity);
}

export async function getDefaultWindowOptions() {
    const settings = await getSettings();

    return {
        icon: settings.browserProvider.windowOptions?.icon,
        workspacePlatform: {
            pages: null,
            title: settings.browserProvider.windowOptions?.title,
            favicon: settings.browserProvider.windowOptions?.icon,
            newTabUrl: settings.browserProvider.windowOptions?.newTabUrl,
            newPageUrl: settings.browserProvider.windowOptions?.newPageUrl,
            toolbarOptions: {
                buttons: await getDefaultToolbarButtons()
                }
            }
    }
};

export const overrideCallback: BrowserOverrideCallback = async (WorkspacePlatformProvider) => {
    const settings = await getSettings();
    const enableNWI = settings.platformProvider.enableNativeWindowIntegration;
    class Override extends WorkspacePlatformProvider {
        async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
            const snapshot = await super.getSnapshot(...args);

            if(enableNWI) {
                const decoratedSnapshot = await decorateSnapshot(snapshot);
                return decoratedSnapshot;
            } 
            return snapshot;
        }

        async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
            await super.applySnapshot(...args);

            if(enableNWI) {
                await applyDecoratedSnapshot(args[0].snapshot);
            }
        }

        async quit(payload, callerIdentity) {
            return super.quit(payload, callerIdentity);
        }

        async openGlobalContextMenu(req: OpenGlobalContextMenuPayload, callerIdentity: OpenFin.Identity) {
            return super.openGlobalContextMenu(
                {
                    ...req,
                    template: await getGlobalMenu(req.template)
                },
                callerIdentity
            );
        }
        
        async openViewTabContextMenu(req: OpenViewTabContextMenuPayload, callerIdentity: OpenFin.Identity) {
            return super.openViewTabContextMenu({
                ...req,
                template: await getViewMenu(req.template)
            }, callerIdentity);
        };
        
        async openPageTabContextMenu(req: OpenPageTabContextMenuPayload, callerIdentity: OpenFin.Identity) {
            return super.openPageTabContextMenu({
                ...req,
                template: await getPageMenu(req.template)
            }, callerIdentity);
        }

        async getSavedPages(query?: string): Promise<Page[]> {
            return super.getSavedPages(query);
        }
        
        async getSavedPage(id: string): Promise<Page> {
            return super.getSavedPage(id);
        }

        async createSavedPage(req: CreateSavedPageRequest): Promise<void>{
            await savePageBounds(req.page.pageId);
            
            super.createSavedPage(req);
        }

        async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
            await savePageBounds(req.pageId);
            super.updateSavedPage(req);
        }
        
        async deleteSavedPage(id: string): Promise<void> {
            deletePageBounds(id);
            super.deleteSavedPage(id);
        }
    }
    return new Override();
};