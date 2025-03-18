import type OpenFin from "@openfin/core";
import * as Snap from "@openfin/snap-sdk";
import { getSettings } from "../settings";
import type { SnapProviderOptions } from "../shapes";

/**
 * Initialize the snap components.
 * @param options The options for initializing the snap provider.
 * @param createLayoutChannel Whether to create a simple channel api service that exposes the getLayout and applyLayout functionality of snap.
 */
export async function initialize(
	options: SnapProviderOptions,
	createLayoutChannel: boolean = false
): Promise<void> {
	const settings = await getSettings();
	const settingsServerOptions = settings?.serverOptions ?? {};
	const passedOptions = options?.serverOptions ?? {};
	const finalOptions = { ...settingsServerOptions, ...passedOptions };
	const finalPlatformId = options?.platformId ?? settings?.platformId;
	try {
		if (finalPlatformId) {
			console.log("Registering Snap with platformId", finalPlatformId);
			const server = new Snap.SnapServer(finalPlatformId);
			console.log("Enabling debug window:", finalOptions.showDebug ?? false);
			await server.start(finalOptions);
			if (createLayoutChannel) {
				try {
					const channelName = `${fin.me.identity.uuid}-snap-layout`;
					console.log(`Creating snap preload layout channel: ${channelName}`);
					const channel = await fin.InterApplicationBus.Channel.create(channelName);
					channel.register("getLayout", async () => {
						console.log("Getting layout from Snap");
						const layout = await server.getLayout();
						console.log("Got layout from Snap", layout);
						return layout;
					});
					channel.register("applyLayout", async (payload: unknown) => {
						console.log("Applying layout to Snap", payload);
						console.log("Preparing to apply snapshot");
						await server.prepareToApplySnapshot();
						console.log("Applying snapshot");
						await server.applySnapshot(payload as Snap.SnapSnapshot);
						console.log("Applied snapshot");
					});

					setTimeout(async () => {
						try {
							console.log("Connecting to snap preload layout channel to validate connection.");
							const clientChannelName = `${fin.me.identity.uuid}-snap-layout`;
							const snapPreloadClient = await fin.InterApplicationBus.Channel.connect(clientChannelName);

							// fetch the current snap layout
							const layout = (await snapPreloadClient.dispatch("getLayout")) as Snap.SnapLayout;
							console.log("Got layout from Snap", layout);

							// apply the layout
							await snapPreloadClient.dispatch("applyLayout", layout);
							console.log("Applied layout to Snap");
						} catch (clientError) {
							console.error("Error connecting to snap preload layout channel", clientError);
						}
					}, 1000);
				} catch (err) {
					console.error("Error creating snap layout channel", err);
				}
			}
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
