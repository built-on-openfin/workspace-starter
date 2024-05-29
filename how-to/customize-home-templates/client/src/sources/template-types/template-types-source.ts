import {
	ButtonStyle,
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";

/**
 * Implement the source for example of template types.
 */
export class TemplateTypesSource {
	/**
	 * The helpers for the source.
	 * @internal
	 */
	private _helpers: { openUrl: (url: string) => Promise<void> } | undefined;

	/**
	 * The settings for the source.
	 * @internal
	 */
	private _definition: { id: string; data?: unknown } | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods from the platform.
	 * @param helpers.openUrl Method for opening a url.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: {
			id: string;
			data?: unknown;
		},
		loggerCreator: () => void,
		helpers: { openUrl: (url: string) => Promise<void> }
	): Promise<void> {
		this._definition = definition;
		this._helpers = helpers;
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition?.id}-help`,
				title: "/templates",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id,
					populateQuery: "/templates"
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
						title: "/templates",
						"desc-0": "The templates command shows a template with all the different template content types.",
						"line-0": "/templates"
					}
				}
			}
		];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the get search results.
	 * @param options.isSuggestion Is the query a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			isSuggestion: boolean;
		}
	): Promise<HomeSearchResponse> {
		const results: HomeSearchResult[] = [];

		if (query.startsWith("/templates")) {
			results.push({
				key: "templates-example",
				title: "Templates Example",
				label: "Information",
				actions: [],
				data: {
					providerId: this._definition?.id
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", gap: "10px", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "textContent",
								style: {
									color: "#FFFFFF",
									fontSize: "14px"
								}
							},
							{
								type: "Image",
								dataKey: "imageContent",
								alternativeText: "This is alternative text",
								style: {
									width: "32px",
									height: "32px"
								}
							},
							{
								type: "List",
								dataKey: "listContent"
							},
							{
								type: "Container",
								style: { display: "flex", flexDirection: "row", gap: "5px" },
								children: [
									{
										type: "Button",
										buttonStyle: ButtonStyle.Primary,
										children: [
											{
												type: "Text",
												dataKey: "buttonPrimaryContent"
											}
										],
										action: "button-primary-action"
									},
									{
										type: "Button",
										buttonStyle: ButtonStyle.Secondary,
										children: [
											{
												type: "Text",
												dataKey: "buttonSecondaryContent"
											}
										],
										action: "button-secondary-action"
									},
									{
										type: "Button",
										buttonStyle: ButtonStyle.TextOnly,
										children: [
											{
												type: "Text",
												dataKey: "buttonTextOnlyContent"
											}
										],
										action: "button-text-only-action"
									}
								]
							},
							{
								type: "SplitButton",
								buttonStyle: ButtonStyle.Primary,
								dataKey: "buttonSplit1Content"
							}
						]
					},
					data: {
						textContent: "This is text content",
						imageContent: "https://cdn.openfin.co/workspace/18.0.0/icons/defaultFavicon.svg",
						listContent: [
							["Label 1", "Value 1"],
							["Label 2", "Value 2"]
						],
						buttonPrimaryContent: "Primary",
						buttonSecondaryContent: "Secondary",
						buttonTextOnlyContent: "Text Only",
						buttonSplit1Content: {
							label: "Split Button 1",
							tooltip: "Click me",
							action: "split-primary-action",
							options: [
								{
									label: "Menu Option 1",
									tooltip: "Menu Option 1 Tooltip",
									action: "split-action-1"
								},
								{
									label: "Menu Option 2",
									tooltip: "Menu Option 2 Tooltip",
									action: "split-action-2"
								}
							]
						}
					}
				}
			});
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
		if (result.action.trigger === "user-action") {
			if (result.action.name === "button-primary-action") {
				console.log("Button Primary Clicked");
				return true;
			} else if (result.action.name === "button-secondary-action") {
				console.log("Button Secondary Clicked");
				return true;
			} else if (result.action.name === "button-text-only-action") {
				console.log("Button Text Only Clicked");
				return true;
			} else if (result.action.name === "split-primary-action") {
				console.log("Split Primary Action");
				return true;
			} else if (result.action.name === "split-action-1") {
				console.log("Split Action 1");
				return true;
			} else if (result.action.name === "split-action-2") {
				console.log("Split Action 2");
				return true;
			}
		}

		return false;
	}
}
