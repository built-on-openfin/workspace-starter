import type OpenFin from "@openfin/core";
import {
	getCurrentSync,
	type AttachedPage,
	type BrowserCreateWindowRequest,
	type BrowserWindowModule,
	type Page
} from "@openfin/workspace-platform";
import { getDefaultToolbarButtons } from "../buttons";
import * as endpointProvider from "../endpoint";
import { getSettings } from "../settings";

export function findViewNames(layout) {
	const collectedNames: string[] = [];

	JSON.stringify(layout, (_, nestedValue) => {
		// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
		if (nestedValue?.name?.length && nestedValue.url !== undefined) {
			collectedNames.push(nestedValue.name as string);
		}
		return nestedValue as unknown;
	});

	return collectedNames;
}

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

export async function bringViewToFront(target: { identity?: OpenFin.Identity; view?: OpenFin.View }) {
	let targetView: OpenFin.View;

	if (target.identity !== undefined) {
		targetView = fin.View.wrapSync(target.identity);
	} else if (target.view !== undefined) {
		targetView = target.view;
	}

	if (targetView !== undefined) {
		const hostPage = await getPageForView(targetView);
		if (hostPage !== undefined) {
			await bringPageToFront({ page: hostPage });
		} else {
			const windowHost = await targetView.getCurrentWindow();
			await bringWindowToFront({ window: windowHost });
		}
		await targetView.focus();
	}
}

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

export async function bringWindowToFront(target: { identity?: OpenFin.Identity; window?: OpenFin.Window }) {
	let targetWindow: OpenFin.Window;

	if (target.identity !== undefined) {
		targetWindow = fin.Window.wrapSync(target.identity);
	} else if (target.window !== undefined) {
		targetWindow = target.window;
	}
	const windowState = await targetWindow.getState();
	if (windowState === "minimized") {
		await targetWindow.restore();
	}
	if (await targetWindow.isShowing()) {
		await targetWindow.setAsForeground();
	}
}

export async function bringPageToFront(target: {
	identity?: { window: OpenFin.Identity; pageId: string };
	page?: AttachedPage;
}) {
	let targetPage: AttachedPage;
	let parentWindow: BrowserWindowModule;
	const platform = getCurrentSync();

	if (target.identity?.pageId !== undefined && target?.identity?.window !== undefined) {
		parentWindow = platform.Browser.wrapSync(target.identity.window);
		targetPage = await parentWindow.getPage(target.identity.pageId);
	} else if (target.page !== undefined) {
		targetPage = target.page;
		parentWindow = platform.Browser.wrapSync(targetPage.parentIdentity);
	}

	if (targetPage !== undefined && parentWindow !== undefined) {
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

export async function savePageBounds(pageId: string) {
	const bounds = await getPageBounds(pageId);
	if (bounds !== null) {
		const setPageBoundsEndpointId = "page-bounds-set";
		if (endpointProvider.hasEndpoint(setPageBoundsEndpointId)) {
			await endpointProvider.action<{ id: string; payload: OpenFin.Bounds }>(setPageBoundsEndpointId, {
				id: pageId,
				payload: bounds
			});
		}
	}
}

export async function deletePageBounds(pageId: string) {
	const removePageBoundsEndpointId = "page-bounds-remove";
	if (endpointProvider.hasEndpoint(removePageBoundsEndpointId)) {
		await endpointProvider.action<{ id: string }>(removePageBoundsEndpointId, { id: pageId });
	}
}

export async function getPageBounds(pageId: string, fromStorage = false): Promise<OpenFin.Bounds | undefined> {
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

		if (windowId !== undefined) {
			const hostWindow = platform.Browser.wrapSync(windowId);

			bounds = await hostWindow.openfinWindow.getBounds();
		}
	}
	return bounds;
}

export async function launchPage(page: Page, bounds?: OpenFin.Bounds) {
	let customBounds = bounds;
	if (customBounds === undefined) {
		customBounds = await getPageBounds(page.pageId, true);
	}

	const platform = getCurrentSync();
	const newWindow: BrowserCreateWindowRequest = {
		workspacePlatform: {
			pages: [page]
		}
	};

	if (customBounds !== undefined && customBounds !== null) {
		const monitors = await fin.System.getMonitorInfo();

		newWindow.height = customBounds.height;
		newWindow.width = customBounds.width;
		newWindow.defaultHeight = customBounds.height;
		newWindow.defaultWidth = customBounds.width;

		if (monitors.virtualScreen !== undefined) {
			if (monitors.virtualScreen.left !== undefined && customBounds.left >= monitors.virtualScreen.left) {
				newWindow.x = customBounds.left;
				newWindow.defaultLeft = customBounds.left;
			}

			if (monitors.virtualScreen.top !== undefined && customBounds.top >= monitors.virtualScreen.top) {
				newWindow.y = customBounds.top;
				newWindow.defaultTop = customBounds.top;
			}
		}
	}

	return platform.Browser.createWindow(newWindow);
}

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

export async function getDefaultWindowOptions(): Promise<Partial<BrowserCreateWindowRequest>> {
	const settings = await getSettings();

	const windowOptions = settings?.browserProvider?.windowOptions ?? {};
	const defaultWindowOptions = settings?.browserProvider.defaultWindowOptions ?? {};

	if (defaultWindowOptions.workspacePlatform === undefined) {
		defaultWindowOptions.workspacePlatform = {
			pages: null
		};
	}

	// start backwards compatibility
	if (windowOptions.title !== undefined && defaultWindowOptions?.workspacePlatform?.title === undefined) {
		defaultWindowOptions.workspacePlatform.title = windowOptions.title;
	}

	if (
		windowOptions.newPageUrl !== undefined &&
		defaultWindowOptions?.workspacePlatform?.newPageUrl === undefined
	) {
		defaultWindowOptions.workspacePlatform.newPageUrl = windowOptions.newPageUrl;
	}

	if (
		windowOptions.newTabUrl !== undefined &&
		defaultWindowOptions?.workspacePlatform?.newTabUrl === undefined
	) {
		defaultWindowOptions.workspacePlatform.newTabUrl = windowOptions.newTabUrl;
	}

	if (windowOptions?.icon !== undefined && defaultWindowOptions?.icon === undefined) {
		defaultWindowOptions.icon = windowOptions.icon;
	}

	if (
		defaultWindowOptions?.icon !== undefined &&
		defaultWindowOptions?.workspacePlatform?.favicon === undefined
	) {
		defaultWindowOptions.workspacePlatform.favicon = defaultWindowOptions.icon;
	}
	// end backwards compatibility

	if (Array.isArray(settings.browserProvider.toolbarButtons)) {
		// we are going to override the ones specified at the workspace platform level
		// as this is our more flexible extension with conditions
		defaultWindowOptions.workspacePlatform.toolbarOptions = {
			buttons: await getDefaultToolbarButtons()
		};
	}

	return defaultWindowOptions;
}

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
