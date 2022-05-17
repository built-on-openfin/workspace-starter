import { getCurrentSync } from '@openfin/workspace-platform';
import { App } from "@openfin/workspace";
import { fin } from 'openfin-adapter/src/mock';
import { getSettings } from "./settings";

export async function launch(appEntry: App) {
    console.log("Application launch requested: ", appEntry);
    if(appEntry.manifestType === "external") {
        let settings = await getSettings();
        let appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";

        if(appEntry.tags !== undefined && appEntry.tags.indexOf(appAssetTag) > -1) {
            console.log("Application requested is a native app with a tag of appasset so it is provided by this workspace platform. Managing request via platform and not Workspace.");
            let options: OpenFin.ExternalProcessRequestType = {};
            options.alias = appEntry.manifest;
            options.uuid = appEntry.appId;

            await fin.System.launchExternalProcess(options);
        } else {
            console.log("Application requested is a native app. Managing request via platform and not Workspace.");
            let options: OpenFin.ExternalProcessRequestType = {};
            options.path = appEntry.manifest;
            options.uuid = appEntry.appId;
    
            await fin.System.launchExternalProcess(options);
        }
    } else {
        let platform = getCurrentSync();
        await platform.launchApp({app: appEntry});
    }
    console.log("Finished application launch request");
}