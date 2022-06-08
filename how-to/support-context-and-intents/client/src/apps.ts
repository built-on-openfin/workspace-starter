import { App } from "@openfin/workspace";
import { AppIntent } from "@openfin/workspace-platform";
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

function updateEntry(
  source: {
    [key: string]: {
      intent: Partial<AppIntent>;
      apps: App[];
    };
  },
  intent: AppIntent,
  app: App
) {
  if (source[intent.name] === undefined) {
    // in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
    // or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
    source[intent.name] = {
      intent: {
        name: intent.name,
        displayName: intent.displayName
      },
      apps: []
    };
  }
  source[intent.name].apps.push(app);
  return source;
}

export async function getApps(): Promise<App[]> {
  console.log("Requesting apps.");
  try {
    const settings = await getSettings();
    const apps: App[] =
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

export async function getAppsByTag(tags: string[]): Promise<App[]> {
  const apps = await getApps();
  const filteredApps = apps.filter((value) => {
    if (value.tags === undefined) {
      return false;
    }
    for (let i = 0; i < tags.length; i++) {
      if (value.tags.includes(tags[i])) {
        return true;
      }
    }
    return false;
  });
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

export async function getAppsByIntent(intent: string): Promise<App[]> {
  const apps = await getApps();
  const filteredApps = apps.filter((value) => {
    if (value.intents === undefined) {
      return false;
    }
    for (let i = 0; i < value.intents.length; i++) {
      if (value.intents[i].name.toLowerCase() === intent.toLowerCase()) {
        return true;
      }
    }
    return false;
  });
  return filteredApps;
}

export async function getIntent(
  intent: string,
  contextType?: string
): Promise<{ intent: Partial<AppIntent>; apps: App[] }> {
  const apps = await getApps();
  let intents: {
    [key: string]: {
      intent: Partial<AppIntent>;
      apps: App[];
    };
  } = {};

  if (Array.isArray(apps)) {
    for (const value of apps) {
      if (value.intents !== undefined) {
        for (let i = 0; i < value.intents.length; i++) {
          if (value.intents[i].name === intent) {
            if (contextType === undefined) {
              intents = updateEntry(intents, value.intents[i], value);
            } else if (Array.isArray(value.intents[i].contexts) && value.intents[i].contexts.includes(contextType)) {
              intents = updateEntry(intents, value.intents[i], value);
            }
          }
        }
      }
    }

    const results = Object.values(intents);
    if (results.length === 0) {
      console.log(`No results found for findIntent for intent ${intent} and context ${contextType}`);
      return null;
    } else if (results.length === 1) {
      return results[0];
    }
    console.warn(
      `Received more than one result for findIntent for intent ${intent} and context ${contextType}. Returning the first entry.`
    );
    return results[0];
  }
  console.warn("There was no apps returned so we are unable to find apps that support an intent.");
  return null;
}

export async function getIntentsByContext(contextType: string): Promise<{ intent: Partial<AppIntent>; apps: App[] }[]> {
  const apps = await getApps();
  let intents: {
    [key: string]: {
      intent: Partial<AppIntent>;
      apps: App[];
    };
  } = {};

  if (Array.isArray(apps)) {
    for (const value of apps) {
      if (value.intents !== undefined) {
        for (let i = 0; i < value.intents.length; i++) {
          if (Array.isArray(value.intents[i].contexts) && value.intents[i].contexts.includes(contextType)) {
            intents = updateEntry(intents, value.intents[i], value);
          }
        }
      }
    }

    return Object.values(intents);
  }
  console.warn("Unable to get apps so we can not get apps and intents that support a particular context");

  return [];
}
