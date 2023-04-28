import type OpenFin from "@openfin/core";
import {
	BrowserButtonType,
	PanelPosition,
	getCurrentSync,
	type BrowserCreateWindowRequest,
	type BrowserWindowModule,
	type Page,
	type PageLayout,
	type PageLayoutDetails,
	type PageWithUpdatableRuntimeAttribs,
	type ToolbarOptions
} from "@openfin/workspace-platform";

const DEFAULT_PAGE_LAYOUT: () => PageLayout = () => ({
	content: [
		{
			type: "stack",
			content: [
				{
					type: "component",
					componentName: "view",
					componentState: {
						uuid: fin.me.uuid,
						name: `${randomUUID()}-v1`,
						url: "https://examples.com"
					}
				},
				{
					type: "component",
					componentName: "view",
					componentState: {
						uuid: fin.me.uuid,
						name: `${randomUUID()}-v2`,
						url: "https://openfin.co"
					}
				}
			]
		}
	]
});

document.addEventListener("DOMContentLoaded", async () => {
	// create browser window with view
	const createBrowserWinBtn = document.querySelector("#launch-browser-window");
	if (createBrowserWinBtn) {
		createBrowserWinBtn.addEventListener("click", async () => createBrowserWindow());
	}

	// create browser window with no save requirement
	const createBrowserWinNoSaveBtn = document.querySelector("#launch-browser-window-no-save");
	if (createBrowserWinNoSaveBtn) {
		createBrowserWinNoSaveBtn.addEventListener("click", createBrowserWindowWithoutRequiringSave);
	}

	// create browser window maximized
	const createBrowserMaximized = document.querySelector("#launch-browser-window-maximized");
	if (createBrowserMaximized) {
		createBrowserMaximized.addEventListener("click", createBrowserWindowMaximized);
	}

	// create browser window with custom save page button
	const customToolbarBtn = document.querySelector("#launch-browser-window-with-custom-btn");
	if (customToolbarBtn) {
		customToolbarBtn.addEventListener("click", createCustomToolbarWindow);
	}

	// create browser window with single page and no tab
	const singlePageBrowserWinNoTabBtn = document.querySelector("#launch-nopagetab-browser-window");
	if (singlePageBrowserWinNoTabBtn) {
		singlePageBrowserWinNoTabBtn.addEventListener("click", createSinglePageNoTabWindow);
	}

	// create browser window with multiple pages
	const multiPageBrowserWinBtn = document.querySelector("#launch-multipage-browser-window");
	if (multiPageBrowserWinBtn) {
		multiPageBrowserWinBtn.addEventListener("click", createMultiPageWindow);
	}

	// create browser window with fixed views
	const fixedViews = document.querySelector("#launch-fixed-views");
	if (fixedViews) {
		fixedViews.addEventListener("click", createWindowWithFixedViews);
	}

	// get all browser pages
	const getBrowserPagesBtn = document.querySelector("#get-browser-pages");
	if (getBrowserPagesBtn) {
		getBrowserPagesBtn.addEventListener("click", async () => {
			await (fin.me as OpenFin.Window).showDeveloperTools();
			const platform = getCurrentSync();
			const lastFocusedWindow = await platform.Browser.getLastFocusedWindow();
			if (lastFocusedWindow) {
				const pages = await platform.Browser.getAllAttachedPages();
				const { uuid, name } = await platform.Browser.getLastFocusedWindow();
				const wrappedBrowserWindow = platform.Browser.wrapSync({ uuid, name });
				const lastBrowserWindowPages = await wrappedBrowserWindow.getPages();
				const unsavedPages = lastBrowserWindowPages.filter((page) => page.hasUnsavedChanges);
				console.dir({ message: "All PAGES", pages });
				console.dir({ message: "UNSAVED PAGES", unsavedPages });
				console.dir({ message: "LAST FOCUSED WINDOW", wrappedBrowserWindow });
			}
		});
	}

	// Create browser window with fixed views
	const singleLockedPage = document.querySelector("#launch-single-locked-page");
	if (singleLockedPage) {
		singleLockedPage.addEventListener("click", createWindowWithLockedPage);
	}

	// quit launcher / browser
	const quitBtn = document.querySelector("#quit");
	if (quitBtn) {
		quitBtn.addEventListener("click", async () => {
			const platform = getCurrentSync();
			await platform.quit();
		});
	}
});

/**
 * Create a browser window.
 * @param hasUnsavedChanges Determines if the window has unsaved changed.
 * @returns The created window.
 */
