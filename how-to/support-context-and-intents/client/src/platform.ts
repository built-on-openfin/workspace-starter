import { PlatformInteropBroker } from './interopbroker';

import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings, validateThemes } from "./settings";

export async function init() {
    console.log("Initialising platform");
    let settings = await getSettings();
    let browser: BrowserInitConfig = {};

    if(settings.browserProvider !== undefined) {
        browser.defaultWindowOptions = {
            icon: settings.browserProvider.windowOptions?.icon,
            workspacePlatform: {
                pages: null,
                title: settings.browserProvider.windowOptions?.title,
                favicon: settings.browserProvider.windowOptions?.icon,
                newTabUrl: settings.browserProvider.windowOptions?.newTabUrl,
                newPageUrl: settings.browserProvider.windowOptions?.newPageUrl
            }
        };

        browser.interopOverride =  async (InteropBroker, provider, options, ...args) => {
          return new PlatformInteropBroker(provider, options, ...args);
        };
    }

    console.log("Specifying following browser options: ", browser);
    await workspacePlatformInit({
        browser,
        theme: validateThemes(settings?.themeProvider?.themes)
    });
} 