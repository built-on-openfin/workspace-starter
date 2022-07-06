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
import { getGlobalMenu, getPageMenu, getViewMenu } from "./menu";
import { PlatformStorage } from "./platform-storage";
import { DEFAULT_STORAGE_KEYS, IPlatformStorage } from "./platform-storage-shapes";
import { getSettings } from "./settings";

async function savePageBounds(pageId: string) {
	const bounds = await getPageBounds(pageId);
	const boundsStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.PageBounds);
	await boundsStorage.saveToStorage<OpenFin.Bounds>(pageId, bounds);
}

async function deletePageBounds(pageId: string) {
	const boundsStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.PageBounds);
	await boundsStorage.deleteFromStorage(pageId);
}

export async function getPage(pageId: string) {
	const platform = getCurrentSync();
	return platform.Storage.getPage(pageId);
}

export async function getPages() {
	const platform = getCurrentSync();
	return platform.Storage.getPages();
}

export async function deletePage(pageId: string) {
	const platform = getCurrentSync();
	await deletePageBounds(pageId);
	return platform.Storage.deletePage(pageId);
}

export async function getPageBounds(pageId: string, fromStorage = false): Promise<OpenFin.Bounds | null> {
	let bounds: OpenFin.Bounds = null;

	if (fromStorage) {
		const boundsStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.PageBounds);
		bounds = await boundsStorage.getFromStorage<OpenFin.Bounds>(pageId);
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
		const boundsStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.PageBounds);
		customBounds = await boundsStorage.getFromStorage<OpenFin.Bounds>(page.pageId);
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
		private pageStorage: IPlatformStorage;

		private workspaceStorage: IPlatformStorage;

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
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Workspace)) {
				if (this.workspaceStorage === undefined) {
					this.workspaceStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Workspace);
				}
				console.log(`Returning saved workspaces from custom storage for query: ${query}.`);
				return this.workspaceStorage.getAllStoredEntries<Workspace>(query);
			}
			console.log(`Returning saved workspaces from default storage for query: ${query}.`);
			return super.getSavedWorkspaces(query);
		}

		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Workspace)) {
				if (this.workspaceStorage === undefined) {
					this.workspaceStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Workspace);
				}
				console.log(`Returning saved workspace from custom storage for workspace id: ${id}.`);
				return this.workspaceStorage.getFromStorage<Workspace>(id);
			}
			console.log(`Returning saved workspace from default storage for workspace id: ${id}.`);
			return super.getSavedWorkspace(id);
		}

		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Workspace)) {
				if (this.workspaceStorage === undefined) {
					this.workspaceStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Workspace);
				}
				console.log(`Saving workspace to custom storage for workspace id: ${req.workspace.workspaceId}.`);
				return this.workspaceStorage.saveToStorage<Workspace>(req.workspace.workspaceId, req.workspace);
			}
			console.log(`Saving workspace to default storage for workspace id: ${req.workspace.workspaceId}.`);
			return super.createSavedWorkspace(req);
		}

		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Workspace)) {
				if (this.workspaceStorage === undefined) {
					this.workspaceStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Workspace);
				}
				console.log(
					`Saving updated workspace to custom storage for workspace id: ${req.workspace.workspaceId}.`
				);
				return this.workspaceStorage.saveToStorage<Workspace>(req.workspace.workspaceId, req.workspace);
			}
			console.log(
				`Saving updated workspace to default storage for workspace id: ${req.workspace.workspaceId}.`
			);
			return super.updateSavedWorkspace(req);
		}

		public async deleteSavedWorkspace(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Workspace)) {
				if (this.workspaceStorage === undefined) {
					this.workspaceStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Workspace);
				}
				console.log(`Deleting workspace from custom storage for workspace id: ${id}.`);
				return this.workspaceStorage.deleteFromStorage(id);
			}
			console.log(`Deleting workspace from default storage for workspace id: ${id}.`);
			return super.deleteSavedWorkspace(id);
		}

		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Page)) {
				if (this.pageStorage === undefined) {
					this.pageStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Page);
				}
				console.log(`Returning saved pages from custom storage for query: ${query}.`);
				return this.pageStorage.getAllStoredEntries<Page>(query);
			}
			console.log(`Returning saved pages from default storage for query: ${query}.`);
			return super.getSavedPages(query);
		}

		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Page)) {
				if (this.pageStorage === undefined) {
					this.pageStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Page);
				}
				console.log(`Returning saved page with id ${id} from custom storage.`);
				return this.pageStorage.getFromStorage<Page>(id);
			}
			console.log(`Returning saved page with id ${id} from default storage.`);
			return super.getSavedPage(id);
		}

		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			// always save page bounds regardless of storage for pages
			await savePageBounds(req.page.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Page)) {
				if (this.pageStorage === undefined) {
					this.pageStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Page);
				}
				console.log(`creating saved page and saving to custom storage. PageId: ${req.page.pageId}`);
				await this.pageStorage.saveToStorage(req.page.pageId, req.page);
			} else {
				console.log(`creating saved page and saving to default storage. PageId: ${req.page.pageId}`);
				await super.createSavedPage(req);
			}
		}

		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			// save page bounds even if using default storage for pages.
			await savePageBounds(req.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Page)) {
				if (this.pageStorage === undefined) {
					this.pageStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Page);
				}
				console.log(`updating saved page and saving to custom storage with page id: ${req.page.pageId}.`);
				await this.pageStorage.saveToStorage(req.page.pageId, req.page);
			} else {
				console.log(`updating saved page and saving to default storage with page id: ${req.page.pageId}.`);
				await super.updateSavedPage(req);
			}
		}

		public async deleteSavedPage(id: string): Promise<void> {
			// save page bounds even if using default storage for pages.
			await deletePageBounds(id);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (PlatformStorage.isRegistered(DEFAULT_STORAGE_KEYS.Page)) {
				if (this.pageStorage === undefined) {
					this.pageStorage = await PlatformStorage.getStorage(DEFAULT_STORAGE_KEYS.Page);
				}
				console.log(`deleting saved page from custom storage. PageId: ${id}.`);
				await this.pageStorage.deleteFromStorage(id);
			} else {
				console.log(`deleting saved page from default storage. PageId: ${id}.`);
				await super.deleteSavedPage(id);
			}
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
