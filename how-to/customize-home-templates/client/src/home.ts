import {
	Home,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type CLIProvider,
	type CLISearchResponse,
	type HomeRegistration
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

	// The callback fired when the user types in the home query
	const onUserInput = async (
		request: HomeSearchListenerRequest,
		response: HomeSearchListenerResponse
	): Promise<CLISearchResponse> => {
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
	};

	// The callback fired when a selection is made in home
	const onSelection = async (result: HomeDispatchedSearchResult): Promise<void> => {
		if (result.data !== undefined) {
			await itemSelection(result, lastResponse);
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	// Important to not we enable the dispatchFocusEvents flag
	// which means we receive `focus-change` events in the onSelection
	// callback allowing us to lazy load a template
	const cliProvider: CLIProvider = {
		id,
		title,
		icon,
		onUserInput,
		onResultDispatch: onSelection,
		dispatchFocusEvents: true
	};

	const homeRegistration = await Home.register(cliProvider);
	console.log("Home configured.");
	console.log(homeRegistration);

	// Initialize all the data sources
	await initializeSources(homeRegistration);

	return homeRegistration;
}
