import type OpenFin from "@openfin/core";
import {
	CLITemplate,
	Home,
	TemplateFragmentTypes,
	type App,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResult,
	type TemplateFragment,
	type Workspace
} from "@openfin/workspace";
import {
	getCurrentSync,
	init,
	type CreateSavedWorkspaceRequest,
	type UpdateSavedWorkspaceRequest,
	type WorkspacePlatformProvider
} from "@openfin/workspace-platform";
import { getApps, launchApp } from "./apps";
import { applyDecoratedSnapshot, decorateSnapshot } from "./native-window-integration";

const PLATFORM_ID = "workspace-native-window-integration";
const PLATFORM_TITLE = "Workspace Native Window Integration";
const PLATFORM_ICON = "http://localhost:8080/favicon.ico";

let lastSearchQuery: string = "";
let lastResultIds: string[] = [];
let lastResponse: HomeSearchListenerResponse | undefined;

window.addEventListener("DOMContentLoaded", async () => {
	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	// Initialize workspace components
	await initializeWorkspaceComponents();
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
		],
		// Override some platform methods so that we can augment snapshots with native window information
		overrideCallback
	});
}

/**
 * Initialize workspace components for home.
 */
async function initializeWorkspaceComponents(): Promise<void> {
	await Home.register({
		title: PLATFORM_TITLE,
		id: PLATFORM_ID,
		icon: PLATFORM_ICON,
		onUserInput: async (request: HomeSearchListenerRequest, response: HomeSearchListenerResponse) => {
			const results = await getHomeSearchResults(request.query);

			// Capture the last query details so that we can update the home list if the workspaces change
			if (lastResponse !== undefined) {
				lastResponse.close();
			}
			lastResponse = response;
			lastResponse.open();
			lastSearchQuery = request.query;
			lastResultIds = results.map((res) => res.key);

			return {
				results
			};
		},
		onResultDispatch: handleHomeSearchResult
	});

	await Home.show();

	const providerWindow = fin.Window.getCurrentSync();
	await providerWindow.once("close-requested", async (event) => {
		await Home.deregister(PLATFORM_ID);
		await fin.Platform.getCurrentSync().quit();
	});
}

/**
 * Override methods in the platform.
 * @param WorkspacePlatformProvider The workspace platform class to extend.
 * @returns The overridden class.
 */
function overrideCallback(
	WorkspacePlatformProvider: OpenFin.Constructor<WorkspacePlatformProvider>
): WorkspacePlatformProvider {
	/**
	 * Override the platform methods so that we can intercept the snapshot calls.
	 */
	class Override extends WorkspacePlatformProvider {
		/**
		 * Override the getSnapshot platform method so that we can add the native window integration.
		 * @param payload The Payload for the snapshot.
		 * @param identity Identity of the entity that called getSnapshot.
		 * @returns The snapshot.
		 */
		public async getSnapshot(payload: undefined, identity: OpenFin.Identity): Promise<OpenFin.Snapshot> {
			const snapshot = await super.getSnapshot(payload, identity);

			return decorateSnapshot(snapshot);
		}

		/**
		 * Override the applySnapshot so that we can include native window integrations.
		 * @param payload The payload for the apply snapshot.
		 * @param identity The identity of the entity that called applySnapshot.
		 */
		public async applySnapshot(
			payload: OpenFin.ApplySnapshotPayload,
			identity?: OpenFin.Identity
		): Promise<void> {
			await super.applySnapshot(payload, identity);

			await applyDecoratedSnapshot(payload.snapshot);
		}

		/**
		 * Override the create saved workspace so we can refresh the search query in home.
		 * @param req The create request.
		 */
		public async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
			await super.createSavedWorkspace(req);
			await resetHomeQuery();
		}

		/**
		 * Override the update saved workspace so we can refresh the search query in home.
		 * @param req The update request.
		 */
		public async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
			await super.updateSavedWorkspace(req);
			await resetHomeQuery();
		}

		/**
		 * Override the delete saved workspace so we can refresh the search query in home.
		 * @param id The id of the workspace to delete.
		 */
		public async deleteSavedWorkspace(id: string): Promise<void> {
			await super.deleteSavedWorkspace(id);
			await resetHomeQuery();
		}
	}
	return new Override();
}

