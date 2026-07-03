import type { OpenFin } from "@openfin/core";
import {
	Dock,
	DockButtonNames,
	type CustomButtonConfig,
	type CustomDropdownConfig,
	type DockButton,
	type DockProvider,
	type DockProviderRegistration,
	type WorkspaceButton
} from "@openfin/workspace";
import {
	getCurrentSync,
	type WorkspacePlatformModule,
	Dock as Dock3,
	type LaunchDockEntryPayload,
	type BookmarkDockEntryPayload,
	type CustomActionPayload,
	CustomActionCallerType,
	type Dock3Button,
	type Dock3Config,
	type Dock3Provider
} from "@openfin/workspace-platform";
import type {
	DockProviderConfigWithIdentity,
	DockButton as PlatformDockButton
} from "@openfin/workspace-platform/client-api/src";
import type { MoreMenuCustomOptionPayload } from "@openfin/workspace-platform/dock3/src/api/protocol";
import type { ContentMenuEntry, DockEntry } from "@openfin/workspace/client-api-platform/src";
import { checkConditions } from "workspace-platform-starter/conditions";
import type { ConditionChangedLifecyclePayload } from "workspace-platform-starter/shapes/lifecycle-shapes";
import type {
	EndpointDockGetRequest,
	EndpointDockGetResponse,
	EndpointDockSetRequest
} from "workspace-platform-starter/shapes/platform-shapes";
import { imageUrlToDataUrl } from "workspace-platform-starter/utils-img";
import { callAction, PLATFORM_ACTION_IDS } from "../actions";
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
import { isEmpty, isStringValue, objectClone, randomUUID } from "../utils";
import { getVersionInfo } from "../version";

const logger = createLogger("Dock");

const DOCK_ENDPOINT_ID_GET = "dock-get";
const DOCK_ENDPOINT_ID_SET = "dock-set";

let registration: DockProvider | undefined;
let registrationInfo: DockProviderRegistration | undefined;
let initializedDock3Provider: Dock3Provider | undefined;
let dock3RegistrationMetaInfo: DockProviderRegistration | undefined;
let dockProviderOptions: DockProviderOptions | undefined;
const usedConditions: Set<string> = new Set<string>();
let registeredBootstrapOptions: BootstrapOptions | undefined;
let themeChangedSubscriptionId: string | undefined;
let appsChangedSubscriptionId: string | undefined;
let conditionChangedSubscriptionId: string | undefined;
let registeredButtons: DockButton[];

/**
 * Register the dock component.
 * @param options The dock provider options.
 * @param bootstrapOptions The bootstrap options.
 * @returns The meta info from the registration.
 */
