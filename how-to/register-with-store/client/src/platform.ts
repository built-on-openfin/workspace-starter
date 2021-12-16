import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings } from "./settings";

export async function init() {
    console.log("Initialising platform");
    let settings = await getSettings();
    let browser: BrowserInitConfig = {};

    if(settings.browserProvider !== undefined) {
        browser.defaultWindowOptions = {
            icon: "https://cdn-group.bnpparibas.com/favicon.ico",
            workspacePlatform: {
                pages: null,
                title: settings.browserProvider.windowOptions?.title,
                favicon: "https://cdn-group.bnpparibas.com/favicon.ico"
            }
        };
    }

    console.log("Specifying following browser options: ", browser);
    await workspacePlatformInit({
        licenseKey: 'license-key-goes-here',
        browser
    });
} 