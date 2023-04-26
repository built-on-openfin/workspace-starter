import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	ButtonStyle
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
import type { QuoteResult, QuoteSettings } from "./shapes";

/**
 * Implement the source for Quotes.
 */
export class QuoteSource {
	/**
	 * The key to use for a quote result.
	 * @internal
	 */
	private static readonly _QUOTE_PROVIDER_DETAILS_ACTION = "Quote Details";

	/**
	 * The helpers for the source.
	 * @internal
	 */
	private _helpers: { openUrl: (url: string) => Promise<void> } | undefined;

	/**
	 * The settings for the source.
	 * @internal
	 */
	private _definition: { id: string; icon: string; data?: QuoteSettings } | undefined;

	/**
	 * The settings for the sourcesource.
	 * @internal
	 */
	private _settings: QuoteSettings | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.icon The icon for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods from the platform.
	 * @param helpers.openUrl Method for opening a url.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: { id: string; icon: string; data?: QuoteSettings },
		loggerCreator: () => void,
		helpers: { openUrl: (url: string) => Promise<void> }
	): Promise<void> {
		this._definition = definition;
		this._settings = definition.data;
		this._helpers = helpers;

		Chart.register(LineController, CategoryScale, LinearScale, LineElement, PointElement, TimeScale, Filler);
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition?.id}-help`,
				title: "/quote",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id,
					populateQuery: "/quote "
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "title",
								style: {
									color: "#FFFFFF",
									fontSize: "16px",
									fontWeight: "bold",
									marginBottom: "10px",
									borderBottom: "1px solid #53565F"
								}
							},
							{ type: "Text", dataKey: "desc-0", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-1", style: { fontSize: "12px", padding: "6px 0px" } },
							{
								type: "Container",
								style: {
									display: "flex",
									flexDirection: "column",
									padding: "10px",
									marginTop: "6px",
									backgroundColor: "#53565F",
									color: "#FFFFFF",
									borderRadius: "5px",
									overflow: "auto"
								},
								children: [
									{
										type: "Text",
										dataKey: "line-0",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									}
								]
							}
						]
					},
					data: {
						title: "/quote",
						"desc-0": "The quote command can be used to search for details of an instrument.",
						"desc-1": "For example to search for Microsoft instrument.",
						"line-0": "/quote MSFT"
					}
				}
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
			result.action.name === QuoteSource._QUOTE_PROVIDER_DETAILS_ACTION &&
			this._helpers?.openUrl &&
			result.data.url
		) {
			await this._helpers.openUrl(result.data.url as string);
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

				let price: number | undefined;
				let company: string | undefined;
				let data: { x: number; y: number }[] | undefined;

				if (quoteData?.data?.lastSalePrice) {
					price = quoteData.data.lastSalePrice;
					company = quoteData.data.company;
					data = quoteData.data.chart;
				}

				if (price !== undefined && data !== undefined && company !== undefined) {
					const graphImage = await this.renderGraph(data);

					const quoteResult: HomeSearchResult = {
						key: `quote-${symbol}`,
						title: symbol,
						label: "Information",
						actions: [
							{
								name: QuoteSource._QUOTE_PROVIDER_DETAILS_ACTION,
								hotkey: "Enter"
							}
						],
						data: {
							providerId: this._definition?.id,
							url: `https://www.nasdaq.com/market-activity/stocks/${symbol.toLowerCase()}`
						},
						template: CLITemplate.Custom,
						templateContent: {
							layout: {
								type: "Container",
								style: { display: "flex", flexDirection: "column", padding: "10px" },
								children: [
									{
										type: "Container",
										style: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
										children: [
											{ type: "Text", dataKey: "symbol", style: { fontSize: "18px", fontWeight: "bold" } },
											{ type: "Text", dataKey: "price", style: { fontSize: "18px" } }
										]
									},
									{
										type: "Text",
										dataKey: "company",
										style: { fontSize: "12px", color: "#FFFFFF", margin: "5px 0px" }
									},
									{
										type: "Container",
										style: {
											display: "flex",
											flexDirection: "column",
											backgroundColor: "black",
											borderRadius: "5px",
											padding: "5px"
										},
										children: [{ type: "Image", dataKey: "graph", alternativeText: "History", style: {} }]
									},
									{
										type: "Container",
										style: {
											display: "flex",
											flexDirection: "row",
											justifyContent: "flex-end",
											paddingTop: "10px"
										},
										children: [
											{
												type: "Button",
												buttonStyle: ButtonStyle.Primary,
												children: [{ type: "Text", dataKey: "detailsTitle", style: { fontSize: "12px" } }],
												action: QuoteSource._QUOTE_PROVIDER_DETAILS_ACTION,
												style: { fontSize: "12px" }
											}
										]
									}
								]
							},
							data: {
								symbol,
								priceTitle: "Price",
								price: `${price}`,
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

		if (ctx) {
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
		return "";
	}
}
