import { PlatformInteropBroker } from './interopbroker';
import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings, validateThemes } from "./settings";
import { getActions } from './actions';
import { getDefaultWindowOptions, overrideCallback } from './browser';

export async function init() {
    console.log("Initialising platform");
    let settings = await getSettings();
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