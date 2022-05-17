import type { ApplicationInfo } from "@openfin/core/src/api/system/application";
import type { WindowDetail, WindowInfo } from "@openfin/core/src/api/system/window";
import { WebDriver } from "../webDrivers/webDriver";

/**
 * Methods for OpenFin System object handling.
 */
export class OpenFinSystem {
    /**
     * Waits for the fin runtime to become available.
     * @param timeoutMs The maximum time to wait for the fin runtime to be ready.
     * @returns The runtime version.
     */
    public static async waitForReady(timeoutMs: number): Promise<boolean> {
        return WebDriver.waitForObjectExisting("window.fin", timeoutMs);
    }

    /**
     * Get the runtime version.
     * @returns The runtime version.
     */
    public static async getVersion(): Promise<string> {
        return WebDriver.callMethod<string>("fin.System.getVersion", undefined, true);
    }

    /**
     * Exit the runtime.
     * @returns The runtime version.
     */
    public static async exit(): Promise<string> {
        return WebDriver.callMethod("fin.desktop.System.exit", undefined, true);
    }

    /**
     * Get the applications.
     * @returns The applications.
     */
    public static async getApplicationsInfo(): Promise<ApplicationInfo[]> {
        return WebDriver.callMethod("fin.System.getAllApplications", undefined, true);
    }

    /**
     * Get the windows for an application.
     * @returns The application windows.
     */
    public static async getWindowsInfo(): Promise<WindowInfo[]> {
        return WebDriver.callMethod("fin.System.getAllWindows", undefined, true);
    }

    /**
     * Find window details by name.
     * @param name The name of the window.
     * @returns The window details if the window exists.
     */
    public static async getWindowDetail(name: string): Promise<WindowDetail | undefined> {
        const windowInfo = await OpenFinSystem.getWindowsInfo();

        for (const wi of windowInfo) {
            if (wi.mainWindow.name === name) {
                return wi.mainWindow;
            } else if (wi.childWindows?.length) {
                for (const childWi of wi.childWindows) {
                    if (childWi.name === name) {
                        return childWi;
                    }
                }
            }
        }
    }

    /**
     * Wait for a window to be shown.
     * @param name The name of the window.
     * @param timeoutMs The timeout in ms to wait.
     * @returns True if the window is showing.
     */
    public static async waitForWindow(name: string, timeoutMs: number): Promise<boolean> {
        const start = Date.now();

        do {
            const windowDetail = await OpenFinSystem.getWindowDetail(name);
            if (windowDetail?.isShowing) {
                return true;
            }
            await WebDriver.sleep(1000);
        } while (start - Date.now() < timeoutMs);

        return false;
    }
}
