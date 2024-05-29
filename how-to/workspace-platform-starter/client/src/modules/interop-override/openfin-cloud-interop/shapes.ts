import type { CloudInteropOverrideParams } from "@openfin/cloud-interop";
/**
 * Options for the openfin cloud interop interop override. These settings can be provided by OpenFin and user credentials should not be checked in.
 */
export interface OpenFinCloudInteropOptions extends CloudInteropOverrideParams {
	/**
	 * Optional name for the logger of this module.
	 */
	loggerName?: string;
}
