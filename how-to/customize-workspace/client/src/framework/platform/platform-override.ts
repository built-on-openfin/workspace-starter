import {
	ColorSchemeOptionType,
	CreateSavedPageRequest,
	CreateSavedWorkspaceRequest,
	getCurrentSync,
	OpenGlobalContextMenuPayload,
	OpenPageTabContextMenuPayload,
	OpenViewTabContextMenuPayload,
	Page,
	UpdateSavedPageRequest,
	UpdateSavedWorkspaceRequest,
	Workspace,
	WorkspacePlatformOverrideCallback
} from "@openfin/workspace-platform";
import type { AnalyticsEvent } from "@openfin/workspace/common/src/utils/usage-register";
import type {
	PageChangedLifecyclePayload,
	WorkspaceChangedLifecyclePayload
} from "customize-workspace/shapes";
import * as analyticsProvider from "../analytics";
import { getDefaultToolbarButtons, updateBrowserWindowButtonsColorScheme } from "../buttons";
import * as endpointProvider from "../endpoint";
import { fireLifecycleEvent } from "../lifecycle";
import { createLogger } from "../logger-provider";
import { getGlobalMenu, getPageMenu, getViewMenu } from "../menu";
import type { PlatformAnalyticsEvent } from "../shapes/analytics-shapes";
import { applyClientSnapshot, decorateSnapshot } from "../snapshot-source";
import { setCurrentColorSchemeMode } from "../themes";
import { deletePageBounds, savePageBounds } from "./browser";
import { closedown as closedownPlatform } from "./platform";

const logger = createLogger("PlatformOverride");

let isApplyingSnapshot: boolean = false;

