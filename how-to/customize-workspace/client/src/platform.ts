import { BrowserInitConfig, init as workspacePlatformInit } from "@openfin/workspace-platform";
import { getActions } from "./actions";
import { getDefaultWindowOptions, overrideCallback } from "./browser";
import { interopOverride } from "./interopbroker";
import { getSettings, getThemes } from "./settings";

export async function init() {
	const settings = await getSettings();

	console.log("Initialising platform");
	const browser: BrowserInitConfig = {};

	if (settings.browserProvider !== undefined) {
		browser.defaultWindowOptions = await getDefaultWindowOptions();

		browser.interopOverride = interopOverride;
		browser.overrideCallback = overrideCallback;
	}

	console.log("Specifying following browser options:", browser);

	const customActions = await getActions();
	const theme = await getThemes();

	await workspacePlatformInit({
		browser,
		theme,
		customActions
	});
}
