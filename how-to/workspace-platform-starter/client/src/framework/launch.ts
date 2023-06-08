import type OpenFin from "@openfin/core";
import { getCurrentSync, type BrowserSnapshot } from "@openfin/workspace-platform";
import { launchConnectedApp } from "./connections";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { MANIFEST_TYPES } from "./manifest-types";
import {
	bringViewToFront,
	bringWindowToFront,
	doesViewExist,
	doesWindowExist,
	findViewNames
} from "./platform/browser";
import type { PlatformApp, PlatformAppIdentifier } from "./shapes/app-shapes";
import { isEmpty, objectClone, randomUUID } from "./utils";

const logger = createLogger("Launch");

/**
 * Launch an application in the way specified by its manifest type.
 * @param platformApp The application to launch.
 * @returns Identifiers specific to the type of application launched.
 */
export async function launch(platformApp: PlatformApp): Promise<PlatformAppIdentifier[] | undefined> {
	try {
		logger.info("Application launch requested", platformApp);

		if (isEmpty(platformApp)) {
			logger.warn("An empty app definition was passed to launch");
			return [];
		}
		const app = objectClone(platformApp);

		const platformAppIdentities: PlatformAppIdentifier[] = [];
		switch (app.manifestType) {
			case MANIFEST_TYPES.External.id:
			case MANIFEST_TYPES.InlineExternal.id: {
				const platformIdentity = await launchExternal(app);
				if (platformIdentity) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case MANIFEST_TYPES.Appasset.id:
			case MANIFEST_TYPES.InlineAppAsset.id: {
				const platformIdentity = await launchAppAsset(app);
				if (platformIdentity) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case MANIFEST_TYPES.InlineView.id:
			case MANIFEST_TYPES.View.id: {
				const platformIdentity = await launchView(app);
				if (platformIdentity) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case MANIFEST_TYPES.Window.id:
			case MANIFEST_TYPES.InlineWindow.id: {
				const platformIdentity = await launchWindow(app);
				if (platformIdentity) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case MANIFEST_TYPES.Snapshot.id:
			case MANIFEST_TYPES.InlineSnapshot.id: {
				const identities = await launchSnapshot(app);
				if (identities) {
					platformAppIdentities.push(...identities);
				}
				break;
			}
			case MANIFEST_TYPES.Manifest.id: {
				const manifestApp = await fin.Application.startFromManifest(app.manifest);
				const manifestUUID = manifestApp?.identity?.uuid;
				if (!isEmpty(manifestUUID)) {
					platformAppIdentities.push({
						uuid: manifestUUID,
						name: manifestUUID,
						appId: app.appId
					});
				}
				break;
			}
			case MANIFEST_TYPES.DesktopBrowser.id: {
				await fin.System.openUrlWithBrowser(app.manifest);
				break;
			}
			case MANIFEST_TYPES.Endpoint.id: {
				if (endpointProvider.hasEndpoint(app.manifest)) {
					const identity = await endpointProvider.requestResponse<{ payload: PlatformApp }, OpenFin.Identity>(
						app.manifest,
						{ payload: app }
					);
					if (isEmpty(identity)) {
						logger.warn(
							`App with id: ${app.appId} encountered when launched using endpoint: ${app.manifest}.`
						);
					} else {
						platformAppIdentities.push({ ...identity, appId: app.appId });
					}
				} else {
					logger.warn(
						`App with id: ${app.appId} could not be launched as it is of manifestType: ${app.manifestType} and the endpoint: ${app.manifest} is not available.`
					);
				}
				break;
			}
			case MANIFEST_TYPES.Connection.id: {
				logger.info(
					"An app defined by a connection (connected app) has been selected. Passing selection to connection"
				);
				const identity = await launchConnectedApp(app);
				if (!isEmpty(identity)) {
					platformAppIdentities.push({ ...identity, appId: app.appId });
				}
				break;
			}
			default: {
				logger.error("We do not support the manifest type so this app cannot be launched.", app);
			}
		}

		logger.info("Finished application launch request");
		return platformAppIdentities;
	} catch (err) {
		logger.error("Failed during application launch request", err);
	}
}

/**
 * Bring the applications views to the front.
 * @param platformApp The application to bring to the front.
 * @param platformAppIdentifiers Additional app identifiers to bring to the front.
 */
export async function bringToFront(
	platformApp: PlatformApp,
	platformAppIdentifiers: PlatformAppIdentifier[]
): Promise<void> {
	switch (platformApp.manifestType) {
		case MANIFEST_TYPES.External.id:
		case MANIFEST_TYPES.InlineExternal.id:
		case MANIFEST_TYPES.Manifest.id:
		case MANIFEST_TYPES.DesktopBrowser.id:
		case MANIFEST_TYPES.Endpoint.id:
		case MANIFEST_TYPES.Connection.id: {
			logger.info(`Bringing apps of type: ${platformApp.manifestType} to front is not supported.`);
			break;
		}
		case MANIFEST_TYPES.InlineView.id:
		case MANIFEST_TYPES.View.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length === 1) {
				await bringViewToFront({ identity: platformAppIdentifiers[0] });
			} else {
				logger.warn(
					`A request to bring a view app to front was received but we didn't receive exactly one identity for app: ${platformApp.appId}.`
				);
			}
			break;
		}
		case MANIFEST_TYPES.Window.id:
		case MANIFEST_TYPES.InlineWindow.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length === 1) {
				await bringWindowToFront({ identity: platformAppIdentifiers[0] });
			} else {
				logger.warn(
					`A request to bring a window app to front was received but we didn't receive exactly one identity for app: ${platformApp.appId}.`
				);
			}
			break;
		}
		case MANIFEST_TYPES.UnregisteredApp.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length === 1) {
				// isView - this should be the majority of cases for an unregistered app
				let isView = true;
				try {
					const view = fin.View.wrapSync(platformAppIdentifiers[0]);
					const viewInfo = await view.getInfo();
					logger.info("View Info", viewInfo);
				} catch {
					isView = false;
				}
				if (isView) {
					await bringViewToFront({ identity: platformAppIdentifiers[0] });
				} else {
					await bringWindowToFront({ identity: platformAppIdentifiers[0] });
				}
			} else {
				logger.warn(
					`A request to bring a window app to front was received but we didn't receive exactly one identity for app: ${platformApp.appId}.`
				);
			}
			break;
		}
		case MANIFEST_TYPES.Snapshot.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length > 0) {
				for (const identity of platformAppIdentifiers) {
					await bringViewToFront({ identity });
				}
			} else {
				logger.warn(
					`A request to bring a snapshot app to front was received but we didn't receive at least one view for app: ${platformApp.appId}.`
				);
			}
			break;
		}
		default: {
			logger.error(
				"We do not support the manifest type so this app cannot be brought to front.",
				platformApp
			);
		}
	}
}

