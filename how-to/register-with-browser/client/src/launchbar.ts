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

document.addEventListener("DOMContentLoaded", async () => {
	// Restore any status persisted across workspace apply / window reload.
	restoreHideOnCloseStatusFromStorage();

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

	// launch with accessibility options
	const accessibilityBtn = document.querySelector("#launch-accessibility");
	if (accessibilityBtn) {
		accessibilityBtn.addEventListener("click", createBrowserWithAccessibilityOptions);
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
		});
	}

	// Create browser window with fixed views
	const singleLockedPage = document.querySelector("#launch-single-locked-page");
	if (singleLockedPage) {
		singleLockedPage.addEventListener("click", createWindowWithLockedPage);
	}

	// create window with hideOnClose
	const hideOnCloseBtn = document.querySelector("#launch-hide-on-close");
	if (hideOnCloseBtn) {
		hideOnCloseBtn.addEventListener("click", createHideOnCloseWindow);
	}

	// dump platform snapshot focused on the hideOnClose window
	const dumpSnapshotBtn = document.querySelector("#dump-hide-on-close-snapshot");
	if (dumpSnapshotBtn) {
		dumpSnapshotBtn.addEventListener("click", dumpHideOnCloseSnapshot);
	}

	// save workspace while the hideOnClose window may be hidden
	const saveWorkspaceBtn = document.querySelector("#save-hide-on-close-workspace");
	if (saveWorkspaceBtn) {
		saveWorkspaceBtn.addEventListener("click", saveHideOnCloseWorkspace);
	}

	// restore previously saved workspace
	const restoreWorkspaceBtn = document.querySelector("#restore-hide-on-close-workspace");
	if (restoreWorkspaceBtn) {
		restoreWorkspaceBtn.addEventListener("click", restoreHideOnCloseWorkspace);
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
 * Creates a browser window with accessibility options for the browser tabs.
 * @returns A promise that resolves to the created browser window module.
 */
async function createBrowserWithAccessibilityOptions(): Promise<BrowserWindowModule> {
	const page: Page = await createPageWithLayout("Untitled Page", createDefaultPageLayout());
	const pages: Page[] = [page];

	const options: BrowserCreateWindowRequest = {
		workspacePlatform: {
			pages,
			accessibilityOptions: {
				viewTabOptions: {
					//
					// arrowNavigation defines which tab elements are navigable using keyboard arrow keys
					arrowNavigation: [
						"inactive-tab",
						"active-tab",
						"active-tab-close-button",
						"inactive-tab-close-button",
						"add-tab-button"
					],
					//
					// tabNavigation defines which tab elements are navigable using the Tab key
					tabNavigation: ["active-tab", "add-tab-button"]
				}
			}
		}
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
 * Identity used for the hideOnClose repro window.
 */
const HIDE_ON_CLOSE_WINDOW_NAME = "hide-on-close-example";

/**
 * Workspace id used for the hideOnClose save/restore repro.
 */
const HIDE_ON_CLOSE_WORKSPACE_ID = "hide-on-close-workspace-repro";

/**
 * Window options manifest used by the hideOnClose repro.
 */
const HIDE_ON_CLOSE_WINDOW_MANIFEST_URL =
	"http://localhost:8080/windows/hide-on-close.window.fin.json";

/**
 * localStorage key for hideOnClose status (survives launch-bar reload during applyWorkspace).
 */
const HIDE_ON_CLOSE_STATUS_KEY = "hide-on-close-repro-status";

/**
 * Show status on the launch bar so results survive workspace switch / DevTools closing.
 * @param message The status text to display.
 */
function setHideOnCloseStatus(message: string): void {
	try {
		window.localStorage.setItem(HIDE_ON_CLOSE_STATUS_KEY, message);
	} catch {
		// Ignore storage failures (private mode, etc.).
	}
	const statusEl = document.querySelector("#hide-on-close-status");
	if (statusEl) {
		statusEl.textContent = message;
	}
	console.log(message);
}

/**
 * Restore status text after the launch bar reloads (common during applyWorkspace).
 */
function restoreHideOnCloseStatusFromStorage(): void {
	try {
		const saved = window.localStorage.getItem(HIDE_ON_CLOSE_STATUS_KEY);
		if (saved) {
			const statusEl = document.querySelector("#hide-on-close-status");
			if (statusEl) {
				statusEl.textContent = saved;
			}
		}
	} catch {
		// Ignore storage failures.
	}
}

/**
 * Read live visibility for the hideOnClose repro window.
 * @returns Whether the window is showing, or undefined if it does not exist.
 */
async function getHideOnCloseLiveIsShowing(): Promise<boolean | undefined> {
	try {
		const liveWindow = fin.Window.wrapSync({ uuid: fin.me.uuid, name: HIDE_ON_CLOSE_WINDOW_NAME });
		return await liveWindow.isShowing();
	} catch {
		return undefined;
	}
}

/**
 * Create a platform window with hideOnClose enabled.
 * Closing the window hides it; launching again shows the same instance.
 * Uses platform.createWindow so the window is included in snapshots/workspaces.
 */
async function createHideOnCloseWindow(): Promise<void> {
	const platform = getCurrentSync();
	const identity = { uuid: fin.me.uuid, name: HIDE_ON_CLOSE_WINDOW_NAME };

	try {
		const existing = fin.Window.wrapSync(identity);
		await existing.getInfo();
		await existing.show();
		await existing.setAsForeground();
		setHideOnCloseStatus("Hide On Close window already existed; showed it again.");
		return;
	} catch {
		// Window does not exist yet; create it from the window manifest.
	}

	const response = await fetch(HIDE_ON_CLOSE_WINDOW_MANIFEST_URL);
	const options = (await response.json()) as OpenFin.PlatformWindowCreationOptions;
	await platform.createWindow(options);
	setHideOnCloseStatus("Created Hide On Close window.\nClose it with X, then use steps 2-4.");
}

/**
 * Dump the platform snapshot and live isShowing state for the hideOnClose window.
 * Use after closing (hiding) the window to inspect whether snapshot metadata captures hidden vs visible.
 */
async function dumpHideOnCloseSnapshot(): Promise<void> {
	try {
		const platform = getCurrentSync();
		const snapshot = await platform.getSnapshot();

		const windows = snapshot.windows ?? [];
		const hideOnCloseWindow = windows.find(
			(win) => (win as OpenFin.WindowOptions).name === HIDE_ON_CLOSE_WINDOW_NAME
		);
		const liveIsShowing = await getHideOnCloseLiveIsShowing();

		const summary = {
			message: "HIDE ON CLOSE SNAPSHOT DUMP",
			liveIsShowing,
			windowFoundInSnapshot: hideOnCloseWindow !== undefined,
			hideOnCloseWindowOptions: hideOnCloseWindow,
			state: (hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.state,
			autoShow: (hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.autoShow,
			hideOnClose: (hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.hideOnClose,
			includeInSnapshots: (hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.includeInSnapshots,
			allWindowNames: windows.map((win) => (win as OpenFin.WindowOptions).name)
		};

		setHideOnCloseStatus(
			[
				"SNAPSHOT DUMP",
				`liveIsShowing: ${String(liveIsShowing)}`,
				`inSnapshot: ${String(hideOnCloseWindow !== undefined)}`,
				`state: ${String((hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.state)}`,
				`autoShow: ${String((hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.autoShow)}`
			].join("\n")
		);
		console.dir(summary);
		console.dir({ message: "FULL SNAPSHOT", snapshot });
	} catch (error) {
		setHideOnCloseStatus(`SNAPSHOT DUMP FAILED\n${String(error)}`);
	}
}

/**
 * Save the current desktop as a workspace (call after hiding the hideOnClose window).
 */
async function saveHideOnCloseWorkspace(): Promise<void> {
	try {
		const platform = getCurrentSync();
		const snapshot = await platform.getSnapshot();
		const currentWorkspace = await platform.getCurrentWorkspace();
		const liveIsShowing = await getHideOnCloseLiveIsShowing();

		const workspace = {
			workspaceId: HIDE_ON_CLOSE_WORKSPACE_ID,
			title: "Hide On Close Repro",
			metadata: currentWorkspace?.metadata,
			snapshot
		};

		await platform.Storage.saveWorkspace(workspace);

		const hideOnCloseWindow = (snapshot.windows ?? []).find(
			(win) => (win as OpenFin.WindowOptions).name === HIDE_ON_CLOSE_WINDOW_NAME
		);

		setHideOnCloseStatus(
			[
				"WORKSPACE SAVED",
				`workspaceId: ${HIDE_ON_CLOSE_WORKSPACE_ID}`,
				`liveIsShowing at save: ${String(liveIsShowing)}`,
				`snapshot state: ${String((hideOnCloseWindow as OpenFin.WindowOptions | undefined)?.state)}`,
				"Next: show the window again (step 1), then Restore (step 4)."
			].join("\n")
		);
		console.dir({
			message: "SAVED HIDE ON CLOSE WORKSPACE",
			workspaceId: workspace.workspaceId,
			liveIsShowing,
			hideOnCloseWindow
		});
	} catch (error) {
		setHideOnCloseStatus(`WORKSPACE SAVE FAILED\n${String(error)}`);
	}
}

/**
 * Restore the previously saved hideOnClose workspace and report resulting visibility on the launch bar.
 * Status is written to localStorage first because applyWorkspace can reload the launch bar.
 */
async function restoreHideOnCloseWorkspace(): Promise<void> {
	try {
		const platform = getCurrentSync();
		const workspace = await platform.Storage.getWorkspace(HIDE_ON_CLOSE_WORKSPACE_ID);

		if (!workspace) {
			setHideOnCloseStatus(
				`No saved workspace "${HIDE_ON_CLOSE_WORKSPACE_ID}". Run Save Workspace (step 3) first.`
			);
			return;
		}

		setHideOnCloseStatus("Restoring workspace… (launch bar may reload; status will return).");

		const applied = await platform.applyWorkspace(workspace, {
			skipPrompt: true,
			applySnapshotOptions: {
				closeExistingWindows: false,
				closeSnapshotWindows: true,
				skipOutOfBoundsCheck: true
			}
		});

		// Give the runtime a moment to finish applying windows after the workspace-switched UI.
		await new Promise((resolve) => {
			setTimeout(resolve, 750);
		});

		const liveIsShowing = await getHideOnCloseLiveIsShowing();
		const verdict =
			liveIsShowing === false
				? "LIKELY FIXED: restored while hidden"
				: liveIsShowing === true
					? "LIKELY BUG: restored visible (saved while hidden?)"
					: "Window missing after restore";

		setHideOnCloseStatus(
			[
				"WORKSPACE RESTORED",
				`applied: ${String(applied)}`,
				`liveIsShowing: ${String(liveIsShowing)}`,
				verdict
			].join("\n")
		);

		console.dir({
			message: "RESTORED HIDE ON CLOSE WORKSPACE",
			applied,
			liveIsShowing,
			verdict
		});
	} catch (error) {
		setHideOnCloseStatus(`WORKSPACE RESTORE FAILED\n${String(error)}`);
	}
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
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
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
