import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings } from "./settings";
import { overrideCallback } from './browser';

export async function init() {
    const settings = await getSettings();

    console.log("Initialising platform");
    let browser: BrowserInitConfig = {};
    browser.overrideCallback = overrideCallback;

    await workspacePlatformInit({
        browser
    });
} 