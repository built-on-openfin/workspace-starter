import {
	BrowserCreateWindowRequest,
	BrowserOverrideCallback,
	CreateSavedPageRequest,
	CreateSavedWorkspaceRequest,
	getCurrentSync,
	OpenGlobalContextMenuPayload,
	OpenPageTabContextMenuPayload,
	OpenViewTabContextMenuPayload,
	Page,
	UpdateSavedPageRequest,
	UpdateSavedWorkspaceRequest,
	Workspace
} from "@openfin/workspace-platform";

import { getDefaultToolbarButtons } from "./buttons";
import * as endpointService from "./endpoint";
import { getGlobalMenu, getPageMenu, getViewMenu } from "./menu";
import { PlatformLocalStorage } from "./platform-local-storage";
import { getSettings } from "./settings";

const DEFAULT_PAGE_BOUNDS_STORAGE = new PlatformLocalStorage<OpenFin.Bounds>(
	"page-bounds",
	"PageBounds"
);

async function savePageBounds(pageId: string) {
	const bounds = await getPageBounds(pageId);
	if (bounds !== null) {
		const setPageBoundsEndpointId = "page-bounds-set";
		if (endpointService.hasEndpoint(setPageBoundsEndpointId)) {
			await endpointService.action<{ id: string; payload: OpenFin.Bounds}>(setPageBoundsEndpointId,
				{ id: pageId, payload: bounds });
			return;
		}
		await DEFAULT_PAGE_BOUNDS_STORAGE.set(pageId, bounds);
	}
}

async function deletePageBounds(pageId: string) {
	const removePageBoundsEndpointId = "page-bounds-remove";
	if (endpointService.hasEndpoint(removePageBoundsEndpointId)) {
		await endpointService.action<{ id: string }>(removePageBoundsEndpointId,
			{ id: pageId });
		return;
	}
	await DEFAULT_PAGE_BOUNDS_STORAGE.remove(pageId);
}

