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
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
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
	private _integrationManager: IntegrationManager | undefined;

	/**
	 * The module is being registered.
	 * @param integrationManager The manager for the integration.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	public async register(
		integrationManager: IntegrationManager,
		integration: Integration<QuoteSettings>
	): Promise<void> {
		this._integrationManager = integrationManager;

		Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Filler);
	}

	/**
	 * The module is being deregistered.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	public async deregister(integration: Integration<QuoteSettings>): Promise<void> {}

	/**
	 * Get a list of the static help entries.
	 * @param integration The integration details.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(integration: Integration<QuoteSettings>): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${QuoteIntegrationProvider._PROVIDER_ID}-help`,
				title: "/quote",
				label: "Help",
				actions: [],
				data: {
					providerId: QuoteIntegrationProvider._PROVIDER_ID
				},
				template: CLITemplate.Custom,
				templateContent: createHelp(
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
	 * @param integration The integration details.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		integration: Integration<QuoteSettings>,
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		if (
			result.action.trigger === "user-action" &&
			result.action.name === QuoteIntegrationProvider._QUOTE_PROVIDER_DETAILS_ACTION &&
			result.data.url &&
			this._integrationManager.openUrl
		) {
			await this._integrationManager.openUrl(result.data.url as string);
			return true;
		}

		return false;
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param integration The integration details.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		integration: Integration<QuoteSettings>,
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		const results = [];

		if (query.startsWith("/quote ") && integration?.data?.rootUrl) {
			let symbol = query.slice(7);

			if (symbol.length > 0 && /^[a-z]+$/i.test(symbol)) {
				symbol = symbol.toUpperCase();

				const now = DateTime.now();

				const quoteData = await this.getQuoteData(
					integration?.data,
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
							layout: getQuoteTemplate({
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
	 * @param settings The settings.
	 * @param symbol The symbol to get.
	 * @param from The date from.
	 * @param to The date to.
	 * @returns The result data.
	 */
	private async getQuoteData(
		settings: QuoteSettings,
		symbol: string,
		from: string,
		to: string
	): Promise<QuoteResult | undefined> {
		try {
			const symbolUrl = `${settings?.rootUrl}${symbol}.json`;
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
					xAxis: {
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
