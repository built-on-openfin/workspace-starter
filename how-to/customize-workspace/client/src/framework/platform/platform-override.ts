import type OpenFin from "@openfin/core";
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
			if (query !== undefined) {
				logger.info(`Saved workspaces requested with query: ${query}`);
			}
			const getWorkspacesEndpointId = "workspace-get";

			logger.info(`Checking for custom workspace storage with endpoint id: ${getWorkspacesEndpointId}`);
			if (endpointProvider.hasEndpoint(getWorkspacesEndpointId)) {
				logger.info("Requesting saved workspaces from custom storage");
				const workspacesResponse = await endpointProvider.requestResponse<
					{ query?: string },
					{ [key: string]: Workspace }
				>(getWorkspacesEndpointId, { query });
				logger.info("Returning saved workspaces from custom storage");
				return Object.values(workspacesResponse);
			}
			logger.info("Requesting saved workspaces from default storage");
			const savedWorkspaces = await super.getSavedWorkspaces(query);
			logger.info("Returning saved workspaces from default storage");
			return savedWorkspaces;
		}

		public async getSavedWorkspace(id: string): Promise<Workspace> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const getWorkspaceEndpointId = "workspace-get";
			logger.info(`Checking for custom workspace storage with endpoint id: ${getWorkspaceEndpointId}`);
			if (endpointProvider.hasEndpoint(getWorkspaceEndpointId)) {
				logger.info(`Requesting saved workspace from custom storage for workspace id: ${id}`);
				const workspaceResponse = await endpointProvider.requestResponse<{ id: string }, Workspace>(
					getWorkspaceEndpointId,
					{ id }
				);
				logger.info(`Returning saved workspace from custom storage for workspace id: ${id}`);
				return workspaceResponse;
			}
			logger.info(`Requesting saved workspace from default storage for workspace id: ${id}`);
			const savedWorkspace = await super.getSavedWorkspace(id);
			logger.info(`Returning saved workspace from default storage for workspace id: ${id}`);
			return savedWorkspace;
		}

		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const setWorkspaceEndpointId = "workspace-set";
			logger.info(`Checking for custom workspace storage with endpoint id: ${setWorkspaceEndpointId}`);
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
			} else {
				logger.info(`Saving workspace to default storage for workspace id: ${req.workspace.workspaceId}`);
				await super.createSavedWorkspace(req);
				logger.info(`Saved workspace to default storage for workspace id: ${req.workspace.workspaceId}`);
			}

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "workspace-changed", {
				action: "create",
				id: req.workspace.workspaceId,
				workspace: req.workspace
			} as WorkspaceChangedLifecyclePayload);
		}

		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const setWorkspaceEndpointId = "workspace-set";
			logger.info(`Checking for custom workspace storage with endpoint id: ${setWorkspaceEndpointId}`);
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
			} else {
				logger.info(
					`Saving updated workspace to default storage for workspace id: ${req.workspace.workspaceId}.`
				);
				await super.updateSavedWorkspace(req);
				logger.info(
					`Saved updated workspace to default storage for workspace id: ${req.workspace.workspaceId}.`
				);
			}

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "workspace-changed", {
				action: "update",
				id: req.workspace.workspaceId,
				workspace: req.workspace
			} as WorkspaceChangedLifecyclePayload);
		}

		public async deleteSavedWorkspace(id: string): Promise<void> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			const removeWorkspaceEndpointId = "workspace-remove";
			logger.info(`Checking for custom workspace storage with endpoint id: ${removeWorkspaceEndpointId}`);
			if (endpointProvider.hasEndpoint(removeWorkspaceEndpointId)) {
				const success = await endpointProvider.action<{ id: string }>(removeWorkspaceEndpointId, { id });
				if (success) {
					logger.info(`Removed workspace with id: ${id} from custom storage`);
				} else {
					logger.info(`Unable to remove workspace with id: ${id} from custom storage`);
				}
			} else {
				logger.info(`Deleting workspace from default storage for workspace id: ${id}`);
				await super.deleteSavedWorkspace(id);
				logger.info(`Deleted workspace from default storage for workspace id: ${id}`);
			}

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "workspace-changed", {
				action: "delete",
				id
			} as WorkspaceChangedLifecyclePayload);
		}

		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (query !== undefined) {
				logger.info(`Saved pages requested with query: ${query}`);
			}
			const getPagesEndpointId = "page-get";
			logger.info(`Checking for custom page storage with endpoint id: ${getPagesEndpointId}`);
			if (endpointProvider.hasEndpoint(getPagesEndpointId)) {
				logger.info("Getting saved pages from custom storage");
				const pagesResponse = await endpointProvider.requestResponse<
					{ query: string },
					{ [key: string]: Page }
				>(getPagesEndpointId, { query });
				logger.info("Returning saved pages from custom storage");
				return Object.values(pagesResponse);
			}
			logger.info("Getting saved pages from default storage");
			const pagesResponse = await super.getSavedPages(query);
			logger.info("Returning saved pages from default storage");
			return pagesResponse;
		}

		public async getSavedPage(id: string): Promise<Page> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const getPageEndpointId = "page-get";
			logger.info(`Checking for custom page storage with endpoint id: ${getPageEndpointId}`);
			if (endpointProvider.hasEndpoint(getPageEndpointId)) {
				logger.info(`Getting saved page from custom storage for page id: ${id}`);
				const pageResponse = await endpointProvider.requestResponse<{ id: string }, Page>(getPageEndpointId, {
					id
				});
				logger.info(`Returning saved page from custom storage for page id: ${id}`);
				return pageResponse;
			}
			logger.info(`Getting saved page with id ${id} from default storage`);
			const pageResponse = await super.getSavedPage(id);
			logger.info(`Returning saved page with id ${id} from default storage`);
			return pageResponse;
		}

		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			// always save page bounds regardless of storage for pages
			await savePageBounds(req.page.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const setPageEndpointId = "page-set";
			logger.info(`Checking for custom page storage with endpoint id: ${setPageEndpointId}`);
			if (endpointProvider.hasEndpoint(setPageEndpointId)) {
				logger.info(`Saving page with id: ${req.page.pageId} to custom storage`);
				const success = await endpointProvider.action<{ id: string; payload: Page }>(setPageEndpointId, {
					id: req.page.pageId,
					payload: req.page
				});
				if (success) {
					logger.info(`Saved page with id: ${req.page.pageId} to custom storage`);
				} else {
					logger.info(`Unable to save page with id: ${req.page.pageId} to custom storage`);
				}
			} else {
				logger.info(`creating saved page and saving to default storage. PageId: ${req.page.pageId}`);
				await super.createSavedPage(req);
				logger.info(`Saved page with id: ${req.page.pageId} to default storage`);
			}

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "page-changed", {
				action: "create",
				id: req.page.pageId,
				page: req.page
			} as PageChangedLifecyclePayload);
		}

		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			// save page bounds even if using default storage for pages.
			await savePageBounds(req.pageId);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const setPageEndpointId = "page-set";
			logger.info(`Checking for custom page storage with endpoint id: ${setPageEndpointId}`);
			if (endpointProvider.hasEndpoint(setPageEndpointId)) {
				logger.info(`Updating saved page and saving to custom storage with page id: ${req.page.pageId}`);
				const success = await endpointProvider.action<{ id: string; payload: Page }>(setPageEndpointId, {
					id: req.page.pageId,
					payload: req.page
				});
				if (success) {
					logger.info(`Updated page with id: ${req.page.pageId} against custom storage`);
				} else {
					logger.info(`Unable to save page with id: ${req.page.pageId} against custom storage`);
				}
			} else {
				logger.info(`updating saved page and saving to default storage with page id: ${req.page.pageId}`);
				await super.updateSavedPage(req);
				logger.info(`Updated page with id: ${req.page.pageId} against default storage`);
			}

			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "page-changed", {
				action: "update",
				id: req.page.pageId,
				page: req.page
			} as PageChangedLifecyclePayload);
		}

		public async deleteSavedPage(id: string): Promise<void> {
			// save page bounds even if using default storage for pages.
			await deletePageBounds(id);

			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			const removePageEndpointId = "page-remove";
			logger.info(`Checking for custom page storage with endpoint id: ${removePageEndpointId}`);
			if (endpointProvider.hasEndpoint(removePageEndpointId)) {
				logger.info(`deleting saved page from custom storage. PageId: ${id}`);
				const success = await endpointProvider.action<{ id: string }>(removePageEndpointId, { id });
				if (success) {
					logger.info(`Removed page with id: ${id} from custom storage`);
				} else {
					logger.info(`Unable to remove page with id: ${id} from custom storage`);
				}
			} else {
				logger.info(`deleting saved page from default storage. PageId: ${id}`);
				await super.deleteSavedPage(id);
				logger.info(`Removed page with id: ${id} from custom storage`);
			}
			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "page-changed", {
				action: "delete",
				id
			} as PageChangedLifecyclePayload);
		}

		public async openGlobalContextMenu(
			req: OpenGlobalContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			const template = await getGlobalMenu(req.template);
			if (template?.length > 0) {
				await super.openGlobalContextMenu(
					{
						...req,
						template
					},
					callerIdentity
				);
			}
		}

		public async openViewTabContextMenu(
			req: OpenViewTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			const template = await getViewMenu(req.template);
			if (template?.length > 0) {
				await super.openViewTabContextMenu(
					{
						...req,
						template
					},
					callerIdentity
				);
			}
		}

		public async openPageTabContextMenu(
			req: OpenPageTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			const template = await getPageMenu(req.template);
			if (template?.length > 0) {
				await super.openPageTabContextMenu(
					{
						...req,
						template
					},
					callerIdentity
				);
			}
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
