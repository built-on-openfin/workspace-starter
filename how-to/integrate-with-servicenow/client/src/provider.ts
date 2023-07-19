import type OpenFin from "@openfin/core";
import {
	CLITemplate,
	Home,
	type App,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { getCurrentSync, init } from "@openfin/workspace-platform";
import { ServiceNowIntegration } from "./servicenow-integration";
import type { CustomSettings, IntegrationHelpers, Logger } from "./shapes";
import * as templateHelpers from "./template-helpers";

const PLATFORM_ID = "integrate-with-servicenow";
const PLATFORM_TITLE = "Integrate with ServiceNow";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let serviceNowIntegration: ServiceNowIntegration | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => {
		// Load the custom settings and initialize the ServiceNow integration
		// we must do this before home is registered so that the initial
		// home request for get results includes the ServiceNow results.
		const customSettings = await getManifestCustomSettings();

		if (customSettings.servicenow) {
			serviceNowIntegration = new ServiceNowIntegration();
			await serviceNowIntegration.initialize(
				{
					id: "servicenow",
					title: "ServiceNow",
					data: customSettings.servicenow
				},
				(group) => createLogger(group),
				createHelpers()
			);
		} else {
			console.error("Configuration for customSettings.servicenow is missing in manifest.fin.json");
		}

		await initializeWorkspaceComponents();
	});

	// The DOM is ready so initialize the platform
	await initializeWorkspacePlatform();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");

	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palettes: templateHelpers.DEFAULT_PALETTES
			}
		]
	});
}

/**
 * Initialize workspace components.
 * @param apps The list of apps to return.
 */
async function initializeWorkspaceComponents(apps?: App[]): Promise<void> {
	let lastResponse: HomeSearchListenerResponse;

	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		// For this example we enable this flag so that we can perform async
		// loading of the templates, the itemSelection will receive focus-change
		// as the trigger for the items when they are selected
		dispatchFocusEvents: true,
		onUserInput: async (request: HomeSearchListenerRequest, response: HomeSearchListenerResponse) => {
			const selectedFilters: CLIFilter[] = request?.context?.selectedFilters ?? [];

			let results: HomeSearchResult[] = [];
			let filters: CLIFilter[] = [];

			// We remember the last response to allow the integration to perform
			// async operations after the initial results
			if (lastResponse !== undefined) {
				lastResponse.close();
			}
			lastResponse = response;
			lastResponse.open();

			if (serviceNowIntegration) {
				// Get any home results from the ServiceNow integration
				const serviceNowResults = await serviceNowIntegration.getSearchResults(
					request.query,
					selectedFilters,
					lastResponse,
					{ queryMinLength: 3 }
				);
				results = results.concat(serviceNowResults.results);
				if (serviceNowResults.context?.filters) {
					filters = filters.concat(serviceNowResults.context?.filters);
				}
			}

			if (apps) {
				// Get any apps
				let appResults: App[] = apps.slice();
				if (request.query.length >= 3) {
					appResults = appResults.filter((a) => a.title.toLowerCase().includes(request.query.toLowerCase()));
				}

				results = results.concat(
					appResults.map(
						(app) =>
							({
								key: app.appId,
								title: app.title,
								icon: app.icons[0]?.src,
								data: app,
								label: "View",
								score: 0,
								actions: [{ name: "Launch View", hotkey: "enter" }],
								description: app.description,
								shortDescription: app.description,
								template: CLITemplate.SimpleText,
								templateContent: app.description
							}) as HomeSearchResult
					)
				);
			}

			return {
				results,
				context: {
					filters
				}
			};
		},
		onResultDispatch: async (result: HomeDispatchedSearchResult) => {
			// If the result has the ServiceNow integration set then hand the result
			// over to the integration to handle
			if (result?.data?.providerId === "servicenow" && serviceNowIntegration) {
				await serviceNowIntegration.itemSelection(result, lastResponse);
			}
		}
	});

	await Home.show();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		if (serviceNowIntegration) {
			await serviceNowIntegration.closedown();
			serviceNowIntegration = undefined;
		}
		await Home.deregister(PLATFORM_ID);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}

/**
 * Create a logger that the integration can use.
 * @param group Group for the messages.
 * @returns The created logger.
 */
function createLogger(group: string): Logger {
	return {
		info: (message: unknown, ...optionalParams: unknown[]) => console.log(group, message, ...optionalParams),
		warn: (message: unknown, ...optionalParams: unknown[]) => console.warn(group, message, ...optionalParams),
		error: (message: unknown, ...optionalParams: unknown[]) =>
			console.error(group, message, ...optionalParams),
		trace: (message: unknown, ...optionalParams: unknown[]) =>
			console.trace(group, message, ...optionalParams),
		debug: (message: unknown, ...optionalParams: unknown[]) =>
			console.debug(group, message, ...optionalParams)
	};
}

/**
 * Create a set of helper methods for the integration.
 * @returns The helpers.
 */
function createHelpers(): IntegrationHelpers {
	return {
		templateHelpers,
		getCurrentPalette: templateHelpers.getCurrentPalette,
		launchView: async (viewOptions: OpenFin.PlatformViewCreationOptions): Promise<OpenFin.View> => {
			const platform = getCurrentSync();
			return platform.createView(viewOptions);
		}
	};
}
