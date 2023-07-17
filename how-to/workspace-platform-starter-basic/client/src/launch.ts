import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { AppManifestType, getCurrentSync } from "@openfin/workspace-platform";

/**
 * Launch the passed app using its manifest type to determine how to launch it.
 * @param app The app to launch.
 * @returns The value returned by the launch.
 */
export async function launchApp(
	app: App
): Promise<OpenFin.Platform | OpenFin.Identity | OpenFin.View | OpenFin.Application | undefined> {
	if (!app.manifest) {
		console.error(`No manifest was provided for type ${app.manifestType}`);
		return;
	}

	let ret: OpenFin.Platform | OpenFin.Identity | OpenFin.View | OpenFin.Application | undefined;

	console.log("Application launch requested:", app);

	switch (app.manifestType) {
		case AppManifestType.Snapshot: {
			const platform = getCurrentSync();
			ret = await platform.applySnapshot(app.manifest);
			break;
		}

		case AppManifestType.View: {
			const platform = getCurrentSync();
			ret = await platform.createView({ manifestUrl: app.manifest });
			break;
		}

		case AppManifestType.External: {
			ret = await fin.System.launchExternalProcess({ path: app.manifest, uuid: app.appId });
			break;
		}

		case "window": {
			const manifestResponse = await fetch(app.manifest);
			const manifest: OpenFin.WindowOptions = await manifestResponse.json();
			const platform = getCurrentSync();
			ret = await platform.createWindow(manifest);
			break;
		}

		case "inline-appasset": {
			const appAssetInfo: OpenFin.AppAssetInfo = app.manifest as unknown as OpenFin.AppAssetInfo;
			try {
				await fin.System.downloadAsset(appAssetInfo, (progress) => {
					const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
					console.info(`Downloaded ${downloadedPercent}% of app asset with appId of ${app.appId}`);
				});

				ret = await fin.System.launchExternalProcess({
					alias: appAssetInfo.alias,
					arguments: appAssetInfo.args
				});
			} catch (error) {
				console.error(`Error trying to download app asset with app id: ${app.appId}`, error);
			}
			break;
		}

		default: {
			ret = await fin.Application.startFromManifest(app.manifest);
			break;
		}
	}

	console.log("Finished application launch request");

	return ret;
}
