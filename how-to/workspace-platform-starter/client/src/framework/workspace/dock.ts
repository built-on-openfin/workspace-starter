import {
	Dock,
	DockButtonNames,
	type CustomActionSpecifier,
	type CustomButtonConfig,
	type DockButton,
	type DockProvider,
	type DockProviderRegistration
} from "@openfin/workspace";
import { getCurrentSync, type WorkspacePlatformModule } from "@openfin/workspace-platform";
import { checkConditions } from "workspace-platform-starter/conditions";
import { PLATFORM_ACTION_IDS } from "../actions";
import { getApp, getAppsByTag } from "../apps";
import { subscribeLifecycleEvent, unsubscribeLifecycleEvent } from "../lifecycle";
import { createLogger } from "../logger-provider";
import type { PlatformApp } from "../shapes/app-shapes";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type {
	DockButtonAction,
	DockButtonApp,
	DockButtonAppsByTag,
	DockButtonDropdown,
	DockProviderOptions
} from "../shapes/dock-shapes";
import type { ColorSchemeMode } from "../shapes/theme-shapes";
import { getCurrentColorSchemeMode, getCurrentIconFolder } from "../themes";
import { isEmpty, isStringValue } from "../utils";

const logger = createLogger("Dock");

let registrationInfo: DockProviderRegistration | undefined;
let dockProviderOptions: DockProviderOptions | undefined;
let registeredBootstrapOptions: BootstrapOptions | undefined;
let themeChangedSubscriptionId: string | undefined;
let appsChangedSubscriptionId: string | undefined;
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

		const registration = await buildDockProvider(buttons);

		if (registration) {
			registrationInfo = await Dock.register(registration);

			logger.info("Version:", registrationInfo);
			logger.info("Dock provider initialized");

			themeChangedSubscriptionId = subscribeLifecycleEvent("theme-changed", async () => refreshDock());
			appsChangedSubscriptionId = subscribeLifecycleEvent("apps-changed", async () => refreshDock());
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
			workspaceComponents: {
				hideWorkspacesButton: dockProviderOptions.workspaceComponents?.hideWorkspacesButton,
				hideHomeButton:
					!registeredBootstrapOptions?.home || dockProviderOptions.workspaceComponents?.hideHomeButton,
				hideStorefrontButton:
					!registeredBootstrapOptions?.store || dockProviderOptions.workspaceComponents?.hideStorefrontButton,
				hideNotificationsButton:
					!registeredBootstrapOptions?.notifications ||
					dockProviderOptions.workspaceComponents?.hideNotificationsButton
			},
			buttons,
			skipSavedDockProviderConfig: true,
			disableUserRearrangement: true
		};
	}
}

/**
 * Build the buttons to display on the dock from config.
 * @returns The dock buttons to display.
 */
async function buildButtons(): Promise<DockButton[]> {
	const buttons: DockButton[] = [];

	if (dockProviderOptions) {
		const iconFolder = await getCurrentIconFolder();
		const colorSchemeMode = await getCurrentColorSchemeMode();
		const platform = getCurrentSync();

		const entries = Array.isArray(dockProviderOptions.entries) ? [...dockProviderOptions.entries] : [];
		if (Array.isArray(dockProviderOptions.apps)) {
			entries.push(...dockProviderOptions.apps);
		}
		if (Array.isArray(dockProviderOptions.buttons)) {
			entries.push(...dockProviderOptions.buttons);
		}

		for (const entry of entries) {
			if (await checkConditions(platform, entry.conditions, { callerType: "dock", customData: entry })) {
				if ("appId" in entry) {
					await addEntryAsApp(buttons, entry, iconFolder, colorSchemeMode);
				} else if ("action" in entry) {
					await addEntryAsAction(buttons, entry, iconFolder, colorSchemeMode);
				} else if ("options" in entry) {
					await addEntriesAsDropdown(buttons, entry, iconFolder, colorSchemeMode, platform);
				} else if ("tags" in entry) {
					await addEntriesByAppTag(buttons, entry, iconFolder, colorSchemeMode);
				}
			}
		}
	}

	return buttons;
}

/**
 * Add an entry to the dock as an app.
 * @param buttons The list of buttons to add to.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 */
async function addEntryAsApp(
	buttons: DockButton[],
	entry: DockButtonApp,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): Promise<void> {
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

	buttons.push({
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
	});
}

/**
 * Add an entry to the dock as an action.
 * @param buttons The list of buttons to add to.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 */
async function addEntryAsAction(
	buttons: DockButton[],
	entry: DockButtonAction,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): Promise<void> {
	if (!isStringValue(entry.tooltip) || !isStringValue(entry.iconUrl)) {
		logger.error("You must specify the tooltip and iconUrl for a DockButtonAction");
	} else {
		buttons.push({
			type: DockButtonNames.ActionButton,
			tooltip: entry.tooltip,
			iconUrl: themeUrl(entry.iconUrl, iconFolder, colorSchemeMode),
			action: entry.action
		});
	}
}

