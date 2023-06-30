import type OpenFin from "@openfin/core";
import {
	Home,
	type HomeDispatchedSearchResult,
	type HomeProvider,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	Integrations
} from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { type WorkflowIntegration } from "@openfin/workspace-platform/client-api/src/shapes/integrations";
import { type CustomSettings } from "./shapes";

const PLATFORM_ICON = "http://localhost:8080/favicon.ico";
const CUSTOM_MICROFLOW_ICON = "http://localhost:8080/microsoft-365-icon.svg";

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	await initializeWorkspacePlatform();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
	const customSettings = await getManifestCustomSettings();
	const integrations: WorkflowIntegration[] = [];
	let msft365WorkflowIntegration;
	if (customSettings.ms365) {
		msft365WorkflowIntegration = new Integrations.Microsoft365WorkflowIntegration({
			connect: {
				clientId: customSettings.ms365.clientId,
				redirectUri: customSettings.ms365.redirectUri,
				tenantId: customSettings.ms365.tenantId
			},
			workflows: {
				search: {
					disableAutoInitialize: true,
					MicrosoftEntityTypeConfig: {
						chatMessage: true,
						contact: true,
						drive: true,
						event: true,
						list: true,
						message: true,
						user: true
					},
					homeProvider: {
						id: "my-custom-id",
						title: "Custom MicroFlow Title",
						icon: CUSTOM_MICROFLOW_ICON
					}
				}
			}
		});
		integrations.push(msft365WorkflowIntegration);
	}
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
		integrations
	});
	await registerPlatformHomeIntegration();
	await msft365WorkflowIntegration?.initializeWorkflow("search");
	await Home.show();
}

/**
 * Allow the registration of a home integration for this platform.
 */
async function registerPlatformHomeIntegration(): Promise<void> {
	const id = "my-custom-home-registration";
	const title = "Custom Platform Home Registration";
	const icon = PLATFORM_ICON;
	const homeProvider: HomeProvider = {
		id,
		title,
		icon,
		onUserInput,
		onResultDispatch: onSelection
	};

	await Home.register(homeProvider);
	console.log("Home configured.");
}

/**
 * The callback fired when the user types in the home query.
 * @param request The request object from the home component.
 * @param response The response to use for async updates.
 * @returns The results to display in home.
 */
async function onUserInput(
	request: HomeSearchListenerRequest,
	response: HomeSearchListenerResponse
): Promise<HomeSearchResponse> {
	console.log("Home query received.", request.query);
	return { results: [] };
}

/**
 * The callback fired when a selection is made in home.
 * @param result The item that was selected in home.
 */
async function onSelection(result: HomeDispatchedSearchResult): Promise<void> {
	console.log("Home user action on returned results");
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest. These settings could come from a service instead.
 */
async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
