import type {
	ButtonStyle,
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	TemplateFragment
} from "@openfin/workspace";
import type {
	IntegrationHelpers,
	IntegrationModule,
	IntegrationModuleDefinition
} from "workspace-platform-starter/shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ExampleIntegrationsProviderOptions } from "./shapes";

/**
 * Implementation for the example integrations provider.
 */
export class ExampleIntegrationsProvider implements IntegrationModule<ExampleIntegrationsProviderOptions> {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 100000;

	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition?: IntegrationModuleDefinition<ExampleIntegrationsProviderOptions>;

	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _settings?: ExampleIntegrationsProviderOptions;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: IntegrationHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: IntegrationModuleDefinition<ExampleIntegrationsProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleIntegrationsProvider");
		this._helpers = helpers;
		this._settings = this._definition.data;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		// TODO: Add results for help entries
		const templateContent = await this._helpers?.templateHelpers.createHelp(
			"ExampleIntegrationsProvider",
			[
				"This is some example text you can provide as instructions for your integrations",
				"or you can show example commands (you will need to check the query for this command as it comes in) that your integration supports.",
				"For example, you could show the command /example 1:"
			],
			["/example 1"]
		);
		if (templateContent) {
			return [
				{
					key: `${this._definition?.id}-help1`,
					title: "ExampleIntegrationsProvider Help",
					label: "Help",
					icon: "",
					actions: [],
					data: {
						providerId: this._definition?.id
					},
					template: "Custom" as CLITemplate.Custom,
					templateContent
				}
			];
		}
		return [];
	}

	/**
	 * Get entries to show while the integration is searching.
	 * @param query The query to search for.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResultsProgress(
		query: string,
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength?: number;
			queryAgainst?: string[];
			isSuggestion?: boolean;
		}
	): Promise<HomeSearchResult[]> {
		// TODO: Add results for progress entries e.g. a Searching... entry
		// TODO: You must remove it yourself when the search is complete
		return [
			{
				key: `${this._definition?.id}-searching`,
				title: "Searching ...",
				actions: [],
				data: {
					providerId: this._definition?.id
				},
				template: "Loading" as CLITemplate.Loading,
				templateContent: ""
			}
		];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length before a query is actioned.
	 * @param options.queryAgainst The fields in the data to query against.
	 * @param options.isSuggestion Is the query from a suggestion.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options: {
			queryMinLength?: number;
			queryAgainst?: string[];
			isSuggestion?: boolean;
		}
	): Promise<HomeSearchResponse> {
		const results: HomeSearchResult[] = [];
		const returnFilters: CLIFilter[] = [];

		// TODO: Perform logic to populate results and return filters
		// TODO: Update the _DEFAULT_BASE_SCORE value
		// TODO: Remove example entries and action logic
		// To correctly order the results in home set their score field
		// e.g. score: this._definition?.baseScore ?? ExampleProvider._DEFAULT_BASE_SCORE

		// Make sure the data has a providerId property set so that the result
		// selection can be matched back to this provider
		// e.g. data: { providerId: this._definition?.id }

		const plainSearchResult: HomeSearchResult = {
			title: "Plain Search Result",
			key: "plain-search-result",
			label: "Plain Result",
			data: {
				providerId: this._definition?.id
			},
			actions: [],
			template: "Plain" as CLITemplate.Plain,
			templateContent: undefined
		};

		const simpleTextSearchResult: HomeSearchResult = {
			key: "simple-text-search-result",
			title: "Simple Text Search Result",
			icon: "",
			data: {
				providerId: this._definition?.id
			},
			label: "Simple Text Result",
			actions: [{ name: "Do custom action", hotkey: "enter" }],
			template: "SimpleText" as CLITemplate.SimpleText,
			templateContent: "This entry will launch an application when clicked."
		};

		const loadingSearchResult: HomeSearchResult = {
			key: "loading-0001",
			title: "Example loading indicator",
			label: "Information",
			actions: [{ name: "Replace Loading Entry With Content Entry", hotkey: "enter" }],
			data: {
				providerId: this._definition?.id
			},
			template: "Loading" as CLITemplate.Loading,
			templateContent: ""
		};

		const errorSearchResult: HomeSearchResult = {
			key: "error-0001",
			title: "Example error indicator",
			label: "Information",
			actions: [{ name: "Replace Error Entry With Content Entry", hotkey: "enter" }],
			data: {
				providerId: this._definition?.id
			},
			template: "Error" as CLITemplate.Error,
			templateContent: ""
		};

		// we provide a templateHelpers api to help build the template
		// the example below creates a template using standard json
		// we also include an example using our templateHelpers to create a button with an image

		// example of elements and buttons, the image button will be added to this
		const templateFragment: TemplateFragment[] = [
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
						buttonStyle: "Primary" as ButtonStyle.Primary,
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
						buttonStyle: "Secondary" as ButtonStyle.Secondary,
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
						buttonStyle: "TextOnly" as ButtonStyle.TextOnly,
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
				buttonStyle: "Primary" as ButtonStyle.Primary,
				dataKey: "buttonSplit1Content"
			}
		];

		if (this._helpers?.templateHelpers) {
			const imageButtonFragment = await this._helpers.templateHelpers.createButton(
				"Secondary" as ButtonStyle.Secondary,
				"imageButtonTextId",
				"image-button-id",
				{
					border: "none",
					borderRadius: "50%",
					width: "40px",
					height: "40px",
					padding: "0px",
					justifyContent: "center"
				},
				[
					await this._helpers.templateHelpers.createImage("imageSrcId", "image alt text", {
						width: "16px",
						height: "16px"
					})
				]
			);
			// add the custom image
			templateFragment.push(imageButtonFragment);
		}

		const customSearchResult: HomeSearchResult = {
			key: "templates-example",
			title: "Templates Example",
			label: "Information",
			actions: [],
			data: {
				providerId: this._definition?.id
			},
			template: "Custom" as CLITemplate.Custom,
			templateContent: {
				layout: {
					type: "Container",
					style: { display: "flex", flexDirection: "column", gap: "10px", padding: "10px" },
					children: templateFragment
				},
				data: {
					imageButtonTextId: "Image Based Button",
					imageSrcId:
						"https://built-on-openfin.github.io/workspace-starter/workspace/v21.0.0/workspace-platform-starter/common/images/ms/apps/outlook-calendar.svg",
					textContent: "This is text content",
					imageContent: "https://cdn.openfin.co/workspace/21.0.13/icons/defaultFavicon.svg",
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
		};

		results.push(
			plainSearchResult,
			simpleTextSearchResult,
			customSearchResult,
			loadingSearchResult,
			errorSearchResult
		);

		// revoke searching entry as you are about to return results
		lastResponse.revoke(`${this._definition?.id}-searching`);

		return {
			results,
			context: {
				filters: returnFilters
			}
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
		let handled = false;

		if (result.data && result.action.trigger === "user-action") {
			// check for main result selection
			if (result.key === "plain-search-result") {
				this._logger?.info("Plain Search Result Clicked");
				handled = true;
			} else if (result.key === "simple-text-search-result") {
				this._logger?.info("Simple Text Search Result Clicked");
				if (this._helpers?.getApp && this._helpers?.launchApp) {
					// an example of launching a defined application
					const callAppId = "call-app";
					const callApp = await this._helpers?.getApp(callAppId);
					if (callApp) {
						await this._helpers.launchApp(callApp.appId);
						handled = true;
					} else {
						this._logger?.error(
							`App with id ${callAppId} not found and cannot be launched as part of the simple text search result click.`
						);
					}
				} else {
					this._logger?.error(
						"App helpers not available to launch app as part of the simple text search result click."
					);
				}
			} else if (result.key === "loading-0001") {
				lastResponse.revoke("loading-0001");
				lastResponse.respond([
					{
						key: "content-0001",
						title: "Example Content For Loading",
						label: "Information",
						actions: [],
						data: {
							providerId: this._definition?.id
						},
						template: "SimpleText" as CLITemplate.SimpleText,
						templateContent: "Result loaded"
					}
				]);
				handled = true;
			} else if (result.key === "error-0001") {
				lastResponse.revoke("error-0001");
				lastResponse.respond([
					{
						key: "content-0002",
						title: "Example Content For Error",
						label: "Information",
						actions: [{ name: "Remove This Entry", hotkey: "enter" }],
						data: {
							providerId: this._definition?.id
						},
						template: "SimpleText" as CLITemplate.SimpleText,
						templateContent: "Result loaded"
					}
				]);
				handled = true;
			} else if (result.key === "content-0001") {
				lastResponse.revoke("content-0001");
				handled = true;
			} else if (result.key === "content-0002") {
				lastResponse.revoke("content-0002");
				handled = true;
			}

			// check for button clicks inside of a custom template
			if (result.action.name === "button-primary-action") {
				this._logger?.info("Button Primary Clicked");
				handled = true;
			} else if (result.action.name === "button-secondary-action") {
				this._logger?.info("Button Secondary Clicked");
				handled = true;
			} else if (result.action.name === "button-text-only-action") {
				this._logger?.info("Button Text Only Clicked");
				handled = true;
			} else if (result.action.name === "split-primary-action") {
				this._logger?.info("Split Primary Action");
				handled = true;
			} else if (result.action.name === "split-action-1") {
				this._logger?.info("Split Action 1");
				handled = true;
			} else if (result.action.name === "split-action-2") {
				this._logger?.info("Split Action 2");
				handled = true;
			} else if (result.action.name === "image-button-id") {
				this._logger?.info("Image Button Clicked");
				handled = true;
			}
		}

		return handled;
	}
}
