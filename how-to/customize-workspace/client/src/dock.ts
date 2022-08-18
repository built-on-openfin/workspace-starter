import { Dock, DockButton, DockButtonNames, RegistrationMetaInfo } from "@openfin/workspace";
import { ACTION_IDS } from "./actions";
import { getApp, getAppIcon, getAppsByTag } from "./apps";
import { logger } from "./logger-provider";
import { getSettings } from "./settings";
import { BootstrapOptions } from "./shapes";

let isDockRegistered = false;

export async function register(bootstrapOptions: BootstrapOptions): Promise<RegistrationMetaInfo> {
	const settings = await getSettings();

	const buttons: DockButton[] = [];

	if (Array.isArray(settings.dockProvider.apps)) {
		for (const appButton of settings.dockProvider.apps) {
			if (!Array.isArray(appButton.tags)) {
				logger.error("Dock", "You must specify an array for the tags parameter for an DockAppButton");
			} else {
				const dockApps = await getAppsByTag(appButton.tags);

				if (appButton.display === "individual") {
					for (const dockApp of dockApps) {
						buttons.push({
							tooltip: appButton.tooltip ?? dockApp.title,
							iconUrl: appButton.iconUrl ?? getAppIcon(dockApp),
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
						logger.error("Dock", "You must specify the tooltip for a grouped DockAppButton");
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
						iconUrl,
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
					logger.error("Dock", "You must specify the tooltip and iconUrl for a DockButtonDropdown");
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
						iconUrl: dockButton.iconUrl,
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
					iconUrl,
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

	const registrationInfo = await Dock.register({
		id: settings.dockProvider?.id,
		title: settings.dockProvider?.title,
		icon: settings.dockProvider?.icon,
		workspaceComponents: {
			hideWorkspacesButton: settings.dockProvider.workspaceComponents?.hideWorkspacesButton,
			hideHomeButton: !bootstrapOptions.home || settings.dockProvider.workspaceComponents?.hideHomeButton,
			hideStorefrontButton:
				!bootstrapOptions.store || settings.dockProvider.workspaceComponents?.hideStorefrontButton,
			hideNotificationsButton:
				!bootstrapOptions.notifications || settings.dockProvider.workspaceComponents?.hideNotificationsButton
		},
		buttons
	});

	logger.info("Dock", "Version:", registrationInfo);
	isDockRegistered = true;
	logger.info("Dock", "Dock provider initialized");

	return registrationInfo;
}

export async function show() {
	return Dock.show();
}

export async function minimize() {
	return Dock.minimize();
}

export async function deregister() {
	if (isDockRegistered) {
		return Dock.deregister();
	}
	logger.warn("Dock", "Unable to deregister home as there is an indication it was never registered");
}
