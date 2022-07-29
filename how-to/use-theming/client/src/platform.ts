import { fin } from "@openfin/core";
import { init as workspacePlatformInit } from "@openfin/workspace-platform";

type CustomApplicationOptions = OpenFin.ApplicationCreationOptions & { userAppConfigArgs: { palette: string } };

export async function init() {
    console.log("Initializing platform");

    // This is the default dark theme
    let palette = {
        brandPrimary: "#504CFF",
        brandSecondary: "#383A40",
        backgroundPrimary: "#1E1F23",
        background1: "#111214",
        background2: "#1E1F23",
        background3: "#24262B",
        background4: "#2F3136",
        background5: "#383A40",
        background6: "#53565F",
        statusSuccess: "#35C759",
        statusWarning: "#F48F00",
        statusCritical: "#BE1D1F",
        statusActive: "#0498FB",
        inputBackground: "#53565F",
        inputColor: "#FFFFFF",
        inputPlaceholder: "#C9CBD2",
        inputDisabled: "#7D808A",
        inputFocused: "#C9CBD2",
        textDefault: "#FFFFFF",
        textHelp: "#C9CBD2",
        textInactive: "#7D808A"
    };

    // Find any palette options passed on the command line and override the default palette
    const app = fin.Application.getCurrentSync();
    const appInfo = await app.getInfo();
    const userArgs = (appInfo.initialOptions as CustomApplicationOptions)?.userAppConfigArgs;
    if (typeof userArgs?.palette === "string") {
        try {
            const plainJson = atob(userArgs.palette);
            const customPalette = JSON.parse(plainJson);
            palette = {
                ...palette,
                ...customPalette
            };
            console.log("Custom palette", palette);
        } catch (err) {
            console.error("Error decoding palette", err);
        }
    }

    await workspacePlatformInit({
        browser: {},
        theme: [
            {
                label: "theme",
                palette
            }
        ]
    });
}
