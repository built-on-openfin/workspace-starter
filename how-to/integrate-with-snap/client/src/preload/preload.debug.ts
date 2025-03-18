import type { SnapProviderOptions } from "../shapes";
import { initialize } from "./preload.common";

if (window === window.top) {
	console.log("Adding snap support through a debug preload.");

	window.addEventListener("DOMContentLoaded", async () => {
		const snapOptions: SnapProviderOptions = {
			platformId: fin.me.identity.uuid,
			serverOptions: { showDebug: true }
		};
		await initialize(snapOptions);
	});
}
