import { WebDriver } from "../webDrivers/webDriver";

/**
 * Methods for OpenFin Store object handling.
 */
export class OpenFinStore {
    /**
     * Show the store window.
     * @param timeout The amount of time to wait for the store window to open.
     * @returns True if the window was found and opened.
     */
    public static async show(timeout: number): Promise<boolean> {
        if (await WebDriver.waitForWindowByTitle("Home | Storefront", timeout)) {
            // There should probably be a better way to detect that the store window is
            // ready to show, without this sleep it does not have enough time to
            // initialise the providers and will throw an error
            await WebDriver.sleep(1000);
            await WebDriver.callMethod("fin.Workspace.Storefront.show", undefined, true);
            return true;
        }

        return false;
    }

    /**
     * Hide the store window.
     */
    public static async hide(): Promise<void> {
        await WebDriver.callMethod("fin.Workspace.Storefront.hide", undefined, true);
    }
}