/**
 * Get the platform app identifiers of all the views in a window.
 * @param name The identity name of the window.
 * @param uuid The identity uuid of the window.
 * @param appId The application to map the view identities with.
 * @returns List of platform app identifiers.
 */
async function getViewIdentities(
	name: string,
	uuid: string,
	appId: string
): Promise<PlatformAppIdentifier[]> {
	const identity = { uuid, name };
	const win = fin.Window.wrapSync(identity);
	const views = await win.getCurrentViews();
	const viewIdentities = views.map((view) => ({ ...view.identity, appId }));
	await win.setAsForeground();
	return viewIdentities;
}

/**
 * Get a manifest as either a string or a specific object type.
 * @param platformApp The application to get the manifest from.
 * @returns The manifest object.
 */
function getManifest<T>(platformApp: PlatformApp): T {
	if (typeof platformApp.manifest === "string" && platformApp.manifest.startsWith("{")) {
		return JSON.parse(platformApp.manifest) as T;
	}

	return platformApp.manifest as T;
}

/**
 * Launch a window for the platform app.
 * @param windowApp The app to launch the window for.
 * @returns The identity of the window launched.
 */
async function launchWindow(windowApp: PlatformApp): Promise<PlatformAppIdentifier | undefined> {
	if (isEmpty(windowApp)) {
		logger.warn("No app was passed to launchWindow");
		return;
	}

	if (
		windowApp.manifestType !== MANIFEST_TYPES.Window.id &&
		windowApp.manifestType !== MANIFEST_TYPES.InlineWindow.id
	) {
		logger.warn(
			`The app passed was not of manifestType ${MANIFEST_TYPES.Window.id} or ${MANIFEST_TYPES.InlineWindow.id}.`
		);
		return;
	}
	let manifest: OpenFin.WindowOptions;

	if (windowApp.manifestType === MANIFEST_TYPES.Window.id) {
		const manifestResponse = await fetch(windowApp.manifest);
		manifest = await manifestResponse.json();
	} else {
		// conversion because of manifestType. In most use cases manifest is always a path to an executable or to a manifest file. For classic windows we are demonstrating how it could be used
		// for passing the manifest inline
		manifest = getManifest(windowApp);
	}

	let name = manifest.name;
	let wasNameSpecified = !isEmpty(name);

	if (!wasNameSpecified && windowApp?.instanceMode === "single") {
		logger.info(
			`A unique name was not provided in the manifest of this window but the custom config indicates that this app is supposed to have a single instance so we are using the appId: ${windowApp.appId} as the unique name.`
		);
		name = windowApp.appId;
		// assign the new name to the manifest in case the view doesn't exist yet (as it is dynamically allocated and not part of the app's manifest)
		manifest.name = name;
		wasNameSpecified = true;
	} else if (!wasNameSpecified) {
		name = `${windowApp.appId}/${randomUUID()}`;
		manifest.name = name;
	}

	let identity = { uuid: fin.me.identity.uuid, name };

	let windowExists = false;

	if (wasNameSpecified) {
		windowExists = await doesWindowExist(identity, true);
	}

	if (!windowExists) {
		try {
			const platform = getCurrentSync();
			const createdWindow = await platform.createWindow(manifest);
			identity = createdWindow.identity;
			await bringWindowToFront({ window: createdWindow });
		} catch (err) {
			logger.error("Error launching window", err);
			return;
		}
	}
	return { ...identity, appId: windowApp.appId };
}

