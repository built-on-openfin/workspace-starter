import type OpenFin from "@openfin/core";
import * as Snap from "@openfin/snap-sdk";
import { createLogger } from "./logger-provider";
import * as platformSplashProvider from "./platform/platform-splash";
import type { SnapProviderOptions } from "./shapes";
import { formatError, isEmpty } from "./utils";

const logger = createLogger("Snap");
let server: Snap.SnapServer | undefined;
let isSnapEnabled: boolean = false;

/**
 * Initialize the snap provider.
 * @param options Options for the snap provider.
 */
export async function init(options: SnapProviderOptions | undefined): Promise<void> {
	if (!isEmpty(options) && (options?.enabled ?? false)) {
		if (isEmpty(options?.id)) {
			logger.error("Cannot initialize Snap without the SnapProvider.id");
			return;
		}

		const serverAssetInfo = options?.serverAssetInfo;

		if (isEmpty(serverAssetInfo)) {
			logger.error("Cannot initialize Snap without the SnapProvider.serverAssetInfo");
			return;
		}

		if (isEmpty(serverAssetInfo.src)) {
			logger.error("Cannot initialize Snap without the SnapProvider.serverAssetInfo.src");
			return;
		}

		if (serverAssetInfo.src === "SNAP_ASSET_URL") {
			logger.error(
				"Please request the SNAP_ASSET_URL from OpenFin and update SnapProvider.serverAssetInfo.src before running the platform"
			);
			return;
		}

		try {
			await platformSplashProvider.updateProgress("Snap");

			await fin.System.downloadAsset(serverAssetInfo, (progress) => {
				const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
				logger.info(`Downloaded ${downloadedPercent}% of Snap Server asset`);
			});

			const serverAssetExecutablePath = await getAppAssetExecutablePath(serverAssetInfo);

			server = new Snap.SnapServer(options.id);

			await server.start({
				showDebug: options?.showDebugWindow ?? false,
				executablePath: serverAssetExecutablePath
			});

			await server.enableAutoWindowRegistration();

			isSnapEnabled = true;
		} catch (err) {
			logger.error("Unable to start Snap Server", formatError(err));
		}
	}
}

/**
 * Is snapping enabled.
 * @returns True if snapping is enabled.
 */
export function isEnabled(): boolean {
	return isSnapEnabled;
}

/**
 * Decorate a snapshot with the native window information.
 * @param snapshot The snapshot to decorate.
 * @returns The decorated snapshot.
 */
export async function decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
	try {
		if (server) {
			// @ts-expect-error - TODO correct this when OpenFin.Core becomes a peerDependency in Snap SDK
			snapshot = await server.decorateSnapshot(snapshot);
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
			await server.applySnapshot(snapshot as Snap.SnapSnapshot);
		}
	} catch (error) {
		console.error("Failed to apply decorated snapshot.", formatError(error));
	}
}

/**
 * Get the executable path for an app asset.
 * @param appAssetInfo The app asset information.
 * @returns The native path for the asset.
 */
async function getAppAssetExecutablePath(appAssetInfo: OpenFin.AppAssetInfo): Promise<string> {
	const runtimeInfo = await fin.System.getRuntimeInfo();
	// Use the local-startup-url to determine where app assets have been stored.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let localAppUrl: string = (runtimeInfo.args as any)["local-startup-url"].replace("config.json", "");
	const sep = localAppUrl.includes("\\") ? "\\" : "/";
	if (localAppUrl.endsWith(sep)) {
		localAppUrl = localAppUrl.slice(0, -1);
	}
	return [localAppUrl, "assets", appAssetInfo.alias, appAssetInfo.version, appAssetInfo.target].join(sep);
}
