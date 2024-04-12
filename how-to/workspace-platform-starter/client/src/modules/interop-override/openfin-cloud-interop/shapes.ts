import type { ConnectParams } from "@openfin/cloud-interop/dist/interfaces";
/**
 * Options for the openfin cloud interop interop override. These settings can be provided by OpenFin and user credentials should not be checked in.
 */
export interface OpenFinCloudInteropOptions extends ConnectParams {
	/**
	 * Optional name for the logger of this module.
	 */
	loggerName?: string;
}
