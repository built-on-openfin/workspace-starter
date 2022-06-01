import { PlatformInteropBroker } from './interopbroker';
import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings, getThemes } from "./settings";
import { getActions } from './actions';
import { getDefaultWindowOptions, overrideCallback } from './browser';

export async function init() {
    const settings = await getSettings();

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
    let theme = await getThemes();

    await workspacePlatformInit({
        browser,
        theme,
        customActions
    });
} 