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
/** Identifiers for each browser launch scenario. */
export type BrowserScenarioId =
	| "default"
	| "no-save"
	| "maximized"
	| "custom-toolbar"
	| "no-page-tab"
	| "multi-page"
	| "locked-page"
	| "fixed-views"
	| "duplicate-page-titles"
	| "pinned-pages";

/** A browser window scenario that can be launched from the provider UI. */
export interface BrowserScenario {
	/** Scenario id used as the select option value. */
	id: BrowserScenarioId;
	/** Human-readable label shown in the scenario dropdown. */
	label: string;
	/** Creates a browser window for this scenario. */
	launch: () => Promise<BrowserWindowModule>;
}

/**
 * Create a browser window.
 * @param hasUnsavedChanges Determines if the window has unsaved changed.
 * @returns The created window.
 */
async function createBrowserWindow(hasUnsavedChanges = true): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout(
		"Untitled Page",
		createDefaultPageLayout(),
		hasUnsavedChanges
	);
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
async function createBrowserWindowWithoutRequiringSave(): Promise<BrowserWindowModule> {
	return createBrowserWindow(false);
}

/**
 * Create a browser window in its maximized state.
 * @returns The created browser window.
 */
async function createBrowserWindowMaximized(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
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
async function createSinglePageNoTabWindow(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
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
async function createCustomToolbarWindow(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
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
				type: BrowserButtonType.Custom,
				tooltip: "Rename Current Page",
				iconUrl: "https://www.openfin.co/favicon.ico",
				action: {
					id: "rename-current-page"
				}
			},
			{
				type: BrowserButtonType.Custom,
				tooltip: "Announce",
				iconUrl: "http://localhost:8080/icons/announce.svg",
				action: {
					id: "announce"
				}
			},
			{
				type: BrowserButtonType.Custom,
				tooltip: "Print",
				iconUrl: "http://localhost:8080/icons/print.svg",
				action: {
					id: "custom-print"
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
async function createMultiPageWindow(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
	const page1: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
	const page2: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
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
async function createWindowWithLockedPage(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
	const page1: Page = await createPageWithLayout("Locked Page", createDefaultPageLayout());
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
async function createWindowWithFixedViews(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
	const page2: Page = await createPageWithLayout("Untitled Page (2)", createDefaultPageLayout());

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
 * Create a window with two pages intended to share the same title.
 * The platform may still suffix the second tab on create (e.g. "Shared Page Title (1)").
 * Rename a tab after launch to match the other and observe allowDuplicatePageTitles behavior.
 * @returns The created browser window.
 */
async function createDuplicatePageTitlesWindow(): Promise<BrowserWindowModule> {
	const sharedTitle = "Shared Page Title";
	const page1: Page = await createPageWithLayout(sharedTitle, createDefaultPageLayout());
	const page2: Page = await createPageWithLayout(sharedTitle, createDefaultPageLayout());
	const pages: Page[] = [page1, page2];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	await createdBrowserWin.getPages();
	return createdBrowserWin;
}

/**
 * Create a window with platform-pinned, user-pinned, and regular page tabs.
 * @returns The created browser window.
 */
async function createPinnedPagesWindow(): Promise<BrowserWindowModule> {
	const platformPinTitles = ["Platform Pin: Dashboard", "Platform Pin: Analytics", "Platform Pin: Settings"];
	const userPinTitles = ["User Pin: Research", "User Pin: Notes", "User Pin: Watchlist"];

	const platformPages: Page[] = await Promise.all(
		platformPinTitles.map(async (title) => {
			const page = await createPageWithLayout(title, createDefaultPageLayout(), false);
			return { pinned: "platform", ...page };
		})
	);

	const userPages: Page[] = await Promise.all(
		userPinTitles.map(async (title) => {
			const page = await createPageWithLayout(title, createDefaultPageLayout(), false);
			return { pinned: "user", ...page };
		})
	);

	const regularPage = await createPageWithLayout("Regular Page", createDefaultPageLayout(), false);
	const pages: Page[] = [...platformPages, ...userPages, regularPage];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: { pages }
	};

	const platform = getCurrentSync();
	const createdBrowserWin: BrowserWindowModule = await platform.Browser.createWindow(options);
	return createdBrowserWin;
}

export const BROWSER_SCENARIOS: BrowserScenario[] = [
	{ id: "default", label: "Launch Browser Window", launch: async () => createBrowserWindow() },
	{
		id: "no-save",
		label: "Launch Browser Window (No Save Required)",
		launch: createBrowserWindowWithoutRequiringSave
	},
	{ id: "maximized", label: "Launch Browser Maximized", launch: createBrowserWindowMaximized },
	{
		id: "custom-toolbar",
		label: "Launch Browser With Custom Toolbar",
		launch: createCustomToolbarWindow
	},
	{ id: "no-page-tab", label: "Launch Page With No Tab", launch: createSinglePageNoTabWindow },
	{ id: "multi-page", label: "Launch Multiple Pages", launch: createMultiPageWindow },
	{ id: "locked-page", label: "Launch Single Locked Page", launch: createWindowWithLockedPage },
	{ id: "fixed-views", label: "Launch Browser with Fixed Views", launch: createWindowWithFixedViews },
	{
		id: "duplicate-page-titles",
		label: "Launch Browser With Duplicate Page Titles",
		launch: createDuplicatePageTitlesWindow
	},
	{
		id: "pinned-pages",
		label: "Launch Browser With Pinned Pages",
		launch: createPinnedPagesWindow
	}
];

/**
 * Launch a browser window for the given scenario id.
 * @param scenarioId The scenario to launch.
 * @returns The created browser window.
 */
export async function launchBrowserScenario(scenarioId: BrowserScenarioId): Promise<BrowserWindowModule> {
	const scenario = BROWSER_SCENARIOS.find((s) => s.id === scenarioId);
	if (!scenario) {
		throw new Error(`Unknown browser scenario: ${scenarioId}`);
	}
	return scenario.launch();
}

/**
 * Log all attached pages and unsaved pages for the last focused browser window.
 */
export async function logAllBrowserPages(): Promise<void> {
	const platform = getCurrentSync();
	const lastFocusedWindow = await platform.Browser.getLastFocusedWindow();
	if (lastFocusedWindow) {
		const pages = await platform.Browser.getAllAttachedPages();
		const lastFocusedWindowIdentity = await platform.Browser.getLastFocusedWindow();
		if (lastFocusedWindowIdentity) {
			const { uuid, name } = lastFocusedWindowIdentity;
			const wrappedBrowserWindow = platform.Browser.wrapSync({ uuid, name });
			const lastBrowserWindowPages = await wrappedBrowserWindow.getPages();
			const unsavedPages = lastBrowserWindowPages.filter((page) => page.hasUnsavedChanges);
			console.dir({ message: "All PAGES", pages });
			console.dir({ message: "UNSAVED PAGES", unsavedPages });
			console.dir({ message: "LAST FOCUSED WINDOW", wrappedBrowserWindow });
		}
	}
}

/**
 * Create a page with a specific layout.
 * @param title The title of the page.
 * @param layout The layout for the page.
 * @param hasUnsavedChanges Flag to determine if it has unsaved changed.
 * @returns The created page.
 */
async function createPageWithLayout(
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
 * Create the default page layout.
 * @returns The default page layout.
 */
function createDefaultPageLayout(): PageLayout {
	return {
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
						} as Partial<OpenFin.ViewOptions>
					},
					{
						type: "component",
						componentName: "view",
						componentState: {
							uuid: fin.me.uuid,
							name: `${randomUUID()}-v2`,
							url: "https://openfin.co"
						} as Partial<OpenFin.ViewOptions>
					}
				]
			}
		]
	};
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c: string): string {
		// eslint-disable-next-line no-bitwise
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
