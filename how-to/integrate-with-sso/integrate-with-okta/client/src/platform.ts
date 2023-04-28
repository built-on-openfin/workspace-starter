import { init as workspacePlatformInit, type BrowserInitConfig } from "@openfin/workspace-platform";

export async function init() {
	console.log("Initializing platform");

	const browser: BrowserInitConfig = {};

	await workspacePlatformInit({
		browser
	});
}
