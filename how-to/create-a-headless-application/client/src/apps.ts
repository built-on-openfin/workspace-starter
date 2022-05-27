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

export async function getApps(): Promise<App[]> {
    console.log("Requesting apps.");
    try {
        let settings = await getSettings();
        let apps = await getRestEntries(settings?.appProvider?.appsSourceUrl, settings?.appProvider?.includeCredentialOnSourceRequest);
        return apps;
    } catch (err) {
        console.error("Error retrieving apps. Returning empty list.", err);
        return [];
    }
}