/**
 * Launch a view for the platform app.
 * @param viewApp The app to launch the view for.
 * @returns The identity of the view launched.
 */
async function launchView(viewApp: PlatformApp): Promise<PlatformAppIdentifier | undefined> {
	if (isEmpty(viewApp)) {
		logger.warn("No app was passed to launchView");
		return;
	}

	if (
		viewApp.manifestType !== MANIFEST_TYPES.View.id &&
		viewApp.manifestType !== MANIFEST_TYPES.InlineView.id
	) {
		logger.warn(
			`The app passed was not of manifestType ${MANIFEST_TYPES.View.id} or ${MANIFEST_TYPES.InlineView.id}.`
		);
		return;
	}
	let manifest: OpenFin.ViewOptions;

	if (viewApp.manifestType === MANIFEST_TYPES.View.id) {
		const manifestResponse = await fetch(viewApp.manifest);
		manifest = await manifestResponse.json();
	} else {
		// conversion because of manifestType. In most use cases manifest is always a path to an executable or to a manifest file. For views we are demonstrating how it could be used
		// for passing the manifest inline
		manifest = getManifest(viewApp);
	}

	let name = manifest.name;

	let wasNameSpecified = !isEmpty(name);

	if (!wasNameSpecified && viewApp?.instanceMode === "single") {
		logger.info(
			`A unique name was not provided in the manifest of this view but the custom config indicates that this app is supposed to have a single instance so we are using the appId: ${viewApp.appId} as the unique name.`
		);
		name = viewApp.appId;
		// assign the new name to the manifest in case the view doesn't exist yet (as it is dynamically allocated and not part of the app's manifest)
		manifest.name = name;
		wasNameSpecified = true;
	} else if (!wasNameSpecified) {
		name = `${viewApp.appId}/${randomUUID()}`;
		manifest.name = name;
	}

	let identity = { uuid: fin.me.identity.uuid, name };

	let viewExists = false;

	if (wasNameSpecified) {
		viewExists = await doesViewExist(identity, true);
	}

	if (!viewExists) {
		try {
			const platform = getCurrentSync();
			const createdView = await platform.createView(manifest);
			identity = createdView.identity;
		} catch (err) {
			logger.error("Error launching view", err);
			return;
		}
	}
	return { ...identity, appId: viewApp.appId };
}

/**
 * Launch a snapshot for the platform app.
 * @param snapshotApp The app to launch snapshot view for.
 * @returns The identities of the snapshot parts launched.
 */
