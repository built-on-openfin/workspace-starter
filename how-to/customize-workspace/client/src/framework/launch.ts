import type OpenFin from "@openfin/core";
import { BrowserSnapshot, getCurrentSync } from "@openfin/workspace-platform";
import { launchConnectedApp } from "./connections";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";
import {
	bringViewToFront,
	bringWindowToFront,
	doesViewExist,
	doesWindowExist,
	findViewNames
} from "./platform/browser";
import { getSettings } from "./settings";
import type { PlatformApp, PlatformAppIdentifier } from "./shapes/app-shapes";
import { randomUUID } from "./uuid";

const logger = createLogger("Launch");

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

function decoupleApp(app: PlatformApp) {
	if (app === undefined || app === null) {
		logger.warn("No app was passed to decoupleApp");
		return app;
	}
	return JSON.parse(JSON.stringify(app)) as PlatformApp;
}

async function launchWindow(windowApp: PlatformApp): Promise<PlatformAppIdentifier> {
	if (windowApp === undefined || windowApp === null) {
		logger.warn("No app was passed to launchWindow");
		return null;
	}

	if (
		windowApp.manifestType !== manifestTypes.window.id &&
		windowApp.manifestType !== manifestTypes.inlineWindow.id
	) {
		logger.warn(
			`The app passed was not of manifestType ${manifestTypes.window.id} or ${manifestTypes.inlineWindow.id}.`
		);
		return null;
	}
	let manifest: OpenFin.WindowOptions;

	if (windowApp.manifestType === manifestTypes.window.id) {
		const manifestResponse = await fetch(windowApp.manifest);
		manifest = await manifestResponse.json();
	} else {
		// conversion because of manifestType. In most use cases manifest is always a path to an executable or to a manifest file. For classic windows we are demonstrating how it could be used
		// for passing the manifest inline
		manifest = windowApp.manifest as unknown as OpenFin.WindowOptions;
	}

	let name = manifest.name;
	let wasNameSpecified = name !== undefined;

	if (!wasNameSpecified && windowApp?.customConfig?.instanceMode === "single") {
		logger.info(
			`A unique name was not provided in the manifest of this window but the custom config indicates that this app is supposed to have a single instance so we are using the appId: ${windowApp.appId} as the unique name.`
		);
		name = windowApp.appId;
		wasNameSpecified = true;
	}

	let identity = { uuid: fin.me.identity.uuid, name };

	let windowExists = false;

	if (wasNameSpecified) {
		windowExists = await doesWindowExist(identity.name, identity.uuid, true);
	} else {
		manifest.name = `${windowApp.appId}/${randomUUID()}`;
		identity.name = manifest.name;
	}

	if (!windowExists) {
		try {
			const createdWindow = await fin.Window.create(manifest);
			identity = createdWindow.identity;
			await bringWindowToFront({ window: createdWindow });
		} catch (err) {
			logger.error("Error launching window", err);
			return null;
		}
	}
	return { ...identity, appId: windowApp.appId };
}

async function launchView(viewApp: PlatformApp): Promise<PlatformAppIdentifier> {
	if (viewApp === undefined || viewApp === null) {
		logger.warn("No app was passed to launchView");
		return null;
	}

	if (
		viewApp.manifestType !== manifestTypes.view.id &&
		viewApp.manifestType !== manifestTypes.inlineView.id
	) {
		logger.warn(
			`The app passed was not of manifestType ${manifestTypes.view.id} or ${manifestTypes.inlineView.id}.`
		);
		return null;
	}
	let manifest: OpenFin.ViewOptions;

	if (viewApp.manifestType === manifestTypes.view.id) {
		const manifestResponse = await fetch(viewApp.manifest);
		manifest = await manifestResponse.json();
	} else {
		// conversion because of manifestType. In most use cases manifest is always a path to an executable or to a manifest file. For views we are demonstrating how it could be used
		// for passing the manifest inline
		manifest = viewApp.manifest as unknown as OpenFin.ViewOptions;
	}

	let name = manifest.name;
	let wasNameSpecified = name !== undefined;

	if (!wasNameSpecified && viewApp?.customConfig?.instanceMode === "single") {
		logger.info(
			`A unique name was not provided in the manifest of this view but the custom config indicates that this app is supposed to have a single instance so we are using the appId: ${viewApp.appId} as the unique name.`
		);
		name = viewApp.appId;
		wasNameSpecified = true;
	}

	let identity = { uuid: fin.me.identity.uuid, name };

	let viewExists = false;

	if (wasNameSpecified) {
		viewExists = await doesViewExist(identity.name, identity.uuid, true);
	} else {
		manifest.name = `${viewApp.appId}/${randomUUID()}`;
	}

	if (!viewExists) {
		try {
			const platform = getCurrentSync();
			const createdView = await platform.createView(manifest);
			const info = await createdView.getInfo();
			console.log(info);
			identity = createdView.identity;
			const infos = await fin.System.getEntityInfo(identity.uuid, identity.name);
			console.log("Infos:", infos);
		} catch (err) {
			logger.error("Error launching view", err);
			return null;
		}
	}
	return { ...identity, appId: viewApp.appId };
}

