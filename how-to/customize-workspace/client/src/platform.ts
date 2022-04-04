import { PlatformInteropBroker } from './interopbroker';
import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings, validateThemes } from "./settings";
import { getActions } from './actions';
import { getDefaultWindowOptions, overrideCallback } from './browser';
import { salesForceConnect, SalesforceSettings, providerId as salesforceProviderId } from './salesforce';

export async function init() {
    const settings = await getSettings();

    const salesForceIntegration = settings?.integrationProvider?.integrations?.find(i => i.id === salesforceProviderId);
    if (salesForceIntegration?.enabled) {
        console.log("Initialising salesforce");
        await salesForceConnect(salesForceIntegration.data as SalesforceSettings);
    }

    console.log("Initialising platform");
    let browser: BrowserInitConfig = {};


    if(settings.browserProvider !== undefined) {
        browser.defaultWindowOptions = await getDefaultWindowOptions();

        browser.interopOverride =  async (InteropBroker, provider, options, ...args) => {
          return new PlatformInteropBroker(provider, options, ...args);
        };

        browser.overrideCallback = overrideCallback;
    }

    console.log("Specifying following browser options: ", browser);

    let customActions = await getActions();

    await workspacePlatformInit({
        browser,
        theme: validateThemes(settings?.themeProvider?.themes),
        customActions: customActions
    });
} 