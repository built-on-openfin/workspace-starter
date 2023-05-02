import { init as workspacePlatformInit, type BrowserInitConfig } from "@openfin/workspace-platform";
import { interopOverride } from "./interopbroker";

export async function init() {
	console.log("Initialising platform");

	const browser: BrowserInitConfig = {
		title: "Bloomberg Test Harness",
		defaultWindowOptions: {
			icon: "http://localhost:8080/favicon-32x32.png"
		},
		defaultPageOptions: {
			closeButton: {
				hidden: true
			}
		}
	};

	await workspacePlatformInit({
		browser,
		interopOverride
	});
}
