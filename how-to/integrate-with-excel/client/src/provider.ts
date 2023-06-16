import type OpenFin from "@openfin/core";
import {
	CLITemplate,
	Home,
	type App,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerRequest,
	type HomeSearchResult
} from "@openfin/workspace";
import { init } from "@openfin/workspace-platform";
import { getApps, launchApp } from "./apps";
import { ExcelIntegration } from "./excel-integration";
import type { CustomSettings } from "./shapes";

const PLATFORM_ID = "integrate-with-excel";
const PLATFORM_TITLE = "Integrate with Excel";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let excelIntegration: ExcelIntegration | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	// When the platform api is ready we bootstrap the platform.
	const platform = fin.Platform.getCurrentSync();
	await platform.once("platform-api-ready", async () => {
		// Load the custom settings and initialize the excel integration
		// we must do this before home is registered so that the initial
		// home request for get results includes the excel results.
		const customSettings = await getManifestCustomSettings();
		if (customSettings.excel) {
			excelIntegration = new ExcelIntegration();
			await excelIntegration.initialize(customSettings.excel);
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

			if (excelIntegration) {
				// Get any home results from the excel integration
				const excelResults = await excelIntegration.getSearchResults(request.query);
				results = results.concat(excelResults.results);
			}

			// Add any apps
			let apps = getApps();
			if (request.query.length >= 3) {
				apps = apps.filter((a) => a.title.toLowerCase().includes(request.query.toLowerCase()));
			}

			results = results.concat(
				apps.map(
					(app) =>
						({
							key: app.appId,
							title: app.title,
							icon: app.icons[0]?.src,
							data: app,
							label: "View",
							actions: [{ name: "Launch View", hotkey: "enter" }],
							description: app.description,
							shortDescription: app.description,
							template: CLITemplate.SimpleText,
							templateContent: app.description
						} as HomeSearchResult)
				)
			);

			return {
				results
			};
		},
		onResultDispatch: async (result: HomeDispatchedSearchResult) => {
			// If the result has the excel integration set then hand the result
			// over to the integration to handle
			if (result?.data?.providerId === "excel") {
				if (excelIntegration) {
					await excelIntegration.itemSelection(result);
				}
			} else {
				await launchApp(result.data as App);
			}
		}
	});

	await Home.show();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		if (excelIntegration) {
			await excelIntegration.closedown();
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
