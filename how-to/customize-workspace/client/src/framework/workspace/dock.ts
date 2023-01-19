import { Dock, DockButton, DockButtonNames, RegistrationMetaInfo } from "@openfin/workspace";
import type { ColorSchemeMode } from "customize-workspace/shapes/theme-shapes";
import { ACTION_IDS } from "../actions";
import { getApp, getAppIcon, getAppsByTag } from "../apps";
import { subscribeLifecycleEvent, unsubscribeLifecycleEvent } from "../lifecycle";
import { createLogger } from "../logger-provider";
import { getSettings } from "../settings";
import type { BootstrapOptions, CustomSettings } from "../shapes";
import { getCurrentColorSchemeMode, getCurrentIconFolder } from "../themes";

const logger = createLogger("Dock");

let registrationInfo: RegistrationMetaInfo | undefined;
let registeredBootstrapOptions: BootstrapOptions | undefined;
let lifeCycleSubscriptionId: string;
let registeredButtons: DockButton[];

export async function register(bootstrapOptions?: BootstrapOptions): Promise<RegistrationMetaInfo> {
	if (!registrationInfo) {
		const settings = await getSettings();

		const buttons = await calculateButtons(settings, bootstrapOptions);

		await finalizeRegistration(settings, buttons);
	}
	logger.info("Dock register about to be called.");
	return registrationInfo;
}

async function finalizeRegistration(settings: CustomSettings, buttons: DockButton[]) {
	registrationInfo = await Dock.register({
		id: settings.dockProvider?.id,
		title: settings.dockProvider?.title,
		icon: settings.dockProvider?.icon,
		workspaceComponents: {
			hideWorkspacesButton: settings.dockProvider.workspaceComponents?.hideWorkspacesButton,
			hideHomeButton:
				!registeredBootstrapOptions.home || settings.dockProvider.workspaceComponents?.hideHomeButton,
			hideStorefrontButton:
				!registeredBootstrapOptions.store || settings.dockProvider.workspaceComponents?.hideStorefrontButton,
			hideNotificationsButton:
				!registeredBootstrapOptions.notifications ||
				settings.dockProvider.workspaceComponents?.hideNotificationsButton
		},
		buttons
	});

	registeredButtons = buttons;

	lifeCycleSubscriptionId = subscribeLifecycleEvent("theme-changed", async () => updateDockColorScheme());

	logger.info("Version:", registrationInfo);
	logger.info("Dock provider initialized");
}

async function calculateButtons(
	settings: CustomSettings,
	bootstrapOptions: BootstrapOptions
): Promise<DockButton[]> {
	registeredBootstrapOptions = registeredBootstrapOptions ?? bootstrapOptions;

	const buttons: DockButton[] = [];
	const iconFolder = await getCurrentIconFolder();
	const colorSchemeMode = await getCurrentColorSchemeMode();

	if (Array.isArray(settings.dockProvider.apps)) {
		for (const appButton of settings.dockProvider.apps) {
			if (!Array.isArray(appButton.tags)) {
				logger.error("You must specify an array for the tags parameter for an DockAppButton");
			} else {
				const dockApps = await getAppsByTag(appButton.tags, false, { private: false });

				if (appButton.display === "individual") {
					for (const dockApp of dockApps) {
						buttons.push({
							tooltip: appButton.tooltip ?? dockApp.title,
							iconUrl: themeUrl(appButton.iconUrl ?? getAppIcon(dockApp), iconFolder, colorSchemeMode),
							action: {
								id: ACTION_IDS.launchApp,
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
					const options = [];

					for (const dockApp of dockApps) {
						// If the config doesn't specify an icon, just use the icon from the first entry
						if (!iconUrl) {
							iconUrl = getAppIcon(dockApp);
						}

						options.push({
							tooltip: dockApp.title,
							action: {
								id: ACTION_IDS.launchApp,
								customData: {
									source: "dock",
									appId: dockApp.appId
								}
							}
						});
					}

					buttons.push({
						type: DockButtonNames.DropdownButton,
						tooltip: appButton.tooltip,
						iconUrl: themeUrl(iconUrl, iconFolder, colorSchemeMode),
						options
					});
				}
			}
		}
	}

	// Now add the custom buttons
	if (Array.isArray(settings.dockProvider?.buttons)) {
		for (const dockButton of settings.dockProvider.buttons) {
			// Is this a dock drop down
			if ("options" in dockButton) {
				if (!dockButton.tooltip || !dockButton.iconUrl) {
					logger.error("You must specify the tooltip and iconUrl for a DockButtonDropdown");
				} else {
					const options = [];

					for (const option of dockButton.options) {
						let optionTooltip = option.tooltip;

						// If the options has an appId we are going to launch that
						// but the config can override the tooltip
						if (option.appId && !optionTooltip) {
							const app = await getApp(option.appId);
							optionTooltip = app.title;
						}

						// If we have an appId do the default dock launch action
						// otherwise we just perform a custom action and this
						// must be handled in actions.ts
						options.push({
							tooltip: optionTooltip,
							action: option.appId
								? {
										id: ACTION_IDS.launchApp,
										customData: {
											source: "dock",
											appId: option.appId
										}
								  }
								: option.action
						});
					}

					buttons.push({
						type: DockButtonNames.DropdownButton,
						tooltip: dockButton.tooltip,
						iconUrl: themeUrl(dockButton.iconUrl, iconFolder, colorSchemeMode),
						options
					});
				}
			} else {
				let tooltip = dockButton.tooltip;
				let iconUrl = dockButton.iconUrl;

				// If the button has an appId we are going to launch that
				// but the config can override the tooltip or icon
				if (dockButton.appId && (!tooltip || !iconUrl)) {
					const app = await getApp(dockButton.appId);
					if (!tooltip) {
						tooltip = app.title;
					}
					if (!iconUrl) {
						iconUrl = getAppIcon(app);
					}
				}

				// This is just a button with no dropdown
				// it might be launching an app or a custom action
				// which we must define in actions.ts
				buttons.push({
					type: DockButtonNames.ActionButton,
					tooltip,
					iconUrl: themeUrl(iconUrl, iconFolder, colorSchemeMode),
					action: dockButton.appId
						? {
								id: ACTION_IDS.launchApp,
								customData: {
									source: "dock",
									appId: dockButton.appId
								}
						  }
						: dockButton.action
				});
			}
		}
	}
	return buttons;
}

export async function show() {
	logger.info("Dock show called.");
	return Dock.show();
}

export async function minimize() {
	logger.info("Dock minimize called.");
	return Dock.minimize();
}

export async function deregister() {
	if (registrationInfo) {
		unsubscribeLifecycleEvent(lifeCycleSubscriptionId, "theme-changed");
		lifeCycleSubscriptionId = undefined;
		registrationInfo = undefined;
		logger.info("Dock deregister about to be called.");
		return Dock.deregister();
	}
	logger.warn("Unable to deregister home as there is an indication it was never registered");
}

async function updateDockColorScheme(): Promise<void> {
	if (registrationInfo !== undefined) {
		const settings = await getSettings();

		const newButtons = await calculateButtons(settings, registeredBootstrapOptions);

		if (JSON.stringify(newButtons) !== JSON.stringify(registeredButtons)) {
			await deregister();
			await finalizeRegistration(settings, newButtons);
		}
	}
}

function themeUrl(
	url: string | undefined,
	iconFolder: string,
	colorSchemeMode: ColorSchemeMode
): string | undefined {
	return url
		? url.replace(/{theme}/g, iconFolder).replace(/{scheme}/g, colorSchemeMode as string)
		: undefined;
}
