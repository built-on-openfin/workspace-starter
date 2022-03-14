import { LayoutExtended } from '@openfin/workspace';
import { BrowserWindowModule, getCurrentSync, Page, PageLayout, PageWithUpdatableRuntimeAttribs, WorkspacePlatformModule } from '@openfin/workspace-platform';
import { v4 } from 'uuid';

const platform: WorkspacePlatformModule = getCurrentSync();

export async function getPage(pageId:string): Promise<Page> {
    return platform.Storage.getPage(pageId);
}

export async function getPages(): Promise<Page[]> {
    return platform.Storage.getPages();
}

export async function deletePage(pageId:string): Promise<void> {
    return platform.Storage.deletePage(pageId);
}

export async function launchPage(page:Page): Promise<BrowserWindowModule> {
    return platform.Browser.createWindow({
        workspacePlatform: {
            pages: [page]
        }
    });
}

export async function launchView(view:OpenFin.PlatformViewCreationOptions | string , targetIdentity?: OpenFin.Identity){
    let viewOptions;
    if(typeof view === "string"){
        viewOptions = { "url": view};
    } else {
        viewOptions = view;
    }
    return platform.createView(viewOptions, targetIdentity);
}

export async function createPageLayout(layout): Promise<PageLayout> {
    const layoutId: string = `layout-${v4()}`;
    return {
        ...layout,
        layoutDetails: { layoutId }
    } as PageLayout;
}

export async function createPageWithLayout(title: string, layout: LayoutExtended): Promise<PageWithUpdatableRuntimeAttribs> {
    const layoutWithDetails = await createPageLayout(layout);
    return {
        pageId: v4(),
        title,
        layout: layoutWithDetails,
        isReadOnly: false,
        hasUnsavedChanges: true
    };
}

export function createViewIdentity(uuid: string, name: string): OpenFin.Identity {
    const viewIdentity: OpenFin.Identity = { uuid: uuid, name: `${v4}-${name}` };
    return viewIdentity;
}
