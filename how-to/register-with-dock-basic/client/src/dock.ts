import {
	Dock,
	DockButtonNames,
	type RegistrationMetaInfo,
	type WorkspaceComponentButtonOptions
} from "@openfin/workspace";
import {
	CustomActionCallerType,
	getCurrentSync,
	type CustomActionPayload,
	type CustomActionsMap
} from "@openfin/workspace-platform";

/**
 * Register the dock provider.
 * @param id The id to register the provider with.
 * @param title The title to use for the dock registration.
 * @param icon The icon to use for the dock registration.
 * @param options The options to pass to the dock provider.
 * @param options.workspaceComponents The workspace components options.
 * @param options.customIconUrl Use a custom icon url.
 * @param options.customOpenUrl Use a custom open url.
 * @returns The registration details for dock.
 */
export async function register(
	id: string,
	title: string,
	icon: string,
	options: {
		workspaceComponents: WorkspaceComponentButtonOptions;
		customIconUrl: string;
		customOpenUrl: string;
	}
): Promise<RegistrationMetaInfo | undefined> {
	console.log("Initialising the dock provider.");

	try {
		const metaInfo = await Dock.register({
			id,
			title,
			icon,
			workspaceComponents: options.workspaceComponents,
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
		console.log(metaInfo);
		console.log("Dock provider initialised.");
		return metaInfo;
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
