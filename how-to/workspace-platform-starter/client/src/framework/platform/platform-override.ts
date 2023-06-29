import type OpenFin from "@openfin/core";
import {
	getCurrentSync,
	type ColorSchemeOptionType,
	type CreateSavedPageRequest,
	type CreateSavedWorkspaceRequest,
	type OpenGlobalContextMenuPayload,
	type OpenPageTabContextMenuPayload,
	type OpenViewTabContextMenuPayload,
	type Page,
	type UpdateSavedPageRequest,
	type UpdateSavedWorkspaceRequest,
	type Workspace,
	type WorkspacePlatformProvider
} from "@openfin/workspace-platform";
import type { AnalyticsEvent } from "@openfin/workspace/common/src/utils/usage-register";
import * as analyticsProvider from "../analytics";
import { getDefaultToolbarButtons, updateBrowserWindowButtonsColorScheme } from "../buttons";
import * as endpointProvider from "../endpoint";
import { fireLifecycleEvent } from "../lifecycle";
import { createLogger } from "../logger-provider";
import { getGlobalMenu, getPageMenu, getViewMenu } from "../menu";
import { getSettings } from "../settings";
import type { PlatformAnalyticsEvent } from "../shapes/analytics-shapes";
import type { CascadingWindowOffsetStrategy } from "../shapes/browser-shapes";
import type {
	PageChangedLifecyclePayload,
	WorkspaceChangedLifecyclePayload
} from "../shapes/lifecycle-shapes";
import { applyClientSnapshot, decorateSnapshot } from "../snapshot-source";
import { setCurrentColorSchemeMode } from "../themes";
import { isEmpty } from "../utils";
import { getAllVisibleWindows, getPageBounds } from "./browser";
import { closedown as closedownPlatform } from "./platform";

const logger = createLogger("PlatformOverride");

let windowDefaultLeft: number | undefined;
let windowDefaultTop: number | undefined;
let windowPositioningStrategy: CascadingWindowOffsetStrategy | undefined;