async function launchSnapshot(snapshotApp: PlatformApp): Promise<PlatformAppIdentifier[]> {
	if (snapshotApp === undefined || snapshotApp === null) {
		logger.warn("No app was passed to launchSnapshot");
		return null;
	}

	if (snapshotApp.manifestType !== manifestTypes.snapshot.id) {
		logger.warn(`The app passed was not of manifestType ${manifestTypes.snapshot.id}`);
		return null;
	}

	const manifestResponse = await fetch(snapshotApp.manifest);
	const manifest: BrowserSnapshot = await manifestResponse.json();

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
				if (!(await doesViewExist(viewId, fin.me.identity.uuid, false))) {
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

	return null;
}

export async function launch(platformApp: PlatformApp): Promise<PlatformAppIdentifier[]> {
	try {
		logger.info("Application launch requested", platformApp);

		if (platformApp === undefined || platformApp === null) {
			logger.warn("An empty app definition was passed to launch");
			return [];
		}
		const app = decoupleApp(platformApp);

		const platformAppIdentities: PlatformAppIdentifier[] = [];
		switch (app.manifestType) {
			case manifestTypes.external.id: {
				const settings = await getSettings();
				const appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";
				const options: OpenFin.ExternalProcessRequestType = {};

				if (app.tags?.includes(appAssetTag)) {
					logger.info(
						`Application requested is a native app with a tag of ${appAssetTag} so it is provided by this workspace platform. Managing request via platform and not Workspace`
					);
					options.alias = app.manifest;
					options.uuid = app.appId;
				} else {
					logger.info(
						"Application requested is a native app. Managing request via platform and not Workspace"
					);
					options.path = app.manifest;
					options.uuid = app.appId;
				}
				const identity = await fin.System.launchExternalProcess(options);
				platformAppIdentities.push({ ...identity, appId: app.appId });
				break;
			}
			case manifestTypes.inlineExternal.id: {
				logger.info(
					"Application requested is a native app defined as inline-external. Managing request via platform and not Workspace."
				);
				try {
					const options = app.manifest as OpenFin.ExternalProcessRequestType;
					const identity = await fin.System.launchExternalProcess(options);
					platformAppIdentities.push({ ...identity, appId: app.appId });
				} catch (err) {
					logger.error(`Error trying to launch inline-external with appId: ${app.appId}`, err);
				}
				break;
			}
			case manifestTypes.inlineView.id:
			case manifestTypes.view.id: {
				const platformIdentity = await launchView(app);
				if (platformIdentity !== null) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case manifestTypes.window.id:
			case manifestTypes.inlineWindow.id: {
				const platformIdentity = await launchWindow(app);
				if (platformIdentity !== null) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case manifestTypes.snapshot.id: {
				const identities = await launchSnapshot(app);
				if (identities !== null && identities !== undefined) {
					platformAppIdentities.push(...identities);
				}
				break;
			}
			case manifestTypes.manifest.id: {
				const manifest = await fin.System.launchManifest(app.manifest);
				if (manifest?.platform?.uuid !== undefined) {
					platformAppIdentities.push({
						uuid: manifest.platform.uuid,
						name: manifest.platform.uuid,
						appId: app.appId
					});
				} else if (manifest?.startup_app?.uuid !== undefined) {
					platformAppIdentities.push({
						uuid: manifest.startup_app.uuid,
						name: manifest.startup_app.uuid,
						appId: app.appId
					});
				}
				break;
			}
			case manifestTypes.desktopBrowser.id: {
				await fin.System.openUrlWithBrowser(app.manifest);
				break;
			}
			case manifestTypes.endpoint.id: {
				if (endpointProvider.hasEndpoint(app.manifest)) {
					const identity = await endpointProvider.requestResponse<{ payload: PlatformApp }, OpenFin.Identity>(
						app.manifest,
						{ payload: app }
					);
					if (identity === undefined || identity === null) {
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
			case manifestTypes.connection.id: {
				logger.info(
					"An app defined by a connection (connected app) has been selected. Passing selection to connection"
				);
				const identity = await launchConnectedApp(app);
				if (identity !== undefined && identity !== null) {
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

export async function bringToFront(appEntry: PlatformApp, platformAppIdentifiers: PlatformAppIdentifier[]) {
	switch (appEntry.manifestType) {
		case manifestTypes.external.id:
		case manifestTypes.inlineExternal.id:
		case manifestTypes.manifest.id:
		case manifestTypes.desktopBrowser.id:
		case manifestTypes.endpoint.id:
		case manifestTypes.connection.id: {
			logger.info(`Bringing apps of type: ${appEntry.manifestType} to front is not supported.`);
			break;
		}
		case manifestTypes.inlineView.id:
		case manifestTypes.view.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length === 1) {
				await bringViewToFront({ identity: platformAppIdentifiers[0] });
			} else {
				logger.warn(
					`A request to bring a view app to front was received but we didn't receive exactly one identity for app: ${appEntry.appId}.`
				);
			}
			break;
		}
		case manifestTypes.window.id:
		case manifestTypes.inlineWindow.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length === 1) {
				await bringWindowToFront({ identity: platformAppIdentifiers[0] });
			} else {
				logger.warn(
					`A request to bring a window app to front was received but we didn't receive exactly one identity for app: ${appEntry.appId}.`
				);
			}
			break;
		}
		case manifestTypes.snapshot.id: {
			if (Array.isArray(platformAppIdentifiers) && platformAppIdentifiers.length > 0) {
				for (const identity of platformAppIdentifiers) {
					await bringViewToFront({ identity });
				}
			} else {
				logger.warn(
					`A request to bring a snapshot app to front was received but we didn't receive at least one view for app: ${appEntry.appId}.`
				);
			}
			break;
		}
		default: {
			logger.error("We do not support the manifest type so this app cannot be brought to front.", appEntry);
		}
	}
}
