import {
	CLIDispatchedSearchResult,
	CLIProvider,
	CLISearchListenerRequest,
	CLISearchListenerResponse,
	CLISearchResponse,
	CLITemplate,
	Home,
	HomeRegistration,
	HomeSearchResult
} from "@openfin/workspace";
import { getCurrentSync } from "@openfin/workspace-platform";
import { getApps } from "./apps";

const providerId = "register-with-home-basic";

async function getResults(queryLower: string): Promise<CLISearchResponse> {
	const apps = await getApps();

	if (Array.isArray(apps)) {
		const initialResults: HomeSearchResult[] = [];

		for (let i = 0; i < apps.length; i++) {
			const entry: Partial<HomeSearchResult> = {
				key: apps[i].appId,
				title: apps[i].title,
				data: apps[i],
				actions: []
			};
			const action = { name: "Launch View", hotkey: "enter" };

			if (apps[i].manifestType === "view") {
				entry.label = "View";
				entry.actions = [action];
			}
			if (apps[i].manifestType === "snapshot") {
				entry.label = "Snapshot";
				action.name = "Launch Snapshot";
				entry.actions = [action];
			}
			if (apps[i].manifestType === "manifest") {
				entry.label = "App";
				action.name = "Launch App";
				entry.actions = [action];
			}
			if (apps[i].manifestType === "external") {
				action.name = "Launch Native App";
				entry.actions = [action];
				entry.label = "Native App";
			}

			if (Array.isArray(apps[i].icons) && apps[i].icons.length > 0) {
				entry.icon = apps[i].icons[0].src;
			}

			if (apps[i].description !== undefined) {
				entry.description = apps[i].description;
				entry.shortDescription = apps[i].description;
				entry.template = CLITemplate.SimpleText;
				entry.templateContent = apps[i].description;
			} else {
				entry.template = CLITemplate.Plain;
			}
			initialResults.push(entry as HomeSearchResult);
		}

		let finalResults;

		if (queryLower === undefined || queryLower === null || queryLower.length === 0) {
			finalResults = initialResults;
		} else {
			finalResults = initialResults.filter((entry) => {
				const targetValue = entry.title;

				if (targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
					return targetValue.toLowerCase().includes(queryLower);
				}
				return false;
			});
		}

		const response: CLISearchResponse = {
			results: finalResults
		};

		return response;
	}
	return {
		results: []
	};
}

export async function register(): Promise<HomeRegistration> {
	console.log("Initialising home.");

	const queryMinLength = 3;

	const onUserInput = async (
		request: CLISearchListenerRequest,
		response: CLISearchListenerResponse
	): Promise<CLISearchResponse> => {
		const queryLower = request.query.toLowerCase();
		if (queryLower.startsWith("/")) {
			return { results: [] };
		}

		if (queryLower.length < queryMinLength) {
			return getResults("");
		}

		return getResults(queryLower);
	};

	const onSelection = async (result: CLIDispatchedSearchResult) => {
		if (result.data !== undefined) {
			const platform = getCurrentSync();
			await platform.launchApp({ app: result.data });
		} else {
			console.warn("Unable to execute result without data being passed");
		}
	};

	const cliProvider: CLIProvider = {
		title: "Basic Workspace Platform",
		id: providerId,
		icon: "http://localhost:8080/favicon.ico",
		onUserInput,
		onResultDispatch: onSelection
	};

	console.log("Home configured.");

	return Home.register(cliProvider);
}

export async function deregister() {
	return Home.deregister(providerId);
}

export async function show() {
	return Home.show();
}

export async function hide() {
	return Home.hide();
}
