import type { OpenFin } from "@openfin/core";

/**
 * Interface for a logger.
 */
interface Logger {
	/**
	 * Log data as information.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	info(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as error.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	error(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as warning.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	warn(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as trace.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	trace(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as debug.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	debug(message: unknown, ...optionalParams: unknown[]): void;
}

/**
 * For functionality that requires an app asset, this function will attempt to fetch the app asset from the passed definition.
 * If the src is not available or blocked it will try to use a fallback URL. If both fail, it will return false.
 * @param appAssetDefinition The definition of the app asset to fetch.
 * @param options An object containing the fallback URL to use if fetching from the src fails, and a logger to log any errors that occur during the process.
 * @param options.fallbackUrl - A URL to use to fetch the app asset if the original src is not available or blocked.
 * @param options.logger - A logger to log any errors that occur during the fetching of the app asset.
 * @param options.assetDownloadProgress - A callback function to report the progress of the asset download.
 * @returns A promise that resolves to true if the app asset was successfully fetched, or false if both attempts failed.
 */
export async function downloadAppAsset(
	appAssetDefinition: OpenFin.AppAssetInfo,
	options?: {
		fallbackUrl?: string;
		logger?: Logger;
		assetDownloadProgress?: (progress: number, src: string, alias: string) => void;
	}
): Promise<boolean> {
	const src = appAssetDefinition.src;
	const logger = options?.logger;
	let hasFetchedAsset = false;
	if (!isStringValue(src)) {
		logger?.error("Cannot initialize App Asset Download without src being defined");
		return hasFetchedAsset;
	}

	if (!appAssetDefinition.src.startsWith("http")) {
		logger?.error(
			"Please provide a valid URL for the app asset src. Only HTTP and HTTPS protocols are supported. With https preferred for security reasons."
		);
		return hasFetchedAsset;
	}

	const alias = appAssetDefinition.alias;
	if (!isStringValue(alias)) {
		logger?.error("Cannot initialize App Asset Download without alias being defined");
		return hasFetchedAsset;
	}

	const target = appAssetDefinition.target;
	if (!isStringValue(target)) {
		logger?.error("Cannot initialize App Asset Download without target being defined");
		return hasFetchedAsset;
	}

	const version = appAssetDefinition.version;
	if (!isStringValue(version)) {
		logger?.error("Cannot initialize App Asset Download without version being defined");
		return hasFetchedAsset;
	}

	const hasDownloadAppAssets = await getCanDownloadAppAssets(logger);

	if (!hasDownloadAppAssets) {
		logger?.warn("The platform does not have the capability or permission to download app assets.");
		return hasFetchedAsset;
	}

	hasFetchedAsset = await downloadAppAssetDefinition(appAssetDefinition, options);
	if (!hasFetchedAsset && isStringValue(options?.fallbackUrl)) {
		if (options.fallbackUrl.startsWith("http")) {
			logger?.warn(`Attempting to fetch app asset from fallback URL ${options.fallbackUrl}`);
			const fallbackAppAssetDefinition = { ...appAssetDefinition, src: options.fallbackUrl };
			hasFetchedAsset = await downloadAppAssetDefinition(fallbackAppAssetDefinition, options);
		} else {
			logger?.error(
				"The provided fallback URL is invalid. Please provide a valid URL for the fallback. Only HTTP and HTTPS protocols are supported. With https preferred for security reasons."
			);
		}
	}
	return hasFetchedAsset;
}

/**
 * Download an app asset based on the provided definition and options.
 * @param appAssetDefinition The definition of the app asset to download.
 * @param options An object containing a logger to log any errors that occur during the process, and a callback function to report the progress of the asset download.
 * @param options.logger - A logger to log any errors that occur during the downloading of the app asset.
 * @param options.assetDownloadProgress - A callback function to report the progress of the asset download.
 * @returns A promise that resolves to true if the app asset was successfully downloaded, or false if an error occurred during the download.
 */
async function downloadAppAssetDefinition(
	appAssetDefinition: OpenFin.AppAssetInfo,
	options?: {
		logger?: Logger;
		assetDownloadProgress?: (progress: number, src: string, alias: string) => void;
	}
): Promise<boolean> {
	let hasFetchedAsset = false;
	try {
		await fin.System.downloadAsset(appAssetDefinition, (progress) => {
			const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
			if (options?.assetDownloadProgress) {
				options.assetDownloadProgress(downloadedPercent, appAssetDefinition.src, appAssetDefinition.alias);
			}
			options?.logger?.info(
				`Downloaded ${downloadedPercent}% of app asset with alias ${appAssetDefinition.alias} and version ${appAssetDefinition.version} and url ${appAssetDefinition.src}`
			);
		});
		hasFetchedAsset = true;
	} catch (err) {
		options?.logger?.error("Unable to fetch App Asset", formatError(err));
	}
	return hasFetchedAsset;
}

/**
 * Do we have the permissions to download app assets.
 * @param logger Optional logger to log errors.
 * @returns True if we have permission.
 */
export async function getCanDownloadAppAssets(logger?: Logger): Promise<boolean> {
	let canDownloadAppAssets: boolean = false;
	try {
		const canDownloadAppAssetsResponse =
			await fin.System.queryPermissionForCurrentContext("System.downloadAsset");
		canDownloadAppAssets = canDownloadAppAssetsResponse?.granted;
	} catch (error) {
		logger?.error("Error while querying for System.downloadAsset permission", error);
		canDownloadAppAssets = false;
	}
	return canDownloadAppAssets;
}

/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value: unknown): value is string {
	// eslint-disable-next-line no-restricted-syntax
	return !isEmpty(value) && typeof value === "string";
}

/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value: unknown): value is string {
	return isString(value) && value.trim().length > 0;
}

/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
export function isEmpty(value: unknown): value is null | undefined {
	// eslint-disable-next-line no-restricted-syntax
	return value === undefined || value === null;
}

/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
export function isObject(value: unknown): value is object {
	// eslint-disable-next-line no-restricted-syntax
	return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err: unknown): string {
	if (isEmpty(err)) {
		return "";
	} else if (err instanceof Error) {
		return err.message;
	} else if (isStringValue(err)) {
		return err;
	} else if (isObject(err) && "message" in err && isString(err.message)) {
		return err.message;
	}
	return JSON.stringify(err);
}
