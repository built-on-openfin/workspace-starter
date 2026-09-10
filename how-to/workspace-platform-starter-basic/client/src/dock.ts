import type { App } from "@openfin/workspace";
import {
	Dock,
	type ContentMenuEntry,
	type Dock3Config,
	type Dock3Provider,
	type LaunchDockEntryPayload
} from "@openfin/workspace-platform";
import { launchApp } from "./launch";
import type { PlatformSettings } from "./shapes";

/**
 * Register the dock provider.
 * @param platformSettings The platform settings from the manifest.
 * @param apps The list of apps from the manifest.
 * @returns The Dock3 provider instance.
 */
export async function register(
	platformSettings: PlatformSettings,
	apps?: App[]
): Promise<Dock3Provider | undefined> {
	console.log("Initializing the dock provider.");

	const contentMenu: ContentMenuEntry[] = (apps ?? []).map((app) => ({
		type: "item",
		id: app.appId,
		label: app.title,
		icon: app.icons?.length ? app.icons[0].src : platformSettings.icon,
		itemData: { app }
	}));

	const config: Dock3Config = {
		title: platformSettings.title,
		icon: platformSettings.icon,
		contentMenu,
		defaultDockButtons: ["home", "store", "notifications", "switchWorkspace", "contentMenu"]
	};

	try {
		const dockProvider = await Dock.init({
			config,
			override: (Base) =>
				/**
				 * Custom dock provider that launches apps from the content menu.
				 */
				class CustomDockProvider extends Base {
					/**
					 * Handle a dock content menu entry being launched.
					 * @param payload The entry that was launched.
					 */
					public async launchEntry(payload: LaunchDockEntryPayload): Promise<void> {
						if (payload.entry.type === "item" && payload.entry.itemData?.app) {
							await launchApp(payload.entry.itemData.app as App);
						} else {
							console.error("No app found for dock entry:", payload.entry);
						}
					}
				}
		});
		console.log("Dock provider initialized.");
		return dockProvider;
	} catch (err) {
		console.error("An error was encountered while trying to register the content dock provider", err);
	}
}
