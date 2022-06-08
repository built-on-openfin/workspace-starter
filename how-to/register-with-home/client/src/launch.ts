import { getCurrentSync } from "@openfin/workspace-platform";
import { App } from "@openfin/workspace";
import { fin } from "openfin-adapter/src/mock";

export async function launch(appEntry: App) {
  console.log("Application launch requested: ", appEntry);
  if (appEntry.manifestType === "external") {
    console.log("Application requested is a native app. Managing request via platform and not Workspace.");
    let options: OpenFin.ExternalProcessRequestType = {};
    options.path = appEntry.manifest;
    options.uuid = appEntry.appId;

    await fin.System.launchExternalProcess(options);
  } else {
    let platform = getCurrentSync();
    await platform.launchApp({ app: appEntry });
  }
  console.log("Finished application launch request");
}
