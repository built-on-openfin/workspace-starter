import type OpenFin from "@openfin/core";
import {
	Home,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerRequest,
	type HomeSearchResult
} from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { RssIntegration } from "./rss-integration";
import { type CustomSettings } from "./shapes";

const PLATFORM_ID = "integrate-with-rss";
const PLATFORM_TITLE = "Integrate with RSS";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let rssIntegration: RssIntegration | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => initializeWorkspaceComponents());

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Load the custom settings and initialize the rss integration
	// we must do this before home is registered so that the initial
	// home request for get results includes the rss results.
	const customSettings = await getManifestCustomSettings();
	if (customSettings.rss) {
		rssIntegration = new RssIntegration();
		await rssIntegration.initialize(customSettings.rss);
	}
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initialising workspace platform");
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
				palette: {
					brandPrimary: "#0A76D3",
					brandSecondary: "#383A40",
					backgroundPrimary: "#1E1F23"
				}
			}
		]
	});
}

/**
 * Initialize workspace components.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async (request: HomeSearchListenerRequest) => {
			let results: HomeSearchResult[] = [];

			if (rssIntegration) {
				// Get any home results from the rss integration
				const rssResults = await rssIntegration.getSearchResults(request.query);
				results = results.concat(rssResults.results);
			}

			return {
				results
			};
		},
		onResultDispatch: async (result: HomeDispatchedSearchResult) => {
			if (result?.data.providerId === "rss" && rssIntegration) {
				await rssIntegration.itemSelection(result);
			}
		}
	});

	await Home.show();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await Home.deregister(PLATFORM_ID);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Read the custom settings from the manifest.fin.json.
 * @returns The custom settings from the manifest.
 */
export async function getManifestCustomSettings(): Promise<CustomSettings> {
	// Get the manifest for the current application
	const app = await fin.Application.getCurrent();

	// Extract the custom settings for this application
	const manifest: OpenFin.Manifest & { customSettings?: CustomSettings } = await app.getManifest();
	return manifest.customSettings ?? {};
}
