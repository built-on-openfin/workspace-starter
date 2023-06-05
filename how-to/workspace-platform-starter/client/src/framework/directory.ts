import { getInterop, mapToPlatformApps as mapFDC3OnePointTwoToPlatformApp } from "./fdc3/1.2/mapper";
import { getIntents, mapToPlatformApps as mapFDC3TwoPointZeroToPlatformApp } from "./fdc3/2.0/mapper";
import { createLogger } from "./logger-provider";
import type { EndpointProvider, PlatformApp } from "./shapes";
import type { DirectoryApps, DirectoryEndpoint } from "./shapes/directory-shapes";
import type { FDC3VOnePointTwoAppDirectoryResponse } from "./shapes/fdc3-1-2-shapes";
import type { FDC3VTwoPointZeroAppDirectoryResponse } from "./shapes/fdc3-2-0-shapes";

const logger = createLogger("Directory");
let endpoints: EndpointProvider | undefined;
let directories: DirectoryEndpoint[] = [];

let isInitialized = false;

/**
 * Initialize the endpoint provider.
 * @param endpointProvider The endpoint provider.
 */
export async function init(endpointProvider: EndpointProvider): Promise<void> {
	if (isInitialized) {
		logger.warn("The app service is already initialized");
		return;
	}
	isInitialized = true;
	endpoints = endpointProvider;
}

/**
 * Add an an directory endpoint.
 * @param endpoint The endpoint to add to the directory.
 * @returns True if the endpoint was successfully added.
 */
export function addDirectoryEndpoint(endpoint: DirectoryEndpoint): boolean {
	if (endpoints) {
		if (endpoint?.id === undefined) {
			logger.error(
				"A directory entry didn't specify an id and it needs an id to be registered. It cannot be added as a directory endpoint.",
				endpoint
			);
			return false;
		}

		if (directories.length !== 0 && directories.findIndex((entry) => entry.id === endpoint.id) !== -1) {
			logger.error(
				`A directory entry with this id: ${endpoint.id} already exists so this passed endpoint cannot be added.`,
				endpoint
			);
			return false;
		}

		if (endpoint.endpointId === undefined && endpoint.map === undefined && endpoint.url === undefined) {
			logger.error("A directory endpoint must either specify a url, endpoint or a map.");
			return false;
		}

		if (endpoint?.endpointId !== undefined && !endpoints.hasEndpoint(endpoint.endpointId)) {
			logger.error(
				`A directory entry specifies an endpoint that does not exist: ${endpoint.endpointId} and it can therefore not be added as a directory endpoint. Id: ${endpoint.id}`,
				endpoint
			);
			return false;
		} else if (endpoint?.map !== undefined) {
			if (!endpoints.hasEndpoint(endpoint.map.inputId)) {
				logger.error(
					`A directory entry specifies an endpoint map input id that does not exist: ${endpoint.map.inputId} and it can therefore not be added as a directory endpoint. Id: ${endpoint.id}`,
					endpoint
				);
				return false;
			}
			if (endpoint.map.outputId && !endpoints.hasEndpoint(endpoint.map.outputId)) {
				logger.error(
					`A directory entry specifies an endpoint map output id that does not exist: ${endpoint.map.outputId} and it can therefore not be added as a directory endpoint. Id: ${endpoint.id}`,
					endpoint
				);
				return false;
			}
		} else if (
			endpoint?.url?.path !== undefined &&
			endpoint.url.path !== null &&
			(endpoint.url.path.trim().length === 0 || !endpoint.url.path.startsWith("http"))
		) {
			logger.error(
				`A directory entry specifies an endpoint url path that is either not specified or is in the wrong format: ${endpoint?.url?.path} and it can therefore not be added as a directory endpoint. Id: ${endpoint.id}`,
				endpoint
			);
			return false;
		}
		directories.push(endpoint);
		return true;
	}

	return false;
}

/**
 * Remove a directory by id.
 * @param id The id of the directory to remove.
 * @returns True if the directory was removed.
 */
export function removeDirectory(id: string): boolean {
	const updatedDirectoryList = directories.filter((entry) => entry.id !== id);
	if (updatedDirectoryList.length === directories.length - 1) {
		logger.error(`Unable to remove directory entry with id: ${id} as it doesn't exist`);
		return false;
	}

	directories = updatedDirectoryList;
	return true;
}

/**
 * Get the apps from the directory.
 * @returns The list of applications from the directories.
 */
