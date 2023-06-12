import type OpenFin from "@openfin/core";
import {
	getCurrentSync,
	type AttachedPage,
	type BrowserCreateWindowRequest,
	type BrowserWindowModule,
	type Page,
	type PageLayout
} from "@openfin/workspace-platform";
import { type BrowserProviderOptions } from "workspace-platform-starter/shapes";
import { getDefaultToolbarButtons } from "../buttons";
import * as endpointProvider from "../endpoint";
import { isEmpty, isStringValue } from "../utils";

/**
 * Get the default window options for the browser.
 * @param browserProvider The browser provider settings
 * @returns The default window options for the browser.
 */
export async function getDefaultWindowOptions(
	browserProvider: BrowserProviderOptions | undefined
): Promise<Partial<BrowserCreateWindowRequest>> {
	const legacyWindowOptions = browserProvider?.windowOptions ?? {};
	const defaultWindowOptions = browserProvider?.defaultWindowOptions ?? {};

	let wsPlatform = defaultWindowOptions.workspacePlatform;

	if (isEmpty(wsPlatform)) {
		// Pages has to be null
		wsPlatform = {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			pages: null as unknown as any
		};
	}

	if (wsPlatform) {
		// start backwards compatibility
		if (isStringValue(legacyWindowOptions.title) && !isStringValue(wsPlatform.title)) {
			wsPlatform.title = legacyWindowOptions.title;
		}

		if (isStringValue(legacyWindowOptions.newPageUrl) && !isStringValue(wsPlatform?.newPageUrl)) {
			wsPlatform.newPageUrl = legacyWindowOptions.newPageUrl;
		}

		if (isStringValue(legacyWindowOptions.newTabUrl) && !isStringValue(wsPlatform?.newTabUrl)) {
			wsPlatform.newTabUrl = legacyWindowOptions.newTabUrl;
		}

		if (isStringValue(legacyWindowOptions?.icon) && !isStringValue(defaultWindowOptions?.icon)) {
			defaultWindowOptions.icon = legacyWindowOptions.icon;
		}

		if (
			isStringValue(defaultWindowOptions?.icon) &&
			!isStringValue(defaultWindowOptions?.workspacePlatform?.favicon)
		) {
			wsPlatform.favicon = defaultWindowOptions.icon;
		}
		// end backwards compatibility

		if (Array.isArray(browserProvider?.toolbarButtons)) {
			// we are going to override the ones specified at the workspace platform level
			// as this is our more flexible extension with conditions
			wsPlatform.toolbarOptions = {
				buttons: await getDefaultToolbarButtons()
			};
		}

		defaultWindowOptions.workspacePlatform = wsPlatform;
	}

	return defaultWindowOptions;
}

/**
 * Find the named of all the views in a layout.
 * @param layout The layout to find the view names from.
 * @returns The list of view names.
 */
export function findViewNames(layout: PageLayout): string[] {
	const collectedNames: string[] = [];

	JSON.stringify(layout, (_, nestedValue) => {
		// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
		if (nestedValue?.name?.length && !isEmpty(nestedValue.url)) {
			collectedNames.push(nestedValue.name as string);
		}
		return nestedValue as unknown;
	});

	return collectedNames;
}

/**
 * Does the specified view exist.
 * @param identity The identity of the view.
 * @param bringToFrontIfExists If the view exists then bring it to front.
 * @returns True if the view exists.
 */
export async function doesViewExist(
	identity: OpenFin.Identity,
	bringToFrontIfExists: boolean = false
): Promise<boolean> {
	const view = fin.View.wrapSync(identity);
	let exists = false;
	try {
		// We call getInfo because using wrapSync doesn't fail for a missing view
		// it will only fail with an exception if we call a method on the channel
		await view.getInfo();

		if (bringToFrontIfExists) {
			await bringViewToFront({ view });
		}
		exists = true;
	} catch {
		exists = false;
	}
	return exists;
}

/**
 * Bring a view to the front.
 * @param target The target identity of the view.
 * @param target.identity The identity.
 * @param target.view The view details.
 */
export async function bringViewToFront(target: {
	identity?: OpenFin.Identity;
	view?: OpenFin.View;
}): Promise<void> {
	let targetView: OpenFin.View | undefined;

	if (!isEmpty(target.identity)) {
		targetView = fin.View.wrapSync(target.identity);
	} else if (!isEmpty(target.view)) {
		targetView = target.view;
	}

	if (!isEmpty(targetView)) {
		const hostPage = await getPageForView(targetView);
		if (!isEmpty(hostPage)) {
			await bringPageToFront({ page: hostPage });
		} else {
			const windowHost = await targetView.getCurrentWindow();
			await bringWindowToFront({ window: windowHost });
		}
		await targetView.focus();
	}
}

