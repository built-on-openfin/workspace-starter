import type { ApplicationInfo } from "@openfin/core/src/api/system/application";
import type { WindowInfo } from "@openfin/core/src/api/system/window";
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
}
