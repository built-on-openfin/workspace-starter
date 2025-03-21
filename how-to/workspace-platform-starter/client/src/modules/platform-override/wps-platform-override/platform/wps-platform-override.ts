import type OpenFin from "@openfin/core";
import type { LayoutClient } from "@openfin/snap-sdk";
import type {
	AnalyticsEvent,
	ApplyWorkspacePayload,
	ColorSchemeOptionType,
	CreateSavedPageRequest,
	CreateSavedWorkspaceRequest,
	GlobalContextMenuItemData,
	OpenGlobalContextMenuPayload,
	OpenPageTabContextMenuPayload,
	OpenViewTabContextMenuPayload,
	Page,
	PageTabContextMenuItemData,
	UpdateSavedPageRequest,
	UpdateSavedWorkspaceRequest,
	ViewTabMenuData,
	Workspace,
	WorkspacePlatformProvider,
	HandleSaveModalOnPageClosePayload,
	SaveModalOnPageCloseResult,
	CopyPagePayload,
	HandlePageChangesPayload,
	ModifiedPageState,
	SetActivePageForWindowPayload,
	Locale
} from "@openfin/workspace-platform";
import type { DockProviderConfigWithIdentity } from "@openfin/workspace-platform/client-api/src";
import type {
	AnalyticsClient,
	PlatformAnalyticsEvent
} from "workspace-platform-starter/shapes/analytics-shapes";
import type { UnsavedPagePromptStrategy } from "workspace-platform-starter/shapes/browser-shapes";
import type { PlatformConnectionClient } from "workspace-platform-starter/shapes/connection-shapes";
import type { EndpointClient } from "workspace-platform-starter/shapes/endpoint-shapes";
import type {
	LanguageChangedLifecyclePayload,
	PageChangedLifecyclePayload,
	WorkspaceChangedLifecyclePayload
} from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger } from "workspace-platform-starter/shapes/logger-shapes";
import type { PlatformMenuClient, PopupMenuStyles } from "workspace-platform-starter/shapes/menu-shapes";
import type {
	EndpointPageGetRequest,
	EndpointPageGetResponse,
	EndpointPageListRequest,
	EndpointPageListResponse,
	EndpointPageRemoveRequest,
	EndpointPageSetRequest,
	EndpointWorkspaceGetRequest,
	EndpointWorkspaceGetResponse,
	EndpointWorkspaceListRequest,
	EndpointWorkspaceListResponse,
	EndpointWorkspaceRemoveRequest,
	EndpointWorkspaceSetRequest,
	PlatformOverrideHelpers,
	PlatformOverrideOptions
} from "workspace-platform-starter/shapes/platform-shapes";

import { ColorSchemeMode, type PlatformThemeClient } from "workspace-platform-starter/shapes/theme-shapes";
import { randomUUID, isEmpty } from "workspace-platform-starter/utils";
import {
	mapPlatformPageFromStorage,
	mapPlatformPageToStorage,
	mapPlatformWorkspaceToStorage,
	mapStorageToPlatformWorkspace
} from "./platform-mapper";
import { buildDefaultOptions, duplicateLayout, getPageBoundsAndState } from "./util";

const WORKSPACE_ENDPOINT_ID_LIST = "workspace-list";
const WORKSPACE_ENDPOINT_ID_GET = "workspace-get";
const WORKSPACE_ENDPOINT_ID_SET = "workspace-set";
const WORKSPACE_ENDPOINT_ID_REMOVE = "workspace-remove";

const PAGE_ENDPOINT_ID_LIST = "page-list";
const PAGE_ENDPOINT_ID_GET = "page-get";
const PAGE_ENDPOINT_ID_REMOVE = "page-remove";
const PAGE_ENDPOINT_ID_SET = "page-set";

let unsavedPagePromptStrategy: UnsavedPagePromptStrategy | undefined;
let disableStorageMapping: boolean | undefined;
let globalMenuStyle: PopupMenuStyles | undefined;
let pageMenuStyle: PopupMenuStyles | undefined;
let viewMenuStyle: PopupMenuStyles | undefined;
let workspaceApplied: boolean;

/**
 * Get the override constructor for the platform override (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
 * @param overrideOptions The options for the platform override defined as part of the platform.
 * @param logger The logger to use.
 * @param helpers A collection of helper methods.
 * @returns The override constructor to be used in an array.
 */
