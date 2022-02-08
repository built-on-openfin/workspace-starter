import { PlatformInteropBroker } from './interopbroker';

import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { getSettings, validateThemes } from "./settings";
import { NativeWindowIntegrationClient } from '@openfin/native-window-integration-client';

import asset from '@openfin/native-window-integration-client/lib/provider.zip';


//TODO: Describe this.
// Set this to true to mock a connection (useful on mac)
const mockConnection = false;
const configuration = [
    {
        "name": "Symphony",
        "title": "Symphony",
        "launch": {
            "path": "%LOCALAPPDATA%\\Programs\\Symphony\\Symphony\\Symphony.exe",
            "lifetime": "application"
        }
    }
]

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
        browser.overrideCallback = async (PlatformProvider, ...args) => {
            const myClient = await NativeWindowIntegrationClient.create({local: false, url: asset, configuration, mockConnection });
            console.log('Native Window Integration Client connected successfully!');
            
            class WithNative extends PlatformProvider {
                async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
                    const snapshot = await super.getSnapshot(...args);
                    try {
                        const snapshotWithNativeWindows = await myClient.decorateSnapshot(snapshot);
                        return snapshotWithNativeWindows;
                    } catch (error) {
                        console.log('Native Window Integration failed to get snapshotWithNativeWindows:');
                        console.error(error);
                        return snapshot;
                    }
                }
                async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
                    await super.applySnapshot(...args);
                    try {
                        const info = await myClient.applySnapshot(args[0].snapshot);
                        // Do something with info
                        console.log(info);
                    } catch (error) {
                        console.log('Native Window Integration error applying native snapshot:');
                        console.error(error);
                    }
                }
            }
            console.log('Native Window Integration successfully enabled!');
            return new WithNative(...args);
        };
    }

    console.log("Specifying following browser options: ", browser);
    await workspacePlatformInit({
        browser,
        theme: validateThemes(settings?.themeProvider?.themes),
        
        //overrideCallback: async (PlatformProvider, ...args) => {})
    });
} 