/**
 * Get the results to show in home.
 * @param query The request query.
 * @returns The results to display.
 */
async function getHomeSearchResults(query: string): Promise<HomeSearchResult[]> {
	// Get the list of apps
	let apps: App[] = getApps();

	// Get the workspaces from the platform
	const platform = getCurrentSync();
	let workspaces: Workspace[] = await platform.Storage.getWorkspaces();

	// Filters the results if the query is longer than 3 chars
	if (query.length >= 3) {
		apps = apps.filter((app) => app.title.toLowerCase().includes(query.toLowerCase()));
		workspaces = workspaces.filter((wks) => wks.title.toLowerCase().includes(query.toLowerCase()));
	}

	// First add the apps to the results list
	let results: HomeSearchResult[] = apps.map(
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
			}) as HomeSearchResult
	);

	// Add the workspaces to the result list
	results = results.concat(
		workspaces.map(
			(workspace) =>
				({
					key: workspace.workspaceId,
					title: workspace.title,
					label: "Workspace",
					icon: "http://localhost:8080/icons/workspace.svg",
					actions: [{ name: "Launch Workspace", hotkey: "Enter" }],
					data: { workspaceId: workspace.workspaceId },
					template: CLITemplate.Custom,
					templateContent: {
						layout: createWorkspaceTemplate(),
						data: {
							title: workspace.title,
							instructions:
								"Use the launch button to open the workspace, or the global menu in the OpenFin browser to manage your workspaces.",
							openText: "Launch"
						}
					}
				}) as HomeSearchResult
		)
	);

	return results;
}

/**
 * Handle the selection of a result in home.
 * @param result The result to process.
 */
async function handleHomeSearchResult(result: HomeDispatchedSearchResult): Promise<void> {
	// If there is a workspace id set then launch the workspace
	if (result?.data?.workspaceId) {
		const platform = getCurrentSync();
		const workspace = await platform.Storage.getWorkspace(result.data.workspaceId as string);
		await platform.applyWorkspace(workspace);
	} else {
		// Otherwise assume its an app to launch
		await launchApp(result.data as App);
	}
}

/**
 * Reset the home query when the results might have changed.
 */
async function resetHomeQuery(): Promise<void> {
	if (lastResponse) {
		let removeResponseIds = lastResultIds.slice();

		const results = await getHomeSearchResults(lastSearchQuery);
		lastResultIds = results.map((res) => res.key);

		// Only remove the items that we are not going to include this time
		removeResponseIds = removeResponseIds.filter((id) => !lastResultIds.includes(id));
		if (removeResponseIds.length > 0) {
			lastResponse.revoke(...removeResponseIds);
		}
		lastResponse.respond(results);
	}
}

/**
 * Create a template to display for the workspaces.
 * @returns The template to display.
 */
function createWorkspaceTemplate(): TemplateFragment {
	return {
		type: TemplateFragmentTypes.Container,
		style: {
			padding: "10px",
			display: "flex",
			flex: "1",
			flexDirection: "column",
			gap: "10px"
		},
		children: [
			{
				type: TemplateFragmentTypes.Text,
				dataKey: "title",
				style: {
					fontWeight: "bold",
					fontSize: "14px"
				}
			},
			{
				type: TemplateFragmentTypes.Text,
				dataKey: "instructions",
				style: {
					flex: "1"
				}
			},
			{
				type: TemplateFragmentTypes.Container,
				style: {
					display: "flex",
					flexFlow: "row wrap",
					justifyContent: "center",
					paddingTop: "10px",
					paddingBottom: "10px"
				},
				children: [
					{
						type: TemplateFragmentTypes.Button,
						style: {
							display: "flex",
							flexDirection: "column",
							width: "80px"
						},
						action: "Launch Workspace",
						children: [
							{
								type: TemplateFragmentTypes.Text,
								dataKey: "openText"
							}
						]
					}
				]
			}
		]
	};
}
