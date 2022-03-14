import { getSettings } from './settings';
import { createLaunchBarWindow  } from './launchbar-window';
export async function init() {
    // you can kick off your bootstrapping process here where you may decide to prompt for authentication, 
    // gather reference data etc before starting workspace and interacting with it.
    console.log("Initialising the bootstrapper");
    const {bootstrap: { launchBarWindowSettings }} = await getSettings();
    createLaunchBarWindow(launchBarWindowSettings)
}