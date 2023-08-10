import {
	Dock,
	DockButtonNames,
	type CustomActionSpecifier,
	type DockButton,
	type DockProvider,
	type DockProviderRegistration
} from "@openfin/workspace";
import { PLATFORM_ACTION_IDS } from "../actions";
import { getApp, getAppsByTag } from "../apps";
import { subscribeLifecycleEvent, unsubscribeLifecycleEvent } from "../lifecycle";
import { createLogger } from "../logger-provider";
import type { PlatformApp } from "../shapes/app-shapes";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type { DockProviderOptions } from "../shapes/dock-shapes";
import type { ColorSchemeMode } from "../shapes/theme-shapes";
import { getCurrentColorSchemeMode, getCurrentIconFolder } from "../themes";
import { isEmpty } from "../utils";

const logger = createLogger("Dock");

let registrationInfo: DockProviderRegistration | undefined;
let dockProviderOptions: DockProviderOptions | undefined;
let registeredBootstrapOptions: BootstrapOptions | undefined;
let lifeCycleSubscriptionId: string | undefined;
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

			lifeCycleSubscriptionId = subscribeLifecycleEvent("theme-changed", async () => updateDockColorScheme());
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
		if (lifeCycleSubscriptionId) {
			unsubscribeLifecycleEvent(lifeCycleSubscriptionId, "theme-changed");
		}
		lifeCycleSubscriptionId = undefined;
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
	const iconFolder = await getCurrentIconFolder();
	const colorSchemeMode = await getCurrentColorSchemeMode();

	if (dockProviderOptions) {
		if (Array.isArray(dockProviderOptions.apps)) {
			for (const appButton of dockProviderOptions.apps) {
				if (!Array.isArray(appButton.tags)) {
					logger.error("You must specify an array for the tags parameter for an DockAppButton");
				} else {
					const dockApps = await getAppsByTag(appButton.tags, false, { private: false });

					if (appButton.display === "individual") {
						for (const dockApp of dockApps) {
							const icon = appButton.iconUrl ?? getAppIcon(dockApp);
							buttons.push({
								tooltip: appButton.tooltip ?? dockApp.title,
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
					} else if (appButton.display === "group") {
						if (!appButton.tooltip) {
							logger.error("You must specify the tooltip for a grouped DockAppButton");
						}
						let iconUrl = appButton.iconUrl;
						const opts = [];

						for (const dockApp of dockApps) {
							// If the config doesn't specify an icon, just use the icon from the first entry
							if (!iconUrl) {
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

						buttons.push({
							type: DockButtonNames.DropdownButton,
							tooltip: appButton.tooltip ?? "",
							iconUrl: themeUrl(iconUrl, iconFolder, colorSchemeMode),
							options: opts
						});
					}
				}
			}
		}

		// Now add the custom buttons
		if (Array.isArray(dockProviderOptions?.buttons)) {
			for (const dockButton of dockProviderOptions.buttons) {
				// Is this a dock drop down
				if ("options" in dockButton) {
					if (!dockButton.tooltip || !dockButton.iconUrl) {
						logger.error("You must specify the tooltip and iconUrl for a DockButtonDropdown");
					} else {
						const opts = [];

						for (const option of dockButton.options) {
							let optionTooltip = option.tooltip;

							// If the options has an appId we are going to launch that
							// but the config can override the tooltip
							if (option.appId && !optionTooltip) {
								const app = await getApp(option.appId);
								optionTooltip = app?.title ?? "";
							}

							// If we have an appId do the default dock launch action
							// otherwise we just perform a custom action and this
							// must be handled in actions.ts
							opts.push({
								tooltip: optionTooltip ?? "",
								action: option.appId
									? {
											id: PLATFORM_ACTION_IDS.launchApp,
											customData: {
												source: "dock",
												appId: option.appId
											}
									  }
									: (option.action as CustomActionSpecifier)
							});
						}

						buttons.push({
							type: DockButtonNames.DropdownButton,
							tooltip: dockButton.tooltip,
							iconUrl: themeUrl(dockButton.iconUrl, iconFolder, colorSchemeMode),
							options: opts
						});
					}
				} else {
					let tooltip = dockButton.tooltip;
					let iconUrl = dockButton.iconUrl;

					// If the button has an appId we are going to launch that
					// but the config can override the tooltip or icon
					if (dockButton.appId && (!tooltip || !iconUrl)) {
						const app = await getApp(dockButton.appId);
						if (app) {
							if (!tooltip) {
								tooltip = app.title;
							}
							if (!iconUrl) {
								iconUrl = getAppIcon(app);
							}
						}
					}

					// This is just a button with no dropdown
					// it might be launching an app or a custom action
					// which we must define in actions.ts
					buttons.push({
						type: DockButtonNames.ActionButton,
						tooltip: tooltip ?? "",
						iconUrl: themeUrl(iconUrl, iconFolder, colorSchemeMode),
						action: dockButton.appId
							? {
									id: PLATFORM_ACTION_IDS.launchApp,
									customData: {
										source: "dock",
										appId: dockButton.appId
									}
							  }
							: (dockButton.action as CustomActionSpecifier)
					});
				}
			}
		}
	}

	return buttons;
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
 * Update the dock because the color scheme has changed.
 */
async function updateDockColorScheme(): Promise<void> {
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
