import { init as workspacePlatformInit, BrowserInitConfig } from "@openfin/workspace-platform";
import { interopOverride } from "./interopbroker";

export async function init() {
	console.log("Initialising platform");

	const browser: BrowserInitConfig = {};

	await workspacePlatformInit({
		browser,
		interopOverride
	});
}
