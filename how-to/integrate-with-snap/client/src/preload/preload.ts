import { initialize } from "./preload.common";

if (window === window.top) {
	console.log("Adding snap support through a preload.");

	window.addEventListener("DOMContentLoaded", async () => {
		await initialize({ platformId: fin.me.identity.uuid, showDebugWindow: false });
	});
}
