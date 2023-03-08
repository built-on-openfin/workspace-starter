import {
	BrowserInitConfig,
	CustomActionCallerType,
	getCurrentSync,
	init as workspacePlatformInit
} from "@openfin/workspace-platform";
import { getSettings, validateThemes } from "./settings";

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
			search: async (e) => {
				if (e.callerType === CustomActionCallerType.StoreCustomButton) {
					const url = `https://www.google.com/search?q=${encodeURIComponent(e.customData.query as string)}`;

					const platform = getCurrentSync();
					await platform.createView({
						url,
						target: null
					});
				}
			}
		}
	});
}