/**
 * Does a window exist.
 * @param identity The identity of the window to look for.
 * @param bringToFrontIfExists Bring the window to the front if it exists.
 * @returns True if it exists.
 */
export async function doesWindowExist(
	identity: OpenFin.Identity,
	bringToFrontIfExists: boolean = false
): Promise<boolean> {
	const win = fin.Window.wrapSync(identity);
	let exists = false;
	try {
		// We call getInfo because using wrapSync doesn't fail for a missing window
		// it will only fail with an exception if we call a method on the channel
		await win.getInfo();

		exists = true;
		if (bringToFrontIfExists) {
			await bringWindowToFront({ window: win });
		}
	} catch {
		exists = false;
	}

	return exists;
}

/**
 * Bring a window to the front of the view stack.
 * @param target The target window.
 * @param target.identity The identity of the window.
 * @param target.window The window object.
 */
export async function bringWindowToFront(target: {
	identity?: OpenFin.Identity;
	window?: OpenFin.Window;
}): Promise<void> {
	let targetWindow: OpenFin.Window | undefined;

	if (!isEmpty(target.identity)) {
		targetWindow = fin.Window.wrapSync(target.identity);
	} else if (!isEmpty(target.window)) {
		targetWindow = target.window;
	}

	if (targetWindow) {
		const windowState = await targetWindow.getState();
		if (windowState === "minimized") {
			await targetWindow.restore();
		}
		if (await targetWindow.isShowing()) {
			await targetWindow.setAsForeground();
		}
	}
}

/**
 * Bring a page to the front.
 * @param target The target page to bring to the font.
 * @param target.identity The identity of the page.
 * @param target.identity.window The window which contains the page.
 * @param target.identity.pageId The id of the page.
 * @param target.page The page object.
 */
export async function bringPageToFront(target: {
	identity?: { window: OpenFin.Identity; pageId: string };
	page?: AttachedPage;
}): Promise<void> {
	let targetPage: AttachedPage | undefined;
	let parentWindow: BrowserWindowModule | undefined;
	const platform = getCurrentSync();

	const pageId = target.identity?.pageId;
	const window = target?.identity?.window;
	const page = target.page;
	if (!isEmpty(pageId) && !isEmpty(window)) {
		parentWindow = platform.Browser.wrapSync(window);
		targetPage = await parentWindow.getPage(pageId);
	} else if (!isEmpty(page) && !isEmpty(page.parentIdentity)) {
		targetPage = page;
		parentWindow = platform.Browser.wrapSync(page.parentIdentity);
	}

	if (!isEmpty(parentWindow)) {
		if (!isEmpty(targetPage)) {
			try {
				const pages = await parentWindow.getPages();
				if (pages.length > 1) {
					await parentWindow.setActivePage(targetPage.pageId);
				}
			} catch {
				// this window may only support a single page.
			}
		}
		await bringWindowToFront({ identity: parentWindow.identity });
	}
}

/**
 * Get the page window contains the specified view.
 * @param view The view to find the containing page.
 * @returns The page containing the view.
 */
export async function getPageForView(view: OpenFin.View): Promise<AttachedPage | undefined> {
	const parentWindow: OpenFin.Window = await view.getCurrentWindow();
	let pagesToInspect: AttachedPage[] = [];
	const platform = getCurrentSync();

	if (parentWindow.identity.name === fin.me.identity.uuid) {
		// this view is not currently hooked into the window as the page doesn't have focus
		pagesToInspect = await platform.Browser.getAllAttachedPages();
	} else {
		const browserWindow = platform.Browser.wrapSync(parentWindow.identity);
		pagesToInspect = await browserWindow.getPages();
	}

	let matchingPage: AttachedPage | undefined;

	for (const page of pagesToInspect) {
		const viewIds = findViewNames(page.layout);
		if (viewIds.includes(view.identity.name)) {
			matchingPage = page;
			break;
		}
	}

	return matchingPage;
}

/**
 * Save the bounds of the specified page.
 * @param pageId The id of the page to save the bounds for.
 */
