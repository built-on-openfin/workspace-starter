import type OpenFin from "@openfin/core";
import {
	getCurrentSync,
	type AttachedPage,
	type BrowserCreateWindowRequest,
	type BrowserWindowModule,
	type Page
} from "@openfin/workspace-platform";
import { type BrowserProviderOptions } from "workspace-platform-starter/shapes";
import { getDefaultToolbarButtons } from "../buttons";
import * as endpointProvider from "../endpoint";
import { isEmpty, isStringValue } from "../utils";

/**
 *
 * @param layout
 */
export function findViewNames(layout) {
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
 *
 * @param name
 * @param uuid
 * @param bringToFrontIfExists
 */
export async function doesViewExist(name: string, uuid: string, bringToFrontIfExists: boolean = false) {
	const view = fin.View.wrapSync({ name, uuid });
	let exists = false;
	try {
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
 *
 * @param target
 * @param target.identity
 * @param target.view
 */
export async function bringViewToFront(target: { identity?: OpenFin.Identity; view?: OpenFin.View }) {
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
 *
 * @param name
 * @param uuid
 * @param bringToFrontIfExists
 */
export async function doesWindowExist(name: string, uuid: string, bringToFrontIfExists: boolean = false) {
	const win = fin.Window.wrapSync({ name, uuid });
	let exists = false;
	try {
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
 *
 * @param target
 * @param target.identity
 * @param target.window
 */
export async function bringWindowToFront(target: { identity?: OpenFin.Identity; window?: OpenFin.Window }) {
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
 *
 * @param target
 * @param target.identity
 * @param target.identity.window
 * @param target.identity.pageId
 * @param target.page
 */
export async function bringPageToFront(target: {
	identity?: { window: OpenFin.Identity; pageId: string };
	page?: AttachedPage;
}) {
	let targetPage: AttachedPage | undefined;
	let parentWindow: BrowserWindowModule | undefined;
	const platform = getCurrentSync();

	if (!isEmpty(target.identity?.pageId) && !isEmpty(target?.identity?.window)) {
		parentWindow = platform.Browser.wrapSync(target.identity.window);
		targetPage = await parentWindow.getPage(target.identity.pageId);
	} else if (!isEmpty(target.page)) {
		targetPage = target.page;
		parentWindow = platform.Browser.wrapSync(targetPage.parentIdentity);
	}

	if (!isEmpty(targetPage) && !isEmpty(parentWindow)) {
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

/**
 *
 * @param view
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

	let matchingPage: AttachedPage;

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
 *
 * @param pageId
 */
export async function savePageBounds(pageId: string) {
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
 *
 * @param pageId
 */
export async function deletePageBounds(pageId: string) {
	const removePageBoundsEndpointId = "page-bounds-remove";
	if (endpointProvider.hasEndpoint(removePageBoundsEndpointId)) {
		await endpointProvider.action<{ id: string }>(removePageBoundsEndpointId, { id: pageId });
	}
}

/**
 *
 * @param pageId
 * @param fromStorage
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
 *
 * @param page
 * @param bounds
 */
export async function launchPage(page: Page, bounds?: OpenFin.Bounds) {
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
 *
 * @param view
 * @param targetIdentity
 */
export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity
) {
	const platform = getCurrentSync();
	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: null };
	} else {
		viewOptions = view;
	}
	return platform.createView(viewOptions, targetIdentity);
}

/**
 *
 * @param browserProvider
 */
export async function getDefaultWindowOptions(
	browserProvider: BrowserProviderOptions
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
 *
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
