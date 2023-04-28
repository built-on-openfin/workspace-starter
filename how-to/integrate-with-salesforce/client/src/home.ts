import {
	Home,
	type App,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeProvider,
	type HomeRegistration,
	type HomeSearchListenerRequest,
	type HomeSearchListenerResponse,
	type HomeSearchResponse
} from "@openfin/workspace";
import { getHelpSearchEntries, getSearchResults, itemSelection } from "./integrations";
import { launch } from "./launch";
import { getSettings } from "./settings";

let isHomeRegistered = false;
let queryMinLength = 3;

export async function register(): Promise<HomeRegistration> {
	console.log("Initialising home.");
	const settings = await getSettings();
	if (
		settings.homeProvider === undefined ||
		settings.homeProvider.id === undefined ||
		settings.homeProvider.title === undefined
	) {
		console.warn(
			"homeProvider: not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
		);
		return;
	}

	queryMinLength = settings?.homeProvider?.queryMinLength ?? queryMinLength;

	let lastResponse: HomeSearchListenerResponse;

	let filters: CLIFilter[];

	const onUserInput = async (
		request: HomeSearchListenerRequest,
		response: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> => {
		try {
			const queryLower = request.query.toLowerCase();
			filters = request?.context?.selectedFilters;
			if (lastResponse !== undefined) {
				lastResponse.close();
			}
			lastResponse = response;
			lastResponse.open();

			const searchResults: HomeSearchResponse = {
				results: [],
				context: {
					filters: []
				}
			};

			if (queryLower === "?") {
				searchResults.results = searchResults.results.concat(await getHelpSearchEntries());
			} else {
				const integrationResults = await getSearchResults(request.query, filters, lastResponse, {
					queryMinLength
				});
				if (Array.isArray(integrationResults.results)) {
					searchResults.results = searchResults.results.concat(integrationResults.results);
				}
				if (Array.isArray(integrationResults.context.filters)) {
					searchResults.context.filters = searchResults.context.filters.concat(
						integrationResults.context.filters
					);
				}
			}

			return searchResults;
		} catch (err) {
			console.error("Exception while getting search list results", err);
		}
	};

	const onSelection = async (result: HomeDispatchedSearchResult) => {
		if (result.data !== undefined) {
			const handled = await itemSelection(result, lastResponse);

			if (!handled && result.action.trigger === "user-action") {
				await launch(result.data as App);
			}

			if (!handled) {
				console.warn(`Result not handled ${result.key}`, result.data);
			}
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	const cliProvider: HomeProvider = {
		title: settings.homeProvider.title,
		id: settings.homeProvider.id,
		icon: settings.homeProvider.icon,
		onUserInput,
		onResultDispatch: onSelection,
		dispatchFocusEvents: true
	};

	const registrationInfo = await Home.register(cliProvider);
	isHomeRegistered = true;
	console.log("Home configured.");
	return registrationInfo;
}

export async function show() {
	return Home.show();
}

export async function hide() {
	return Home.hide();
}

export async function deregister() {
	if (isHomeRegistered) {
		const settings = await getSettings();
		return Home.deregister(settings.homeProvider.id);
	}
	console.warn("Unable to deregister home as there is an indication it was never registered");
}
