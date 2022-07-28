import {
	CreateSavedPageRequest,
	CreateSavedWorkspaceRequest,
	OpenGlobalContextMenuPayload,
	OpenPageTabContextMenuPayload,
	OpenViewTabContextMenuPayload,
	Page,
	UpdateSavedPageRequest,
	UpdateSavedWorkspaceRequest,
	Workspace,
	WorkspacePlatformOverrideCallback
} from "@openfin/workspace-platform";
import { deletePageBounds, savePageBounds } from "./browser";
import * as endpointProvider from "./endpoint";
import { getGlobalMenu, getPageMenu, getViewMenu } from "./menu";
import { decorateSnapshot, applyClientSnapshot } from "./snapshot-source";

export const overrideCallback: WorkspacePlatformOverrideCallback = async (WorkspacePlatformProvider) => {
	class Override extends WorkspacePlatformProvider {
		public async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
			const snapshot = await super.getSnapshot(...args);

            return decorateSnapshot(snapshot);
		}

		public async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
			await Promise.all([super.applySnapshot(...args), applyClientSnapshot(args[0].snapshot)]);
		}

		public async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspacesEndpointId = "workspace-get-all";

			if (endpointProvider.hasEndpoint(getWorkspacesEndpointId)) {
				const workspacesResponse = await endpointProvider.requestResponse<
					{ query?: string },
					{ data: Workspace[] }
				>(getWorkspacesEndpointId, { query });
				console.log(`Returning saved workspaces from custom storage for query: ${query ?? "none"}.`);
				return workspacesResponse.data;
			}
			console.log(`Returning saved workspaces from default storage for query: ${query ?? "none"}.`);
			return super.getSavedWorkspaces(query);
		}

		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspaceEndpointId = "workspace-get";

			if (endpointProvider.hasEndpoint(getWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const workspaceResponse = await endpointProvider.requestResponse<{ id: string }, Workspace>(
					getWorkspaceEndpointId,
					{ id }
				);
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

			if (endpointProvider.hasEndpoint(setWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointProvider.action<{ id: string; payload: Workspace }>(
					setWorkspaceEndpointId,
					{ id: req.workspace.workspaceId, payload: req.workspace }
				);
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

			if (endpointProvider.hasEndpoint(setWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointProvider.action<{ id: string; payload: Workspace }>(
					setWorkspaceEndpointId,
					{ id: req.workspace.workspaceId, payload: req.workspace }
				);
				if (success) {
					console.log(`Updated workspace with id: ${req.workspace.workspaceId} against custom storage`);
				} else {
					console.log(
						`Unable to update workspace with id: ${req.workspace.workspaceId} against custom storage`
					);
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

			if (endpointProvider.hasEndpoint(removeWorkspaceEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointProvider.action<{ id: string }>(removeWorkspaceEndpointId, { id });
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

			if (endpointProvider.hasEndpoint(getPagesEndpointId)) {
				// eslint-disable-next-line max-len
				const pagesResponse = await endpointProvider.requestResponse<{ query: string }, { data: Page[] }>(
					getPagesEndpointId,
					{ query }
				);
				console.log(`Returning saved pages from custom storage for query: ${query ?? "none"}.`);
				return pagesResponse.data;
			}
			console.log(`Returning saved pages from default storage for query: ${query ?? "none"}.`);
			return super.getSavedPages(query);
		}

		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const getPageEndpointId = "page-get";

			if (endpointProvider.hasEndpoint(getPageEndpointId)) {
				// eslint-disable-next-line max-len
				const pageResponse = await endpointProvider.requestResponse<{ id: string }, Page>(getPageEndpointId, {
					id
				});
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

			if (endpointProvider.hasEndpoint(setPageEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointProvider.action<{ id: string; payload: Page }>(setPageEndpointId, {
					id: req.page.pageId,
					payload: req.page
				});
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

			if (endpointProvider.hasEndpoint(setPageEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointProvider.action<{ id: string; payload: Page }>(setPageEndpointId, {
					id: req.page.pageId,
					payload: req.page
				});
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
			if (endpointProvider.hasEndpoint(removePageEndpointId)) {
				// eslint-disable-next-line max-len
				const success = await endpointProvider.action<{ id: string }>(removePageEndpointId, { id });
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
