import {
	CLITemplate,
	Home,
	type App,
	type HomeDispatchedSearchResult,
	type HomeProvider,
	type HomeRegistration,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { launchApp } from "./launch";
import type { PlatformSettings } from "./shapes";

/**
 * Register with the home component.
 * @param platformSettings The platform settings from the manifest.
 * @param apps The list of apps from the manifest.
 * @returns The registration details for home.
 */
export async function register(
	platformSettings: PlatformSettings,
	apps?: App[]
): Promise<HomeRegistration | undefined> {
	console.log("Initializing home.");

	const homeProvider: HomeProvider = {
		...platformSettings,
		/**
		 * The callback fired when the user types in the home query.
		 * @param request The request object from the home component.
		 * @param response The response to use for async updates.
		 * @returns The results to display in home.
		 */
		onUserInput: async (
			request: HomeSearchListenerRequest,
			response: HomeSearchListenerResponse
		): Promise<HomeSearchResponse> => {
			const queryLower = request.query.toLowerCase();

			// If the query starts with a / treat this as a help request
			// so we don't have any additional entries to show
			if (queryLower.startsWith("/")) {
				return { results: [] };
			}

			return {
				results: mapAppEntriesToSearchEntries(apps ?? [])
			};
		},
		/**
		 * The callback fired when a selection is made in home.
		 * @param result The item that was selected in home.
		 */
		onResultDispatch: async (result: HomeDispatchedSearchResult): Promise<void> => {
			if (result.data !== undefined) {
				await launchApp(result.data as App);
			} else {
				console.warn("Unable to execute result without data being passed");
			}
		}
	};

	const homeRegistration = await Home.register(homeProvider);
	console.log("Home configured.");

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
			const action = { name: "Launch View", hotkey: "enter" };
			const entry: Partial<HomeSearchResult> = {
				key: app.appId,
				title: app.title,
				data: app,
				description: app.description,
				shortDescription: app.description,
				template: CLITemplate.SimpleText,
				templateContent: app.description
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
				entry.label = "Native App";
				entry.actions = [action];
			}

			if (Array.isArray(app.icons) && app.icons.length > 0) {
				entry.icon = app.icons[0].src;
			}

			results.push(entry as HomeSearchResult);
		}
	}

	return results;
}
