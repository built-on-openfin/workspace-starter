import { App } from "@openfin/workspace";
import { BrowserSnapshot, getCurrentSync } from "@openfin/workspace-platform";
import { launchConnectedApp } from "./connections";
import * as endpointProvider from "./endpoint";
import { logger } from "./logger-provider";
import { manifestTypes } from "./manifest-types";
import { getSettings } from "./settings";

const LOGGER_GROUP = "Launch";

async function getViewIdentities(name: string, uuid: string) {
	const identity = { uuid, name };
	const win = fin.Window.wrapSync(identity);
	const views = await win.getCurrentViews();
	const viewIdentities = views.map((view) => view.identity);
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
export async function launchWindow(windowApp: App): Promise<OpenFin.Identity> {
	if (windowApp === undefined || windowApp === null) {
		logger.warn(LOGGER_GROUP, "No app was passed to launchWindow");
		return null;
	}

	if (
		windowApp.manifestType !== manifestTypes.window.id &&
		windowApp.manifestType !== manifestTypes.inlineWindow.id
	) {
		logger.warn(
			LOGGER_GROUP,
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
		manifest.name = `classic-window-${crypto.randomUUID()}`;
		identity.name = manifest.name;
	}

	if (!windowExists) {
		try {
			const createdWindow = await fin.Window.create(manifest);
			identity = createdWindow.identity;
		} catch (err) {
			logger.error(LOGGER_GROUP, "Error launching window", err);
			return null;
		}
	}
	return identity;
}

export async function launchView(viewApp: App): Promise<OpenFin.Identity> {
	if (viewApp === undefined || viewApp === null) {
		logger.warn(LOGGER_GROUP, "No app was passed to launchView");
		return null;
	}

	if (
		viewApp.manifestType !== manifestTypes.view.id &&
		viewApp.manifestType !== manifestTypes.inlineView.id
	) {
		logger.warn(
			LOGGER_GROUP,
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
	}

	if (!viewExists) {
		try {
			const platform = getCurrentSync();
			const createdView = await platform.createView(manifest);
			identity = createdView.identity;
		} catch (err) {
			logger.error(LOGGER_GROUP, "Error launching view", err);
			return null;
		}
	}
	return identity;
}

export async function launchSnapshot(snapshotApp: App): Promise<OpenFin.Identity[]> {
	if (snapshotApp === undefined || snapshotApp === null) {
		logger.warn(LOGGER_GROUP, "No app was passed to launchSnapshot");
		return null;
	}

	if (snapshotApp.manifestType !== manifestTypes.snapshot.id) {
		logger.warn(LOGGER_GROUP, `The app passed was not of manifestType ${manifestTypes.snapshot.id}`);
		return null;
	}

	const manifestResponse = await fetch(snapshotApp.manifest);
	const manifest: BrowserSnapshot = await manifestResponse.json();

	const windows = manifest.windows;
	const windowsToCreate = [];

	if (Array.isArray(windows)) {
		const windowsToGather: string[] = [];
		const viewIds: OpenFin.Identity[] = [];

		for (let i = 0; i < windows.length; i++) {
			const getViewIdsForLayout = findViewNames(windows[i].layout);
			if (getViewIdsForLayout.length === 0) {
				const uuid = window.crypto.randomUUID();
				const name = `internal-generated-window-${uuid}`;
				windows[i].name = name;
				windowsToCreate.push(windows[i]);
				windowsToGather.push(name);
			} else {
				// we have views. Grab the first one to validate existence.
				const viewId = getViewIdsForLayout[0];

				for (const entry of getViewIdsForLayout) {
					viewIds.push({ name: entry, uuid: fin.me.identity.uuid });
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
				logger.error(LOGGER_GROUP, "Error trying to apply snapshot to platform", err, manifest);
			}
		}

		for (let w = 0; w < windowsToGather.length; w++) {
			const windowViewIds = await getViewIdentities(windowsToGather[w], fin.me.identity.uuid);
			viewIds.push(...windowViewIds);
		}

		return viewIds;
	}

	return null;
}

export async function launch(appEntry: App) {
	try {
		logger.info(LOGGER_GROUP, "Application launch requested", appEntry);
		if (appEntry.manifestType === manifestTypes.external.id) {
			const settings = await getSettings();
			const appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";

			if (appEntry.tags?.includes(appAssetTag)) {
				logger.info(
					LOGGER_GROUP,
					"Application requested is a native app with a tag of appasset so it is provided by this workspace platform. Managing request via platform and not Workspace"
				);
				const options: OpenFin.ExternalProcessRequestType = {};
				options.alias = appEntry.manifest;
				options.uuid = appEntry.appId;

				await fin.System.launchExternalProcess(options);
			} else {
				logger.info(
					LOGGER_GROUP,
					"Application requested is a native app. Managing request via platform and not Workspace"
				);
				const options: OpenFin.ExternalProcessRequestType = {};
				options.path = appEntry.manifest;
				options.uuid = appEntry.appId;

				await fin.System.launchExternalProcess(options);
			}
		} else if (appEntry.manifestType === manifestTypes.inlineView.id) {
			await launchView(appEntry);
		} else if (
			appEntry.manifestType === manifestTypes.window.id ||
			appEntry.manifestType === manifestTypes.inlineWindow.id
		) {
			await launchWindow(appEntry);
		} else if (appEntry.manifestType === manifestTypes.desktopBrowser.id) {
			await fin.System.openUrlWithBrowser(appEntry.manifest);
		} else if (appEntry.manifestType === manifestTypes.endpoint.id) {
			if (endpointProvider.hasEndpoint(appEntry.manifest)) {
				const launched = await endpointProvider.action(appEntry.manifest, { payload: appEntry });
				if (!launched) {
					logger.warn(
						LOGGER_GROUP,
						`App with id: ${appEntry.appId} encountered when launched using endpoint: ${appEntry.manifest}.`
					);
				}
			} else {
				logger.warn(
					LOGGER_GROUP,
					`App with id: ${appEntry.appId} could not be launched as it is of manifestType: ${appEntry.manifestType} and the endpoint: ${appEntry.manifest} is not available.`
				);
			}
		} else if (appEntry.manifestType === manifestTypes.connection.id) {
			logger.info(
				LOGGER_GROUP,
				"An app defined by a connection (connected app) has been selected. Passing selection to connection"
			);
			await launchConnectedApp(appEntry);
		} else {
			const platform = getCurrentSync();
			await platform.launchApp({ app: appEntry });
		}
		logger.info(LOGGER_GROUP, "Finished application launch request");
	} catch (err) {
		logger.error(LOGGER_GROUP, "Failed during application launch request", err);
	}
}