export async function getPageBounds(pageId: string, fromStorage = false): Promise<OpenFin.Bounds | null> {
	let bounds: OpenFin.Bounds = null;

	if (fromStorage) {
		const getPageBoundsEndpointId = "page-bounds-get";
		if (endpointService.hasEndpoint(getPageBoundsEndpointId)) {
			bounds = await endpointService.requestResponse<string, OpenFin.Bounds>(getPageBoundsEndpointId,
			pageId);
		} else {
			bounds = await DEFAULT_PAGE_BOUNDS_STORAGE.get(pageId);
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

// export async function getPage(pageId: string) {
// 	const platform = getCurrentSync();
// 	return platform.Storage.getPage(pageId);
// }

// export async function getPages() {
// 	const platform = getCurrentSync();
// 	return platform.Storage.getPages();
// }

// export async function deletePage(pageId: string) {
// 	const platform = getCurrentSync();
// 	await deletePageBounds(pageId);
// 	return platform.Storage.deletePage(pageId);
// }

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

export const overrideCallback: BrowserOverrideCallback = async (WorkspacePlatformProvider) => {
	class Override extends WorkspacePlatformProvider {
		public async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
			const snapshot = await super.getSnapshot(...args);
			return snapshot;
		}

		public async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
			await super.applySnapshot(...args);
		}

		public async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspacesEndpointId = "workspace-get-all";

			if (endpointService.hasEndpoint(getWorkspacesEndpointId)) {
				const workspacesResponse = await endpointService.requestResponse<string, { data: Workspace[]}>
				(getWorkspacesEndpointId, query);
				console.log(`Returning saved workspaces from custom storage for query: ${query}.`);
				return workspacesResponse.data;
			}
			console.log(`Returning saved workspaces from default storage for query: ${query}.`);
			return super.getSavedWorkspaces(query);
		}

		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspaceEndpointId = "workspace-get";

			if (endpointService.hasEndpoint(getWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const workspaceResponse = await endpointService.requestResponse<string, Workspace>(getWorkspaceEndpointId, id);
				console.log(`Returning saved workspace from custom storage for workspace id: ${id}.`);
				return workspaceResponse;
			}
			console.log(`Returning saved workspace from default storage for workspace id: ${id}.`);
			return super.getSavedWorkspace(id);
		}

		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const setWorkspaceEndpointId = "workspace-set";

			if (endpointService.hasEndpoint(setWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointService.action<{ id: string; payload: Workspace}>(setWorkspaceEndpointId, { id: req.workspace.workspaceId, payload: req.workspace });
				if (success) {
					console.log(`Saved workspace with id: ${req.workspace.workspaceId} to custom storage`);
				} else {
					console.log(`Unable to save workspace with id: ${req.workspace.workspaceId} to custom storage`);
				}
				return;
			}
			console.log(`Saving workspace to default storage for workspace id: ${req.workspace.workspaceId}.`);
			return super.createSavedWorkspace(req);
		}

		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const setWorkspaceEndpointId = "workspace-set";

			if (endpointService.hasEndpoint(setWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointService.action<{ id: string; payload: Workspace}>(setWorkspaceEndpointId, { id: req.workspace.workspaceId, payload: req.workspace });
				if (success) {
					console.log(`Updated workspace with id: ${req.workspace.workspaceId} against custom storage`);
				} else {
					console.log(`Unable to update workspace with id: ${req.workspace.workspaceId} against custom storage`);
				}
				return;
			}
			console.log(
				`Saving updated workspace to default storage for workspace id: ${req.workspace.workspaceId}.`
			);
			return super.updateSavedWorkspace(req);
		}

		public async deleteSavedWorkspace(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const removeWorkspaceEndpointId = "workspace-remove";

			if (endpointService.hasEndpoint(removeWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointService.action<{ id: string}>(removeWorkspaceEndpointId, { id });
				if (success) {
					console.log(`Removed workspace with id: ${id} from custom storage`);
				} else {
					console.log(`Unable to remove workspace with id: ${id} from custom storage`);
				}
				return;
			}
			console.log(`Deleting workspace from default storage for workspace id: ${id}.`);
			return super.deleteSavedWorkspace(id);
		}

		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const getPagesEndpointId = "page-get-all";

			if (endpointService.hasEndpoint(getPagesEndpointId)) {
				// eslint-disable-next-line max-len
				const pagesResponse = await endpointService.requestResponse<string, { data: Page[]}>(getPagesEndpointId, query);
				console.log(`Returning saved pages from custom storage for query: ${query}.`);
				return pagesResponse.data;
			}
			console.log(`Returning saved pages from default storage for query: ${query}.`);
			return super.getSavedPages(query);
		}

		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const getPageEndpointId = "page-get";

			if (endpointService.hasEndpoint(getPageEndpointId)) {
				// eslint-disable-next-line max-len
				const pageResponse = await endpointService.requestResponse<string, Page>(getPageEndpointId, id);
				console.log(`Returning saved page from custom storage for page id: ${id}.`);
				return pageResponse;
			}
			console.log(`Returning saved page with id ${id} from default storage.`);
			return super.getSavedPage(id);
		}

		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			// always save page bounds regardless of storage for pages
			await savePageBounds(req.page.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const setPageEndpointId = "page-set";

			if (endpointService.hasEndpoint(setPageEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointService.action<{ id: string; payload: Page}>(setPageEndpointId, { id: req.page.pageId, payload: req.page });
				if (success) {
					console.log(`Saved page with id: ${req.page.pageId} to custom storage`);
				} else {
					console.log(`Unable to save page with id: ${req.page.pageId} to custom storage`);
				}
				return;
			}
			console.log(`creating saved page and saving to default storage. PageId: ${req.page.pageId}`);
			return super.createSavedPage(req);
		}

		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			// save page bounds even if using default storage for pages.
			await savePageBounds(req.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const setPageEndpointId = "page-set";

			if (endpointService.hasEndpoint(setPageEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointService.action<{ id: string; payload: Page}>(setPageEndpointId, { id: req.page.pageId, payload: req.page });
				if (success) {
					console.log(`Updated page with id: ${req.page.pageId} against custom storage`);
				} else {
					console.log(`Unable to save page with id: ${req.page.pageId} against custom storage`);
				}
				return;
			}
			console.log(`updating saved page and saving to default storage with page id: ${req.page.pageId}.`);
			return super.updateSavedPage(req);
		}

		public async deleteSavedPage(id: string): Promise<void> {
			// save page bounds even if using default storage for pages.
			await deletePageBounds(id);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const removePageEndpointId = "page-remove";
			if (endpointService.hasEndpoint(removePageEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointService.action<{ id: string}>(removePageEndpointId, { id });
				if (success) {
					console.log(`Removed page with id: ${id} from custom storage`);
				} else {
					console.log(`Unable to remove page with id: ${id} from custom storage`);
				}
				return;
			}
			console.log(`deleting saved page from default storage. PageId: ${id}.`);
			await super.deleteSavedPage(id);
		}

		public async openGlobalContextMenu(req: OpenGlobalContextMenuPayload, callerIdentity: OpenFin.Identity) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return super.openGlobalContextMenu(
				{
					...req,
					template: await getGlobalMenu(req.template)
				},
				callerIdentity
			);
		}

		public async openViewTabContextMenu(
			req: OpenViewTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return super.openViewTabContextMenu(
				{
					...req,
					template: await getViewMenu(req.template)
				},
				callerIdentity
			);
		}

		public async openPageTabContextMenu(
			req: OpenPageTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return super.openPageTabContextMenu(
				{
					...req,
					template: await getPageMenu(req.template)
				},
				callerIdentity
			);
		}

		public async quit(payload: undefined, callerIdentity: OpenFin.Identity) {
			return super.quit(payload, callerIdentity);
		}
	}
	return new Override();
};
