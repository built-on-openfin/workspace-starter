import { WebDriver } from "../util/webDriver";

/**
 * Methods for OpenFin System object handling.
 */
export class OpenFinSystem {
    /**
     * Get the runtime version.
     * @returns The runtime version.
     */
    public static async getVersion(): Promise<string> {
        return WebDriver.callMethod<string>("fin.System.getVersion", undefined, true);
    }
}
