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
import { getCurrentSync, type WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	DockProviderConfigWithIdentity,
	DockButton as PlatformDockButton
} from "@openfin/workspace-platform/client-api/src";
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
import { isEmpty, isStringValue, objectClone } from "../utils";
import { getVersionInfo } from "../version";

const logger = createLogger("Dock");

const DOCK_ENDPOINT_ID_GET = "dock-get";
const DOCK_ENDPOINT_ID_SET = "dock-set";

let registration: DockProvider | undefined;
let registrationInfo: DockProviderRegistration | undefined;
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
	if (!registrationInfo && options) {
		dockProviderOptions = options;
		registeredBootstrapOptions = bootstrapOptions;

		const buttons = await buildButtons();
		logger.info("Dock register about to be called.");

		registration = await buildDockProvider(buttons);

		if (registration) {
			registrationInfo = await Dock.register(registration);

			logger.info("Version:", registrationInfo);
			logger.info("Dock provider initialized");

			themeChangedSubscriptionId = subscribeLifecycleEvent("theme-changed", async () => refreshDock());
			appsChangedSubscriptionId = subscribeLifecycleEvent("apps-changed", async () => refreshDock());
			conditionChangedSubscriptionId = subscribeLifecycleEvent<ConditionChangedLifecyclePayload>(
				"condition-changed",
				async (_, payload) => {
					if (usedConditions.size > 0) {
						const conditionId = payload?.conditionId;
						if (isEmpty(conditionId) || usedConditions.has(conditionId)) {
							await refreshDock();
						}
					}
				}
			);
		}
	}

	return registrationInfo;
}

/**
 * Deregister the dock component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (registrationInfo) {
		if (themeChangedSubscriptionId) {
			unsubscribeLifecycleEvent(themeChangedSubscriptionId, "theme-changed");
		}
		themeChangedSubscriptionId = undefined;
		if (appsChangedSubscriptionId) {
			unsubscribeLifecycleEvent(appsChangedSubscriptionId, "apps-changed");
		}
		conditionChangedSubscriptionId = undefined;
		if (conditionChangedSubscriptionId) {
			unsubscribeLifecycleEvent(conditionChangedSubscriptionId, "condition-changed");
		}
		appsChangedSubscriptionId = undefined;
		registrationInfo = undefined;
		dockProviderOptions = undefined;
		logger.info("Dock deregister about to be called.");
		return Dock.deregister();
	}
	logger.warn("Unable to deregister dock as there is an indication it was never registered");
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
			),
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
function buildWorkspaceButtons(previousOrder: WorkspaceButton[] = []): WorkspaceButton[] {
	const workspaceButtonsSet = new Set<WorkspaceButton>();

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

	const workspaceButtons: WorkspaceButton[] = [];

	for (const button of previousOrder) {
		if (workspaceButtonsSet.has(button)) {
			workspaceButtons.push(button);
			workspaceButtonsSet.delete(button);
		}
	}

	if (workspaceButtonsSet.size > 0) {
		workspaceButtons.push(...workspaceButtonsSet);
	}

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
 * @param platform The workspace platform for checking conditions.
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
	return Dock.show();
}

/**
 * Minimize the dock component.
 * @returns Nothing.
 */
export async function minimize(): Promise<void> {
	logger.info("Dock minimize called.");
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
			config = dockResponse.config;
		} else {
			logger.warn("No response getting dock config from custom storage");
		}
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
		);
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
		const versionInfo = await getVersionInfo();
		const success = await endpointProvider.action<EndpointDockSetRequest>(DOCK_ENDPOINT_ID_SET, {
			platform: fin.me.identity.uuid,
			metaData: {
				version: {
					workspacePlatformClient: versionInfo.workspacePlatformClient,
					platformClient: versionInfo.platformClient
				}
			},
			config
		});
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
