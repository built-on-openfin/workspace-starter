import type OpenFin from "@openfin/core";
import * as Snap from "@openfin/snap-sdk";
import type { SnapProviderOptions } from "./shapes";

if (window === window.top) {
	console.log("Adding snap support through a preload.");

	window.addEventListener("DOMContentLoaded", async () => {
		await initialize({ platformId: fin.me.identity.uuid, showDebugWindow: true });
	});
}

/**
 * Initialize the snap components.
 * @param options The options for initializing the snap provider.
 */
export async function initialize(options: SnapProviderOptions): Promise<void> {
	try {
		if (options.platformId) {
			console.log("Registering Snap with platformId", options.platformId);
			const server = new Snap.SnapServer(options.platformId);
			console.log("Enabling debug window:", options.showDebugWindow ?? false);
			await server.start({ showDebug: options.showDebugWindow ?? false });
			const app = fin.Application.getCurrentSync();
			await app.on("window-created", async (e) => {
				const win = fin.Window.wrapSync(e);
				const winOptions = await win.getOptions();
				if (!winOptions.includeInSnapshots) {
					console.log("Window is not registered with Snap because includeInSnapshots is disabled.");
				} else {
					const nativeId = await win.getNativeId();
					console.log("Registering window with NativeID with Snap", nativeId);
					await server.registerWindow(win.identity.name, nativeId);
				}
			});
			const hostOptions = (await fin.me.getOptions()) as OpenFin.WindowOptions;
			if (hostOptions.autoShow) {
				console.log("Registering current window with snap");
				await server.registerWindow(fin.me.identity.name, await fin.Window.getCurrentSync().getNativeId());
			} else {
				console.log("Current window is not registered with Snap because autoShow is disabled.");
			}
		}
	} catch (err) {
		console.error("Error initializing Snap", err);
	}
}
