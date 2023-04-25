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
import { getApps, launchApp } from "./apps";

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
	const onUserInput = async (request: CLISearchListenerRequest): Promise<CLISearchResponse> => {
		const queryLower = request.query.toLowerCase();

		// If the query starts with a / treat this as a help request
		// so we don't have any additional entries to show
		if (queryLower.startsWith("/")) {
			return { results: [] };
		}

		return getResults(queryLower);
	};

	// The callback fired when a selection is made in home
	const onSelection = async (result: CLIDispatchedSearchResult): Promise<void> => {
		if (result.data !== undefined) {
			await launchApp(result.data as App);
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
 * Get the list of results to show in home.
 * @param queryLower Lower case version of query.
 * @returns The search response containing results.
 */
async function getResults(queryLower: string): Promise<CLISearchResponse> {
	const apps = await getApps();

	let filteredApps: App[];

	// If the query length is less than 3 don't do any filtering
	if (queryLower.length < 3) {
		filteredApps = apps;
	} else {
		// Otherwise try and match the app title with the query
		filteredApps = apps.filter((entry) => entry.title.toLowerCase().includes(queryLower));
	}

	return {
		results: mapAppEntriesToSearchEntries(filteredApps)
	};
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
			const action = { name: "Launch View", hotkey: "enter" };
			const entry: Partial<HomeSearchResult> = {
				key: app.appId,
				title: app.title,
				data: app
			};

			if (app.manifestType === "view") {
				entry.label = "View";
				entry.actions = [action];
			} else if (app.manifestType === "snapshot") {
				entry.label = "Snapshot";
				action.name = "Launch Snapshot";
				entry.actions = [action];
			} else if (app.manifestType === "manifest") {
				entry.label = "App";
				action.name = "Launch App";
				entry.actions = [action];
			} else if (app.manifestType === "external") {
				action.name = "Launch Native App";
				entry.actions = [action];
				entry.label = "Native App";
			}

			if (Array.isArray(app.icons) && app.icons.length > 0) {
				entry.icon = app.icons[0].src;
			}

			entry.description = app.description;
			entry.shortDescription = app.description;
			entry.template = CLITemplate.SimpleText;
			entry.templateContent = app.description;

			results.push(entry as HomeSearchResult);
		}
	}

	return results;
}
