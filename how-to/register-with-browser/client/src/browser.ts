import { LayoutExtended } from '@openfin/workspace';
import { getCurrentSync, PageLayout, PageWithUpdatableRuntimeAttribs, WorkspacePlatformModule } from '@openfin/workspace-platform';
import { v4 } from 'uuid';

const platform: WorkspacePlatformModule = getCurrentSync();

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
