import type { App } from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";
import { getSettings } from "./settings";

export async function launch(appEntry: App) {
	console.log("Application launch requested:", appEntry);
	if (appEntry.manifestType === "external") {
		const settings = await getSettings();
		const appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";

		if (appEntry.tags?.includes(appAssetTag)) {
			console.log(
				"Application requested is a native app with a tag of appasset so it is provided by this workspace platform. Managing request via platform and not Workspace."
			);
			const options: OpenFin.ExternalProcessRequestType = {};
			options.alias = appEntry.manifest;
			options.uuid = appEntry.appId;

			await fin.System.launchExternalProcess(options);
		} else {
			console.log("Application requested is a native app. Managing request via platform and not Workspace.");
			const options: OpenFin.ExternalProcessRequestType = {};
			options.path = appEntry.manifest;
			options.uuid = appEntry.appId;

			await fin.System.launchExternalProcess(options);
		}
	} else {
		const platform = getCurrentSync();
		await platform.launchApp({ app: appEntry });
	}
	console.log("Finished application launch request");
}
