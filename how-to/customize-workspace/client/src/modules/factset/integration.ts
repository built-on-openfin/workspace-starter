import {
	CLITemplate,
	type HomeDispatchedSearchResult,
	type CLIFilter,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import { BrowserWindowModule, getCurrentSync } from "@openfin/workspace-platform";
import type { IntegrationHelpers, IntegrationModule } from "../../integrations-shapes";
import type { Logger, LoggerCreator } from "../../logger-shapes";
import type { ModuleDefinition } from "../../module-shapes";
import type { FactSetIntegrationOptions, FactSetResponse, FactSetTemplateData } from "./shapes";
import { getTemplateAndData, getBusyTemplate } from "./templates";

/**
 * Implement the integration provider for FactSet.
 * See https://developer.factset.com/api-catalog/factset-search-answers#apiDocumentation
 */
export class FactSetIntegration implements IntegrationModule<FactSetIntegrationOptions> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "factset";

	/**
	 * The key to use for a FactSet Answer result.
	 * @internal
	 */
	private static readonly _ANSWER_SEARCH_RESULT_KEY = "factset-answer";

	/**
	 * The key to use for a FactSet busy result.
	 * @internal
	 */
	private static readonly _BUSY_SEARCH_RESULT_KEY = "factset-busy";

	/**
	 * The integration settings.
	 * @internal
	 */
	private _settings: FactSetIntegrationOptions;

	/**
	 * The integration logger.
	 * @internal
	 */
	private _logger: Logger;

	/**
	 * The debounce timer;
	 */
	private _debounceTimerId: number | undefined;

	/**
	 * Is there a request in progress.
	 */
	private _queryInProgress: boolean;

	/**
	 * Is there another query to try.
	 */
	private _nextQuery: string | undefined;

	/**
	 * Is there a next response to go with the nextQuery.
	 */
	private _nextResponse: HomeSearchListenerResponse | undefined;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<FactSetIntegrationOptions>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._logger = loggerCreator("FactSetIntegration");
		this._settings = definition.data;

		this._logger.info("Initializing");
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		const results = [];

		if (this._settings?.apiEndpoint) {
			const busyRequired = this.debounceRequest(query, lastResponse);
			if (busyRequired) {
				results.push(await this.getBusySearchResult());
			}
		}

		return {
			results
		};
	}

	/**
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		const data: { providerId: string } & FactSetTemplateData = result.data;

		if (data.providerId === FactSetIntegration._PROVIDER_ID && result.action.name.startsWith("open")) {
			const idx = Number.parseInt(result.action.name.slice(4), 10);
			if (!Number.isNaN(idx) && data?.applicationLinks && idx < data?.applicationLinks.length) {
				const searchResultId = window.crypto.randomUUID();

				let foundStandaloneView: OpenFin.View;
				let foundStandaloneWindow: OpenFin.Window;
				let foundPage;
				let windowToAddTo: BrowserWindowModule;
				const fullFactsetPageId = "ecf723de-6fbb-492f-b3d2-90b44272c623";

				const platform = getCurrentSync();
				const childWindows = await platform.Application.getChildWindows();
				for (const childWindow of childWindows) {
					const views = await childWindow.getCurrentViews();
					foundStandaloneView = views.find((v) => v.identity.name === "factset-standalone");
					if (foundStandaloneView) {
						foundStandaloneWindow = childWindow;
						break;
					}
				}
				if (!foundStandaloneView) {
					const windows = await platform.Browser.getAllWindows();
					if (windows.length > 0) {
						windowToAddTo = windows[0];

						for (const window of windows) {
							const pages = await window.getPages();
							foundPage = pages.find((p) => p.pageId === fullFactsetPageId);
							if (foundPage) {
								windowToAddTo = window;
							}
						}
					}
				}

				if (foundStandaloneView && foundStandaloneWindow) {
					await foundStandaloneView.navigate(data?.applicationLinks[idx].webLink);
					await foundStandaloneWindow.bringToFront();
				} else if (windowToAddTo && foundPage) {
					await windowToAddTo.updatePage({
						pageId: fullFactsetPageId,
						page: {
							title: "Full FactSet",
							layout: {
								content: [
									{
										type: "component",
										componentName: "view",
										componentState: {
											name: searchResultId,
											uuid: searchResultId,
											url: data?.applicationLinks[idx].webLink
											// identity: { name: searchResultId, uuid: searchResultId }
										}
									}
								]
							}
						}
					});
					await windowToAddTo.setActivePage(fullFactsetPageId);
					await windowToAddTo.openfinWindow.bringToFront();
				} else {
					const manifestResponse = await fetch(`${this._settings.rootUrl}views/factset/factset-view.json`);
					const manifest: OpenFin.PlatformViewCreationOptions = await manifestResponse.json();
					const view = await platform.createView(manifest);
					await view.navigate(data?.applicationLinks[idx].webLink);
				}
				return true;
			}
		}

		return false;
	}

	/**
	 * Get the search result to display when we are busy searching.
	 * @returns The busy search result entry.
	 * @internal
	 */
	private async getBusySearchResult(): Promise<HomeSearchResult> {
		return {
			key: FactSetIntegration._BUSY_SEARCH_RESULT_KEY,
			icon: this._settings.iconMap.result,
			title: "FactSet Searching...",
			actions: [],
			data: {
				providerId: FactSetIntegration._PROVIDER_ID
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await getBusyTemplate("busyIcon"),
				data: {
					busyIcon: this._settings.iconMap.busy
				}
			}
		};
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns True if a busy entry is required.
	 */
	private debounceRequest(query: string, lastResponse: HomeSearchListenerResponse): boolean {
		let busyRequired = false;

		if (this._queryInProgress) {
			// If there is already a query in progress then store the query
			// for when it is finished, and then we perform that query.
			this._nextQuery = query;
			this._nextResponse = lastResponse;
			// Keep the busy entry even for the new query.
			busyRequired = true;
		} else if (this._debounceTimerId) {
			window.clearTimeout(this._debounceTimerId);
			this._debounceTimerId = undefined;
		} else {
			// Need minimum 2 words for search with each work at least 1 chars
			const queryParts = query.split(" ");
			if (queryParts.length >= 2 && queryParts[0].length >= 1 && queryParts[1].length >= 1) {
				busyRequired = true;
				this._queryInProgress = true;

				this._debounceTimerId = window.setTimeout(async () => {
					try {
						const response = await this.sendRequest(query);
						if (response) {
							lastResponse.respond([response]);
						}
					} catch (err) {
						console.error(err);
					} finally {
						this._debounceTimerId = undefined;
						this._queryInProgress = false;

						if (this._nextQuery) {
							// There is another query to send so restart the flow
							const nextQuery = this._nextQuery;
							const nextResponse = this._nextResponse;
							this._nextQuery = undefined;
							this._nextResponse = undefined;
							this.debounceRequest(nextQuery, nextResponse);
						} else {
							// Revoke any remaining busy results.
							lastResponse.revoke(FactSetIntegration._BUSY_SEARCH_RESULT_KEY);
						}
					}
				}, 300);
			}
		}

		return busyRequired;
	}

	/**
	 * Send the request to the API proxy.
	 * @param query The query to search for.
	 * @returns The results if there was one.
	 */
	private async sendRequest(query: string): Promise<HomeSearchResult | undefined> {
		const res = await fetch(
			`${this._settings.apiEndpoint}search/answers/v1/data?query=${encodeURIComponent(query)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${btoa(`${this._settings.userId}:${this._settings.apiKey}`)}`
				}
			}
		);

		const json: FactSetResponse = await res.json();

		if (
			json.data &&
			json.data.template !== "AnswerWithoutDataTemplate" &&
			json.data.template !== "NoAnswerTemplate"
		) {
			return {
				actions: [],
				title: json.data.templateData.headline ?? json.data.title,
				label: json.data.title,
				key: FactSetIntegration._ANSWER_SEARCH_RESULT_KEY,
				icon: this._settings.iconMap.result,
				data: {
					providerId: FactSetIntegration._PROVIDER_ID,
					...json.data.templateData
				},
				template: CLITemplate.Custom,
				templateContent: await getTemplateAndData(json.data.template, json.data.templateData)
			};
		} else if (json.errors) {
			console.error(json.errors);
		}
	}
}
