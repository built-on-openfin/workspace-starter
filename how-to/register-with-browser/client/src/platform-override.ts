import type OpenFin from "@openfin/core";
import {
	CreateSavedPageRequest,
	CreateSavedWorkspaceRequest,
	getCurrentSync,
	GlobalContextMenuItemTemplate,
	GlobalContextMenuOptionType,
	OpenGlobalContextMenuPayload,
	OpenPageTabContextMenuPayload,
	OpenViewTabContextMenuPayload,
	Page,
	UpdateSavedPageRequest,
	UpdateSavedWorkspaceRequest,
	Workspace,
	WorkspacePlatformOverrideCallback
} from "@openfin/workspace-platform";

export const overrideCallback: WorkspacePlatformOverrideCallback = async (WorkspacePlatformProvider) => {
	class Override extends WorkspacePlatformProvider {
		public async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedWorkspaces(query);
		}

		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedWorkspace(id);
		}

		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.createSavedWorkspace(req);
		}

		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.updateSavedWorkspace(req);
		}

		public async deleteSavedWorkspace(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			return super.deleteSavedWorkspace(id);
		}

		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedPages(query);
		}

		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.getSavedPage(id);
		}

		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.createSavedPage(req);
		}

		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			return super.updateSavedPage(req);
		}

		public async deleteSavedPage(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			await super.deleteSavedPage(id);
		}

		public async openGlobalContextMenu(req: OpenGlobalContextMenuPayload, callerIdentity: OpenFin.Identity) {
			// you can customize the browser main menu here
			const template = req.template;
			const platform = getCurrentSync();
			const pages: Page[] = await platform.Storage.getPages();
			const pagesMenu: OpenFin.MenuItemTemplate[] = [];
			const menuEntry: GlobalContextMenuItemTemplate = {
				label: "Open Page",
				submenu: []
			};
			const allOpenPages = await platform.Browser.getAllAttachedPages();
			if (pages.length > 0) {
				for (const page of pages) {
					const pageExists = allOpenPages.some((openPage) => page.pageId === openPage.pageId);

					pagesMenu.push({
						label: page.title,
						type: "normal",
						enabled: !pageExists,
						data: {
							type: GlobalContextMenuOptionType.Custom,
							action: {
								id: "open-page",
								customData: { pageId: page.pageId, windowIdentity: callerIdentity }
							}
						}
					});
				}
				menuEntry.submenu.push(...pagesMenu);

				const savePageAsIndex = template.findIndex(
					(existingMenuEntry) =>
						existingMenuEntry?.data?.type !== undefined &&
						existingMenuEntry.data.type === GlobalContextMenuOptionType.SavePageAs
				);

				template.splice(savePageAsIndex + 1, 0, menuEntry);
			}

			return super.openGlobalContextMenu(
				{
					...req,
					template
				},
				callerIdentity
			);
		}

		public async openViewTabContextMenu(
			req: OpenViewTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		) {
			// you can customize the view right click context menu here
			return super.openViewTabContextMenu(
				{
					...req
				},
				callerIdentity
			);
		}

		public async openPageTabContextMenu(
			req: OpenPageTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		) {
			// you can customize the page tab right click context menu here
			return super.openPageTabContextMenu(
				{
					...req
				},
				callerIdentity
			);
		}
	}
	return new Override();
};
