import { init as workspacePlatformInit, type BrowserInitConfig } from "@openfin/workspace-platform";

export async function init() {
	console.log("Initialising platform");

	const browser: BrowserInitConfig = {};

	await workspacePlatformInit({
		browser
	});
}
