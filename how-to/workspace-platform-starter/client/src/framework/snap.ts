import type OpenFin from "@openfin/core";
import * as Snap from "@openfin/snap-sdk";
import { getApp } from "./apps";
import { launchAppAsset, launchExternal } from "./launch";
import { createLogger } from "./logger-provider";
import { MANIFEST_TYPES } from "./manifest-types";
import * as platformSplashProvider from "./platform/platform-splash";
import type { SnapProviderOptions } from "./shapes";
import { formatError, isEmpty } from "./utils";
import { getCanDownloadAppAssets, getCanLaunchExternalProcess } from "./utils-capability";

const logger = createLogger("Snap");
const NATIVE_APP_PREFIX = "app:";

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

		const src = serverAssetInfo.src;
		if (isEmpty(src)) {
			logger.error("Cannot initialize Snap without the SnapProvider.serverAssetInfo.src");
			return;
		}

		const alias = serverAssetInfo.alias;
		if (isEmpty(alias)) {
			logger.error("Cannot initialize Snap without the SnapProvider.serverAssetInfo.alias");
			return;
		}

		const target = serverAssetInfo.target;
		if (isEmpty(target)) {
			logger.error("Cannot initialize Snap without the SnapProvider.serverAssetInfo.target");
			return;
		}

		const version = serverAssetInfo.version;
		if (isEmpty(version)) {
			logger.error("Cannot initialize Snap without the SnapProvider.serverAssetInfo.version");
			return;
		}

		if (serverAssetInfo.src === "SNAP_ASSET_URL") {
			logger.error(
				"Please request the SNAP_ASSET_URL from OpenFin and update SnapProvider.serverAssetInfo.src before running the platform"
			);
			return;
		}

		const hasLaunchExternalProcess = await getCanLaunchExternalProcess(logger);
		const hasDownloadAppAssets = await getCanDownloadAppAssets(logger);

		if (!hasLaunchExternalProcess || !hasDownloadAppAssets) {
			logger.warn(
				"Snap is enabled but the platform does not have the capability or permission to download app assets or launch external processes."
			);
			return;
		}

		try {
			await platformSplashProvider.updateProgress("Snap");

			await fin.System.downloadAsset(serverAssetInfo, (progress) => {
				const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
				logger.info(`Downloaded ${downloadedPercent}% of Snap Server asset`);
			});

			const serverAssetExecutablePath = await getAppAssetExecutablePath({
				alias,
				target,
				version
			});

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
 * @returns List of existing app ids with their windows.
 */
export async function prepareToApplyDecoratedSnapshot(): Promise<Snap.LayoutClient[]> {
	try {
		if (server) {
			// Don't call prepareToApplySnapshot as this will unregister all the existing clients
			// and we might want to re-use them, instead we will retain the native apps
			// and set an empty layout
			// await server.prepareToApplySnapshot();

			const layout = await server.getLayout();
			const appOnlyLayout: Snap.SnapLayout = {
				clients: layout.clients.filter((c) => c.id.startsWith(NATIVE_APP_PREFIX)),
				connections: [],
				version: layout.version
			};
			await server.setLayout(appOnlyLayout);

			return appOnlyLayout.clients;
		}
	} catch (error) {
		console.error("Failed to prepare decorated snapshot.", formatError(error));
	}
	return [];
}

/**
 * Apply a decorated snapshot.
 * @param snapshot The snapshot to apply.
 * @param existingApps A list of the existing apps registered with snap.
 */
export async function applyDecoratedSnapshot(
	snapshot: OpenFin.Snapshot,
	existingApps: Snap.LayoutClient[]
): Promise<void> {
	try {
		const snapSnapshot = snapshot as Snap.SnapSnapshot;

		if (server && !isEmpty(snapSnapshot.snap)) {
			const remainingClients: Snap.LayoutClient[] = [];
			const launchClients: Snap.LayoutClient[] = [];

			// First pass use existing apps that match the appId and instanceId
			for (const client of snapSnapshot.snap.clients) {
				if (client.id.startsWith(NATIVE_APP_PREFIX)) {
					const existingAppIndex = existingApps.findIndex((c) => c.id === client.id);
					if (existingAppIndex >= 0) {
						// The app is already launched so no need to launch it again
						// remove it from the list
						existingApps.splice(existingAppIndex, 1);
					} else {
						remainingClients.push(client);
					}
				}
			}

			// All we have remaining are apps that don't match exactly
			// see if there are any that match just the app id
			for (const client of remainingClients) {
				const parts = client.id.split("/");
				const appId = parts[1];

				const existingAppIndex = existingApps.findIndex((e) => e.id.includes(`/${appId}/`));
				if (existingAppIndex >= 0) {
					// We found a matching app, so substitute the instance id into the snapshot data
					// updating both the connection and the client id
					for (const connection of snapSnapshot.snap.connections) {
						// TODO - Remove these any casts when the TS defs are corrected in snap sdk
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						if ((connection as any).attachedClientId === client.id) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(connection as any).attachedClientId = existingApps[existingAppIndex];
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
						} else if ((connection as any).targetClientId === client.id) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(connection as any).targetClientId = existingApps[existingAppIndex];
						}
					}
					client.id = existingApps[existingAppIndex].id;

					existingApps.splice(existingAppIndex, 1);
				} else {
					// No existing matching appIds we can use, so the app will need launching
					launchClients.push(client);
				}
			}

			// For all remaining apps that we haven't used add them in to the layout minimized
			for (const existingApp of existingApps) {
				existingApp.state = "minimized";
				snapSnapshot.snap.clients.push(existingApp);
			}

			// Now launch the remaining apps
			for (const launchClient of launchClients) {
				const parts = launchClient.id.split("/");
				const appId = parts[1];
				const instanceId = parts[2];

				const app = await getApp(appId);
				if (app) {
					if (
						app.manifestType === MANIFEST_TYPES.External.id ||
						app.manifestType === MANIFEST_TYPES.InlineExternal.id
					) {
						await launchExternal(app, instanceId);
					} else if (
						app.manifestType === MANIFEST_TYPES.Appasset.id ||
						app.manifestType === MANIFEST_TYPES.InlineAppAsset.id
					) {
						await launchAppAsset(app, instanceId);
					}
				} else {
					logger.error(`Unable to find app with id ${appId} to relaunch it`);
				}
			}

			await server.applySnapshot(snapshot as Snap.SnapSnapshot);
		}
	} catch (error) {
		console.error("Failed to apply decorated snapshot.", formatError(error));
	}
}

