import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { getActions } from "./actions";
import * as appService from "./apps";
import { getDefaultWindowOptions, overrideCallback } from "./browser";
import * as endpointService from "./endpoint";
import { interopOverride } from "./interopbroker";
import { getSettings, getThemes } from "./settings";

export async function init() {
	console.log("Initializing Core Services");
	const settings = await getSettings();

	await endpointService.init(settings?.endpointProvider);
	await appService.init(settings?.appProvider, endpointService);

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
