import { init as bootstrap } from "./framework/bootstrapper";
import { init as initialisePlatform } from "./framework/platform/platform";

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => bootstrap());
	await initialisePlatform();
});
