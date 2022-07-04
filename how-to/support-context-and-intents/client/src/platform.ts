import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { interopOverride } from "./interopbroker";
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

		// Fix this type overload when openfin-adapter references are removed from WS
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		browser.interopOverride = interopOverride as any;
	}

	console.log("Specifying following browser options:", browser);
	await workspacePlatformInit({
		browser,
		theme: validateThemes(settings?.themeProvider?.themes)
	});
}
