import { init as workspacePlatformInit, BrowserInitConfig } from "@openfin/workspace-platform";
import { getSettings, validateThemes } from "./settings";

export async function init() {
	console.log("Initialising platform");
	const settings = await getSettings();

	// we set browser to null to tell the workspace platform that we will be
	// using platform api windows
	const browser: BrowserInitConfig = null;

	await workspacePlatformInit({
		browser,
		theme: validateThemes(settings?.themeProvider?.themes)
	});
}
