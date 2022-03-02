import { getCurrentSync } from '@openfin/workspace-platform';
import { App } from "@openfin/workspace";
import { fin } from "openfin-adapter/src/mock";
import { getSettings } from "./settings";

async function getViewIdentities(name: string, uuid: string) {
  let identity = { uuid, name };
  let win = fin.Window.wrapSync(identity);
  let views = await win.getCurrentViews();
  let viewIdentities = views.map((view) => view.identity);
  await win.setAsForeground();
  return viewIdentities;
}

async function doesViewExist(name: string, uuid: string) {
  let view = fin.View.wrapSync({ name, uuid });
  let doesViewExist = false;
  try {
    await view.getInfo();
    let viewHost = await view.getCurrentWindow();
    await viewHost.bringToFront();
    doesViewExist = true;
  } catch (err) {
    doesViewExist = false;
  }
  return doesViewExist;
}

function findViewNames(layout) {
  let collectedNames = [];

  JSON.stringify(layout, (_, nestedValue) => {
    // check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
    if (
      nestedValue &&
      nestedValue.name !== undefined &&
      nestedValue.name !== null &&
      nestedValue.name.length > 0 &&
      nestedValue.url !== undefined
    ) {
      collectedNames.push(nestedValue.name);
    }
    return nestedValue;
  });

  return collectedNames;
}

export async function launchView(viewApp: App): Promise<OpenFin.Identity> {
  if (viewApp === undefined || viewApp === null) {
    console.warn("No app was passed to launchView");
    return null;
  }

  if (viewApp.manifestType !== "view" && viewApp.manifestType !== "inline-view") {
    console.warn("The app passed was not of manifestType view or inline-view.");
    return null;
  }
  let manifest;

  if(viewApp.manifestType === "view"){
    let manifestResponse = await fetch(viewApp.manifest);
    manifest = await manifestResponse.json();
  } else {
    // conversion because of manifestType. In most usecases manifest is always a path to an executable or to a manifest file. For views we are demonstrating how it could be used
    // for passing the manifest inline
    manifest = (viewApp.manifest as unknown) as OpenFin.ViewOptions;
  }


  let name = manifest.name;
  let identity = { uuid: fin.me.identity.uuid, name };
  let wasNameSpecified = name !== undefined;
  let viewExists = false;

  if (wasNameSpecified) {
    viewExists = await doesViewExist(identity.name, identity.uuid);
  }

  if (viewExists === false) {
    try {
        let platform = getCurrentSync();
        let createdView = await platform.createView(manifest);
        identity = createdView.identity;
    } catch (err) {
      console.error("Error launching view", err);
      return null;
    }
  }
  return identity;
}

export async function launchSnapshot(
  snapshotApp: App
): Promise<OpenFin.Identity[]> {
  if (snapshotApp === undefined || snapshotApp === null) {
    console.warn("No app was passed to launchSnapshot");
    return null;
  }

  if (snapshotApp.manifestType !== "snapshot") {
    console.warn("The app passed was not of manifestType snapshot.");
    return null;
  }

  let manifestResponse = await fetch(snapshotApp.manifest);
  let manifest = await manifestResponse.json();

  let windows = manifest.windows;
  let windowsToCreate = [];

  if (Array.isArray(windows)) {
    let windowsToGather = [];
    let viewIds = [];

    for (let i = 0; i < windows.length; i++) {
      let getViewIdsForLayout = findViewNames(windows[i].layout);
      if (getViewIdsForLayout.length === 0) {
        let uuid = window.crypto["randomUUID"]();
        let name = "internal-generated-window-" + uuid;
        windows[i].name = name;
        windowsToCreate.push(windows[i]);
        windowsToGather.push(name);
      } else {
        // we have views. Grab the first one to validate existence.
        let viewId = getViewIdsForLayout[0];

        getViewIdsForLayout.forEach((entry) => {
          viewIds.push({ name: entry, uuid: fin.me.identity.uuid });
        });

        // these views should be readonly and cannot be pulled out of the page or closed
        if ((await doesViewExist(viewId, fin.me.identity.uuid)) === false) {
          windowsToCreate.push(windows[i]);
        }
      }
    }

    manifest.windows = windowsToCreate;

    if (windowsToCreate.length > 0) {
      let platform = getCurrentSync();
      try {
        await platform.applySnapshot(manifest);
      } catch (err) {
        console.error(
          "Error trying to apply snapshot to platform.",
          err,
          manifest
        );
      }
    }

    for (let w = 0; w < windowsToGather.length; w++) {
      let windowViewIds = await getViewIdentities(
        windowsToGather[w],
        fin.me.identity.uuid
      );
      viewIds.push(...windowViewIds);
    }

    return viewIds;
  }

  return null;
}

export async function launch(appEntry: App) {
  console.log("Application launch requested: ", appEntry);
  if (appEntry.manifestType === "external") {
    let settings = await getSettings();
    let appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";

    if (
      appEntry.tags !== undefined &&
      appEntry.tags.indexOf(appAssetTag) > -1
    ) {
      console.log(
        "Application requested is a native app with a tag of appasset so it is provided by this workspace platform. Managing request via platform and not Workspace."
      );
      let options: OpenFin.ExternalProcessRequestType = {};
      options.alias = appEntry.manifest;
      options.uuid = appEntry.appId;

      await fin.System.launchExternalProcess(options);
    } else {
      console.log(
        "Application requested is a native app. Managing request via platform and not Workspace."
      );
      let options: OpenFin.ExternalProcessRequestType = {};
      options.path = appEntry.manifest;
      options.uuid = appEntry.appId;

      await fin.System.launchExternalProcess(options);
    }
  } else if(appEntry.manifestType === "inline-view") {
    await launchView(appEntry);
  } 
  else {
    let platform = getCurrentSync();
    await platform.launchApp({app: appEntry});
  }
  console.log("Finished application launch request");
}
