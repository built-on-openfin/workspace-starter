import { fin } from "openfin-adapter/src/mock";
import { BrowserCreateWindowRequest, BrowserButtonType, BrowserWindowModule, getCurrentSync, Page, ToolbarOptions, WorkspacePlatformModule, PageLayout } from '@openfin/workspace-platform';
import { createPageWithLayout, createViewIdentity } from "./browser";

const platform: WorkspacePlatformModule = getCurrentSync();
const defaultPageLayout: PageLayout = {
    content: [
        {
            type: 'stack',
            content: [
                {
                    type: 'component',
                    componentName: 'view',
                    componentState: {
                        identity: createViewIdentity(fin.me.uuid, 'v1'),
                        url: 'https://examples.com'
                    }
                },
                {
                    type: 'component',
                    componentName: 'view',
                    componentState: {
                        identity: createViewIdentity(fin.me.uuid, 'v2'),
                        url: 'https://openfin.co'
                    }
                }
            ]
        }
    ]
};

export async function createBrowserWindow(): Promise<BrowserWindowModule> {
    const page: Page = await createPageWithLayout('Untitled Page', defaultPageLayout);
    const pages: Page[] = [page];

    const options: BrowserCreateWindowRequest = {
        workspacePlatform: { pages }
    };
    const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
    return createdBrowserWin;
}

export async function createSinglePageNoTabWindow(): Promise<BrowserWindowModule> {
    const page: Page = await createPageWithLayout('Untitled Page', defaultPageLayout);
    const pages: Page[] = [page];

    const options: BrowserCreateWindowRequest = {
        workspacePlatform: { pages, disableMultiplePages:true }
    };
    const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
    return createdBrowserWin;
}

export async function createCustomToolbarWindow(): Promise<BrowserWindowModule> {
    const page: Page = await createPageWithLayout('Untitled Page', defaultPageLayout);
    const pages: Page[] = [page];
    const toolbarOptions: ToolbarOptions = {
        buttons: [
            {
                type: BrowserButtonType.Custom,
                tooltip: 'Save Current Page',
                iconUrl: 'https://www.openfin.co/favicon.ico',
                action: {
                    id: 'custom-save-page-clicked',
                    customData: {
                        pageId: page.pageId,
                        layout: page.layout
                    }
                }
            },
            {
                type: BrowserButtonType.ShowHideTabs
            },
            {
                type: BrowserButtonType.ColorLinking
            },
            {
                type: BrowserButtonType.PresetLayouts
            }
        ]
    };
    const options: BrowserCreateWindowRequest = {
        workspacePlatform: { pages, toolbarOptions }
    };
    const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
    return createdBrowserWin;
}

export async function createMultiPageWindow(): Promise<BrowserWindowModule> {
    const page: Page = await createPageWithLayout('Untitled Page', defaultPageLayout);
    const pages: Page[] = [page, page, page];
    const options: BrowserCreateWindowRequest = {
        workspacePlatform: { pages }
    };
    const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
    return createdBrowserWin;
}

document.addEventListener('DOMContentLoaded', async () => {

    (fin.me as OpenFin.Window).showDeveloperTools();

    /************************ CREATE BROWSER WINDOW WITH VIEW ************************/
    const createBrowserWinBtn = document.querySelector("#launch-browser-window");
    createBrowserWinBtn.addEventListener('click', createBrowserWindow);

    /************************ CREATE BROWSER WINDOW WITH CUSTOM SAVE PAGE BUTTON ************************/
    const customToolbarBtn = document.querySelector("#launch-browser-window-with-custom-btn");
    customToolbarBtn.addEventListener('click', createCustomToolbarWindow);

    /************************ CREATE BROWSER WINDOW WITH SINGLE PAGE AND NO TAB ************************/
    const singlePageBrowserWinNoTabBtn = document.querySelector("#launch-nopagetab-browser-window");
    singlePageBrowserWinNoTabBtn.addEventListener('click', createSinglePageNoTabWindow);

    /************************ CREATE BROWSER WINDOW WITH MULTIPLE PAGES ************************/
    const multiPageBrowserWinBtn = document.querySelector("#launch-multipage-browser-window");
    multiPageBrowserWinBtn.addEventListener('click', createMultiPageWindow);

    /************************ GET ALL BROWSER PAGES ************************/
    const getBrowserPagesBtn = document.querySelector("#get-browser-pages");
    getBrowserPagesBtn.addEventListener('click', async () => {
        const lastFocusedWindow = await platform.Browser.getLastFocusedWindow();
        if(lastFocusedWindow) {
            const pages = await platform.Browser.getAllAttachedPages();
            const { uuid, name } = await platform.Browser.getLastFocusedWindow();
            const wrappedBrowserWindow = platform.Browser.wrapSync({ uuid, name });
            const lastBrowserWindowPages = await wrappedBrowserWindow.getPages();
            const unsavedPages = lastBrowserWindowPages.filter(page => page.hasUnsavedChanges);
            console.dir({ message: "All PAGES", pages });
            console.dir({ message: "UNSAVED PAGES", unsavedPages });
            console.dir({ message: "LAST FOCUSED WINDOW", wrappedBrowserWindow });
        }
    });

    /************************ QUIT LAUNCHER / BROWSER ************************/
    const quitBtn = document.querySelector("#quit");
    quitBtn.addEventListener('click', () => {
        platform.quit();
    });
});