export async function register(
	options: DockProviderOptions | undefined,
	bootstrapOptions?: BootstrapOptions
): Promise<DockProviderRegistration | undefined> {
	if (isEmpty(registrationInfo) && isEmpty(initializedDock3Provider) && options) {
		dockProviderOptions = options;
		registeredBootstrapOptions = bootstrapOptions;

		if (dockProviderOptions.dockType && dockProviderOptions.dockType === "3") {
			logger.info("The v3 dock has been selected.");
			// get the current button definitions taking into account visibility
			const allDockV1Buttons = await buildButtons();
			// Keep a reference to the built v1 buttons so that they can be used when mapping
			// between the v1 and v3 storage shapes (see loadConfig/saveConfig below).
			registeredButtons = allDockV1Buttons;
			const mapToV3Buttons = await buildDock3ButtonEntries(allDockV1Buttons);
			const dock3Provider = await Dock3.init({
				config: {
					title: dockProviderOptions.title,
					icon: dockProviderOptions.icon,
					defaultDockButtons: buildWorkspaceButtons(),
					uiConfig: dockProviderOptions.dock3UIConfig,
					favorites: objectClone(mapToV3Buttons.favorites),
					contentMenu: objectClone(mapToV3Buttons.contentMenu)
				},
				windowOptions: dockProviderOptions.dock3WindowOptions,
				override: (Base) =>
					/**
					 * Custom provider overrides for Dock3
					 * Dock3 is a stateless component, so custom overrides are needed to maintain state.
					 */
					class CustomProvider extends Base {
						/**
						 * Override for dock3 launch app function.
						 * This function should be customized to best match the needs of the application.
						 * @param payload content being launched
						 */
						public async launchEntry(payload: LaunchDockEntryPayload): Promise<void> {
							logger.info("Launching Dock Entry:", payload);
							if (payload.entry.type === "item") {
								if (payload.entry.itemData.action) {
									try {
										const positionInfo = await getActionPositionInfo(dock3Provider);
										const { windowIdentity, coordinates } = positionInfo;
										const customActionPayload: CustomActionPayload = {
											callerType: CustomActionCallerType.CustomButton,
											windowIdentity,
											customData: payload.entry.itemData.action.customData,
											x: coordinates.x,
											y: coordinates.y
										};
										await callAction(payload.entry.itemData.action.id, customActionPayload);
									} catch (error) {
										logger.error("Error launching action from dock entry:", payload, error);
									}
								} else {
									logger.error("No action found for dock entry:", payload);
								}
							}
						}

						/**
						 * Override for dock3 more menu custom option clicked.
						 * This function should be customized to best match the needs of the application.
						 * @param payload payload for more menu custom option clicked
						 * @returns void
						 */
						public async moreMenuCustomOptionClicked(payload: MoreMenuCustomOptionPayload): Promise<void> {
							logger.info("Dock3Panel::moreMenuCustomOptionClicked", payload);
							const { windowIdentity, coordinates } = await getActionPositionInfo(dock3Provider);
							const customActionPayload: CustomActionPayload = {
								callerType: CustomActionCallerType.CustomButton,
								windowIdentity,
								customData: payload.customData,
								x: coordinates.x,
								y: coordinates.y
							};
							await callAction(payload.action, customActionPayload);
						}

						/**
						 * Override for dock3 bookmark content function.
						 * Bookmarking is not supported in this version of Workspace Platform Starter and is
						 * intentionally ignored. The `dock3UIConfig.contentMenu.enableBookmarking` setting can be
						 * enabled but will have no effect until a future release adds first class support.
						 * @param payload content being bookmarked
						 */
						public async bookmarkContentMenuEntry(payload: BookmarkDockEntryPayload): Promise<void> {
							logger.info("Bookmarking Not currently supported in WPS. This will be ignored.", payload.entry);
						}

						/**
						 * Override for dock3 load config.
						 * Dock3 stores its config independently of dock1 by default (browser storage). To keep the
						 * dock configuration consistent (and to allow a config to be carried over when a platform
						 * switches between dockType "1" and "3") we reuse the same custom storage endpoints as dock1
						 * when they are configured, mapping the stored v1 button order onto the v3 favorites and
						 * content menu. When no endpoint is configured we fall back to the default dock3 storage.
						 * @returns The loaded dock3 config.
						 */
						public async loadConfig(): Promise<Dock3Config> {
							if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_GET)) {
								logger.info("Requesting dock3 config from custom storage");
								const availableButtons = objectClone(registeredButtons ?? []);
								const stored = await requestStoredDockConfig(
									dockProviderOptions?.id ?? fin.me.identity.uuid,
									availableButtons
								);

								// The order the buttons are in the stored config is the order we want to
								// display them, so map that order onto the current v3 favorites/content menu.
								if (!isEmpty(stored) && Array.isArray(stored.buttons)) {
									const orderedIds = stored.buttons
										.map((button) => button.id)
										.filter((id): id is string => isStringValue(id));
									const mappedConfig: Dock3Config = {
										...this.config,
										favorites: orderByIds(this.config.favorites ?? [], orderedIds),
										contentMenu: orderByIds(this.config.contentMenu ?? [], orderedIds)
									};
									this.config = mappedConfig;
									return mappedConfig;
								}
								return this.config;
							}

							logger.info("Requesting dock3 config from default storage");
							return super.loadConfig();
						}

						/**
						 * Override for dock3 save config.
						 * When a custom storage endpoint is configured we convert the v3 favorites/content menu order
						 * back into the flat v1 button shape and persist it via the same endpoint dock1 uses, so the
						 * two dock types share a single stored representation. When no endpoint is configured we fall
						 * back to the default dock3 storage.
						 * @param options The save config options.
						 * @param options.config The new dock3 config to persist.
						 */
						public async saveConfig({ config }: { config: Dock3Config }): Promise<void> {
							if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_SET)) {
								logger.info("Storing dock3 config in custom storage");
								const v1Config = buildV1ConfigFromDock3(config);
								const success = await sendDockConfigToEndpoint(v1Config);
								if (success) {
									logger.info(`Saved dock3 config with id: ${v1Config.id} to custom storage`);
								} else {
									logger.info(`Unable to save dock3 config with id: ${v1Config.id} to custom storage`);
								}
							} else {
								logger.info("Storing dock3 config in default storage");
								await super.saveConfig({ config });
							}
						}
					}
			});
			initializedDock3Provider = dock3Provider;

			// Dock3 is part of @openfin/workspace-platform (bundled, not loaded from the CDN) so it does
			// not return version metadata the way Dock.register does. We synthesize a registration result
			// so the bootstrapper treats dock3 as a registered component (registering connection actions
			// etc.). Platform client versions continue to be tracked separately by the version provider.
			dock3RegistrationMetaInfo = {
				clientAPIVersion: "",
				workspaceVersion: "",
				updateDockProviderConfig: async (): Promise<void> => {
					await refreshDock3();
				}
			};

			// Keep the dock3 favorites/content menu in sync with theme, apps and condition changes,
			// mirroring the behavior of the dock1 registration below.
			subscribeToUpdates(refreshDock3);
		} else {
			const buttons = await buildButtons();
			logger.info("Dock register about to be called.");

			registration = await buildDockProvider(buttons);

			if (registration) {
				registrationInfo = await Dock.register(registration);

				logger.info("Version:", registrationInfo);
				logger.info("Dock provider initialized");

				subscribeToUpdates(refreshDock);
			}
		}
	}

	return registrationInfo ?? dock3RegistrationMetaInfo;
}