/**
 * Launch an application.
 * @param path The path to the application.
 * @param args The args to launch the app with.
 * @param launchStrategy The launch strategy for the application.
 * @param appId The id to associated with the app.
 * @param instanceId The instance if for the app.
 * @returns The id of the launched app.
 */
export async function launchApp(
	path: string,
	args: string[] | undefined,
	launchStrategy: Snap.LaunchStrategy | undefined,
	appId: string,
	instanceId: string
): Promise<string | undefined> {
	try {
		if (server) {
			const clientId = `${NATIVE_APP_PREFIX}/${appId}/${instanceId}`;
			let launch = true;

			if (appId === instanceId) {
				// If appId is the same as instanceId this is a singleton app
				// so check the current snap layout to see if the app is
				// already launched so we don't launch it again
				const layout = await server.getLayout();
				const existingClientIndex = layout.clients.findIndex((c) => c.id === clientId);
				if (existingClientIndex >= 0) {
					launch = false;

					// If the window is minimized set its state to normal
					// TODO Would also be nice to bring this to front, will need a snap
					// enhancement for this
					if (layout.clients[existingClientIndex].state === "minimized") {
						layout.clients[existingClientIndex].state = "normal";
						await server.setLayout(layout);
					}
				}
			}

			if (launch) {
				await server.launch({
					path,
					clientId,
					args,
					strategy: launchStrategy
				});
			}

			return clientId;
		}
	} catch (error) {
		console.error("Failed to launch app.", formatError(error));
	}
}

/**
 * Get the executable path for an app asset.
 * @param appAssetInfo The app asset information.
 * @param appAssetInfo.alias The app asset alias information.
 * @param appAssetInfo.version The app asset version information.
 * @param appAssetInfo.target The app asset target information.
 * @returns The native path for the asset.
 */
export async function getAppAssetExecutablePath(appAssetInfo: {
	alias: string;
	version: string;
	target: string;
}): Promise<string> {
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
