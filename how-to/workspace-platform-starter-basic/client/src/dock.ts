import { Dock, type App, type RegistrationMetaInfo, DockButtonNames } from "@openfin/workspace";
import type { PlatformSettings } from "./shapes";

/**
 * Register the dock provider.
 * @param platformSettings The platform settings from the manifest.
 * @param apps The list of apps from the manifest.
 * @returns The registration details for dock.
 */
export async function register(
	platformSettings: PlatformSettings,
	apps?: App[]
): Promise<RegistrationMetaInfo | undefined> {
	console.log("Initializing the dock provider.");

	try {
		const metaInfo = await Dock.register({
			...platformSettings,
			workspaceComponents: ["home", "store", "notifications", "switchWorkspace"],
			disableUserRearrangement: true,
			buttons: [
				{
					type: DockButtonNames.DropdownButton,
					tooltip: "Apps",
					id: "apps",
					iconUrl: platformSettings.icon,
					options: (apps ?? []).map((app) => ({
						tooltip: app.title,
						iconUrl: app.icons?.length ? app.icons[0].src : platformSettings.icon,
						action: {
							id: "launch-app",
							customData: app
						}
					}))
				}
			]
		});
		console.log(metaInfo);
		console.log("Dock provider initialized.");
		return metaInfo;
	} catch (err) {
		console.error("An error was encountered while trying to register the content dock provider", err);
	}
}