/**
 * Subscribe to the lifecycle events that should cause the dock to be refreshed.
 * The provided refresh function is called when the theme, apps or a used condition changes.
 * @param refresh The refresh function to call (dock1 or dock3 specific).
 */
function subscribeToUpdates(refresh: () => Promise<void>): void {
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
function unsubscribeFromUpdates(): void {
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
 * Deregister the dock component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (isEmpty(registrationInfo) && isEmpty(initializedDock3Provider)) {
		logger.warn("Unable to deregister dock as there is an indication it was never registered");
		return;
	}

	unsubscribeFromUpdates();

	if (!isEmpty(initializedDock3Provider)) {
		const provider = initializedDock3Provider;
		initializedDock3Provider = undefined;
		dock3RegistrationMetaInfo = undefined;
		dockProviderOptions = undefined;
		logger.info("Dock3 shutdown about to be called.");
		await provider.shutdown();
		return;
	}

	registrationInfo = undefined;
	dockProviderOptions = undefined;
	logger.info("Dock deregister about to be called.");
	return Dock.deregister();
}

/**
 * When a dock action is triggered, we need to know the window identity and the coordinates of the mouse in relation to the dock window.
 * @param dockProvider The dock provider.
 * @returns The window identity and the coordinates of the mouse in relation to the dock window.
 */
async function getActionPositionInfo(
	dockProvider: Dock3Provider
): Promise<{ windowIdentity: OpenFin.Identity; coordinates: { x: number; y: number } }> {
	const dockWindow = dockProvider.getWindowSync();
	const [mousePosition, dockBounds] = await Promise.all([
		fin.System.getMousePosition(),
		dockWindow.getBounds()
	]);
	return {
		windowIdentity: dockWindow.identity,
		coordinates: { x: mousePosition.left - dockBounds.left, y: mousePosition.top - dockBounds.top }
	};
}

/**
 * Build the dock registration.
 * @param buttons The buttons to display on the dock.
 * @returns The dock provider options.
 */
async function buildDockProvider(buttons: DockButton[]): Promise<DockProvider | undefined> {
	if (dockProviderOptions) {
		registeredButtons = buttons;

		return {
			id: dockProviderOptions.id,
			title: dockProviderOptions.title,
			icon: dockProviderOptions.icon,
			workspaceComponents: buildWorkspaceButtons(
				Array.isArray(registration?.workspaceComponents) ? registration?.workspaceComponents : undefined
			) as WorkspaceButton[],
			disableUserRearrangement: dockProviderOptions?.disableUserRearrangement ?? false,
			buttons: objectClone(registeredButtons)
		};
	}
}

/**
 * Build the workspace buttons based on config.
 * @param previousOrder The previous order of workspace buttons.
 * @returns The list of workspace buttons.
 */
function buildWorkspaceButtons(previousOrder: WorkspaceButton[] = []): Dock3Button[] {
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
	if (!(dockProviderOptions?.workspaceComponents?.hideContentButton ?? false)) {
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
async function buildButtons(): Promise<DockButton[]> {
	if (dockProviderOptions) {
		const entries = Array.isArray(dockProviderOptions.entries) ? [...dockProviderOptions.entries] : [];
		usedConditions.clear();

		return buildButtonsFromEntries(entries);
	}

	return [];
}

/**
 * Build a themed icon definition for the given icon url, swapping in the light/dark variant path as required.
 * @param schemeMode The current color scheme mode (light or dark).
 * @param iconUrl The icon url to build the themed icon definition from.
 * @returns The icon url, or an object containing the dark and light variants if the url is theme specific.
 */
function buildSchemeIcon(schemeMode: string, iconUrl: string): string | { dark: string; light: string } {
	if (iconUrl?.includes(`/${schemeMode}/`)) {
		let darkIcon: string = iconUrl;
		let lightIcon: string = iconUrl;

		if (schemeMode === "dark") {
			lightIcon = iconUrl.replace(`/${schemeMode}/`, "/light/");
		} else if (schemeMode === "light") {
			darkIcon = iconUrl.replace(`/${schemeMode}/`, "/dark/");
		}
		return {
			dark: darkIcon,
			light: lightIcon
		};
	}
	return iconUrl;
}

/**
 * Maps options into ContentMenuEntry items, creating folders for nested options.
 * @param options - The options to map
 * @returns Array of ContentMenuEntry items
 */
function mapOptionsToContentMenu(options: Dock.DockButton["options"]): ContentMenuEntry[] {
	if (isEmpty(options)) {
		return [];
	}
	return options.map((option) => {
		// Check if this option has nested children
		if (option.options && Array.isArray(option.options) && option.options.length > 0) {
			// Create a folder entry with children
			return {
				type: "folder",
				id: (option as unknown as { id: string })?.id ?? randomUUID(), // Generate a unique ID
				label: option.tooltip,
				children: mapOptionsToContentMenu(option.options) // Recursively map children
			} as ContentMenuEntry;
		}

		// Create a simple content menu entry
		return {
			type: "item",
			id: (option as unknown as { id: string })?.id ?? randomUUID(),
			label: option.tooltip,
			icon: option.iconUrl,
			itemData: {
				action: option.action
			}
		} as ContentMenuEntry;
	});
}

/**
 * Build the Dock3 button entries from Dock v1 buttons.
 * @param dockv1Buttons The Dock v1 buttons.
 * @returns The Dock3 button entries.
 */
async function buildDock3ButtonEntries(
	dockv1Buttons: DockButton[]
): Promise<{ favorites?: DockEntry[]; contentMenu?: ContentMenuEntry[] }> {
	const favorites: DockEntry[] = [];
	const contentMenu: ContentMenuEntry[] = [];
	const schemeMode = await getCurrentColorSchemeMode();

	for (const button of dockv1Buttons) {
		const buttonType = button.type;
		if (buttonType === DockButtonNames.ActionButton) {
			const favButton: DockEntry = {
				id: button.id ?? button.action.id,
				type: "item",
				label: button.tooltip,
				itemData: { action: button.action },
				icon: buildSchemeIcon(schemeMode, button.iconUrl ?? "")
			};
			favorites.push(favButton);
		} else if (buttonType === DockButtonNames.DropdownButton || isEmpty(buttonType)) {
			if (button.options && button.options.length > 0) {
				const folderItem: ContentMenuEntry = {
					type: "folder",
					id: button.id ?? randomUUID(), // Generate a unique ID
					label: button.tooltip,
					children: mapOptionsToContentMenu(button.options) // Recursively map children
				} as ContentMenuEntry;
				contentMenu.push(folderItem);
			} else {
				const rootItem: ContentMenuEntry = {
					type: "item",
					id: button.id ?? randomUUID(),
					label: button.tooltip,
					icon: buildSchemeIcon(schemeMode, button.iconUrl ?? ""),
					itemData: { action: button?.action },
					bookmarked: false
				};
				contentMenu.push(rootItem);
			}
		}
	}
	logger.info("Dock3 Buttons - Favorites:", favorites);
	logger.info("Dock3 Buttons - Content Menu:", contentMenu);
	return {
		favorites,
		contentMenu
	};
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
 * Show the dock component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Dock show called.");
	if (!isEmpty(initializedDock3Provider)) {
		// Dock3 has no explicit show, it is auto shown when initialized. Use the underlying
		// window so the show-dock connection action and the autoShow bootstrap option keep working.
		const dockWindow = initializedDock3Provider.getWindowSync();
		await dockWindow.show();
		await dockWindow.focus();
		return;
	}
	return Dock.show();
}

/**
 * Minimize the dock component.
 * @returns Nothing.
 */
export async function minimize(): Promise<void> {
	logger.info("Dock minimize called.");
	if (!isEmpty(initializedDock3Provider)) {
		return initializedDock3Provider.getWindowSync().minimize();
	}
	return Dock.minimize();
}

/**
 * Implementation for getting the dock provider from persistent storage.
 * @param id The id of the dock provider to get.
 * @param defaultStorage The default method for storage.
 * @returns The loaded config.
 */
export async function loadConfig(
	id: string,
	defaultStorage: (id: string) => Promise<DockProviderConfigWithIdentity | undefined>
): Promise<DockProviderConfigWithIdentity | undefined> {
	logger.info(`Checking for custom dock storage with endpoint id: ${DOCK_ENDPOINT_ID_GET}`);
	let config: DockProviderConfigWithIdentity | undefined;

	// All the available buttons based on the configuration settings
	const availableButtons = objectClone(registeredButtons ?? []);

	if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_GET)) {
		// No ordering is done for an endpoint, it is the responsibility of the endpoint
		// the availableButtons are passed in the request for config so that the endpoint
		// knows all the buttons available and can perform a sorting operation like
		// we do for the default storage case
		config = await requestStoredDockConfig(id, availableButtons);
	} else {
		logger.info("Requesting dock config from default storage");
		config = await defaultStorage(id);

		// We are using default storage so we can order the default buttons based on the stored config
		if (!isEmpty(config) && !isEmpty(config.buttons)) {
			const orderedButtons = [];

			// The order the buttons are in the config is the order we want to display them
			// So find them in the available buttons and add them, removing them from the
			// available list
			for (const button of config.buttons) {
				if (isStringValue(button.id)) {
					const foundIndex = availableButtons.findIndex((b) => b.id === button.id);
					if (foundIndex >= 0) {
						orderedButtons.push(availableButtons[foundIndex]);
						availableButtons.splice(foundIndex, 1);
					}
				}
			}

			// All remaining available buttons we haven't used get added to the end of the list
			orderedButtons.push(...availableButtons);

			// We need to cast this because there is a conflict between DockButtonNames enum
			// between workspace and workspace-platform even though they are essentially the same type
			config.buttons = orderedButtons as PlatformDockButton[];
		}
	}

	if (!isEmpty(config)) {
		// Always build the workspace buttons based on the config,
		// otherwise loaded config can show buttons that it is
		// not supposed to
		config.workspaceComponents = buildWorkspaceButtons(
			Array.isArray(config.workspaceComponents) ? config.workspaceComponents : undefined
		) as WorkspaceButton[];
	}

	return config;
}

/**
 * Implementation for saving a dock provider config to persistent storage.
 * @param config The new dock config to save to persistent storage.
 * @param defaultStorage The default method for storage.
 */
export async function saveConfig(
	config: DockProviderConfigWithIdentity,
	defaultStorage: (config: DockProviderConfigWithIdentity) => Promise<void>
): Promise<void> {
	// we need to store the new stored config in the dockProviderOptions
	if (dockProviderOptions?.entries) {
		const orderedButtons: DockButtonTypes[] = [];

		// store the buttons in a map for fast, easy lookup
		const currentButtons = new Map<string, DockButtonTypes>();
		for (const entry of dockProviderOptions.entries) {
			currentButtons.set(entry.id, entry);
		}

		// new extract the new buttons from the config
		for (const button of config.buttons ?? []) {
			if (isStringValue(button.id)) {
				const foundButton = currentButtons.get(button.id);
				if (foundButton) {
					orderedButtons.push(foundButton);
					currentButtons.delete(button.id);
				}
			}
		}

		// add any remaining buttons that we failed to find in the config
		const remainingButtons = currentButtons.values();
		if (currentButtons.size > 0) {
			logger.warn(
				`Failed to find ${currentButtons.size} buttons in the new config, they will be appended to the end of the dock`
			);
		}
		orderedButtons.push(...remainingButtons);

		dockProviderOptions.entries = orderedButtons;
	}

	if (registration?.workspaceComponents) {
		registration.workspaceComponents = config.workspaceComponents;
	}

	logger.info(`Checking for custom dock storage with endpoint id: ${DOCK_ENDPOINT_ID_SET}`);

	if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_SET)) {
		logger.info("Storing dock config in custom storage");
		const success = await sendDockConfigToEndpoint(config);
		if (success) {
			logger.info(`Saved dock config with id: ${config.id} to custom storage`);
		} else {
			logger.info(`Unable to save dock config with id: ${config.id} to custom storage`);
		}
	} else {
		logger.info("Storing dock config in default storage");
		await defaultStorage(config);
	}
}

