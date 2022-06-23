import { App } from "@openfin/workspace";
import { getSettings } from "./settings";

async function getRestEntries(url:string, credentials?:"omit" | "same-origin" | "include") : Promise<App[]>{
    const options = credentials !== undefined ? { credentials } : undefined;
    if(url === undefined) {
        return [];
    }
    const response = await fetch(url, options);
    return response.json();
}

async function validateEntries(apps: App[]) {
    let canLaunchExternalProcessResponse =
      await fin.System.queryPermissionForCurrentContext(
        "System.launchExternalProcess"
      );
    let canLaunchExternalProcess =
      canLaunchExternalProcessResponse !== undefined &&
      canLaunchExternalProcessResponse.granted;
  
    let canDownloadAppAssetsResponse =
      await fin.System.queryPermissionForCurrentContext("System.downloadAsset");
    let canDownloadAppAssets =
      canDownloadAppAssetsResponse !== undefined &&
      canDownloadAppAssetsResponse.granted;
  
    let validatedApps = [];
    let rejectedAppIds = [];
    let settings = await getSettings();
    let appAssetTag = "appasset";
    let supportedManifestTypes = settings?.appProvider?.manifestTypes;
  
    for (let i = 0; i < apps.length; i++) {
  
      let validApp = true;
      if(supportedManifestTypes !== undefined && supportedManifestTypes.length > 0) {
        validApp = supportedManifestTypes.indexOf(apps[i].manifestType) > -1;
      }
  
      if(validApp) {
        if (apps[i].manifestType !== "external" ) {
          validatedApps.push(apps[i]);
        } else {
          if (canLaunchExternalProcess === false) {
            rejectedAppIds.push(apps[i].appId);
          } else if (
            Array.isArray(apps[i].tags) &&
            apps[i].tags.indexOf(appAssetTag) > -1 &&
            canDownloadAppAssets === false
          ) {
            rejectedAppIds.push(apps[i].appId);
          } else {
            validatedApps.push(apps[i]);
          }
        }
      }
    }
  
    if (rejectedAppIds.length > 0) {
      console.warn(
        "Apps.ts: validateEntries: Not passing the following list of applications as they will not be able to run on this machine due to missing permissions. Alternatively this logic could be moved to the launch function where a selection is not launched but the user is presented with a modal saying they can't launch it due to permissions.",
        rejectedAppIds
      );
    }
  
    return validatedApps;
  }

export async function getApps(): Promise<App[]> {
    console.log("Requesting apps.");
    try {
        let settings = await getSettings();
        let apps = await getRestEntries(settings?.appProvider?.appsSourceUrl, settings?.appProvider?.includeCredentialOnSourceRequest);
        return validateEntries(apps);
    } catch (err) {
        console.error("Error retrieving apps. Returning empty list.", err);
        return [];
    }
}