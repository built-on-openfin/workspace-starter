import {
	CLITemplate,
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
	console.log("Initializing home.");

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

		if (queryLower.startsWith("/loading")) {
			// Example command showing the default loading template
			// Selecting the template will show a loaded page
			return {
				results: [
					{
						key: "loading-0001",
						title: "Example loading indicator",
						label: "Information",
						actions: [],
						data: {},
						template: CLITemplate.Loading,
						templateContent: ""
					}
				]
			};
		} else if (queryLower.startsWith("/error")) {
			// Example command showing the default error template
			// Selecting or reloading the template will show a loaded page
			return {
				results: [
					{
						key: "error-0001",
						title: "Example error indicator",
						label: "Information",
						actions: [],
						data: {},
						template: CLITemplate.Error,
						templateContent: ""
					}
				]
			};
		}

		return getSearchResults(request.query, [], lastResponse);
	}

	/**
	 * The callback fired when a selection is made in home.
	 * @param result The item that was selected in home.
	 */
	async function onSelection(result: HomeDispatchedSearchResult): Promise<void> {
		if (result.data !== undefined) {
			let handled = false;
			if (result.action.trigger === "user-action" && result.key === "loading-0001") {
				lastResponse.revoke("loading-0001");
				lastResponse.respond([
					{
						key: "content-0001",
						title: "Example Content",
						label: "Information",
						actions: [],
						data: {},
						template: CLITemplate.SimpleText,
						templateContent: "Result loaded"
					}
				]);
				handled = true;
			} else if (
				result.key === "error-0001" &&
				(result.action.trigger === "user-action" || result.action.trigger === "reload")
			) {
				lastResponse.revoke("error-0001");
				lastResponse.respond([
					{
						key: "content-0001",
						title: "Example Content",
						label: "Information",
						actions: [],
						data: {},
						template: CLITemplate.SimpleText,
						templateContent: "Result loaded"
					}
				]);
				handled = true;
			} else if (result.action.trigger === "user-action" && result.key === "content-0001") {
				lastResponse.revoke("content-0001");
				handled = true;
			}
			if (!handled) {
				await itemSelection(result, lastResponse);
			}
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
