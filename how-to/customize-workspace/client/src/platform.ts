import { PlatformInteropBroker } from './interopbroker';

import { init as workspacePlatformInit, BrowserInitConfig, BrowserButtonType } from '@openfin/workspace-platform';
import { getSettings, validateThemes } from "./settings";
import { getActions } from './actions';
import { getDefaultToolbarButtons } from './buttons';

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
                newPageUrl: settings.browserProvider.windowOptions?.newPageUrl,
                toolbarOptions: {
                    buttons: getDefaultToolbarButtons()
                }
            }
        };

        browser.interopOverride =  async (InteropBroker, provider, options, ...args) => {
          return new PlatformInteropBroker(provider, options, ...args);
        };
    }

    console.log("Specifying following browser options: ", browser);

    let customActions = await getActions();

    await workspacePlatformInit({
        browser,
        theme: validateThemes(settings?.themeProvider?.themes),
        customActions: customActions
    });
} 