/**
 * Add an entry to the dock as an drop down.
 * @param buttons The list of buttons to add to.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 * @param platform The workspace platform for checking conditions.
 */
async function addEntriesAsDropdown(
	buttons: DockButton[],
	entry: DockButtonDropdown,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode,
	platform: WorkspacePlatformModule
): Promise<void> {
	// Options are present so this is a drop down
	// The items in the drop down can be an appId or a custom action
	if (!isStringValue(entry.tooltip) || !isStringValue(entry.iconUrl)) {
		logger.error("You must specify the tooltip and iconUrl for a DockButtonDropdown");
	} else {
		const opts: CustomButtonConfig[] = [];

		for (const option of entry.options) {
			if (await checkConditions(platform, option.conditions, { callerType: "dock", customData: option })) {
				let optionTooltip = option.tooltip;
				let action: CustomActionSpecifier | undefined;

				// If the options has an appId we are going to launch that
				// otherwise we use the custom action.
				if ("appId" in option) {
					if (!isStringValue(optionTooltip)) {
						// If the tooltip is not set we can use the app title
						const app = await getApp(option.appId);
						optionTooltip = app?.title ?? "";
					}
					action = {
						id: PLATFORM_ACTION_IDS.launchApp,
						customData: {
							source: "dock",
							appId: option.appId
						}
					};
				} else if (!isStringValue(optionTooltip)) {
					logger.error("You must specify the tooltip for a DockButtonAction in a DockButtonDropdown");
				} else {
					action = option.action;
				}

				if (!isEmpty(action)) {
					opts.push({
						tooltip: optionTooltip ?? "",
						action
					});
				}
			}
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

		buttons.push({
			type: DockButtonNames.DropdownButton,
			tooltip: entry.tooltip,
			iconUrl: themeUrl(entry.iconUrl, iconFolder, colorSchemeMode),
			options: opts
		});
	}
}

/**
 * Add entries to the dock based on their app tags as either multiple buttons or a drop down.
 * @param buttons The list of buttons to add to.
 * @param entry The entry details.
 * @param iconFolder The folder for icons.
 * @param colorSchemeMode The color scheme
 */
async function addEntriesByAppTag(
	buttons: DockButton[],
	entry: DockButtonAppsByTag,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): Promise<void> {
	if (!Array.isArray(entry.tags)) {
		logger.error("You must specify an array for the tags parameter for an DockButtonAppsByTag");
	} else {
		// If there are tags then this could be a group of apps we then display separate
		// buttons or a drop down based on the display property
		const dockApps = await getAppsByTag(entry.tags, false, { private: false });

		if (entry.display === "individual") {
			// Individual so show a button for each app
			for (const dockApp of dockApps) {
				const icon = entry.iconUrl ?? getAppIcon(dockApp);
				buttons.push({
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
		} else if (entry.display === "group") {
			// Group display so show a drop down with all the entries in it
			if (!isStringValue(entry.tooltip)) {
				logger.error("You must specify the tooltip for a grouped DockButtonAppsByTag");
			} else {
				let iconUrl = entry.iconUrl;
				const opts = [];

				for (const dockApp of dockApps) {
					// If the config doesn't specify an icon, just use the icon from the first entry
					if (!isStringValue(iconUrl)) {
						iconUrl = getAppIcon(dockApp);
					}

					opts.push({
						tooltip: dockApp.title,
						action: {
							id: PLATFORM_ACTION_IDS.launchApp,
							customData: {
								source: "dock",
								appId: dockApp.appId
							}
						}
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

				buttons.push({
					type: DockButtonNames.DropdownButton,
					tooltip: entry.tooltip ?? "",
					iconUrl: themeUrl(iconUrl, iconFolder, colorSchemeMode),
					options: opts
				});
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
 * Refresh the dock because the color scheme or apps have changed.
 */
async function refreshDock(): Promise<void> {
	if (!isEmpty(registrationInfo)) {
		const newButtons = await buildButtons();

		if (JSON.stringify(newButtons) !== JSON.stringify(registeredButtons)) {
			const dockProvider = await buildDockProvider(newButtons);
			if (dockProvider) {
				// updateDockProviderConfig was added in v13, fallback if it doesn't exist
				if (registrationInfo?.updateDockProviderConfig) {
					await registrationInfo.updateDockProviderConfig(dockProvider);
				} else {
					await deregister();
					await Dock.register(dockProvider);
					if (registeredBootstrapOptions?.autoShow?.includes("dock")) {
						await show();
					}
				}
			}
		}
	}
}

/**
 * Apply theming to an icon url.
 * @param url The url to theme.
 * @param iconFolder The icon folder.
 * @param colorSchemeMode The color scheme.
 * @returns The themed url.
 */
function themeUrl(
	url: string | undefined,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): string | undefined {
	return url
		? url.replace(/{theme}/g, iconFolder).replace(/{scheme}/g, colorSchemeMode as string)
		: undefined;
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
