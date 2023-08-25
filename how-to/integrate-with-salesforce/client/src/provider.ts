import type OpenFin from "@openfin/core";
import {
	Home,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { getCurrentSync, init } from "@openfin/workspace-platform";
import { SalesforceIntegration } from "./salesforce-integration";
import type { CustomSettings, IntegrationHelpers, Logger } from "./shapes";
import * as templateHelpers from "./template-helpers";

const PLATFORM_ID = "integrate-with-salesforce";
const PLATFORM_TITLE = "Integrate with Salesforce";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let salesforceIntegration: SalesforceIntegration | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => {
		// Load the custom settings and initialize the salesforce integration
		// we must do this before home is registered so that the initial
		// home request for get results includes the salesforce results.
		const customSettings = await getManifestCustomSettings();
		if (customSettings.salesforce) {
			salesforceIntegration = new SalesforceIntegration();
			await salesforceIntegration.initialize(
				{
					id: "salesforce",
					title: "Salesforce",
					data: customSettings.salesforce
				},
				createLogger,
				createHelpers()
			);
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
				palette: templateHelpers.DEFAULT_PALETTES.dark
			}
		],
		// Override the interop so that we can handle intent messages from Salesforce
		interopOverride
	});
}

/**
 * Initialize workspace components.
 */
async function initializeWorkspaceComponents(): Promise<void> {
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

			if (salesforceIntegration) {
				// Get any home results from the salesforce integration
				const salesforceResults = await salesforceIntegration.getSearchResults(
					request.query,
					selectedFilters,
					lastResponse,
					{ queryMinLength: 3 }
				);
				results = results.concat(salesforceResults.results);
				if (salesforceResults.context?.filters) {
					filters = filters.concat(salesforceResults.context?.filters);
				}
			}

			return {
				results,
				context: {
					filters
				}
			};
		},
		onResultDispatch: async (result: HomeDispatchedSearchResult) => {
			// If the result has the salesforce integration set then hand the result
			// over to the integration to handle
			if (result?.data?.providerId === "salesforce" && salesforceIntegration) {
				await salesforceIntegration.itemSelection(result, lastResponse);
			}
		}
	});

	await Home.show();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		if (salesforceIntegration) {
			await salesforceIntegration.closedown();
			salesforceIntegration = undefined;
		}
		await Home.deregister(PLATFORM_ID);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Override the platform interop.
 * @param InteropBroker The base interop broker class.
 * @returns The overloaded broker.
 */
function interopOverride(InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>): OpenFin.InteropBroker {
	/**
	 * Extend the InteropBroker to handle intents.
	 */
	class InteropOverride extends InteropBroker {
		/**
		 * Override the fire intent callback to always launch the call application.
		 * @param intent The intent to handle.
		 */
		public async handleFiredIntent(intent: OpenFin.Intent): Promise<void> {
			console.log("Received request for a raised intent:", intent);

			if (intent.name === "ViewContact") {
				const viewIdentity = { uuid: fin.me.identity.uuid, name: "fdc3-intent-view" };
				let hasView = false;
				try {
					const view = fin.View.wrapSync(viewIdentity);
					// If the call to getInfo succeeds then the view is already
					// available, no need to create a new one
					await view.getInfo();
					hasView = true;
				} catch {}

				// There was no view so create a new one
				if (!hasView) {
					try {
						// Create the intent tool view on the green channel
						// the same channel that the integration uses for views
						const platform = getCurrentSync();
						await platform.createView({
							name: "fdc3-intent-view",
							url: " https://built-on-openfin.github.io/dev-extensions/extensions/v14.0.0/interop/fdc3/intent/fdc3-intent-view.html",
							fdc3InteropApi: "1.2",
							interop: {
								currentContextGroup: "green"
							}
						});
					} catch {}
				}

				await super.setIntentTarget(intent, { uuid: fin.me.identity.uuid, name: "fdc3-intent-view" });
			}
		}
	}

	return new InteropOverride();
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
		},
		getInteropClient: async () => fin.Interop.connectSync(fin.me.uuid, {})
	};
}
