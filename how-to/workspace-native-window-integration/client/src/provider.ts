import { fin } from "openfin-adapter/src/mock";
import { init as bootstrap } from "./bootstrapper";
import { init as initialisePlatform } from "./platform";

window.addEventListener("DOMContentLoaded", async () => {
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => bootstrap());
	await initialisePlatform();
});