export async function getPlatformApps(): Promise<PlatformApp[]> {
	if (directories.length === 0) {
		return [];
	}
	const directoriesToCall = [...directories];
	const apps: PlatformApp[] = [];

	for (const directory of directoriesToCall) {
		try {
			logger.info(`Fetching apps from directory id: ${directory.id}.`);
			const retrievedApps = await getResults(directory);
			logger.info(`Fetched ${retrievedApps.length} apps from directory id: ${directory.id}.`);
			apps.push(...retrievedApps);
		} catch (error) {
			logger.error(`Error fetching apps from directory ${JSON.stringify(directory)}`, error);
		}
	}

	return apps;
}

/**
 * Get a list of platform apps mapped from different formats.
 * @param results The result to map to platform apps.
 * @returns The list of mapped apps.
 */
async function getApps(
	results: DirectoryApps
): Promise<PlatformApp[]> {
	if (Array.isArray(results)) {
		const openfinApps = mapOpenFinResults(results);
		return openfinApps;
	} else if (results.metadata?.type === "fdc3" && results?.metadata?.version !== undefined) {
		const version = results.metadata.version;
		switch (version) {
			case "1.2": {
				const mappedApps: PlatformApp[] = mapFDC3OnePointTwoToPlatformApp(
					(results as FDC3VOnePointTwoAppDirectoryResponse).applications
				);
				return mappedApps;
			}
			case "2.0": {
				const mappedApps: PlatformApp[] = mapFDC3TwoPointZeroToPlatformApp(
					(results as FDC3VTwoPointZeroAppDirectoryResponse).applications
				);
				return mappedApps;
			}
			default: {
				throw new Error(`Unknown/Unsupported FDC3 version specified: ${version}`);
			}
		}
	} else if (Array.isArray(results.applications) && results.applications.length > 0) {
		if ("type" in results.applications[0]) {
			const mappedApps: PlatformApp[] = mapFDC3TwoPointZeroToPlatformApp(
				(results as FDC3VTwoPointZeroAppDirectoryResponse).applications
			);
			return mappedApps;
		}
		const mappedApps: PlatformApp[] = mapFDC3OnePointTwoToPlatformApp(
			(results as FDC3VOnePointTwoAppDirectoryResponse).applications
		);
		return mappedApps;
	}
	return [];
}


/**
 * Map platform apps from the OpenFin format to standard PlatformApp.
 * @param applications The applications to map.
 * @returns The list of mapped applications.
 */
function mapOpenFinResults(applications: PlatformApp[]): PlatformApp[] {
	const platformApps: PlatformApp[] = [];

	for (const app of applications) {
		if (Array.isArray(app.intents) && app.interop === undefined) {
			app.interop = getInterop(app.intents);
		} else if (app.interop !== undefined && !Array.isArray(app.intents)) {
			app.intents = getIntents(app.interop);
		}
		platformApps.push(app);
	}

	return platformApps;
}

/**
 * Get a list for the platform apps from the endpoints.
 * @param directoryEndpoint The directory to use for the application.
 * @returns The list of application from the endpoint.
 */
async function getResults(directoryEndpoint: DirectoryEndpoint): Promise<PlatformApp[]> {
	if (endpoints) {
		if (directoryEndpoint.endpointId !== undefined) {
			logger.info(`Fetching apps from endpoint id: ${directoryEndpoint.endpointId}.`);
			const results = await endpoints.requestResponse<
				never,
				DirectoryApps
			>(directoryEndpoint.endpointId);
			if (results) {
				return getApps(results);
			}
		} else if (directoryEndpoint.url !== undefined) {
			logger.info(`Fetching apps from url: ${directoryEndpoint.url.path}`);
			const resp = await fetch(directoryEndpoint.url.path, { credentials: directoryEndpoint.url.credentials });
			const results:
				| PlatformApp[]
				| FDC3VTwoPointZeroAppDirectoryResponse
				| FDC3VOnePointTwoAppDirectoryResponse = await resp.json();
			return getApps(results);
		} else if (directoryEndpoint.map !== undefined) {
			if (!directoryEndpoint.map.outputId) {
				logger.error(
					`Mapping from App Source: ${directoryEndpoint.map.inputId} has no outputId`
				);
			} else {
				logger.info(
					`Mapping from App Source: ${directoryEndpoint.map.inputId} to Platform App using: ${directoryEndpoint.map.outputId}`
				);
				const inputResults = await endpoints.requestResponse<never, unknown>(directoryEndpoint.map.inputId);
				logger.info(`Received response from ${directoryEndpoint.map.inputId}`);
				const outputResults = await endpoints.requestResponse<
					unknown,
					DirectoryApps
				>(directoryEndpoint.map.outputId, inputResults);

				if (outputResults) {
					return getApps(outputResults);
				}
			}
		}
	}

	logger.error(`Directory entry ${directoryEndpoint.id} does not have any supported way of fetching applications.`);
	return [];
}

