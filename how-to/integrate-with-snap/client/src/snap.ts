import type OpenFin from "@openfin/core";
import * as Snap from "@openfin/snap-sdk";
import { getApp, getAppAssetExecutablePath } from "./apps";
import type { AppAssetInfoWithLaunchStrategy, SnapProviderOptions } from "./shapes";
import { formatError } from "./utils";

let server: Snap.SnapServer | undefined;

/**
 * Initialize the snap components.
 * @param options The options for initializing the snap provider.
 */
export async function initialize(options: SnapProviderOptions): Promise<void> {
	try {
		if (options.platformId) {
			server = new Snap.SnapServer(options.platformId);
			await server.start({ showDebug: options.showDebugWindow ?? false });

			await server.enableAutoWindowRegistration();
		}
	} catch (err) {
		console.error("Error initializing Snap", formatError(err));
	}
}

/**
 * Launch an application using Snap.
 * @param appId An id to associate with the launched app.
 * @param instanceId An instance id to associate with the launched app.
 */
export async function launchApp(appId: string, instanceId: string): Promise<void> {
	try {
		if (server) {
			const app = await getApp(appId);
			if (app) {
				const appAssetInfo = app.manifest as AppAssetInfoWithLaunchStrategy;

				await fin.System.downloadAsset({ ...appAssetInfo, args: undefined }, (progress) => {
					const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
					console.info(`Downloaded ${downloadedPercent}% of app asset with appId of ${app.appId}`);
				});

				const appExecutablePath = await getAppAssetExecutablePath(appAssetInfo);

				console.info(`Launching ${appAssetInfo.alias}`);

				const launchResult = await server.launch({
					path: appExecutablePath,
					clientId: `@app/${appId}/${instanceId}`,
					args: appAssetInfo.args,
					strategy: appAssetInfo.launchStrategy
				});

				if (launchResult?.process_id) {
					console.info(`${appAssetInfo.alias} launched with process id ${launchResult.process_id}`);
				}
			}
		}
	} catch (err) {
		console.error(formatError(err));
	}
}

/**
 * Decorate a snapshot with the native window information.
 * @param snapshot The snapshot to decorate.
 * @returns The decorated snapshot.
 */
export async function decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
	try {
		if (server) {
			// TODO: the types in snap need to be peer dependencies so that they do not conflict with the core types used by a platform.
			snapshot = await server.decorateSnapshot(snapshot as Snap.SnapSnapshot);
		}
	} catch (error) {
		console.error("Failed to decorate snapshot.", formatError(error));
	}
	return snapshot;
}

/**
 * Prepare to apply a decorated snapshot.
 */
export async function prepareToApplyDecoratedSnapshot(): Promise<void> {
	try {
		if (server) {
			await server.prepareToApplySnapshot();
		}
	} catch (error) {
		console.error("Failed to prepare decorated snapshot.", formatError(error));
	}
}

/**
 * Apply a decorated snapshot.
 * @param snapshot The snapshot to apply.
 */
export async function applyDecoratedSnapshot(snapshot: OpenFin.Snapshot): Promise<void> {
	try {
		if (server) {
			const snapSnapshot = snapshot as Snap.SnapSnapshot;

			const clients = snapSnapshot.snap?.clients;
			if (Array.isArray(clients)) {
				for (const item of clients) {
					if (item.id.startsWith("@app")) {
						const parts = item.id.split("/");
						await launchApp(parts[1], parts[2]);
					}
				}
			}
			// TODO: the types in snap need to be peer dependencies so that they do not conflict with the core types used by a platform.
			await server.applySnapshot(snapshot as Snap.SnapSnapshot);
		}
	} catch (error) {
		console.error("Failed to apply decorated snapshot.", formatError(error));
	}
}
