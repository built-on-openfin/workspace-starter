import { init as workspacePlatformInit, type BrowserInitConfig } from "@openfin/workspace-platform";
import { getThemes } from "./themes";

export async function init() {
	console.log("Initialising platform");
	const browser: BrowserInitConfig = {};

	const theme = await getThemes();

	await workspacePlatformInit({
		browser,
		theme
	});
}