/**
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
export function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Create a class which overrides the platform provider.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Gets the current state of windows and their views and returns a snapshot object containing that info.
		 * @param payload Undefined unless you've defined a custom `getSnapshot` protocol.
		 * @param identity Identity of the entity that called getSnapshot.
		 * @returns Snapshot of current platform state.
		 */
		public async getSnapshot(payload: undefined, identity: OpenFin.Identity): Promise<OpenFin.Snapshot> {
			const snapshot = await super.getSnapshot(payload, identity);

			// Decorate the default snapshot with additional information for connection clients.
			return decorateSnapshot(snapshot);
		}

		/**
		 * Handles requests to apply a snapshot to the current Platform.
		 * @param payload Payload containing the snapshot to be applied, as well as any options.
		 * @param identity Identity of the entity that called applySnapshot.
		 * Undefined if called internally (e.g. when opening the initial snapshot).
		 */
		public async applySnapshot(
			payload: OpenFin.ApplySnapshotPayload,
			identity?: OpenFin.Identity
		): Promise<void> {
			// Use the decorated snapshot to open any connected clients
			await Promise.all([super.applySnapshot(payload, identity), applyClientSnapshot(payload.snapshot)]);
		}

		/**
		 * Implementation for getting a list of saved workspaces from persistent storage.
		 * @param query an optional query.
		 * @returns The list of saved workspaces.
		 */
		public async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
			// you can add your own custom implementation here if you are storing your workspaces
			// in non-default location (e.g. on the server instead of locally)
			if (!isEmpty(query)) {
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

				if (workspacesResponse) {
					logger.info("Returning saved workspaces from custom storage");
					return Object.values(workspacesResponse);
				}
				logger.warn("No response getting saved workspaces from custom storage");
				return [];
			}
			logger.info("Requesting saved workspaces from default storage");
			const savedWorkspaces = await super.getSavedWorkspaces(query);
			logger.info("Returning saved workspaces from default storage");
			return savedWorkspaces;
		}

		/**
		 * Implementation for getting a single workspace in persistent storage.
		 * @param id The id of the workspace to get.
		 * @returns The workspace.
		 */
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
				if (workspaceResponse) {
					logger.info(`Returning saved workspace from custom storage for workspace id: ${id}`);
					return workspaceResponse;
				}
				logger.warn(`No response getting saved workspace from custom storage for workspace id: ${id}`);
				return {} as Workspace;
			}
			logger.info(`Requesting saved workspace from default storage for workspace id: ${id}`);
			const savedWorkspace = await super.getSavedWorkspace(id);
			logger.info(`Returning saved workspace from default storage for workspace id: ${id}`);
			return savedWorkspace;
		}

		/**
		 * Implementation for creating a saved workspace in persistent storage.
		 * @param req the create saved workspace request.
		 */
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

		/**
		 * Implementation for updating a saved workspace in persistent storage.
		 * @param req the update saved workspace request.
		 */
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

		/**
		 * Implementation for deleting a saved workspace in persistent storage.
		 * @param id of the id of the workspace to delete.
		 */
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

		/**
		 * Implementation for getting a list of saved pages from persistent storage.
		 * @param query an optional query.
		 * @returns The list of pages.
		 */
		public async getSavedPages(query?: string): Promise<Page[]> {
			// you can add your own custom implementation here if you are storing your pages
			// in non-default location (e.g. on the server instead of locally)
			if (!isEmpty(query)) {
				logger.info(`Saved pages requested with query: ${query}`);
			}
			const getPagesEndpointId = "page-get";
			logger.info(`Checking for custom page storage with endpoint id: ${getPagesEndpointId}`);
			if (endpointProvider.hasEndpoint(getPagesEndpointId)) {
				logger.info("Getting saved pages from custom storage");
				const pagesResponse = await endpointProvider.requestResponse<
					{ query?: string },
					{ [key: string]: Page }
				>(getPagesEndpointId, { query });
				if (pagesResponse) {
					logger.info("Returning saved pages from custom storage");
					return Object.values(pagesResponse);
				}
				logger.warn("No response getting saved pages from custom storage");
				return [];
			}
			logger.info("Getting saved pages from default storage");
			const pagesResponse = await super.getSavedPages(query);
			logger.info("Returning saved pages from default storage");
			return pagesResponse;
		}

		/**
		 * Implementation for getting a single page in persistent storage.
		 * @param id The id of the page to get.
		 * @returns The page.
		 */
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
				if (pageResponse) {
					logger.info(`Returning saved page from custom storage for page id: ${id}`);
					return pageResponse;
				}

				logger.warn(`No response getting saved page from custom storage for page id: ${id}`);
				return {} as Page;
			}
			logger.info(`Getting saved page with id ${id} from default storage`);
			const pageResponse = await super.getSavedPage(id);
			logger.info(`Returning saved page with id ${id} from default storage`);
			return pageResponse;
		}

		/**
		 * Implementation for creating a saved page in persistent storage.
		 * @param req the create saved page request.
		 */
		public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
			const platform = getCurrentSync();

			if (req.page.customData === undefined) {
				req.page.customData = {};
			}

			let windowBounds = await getPageBounds(req.page.pageId);

			if (isEmpty(windowBounds)) {
				// likely this is a new save page as implementation as we were unable to find this page id in the available pages
				const parentIdentity = await platform.Browser.getLastFocusedWindow();
				const parentWindow = fin.Window.wrapSync(parentIdentity);
				windowBounds = await parentWindow.getBounds();
			}

			if (windowBounds !== undefined && windowBounds !== null) {
				req.page.customData.windowBounds = windowBounds;
			}

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

			await fireLifecycleEvent(platform, "page-changed", {
				action: "create",
				id: req.page.pageId,
				page: req.page
			} as PageChangedLifecyclePayload);
		}

		/**
		 * Implementation for updating a saved page in persistent storage.
		 * @param req the update saved page request.
		 */
		public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
			const windowBounds = await getPageBounds(req.page.pageId);
			if (!isEmpty(windowBounds)) {
				if (req.page.customData === undefined) {
					req.page.customData = {};
				}
				req.page.customData.windowBounds = windowBounds;
			}
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

		/**
		 * Implementation for deleting a saved page in persistent storage.
		 * @param id of the id of the page to delete.
		 */
		public async deleteSavedPage(id: string): Promise<void> {
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

		/**
		 * Implementation for showing a global context menu given a menu template,
		 * handler callback, and screen coordinates.
		 * @param req the payload received by the provider call
		 * @param callerIdentity OF identity of the entity from which the request originated
		 */
		public async openGlobalContextMenu(
			req: OpenGlobalContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			const template = await getGlobalMenu(req.template, { windowIdentity: req.identity });
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

		/**
		 * Implementation for showing a view tab context menu given a menu template,
		 * handler callback, and screen coordinates.
		 * @param req the payload received by the provider call
		 * @param callerIdentity OF identity of the entity from which the request originated
		 */
		public async openViewTabContextMenu(
			req: OpenViewTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			const template = await getViewMenu(req.template, {
				windowIdentity: req.identity,
				views: req.selectedViews
			});
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

		/**
		 * Implementation for showing a page tab context menu given a menu template,
		 * handler callback, and screen coordinates.
		 * @param req the payload received by the provider call
		 * @param callerIdentity OF identity of the entity from which the request originated
		 */
		public async openPageTabContextMenu(
			req: OpenPageTabContextMenuPayload,
			callerIdentity: OpenFin.Identity
		): Promise<void> {
			const template = await getPageMenu(req.template, { windowIdentity: req.identity, pageId: req.pageId });
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

		/**
		 * Closes the current Platform and all child windows and views.
		 * @param payload Undefined unless you have implemented a custom quite protocol.
		 * @param callerIdentity Identity of the entity that called quit.
		 * @returns Nothing.
		 */
		public async quit(payload: undefined, callerIdentity: OpenFin.Identity): Promise<void> {
			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "before-quit");

			await closedownPlatform();

			return super.quit(payload, callerIdentity);
		}

		/**
		 * Handles requests to create a window in the current platform.
		 * @param options Window options for the window to be created.
		 * @param identity If createWindow was called, the identity of the caller will be here. If `createWindow` was
		 * called as part of applying a snapshot or creating a view without a target window, `identity` will be
		 * undefined.
		 * @returns The created window.
		 */
		public async createWindow(
			options: OpenFin.PlatformWindowCreationOptions,
			identity?: OpenFin.Identity
		): Promise<OpenFin.Window> {
			// AutoShow is not defined as optional, but it can be undefined
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
			if (options.autoShow === false) {
				// We use this case to match modal windows
				// so we don't theme or position them
				return super.createWindow(options, identity);
			}

			if (!windowPositioningStrategy || isEmpty(windowDefaultLeft) || isEmpty(windowDefaultTop)) {
				const app = await fin.Application.getCurrent();
				const platformManifest: OpenFin.Manifest = await app.getManifest();
				logger.info("Platform Default Window Options", platformManifest?.platform?.defaultWindowOptions);

				const settings = await getSettings();

				windowDefaultLeft =
					settings.browserProvider?.defaultWindowOptions?.defaultLeft ??
					platformManifest?.platform?.defaultWindowOptions?.defaultLeft ??
					0;
				windowDefaultTop =
					settings.browserProvider?.defaultWindowOptions?.defaultTop ??
					platformManifest?.platform?.defaultWindowOptions?.defaultTop ??
					0;

				windowPositioningStrategy = settings.browserProvider?.windowPositioningStrategy;
			}

			logger.info("Create Window", options);

			const hasLeft = !isEmpty(options?.defaultLeft);
			const hasTop = !isEmpty(options?.defaultTop);

			if (!hasLeft || !hasTop) {
				// Get the available rect for the display so we can take in to account
				// OS menus, task bar etc
				const monitorInfo = await fin.System.getMonitorInfo();
				const availableLeft = monitorInfo.primaryMonitor.availableRect.left;
				const availableTop = monitorInfo.primaryMonitor.availableRect.top;

				const windowOffsetsX: number = windowPositioningStrategy?.x ?? 30;
				const windowOffsetsY: number = windowPositioningStrategy?.y ?? 30;
				const windowOffsetsMaxIncrements: number = windowPositioningStrategy?.maxIncrements ?? 8;

				const visibleWindows = await getAllVisibleWindows();

				// Get the top left bounds for all the visible windows
				const topLeftBounds = await Promise.all(
					visibleWindows.map(async (win) => {
						const bounds = await win.getBounds();
						return {
							left: bounds.left,
							top: bounds.top,
							right: bounds.left + windowOffsetsX,
							bottom: bounds.top + windowOffsetsY
						};
					})
				);

				let minCountVal: number = 1000;
				let minCountIndex = windowOffsetsMaxIncrements;

				// Now see how many windows appear in each increment slot
				for (let i = 0; i < windowOffsetsMaxIncrements; i++) {
					const xPos = i * windowOffsetsX;
					const yPos = i * windowOffsetsY;
					const leftPos = windowDefaultLeft + xPos;
					const topPos = windowDefaultTop + yPos;
					const foundWins = topLeftBounds.filter(
						(topLeftWinBounds) =>
							topLeftWinBounds.left >= leftPos &&
							topLeftWinBounds.right <= leftPos + windowOffsetsX + availableLeft &&
							topLeftWinBounds.top >= topPos &&
							topLeftWinBounds.bottom <= topPos + windowOffsetsY + availableTop
					);

					// If this slot has less than the current minimum use this slot
					if (foundWins.length < minCountVal) {
						minCountVal = foundWins.length;
						minCountIndex = i;
					}
				}

				if (!hasLeft) {
					const xOffset = minCountIndex * windowOffsetsX;
					options.defaultLeft = windowDefaultLeft + xOffset + availableLeft;
				}
				if (!hasTop) {
					const yOffset = minCountIndex * windowOffsetsY;
					options.defaultTop = windowDefaultTop + yOffset + availableTop;
				}
			}

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

			logger.info("After Create Window", await window.getOptions());

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

		/**
		 * Implementation for setting selected scheme.
		 * @param schemeType Scheme to be set
		 * @returns Nothing.
		 */
		public async setSelectedScheme(schemeType: ColorSchemeOptionType): Promise<void> {
			// The color scheme has been updated, so update the theme
			await setCurrentColorSchemeMode(schemeType);

			return super.setSelectedScheme(schemeType);
		}

		/**
		 * Implementation for handling Workspace analytics events.
		 * @param events The list of analytics events to process.
		 * @returns Nothing.
		 */
		public async handleAnalytics(events: AnalyticsEvent[]): Promise<void> {
			if (analyticsProvider.isEnabled()) {
				const platformEvents: PlatformAnalyticsEvent[] = [];
				const timestamp = new Date();
				for (const analyticEvent of events) {
					platformEvents.push({ timestamp, ...analyticEvent });
				}
				await analyticsProvider.handleAnalytics(platformEvents);
			}

			return super.handleAnalytics(events);
		}
	}
	return new Override();
}