async function launchSnapshot(snapshotApp: PlatformApp): Promise<PlatformAppIdentifier[] | undefined> {
	if (isEmpty(snapshotApp)) {
		logger.warn("No app was passed to launchSnapshot");
		return;
	}

	if (
		snapshotApp.manifestType !== MANIFEST_TYPES.Snapshot.id &&
		snapshotApp.manifestType !== MANIFEST_TYPES.InlineSnapshot.id
	) {
		logger.warn(
			`The app passed was not of manifestType ${MANIFEST_TYPES.Snapshot.id} or ${MANIFEST_TYPES.InlineSnapshot.id}`
		);
		return;
	}

	let manifest: BrowserSnapshot;

	if (snapshotApp.manifestType === MANIFEST_TYPES.Snapshot.id) {
		logger.info(`Fetching snapshot for app ${snapshotApp.appId} from url: ${snapshotApp.manifest}`);
		const manifestResponse = await fetch(snapshotApp.manifest);
		manifest = await manifestResponse.json();
	} else {
		logger.info(`Using snapshot defined in manifest setting of app ${snapshotApp.appId}`);
		manifest = getManifest(snapshotApp);
	}

	const windows = manifest.windows;
	const windowsToCreate = [];

	if (Array.isArray(windows)) {
		const windowsToGather: string[] = [];
		const viewIds: PlatformAppIdentifier[] = [];

		for (const currentWindow of windows) {
			const getViewIdsForLayout = findViewNames(currentWindow.layout);
			if (getViewIdsForLayout.length === 0) {
				const uuid = randomUUID();
				const name = `${snapshotApp.appId}/${uuid}`;
				currentWindow.name = name;
				windowsToCreate.push(currentWindow);
				windowsToGather.push(name);
			} else {
				// we have views. Grab the first one to validate existence.
				const viewId = getViewIdsForLayout[0];

				for (const entry of getViewIdsForLayout) {
					viewIds.push({ name: entry, uuid: fin.me.identity.uuid, appId: snapshotApp.appId });
				}

				// these views should be readonly and cannot be pulled out of the page or closed
				if (!(await doesViewExist({ name: viewId, uuid: fin.me.identity.uuid }))) {
					windowsToCreate.push(currentWindow);
				}
			}
		}

		manifest.windows = windowsToCreate;

		if (windowsToCreate.length > 0) {
			const platform = getCurrentSync();
			try {
				await platform.applySnapshot(manifest);
			} catch (err) {
				logger.error("Error trying to apply snapshot to platform", err, manifest);
			}
		}

		for (const targetWindow of windowsToGather) {
			const windowViewIds = await getViewIdentities(targetWindow, fin.me.identity.uuid, snapshotApp.appId);
			viewIds.push(...windowViewIds);
		}

		return viewIds;
	}
}

/**
 * Launch an app asset for the platform app.
 * @param appAssetApp The app to launch app asset view for.
 * @returns The identities of the snapshot parts launched.
 */
async function launchAppAsset(appAssetApp: PlatformApp): Promise<PlatformAppIdentifier | undefined> {
	const options: OpenFin.ExternalProcessRequestType = {};
	logger.info(`Request to launch app asset app of type ${appAssetApp.manifestType}`);
	if (appAssetApp.manifestType === MANIFEST_TYPES.Appasset.id) {
		options.alias = appAssetApp.manifest;
	} else if (appAssetApp.manifestType === MANIFEST_TYPES.InlineAppAsset.id) {
		const appAssetInfo: OpenFin.AppAssetInfo = getManifest(appAssetApp);
		try {
			await fin.System.downloadAsset(appAssetInfo, (progress) => {
				const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
				logger.info(`Downloaded ${downloadedPercent}% of app asset with appId of ${appAssetApp.appId}`);
			});
		} catch (error) {
			logger.error(`Error trying to download app asset with app id: ${appAssetApp.appId}`, error);
			return;
		}
		options.alias = appAssetInfo.alias;
		options.arguments = appAssetInfo.args;
	} else {
		logger.warn(
			"An app asset app was passed to launch app asset but it didn't match the supported manifest types."
		);
		return;
	}
	if (appAssetApp.instanceMode === "single") {
		// use the appId as the UUID and OpenFin will only be able to launch a single instance
		options.uuid = appAssetApp.appId;
	}
	logger.info(`Launching app asset with appId: ${appAssetApp.appId} with the following options:`, options);
	try {
		const identity = await fin.System.launchExternalProcess(options);
		logger.info(`App asset with appId: ${appAssetApp.appId} launched with the following identity`, identity);
		return { ...identity, appId: appAssetApp.appId };
	} catch (error) {
		logger.error(`Error trying to launch app asset with appId: ${appAssetApp.appId}}`, error);
	}
}

/**
 * Launch an external for the platform app.
 * @param externalApp The app to launch external view for.
 * @returns The identities of the snapshot parts launched.
 */
async function launchExternal(externalApp: PlatformApp): Promise<PlatformAppIdentifier | undefined> {
	let options: OpenFin.ExternalProcessRequestType = {};
	logger.info(`Request to external app of type ${externalApp.manifestType}`);
	if (externalApp.manifestType === MANIFEST_TYPES.External.id) {
		options.path = externalApp.manifest;
	} else if (externalApp.manifestType === MANIFEST_TYPES.InlineExternal.id) {
		options = getManifest(externalApp);
	} else {
		logger.warn("An external app was passed to launch but it didn't match the supported manifest types.");
		return;
	}
	if (externalApp.instanceMode === "single") {
		// use the appId as the UUID and OpenFin will only be able to launch a single instance
		options.uuid = externalApp.appId;
	}
	try {
		const identity = await fin.System.launchExternalProcess(options);
		return { ...identity, appId: externalApp.appId };
	} catch (err) {
		logger.error(`Error trying to launch external with appId: ${externalApp.appId}`, err);
	}
}
