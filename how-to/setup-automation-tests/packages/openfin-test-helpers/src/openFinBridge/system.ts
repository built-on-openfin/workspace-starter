import { WebDriverHelper } from "../util/webDriverHelper";

/**
 * Methods for OpenFin System object handling.
 */
export class OpenFinBridgeSystem {
    /**
     * Get the runtime version.
     * @returns The runtime version.
     */
    public static async getVersion(): Promise<string> {
        return WebDriverHelper.callMethod<string>("fin.System.getVersion", undefined, true);
    }
}
