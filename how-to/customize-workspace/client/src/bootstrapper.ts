import { register as registerHome, show as showHome, deregister as deregisterHome } from './home';
import { register as registerStore, show as showStore, deregister as deregisterStore } from './store';
import { register as registerShare, deregister as deregisterShare } from './share';
import { register as registerNotifications, deregister as deregisterNotifications } from './notifications';
import { init as endpointInit } from "./endpoint";

import { fin } from 'openfin-adapter/src/mock';
import { getSettings } from './settings';
import { providerId as salesforceProviderId, salesForceRegister, SalesforceSettings, salesForceUnregister } from './salesforce';
import { Integration } from './shapes';

export async function init() {
    // you can kick off your bootstrapping process here where you may decide to prompt for authentication, 
    // gather reference data etc before starting workspace and interacting with it.
    console.log("Initialising the bootstrapper");
    let settings = await getSettings();
    let workspaceLoaded = false;
    let setupHome = settings?.bootstrap?.home ?? true;
    let setupStore = settings?.bootstrap?.store ?? true;
    let setupNotifications = settings?.bootstrap?.notifications ?? true;
    await endpointInit();
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

    let salesForceIntegration: Integration<SalesforceSettings> | undefined = undefined;
    if (settings.integrationProvider?.integrations?.length) {
        salesForceIntegration = settings?.integrationProvider?.integrations?.find(i => i.id === salesforceProviderId) as Integration<SalesforceSettings>;
        if (salesForceIntegration?.enabled) {
            await salesForceRegister(salesForceIntegration?.data)
        }
    }

    const providerWindow = fin.Window.getCurrentSync();
    providerWindow.once("close-requested", async (event) => {
        if (salesForceIntegration?.enabled) {
            await salesForceUnregister(salesForceIntegration?.data);
        }
        await deregisterStore();
        await deregisterHome();
        await deregisterShare();
        await deregisterNotifications();
        fin.Platform.getCurrentSync().quit();
    });
}