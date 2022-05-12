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
        if (await WebDriver.waitForWindow("Home | Storefront", timeout)) {
            await WebDriver.callMethod<undefined>("fin.Workspace.Storefront.show", undefined, true);
            return true;
        }

        return false;
    }

    /**
     * Hide the store window.
     */
    public static async hide(): Promise<void> {
        await WebDriver.callMethod<undefined>("fin.Workspace.Storefront.hide", undefined, true);
    }
}
