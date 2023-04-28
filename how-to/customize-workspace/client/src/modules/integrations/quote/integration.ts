import {
	type ButtonStyle,
	type CLIFilter,
	type CLITemplate,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	type TemplateFragment
} from "@openfin/workspace";
import {
	CategoryScale,
	Chart,
	Filler,
	LineController,
	LineElement,
	LinearScale,
	PointElement,
	TimeScale
} from "chart.js";
import type {
	IntegrationHelpers,
	IntegrationModule,
	LoggerCreator,
	ModuleDefinition
} from "customize-workspace/shapes";
import { DateTime } from "luxon";
import type { QuoteResult, QuoteSettings } from "./shapes";

/**
 * Implement the integration provider for Quotes.
 */
export class QuoteIntegrationProvider implements IntegrationModule<QuoteSettings> {
	/**
	 * The key to use for a quote result.
	 * @internal
	 */
	private static readonly _QUOTE_PROVIDER_DETAILS_ACTION = "Quote Details";

	/**
	 * Provider id.
	 * @internal
	 */
	private _providerId: string;

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
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._settings = definition.data;
		this._providerId = definition.id;

		Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Filler);
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._providerId}-help`,
				title: "/quote",
				label: "Help",
				actions: [],
				data: {
					providerId: this._providerId,
					populateQuery: "/quote "
				},
				template: "Custom" as CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
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
							providerId: this._providerId,
							url: `https://www.nasdaq.com/market-activity/stocks/${symbol.toLowerCase()}`
						},
						template: "Custom" as CLITemplate.Custom,
						templateContent: {
							layout: await this.getQuoteTemplate(),
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

	/**
	 * Get the template for the quote.
	 * @returns The quote template.
	 */
	private async getQuoteTemplate(): Promise<TemplateFragment> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const templateFragment: TemplateFragment = await this._integrationHelpers.templateHelpers.createContainer(
			"column",
			[
				await this._integrationHelpers.templateHelpers.createContainer(
					"row",
					[
						await this._integrationHelpers.templateHelpers.createText("symbol", 18, { fontWeight: "bold" }),
						await this._integrationHelpers.templateHelpers.createText("price", 18)
					],
					{
						justifyContent: "space-between"
					}
				),
				await this._integrationHelpers.templateHelpers.createText("company", 12, {
					color: palette.textDefault,
					margin: "5px 0px"
				}),
				await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[await this._integrationHelpers.templateHelpers.createImage("graph", "History")],
					{
						backgroundColor: "black",
						borderRadius: "5px",
						padding: "5px"
					}
				),
				await this._integrationHelpers.templateHelpers.createContainer(
					"row",
					[
						await this._integrationHelpers.templateHelpers.createButton(
							"primary" as ButtonStyle.Primary,
							"detailsTitle",
							QuoteIntegrationProvider._QUOTE_PROVIDER_DETAILS_ACTION,
							{
								fontSize: "12px"
							}
						)
					],
					{ justifyContent: "flex-end", paddingTop: "10px" }
				)
			],
			{
				padding: "10px"
			}
		);

		return templateFragment;
	}
}
