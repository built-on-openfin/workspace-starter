import type { Logger } from "./shapes";
import { isEmpty } from "./utils";

let canLaunchExternalProcess: boolean | undefined;
let canDownloadAppAssets: boolean | undefined;
let canRVMLaunchAndDownload: boolean | undefined;

/**
 * Do we have the permissions and capability to launch external processes.
 * @param logger Optional logger to log errors.
 * @returns True if we have permission.
 */
export async function getCanLaunchExternalProcess(logger?: Logger): Promise<boolean> {
	if (!isEmpty(canLaunchExternalProcess)) {
		return canLaunchExternalProcess;
	}

	try {
		const canLaunchExternalProcessResponse = await fin.System.queryPermissionForCurrentContext(
			"System.launchExternalProcess"
		);

		canLaunchExternalProcess = canLaunchExternalProcessResponse?.granted;
	} catch (error) {
		logger?.error("Error while querying for System.launchExternalProcess permission", error);
		canLaunchExternalProcess = false;
	}
	const canUseRVM = await isNativeSupportedByRVM();
	canLaunchExternalProcess = canLaunchExternalProcess && canUseRVM;
	return canLaunchExternalProcess;
}

/**
 * Do we have the permissions to download app assets.
 * @param logger Optional logger to log errors.
 * @returns True if we have permission.
 */
export async function getCanDownloadAppAssets(logger?: Logger): Promise<boolean> {
	if (!isEmpty(canDownloadAppAssets)) {
		return canDownloadAppAssets;
	}

	try {
		const canDownloadAppAssetsResponse =
			await fin.System.queryPermissionForCurrentContext("System.downloadAsset");
		canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;
	} catch (error) {
		logger?.error("Error while querying for System.downloadAsset permission", error);
		canDownloadAppAssets = false;
	}
	const canUseRVM = await isNativeSupportedByRVM();
	canDownloadAppAssets = canDownloadAppAssets && canUseRVM;
	return canDownloadAppAssets;
}

/**
 * The mac rvm as of version 11 does not support download app asset
 * or launch external process. Once there is support then we will
 * update logic to support a minimum rvm version on mac.
 * @returns True if the downloading and/or launching native apps is supported by the RVM.
 */
async function isNativeSupportedByRVM(): Promise<boolean> {
	if (!isEmpty(canRVMLaunchAndDownload)) {
		return canRVMLaunchAndDownload;
	}
	const hostSpecs = await fin.System.getHostSpecs();
	canRVMLaunchAndDownload = !hostSpecs.name.toLowerCase().startsWith("mac");
	return canRVMLaunchAndDownload;
}
