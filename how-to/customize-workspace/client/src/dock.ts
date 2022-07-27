import { Dock, DockButton, DockButtonNames, RegistrationMetaInfo } from "@openfin/workspace";
import { ACTION_IDS } from "./actions";
import { getApp, getAppIcon, getAppsByTag } from "./apps";
import { getSettings } from "./settings";
import { BootstrapOptions } from "./shapes";

let isDockRegistered = false;

export async function register(bootstrapOptions: BootstrapOptions): Promise<RegistrationMetaInfo> {
	console.log("Initialising dock.");
	isDockRegistered = true;

	const settings = await getSettings();

	const appTags = settings.dockProvider.appTags ?? ["dock"];

	const dockApps = await getAppsByTag(appTags);

	// First add all the buttons tagged from apps
	const buttons: DockButton[] = dockApps.map((app) => ({
		tooltip: app.title,
		iconUrl: getAppIcon(app),
		action: {
			id: ACTION_IDS.launchApp,
			customData: {
				source: "dock",
				appId: app.appId
			}
		}
	}));

	// Now add the custom buttons
	if (Array.isArray(settings.dockProvider?.buttons)) {
		for (const button of settings.dockProvider.buttons) {
			let tooltip = button.tooltip;
			let iconUrl = button.iconUrl;

			// If the button has an appId we are going to launch that
			// but the config can override the tooltip or icon
			if (button.appId && (!tooltip || !iconUrl)) {
				const app = await getApp(button.appId);
				if (!tooltip) {
					tooltip = app.title;
				}
				if (!iconUrl) {
					iconUrl = getAppIcon(app);
				}
			}

			// Is this a custom drop down
			if ("options" in button) {
				const options = [];

				for (const option of button.options) {
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
										appId: button.appId
									}
							  }
							: option.action
					});
				}

				buttons.push({
					type: DockButtonNames.DropdownButton,
					tooltip,
					iconUrl,
					options
				});
			} else {
				// This is just a button with no dropdown
				// it might be launching an app or a custom action
				// which we must define in actions.ts
				buttons.push({
					type: DockButtonNames.ActionButton,
					tooltip,
					iconUrl,
					action: button.appId
						? {
								id: ACTION_IDS.launchApp,
								customData: {
									source: "dock",
									appId: button.appId
								}
						  }
						: button.action
				});
			}
		}
	}

	return Dock.register({
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
	console.warn("Unable to deregister home as there is an indication it was never registered");
}
