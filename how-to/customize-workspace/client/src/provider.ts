import { init as bootstrap } from "./framework/bootstrapper";
import { init as initializePlatform } from "./framework/platform/platform";

export async function init(): Promise<void> {
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => bootstrap());
	await initializePlatform();
}
