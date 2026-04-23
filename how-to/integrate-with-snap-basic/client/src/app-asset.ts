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
 * @param appAssetDefinition The definition of the app asset to fetch.
 * @param options An object containing a logger to log any info or errors that occur during the process and a function to capture progress.
 * @param options.logger - A logger to log any errors that occur during the fetching of the app asset.
 * @param options.assetDownloadProgress - A callback function to report the progress of the asset download.
 * @returns A promise that resolves to the app asset info if the app asset was successfully fetched, or undefined if both attempts failed.
 */
export async function downloadAppAsset(
	appAssetDefinition: OpenFin.AppAssetInfo,
	options?: {
		logger?: Logger;
		assetDownloadProgress?: (progress: number, src: string, alias: string) => void;
	}
): Promise<OpenFin.AppAssetInfo | undefined> {
	const src = appAssetDefinition.src;
	const logger = options?.logger;
	let fetchedOrExistingAppAsset: OpenFin.AppAssetInfo | undefined = undefined;
	if (!isStringValue(src)) {
		logger?.error("Cannot initialize App Asset Download without src being defined");
		return fetchedOrExistingAppAsset;
	}

	if (!appAssetDefinition.src.startsWith("http")) {
		logger?.error(
			"Please provide a valid URL for the app asset src. Only HTTP and HTTPS protocols are supported. With https preferred for security reasons."
		);
		return fetchedOrExistingAppAsset;
	}

	const alias = appAssetDefinition.alias;
	if (!isStringValue(alias)) {
		logger?.error("Cannot initialize App Asset Download without alias being defined");
		return fetchedOrExistingAppAsset;
	}

	const target = appAssetDefinition.target;
	if (!isStringValue(target)) {
		logger?.error("Cannot initialize App Asset Download without target being defined");
		return fetchedOrExistingAppAsset;
	}

	const version = appAssetDefinition.version;
	if (!isStringValue(version)) {
		logger?.error("Cannot initialize App Asset Download without version being defined");
		return fetchedOrExistingAppAsset;
	}

	const targetAssetDefinition: OpenFin.AppAssetInfo = {
		alias,
		src,
		target,
		version,
		mandatory: appAssetDefinition.mandatory,
		args: appAssetDefinition.args
	};

	const appAssetInfo = await doesAppAssetExist(targetAssetDefinition.alias, targetAssetDefinition.version);
	if (appAssetInfo) {
		options?.logger?.info(
			`App asset with alias ${targetAssetDefinition.alias} version ${targetAssetDefinition.version} and src ${targetAssetDefinition.src} already exists. No need to download.`
		);
		return appAssetInfo;
	}

	const hasDownloadAppAssets = await getCanDownloadAppAssets(logger);

	if (!hasDownloadAppAssets) {
		logger?.warn("The platform does not have the capability or permission to download app assets.");
		return fetchedOrExistingAppAsset;
	}

	fetchedOrExistingAppAsset = await downloadAppAssetDefinition(targetAssetDefinition, options);
	return fetchedOrExistingAppAsset;
}

/**
 * @param alias The alias you want to check for
 * @param version The version you want to check for (optional)
 * @param src The source URL you want to check for (optional)
 * @returns The app asset info if it exists, otherwise undefined
 */
export async function doesAppAssetExist(
	alias: string,
	version?: string,
	src?: string
): Promise<OpenFin.AppAssetInfo | undefined> {
	try {
		const appAssetInfo = await fin.System.getAppAssetInfo({ alias });
		if (version && appAssetInfo.version !== version) {
			return undefined;
		}
		if (src && appAssetInfo.src !== src) {
			return undefined;
		}
		return appAssetInfo;
	} catch (err) {
		// asset does not exist or url does not match, return undefined
	}
	return undefined;
}

/**
 * Download an app asset based on the provided definition and options.
 * @param appAssetDefinition The definition of the app asset to download.
 * @param options An object containing a logger to log any errors that occur during the process, and a callback function to report the progress of the asset download.
 * @param options.logger - A logger to log any errors that occur during the downloading of the app asset.
 * @param options.assetDownloadProgress - A callback function to report the progress of the asset download.
 * @returns A promise that resolves to the app asset info if the app asset was successfully downloaded, or undefined if an error occurred during the download.
 */
async function downloadAppAssetDefinition(
	appAssetDefinition: OpenFin.AppAssetInfo,
	options?: {
		logger?: Logger;
		assetDownloadProgress?: (progress: number, src: string, alias: string) => void;
	}
): Promise<OpenFin.AppAssetInfo | undefined> {
	let fetchedOrExistingAppAsset: OpenFin.AppAssetInfo | undefined = undefined;
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
		// extra confirmation using the approach  used to validate the existence of an asset.
		fetchedOrExistingAppAsset = await doesAppAssetExist(
			appAssetDefinition.alias,
			appAssetDefinition.version,
			appAssetDefinition.src
		);
	} catch (err) {
		options?.logger?.error(`Unable to fetch App Asset ${formatError(err)}`);
	}
	return fetchedOrExistingAppAsset;
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
		logger?.error(`Error while querying for System.downloadAsset permission ${formatError(error)}`);
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
