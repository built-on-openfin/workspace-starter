import { getInterop, mapToPlatformApps as mapFDC3OnePointTwoToPlatformApp } from "./fdc3/1.2/mapper";
import { getIntents, mapToPlatformApps as mapFDC3TwoPointZeroToPlatformApp } from "./fdc3/2.0/mapper";
import { createLogger } from "./logger-provider";
import type { EndpointProvider, PlatformApp } from "./shapes";
import type { DirectoryEndpoint } from "./shapes/directory-shapes";
import type { FDC3VOnePointTwoAppDirectoryResponse } from "./shapes/fdc3-1-2-shapes";
import type { FDC3VTwoPointZeroAppDirectoryResponse } from "./shapes/fdc3-2-0-shapes";

const logger = createLogger("Directory");
let endpoints: EndpointProvider;
let directories: DirectoryEndpoint[] = [];

let isInitialized = false;

function mapOpenFinResults(applications: PlatformApp[]) {
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

async function getApps(
	results: PlatformApp[] | FDC3VTwoPointZeroAppDirectoryResponse | FDC3VOnePointTwoAppDirectoryResponse
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
		// eslint-disable-next-line @typescript-eslint/dot-notation
		if (results.applications[0]["type"] !== undefined) {
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

async function getResults(directory: DirectoryEndpoint): Promise<PlatformApp[]> {
	if (directory.endpointId !== undefined) {
		logger.info(`Fetching apps from endpoint id: ${directory.endpointId}.`);
		const results = await endpoints.requestResponse<
			never,
			PlatformApp[] | FDC3VTwoPointZeroAppDirectoryResponse | FDC3VOnePointTwoAppDirectoryResponse
		>(directory.endpointId);
		const platformApps = await getApps(results);
		return platformApps;
	} else if (directory.url !== undefined) {
		logger.info(`Fetching apps from url: ${directory.url.path}`);
		const resp = await fetch(directory.url.path, { credentials: directory.url.credentials });
		const results:
			| PlatformApp[]
			| FDC3VTwoPointZeroAppDirectoryResponse
			| FDC3VOnePointTwoAppDirectoryResponse = await resp.json();
		const platformApps = await getApps(results);
		return platformApps;
	} else if (directory.map !== undefined) {
		logger.info(
			`Mapping from App Source: ${directory.map.inputId} to Platform App using: ${directory.map.outputId}`
		);
		const inputResults = await endpoints.requestResponse<never, unknown>(directory.map.inputId);
		logger.info(`Received response from ${directory.map.inputId}`);
		const outputResults = await endpoints.requestResponse<
			unknown,
			PlatformApp[] | FDC3VTwoPointZeroAppDirectoryResponse | FDC3VOnePointTwoAppDirectoryResponse
		>(directory.map.outputId, inputResults);
		const platformApps = await getApps(outputResults);
		return platformApps;
	}

	logger.error(`Directory entry ${directory.id} does not have any supported way of fetching applications.`);
	return [];
}

export async function init(endpointProvider: EndpointProvider) {
	if (isInitialized) {
		logger.warn("The app service is already initialized");
		return;
	}
	isInitialized = true;
	endpoints = endpointProvider;
}

export function addDirectory(endpoint: DirectoryEndpoint): boolean {
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
		if (!endpoints.hasEndpoint(endpoint.map.outputId)) {
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

export function removeDirectory(id: string): boolean {
	const updatedDirectoryList = directories.filter((entry) => entry.id !== id);
	if (updatedDirectoryList.length === directories.length - 1) {
		logger.error(`Unable to remove directory entry with id: ${id} as it doesn't exist`);
		return false;
	}

	directories = updatedDirectoryList;
	return true;
}

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