export async function getConstructorOverride(
	overrideOptions: PlatformOverrideOptions,
	logger: Logger,
	helpers: PlatformOverrideHelpers
): Promise<OpenFin.ConstructorOverride<WorkspacePlatformProvider>> {
	disableStorageMapping = overrideOptions?.platformProviderOptions?.disableStorageMapping ?? false;
	globalMenuStyle = overrideOptions?.browserProviderOptions?.menuOptions?.styles?.globalMenu;
	pageMenuStyle = overrideOptions?.browserProviderOptions?.menuOptions?.styles?.pageMenu;
	viewMenuStyle = overrideOptions?.browserProviderOptions?.menuOptions?.styles?.viewMenu;
	unsavedPagePromptStrategy = overrideOptions?.browserProviderOptions?.unsavedPagePromptStrategy ?? "default";
	workspaceApplied = false;
	let endpointProvider: EndpointClient | undefined;
	if (helpers?.getEndpointClient) {
		endpointProvider = await helpers.getEndpointClient();
	}

	let analyticsClient: AnalyticsClient | undefined;

	if (helpers.getAnalyticsClient) {
		analyticsClient = await helpers.getAnalyticsClient();
	}

	if (
		!endpointProvider ||
		!helpers.getThemeClient ||
		!helpers.getVersionInfo ||
		!helpers.getPlatform ||
		!helpers.getMenuClient ||
		!helpers.fireLifecycleEvent ||
		!helpers.getSnapClient ||
		!helpers.getConnectionClient
	) {
		throw new Error(
			"Platform Override Constructor is missing required helpers. The platform override will not function correctly so this error is to flag the issue."
		);
	}
	const versionInfo = await helpers.getVersionInfo();
	const getCurrentSync = helpers.getPlatform;
	const menuClient = (await helpers.getMenuClient()) as PlatformMenuClient;
	const fireLifecycleEvent = helpers.fireLifecycleEvent;
	const utilClient = helpers.getUtilClient();
	const snapClient = await helpers.getSnapClient();
	const windowPositioningOptions = await utilClient.position.getWindowPositionOptions(
		overrideOptions?.browserProviderOptions
	);
	const themeClient = (await helpers.getThemeClient()) as PlatformThemeClient;
	const connectionClient: PlatformConnectionClient = await helpers.getConnectionClient();
	const buttonClient = await helpers.getButtonClient();
	const dockClient = await helpers.getDockClient();
	// eslint-disable-next-line func-style, @typescript-eslint/explicit-function-return-type
	const notifyLanguageChange = async (locale: Locale) => {
		const platform = getCurrentSync();
		await fireLifecycleEvent<LanguageChangedLifecyclePayload>(platform, "language-changed", {
			locale
		});
		const appSessionContextGroup = await fin.me.interop.joinSessionContextGroup("platform/events");
		await appSessionContextGroup.setContext({
			type: "platform.language",
			locale
		} as OpenFin.Context);
	};
	return (Base: OpenFin.Constructor<WorkspacePlatformProvider>) =>
		/**
		 * Create a class which overrides the platform provider.
		 */
		class Override extends Base {
			/**
			 * Supports launching a manifest into a platform.
			 * @param payload The manifest to load into the platform
			 * @returns nothing.
			 */
			public async launchIntoPlatform(payload: OpenFin.LaunchIntoPlatformPayload): Promise<void> {
				logger.debug(
					"launchIntoPlatform called. Please use the initOptionsProvider for loading content into the platform. If triggered by clicking on the application icon then autoShow options from the bootstrapper are applied.",
					payload
				);
			}

			/**
			 * Gets the current state of windows and their views and returns a snapshot object containing that info.
			 * @param payload Undefined unless you've defined a custom `getSnapshot` protocol.
			 * @param identity Identity of the entity that called getSnapshot.
			 * @returns Snapshot of current platform state.
			 */
			public async getSnapshot(payload: undefined, identity: OpenFin.Identity): Promise<OpenFin.Snapshot> {
				let snapshot = await super.getSnapshot(payload, identity);

				if (snapClient.isEnabled()) {
					snapshot = await snapClient.decorateSnapshot(snapshot);
				}

				if (isEmpty(connectionClient?.decorateSnapshot)) {
					return snapshot;
				}
				// Decorate the default snapshot with additional information for connection clients.
				return connectionClient.decorateSnapshot(snapshot);
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
				let existingApps: LayoutClient[] | undefined;
				if (snapClient.isEnabled()) {
					existingApps = await snapClient.prepareToApplyDecoratedSnapshot();
				}

				await super.applySnapshot(payload, identity);

				if (!isEmpty(connectionClient?.applyClientSnapshot)) {
					// Use the decorated snapshot to open any connected clients
					await connectionClient.applyClientSnapshot(payload.snapshot);
				}

				if (snapClient.isEnabled()) {
					await snapClient.applyDecoratedSnapshot(payload.snapshot, existingApps ?? []);
				}
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
				logger.info(`Checking for custom workspace storage with endpoint id: ${WORKSPACE_ENDPOINT_ID_LIST}`);
				if (endpointProvider.hasEndpoint(WORKSPACE_ENDPOINT_ID_LIST)) {
					logger.info("Requesting saved workspaces from custom storage");
					const workspacesResponse = await endpointProvider.requestResponse<
						EndpointWorkspaceListRequest,
						EndpointWorkspaceListResponse
					>(WORKSPACE_ENDPOINT_ID_LIST, { platform: fin.me.identity.uuid, query });

					if (!isEmpty(workspacesResponse) && Object.keys(workspacesResponse).length > 0) {
						logger.info("Returning saved workspaces from custom storage");
						return Object.values(workspacesResponse).map((response) => response.payload);
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
			public async getSavedWorkspace(id: string): Promise<Workspace | undefined> {
				// you can add your own custom implementation here if you are storing your workspaces
				// in non-default location (e.g. on the server instead of locally)
				logger.info(`Checking for custom workspace storage with endpoint id: ${WORKSPACE_ENDPOINT_ID_GET}`);
				if (endpointProvider.hasEndpoint(WORKSPACE_ENDPOINT_ID_GET)) {
					logger.info(`Requesting saved workspace from custom storage for workspace id: ${id}`);
					const workspaceResponse = await endpointProvider.requestResponse<
						EndpointWorkspaceGetRequest,
						EndpointWorkspaceGetResponse
					>(WORKSPACE_ENDPOINT_ID_GET, { platform: fin.me.identity.uuid, id });
					if (!isEmpty(workspaceResponse?.payload)) {
						logger.info(`Returning saved workspace from custom storage for workspace id: ${id}`);
						const defaultOpts = await buildDefaultOptions();
						return mapStorageToPlatformWorkspace(workspaceResponse.payload, defaultOpts);
					}
					logger.warn(`No response getting saved workspace from custom storage for workspace id: ${id}`);
					return undefined;
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
				logger.info(`Checking for custom workspace storage with endpoint id: ${WORKSPACE_ENDPOINT_ID_SET}`);
				if (endpointProvider.hasEndpoint(WORKSPACE_ENDPOINT_ID_SET)) {
					const success = await endpointProvider.action<EndpointWorkspaceSetRequest>(
						WORKSPACE_ENDPOINT_ID_SET,
						{
							platform: fin.me.identity.uuid,
							id: req.workspace.workspaceId,
							metaData: {
								version: {
									workspacePlatformClient: versionInfo.workspacePlatformClient,
									platformClient: versionInfo.platformClient
								}
							},
							payload: disableStorageMapping
								? req.workspace
								: mapPlatformWorkspaceToStorage(req.workspace, await buildDefaultOptions())
						}
					);
					if (success) {
						logger.info(`Saved workspace with id: ${req.workspace.workspaceId} to custom storage`);
					} else {
						const saveError = `Unable to save workspace with id: ${req.workspace.workspaceId} to custom storage`;
						logger.error(saveError);
						// if we have been unable to save the workspace to custom storage, we should throw an error so that the workspace code
						// can react accordingly but showing the failure indicator.
						throw new Error(saveError);
					}
				} else {
					logger.info(`Saving workspace to default storage for workspace id: ${req.workspace.workspaceId}`);
					await super.createSavedWorkspace(req);
					logger.info(`Saved workspace to default storage for workspace id: ${req.workspace.workspaceId}`);
				}

				const platform = getCurrentSync();
				workspaceApplied = true;
				await fireLifecycleEvent<WorkspaceChangedLifecyclePayload>(platform, "workspace-changed", {
					action: "create",
					id: req.workspace.workspaceId,
					workspace: req.workspace
				});
			}

			/**
			 * Implementation for updating a saved workspace in persistent storage.
			 * @param req the update saved workspace request.
			 */
			public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
				// you can add your own custom implementation here if you are storing your workspaces
				// in non-default location (e.g. on the server instead of locally)
				logger.info(`Checking for custom workspace storage with endpoint id: ${WORKSPACE_ENDPOINT_ID_SET}`);
				if (endpointProvider.hasEndpoint(WORKSPACE_ENDPOINT_ID_SET)) {
					const success = await endpointProvider.action<EndpointWorkspaceSetRequest>(
						WORKSPACE_ENDPOINT_ID_SET,
						{
							platform: fin.me.identity.uuid,
							id: req.workspace.workspaceId,
							metaData: {
								version: {
									workspacePlatformClient: versionInfo.workspacePlatformClient,
									platformClient: versionInfo.platformClient
								}
							},
							payload: disableStorageMapping
								? req.workspace
								: mapPlatformWorkspaceToStorage(req.workspace, await buildDefaultOptions())
						}
					);
					if (success) {
						logger.info(`Updated workspace with id: ${req.workspace.workspaceId} against custom storage`);
					} else {
						const errorMessage = `Unable to update workspace with id: ${req.workspace.workspaceId} against custom storage`;
						logger.error(errorMessage);
						// if we have been unable to update the workspace to custom storage, we should throw an error so that the workspace code can react accordingly
						throw new Error(errorMessage);
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
				workspaceApplied = true;
				await fireLifecycleEvent<WorkspaceChangedLifecyclePayload>(platform, "workspace-changed", {
					action: "update",
					id: req.workspace.workspaceId,
					workspace: req.workspace
				});
			}

			/**
			 * Implementation for deleting a saved workspace in persistent storage.
			 * @param id of the id of the workspace to delete.
			 */
			public async deleteSavedWorkspace(id: string): Promise<void> {
				// you can add your own custom implementation here if you are storing your workspaces
				// in non-default location (e.g. on the server instead of locally)
				logger.info(
					`Checking for custom workspace storage with endpoint id: ${WORKSPACE_ENDPOINT_ID_REMOVE}`
				);
				if (endpointProvider.hasEndpoint(WORKSPACE_ENDPOINT_ID_REMOVE)) {
					const success = await endpointProvider.action<EndpointWorkspaceRemoveRequest>(
						WORKSPACE_ENDPOINT_ID_REMOVE,
						{ platform: fin.me.identity.uuid, id }
					);
					if (success) {
						logger.info(`Removed workspace with id: ${id} from custom storage`);
					} else {
						const errorMessage = `Unable to remove workspace with id: ${id} from custom storage`;
						logger.error(errorMessage);
						// if we have been unable to remove the workspace from custom storage, we should throw an error so that the workspace code can react accordingly
						throw new Error(errorMessage);
					}
				} else {
					logger.info(`Deleting workspace from default storage for workspace id: ${id}`);
					await super.deleteSavedWorkspace(id);
					logger.info(`Deleted workspace from default storage for workspace id: ${id}`);
				}

				const platform = getCurrentSync();
				await fireLifecycleEvent<WorkspaceChangedLifecyclePayload>(platform, "workspace-changed", {
					action: "delete",
					id
				});
			}

			/**
			 * Apply the workspace to the current platform.
			 * @param payload The payload for the workspace details.
			 * @returns True if the workspace was applied.
			 */
			public async applyWorkspace(payload: ApplyWorkspacePayload): Promise<boolean> {
				if (!payload) {
					return false;
				}
				const platform = getCurrentSync();
				if (!workspaceApplied) {
					let skipPrompt;
					const currentLayout = await platform.getSnapshot();
					if (Array.isArray(currentLayout.windows) && currentLayout.windows.length === 0) {
						skipPrompt = true;
						if (isEmpty(payload.options)) {
							payload.options = {
								skipPrompt
							};
						} else if (!isEmpty(payload.options) && isEmpty(payload.options.skipPrompt)) {
							payload.options.skipPrompt = skipPrompt;
						}
					}
				}
				const applied = await super.applyWorkspace({
					...payload,
					options: {
						...payload.options,
						applySnapshotOptions: {
							...payload.options?.applySnapshotOptions,
							closeExistingWindows: false,
							closeSnapshotWindows: true
						}
					}
				});

				if (applied && !workspaceApplied) {
					workspaceApplied = true;
				}

				await fireLifecycleEvent<WorkspaceChangedLifecyclePayload>(platform, "workspace-changed", {
					action: "apply",
					id: payload.workspaceId,
					workspace: payload
				});

				return applied;
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
				logger.info(`Checking for custom page storage with endpoint id: ${PAGE_ENDPOINT_ID_LIST}`);
				if (endpointProvider.hasEndpoint(PAGE_ENDPOINT_ID_LIST)) {
					logger.info("Getting saved pages from custom storage");
					const pagesResponse = await endpointProvider.requestResponse<
						EndpointPageListRequest,
						EndpointPageListResponse
					>(PAGE_ENDPOINT_ID_LIST, { platform: fin.me.identity.uuid, query });
					if (!isEmpty(pagesResponse) && Object.keys(pagesResponse).length > 0) {
						logger.info("Returning saved pages from custom storage");
						return Object.values(pagesResponse).map((ws) => ws.payload);
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
			public async getSavedPage(id: string): Promise<Page | undefined> {
				// you can add your own custom implementation here if you are storing your pages
				// in non-default location (e.g. on the server instead of locally)
				logger.info(`Checking for custom page storage with endpoint id: ${PAGE_ENDPOINT_ID_GET}`);
				let pageToReturn: Page | undefined;
				if (endpointProvider.hasEndpoint(PAGE_ENDPOINT_ID_GET)) {
					logger.info(`Getting saved page from custom storage for page id: ${id}`);
					const pageResponse = await endpointProvider.requestResponse<
						EndpointPageGetRequest,
						EndpointPageGetResponse
					>(PAGE_ENDPOINT_ID_GET, {
						platform: fin.me.identity.uuid,
						id
					});
					if (!isEmpty(pageResponse?.payload)) {
						logger.info(`Returning saved page from custom storage for page id: ${id}`);
						const defaultOpts = await buildDefaultOptions();
						pageToReturn = mapPlatformPageFromStorage(pageResponse.payload, defaultOpts);
					} else {
						logger.warn(`No response getting saved page from custom storage for page id: ${id}`);
						return;
					}
				} else {
					logger.info(`Getting saved page with id ${id} from default storage`);
					pageToReturn = await super.getSavedPage(id);
					if (!isEmpty(pageToReturn)) {
						logger.info(`Returning saved page with id ${id} from default storage`);
					} else {
						logger.warn(`No response getting saved page from default storage for page id: ${id}`);
						return;
					}
				}
				pageToReturn.layout = duplicateLayout(pageToReturn?.layout);
				if (Array.isArray(pageToReturn.panels) && pageToReturn.panels.length > 0) {
					pageToReturn.panels = duplicateLayout(pageToReturn.panels);
				}
				return pageToReturn;
			}

			/**
			 * Implementation for creating a saved page in persistent storage.
			 * @param req the create saved page request.
			 */
			public async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
				const platform = getCurrentSync();
				const windowBoundsAndState = await getPageBoundsAndState(platform, req.page.pageId);
				if (!isEmpty(windowBoundsAndState)) {
					if (isEmpty(req.page.customData)) {
						req.page.customData = {};
					}
					// only set if it hasn't been provided by the caller
					if (isEmpty(req.page?.customData?.windowBounds)) {
						req.page.customData.windowBounds = windowBoundsAndState.bounds;
					}

					if (isEmpty(req.page?.customData?.windowState)) {
						req.page.customData.windowState = windowBoundsAndState.state;
					}
				}

				// you can add your own custom implementation here if you are storing your pages
				// in non-default location (e.g. on the server instead of locally)
				logger.info(`Checking for custom page storage with endpoint id: ${PAGE_ENDPOINT_ID_SET}`);
				if (endpointProvider.hasEndpoint(PAGE_ENDPOINT_ID_SET)) {
					logger.info(`Saving page with id: ${req.page.pageId} to custom storage`);
					const success = await endpointProvider.action<EndpointPageSetRequest>(PAGE_ENDPOINT_ID_SET, {
						platform: fin.me.identity.uuid,
						id: req.page.pageId,
						metaData: {
							version: {
								workspacePlatformClient: versionInfo.workspacePlatformClient,
								platformClient: versionInfo.platformClient
							}
						},
						payload: disableStorageMapping
							? req.page
							: mapPlatformPageToStorage(req.page, await buildDefaultOptions())
					});
					if (success) {
						logger.info(`Saved page with id: ${req.page.pageId} to custom storage`);
					} else {
						const errorMessage = `Unable to save page with id: ${req.page.pageId} to custom storage`;
						logger.error(errorMessage);
						// if we have been unable to save the page to custom storage, we should throw an error so that the workspace code can react accordingly
						throw new Error(errorMessage);
					}
				} else {
					logger.info(`creating saved page and saving to default storage. PageId: ${req.page.pageId}`);
					await super.createSavedPage(req);
					logger.info(`Saved page with id: ${req.page.pageId} to default storage`);
				}

				await fireLifecycleEvent<PageChangedLifecyclePayload>(platform, "page-changed", {
					action: "create",
					id: req.page.pageId,
					page: req.page
				});
			}

			/**
			 * Implementation for updating a saved page in persistent storage.
			 * @param req the update saved page request.
			 */
			public async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
				const platform = getCurrentSync();
				const windowBoundsAndState = await getPageBoundsAndState(platform, req.page.pageId);
				if (!isEmpty(windowBoundsAndState)) {
					if (isEmpty(req.page.customData)) {
						req.page.customData = {};
					}
					req.page.customData.windowBounds = windowBoundsAndState.bounds;
					req.page.customData.windowState = windowBoundsAndState.state;
				}
				// you can add your own custom implementation here if you are storing your pages
				// in non-default location (e.g. on the server instead of locally)
				logger.info(`Checking for custom page storage with endpoint id: ${PAGE_ENDPOINT_ID_SET}`);
				if (endpointProvider.hasEndpoint(PAGE_ENDPOINT_ID_SET)) {
					logger.info(`Updating saved page and saving to custom storage with page id: ${req.page.pageId}`);
					const success = await endpointProvider.action<EndpointPageSetRequest>(PAGE_ENDPOINT_ID_SET, {
						platform: fin.me.identity.uuid,
						id: req.page.pageId,
						metaData: {
							version: {
								workspacePlatformClient: versionInfo.workspacePlatformClient,
								platformClient: versionInfo.platformClient
							}
						},
						payload: disableStorageMapping
							? req.page
							: mapPlatformPageToStorage(req.page, await buildDefaultOptions())
					});
					if (success) {
						logger.info(`Updated page with id: ${req.page.pageId} against custom storage`);
					} else {
						const errorMessage = `Unable to save page with id: ${req.page.pageId} against custom storage`;
						logger.error(errorMessage);
						// if we have been unable to save the page to custom storage, we should throw an error so that the workspace code can react accordingly
						throw new Error(errorMessage);
					}
				} else {
					logger.info(`updating saved page and saving to default storage with page id: ${req.page.pageId}`);
					await super.updateSavedPage(req);
					logger.info(`Updated page with id: ${req.page.pageId} against default storage`);
				}

				await fireLifecycleEvent<PageChangedLifecyclePayload>(platform, "page-changed", {
					action: "update",
					id: req.page.pageId,
					page: req.page
				});
			}

			/**
			 * Implementation for deleting a saved page in persistent storage.
			 * @param id of the id of the page to delete.
			 */
			public async deleteSavedPage(id: string): Promise<void> {
				// you can add your own custom implementation here if you are storing your pages
				// in non-default location (e.g. on the server instead of locally)
				logger.info(`Checking for custom page storage with endpoint id: ${PAGE_ENDPOINT_ID_REMOVE}`);
				if (endpointProvider.hasEndpoint(PAGE_ENDPOINT_ID_REMOVE)) {
					logger.info(`deleting saved page from custom storage. PageId: ${id}`);
					const success = await endpointProvider.action<EndpointPageRemoveRequest>(PAGE_ENDPOINT_ID_REMOVE, {
						platform: fin.me.identity.uuid,
						id
					});
					if (success) {
						logger.info(`Removed page with id: ${id} from custom storage`);
					} else {
						const errorMessage = `Unable to remove page with id: ${id} from custom storage`;
						logger.error(errorMessage);
						// if we have been unable to remove the page from custom storage, we should throw an error so that the workspace code can react accordingly
						throw new Error(errorMessage);
					}
				} else {
					logger.info(`deleting saved page from default storage. PageId: ${id}`);
					await super.deleteSavedPage(id);
					logger.info(`Removed page with id: ${id} from custom storage`);
				}
				const platform = getCurrentSync();
				await fireLifecycleEvent<PageChangedLifecyclePayload>(platform, "page-changed", {
					action: "delete",
					id
				});
			}

			/**
			 * Implementation for showing a global context menu given a menu template,
			 * handler callback, and screen coordinates.
			 * @param req the payload received by the provider call
			 * @param callerIdentity OF identity of the entity from which the request originated
			 * @returns Nothing.
			 */
			public async openGlobalContextMenu(
				req: OpenGlobalContextMenuPayload,
				callerIdentity: OpenFin.Identity
			): Promise<void> {
				const template = await menuClient.getGlobalMenu(req.template, { windowIdentity: req.identity });

				const popupMenuStyle = globalMenuStyle ?? menuClient.getPopupMenuStyle();

				if (popupMenuStyle === "platform") {
					return super.openGlobalContextMenu(
						{
							...req,
							template
						},
						callerIdentity
					);
				}

				const result = await menuClient.showPopupMenu<GlobalContextMenuItemData>(
					{ x: req.x, y: req.y },
					req.identity,
					"",
					template,
					{ popupMenuStyle }
				);
				if (result) {
					req.callback(result, req);
				}
			}

			/**
			 * Implementation for showing a view tab context menu given a menu template,
			 * handler callback, and screen coordinates.
			 * @param req the payload received by the provider call
			 * @param callerIdentity OF identity of the entity from which the request originated
			 * @returns Nothing.
			 */
			public async openViewTabContextMenu(
				req: OpenViewTabContextMenuPayload,
				callerIdentity: OpenFin.Identity
			): Promise<void> {
				const template = await menuClient.getViewMenu(req.template, {
					windowIdentity: req.identity,
					views: req.selectedViews
				});

				const popupMenuStyle = viewMenuStyle ?? menuClient.getPopupMenuStyle();

				if (popupMenuStyle === "platform") {
					return super.openViewTabContextMenu(
						{
							...req,
							template
						},
						callerIdentity
					);
				}

				const result = await menuClient.showPopupMenu<ViewTabMenuData>(
					{ x: req.x, y: req.y },
					req.identity,
					"",
					template,
					{ popupMenuStyle }
				);
				if (result) {
					req.callback(result, req);
				}
			}

			/**
			 * Implementation for showing a page tab context menu given a menu template,
			 * handler callback, and screen coordinates.
			 * @param req the payload received by the provider call
			 * @param callerIdentity OF identity of the entity from which the request originated
			 * @returns Nothing.
			 */
			public async openPageTabContextMenu(
				req: OpenPageTabContextMenuPayload,
				callerIdentity: OpenFin.Identity
			): Promise<void> {
				const template = await menuClient.getPageMenu(req.template, {
					windowIdentity: req.identity,
					pageId: req.pageId
				});

				const popupMenuStyle = pageMenuStyle ?? menuClient.getPopupMenuStyle();

				if (popupMenuStyle === "platform") {
					return super.openPageTabContextMenu(
						{
							...req,
							template
						},
						callerIdentity
					);
				}

				const result = await menuClient.showPopupMenu<PageTabContextMenuItemData>(
					{ x: req.x, y: req.y },
					req.identity,
					"",
					template,
					{ popupMenuStyle }
				);
				if (result) {
					req.callback(result, req);
				}
			}

			/**
			 * Closes the current Platform and all child windows and views.
			 * @param payload Undefined unless you have implemented a custom quit protocol.
			 * @param callerIdentity Identity of the entity that called quit.
			 * @returns Nothing.
			 */
			public async quit(payload: undefined, callerIdentity: OpenFin.Identity): Promise<void> {
				const platform = getCurrentSync();
				await fireLifecycleEvent(platform, "before-quit");

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

				if (
					!isEmpty(windowPositioningOptions) &&
					!windowPositioningOptions?.disableWindowPositioningStrategy
				) {
					const hasLeft = !isEmpty(options?.defaultLeft);
					const hasTop = !isEmpty(options?.defaultTop);

					if (!hasLeft || !hasTop) {
						const position =
							await utilClient.position.getWindowPositionUsingStrategy(windowPositioningOptions);

						if (!hasLeft && !isEmpty(position?.left)) {
							options.defaultLeft = position.left;
							logger.debug(`Updating default left to ${position.left} using window positioning strategy`);
						}
						if (!hasTop && !isEmpty(position?.top)) {
							options.defaultTop = position.top;
							logger.debug(`Updating default top to ${position.top} using window positioning strategy`);
						}
					}
				}
				const overrideDefaultButtons = Array.isArray(options?.workspacePlatform?.toolbarOptions?.buttons);

				if (!overrideDefaultButtons) {
					// The window options don't override the toolbar buttons
					// so we assume we are using the workspace defaults
					// Since the defaults were created using the theme at startup
					// we need to replace them with the current set of default
					// buttons which are theme and condition aware
					options.workspacePlatform = options.workspacePlatform ?? {};
					options.workspacePlatform.toolbarOptions = options.workspacePlatform.toolbarOptions ?? {};
					const buttons = await buttonClient.getToolbarButtons(options);
					if (!isEmpty(buttons)) {
						options.workspacePlatform.toolbarOptions.buttons = buttons;
					}
				}

				const window = await super.createWindow(options, identity);

				try {
					logger.info("After Create Window", await window.getOptions());
				} catch {
					// the logging is for informational purposes during debugging. If it fails
					// the window may have closed straight after opening (e.g. automation testing)
				}

				// If the default buttons were overwritten then hopefully the creator
				// used correctly themed versions, but in case they didn't we send
				// an update for the colors.
				if (overrideDefaultButtons) {
					try {
						const platform = getCurrentSync();
						const browserWindow = platform.Browser.wrapSync(window.identity);
						await buttonClient.updateBrowserWindowButtonsColorScheme(browserWindow);
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
				if (isEmpty(themeClient.setCurrentColorSchemeMode)) {
					logger.warn("setCurrentColorSchemeMode is not implemented in the theme client.");
					await super.setSelectedScheme(schemeType);
				} else {
					let colorSchemeMode: ColorSchemeMode | undefined;
					switch (schemeType) {
						case "dark":
							colorSchemeMode = ColorSchemeMode.Dark;
							break;
						case "light":
							colorSchemeMode = ColorSchemeMode.Light;
							break;
						default:
							colorSchemeMode = undefined;
							break;
					}
					await Promise.all([
						themeClient.setCurrentColorSchemeMode(colorSchemeMode),
						super.setSelectedScheme(schemeType)
					]);
				}
			}

			/**
			 * Implementation for setting the language.
			 * @param locale The locale in ISO language code format.
			 */
			public async setLanguage(locale: Locale): Promise<void> {
				logger.info(`Setting language to: ${locale}`);
				await Promise.all([notifyLanguageChange(locale), super.setLanguage(locale)]);
			}

			/**
			 * Implementation for handling Workspace analytics events.
			 * @param events The list of analytics events to process.
			 * @returns Nothing.
			 */
			public async handleAnalytics(events: AnalyticsEvent[]): Promise<void> {
				if (analyticsClient) {
					const platformEvents: PlatformAnalyticsEvent[] = [];
					const timestamp = new Date();
					for (const analyticEvent of events) {
						platformEvents.push({ timestamp, ...analyticEvent });
					}
					await analyticsClient.handleAnalytics(platformEvents);
				}

				return super.handleAnalytics(events);
			}

			/**
			 * Implementation for getting the dock provider from persistent storage.
			 * @param id The id of the dock provider to get.
			 * @returns The loaded dock provider config.
			 */
			public async getDockProviderConfig(id: string): Promise<DockProviderConfigWithIdentity | undefined> {
				return dockClient.loadConfig(id, async (providerId: string) =>
					super.getDockProviderConfig(providerId)
				);
			}

			/**
			 * Implementation for saving a dock provider config to persistent storage.
			 * @param config The new dock config to save to persistent storage.
			 * @returns Nothing.
			 */
			public async saveDockProviderConfig(config: DockProviderConfigWithIdentity): Promise<void> {
				return dockClient.saveConfig(config, async (providerConfig: DockProviderConfigWithIdentity) =>
					super.saveDockProviderConfig(providerConfig)
				);
			}

			/**
			 * Determine whether or not a dialog should be shown.
			 * @param payload the page that is going to be closed.
			 * @returns Whether or not a modal should be shown
			 */
			public async handleSaveModalOnPageClose(
				payload: HandleSaveModalOnPageClosePayload
			): Promise<SaveModalOnPageCloseResult> {
				// close confirmation modal will not be shown if the page is locked
				if (isEmpty(unsavedPagePromptStrategy) || unsavedPagePromptStrategy === "default") {
					return super.handleSaveModalOnPageClose(payload);
				}
				if (unsavedPagePromptStrategy === "never") {
					return { shouldShowModal: false };
				}
				if (unsavedPagePromptStrategy === "skip-untitled") {
					const platform = getCurrentSync();
					const defaultPageTitle = await platform.Browser.getUniquePageTitle();
					const defaultPagePrefix = defaultPageTitle.split(" ")[0];
					if (payload.page.title.startsWith(defaultPagePrefix)) {
						return { shouldShowModal: false };
					}
				}
				logger.warn("Unsaved page prompt strategy is not valid. Using default.");
				return super.handleSaveModalOnPageClose(payload);
			}

			/**
			 * Copies a page, respecting conventions for page and panel names.
			 * @param payload The payload for the copy page request.
			 * @returns The copied page.
			 */
			public async copyPage(payload: CopyPagePayload): Promise<Page> {
				const panels = isEmpty(payload?.page?.panels)
					? payload?.page?.panels
					: duplicateLayout(payload.page.panels);

				const layout = duplicateLayout(payload.page.layout);

				return {
					...payload.page,
					panels,
					layout,
					pageId: randomUUID(),
					isReadOnly: false
				};
			}

			/**
			 * Implementation for detecting if a page change qualifies as putting the page in an unsaved state.
			 * @param payload the page with new changes and the identity of the OF window where the page change occured.
			 * @returns modified page state
			 */
			public async handlePageChanges(payload: HandlePageChangesPayload): Promise<ModifiedPageState> {
				return super.handlePageChanges(payload);
			}

			/**
			 * Implementation for setting the active page in a browser window.
			 * Called when the active page is changed and on browser window creation.
			 * @param payload The page which is about to become active.
			 * @returns nothing.
			 */
			public async setActivePage(payload: SetActivePageForWindowPayload): Promise<void> {
				const platform = getCurrentSync();
				await Promise.all([
					super.setActivePage(payload),
					fireLifecycleEvent<PageChangedLifecyclePayload>(platform, "page-changed", {
						action: "focus",
						id: payload.pageId
					})
				]);
			}
		};
}
