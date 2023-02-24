import type OpenFin from "@openfin/core";
import { BrowserCreateWindowRequest, getCurrentSync, Page } from "@openfin/workspace-platform";
import { getDefaultToolbarButtons } from "../buttons";
import * as endpointProvider from "../endpoint";
import { getSettings } from "../settings";

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

export async function getPageBounds(pageId: string, fromStorage = false): Promise<OpenFin.Bounds | null> {
	let bounds: OpenFin.Bounds = null;

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
		let windowId: OpenFin.Identity;

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
	};
}
