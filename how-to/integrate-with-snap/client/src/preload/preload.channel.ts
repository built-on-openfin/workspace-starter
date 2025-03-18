import type { SnapProviderOptions } from "../shapes";
import { initialize } from "./preload.common";

if (window === window.top) {
	console.log("Adding snap support through a preload with layout support.");

	window.addEventListener("DOMContentLoaded", async () => {
		const snapOptions: SnapProviderOptions = {
			platformId: fin.me.identity.uuid
		};
		await initialize(snapOptions, true);
	});
}
