import type OpenFin from "@openfin/core";
import { BrowserSnapshot, getCurrentSync } from "@openfin/workspace-platform";
import { launchConnectedApp } from "./connections";
import * as endpointProvider from "./endpoint";
import { createLogger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";
import { getSettings } from "./settings";
import type { PlatformApp, PlatformAppIdentifier } from "./shapes/app-shapes";
import { randomUUID } from "./uuid";

const logger = createLogger("Launch");

async function getViewIdentities(name: string, uuid: string, appId: string): Promise<PlatformAppIdentifier[]> {
	const identity = { uuid, name };
	const win = fin.Window.wrapSync(identity);
	const views = await win.getCurrentViews();
	const viewIdentities = views.map((view) => ({ ...view.identity, appId }));
	await win.setAsForeground();
	return viewIdentities;
}

async function doesViewExist(name: string, uuid: string) {
	const view = fin.View.wrapSync({ name, uuid });
	let exists = false;
	try {
		await view.getInfo();
		const viewHost = await view.getCurrentWindow();
		await viewHost.bringToFront();
		exists = true;
	} catch {
		exists = false;
	}
	return exists;
}

async function doesWindowExist(name: string, uuid: string) {
	const win = fin.Window.wrapSync({ name, uuid });
	let exists = false;
	try {
		await win.getInfo();
		exists = true;
		if (await win.isShowing()) {
			await win.bringToFront();
		}
	} catch {
		exists = false;
	}
	return exists;
}

function findViewNames(layout) {
	const collectedNames: string[] = [];

	JSON.stringify(layout, (_, nestedValue) => {
		// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
		if (nestedValue?.name?.length && nestedValue.url !== undefined) {
			collectedNames.push(nestedValue.name as string);
		}
		return nestedValue as unknown;
	});

	return collectedNames;
}
export async function launchWindow(windowApp: PlatformApp): Promise<PlatformAppIdentifier> {
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

	const name = manifest.name;
	let identity = { uuid: fin.me.identity.uuid, name };
	const wasNameSpecified = name !== undefined;
	let windowExists = false;

	if (wasNameSpecified) {
		windowExists = await doesWindowExist(identity.name, identity.uuid);
	} else {
		manifest.name = `${windowApp.appId}/${randomUUID()}`;
		identity.name = manifest.name;
	}

	if (!windowExists) {
		try {
			const createdWindow = await fin.Window.create(manifest);
			identity = createdWindow.identity;
		} catch (err) {
			logger.error("Error launching window", err);
			return null;
		}
	}
	return { ...identity, appId: windowApp.appId };
}

export async function launchView(viewApp: PlatformApp): Promise<PlatformAppIdentifier> {
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

	const name = manifest.name;
	let identity = { uuid: fin.me.identity.uuid, name };
	const wasNameSpecified = name !== undefined;
	let viewExists = false;

	if (wasNameSpecified) {
		viewExists = await doesViewExist(identity.name, identity.uuid);
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

export async function launchSnapshot(snapshotApp: PlatformApp): Promise<PlatformAppIdentifier[]> {
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

		for (let i = 0; i < windows.length; i++) {
			const getViewIdsForLayout = findViewNames(windows[i].layout);
			if (getViewIdsForLayout.length === 0) {
				const uuid = randomUUID();
				const name = `${snapshotApp.appId}/${uuid}`;
				windows[i].name = name;
				windowsToCreate.push(windows[i]);
				windowsToGather.push(name);
			} else {
				// we have views. Grab the first one to validate existence.
				const viewId = getViewIdsForLayout[0];

				for (const entry of getViewIdsForLayout) {
					viewIds.push({ name: entry, uuid: fin.me.identity.uuid, appId: snapshotApp.appId });
				}

				// these views should be readonly and cannot be pulled out of the page or closed
				if (!(await doesViewExist(viewId, fin.me.identity.uuid))) {
					windowsToCreate.push(windows[i]);
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

		for (let w = 0; w < windowsToGather.length; w++) {
			const windowViewIds = await getViewIdentities(windowsToGather[w], fin.me.identity.uuid, snapshotApp.appId);
			viewIds.push(...windowViewIds);
		}

		return viewIds;
	}

	return null;
}

export async function launch(appEntry: PlatformApp): Promise<PlatformAppIdentifier[]> {
	try {
		logger.info("Application launch requested", appEntry);

		const platformAppIdentities: PlatformAppIdentifier[] = [];
		switch(appEntry.appId) {
			case manifestTypes.external.id: {
				const settings = await getSettings();
				const appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";
				const options: OpenFin.ExternalProcessRequestType = {};

				if (appEntry.tags?.includes(appAssetTag)) {
					logger.info(
						`Application requested is a native app with a tag of ${appAssetTag} so it is provided by this workspace platform. Managing request via platform and not Workspace`
					);
					options.alias = appEntry.manifest;
					options.uuid = appEntry.appId;
				} else {
					logger.info("Application requested is a native app. Managing request via platform and not Workspace");
					options.path = appEntry.manifest;
					options.uuid = appEntry.appId;
				}
				const identity = await fin.System.launchExternalProcess(options);
				platformAppIdentities.push({ ...identity, appId: appEntry.appId });
				break;
			}
			case manifestTypes.inlineExternal.id: {
				logger.info(
					"Application requested is a native app defined as inline-external. Managing request via platform and not Workspace."
				);
				try {
					const options = appEntry.manifest as OpenFin.ExternalProcessRequestType;
					const identity = await fin.System.launchExternalProcess(options);
					platformAppIdentities.push({ ...identity, appId: appEntry.appId });
				} catch (err) {
					logger.error(`Error trying to launch inline-external with appId: ${appEntry.appId}`, err);
				}
				break;
			}
			case manifestTypes.inlineView.id:
			case manifestTypes.view.id: {
				const platformIdentity = await launchView(appEntry);
				if(platformIdentity !== null) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case manifestTypes.window.id:
			case manifestTypes.inlineWindow.id: {
				const platformIdentity = await launchWindow(appEntry);
				if (platformIdentity !== null) {
					platformAppIdentities.push(platformIdentity);
				}
				break;
			}
			case manifestTypes.snapshot.id: {
				const identities = await launchSnapshot(appEntry);
				if(identities !== null && identities !== undefined) {
					platformAppIdentities.push(...identities);
				}
				break;
			}
			case manifestTypes.manifest.id: {
				const manifest = await fin.System.launchManifest(appEntry.manifest);
				if (manifest?.platform?.uuid !== undefined) {
					platformAppIdentities.push({ uuid: manifest.platform.uuid,
						name: manifest.platform.uuid, appId: appEntry.appId });
				} else if(manifest?.startup_app?.uuid !== undefined) {
					platformAppIdentities.push({ uuid: manifest.startup_app.uuid,
						name: manifest.startup_app.uuid, appId: appEntry.appId });
				}
				break;
			}
			case manifestTypes.desktopBrowser.id: {
				await fin.System.openUrlWithBrowser(appEntry.manifest);
				break;
			}
			case manifestTypes.endpoint.id: {
				if (endpointProvider.hasEndpoint(appEntry.manifest)) {
					const identity = await endpointProvider.requestResponse<{ payload: PlatformApp },
					OpenFin.Identity>(
						appEntry.manifest,
						{ payload: appEntry }
					);
					if (identity === undefined || identity === null) {
						logger.warn(
							`App with id: ${appEntry.appId} encountered when launched using endpoint: ${appEntry.manifest}.`
						);
					} else {
						platformAppIdentities.push({ ...identity, appId: appEntry.appId });
					}
				} else {
					logger.warn(
						`App with id: ${appEntry.appId} could not be launched as it is of manifestType: ${appEntry.manifestType} and the endpoint: ${appEntry.manifest} is not available.`
					);
				}
				break;
			}
			case manifestTypes.connection.id: {
				logger.info(
					"An app defined by a connection (connected app) has been selected. Passing selection to connection"
				);
				const identity = await launchConnectedApp(appEntry);
				if(identity !== undefined && identity !== null) {
					platformAppIdentities.push({ ...identity, appId: appEntry.appId });
				}
				break;
			}
			default: {
				logger.error("We do not support the manifest type so this app cannot be launched.", appEntry);
			}
		}

		logger.info("Finished application launch request");
		return platformAppIdentities;
	} catch (err) {
		logger.error("Failed during application launch request", err);
	}
}
