import { App } from "@openfin/workspace";
import { fin } from "openfin-adapter/src/mock";
import { getSettings } from "./settings";

let cachedApps: App[];

async function validateEntries(apps: App[]) {
  const canLaunchExternalProcessResponse = await fin.System.queryPermissionForCurrentContext(
    "System.launchExternalProcess"
  );
  const canLaunchExternalProcess = canLaunchExternalProcessResponse?.granted;

  const canDownloadAppAssetsResponse = await fin.System.queryPermissionForCurrentContext("System.downloadAsset");
  const canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;

  if (canLaunchExternalProcess && canDownloadAppAssets) {
    return apps;
  }

  const validatedApps: App[] = [];
  const rejectedAppIds = [];
  const settings = await getSettings();
  const appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";

  for (let i = 0; i < apps.length; i++) {
    if (apps[i].manifestType !== "external") {
      validatedApps.push(apps[i]);
    } else if (!canLaunchExternalProcess) {
      rejectedAppIds.push(apps[i].appId);
    } else if (Array.isArray(apps[i].tags) && apps[i].tags.includes(appAssetTag) && !canDownloadAppAssets) {
      rejectedAppIds.push(apps[i].appId);
    } else {
      validatedApps.push(apps[i]);
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

async function getRestEntries(
  url: string,
  credentials?: "omit" | "same-origin" | "include",
  cacheDuration?: number
): Promise<App[]> {
  const options = credentials !== undefined ? { credentials } : undefined;
  if (url === undefined) {
    return [];
  }
  const response = await fetch(url, options);

  const apps: App[] = await response.json();

  cachedApps = await validateEntries(apps);

  if (cacheDuration !== undefined) {
    const setTimeoutInMs = cacheDuration * 60 * 1000;
    setTimeout(() => {
      console.log("Clearing cache of apps as cache duration has passed.");
      cachedApps = undefined;
    }, setTimeoutInMs);
  }

  return cachedApps;
}

export async function getApps(): Promise<App[]> {
  console.log("Requesting apps.");
  try {
    const settings = await getSettings();
    const apps =
      cachedApps ??
      (await getRestEntries(
        settings?.appProvider?.appsSourceUrl,
        settings?.appProvider?.includeCredentialOnSourceRequest,
        settings?.appProvider?.cacheDurationInMinutes
      ));
    return apps;
  } catch (err) {
    console.error("Error retrieving apps. Returning empty list.", err);
    return [];
  }
}

export async function getAppsByTag<T extends App>(tags: string[], mustMatchAll = false): Promise<T[]> {
  const apps = await getApps();
  const filteredApps: T[] = apps.filter((value) => {
    if (value.tags === undefined) {
      return false;
    }
    let matchFound = false;
    for (let i = 0; i < tags.length; i++) {
      if (value.tags.includes(tags[i])) {
        if (mustMatchAll) {
          matchFound = true;
        } else {
          return true;
        }
      } else if (mustMatchAll) {
        return false;
      }
    }
    return matchFound;
  }) as T[];
  return filteredApps;
}

export async function getApp(requestedApp: string | { appId: string }): Promise<App> {
  const apps = await getApps();
  let appId;
  if (requestedApp !== undefined) {
    if (typeof requestedApp === "string") {
      appId = requestedApp;
    } else {
      appId = requestedApp.appId;
    }
  }
  if (appId === undefined) {
    return undefined;
  }
  return apps.find((entry) => entry.appId === appId);
}