export async function createBrowserWindow(hasUnsavedChanges = true): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT(), hasUnsavedChanges);
	const pages: Page[] = [page];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a browser window which has changes so required saving.
 * @returns The created browser window.
 */
export async function createBrowserWindowWithoutRequiringSave(): Promise<BrowserWindowModule> {
	return createBrowserWindow(false);
}

/**
 * Create a browser window in its maximized state.
 * @returns The created browser window.
 */
export async function createBrowserWindowMaximized(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const pages: Page[] = [page];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages },
		state: "maximized"
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a browser window which has a single page and hidden tabs.
 * @returns The created browser window.
 */
export async function createSinglePageNoTabWindow(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const pages: Page[] = [page];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages, disableMultiplePages: true },
		experimental: {
			showFavicons: false
		}
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a window which has a custom toolbar.
 * @returns The created browser window.
 */
export async function createCustomToolbarWindow(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const pages: Page[] = [page];
	const toolbarOptions: ToolbarOptions = {
		buttons: [
			{
				type: BrowserButtonType.Custom,
				tooltip: "Save Current Page",
				iconUrl: "https://www.openfin.co/favicon.ico",
				action: {
					id: "custom-save-page",
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
			},
			{
				type: BrowserButtonType.LockUnlockPage
			}
		]
	};
	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages, toolbarOptions }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a window which has multiple pages.
 * @returns The created browser window.
 */
export async function createMultiPageWindow(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const page1: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const page2: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const pages: Page[] = [page, page1, page2];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a window with a locked page.
 * @returns The created browser window.
 */
export async function createWindowWithLockedPage(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const page1: Page = await createPageWithLayout("Locked Page", DEFAULT_PAGE_LAYOUT());
	const lockPage1: Page = { isLocked: true, ...page1 };
	const pages: Page[] = [page, lockPage1];
	const toolbarOptions: ToolbarOptions = {
		buttons: [
			{
				type: BrowserButtonType.Custom,
				tooltip: "Save Current Page",
				iconUrl: "https://www.openfin.co/favicon.ico",
				action: {
					id: "custom-save-page",
					customData: {
						pageId: page.pageId,
						layout: page.layout
					}
				}
			},
			{
				type: BrowserButtonType.Custom,
				tooltip: "Manual Lock Page",
				iconUrl: "http://localhost:8080/icons/lock.svg",
				action: {
					id: "lock-page-toggle"
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
			},
			{
				type: BrowserButtonType.SavePage
			}
		]
	};

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages, toolbarOptions }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a window which has fixed views.
 * @returns The created browser window.
 */
export async function createWindowWithFixedViews(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", DEFAULT_PAGE_LAYOUT());
	const page2: Page = await createPageWithLayout("Untitled Page (2)", DEFAULT_PAGE_LAYOUT());

	page.panels = [
		{
			position: PanelPosition.Top,
			height: "50px",
			viewOptions: {
				url: "http://localhost:8080/html/top-panel.html"
			}
		},
		{
			position: PanelPosition.Left,
			width: "50px",
			viewOptions: {
				url: "http://localhost:8080/html/left-panel.html"
			}
		},
		{
			position: PanelPosition.Right,
			width: "50px",
			viewOptions: {
				url: "http://localhost:8080/html/right-panel.html"
			}
		},
		{
			position: PanelPosition.Bottom,
			height: "50px",
			viewOptions: {
				url: "http://localhost:8080/html/bottom-panel.html"
			}
		}
	];

	page2.panels = [
		{
			position: PanelPosition.Top,
			height: "50px",
			viewOptions: {
				url: "http://localhost:8080/html/top-panel.html"
			}
		}
	];

	const pages: Page[] = [page, page2];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

/**
 * Create a page with a specific layout.
 * @param title The title of the page.
 * @param layout The layout for the page.
 * @param hasUnsavedChanges Flag to determine if it has unsaved changed.
 * @returns The created page.
 */
export async function createPageWithLayout(
	title: string,
	layout: PageLayout,
	hasUnsavedChanges = true
): Promise<PageWithUpdatableRuntimeAttribs> {
	return {
		pageId: randomUUID(),
		title,
		layout: {
			...layout,
			layoutDetails: { layoutId: `layout-${randomUUID()}` } as unknown as PageLayoutDetails
		},
		isReadOnly: false,
		hasUnsavedChanges
	};
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
export function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	const getRandomHex = (c: string): string =>
		// eslint-disable-next-line no-bitwise, no-mixed-operators
		(Number(c) ^ (window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(
			16
		);
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
