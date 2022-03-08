import { init as workspacePlatformInit, BrowserInitConfig } from '@openfin/workspace-platform';
import { connectToSalesforce } from './salesforce';
import { getSettings } from "./settings";

export async function init() {
    console.log("Initialising salesforce");
    await connectToSalesforce();

    console.log("Initialising platform");
    const { icon, title } = await getSettings();    
    let browser: BrowserInitConfig = {};
    browser.defaultWindowOptions = {
        icon,
        workspacePlatform: {
            favicon: icon,
            pages: null,
            title
        }
    };
    console.log("Specifying following browser options: ", browser);
    await workspacePlatformInit({
        browser,
        theme: [
            {
                label: "Salesforce Theme",
                palette: {
                    brandPrimary: "#0070D2",
                    brandSecondary: "#0070D2",
                    backgroundPrimary: "#265A78",
                    background1: "#0C4362",
                    background2: "#105998",
                    background3: "#265A78",
                    background4: "#0070D2",
                    background5: "#0070D2",
                    background6: "#0070D2",

                }
            }
        ]
    });
} 