export const overrideCallback: WorkspacePlatformOverrideCallback = async (WorkspacePlatformProvider) => {
	class Override extends WorkspacePlatformProvider {
		public async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
			const snapshot = await super.getSnapshot(...args);

			return decorateSnapshot(snapshot);
		}

		public async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
			try {
				// We set the is applying snapshot flag if closeExistingWindows is set so that
				// we make sure the runtime doesn't quit when it thinks it no longer has windows open
				// before the new snapshot is loaded
				isApplyingSnapshot = args[0].options?.closeExistingWindows;
				await Promise.all([super.applySnapshot(...args), applyClientSnapshot(args[0].snapshot)]);
			} finally {
				isApplyingSnapshot = false;
			}
		}

		public async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspacesEndpointId = "workspace-get";

			if (endpointProvider.hasEndpoint(getWorkspacesEndpointId)) {
				const workspacesResponse = await endpointProvider.requestResponse<
					{ query?: string },
					{ [key: string]: Workspace }
				>(getWorkspacesEndpointId, { query });
				logger.info(`Returning saved workspaces from custom storage for query: ${query ?? "none"}`);
				return Object.values(workspacesResponse);
			}
			logger.info(`Returning saved workspaces from default storage for query: ${query ?? "none"}`);
			return super.getSavedWorkspaces(query);
		}

		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspaceEndpointId = "workspace-get";

			if (endpointProvider.hasEndpoint(getWorkspaceEndpointId)) {
				const workspaceResponse = await endpointProvider.requestResponse<{ id: string }, Workspace>(
					getWorkspaceEndpointId,
					{ id }
				);
				logger.info(`Returning saved workspace from custom storage for workspace id: ${id}`);
				return workspaceResponse;
			}
			logger.info(`Returning saved workspace from default storage for workspace id: ${id}`);
			return super.getSavedWorkspace(id);
		}

		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const setWorkspaceEndpointId = "workspace-set";

			if (endpointProvider.hasEndpoint(setWorkspaceEndpointId)) {
				const success = await endpointProvider.action<{ id: string; payload: Workspace }>(
					setWorkspaceEndpointId,
					{ id: req.workspace.workspaceId, payload: req.workspace }
				);
				if (success) {
					logger.info(`Saved workspace with id: ${req.workspace.workspaceId} to custom storage`);
				} else {
					logger.info(`Unable to save workspace with id: ${req.workspace.workspaceId} to custom storage`);
				}
				return;
			}
			logger.info(`Saving workspace to default storage for workspace id: ${req.workspace.workspaceId}`);

			const res = await super.createSavedWorkspace(req);

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "workspace-changed", {
				action: "create",
				id: req.workspace.workspaceId,
				workspace: req.workspace
			} as WorkspaceChangedLifecyclePayload);

			return res;
		}

		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const setWorkspaceEndpointId = "workspace-set";

			if (endpointProvider.hasEndpoint(setWorkspaceEndpointId)) {
				const success = await endpointProvider.action<{ id: string; payload: Workspace }>(
					setWorkspaceEndpointId,
					{ id: req.workspace.workspaceId, payload: req.workspace }
				);
				if (success) {
					logger.info(`Updated workspace with id: ${req.workspace.workspaceId} against custom storage`);
				} else {
					logger.info(
						`Unable to update workspace with id: ${req.workspace.workspaceId} against custom storage`
					);
				}
				return;
			}
			logger.info(
				`Saving updated workspace to default storage for workspace id: ${req.workspace.workspaceId}.`
			);

			const res = await super.updateSavedWorkspace(req);

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "workspace-changed", {
				action: "update",
				id: req.workspace.workspaceId,
				workspace: req.workspace
			} as WorkspaceChangedLifecyclePayload);

			return res;
		}

		public async deleteSavedWorkspace(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const removeWorkspaceEndpointId = "workspace-remove";

			if (endpointProvider.hasEndpoint(removeWorkspaceEndpointId)) {
				const success = await endpointProvider.action<{ id: string }>(removeWorkspaceEndpointId, { id });
				if (success) {
					logger.info(`Removed workspace with id: ${id} from custom storage`);
				} else {
					logger.info(`Unable to remove workspace with id: ${id} from custom storage`);
				}
				return;
			}
			logger.info(`Deleting workspace from default storage for workspace id: ${id}`);

			const res = await super.deleteSavedWorkspace(id);

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "workspace-changed", {
				action: "delete",
				id
			} as WorkspaceChangedLifecyclePayload);

			return res;
		}

		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const getPagesEndpointId = "page-get";

			if (endpointProvider.hasEndpoint(getPagesEndpointId)) {
				const pagesResponse = await endpointProvider.requestResponse<
					{ query: string },
					{ [key: string]: Page }
				>(getPagesEndpointId, { query });
				logger.info(`Returning saved pages from custom storage for query: ${query ?? "none"}`);
				return Object.values(pagesResponse);
			}
			logger.info(`Returning saved pages from default storage for query: ${query ?? "none"}`);
			return super.getSavedPages(query);
		}

		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const getPageEndpointId = "page-get";

			if (endpointProvider.hasEndpoint(getPageEndpointId)) {
				const pageResponse = await endpointProvider.requestResponse<{ id: string }, Page>(getPageEndpointId, {
					id
				});
				logger.info(`Returning saved page from custom storage for page id: ${id}`);
				return pageResponse;
			}
			logger.info(`Returning saved page with id ${id} from default storage`);
			return super.getSavedPage(id);
		}

		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			// always save page bounds regardless of storage for pages
			await savePageBounds(req.page.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const setPageEndpointId = "page-set";

			if (endpointProvider.hasEndpoint(setPageEndpointId)) {
				const success = await endpointProvider.action<{ id: string; payload: Page }>(setPageEndpointId, {
					id: req.page.pageId,
					payload: req.page
				});
				if (success) {
					logger.info(`Saved page with id: ${req.page.pageId} to custom storage`);
				} else {
					logger.info(`Unable to save page with id: ${req.page.pageId} to custom storage`);
				}
				return;
			}
			logger.info(`creating saved page and saving to default storage. PageId: ${req.page.pageId}`);

			const res = await super.createSavedPage(req);

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "page-changed", {
				action: "create",
				id: req.page.pageId,
				page: req.page
			} as PageChangedLifecyclePayload);

			return res;
		}

		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			// save page bounds even if using default storage for pages.
			await savePageBounds(req.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const setPageEndpointId = "page-set";

			if (endpointProvider.hasEndpoint(setPageEndpointId)) {
				const success = await endpointProvider.action<{ id: string; payload: Page }>(setPageEndpointId, {
					id: req.page.pageId,
					payload: req.page
				});
				if (success) {
					logger.info(`Updated page with id: ${req.page.pageId} against custom storage`);
				} else {
					logger.info(`Unable to save page with id: ${req.page.pageId} against custom storage`);
				}
				return;
			}
			logger.info(`updating saved page and saving to default storage with page id: ${req.page.pageId}`);

			const res = await super.updateSavedPage(req);

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "page-changed", {
				action: "update",
				id: req.page.pageId,
				page: req.page
			} as PageChangedLifecyclePayload);

			return res;
		}

		public async deleteSavedPage(id: string): Promise<void> {
			// save page bounds even if using default storage for pages.
			await deletePageBounds(id);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const removePageEndpointId = "page-remove";
			if (endpointProvider.hasEndpoint(removePageEndpointId)) {
				const success = await endpointProvider.action<{ id: string }>(removePageEndpointId, { id });
				if (success) {
					logger.info(`Removed page with id: ${id} from custom storage`);
				} else {
					logger.info(`Unable to remove page with id: ${id} from custom storage`);
				}
				return;
			}
			logger.info(`deleting saved page from default storage. PageId: ${id}`);

			const res = await super.deleteSavedPage(id);

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "page-changed", {
				action: "delete",
				id
			} as PageChangedLifecyclePayload);

			return res;
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
			// Only quit if we are not applying a snapshot
			if (!isApplyingSnapshot) {
				const platform = getCurrentSync();
				await fireLifecycleEvent(platform, "before-quit");

				await closedownPlatform();

				return super.quit(payload, callerIdentity);
			}
		}

		public async createWindow(
			options: OpenFin.PlatformWindowCreationOptions,
			identity?: OpenFin.Identity
		): Promise<OpenFin.Window> {
			const overrideDefaultButtons = Array.isArray(options?.workspacePlatform?.toolbarOptions?.buttons);

			if (!overrideDefaultButtons) {
				// The window options don't override the toolbar buttons
				// so we assume we are using the workspace defaults
				// Since the defaults were created using the theme at startup
				// we need to replace them with the current set of default
				// buttons which are theme aware
				options.workspacePlatform = options.workspacePlatform ?? {};
				options.workspacePlatform.toolbarOptions = options.workspacePlatform.toolbarOptions ?? {};
				options.workspacePlatform.toolbarOptions.buttons = await getDefaultToolbarButtons();
			}

			const window = await super.createWindow(options, identity);

			// If the default buttons were overwritten then hopefully the creator
			// used correctly themed versions, but in case they didn't we send
			// an update for the colors.
			if (overrideDefaultButtons) {
				try {
					const platform = getCurrentSync();
					const browserWindow = platform.Browser.wrapSync(window.identity);
					await updateBrowserWindowButtonsColorScheme(browserWindow);
				} catch {
					// Probably not a browser window
				}
			}

			return window;
		}

		public async setSelectedScheme(schemeType: ColorSchemeOptionType) {
			// The color scheme has been updated, so update the theme
			await setCurrentColorSchemeMode(schemeType);

			return super.setSelectedScheme(schemeType);
		}

		public async handleAnalytics(events: AnalyticsEvent[]) {
			if (analyticsProvider.isEnabled()) {
				const platformEvents: PlatformAnalyticsEvent[] = [];
				const timestamp = new Date();
				for (const analyticEvent of events) {
					platformEvents.push({ timestamp, ...analyticEvent });
				}
				await analyticsProvider.handleAnalytics(platformEvents);
			}
		}
	}
	return new Override();
};
