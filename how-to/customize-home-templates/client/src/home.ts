import {
	Home,
	type HomeDispatchedSearchResult,
	type HomeProvider,
	type HomeRegistration,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse
} from "@openfin/workspace";
import { getHelpSearchEntries, getSearchResults, initializeSources, itemSelection } from "./sources";

/**
 * Register with the home component.
 * @param id The id to register the provider with.
 * @param title The title to use for the home registration.
 * @param icon The icon to use for the home registration.
 * @returns The registration details for home.
 */
export async function register(id: string, title: string, icon: string): Promise<HomeRegistration> {
	console.log("Initialising home.");

	let lastResponse: HomeSearchListenerResponse;

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
		const queryLower = request.query.toLowerCase();

		// If the query starts with a ? treat this as a help request
		// so we don't have any additional entries to show
		if (queryLower.startsWith("?")) {
			return { results: await getHelpSearchEntries() };
		}

		if (lastResponse !== undefined) {
			lastResponse.close();
		}
		lastResponse = response;
		lastResponse.open();

		return getSearchResults(request.query, [], lastResponse);
	}

	/**
	 * The callback fired when a selection is made in home.
	 * @param result The item that was selected in home.
	 */
	async function onSelection(result: HomeDispatchedSearchResult): Promise<void> {
		if (result.data !== undefined) {
			await itemSelection(result, lastResponse);
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	}

	// Important to note we enable the dispatchFocusEvents flag
	// which means we receive `focus-change` events in the onSelection
	// callback allowing us to lazy load a template
	const homeProvider: HomeProvider = {
		id,
		title,
		icon,
		onUserInput,
		onResultDispatch: onSelection,
		dispatchFocusEvents: true
	};

	const homeRegistration = await Home.register(homeProvider);
	console.log("Home configured.");
	console.log(homeRegistration);

	// Initialize all the data sources
	await initializeSources(homeRegistration);

	return homeRegistration;
}
