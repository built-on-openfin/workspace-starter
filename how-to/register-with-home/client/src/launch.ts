import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";

export async function launch(appEntry: App) {
	console.log("Application launch requested:", appEntry);
	if (appEntry.manifestType === "external") {
		console.log("Application requested is a native app. Managing request via platform and not Workspace.");
		const options: OpenFin.ExternalProcessRequestType = {};
		options.path = appEntry.manifest;
		options.uuid = appEntry.appId;

		await fin.System.launchExternalProcess(options);
	} else {
		const platform = getCurrentSync();
		await platform.launchApp({ app: appEntry });
	}
	console.log("Finished application launch request");
}
