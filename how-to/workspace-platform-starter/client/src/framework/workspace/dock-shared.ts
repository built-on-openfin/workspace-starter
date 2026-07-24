import {
	DockButtonNames,
	type CustomButtonConfig,
	type CustomDropdownConfig,
	type DockButton,
	type WorkspaceButton
} from "@openfin/workspace";
import { getCurrentSync, type Dock3Button, type WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { DockProviderConfigWithIdentity } from "@openfin/workspace-platform/client-api/src";
import { checkConditions } from "workspace-platform-starter/conditions";
import type { ConditionChangedLifecyclePayload } from "workspace-platform-starter/shapes/lifecycle-shapes";
import type {
	EndpointDockGetRequest,
	EndpointDockGetResponse,
	EndpointDockSetRequest
} from "workspace-platform-starter/shapes/platform-shapes";
import { imageUrlToDataUrl } from "workspace-platform-starter/utils-img";
import { PLATFORM_ACTION_IDS } from "../actions";
import { getApp, getAppsByTag } from "../apps";
import * as endpointProvider from "../endpoint";
import { subscribeLifecycleEvent, unsubscribeLifecycleEvent } from "../lifecycle";
import { createLogger } from "../logger-provider";
import * as Menu from "../menu";
import type { PlatformApp } from "../shapes/app-shapes";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type {
	DockButtonAction,
	DockButtonApp,
	DockButtonAppsByTag,
	DockButtonDropdown,
	DockButtonTypes,
	DockProviderOptions
} from "../shapes/dock-shapes";
import type { ColorSchemeMode } from "../shapes/theme-shapes";
import { getCurrentColorSchemeMode, getCurrentIconFolder, themeUrl } from "../themes";
import { isEmpty, isStringValue } from "../utils";
import { getVersionInfo } from "../version";

/**
 * This module contains the logic that is shared between the workspace and platform dock implementations
 * (dock-workspace.ts and dock-platform.ts): building the canonical workspace-shape button list from the
 * `entries` configuration, the workspace button visibility logic, the shared persistence helpers (so both
 * dock types can be backed by the same storage endpoints/shape) and the lifecycle subscriptions
 * that trigger a refresh. Only dock-workspace.ts and dock-platform.ts should import from this module.
 */

const logger = createLogger("DockShared");

/**
 * The endpoint id used to request a dock provider config from custom storage.
 */
export const DOCK_ENDPOINT_ID_GET = "dock-get";

/**
 * The endpoint id used to persist a dock provider config to custom storage.
 */
export const DOCK_ENDPOINT_ID_SET = "dock-set";

let dockProviderOptions: DockProviderOptions | undefined;
const usedConditions: Set<string> = new Set<string>();
let registeredBootstrapOptions: BootstrapOptions | undefined;
let registeredButtons: DockButton[];
let themeChangedSubscriptionId: string | undefined;
let appsChangedSubscriptionId: string | undefined;
let conditionChangedSubscriptionId: string | undefined;

/**
 * Get the dock provider options passed to register, shared between the workspace and platform
 * implementations.
 * @returns The dock provider options.
 */
export function getDockProviderOptions(): DockProviderOptions | undefined {
	return dockProviderOptions;
}

/**
 * Set the dock provider options, shared between the workspace and platform implementations.
 * @param options The dock provider options.
 */
export function setDockProviderOptions(options: DockProviderOptions | undefined): void {
	dockProviderOptions = options;
}

/**
 * Get the bootstrap options passed to register, shared between the workspace and platform
 * implementations.
 * @returns The bootstrap options.
 */
export function getRegisteredBootstrapOptions(): BootstrapOptions | undefined {
	return registeredBootstrapOptions;
}

/**
 * Set the bootstrap options, shared between the workspace and platform implementations.
 * @param bootstrapOptions The bootstrap options.
 */
export function setRegisteredBootstrapOptions(bootstrapOptions: BootstrapOptions | undefined): void {
	registeredBootstrapOptions = bootstrapOptions;
}

/**
 * Get the canonical workspace-shape button list. Both dock implementations use this as the persisted
 * representation of the dock's buttons, so that switching between `dockType` "workspace" and "platform"
 * preserves the button order.
 * @returns The registered buttons.
 */
export function getRegisteredButtons(): DockButton[] {
	return registeredButtons;
}

/**
 * Set the canonical workspace-shape button list.
 * @param buttons The buttons to register.
 */
export function setRegisteredButtons(buttons: DockButton[]): void {
	registeredButtons = buttons;
}

/**
 * Subscribe to the lifecycle events that should cause the dock to be refreshed.
 * The provided refresh function is called when the theme, apps or a used condition changes.
 * @param refresh The refresh function to call (workspace or platform dock specific).
 */
export function subscribeToUpdates(refresh: () => Promise<void>): void {
	themeChangedSubscriptionId = subscribeLifecycleEvent("theme-changed", async () => refresh());
	appsChangedSubscriptionId = subscribeLifecycleEvent("apps-changed", async () => refresh());
	conditionChangedSubscriptionId = subscribeLifecycleEvent<ConditionChangedLifecyclePayload>(
		"condition-changed",
		async (_, payload) => {
			if (usedConditions.size > 0) {
				const conditionId = payload?.conditionId;
				if (isEmpty(conditionId) || usedConditions.has(conditionId)) {
					await refresh();
				}
			}
		}
	);
}

/**
 * Unsubscribe from all of the lifecycle events that the dock listens to.
 */
export function unsubscribeFromUpdates(): void {
	if (themeChangedSubscriptionId) {
		unsubscribeLifecycleEvent(themeChangedSubscriptionId, "theme-changed");
		themeChangedSubscriptionId = undefined;
	}
	if (appsChangedSubscriptionId) {
		unsubscribeLifecycleEvent(appsChangedSubscriptionId, "apps-changed");
		appsChangedSubscriptionId = undefined;
	}
	if (conditionChangedSubscriptionId) {
		unsubscribeLifecycleEvent(conditionChangedSubscriptionId, "condition-changed");
		conditionChangedSubscriptionId = undefined;
	}
}

/**
 * Request the stored dock config from the custom get endpoint.
 * The available buttons are passed so that the endpoint knows all the buttons available and can
 * perform any sorting/reconciliation operation. This is shared between the workspace and platform dock
 * paths.
 * @param id The id of the dock provider to get.
 * @param availableButtons The buttons that are available based on the current configuration.
 * @returns The stored dock config, or undefined if there was no response.
 */
export async function requestStoredDockConfig(
	id: string,
	availableButtons: DockButton[]
): Promise<DockProviderConfigWithIdentity | undefined> {
	logger.info("Requesting dock config from custom storage");
	const dockResponse = await endpointProvider.requestResponse<
		EndpointDockGetRequest,
		EndpointDockGetResponse
	>(DOCK_ENDPOINT_ID_GET, {
		platform: fin.me.identity.uuid,
		id,
		availableButtons
	});
	if (dockResponse) {
		logger.info("Returning dock config from custom storage");
		return dockResponse.config;
	}
	logger.warn("No response getting dock config from custom storage");
}

/**
 * Send a dock config to the custom set endpoint.
 * This is shared between the workspace and platform dock paths so that both dock types persist to the
 * same storage location using the same workspace config shape.
 * @param config The dock config to persist.
 * @returns True if the config was saved.
 */
export async function sendDockConfigToEndpoint(config: DockProviderConfigWithIdentity): Promise<boolean> {
	const versionInfo = await getVersionInfo();
	return endpointProvider.action<EndpointDockSetRequest>(DOCK_ENDPOINT_ID_SET, {
		platform: fin.me.identity.uuid,
		metaData: {
			version: {
				workspacePlatformClient: versionInfo.workspacePlatformClient,
				platformClient: versionInfo.platformClient
			}
		},
		config
	});
}

/**
 * Order a list of entries (dock buttons, favorites or content menu items) by a list of ids.
 * Entries whose id is present in the ordered id list are placed first in that order, any remaining
 * entries (including those without an id or an unrecognized id) are appended, preserving their
 * relative order. Used to map the flat workspace button order onto the platform favorites/content menu.
 * @param entries The entries to order.
 * @param orderedIds The ordered list of ids.
 * @returns The ordered entries.
 */
export function orderByIds<T extends { id?: string }>(entries: T[], orderedIds: string[]): T[] {
	const indexById = new Map<string, number>();
	for (let i = 0; i < orderedIds.length; i++) {
		indexById.set(orderedIds[i], i);
	}

	const known: { entry: T; index: number }[] = [];
	const unknown: T[] = [];

	for (const entry of entries) {
		const index = isStringValue(entry.id) ? indexById.get(entry.id) : undefined;
		if (isEmpty(index)) {
			unknown.push(entry);
		} else {
			known.push({ entry, index });
		}
	}

	known.sort((a, b) => a.index - b.index);

	return [...known.map((k) => k.entry), ...unknown];
}

/**
 * Build the workspace buttons based on config.
 * @param previousOrder The previous order of workspace buttons.
 * @param includePlatformOnlyButtons Whether to include buttons that are only understood by the platform
 * dock (e.g. "contentMenu"). The workspace dock's `workspaceComponents` type only supports
 * `switchWorkspace | home | notifications | store`, so including a platform only button in that list
 * causes the workspace dock UI to throw when it tries to render a component it has no definition for.
 * @returns The list of workspace buttons.
 */
export function buildWorkspaceButtons(
	previousOrder: WorkspaceButton[] = [],
	includePlatformOnlyButtons = false
): Dock3Button[] {
	const workspaceButtonsSet = new Set<Dock3Button>();

	if (!(dockProviderOptions?.workspaceComponents?.hideWorkspacesButton ?? false)) {
		workspaceButtonsSet.add("switchWorkspace");
	}
	if (
		!(dockProviderOptions?.workspaceComponents?.hideHomeButton ?? false) &&
		(registeredBootstrapOptions?.home ?? false)
	) {
		workspaceButtonsSet.add("home");
	}
	if (
		!(dockProviderOptions?.workspaceComponents?.hideNotificationsButton ?? false) &&
		(registeredBootstrapOptions?.notifications ?? false)
	) {
		workspaceButtonsSet.add("notifications");
	}
	if (
		!(dockProviderOptions?.workspaceComponents?.hideStorefrontButton ?? false) &&
		(registeredBootstrapOptions?.store ?? false)
	) {
		workspaceButtonsSet.add("store");
	}
	if (includePlatformOnlyButtons && !(dockProviderOptions?.workspaceComponents?.hideContentButton ?? false)) {
		workspaceButtonsSet.add("contentMenu");
	}

	const workspaceButtons: Dock3Button[] = [];

	for (const button of previousOrder) {
		if (workspaceButtonsSet.has(button)) {
			workspaceButtons.push(button);
			workspaceButtonsSet.delete(button);
		}
	}

	if (workspaceButtonsSet.size > 0) {
		workspaceButtons.push(...workspaceButtonsSet);
	}

	logger.info("Workspace buttons for dock:", workspaceButtons);
	return workspaceButtons;
}

/**
 * Build the buttons to display on the dock from config.
 * @returns The dock buttons to display.
 */
export async function buildButtons(): Promise<DockButton[]> {
	if (dockProviderOptions) {
		const entries = Array.isArray(dockProviderOptions.entries) ? [...dockProviderOptions.entries] : [];
		usedConditions.clear();

		return buildButtonsFromEntries(entries);
	}

	return [];
}

/**
 * Build the buttons to display on the dock from config.
 * @param entries The entries to build the buttons from
 * @returns The dock buttons to display.
 */
async function buildButtonsFromEntries(entries: DockButtonTypes[]): Promise<DockButton[]> {
	const [iconFolder, colorSchemeMode] = await Promise.all([
		getCurrentIconFolder(),
		getCurrentColorSchemeMode()
	]);

	const platform = getCurrentSync();

	const buttonPromises = entries.map(async (entry) => {
		const visible = entry.visible ?? true;
		if (Array.isArray(entry.conditions)) {
			for (const c of entry.conditions) {
				usedConditions.add(c);
			}
		}

		const conditionsMet = visible
			? await checkConditions(platform, entry.conditions, { callerType: "dock", customData: entry })
			: false;

		if (conditionsMet) {
			if ("appId" in entry) {
				return addEntryAsApp(entry, iconFolder, colorSchemeMode);
			} else if ("action" in entry) {
				return addEntryAsAction(entry, iconFolder, colorSchemeMode);
			} else if ("options" in entry) {
				return addEntriesAsDropdown(entry, iconFolder, colorSchemeMode, platform);
			} else if ("tags" in entry) {
				return addEntriesByAppTag(entry, iconFolder, colorSchemeMode);
			}
		}
	});

	const buttons = await Promise.all(buttonPromises);
	const buttonsFlat = buttons.flat();
	return buttonsFlat.filter((button): button is DockButton => !isEmpty(button));
}

/**
 * Add an entry to the dock as an app.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 * @returns The dock entry.
 */
async function addEntryAsApp(
	entry: Omit<DockButtonApp, "id"> & { id?: string },
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): Promise<DockButton | undefined> {
	// If the button has an appId we are going to launch that
	// but the config can override the tooltip or icon
	let tooltip = entry.tooltip;
	let iconUrl = entry.iconUrl;

	if (!isStringValue(tooltip) || !isStringValue(iconUrl)) {
		// No tooltip or icon set, so use the values from the app
		const app = await getApp(entry.appId);
		if (app) {
			if (!isStringValue(tooltip)) {
				tooltip = app.title;
			}
			if (!isStringValue(iconUrl)) {
				iconUrl = getAppIcon(app);
			}
		}
	}

	return {
		id: entry.id,
		type: DockButtonNames.ActionButton,
		tooltip: tooltip ?? "",
		iconUrl: themeUrl(iconUrl, iconFolder, colorSchemeMode),
		action: {
			id: PLATFORM_ACTION_IDS.launchApp,
			customData: {
				source: "dock",
				appId: entry.appId
			}
		}
	};
}

/**
 * Add an entry to the dock as an action.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 * @returns The dock entry.
 */
async function addEntryAsAction(
	entry: Omit<DockButtonAction, "id"> & { id?: string },
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): Promise<DockButton | undefined> {
	if (!isStringValue(entry.tooltip)) {
		logger.error("You must specify the tooltip for a DockButtonAction");
	} else {
		return {
			id: entry.id,
			type: DockButtonNames.ActionButton,
			tooltip: entry.tooltip,
			iconUrl: themeUrl(entry.iconUrl, iconFolder, colorSchemeMode),
			action: entry.action
		};
	}
}

/**
 * Add an entry to the dock as an drop down.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 * @param platform The HERE Core UI Platform for checking conditions.
 * @returns The dock entry
 */
async function addEntriesAsDropdown(
	entry: Omit<DockButtonDropdown, "id"> & { id?: string },
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode,
	platform: WorkspacePlatformModule
): Promise<DockButton | undefined> {
	// Options are present so this is a drop down
	// The items in the drop down can be an appId or a custom action
	if (!isStringValue(entry.tooltip)) {
		logger.error("You must specify the tooltip for a DockButtonDropdown");
	} else {
		const opts = entry.options.map(
			async (option): Promise<DockButton | undefined | (DockButton | undefined)[]> => {
				if (Array.isArray(option.conditions)) {
					for (const c of option.conditions) {
						usedConditions.add(c);
					}
				}

				if (
					await checkConditions(platform, option.conditions, {
						callerType: "dock",
						customData: { ...option, id: "" }
					})
				) {
					// If there are options this is a submenu
					if ("options" in option) {
						const subOptions = await buildButtonsFromEntries(option.options as DockButtonTypes[]);

						return {
							type: DockButtonNames.DropdownButton,
							tooltip: option.tooltip ?? "",
							iconUrl: option.iconUrl,
							options: subOptions
						};
					} else if ("appId" in option) {
						// If the options has an appId we are going to launch that
						// otherwise we use the custom action.

						const app = await getApp(option.appId);
						let iconUrl = option.iconUrl;
						if (!isStringValue(option.iconUrl) && app) {
							iconUrl = getAppIcon(app);
						}

						return {
							type: DockButtonNames.ActionButton,
							tooltip: option.tooltip ?? app?.title ?? "",
							iconUrl,
							action: {
								id: PLATFORM_ACTION_IDS.launchApp,
								customData: {
									source: "dock",
									appId: option.appId
								}
							}
						};
					} else if ("tags" in option) {
						return addEntriesByAppTag(option, iconFolder, colorSchemeMode);
					} else if ("action" in option) {
						return {
							type: DockButtonNames.ActionButton,
							tooltip: option.tooltip ?? "",
							iconUrl: option.iconUrl,
							action: option.action
						};
					}
				}
				return undefined;
			}
		);

		const optionPromises = await Promise.all(opts);
		const optionsFlat = optionPromises.flat();
		const filteredOptions = optionsFlat.filter((o): o is DockButton => !isEmpty(o));

		if (filteredOptions.length === 0) {
			return {
				tooltip: entry.noEntries ?? "There are no entries",
				disabled: true,
				action: {
					id: "noop"
				}
			};
		}

		return addDropdownOrMenu(
			entry.id,
			entry.tooltip ?? "",
			themeUrl(entry.iconUrl, iconFolder, colorSchemeMode),
			filteredOptions
		);
	}
}

/**
 * Add entries to the dock based on their app tags as either multiple buttons or a drop down.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 * @returns The dock entry
 */
async function addEntriesByAppTag(
	entry: Omit<DockButtonAppsByTag, "id"> & { id?: string },
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): Promise<(DockButton | undefined)[] | undefined> {
	if (!Array.isArray(entry.tags)) {
		logger.error("You must specify an array for the tags parameter for an DockButtonAppsByTag");
	} else {
		// If there are tags then this could be a group of apps we then display separate
		// buttons or a drop down based on the display property
		const dockApps = await getAppsByTag(entry.tags, false, { private: false });

		if (entry.display === "individual") {
			const entries: DockButton[] = [];
			// Individual so show a button for each app
			for (const dockApp of dockApps) {
				const icon = entry.iconUrl ?? getAppIcon(dockApp);
				entries.push({
					id: `${entry.id}-${dockApp.appId}`,
					tooltip: entry.tooltip ?? dockApp.title,
					iconUrl: themeUrl(icon, iconFolder, colorSchemeMode),
					action: {
						id: PLATFORM_ACTION_IDS.launchApp,
						customData: {
							source: "dock",
							appId: dockApp.appId
						}
					}
				});
			}

			return entries;
		} else if (entry.display === "group") {
			// Group display so show a drop down with all the entries in it
			if (!isStringValue(entry.tooltip)) {
				logger.error("You must specify the tooltip for a grouped DockButtonAppsByTag");
			} else {
				let iconUrl = entry.iconUrl;
				const opts: CustomButtonConfig[] = [];

				for (const dockApp of dockApps) {
					const optionIconUrl = getAppIcon(dockApp);
					// If the config doesn't specify an icon, just use the icon from the first entry
					if (!isStringValue(iconUrl)) {
						iconUrl = optionIconUrl;
					}

					opts.push({
						tooltip: dockApp.title,
						action: {
							id: PLATFORM_ACTION_IDS.launchApp,
							customData: {
								source: "dock",
								appId: dockApp.appId
							}
						},
						iconUrl
					});
				}

				if (opts.length === 0) {
					opts.push({
						tooltip: entry.noEntries ?? "There are no entries",
						disabled: true,
						action: {
							id: "noop"
						}
					});
				}

				return [
					await addDropdownOrMenu(
						entry.id,
						entry.tooltip ?? "",
						themeUrl(iconUrl, iconFolder, colorSchemeMode),
						opts
					)
				];
			}
		}
	}
}

/**
 * Get an app icon from a platform app definition.
 * @param app The app to get the icon from.
 * @returns The app icon.
 */
function getAppIcon(app: PlatformApp): string | undefined {
	if (Array.isArray(app.icons) && app.icons.length > 0) {
		return app.icons[0].src;
	}
}

/**
 * Add a dropdown or custom menu depending on options.
 * @param id The id of the entry.
 * @param tooltip The tooltip of the entry.
 * @param iconUrl The icon for the entry.
 * @param options The sub options.
 * @returns The dock entry.
 */
async function addDropdownOrMenu(
	id: string | undefined,
	tooltip: string,
	iconUrl: string | undefined,
	options: (CustomButtonConfig | CustomDropdownConfig)[]
): Promise<DockButton> {
	const popupMenuStyle = dockProviderOptions?.popupMenuStyle ?? Menu.getPopupMenuStyle();

	if (popupMenuStyle === "platform") {
		// Built-in native dock menus require the entry icons as base64, so convert them
		await Promise.all(
			options.map(async (opt) => {
				opt.iconUrl = await imageUrlToDataUrl(opt.iconUrl, 20);
			})
		);
		return {
			id,
			type: DockButtonNames.DropdownButton,
			tooltip,
			iconUrl,
			options
		};
	}
	return {
		id,
		type: DockButtonNames.ActionButton,
		tooltip,
		iconUrl,
		action: {
			id: "popup-menu",
			customData: {
				source: "dock",
				noEntryText: "No Entries",
				menuEntries: options.map((o) => ({
					label: o.tooltip,
					enabled: !(o.disabled ?? false),
					icon: o.iconUrl,
					data: o.action
				})),
				options: {
					popupMenuStyle
				}
			}
		}
	};
}
