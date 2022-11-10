import { init as workspacePlatformInit, BrowserInitConfig } from "@openfin/workspace-platform";
import { getSettings } from "./settings";
import type { CustomSettings } from "./shapes/framework-shapes";
import { getThemes } from "./themes";

export async function init() {
	console.log("Initialising platform");
	const browser: BrowserInitConfig = {};

	const settings: CustomSettings = await getSettings();
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

	const theme = await getThemes();

	await workspacePlatformInit({
		browser,
		theme
	});
}
