import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { getActions } from "./actions";
import * as appProvider from "./apps";
import { getDefaultWindowOptions } from "./browser";
import * as endpointProvider from "./endpoint";
import { interopOverride } from "./interopbroker";
import { overrideCallback } from "./platform-override";
import { getSettings, getThemes } from "./settings";

export async function init() {
	console.log("Initializing Core Services");
	const settings = await getSettings();

	await endpointProvider.init(settings?.endpointProvider);
	await appProvider.init(settings?.appProvider, endpointProvider);

	console.log("Initializing platform");
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();
	}

	console.log("Specifying following browser options:", browser);

	const customActions = await getActions();
	const theme = await getThemes();

	await workspacePlatformInit({
		browser,
		theme,
		customActions,
		interopOverride,
		overrideCallback
	});
}
