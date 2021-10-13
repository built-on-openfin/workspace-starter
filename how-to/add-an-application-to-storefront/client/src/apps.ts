import { App } from "@openfin/workspace/shapes";
import { getSettings } from "./settings";

let cachedApps;

async function getRestEntries(url:string, credentials?:"omit" | "same-origin" | "include", cacheDuration?: number) : Promise<App[]>{
    const options = credentials !== undefined ? { credentials } : undefined;
    if(url === undefined) {
        return [];
    }
    const response = await fetch(url, options);
    cachedApps = response.json();

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