import { init as workspacePlatformInit, type BrowserInitConfig } from "@openfin/workspace-platform";
import { overrideCallback } from "./browser";

export async function init() {
	console.log("Initialising platform");
	const browser: BrowserInitConfig = {};
	browser.overrideCallback = overrideCallback;

	await workspacePlatformInit({
		browser
	});
}