/**
 * Request the stored dock config from the custom get endpoint.
 * The available buttons are passed so that the endpoint knows all the buttons available and can
 * perform any sorting/reconciliation operation. This is shared between the dock1 and dock3 paths.
 * @param id The id of the dock provider to get.
 * @param availableButtons The buttons that are available based on the current configuration.
 * @returns The stored dock config, or undefined if there was no response.
 */
async function requestStoredDockConfig(
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
 * This is shared between the dock1 and dock3 paths so that both dock types persist to the same
 * storage location using the same v1 config shape.
 * @param config The dock config to persist.
 * @returns True if the config was saved.
 */
async function sendDockConfigToEndpoint(config: DockProviderConfigWithIdentity): Promise<boolean> {
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
 * relative order. Used to map the flat v1 button order onto the v3 favorites/content menu.
 * @param entries The entries to order.
 * @param orderedIds The ordered list of ids.
 * @returns The ordered entries.
 */
function orderByIds<T extends { id?: string }>(entries: T[], orderedIds: string[]): T[] {
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
 * Convert a dock3 config into the flat v1 dock config shape so that it can be persisted using the
 * same storage endpoint as dock1. The favorites and content menu order is flattened into an ordered
 * list of button ids which is then applied to the built v1 buttons.
 * @param config The dock3 config to convert.
 * @returns The v1 dock config with identity.
 */
function buildV1ConfigFromDock3(config: Dock3Config): DockProviderConfigWithIdentity {
	const orderedIds: string[] = [
		...(config.favorites ?? []).map((entry) => entry.id),
		...(config.contentMenu ?? []).map((entry) => entry.id)
	].filter((id): id is string => isStringValue(id));

	const orderedButtons = orderByIds(objectClone(registeredButtons ?? []), orderedIds);

	return {
		id: dockProviderOptions?.id ?? fin.me.identity.uuid,
		title: dockProviderOptions?.title ?? "",
		icon: dockProviderOptions?.icon ?? "",
		buttons: orderedButtons as PlatformDockButton[]
	};
}

/**
 * Refresh the dock because the color scheme or apps have changed.
 */
async function refreshDock(): Promise<void> {
	if (!isEmpty(registrationInfo)) {
		const newButtons = await buildButtons();

		if (JSON.stringify(newButtons) !== JSON.stringify(registeredButtons)) {
			const dockProvider = await buildDockProvider(newButtons);
			if (dockProvider) {
				await registrationInfo.updateDockProviderConfig(dockProvider);
			}
		}
	}
}

/**
 * Refresh the dock3 favorites/content menu because the color scheme, apps or conditions have changed.
 * The existing order of the favorites/content menu is preserved (so that any user rearrangement is
 * not lost) while the entries themselves (icons, added/removed entries) are rebuilt from config.
 */
async function refreshDock3(): Promise<void> {
	if (!isEmpty(initializedDock3Provider)) {
		const newButtons = await buildButtons();

		if (JSON.stringify(newButtons) !== JSON.stringify(registeredButtons)) {
			registeredButtons = newButtons;
			const mapped = await buildDock3ButtonEntries(newButtons);
			const currentConfig = initializedDock3Provider.config;

			// Preserve the current display order (which may reflect user rearrangement) while
			// swapping in the freshly built entries.
			const currentFavoriteIds = (currentConfig.favorites ?? [])
				.map((entry) => entry.id)
				.filter((id): id is string => isStringValue(id));
			const currentContentMenuIds = (currentConfig.contentMenu ?? [])
				.map((entry) => entry.id)
				.filter((id): id is string => isStringValue(id));

			const newFavorites = orderByIds(mapped.favorites ?? [], currentFavoriteIds);
			const newContentMenu = orderByIds(mapped.contentMenu ?? [], currentContentMenuIds);

			if (
				JSON.stringify(newFavorites) !== JSON.stringify(currentConfig.favorites) ||
				JSON.stringify(newContentMenu) !== JSON.stringify(currentConfig.contentMenu)
			) {
				await initializedDock3Provider.updateConfig({
					...currentConfig,
					favorites: newFavorites,
					contentMenu: newContentMenu
				});
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
