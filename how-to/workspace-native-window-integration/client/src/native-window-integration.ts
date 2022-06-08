import { NativeWindowIntegrationClient } from "@openfin/native-window-integration-client";
import asset from "@openfin/native-window-integration-client/lib/provider.zip";
import { getAppsByTag } from "./apps";

let nwiClient: NativeWindowIntegrationClient;
let clientRequested = false;

async function init() {
  clientRequested = true;
  let nwiApps = await getAppsByTag(["native", "nwi"], true);
  let configuration = [];

  nwiApps.forEach((app) => {
    if (app["data"] !== undefined && app["data"]["nwi"] !== undefined) {
      configuration.push(app["data"]["nwi"]);
    }
  });

  if (configuration.length > 0) {
    // we can keep checking to see if nwi apps are added to the list.
    console.log("NWI compatible apps specified: ", configuration);
    try {
      nwiClient = await NativeWindowIntegrationClient.create({
        local: false,
        url: asset,
        configuration,
        mockConnection: false
      });
      console.log("Native Window Integration Client connected successfully!");
    } catch (err) {
      console.log("Native Window Integration Client not connected successfully", err);
    }
  }
}

export async function decorateSnapshot(snapshot: OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
  try {
    if (clientRequested === false) {
      await init();
    }

    if (nwiClient === undefined) {
      console.error(
        "Native Window Integration failed to decorate snapshot as we do not have a valid instance to use, returning undecorated snapshot."
      );
      return snapshot;
    }

    const snapshotWithNativeWindows = await nwiClient.decorateSnapshot(snapshot);
    console.log("Native Window Integration sucessfully decorated snapshot.");
    return snapshotWithNativeWindows;
  } catch (error) {
    console.error("Native Window Integration failed to decorate snapshot, returning undecorated snapshot.", error);
    return snapshot;
  }
}

export async function applyDecoratedSnapshot(snapshot: OpenFin.Snapshot) {
  try {
    if (clientRequested === false) {
      await init();
    }

    if (nwiClient !== undefined) {
      const info = await nwiClient.applySnapshot(snapshot);
      console.log("Native Window Integration applied snapshot", info);
    } else {
      console.error(
        "Unable to apply decorated snapshot using Native Window Integration Client as we don't have a reference to the nwi client."
      );
    }
  } catch (error) {
    console.error("Native Window Integration error applying native snapshot:", error);
  }
}
