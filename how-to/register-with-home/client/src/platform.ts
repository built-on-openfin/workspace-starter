import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';

export async function init() {
    console.log("Initialising platform");
    let browser: BrowserInitConfig = {};

    await workspacePlatformInit({
        licenseKey: 'license-key-goes-here',
        browser
    });
}