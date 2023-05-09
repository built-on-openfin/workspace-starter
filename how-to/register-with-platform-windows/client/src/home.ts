import {
	type CLIDispatchedSearchResult,
	type CLIProvider,
	type CLISearchListenerRequest,
	type CLISearchResponse,
	CLITemplate,
	Home,
	type HomeRegistration,
	type HomeSearchResult,
	type App
} from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";

/**
 * Register with the home component.
 * @param id The id to register the provider with.
 * @param title The title to use for the home registration.
 * @param icon The icon to use for the home registration.
 * @returns The registration details for home.
 */
export async function register(id: string, title: string, icon: string): Promise<HomeRegistration> {
	console.log("Initialising home.");

	// The callback fired when the user types in the home query
	const onUserInput = async (request: CLISearchListenerRequest): Promise<CLISearchResponse> => ({
		results: mapAppEntriesToSearchEntries([OPENFIN_INFORMATION_APP])
	});

	// The callback fired when a selection is made in home
	const onSelection = async (result: CLIDispatchedSearchResult): Promise<void> => {
		if (result.data !== undefined) {
			const app: App = result.data as App;
			const platform = getCurrentSync();
			await platform.createView({ manifestUrl: app.manifest });
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	const cliProvider: CLIProvider = {
		id,
		title,
		icon,
		onUserInput,
		onResultDispatch: onSelection
	};

	const homeRegistration = await Home.register(cliProvider);
	console.log("Home configured.");
	console.log(homeRegistration);

	return homeRegistration;
}

/**
 * Convert the app definitions into search results.
 * @param apps The list of apps to convert.
 * @returns The search result templates.
 */
function mapAppEntriesToSearchEntries(apps: App[]): HomeSearchResult[] {
	const results: HomeSearchResult[] = [];

	if (Array.isArray(apps)) {
		for (const app of apps) {
			const entry: Partial<HomeSearchResult> = {
				key: app.appId,
				title: app.title,
				data: app,
				label: "View",
				actions: [{ name: "Launch View", hotkey: "enter" }],
				description: app.description,
				shortDescription: app.description,
				template: CLITemplate.SimpleText,
				templateContent: app.description
			};

			if (Array.isArray(app.icons) && app.icons.length > 0) {
				entry.icon = app.icons[0].src;
			}

			results.push(entry as HomeSearchResult);
		}
	}

	return results;
}

/**
 * App definition to use for demonstration which show OpenFin environment information.
 */
const OPENFIN_INFORMATION_APP: App = {
	appId: "openfin-information",
	title: "OpenFin Information",
	description: "Display information about the OpenFin environment",
	manifest: "http://localhost:8080/common/views/platform/of-info.view.fin.json",
	manifestType: "view",
	icons: [
		{
			src: "http://localhost:8080/common/images/icon-blue.png"
		}
	],
	contactEmail: "contact@example.com",
	supportEmail: "support@example.com",
	publisher: "OpenFin",
	intents: [],
	images: [
		{
			src: "http://localhost:8080/common/images/previews/of-info.png"
		}
	],
	tags: ["view", "openfin", "versions"]
};
