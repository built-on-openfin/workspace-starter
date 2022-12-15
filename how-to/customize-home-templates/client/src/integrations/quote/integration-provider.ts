import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import {
	CategoryScale,
	Chart,
	Filler,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	TimeScale
} from "chart.js";
import { DateTime } from "luxon";
import type { IntegrationHelpers, IntegrationModule, ModuleDefinition } from "../../integrations-shapes";
import { createHelp } from "../../templates";
import type { QuoteResult, QuoteSettings } from "./shapes";
import { getQuoteTemplate } from "./templates";

/**
 * Implement the integration provider for Quotes.
 */
export class QuoteIntegrationProvider implements IntegrationModule<QuoteSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "quote";

	/**
	 * The key to use for a quote result.
	 * @internal
	 */
	private static readonly _QUOTE_PROVIDER_DETAILS_ACTION = "Quote Details";

	/**
	 * The integration manager.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _settings: QuoteSettings | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<QuoteSettings>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._settings = definition.data;

		Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Filler);
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${QuoteIntegrationProvider._PROVIDER_ID}-help`,
				title: "/quote",
				label: "Help",
				actions: [],
				data: {
					providerId: QuoteIntegrationProvider._PROVIDER_ID,
					populateQuery: "/quote "
				},
				template: CLITemplate.Custom,
				templateContent: await createHelp(
					"/quote",
					[
						"The quote command can be used to search for details of an instrument.",
						"For example to search for Microsoft instrument."
					],
					["/quote MSFT"]
				)
			}
		];
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
		if (
			result.action.trigger === "user-action" &&
			result.action.name === QuoteIntegrationProvider._QUOTE_PROVIDER_DETAILS_ACTION &&
			result.data.url &&
			this._integrationHelpers.openUrl
		) {
			await this._integrationHelpers.openUrl(result.data.url as string);
			return true;
		}

		return false;
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

		if (query.startsWith("/quote ") && this._settings?.rootUrl) {
			let symbol = query.slice(7);

			if (symbol.length > 0 && /^[a-z]+$/i.test(symbol)) {
				symbol = symbol.toUpperCase();

				const now = DateTime.now();

				const quoteData = await this.getQuoteData(
					symbol,
					now.minus({ months: 1 }).toFormat("yyyy-LL-dd"),
					now.toFormat("yyyy-LL-dd")
				);

				let price;
				let company;
				let data: { x: number; y: number }[];

				if (quoteData?.data?.lastSalePrice) {
					price = quoteData.data.lastSalePrice;
					company = quoteData.data.company;
					data = quoteData.data.chart;
				}

				if (price !== undefined) {
					const graphImage = await this.renderGraph(data);

					const quoteResult: HomeSearchResult = {
						key: `quote-${symbol}`,
						title: symbol,
						label: "Information",
						actions: [
							{
								name: QuoteIntegrationProvider._QUOTE_PROVIDER_DETAILS_ACTION,
								hotkey: "Enter"
							}
						],
						data: {
							providerId: QuoteIntegrationProvider._PROVIDER_ID,
							url: `https://www.nasdaq.com/market-activity/stocks/${symbol.toLowerCase()}`
						},
						template: CLITemplate.Custom,
						templateContent: {
							layout: await getQuoteTemplate({
								detailsAction: QuoteIntegrationProvider._QUOTE_PROVIDER_DETAILS_ACTION
							}),
							data: {
								symbol,
								priceTitle: "Price",
								price,
								company,
								graph: graphImage,
								detailsTitle: "Details"
							}
						}
					};
					results.push(quoteResult);
				}
			}
		}

		return {
			results
		};
	}

	/**
	 * Get the quote data from the api.
	 * @param symbol The symbol to get.
	 * @param from The date from.
	 * @param to The date to.
	 * @returns The result data.
	 */
	private async getQuoteData(symbol: string, from: string, to: string): Promise<QuoteResult | undefined> {
		try {
			const symbolUrl = `${this._settings?.rootUrl}${symbol}.json`;
			const response = await fetch(symbolUrl);

			const json: QuoteResult = await response.json();

			return json;
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * Render the data as a graph.
	 * @param data The data to render.
	 * @returns The graph as a base64 encoded image.
	 */
	private async renderGraph(data: { x: number; y: number }[]): Promise<string> {
		const canvas = document.createElement("canvas");
		canvas.width = 250;
		canvas.height = 110;
		const ctx = canvas.getContext("2d");

		const chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: data.map((d) => d.x),
				datasets: [
					{
						fill: "origin",
						backgroundColor: "green",
						radius: 0,
						data
					} as never
				]
			},
			options: {
				animation: false,
				responsive: false,
				scales: {
					x: {
						display: false
					}
				},
				plugins: {
					legend: {
						display: false
					}
				}
			}
		});
		chart.update();
		return chart.toBase64Image("image/jpeg", 1);
	}
}
