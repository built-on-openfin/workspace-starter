import { register as registerHome, show as showHome, deregister as deregisterHome } from './home';
import { register as registerStore, show as showStore, deregister as deregisterStore } from './store';
import { register as registerShare, deregister as deregisterShare } from './share';
import { register as registerNotifications, deregister as deregisterNotifications } from './notifications';

import { fin } from 'openfin-adapter/src/mock';
import { getSettings } from './settings';
import { register as registerIntegration, deregister as deregisterIntegration } from './integrations';

export async function init() {
    // you can kick off your bootstrapping process here where you may decide to prompt for authentication, 
    // gather reference data etc before starting workspace and interacting with it.
    console.log("Initialising the bootstrapper");
    let settings = await getSettings();
    let workspaceLoaded = false;
    let setupHome = settings?.bootstrap?.home ?? true;
    let setupStore = settings?.bootstrap?.store ?? true;
    let setupNotifications = settings?.bootstrap?.notifications ?? true;

    if(setupHome) {
        // only register search logic once workspace is running
        await registerHome();
        workspaceLoaded = true;
        await showHome();
    }

    if(setupStore) {
        await registerStore();
        if(!workspaceLoaded) {
            await showStore();
        }
    }

    if(setupNotifications) {
        await registerNotifications();
    }

    await registerShare()

    await registerIntegration(settings.integrationProvider);

    const providerWindow = fin.Window.getCurrentSync();
    providerWindow.once("close-requested", async (event) => {
        await deregisterIntegration(settings.integrationProvider);

        await deregisterStore();
        await deregisterHome();
        await deregisterShare();
        await deregisterNotifications();
        fin.Platform.getCurrentSync().quit();
    });
}