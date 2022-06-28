import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { ChannelProvider } from "openfin-adapter";
import Transport from "openfin-adapter/src/transport/transport";
import { PlatformInteropBroker } from "./interopbroker";
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

		browser.interopOverride = async (
			InteropBroker,
			provider: Transport,
			options: ChannelProvider,
			...args: unknown[]
		) => new PlatformInteropBroker(provider, options, ...args);
	}

	console.log("Specifying following browser options:", browser);
	await workspacePlatformInit({
		browser,
		theme: validateThemes(settings?.themeProvider?.themes)
	});
}
