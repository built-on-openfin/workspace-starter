import { App } from "@openfin/workspace/shapes";
import { fin } from 'openfin-adapter/src/mock';
import { getSettings } from "./settings";

let cachedApps;

async function validateEntries(apps:App[]) {
    let canLaunchExternalProcessResponse = await fin.System.queryPermissionForCurrentContext('System.launchExternalProcess');
    let canLaunchExternalProcess = canLaunchExternalProcessResponse !== undefined && canLaunchExternalProcessResponse.granted;

    let canDownloadAppAssetsResponse = await fin.System.queryPermissionForCurrentContext('System.downloadAsset');
    let canDownloadAppAssets = canDownloadAppAssetsResponse !== undefined && canDownloadAppAssetsResponse.granted;

    if(canLaunchExternalProcess && canDownloadAppAssets) {
        return apps;
    }

    let validatedApps = [];
    let rejectedAppIds = [];
    let settings = await getSettings();
    let appAssetTag = settings?.appProvider?.appAssetTag ?? "appasset";
        
    for(let i = 0; i < apps.length; i++) {
        if(apps[i].manifestType !== "external") {
            validatedApps.push(apps[i]);
        } else {
            if(canLaunchExternalProcess === false) {
                rejectedAppIds.push(apps[i].appId);
            } else if(Array.isArray(apps[i].tags) && apps[i].tags.indexOf(appAssetTag) > -1 && canDownloadAppAssets === false) {
                rejectedAppIds.push(apps[i].appId);
            } else {
                validatedApps.push(apps[i]);
            }
        }
    }

    if(rejectedAppIds.length > 0) {
        console.warn("Apps.ts: validateEntries: Not passing the following list of applications as they will not be able to run on this machine due to missing permissions. Alternatively this logic could be moved to the launch function where a selection is not launched but the user is presented with a modal saying they can't launch it due to permissions.", rejectedAppIds);
    }

    return validatedApps;
}

async function getRestEntries(url:string, credentials?:"omit" | "same-origin" | "include", cacheDuration?: number) : Promise<App[]>{
    const options = credentials !== undefined ? { credentials } : undefined;
    if(url === undefined) {
        return [];
    }
    const response = await fetch(url, options);

    let apps: App[] = await response.json();

    cachedApps = await validateEntries(apps);

    if(cacheDuration !== undefined) {
        let setTimeoutInMs = cacheDuration * 60 * 1000;
        setTimeout(()=> {
            console.log("Clearing cache of apps as cache duration has passed.");
            cachedApps = undefined;
        }, setTimeoutInMs);
    }
}

export async function getApps(): Promise<App[]> {
    console.log("Requesting apps.");
    try {
        let settings = await getSettings();
        let apps = cachedApps ?? await getRestEntries(settings?.appProvider?.appsSourceUrl, settings?.appProvider?.includeCredentialOnSourceRequest, settings?.appProvider?.cacheDurationInMinutes);
        return apps;
    } catch (err) {
        console.error("Error retrieving apps. Returning empty list.", err);
        return [];
    }
}

export async function getAppsByTag(tags:string[]) : Promise<App[]> {
    let apps = await getApps();
    let filteredApps = apps.filter((value)=> {
        if(value.tags === undefined) {
            return false;
        }
        for(let i = 0; i < tags.length; i++) {
            if(value.tags.indexOf(tags[i]) > -1) {
                return true;
            }
        }
        return false;
    });
    return filteredApps;
}