import type { App } from "@openfin/workspace";
import {
	BrowserInitConfig,
	CustomActionCallerType,
	init as workspacePlatformInit
} from "@openfin/workspace-platform";
import { getSettings, validateThemes } from "./settings";
import { addToFavorites, removeFromFavorites } from "./store";

export async function init() {
	console.log("Initialising platform");
	const settings = await getSettings();
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = {
			icon: settings.browserProvider.windowOptions?.icon,
			workspacePlatform: {
				pages: null,
				title: settings.browserProvider.windowOptions?.title,
				favicon: settings.browserProvider.windowOptions?.icon,
				newTabUrl: settings.browserProvider.windowOptions?.newTabUrl,
				newPageUrl: settings.browserProvider.windowOptions?.newPageUrl
			}
		};
	}

	console.log("Specifying following browser options:", browser);
	await workspacePlatformInit({
		browser,
		theme: validateThemes(settings?.themeProvider?.themes),
		customActions: {
			"favorite-add": (e) => {
				if (e.callerType === CustomActionCallerType.StoreCustomButton) {
					addToFavorites(e.customData as App);
				}
			},
			"favorite-remove": (e) => {
				if (e.callerType === CustomActionCallerType.StoreCustomButton) {
					removeFromFavorites((e.customData as App).appId);
				}
			}
		}
	});
}