export async function savePageBounds(pageId: string): Promise<void> {
	const bounds = await getPageBounds(pageId);
	if (!isEmpty(bounds)) {
		const setPageBoundsEndpointId = "page-bounds-set";
		if (endpointProvider.hasEndpoint(setPageBoundsEndpointId)) {
			await endpointProvider.action<{ id: string; payload: OpenFin.Bounds }>(setPageBoundsEndpointId, {
				id: pageId,
				payload: bounds
			});
		}
	}
}

/**
 * Delete the stored bounds of the specified page.
 * @param pageId The id of the page to delete the bounds for.
 */
export async function deletePageBounds(pageId: string): Promise<void> {
	const removePageBoundsEndpointId = "page-bounds-remove";
	if (endpointProvider.hasEndpoint(removePageBoundsEndpointId)) {
		await endpointProvider.action<{ id: string }>(removePageBoundsEndpointId, { id: pageId });
	}
}

/**
 * Get the bounds of the specified page.
 * @param pageId The if of the page to get the bounds for.
 * @param fromStorage Get the bounds from storage instead of the actual page.
 * @returns The bounds for the page.
 */
export async function getPageBounds(
	pageId: string,
	fromStorage = false
): Promise<OpenFin.Bounds | undefined> {
	let bounds: OpenFin.Bounds | undefined;

	if (fromStorage) {
		const getPageBoundsEndpointId = "page-bounds-get";
		if (endpointProvider.hasEndpoint(getPageBoundsEndpointId)) {
			bounds = await endpointProvider.requestResponse<{ id: string }, OpenFin.Bounds>(
				getPageBoundsEndpointId,
				{ id: pageId }
			);
		}
	} else {
		const platform = getCurrentSync();
		const pages = await platform.Browser.getAllAttachedPages();
		let windowId: OpenFin.Identity | undefined;

		for (const page of pages) {
			if (page.pageId === pageId) {
				windowId = page.parentIdentity;
			}
		}

		if (!isEmpty(windowId)) {
			const hostWindow = platform.Browser.wrapSync(windowId);

			bounds = await hostWindow.openfinWindow.getBounds();
		}
	}
	return bounds;
}

/**
 * Launch a page.
 * @param page The page to launch.
 * @param bounds The bound to launch the page with.
 * @returns The window that the page was launched with.
 */
export async function launchPage(page: Page, bounds?: OpenFin.Bounds): Promise<BrowserWindowModule> {
	let customBounds = bounds;
	if (isEmpty(customBounds)) {
		customBounds = await getPageBounds(page.pageId, true);
	}

	const platform = getCurrentSync();
	const newWindow: BrowserCreateWindowRequest = {
		workspacePlatform: {
			pages: [page]
		}
	};

	if (!isEmpty(customBounds)) {
		const monitors = await fin.System.getMonitorInfo();

		newWindow.height = customBounds.height;
		newWindow.width = customBounds.width;
		newWindow.defaultHeight = customBounds.height;
		newWindow.defaultWidth = customBounds.width;

		if (!isEmpty(monitors.virtualScreen)) {
			if (!isEmpty(monitors.virtualScreen.left) && customBounds.left >= monitors.virtualScreen.left) {
				newWindow.x = customBounds.left;
				newWindow.defaultLeft = customBounds.left;
			}

			if (!isEmpty(monitors.virtualScreen.top) && customBounds.top >= monitors.virtualScreen.top) {
				newWindow.y = customBounds.top;
				newWindow.defaultTop = customBounds.top;
			}
		}
	}

	return platform.Browser.createWindow(newWindow);
}

/**
 * Launch a view.
 * @param view The view to launch.
 * @param targetIdentity The target identity of the window to attach the view to.
 * @returns The launched view.
 */
export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity
): Promise<OpenFin.View> {
	const platform = getCurrentSync();
	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: undefined };
	} else {
		viewOptions = view;
	}
	return platform.createView(viewOptions, targetIdentity);
}

/**
 * Get a list of all the visible windows in the platform.
 * @returns The list of visible windows.
 */
export async function getAllVisibleWindows(): Promise<OpenFin.Window[]> {
	const platform = fin.Platform.getCurrentSync();
	const windows = await platform.Application.getChildWindows();
	const availableWindows: OpenFin.Window[] = [];
	for (const currentWindow of windows) {
		const isShowing = await currentWindow.isShowing();
		if (isShowing) {
			availableWindows.push(currentWindow);
		}
	}
	return availableWindows;
}
