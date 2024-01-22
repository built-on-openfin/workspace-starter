import {
	Dock,
	DockButtonNames,
	type DockButton,
	type RegistrationMetaInfo,
	type DockProviderRegistration,
	type WorkspaceButtonsConfig,
	type DockProviderConfig
} from "@openfin/workspace";
import {
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap
} from "@openfin/workspace-platform";

let platformTitle: string | undefined;
let platformIcon: string | undefined;
let customIconUrl: string | undefined;
let customOpenUrl: string | undefined;
let registration: DockProviderRegistration | undefined;
/**
 * Register the dock provider.
 * @param id The id to register the provider with.
 * @param title The title to use for the dock registration.
 * @param icon The icon to use for the dock registration.
 * @param options The options to pass to the dock provider.
 * @param options.workspaceComponents The workspace buttons.
 * @param options.disableUserRearrangement Stop the user from rearranging the buttons.
 * @param options.customIconUrl Use a custom icon url.
 * @param options.customOpenUrl Use a custom open url.
 * @returns The registration details for dock.
 */
export async function register(
	id: string,
	title: string,
	icon: string,
	options: {
		workspaceComponents: WorkspaceButtonsConfig;
		disableUserRearrangement: boolean;
		customIconUrl: string;
		customOpenUrl: string;
	}
): Promise<RegistrationMetaInfo | undefined> {
	console.log("Initializing the dock provider.");

	try {
		platformTitle = title;
		platformIcon = icon;
		customIconUrl = options.customIconUrl;
		customOpenUrl = options.customOpenUrl;
		registration = await Dock.register({
			id,
			title,
			icon,
			workspaceComponents: options.workspaceComponents,
			disableUserRearrangement: options.disableUserRearrangement,
			skipSavedDockProviderConfig: true,
			buttons: [
				{
					tooltip: "Google",
					iconUrl: "https://www.google.com/favicon.ico",
					action: {
						id: "launch-google"
					}
				},
				{
					tooltip: "Bing",
					iconUrl: "https://www.bing.com/favicon.ico",
					action: {
						id: "launch-bing"
					}
				},
				{
					tooltip: "Custom",
					iconUrl: options.customIconUrl,
					action: {
						id: "launch-custom",
						customData: options.customOpenUrl
					}
				},
				{
					type: DockButtonNames.DropdownButton,
					tooltip: "Social",
					iconUrl: "http://localhost:8080/assets/spanner.svg",
					options: [
						{
							tooltip: "Twitter",
							action: {
								id: "launch-tools",
								customData: "twitter"
							}
						},
						{
							tooltip: "Facebook",
							action: {
								id: "launch-tools",
								customData: "facebook"
							}
						}
					]
				}
			]
		});
		console.log(registration);
		console.log("Dock provider initialized.");
		return registration;
	} catch (err) {
		console.error("An error was encountered while trying to register the content dock provider", err);
	}
}

/**
 * Get the actions that will be triggered by the button clicks.
 * The action are added to the workspace platform when it is created.
 * @returns The maps of the custom actions.
 */
export function dockGetCustomActions(): CustomActionsMap {
	return {
		"launch-google": async (): Promise<void> => {
			const platform = getCurrentSync();
			await platform.createView({ url: "https://www.google.com" });
		},
		"launch-bing": async (): Promise<void> => {
			const platform = getCurrentSync();
			await platform.createView({ url: "https://www.bing.com" });
		},
		"launch-custom": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomButton) {
				const platform = getCurrentSync();
				await platform.createView({ url: payload.customData });
			}
		},
		"launch-tools": async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.CustomDropdownItem) {
				if (payload.customData === "twitter") {
					const platform = getCurrentSync();
					await platform.createView({ url: "https://www.twitter.com" });
				} else if (payload.customData === "facebook") {
					const platform = getCurrentSync();
					await platform.createView({ url: "https://www.facebook.com" });
				}
			}
		}
	};
}

/**
 * Create the configuration for the dock, including a drop down for favorites if there are any. Normally, you would pass this into the initial
 * register method above, but this is only for demonstrating the ability to change the dock dynamically.
 * @param isEnabled Passes a boolean accounting for buttons in the dock being usable or not.
 * @returns The dock configuration.
 */
function buildDockConfiguration(isEnabled: boolean): DockProviderConfig {
	const buttons: DockButton[] = [
		{
			tooltip: "Google",
			iconUrl: "https://www.google.com/favicon.ico",
			action: {
				id: "launch-google"
			},
			disabled: !isEnabled
		},
		{
			tooltip: "Bing",
			iconUrl: "https://www.bing.com/favicon.ico",
			action: {
				id: "launch-bing"
			},
			disabled: !isEnabled
		},
		{
			tooltip: "Custom",
			iconUrl: customIconUrl,
			action: {
				id: "launch-custom",
				customData: customOpenUrl
			},
			disabled: !isEnabled
		},
		{
			type: DockButtonNames.DropdownButton,
			tooltip: "Social",
			iconUrl: "http://localhost:8080/assets/spanner.svg",
			options: [
				{
					tooltip: "Twitter",
					action: {
						id: "launch-tools",
						customData: "twitter"
					}
				},
				{
					tooltip: "Facebook",
					action: {
						id: "launch-tools",
						customData: "facebook"
					}
				}
			],
			disabled: !isEnabled
		}
	];

	return {
		title: platformTitle ?? "",
		icon: platformIcon ?? "",
		workspaceComponents: ["home", "notifications", "store", "switchWorkspace"],
		disableUserRearrangement: false,
		buttons
	};
}

/**
 * Update the dock when something has changed.
 * @param isEnabled Tells us whether or not the Dock buttons should be clickable.
 */
export async function updateDock(isEnabled: boolean): Promise<void> {
	if (registration) {
		await registration.updateDockProviderConfig(buildDockConfiguration(isEnabled));
	}
}
