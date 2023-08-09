import type OpenFin from "@openfin/core";
import {
	AuthorizationError,
	connect,
	enableLogging,
	type SalesforceConnection,
	type SalesforceRestApiQueryResult,
	type SalesforceRestApiSearchResult
} from "@openfin/salesforce";
import {
	ButtonStyle,
	CLITemplate,
	type CLIFilter,
	type CLISearchResultLoading,
	type CLISearchResultSimpleText,
	type CustomTemplate,
	type HomeAction,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	type TemplateFragment
} from "@openfin/workspace";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import type {
	IntegrationHelpers,
	Logger,
	SalesforceAction,
	SalesforceBatchRequest,
	SalesforceBatchRequestItem,
	SalesforceBatchResponse,
	SalesforceFeedElementPage,
	SalesforceFieldMapping,
	SalesforceMapping,
	SalesforceResultData,
	SalesforceSearchResult,
	SalesforceSettings,
	TemplateHelpers
} from "./shapes";

/**
 * Implement the integration provider for Salesforce.
 */
export class SalesforceIntegration {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 600000;

	/**
	 * The key to use for a Salesforce result.
	 * @internal
	 */
	private static readonly _BROWSE_SEARCH_RESULT_KEY = "browse-salesforce";

	/**
	 * The id for the SaleForce filters.
	 * @internal
	 */
	private static readonly _OBJECTS_FILTER_ID = "salesforce-objects";

	/**
	 * The id of the connecting result.
	 * @internal
	 */
	private static readonly _CONNECTING_SEARCH_RESULT_KEY = "salesforce-connecting-result";

	/**
	 * The id of the not connected result.
	 * @internal
	 */
	private static readonly _RECONNECT_SEARCH_RESULT_KEY = "salesforce-not-connected-result";

	/**
	 * The action for opening.
	 * @internal
	 */
	private static readonly _ACTION_OPEN = "Open";

	/**
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The module definition.
	 * @internal
	 */
	private _definition:
		| { id: string; title: string; baseScore?: number; data: SalesforceSettings }
		| undefined;

	/**
	 * The settings.
	 * @internal
	 */
	private _settings: SalesforceSettings | undefined;

	/**
	 * The mappings.
	 * @internal
	 */
	private _mappings: SalesforceMapping[];

	/**
	 * The connection to Salesforce.
	 * @internal
	 */
	private _salesForceConnection: SalesforceConnection | undefined;

	/**
	 * The debounce timer id.
	 */
	private _debounceTimerId?: number;

	/**
	 * Logger for logging info.
	 * @internal
	 */
	private _logger: Logger | undefined;

	/**
	 * The last search result response.
	 */
	private _lastResponse?: HomeSearchListenerResponse;

	/**
	 * Are we in a connecting state.
	 */
	private _isConnecting: boolean;

	/**
	 * Cache for referenced names.
	 */
	private readonly _referenceCache: {
		[id: string]: {
			lastReferenced: number;
			value: string;
		};
	};

	/**
	 * Create a new instance of SalesforceIntegrationProvider.
	 */
	constructor() {
		this._referenceCache = {};
		this._mappings = [];
		this._isConnecting = false;
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id to use when the integration is used as a module.
	 * @param definition.title The title to use when the integration is used as a module.
	 * @param definition.data The settings for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: { id: string; title: string; data: SalesforceSettings },
		loggerCreator: (group: string) => Logger,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._definition = definition;
		this._integrationHelpers = helpers;
		this._settings = definition.data;

		this._definition.title = this._definition.title ?? "Salesforce";

		this._logger = loggerCreator(this._definition.title);
		this._logger?.info(`Initializing ${this._definition.title}`);

		if (!this._settings.orgUrl) {
			this._logger?.error("Configuration is missing orgUrl");
			return;
		}

		if (!this._settings.consumerKey) {
			this._logger?.error("Configuration is missing consumerKey");
			return;
		}

		this._settings.iconMap = this._settings.iconMap ?? {};

		this._mappings = definition.data?.mappings ?? [
			{
				sourceType: "Account"
			},
			{
				sourceType: "Contact"
			},
			{
				sourceType: "Task"
			},
			{
				sourceType: "ContentNote"
			},
			{
				sourceType: "Chatter"
			}
		];

		await this.populateFields();

		if (this._settings.enableLibLogging) {
			enableLogging();
		}

		await this.openConnection();
		setTimeout(() => this.cleanupCache(), 30000);
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		await this.closeConnection();
	}

	/**
	 * Get a list of the static help entries.
	 * @param templateHelpers To help with creating templates.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(templateHelpers: TemplateHelpers): Promise<HomeSearchResult[]> {
		if (this._mappings) {
			return [
				{
					key: `${this._definition?.id}-help1`,
					score: this._definition?.baseScore ?? SalesforceIntegration._DEFAULT_BASE_SCORE,
					title: this._definition?.title ?? "",
					label: "Help",
					icon: this._settings?.iconMap.salesforce,
					actions: [],
					data: {
						providerId: this._definition?.id
					},
					template: CLITemplate.Custom,
					templateContent: await templateHelpers.createHelp(
						"Salesforce",
						[
							"The Salesforce integration provides no individual commands",
							`Using the home query it will search the content of your Salesforce platform for ${this._mappings
								.map((m) => m.label)
								.join(", ")}`
						],
						[]
					)
				}
			];
		}
		return [];
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
		if (result.action.trigger === "focus-change") {
			const data = result.data as SalesforceResultData;
			if (data.obj && this._integrationHelpers) {
				const palette = await this._integrationHelpers.getCurrentPalette();
				const resultWithReferences = await this.buildSearchResult(
					this._integrationHelpers.templateHelpers,
					palette,
					data.obj,
					data.mapping
				);
				lastResponse.respond([resultWithReferences]);
				return true;
			}
		} else if (result.action.trigger === "user-action") {
			// if the user clicked the reconnect result, reconnect to salesforce and re-run query
			if (result.key === SalesforceIntegration._RECONNECT_SEARCH_RESULT_KEY) {
				await this.openConnection();

				if (result.data?.query && lastResponse) {
					const results = await this.getSearchResults(
						result.data?.query as string,
						result.data?.filters as CLIFilter[],
						lastResponse
					);
					lastResponse.respond(results.results);
				}
				return true;
			} else if (result.key === SalesforceIntegration._CONNECTING_SEARCH_RESULT_KEY) {
				return true;
			}

			// otherwise open the result page url in browser
			const data = result.data as SalesforceResultData;
			if (data !== undefined && this._integrationHelpers) {
				if (result.action.name.startsWith("button-action-")) {
					const actionIdx = Number.parseInt(result.action.name.replace("button-action-", ""), 10);

					const action = data.mapping?.actions?.[actionIdx];

					if (!action?.url && !action?.intent && !action?.view) {
						await this.openSalesforceView(data);
					} else if (action.url) {
						await fin.System.openUrlWithBrowser(
							this.substituteProperties(data.mapping, data.obj, action.url, true)
						);
					} else if (action.view) {
						await this._integrationHelpers.launchView({
							...action.view,
							url: this.substituteProperties(data.mapping, data.obj, action.view.url, true)
						});
					} else if (action.intent && this._integrationHelpers.getInteropClient) {
						try {
							const client = await this._integrationHelpers.getInteropClient();

							if (client) {
								const contextJson = JSON.stringify(action.intent.context);
								const subJson = this.substituteProperties(data.mapping, data.obj, contextJson, false);
								const finalContext = JSON.parse(subJson);
								await client.fireIntent({
									name: action.intent.name,
									context: finalContext,
									metadata: {
										target: action.intent.target
									}
								});
							}
						} catch (err) {
							this._logger?.error(`Failed raising intent ${action.intent.name}`, err);
						}
					}

					return true;
				}

				if (this._integrationHelpers) {
					const linkIndex = result.action.name.indexOf("_link_");
					if (linkIndex > 0 && data.urls) {
						let u = data.urls[result.action.name.replace(`${SalesforceIntegration._ACTION_OPEN}_`, "")];
						if (u.includes("@")) {
							await fin.System.openUrlWithBrowser(`mailto:${u}`);
						} else {
							if (!u.startsWith("http")) {
								u = `https://${u}`;
							}
							await fin.System.openUrlWithBrowser(u);
						}
					} else {
						await this.openSalesforceView(data);
					}
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum query length before performing search.
	 * @param options.queryAgainst The fields to query against.
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse,
		options?: {
			queryMinLength?: number;
			queryAgainst?: string[];
		}
	): Promise<HomeSearchResponse> {
		const homeResults = await this.getDefaultEntries(query);

		this._lastResponse = lastResponse;

		const minLength = options?.queryMinLength ?? 3;

		if (this._debounceTimerId) {
			window.clearTimeout(this._debounceTimerId);
			this._debounceTimerId = undefined;
		}

		this._debounceTimerId = window.setTimeout(async () => {
			if (this._lastResponse) {
				if (this._salesForceConnection && query.length >= minLength && !query.startsWith("/")) {
					let selectedObjects: string[] = this._mappings.map((m) => m.label ?? "");
					if (Array.isArray(filters) && filters.length > 0) {
						const objectsFilter = filters.find((x) => x.id === SalesforceIntegration._OBJECTS_FILTER_ID);
						if (objectsFilter) {
							selectedObjects = (
								Array.isArray(objectsFilter.options) ? objectsFilter.options : [objectsFilter.options]
							)
								.filter((x) => Boolean(x.isSelected))
								.map((x) => x.value);
						}
					}

					try {
						const apiSearchResults = await this.getApiSearchResults(query, selectedObjects);

						const maps: { [source: string]: SalesforceMapping } = {};
						for (const mapping of this._mappings) {
							maps[mapping.sourceType] = mapping;
						}

						const searchResults = await Promise.all(
							apiSearchResults.results.map(async (r) =>
								this.buildTemplate(
									r,
									// we clone this so reference deletions don't affect the original
									this.objectClone(maps[r.attributes.type]),
									CLITemplate.Loading
								)
							)
						);

						this._lastResponse.respond(searchResults);

						const resultTypes: Set<string> = new Set<string>();
						for (const searchResult of searchResults) {
							if (searchResult.label) {
								resultTypes.add(searchResult.label);
							}
						}

						const newFilters = resultTypes.entries();
						this._lastResponse.updateContext({
							filters: [
								{
									id: SalesforceIntegration._OBJECTS_FILTER_ID as string,
									title: "Salesforce",
									options: [...newFilters].map((f) => ({
										value: f[0],
										isSelected: true
									}))
								}
							]
						});
					} catch (err) {
						await this.closeConnection();
						if (err instanceof AuthorizationError) {
							this._lastResponse.respond([this.getReconnectSearchResult(query, filters)]);
						}
						this._logger?.error("Error retrieving Salesforce search results", err);
					}
				}
				this._lastResponse.revoke(`${this._definition?.id}-searching`);
			}
		}, 500);

		return {
			results: homeResults.concat(query.length >= minLength ? [this.createSearchingResult()] : [])
		};
	}

	/**
	 * Get a list of the default application entries.
	 * @param query The query to search for.
	 * @returns The list of application entries.
	 */
	private async getDefaultEntries(query: string): Promise<HomeSearchResult[]> {
		const results: HomeSearchResult[] = [];
		if (this._settings?.orgUrl) {
			if (this._salesForceConnection) {
				if (
					query === undefined ||
					query === null ||
					query === "" ||
					`Browse ${this._definition?.title}`.toLowerCase().includes(query.toLowerCase())
				) {
					results.push(this.getBrowseSearchResult());
				}
			} else if (this._isConnecting) {
				results.push(this.getConnectingSearchResult());
			} else if (!this._salesForceConnection) {
				results.push(this.getReconnectSearchResult());
			}
		}

		return results;
	}

	/**
	 * Open the connection to SaleForce.
	 * @internal
	 */
	private async openConnection(): Promise<void> {
		if (this._settings?.orgUrl && this._settings?.consumerKey && !this._salesForceConnection) {
			try {
				if (this._lastResponse) {
					this._lastResponse.revoke(SalesforceIntegration._RECONNECT_SEARCH_RESULT_KEY);
					this._lastResponse.respond([this.getConnectingSearchResult()]);
				}

				this._isConnecting = true;
				this._salesForceConnection = await connect(this._settings?.orgUrl, this._settings?.consumerKey);

				if (this._lastResponse) {
					this._lastResponse.revoke(SalesforceIntegration._CONNECTING_SEARCH_RESULT_KEY);
					this._lastResponse.respond([this.getBrowseSearchResult()]);
				}
			} catch (err) {
				this._logger?.error("Error connecting to API", err);
				if (this._lastResponse) {
					this._lastResponse.revoke(SalesforceIntegration._CONNECTING_SEARCH_RESULT_KEY);
					this._lastResponse.respond([this.getReconnectSearchResult()]);
				}
			} finally {
				this._isConnecting = false;
			}
		}
	}

	/**
	 * Close the connection to Salesforce.
	 * @internal
	 */
	private async closeConnection(): Promise<void> {
		if (this._salesForceConnection) {
			try {
				await this._salesForceConnection.disconnect();
			} catch (err) {
				this._logger?.error("Error disconnecting API", err);
			} finally {
				this._salesForceConnection = undefined;
			}
		}
	}

	/**
	 * Get results from the API using a query.
	 * @param query The query to call the API with.
	 * @param selectedObjects The selected filters.
	 * @returns The search result objects from the API.
	 * @internal
	 */
	private async getApiSearchResults(
		query: string,
		selectedObjects: string[]
	): Promise<{
		results: SalesforceSearchResult[];
		filters: string[];
	}> {
		const filteredMappings: SalesforceMapping[] = this._mappings.filter((m) =>
			selectedObjects.includes(m.label ?? "")
		);
		const batch: SalesforceBatchRequestItem[] = [];
		const filters: string[] = [];

		for (const mapping of filteredMappings) {
			const fields: string[] = [];
			if (mapping.lookupType === "search") {
				if (mapping.fieldMappings) {
					for (const fieldMapping of mapping.fieldMappings) {
						if (!fields.includes(fieldMapping.field)) {
							fields.push(fieldMapping.field);
						}
					}
				}
				let where = "";
				if (mapping.condition) {
					where = ` WHERE ${mapping.condition}`;
				}

				if (fields.length > 0) {
					const salesforceSearchQuery = `FIND {"${this.escapeQuery(query)}"} IN ALL FIELDS RETURNING ${
						mapping.sourceType
					}(${fields.join(",")}${where}) LIMIT ${mapping.maxItems}`;

					batch.push({
						method: "GET",
						url: `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`
					});
				}
			} else if (mapping.lookupType === "feed") {
				batch.push({
					method: "GET",
					url: `/services/data/vXX.X/${mapping.feedType}/feed-elements?q=${encodeURIComponent(
						query
					)}&pageSize=${mapping.maxItems}&sort=LastModifiedDateDesc`
				});
			}
		}

		const batchedResults = await this.getBatchedResults<
			SalesforceRestApiSearchResult<SalesforceSearchResult> | SalesforceFeedElementPage
		>(batch);

		let results: SalesforceSearchResult[] = [];

		if (batchedResults.length > 0) {
			for (let i = 0; i < filteredMappings.length; i++) {
				const searchResponse = batchedResults[i];
				const label = filteredMappings[i].label ?? "";
				if ("searchRecords" in searchResponse && searchResponse.searchRecords.length > 0) {
					results = results.concat(searchResponse.searchRecords);
					filters.push(label);
				} else if ("elements" in searchResponse && searchResponse.elements.length > 0) {
					results = results.concat(
						searchResponse.elements.map((e) => {
							const id = (e.id as string) ?? e.Id;
							const url: string = (e.url as string) ?? "";
							delete e.id;
							delete e.url;
							delete e.type;
							return {
								...e,
								Id: id,
								attributes: { type: filteredMappings[i].sourceType, url }
							};
						})
					);
					if (filteredMappings[i].label) {
						filters.push(label);
					}
				}
			}
		}

		return {
			results,
			filters
		};
	}

	/**
	 * Get batched results from Salesforce api.
	 * @param batchRequests The batch requests to send.
	 * @returns The results from the batch request.
	 * @internal
	 */
	private async getBatchedResults<T>(batchRequests: SalesforceBatchRequestItem[]): Promise<T[]> {
		if (batchRequests.length === 0 || !this._salesForceConnection) {
			return [];
		}
		const batch: SalesforceBatchRequest = { batchRequests, haltOnError: false };

		const response = await this._salesForceConnection.executeApiRequest<SalesforceBatchResponse>(
			"/services/data/vXX.X/composite/batch/",
			"POST",
			batch,
			{ "Content-Type": "application/json" }
		);

		return response.data?.results.map((r) => r.result as T) ?? [];
	}

	/**
	 * Escape any characters needed in Salesforce API calls.
	 * @param query The query to escape.
	 * @returns The escaped query.
	 * @internal
	 */
	private escapeQuery(query: string): string {
		// There are some reserved characters for queries so we need to escape them
		// https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_find.htm
		return query.replace(/[!"&'()*+:?[\\\]^{|}~-]/gm, "\\$&");
	}

	/**
	 * Get result to show while searching.
	 * @returns The result entry.
	 */
	private createSearchingResult(): CLISearchResultLoading<HomeAction> {
		return {
			key: `${this._definition?.id}-searching`,
			score: this._definition?.baseScore ?? SalesforceIntegration._DEFAULT_BASE_SCORE,
			title: "Searching ...",
			icon: this._settings?.iconMap.salesforce ?? "",
			actions: [],
			data: {
				providerId: this._definition?.id
			},
			template: CLITemplate.Loading,
			templateContent: ""
		};
	}

	/**
	 * Get the search result to display when Salesforce needs to reconnect.
	 * @param query The query that needs to reconnect.
	 * @param filters The filter for the reconnect.
	 * @returns The search result entry.
	 * @internal
	 */
	private getReconnectSearchResult(query?: string, filters?: CLIFilter[]): CLISearchResultSimpleText {
		return {
			key: SalesforceIntegration._RECONNECT_SEARCH_RESULT_KEY,
			score: this._definition?.baseScore ?? SalesforceIntegration._DEFAULT_BASE_SCORE,
			icon: this._settings?.iconMap.salesforce ?? "",
			title: `Reconnect to ${this._definition?.title}`,
			actions: [{ name: "Reconnect", hotkey: "enter" }],
			data: {
				providerId: this._definition?.id,
				query,
				filters
			}
		} as CLISearchResultSimpleText;
	}

	/**
	 * Get the result to show with for a browse entry.
	 * @returns The browser search result.
	 */
	private getBrowseSearchResult(): CLISearchResultSimpleText {
		return {
			key: SalesforceIntegration._BROWSE_SEARCH_RESULT_KEY,
			score: this._definition?.baseScore ?? SalesforceIntegration._DEFAULT_BASE_SCORE,
			actions: [{ name: "Browse", hotkey: "enter" }],
			data: {
				providerId: this._definition?.id,
				url: this._settings?.orgUrl,
				tags: ["salesforce"]
			} as SalesforceResultData,
			icon: this._settings?.iconMap.salesforce ?? "",
			template: CLITemplate.SimpleText,
			templateContent: "Open a browser window at the Salesforce home page",
			title: `Browse ${this._definition?.title}`
		} as CLISearchResultSimpleText;
	}

	/**
	 * Get the result to show when connecting.
	 * @returns The connecting search result.
	 */
	private getConnectingSearchResult(): CLISearchResultLoading<HomeAction> {
		return {
			key: SalesforceIntegration._BROWSE_SEARCH_RESULT_KEY,
			score: this._definition?.baseScore ?? SalesforceIntegration._DEFAULT_BASE_SCORE,
			icon: this._settings?.iconMap.salesforce,
			actions: [],
			template: CLITemplate.Loading,
			templateContent: "",
			title: `Connecting to ${this._definition?.title}`
		};
	}

	/**
	 * Open a Salesforce view.
	 * @param data The data to use for opening.
	 */
	private async openSalesforceView(data: SalesforceResultData): Promise<void> {
		const preload = this._settings?.preload;
		const viewOptions: OpenFin.PlatformViewCreationOptions = {
			url: data.url,
			fdc3InteropApi: "1.2",
			interop: {
				currentContextGroup: "green"
			},
			customData: { buttonLabel: "Process Participant" },
			preloadScripts: [{ url: preload ?? "" }]
		};
		await this._integrationHelpers?.launchView(viewOptions);
	}

	/**
	 * Substitute properties from a field into the content.
	 * @param mapping The field mapping to use.
	 * @param searchResult The search result to get the values from.
	 * @param content The content to substitute into.
	 * @param encode Should we encode the uri components.
	 * @returns The content with properties substituted.
	 */
	private substituteProperties(
		mapping: SalesforceMapping | undefined,
		searchResult: SalesforceSearchResult | undefined,
		content: string | undefined,
		encode: boolean
	): string {
		let ret = content;
		if (mapping?.fieldMappings && searchResult && ret) {
			for (const fieldMapping of mapping.fieldMappings) {
				const fieldValue =
					this.getFieldContent(searchResult, fieldMapping.field, fieldMapping.fieldSub) ?? "";
				const re = new RegExp(`{${fieldMapping.field}}`, "g");
				ret = ret.replace(re, encode ? encodeURIComponent(fieldValue) : fieldValue);
			}
		}
		return ret ?? "";
	}

	/**
	 * Get the field from the search result.
	 * @param searchResult The search result to get the value from.
	 * @param field The field to get from the data.
	 * @param subField The subfield to get from the data.
	 * @returns The field from the search result.
	 */
	private getFieldContent(searchResult: SalesforceSearchResult, field?: string, subField?: string): string {
		if (field === undefined) {
			return "";
		}

		let value = searchResult[field] as string | { [id: string]: string };

		if (subField !== undefined && value !== undefined) {
			value = (value as { [id: string]: string })[subField];
		}

		if (value === null || value === undefined) {
			return "";
		}

		return value as string;
	}

	/**
	 * Build the template for a search result.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param searchResult The search result to map to a template.
	 * @param mapping Additional data mappings
	 * @returns The created result template.
	 */
	private async buildSearchResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		searchResult: SalesforceSearchResult,
		mapping?: SalesforceMapping
	): Promise<HomeSearchResult> {
		const headerParts: {
			image?: TemplateFragment;
			header?: TemplateFragment;
			subHeader?: TemplateFragment;
		} = {};

		const pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[] = [];

		const data: { [id: string]: string } = {};
		const urls: { [id: string]: string } = {};

		await this.populateReferences(searchResult, mapping);

		if (mapping?.fieldMappings) {
			for (const fieldMapping of mapping.fieldMappings) {
				const fieldValue = this.getFieldContent(searchResult, fieldMapping.field, fieldMapping.fieldSub);

				if (fieldValue !== null && fieldValue !== undefined && fieldValue.length > 0) {
					if (fieldMapping.displayMode === "icon") {
						headerParts.image = await templateHelpers.createImage("image", "Profile", {
							width: "44px",
							height: "44px",
							objectFit: "cover",
							borderRadius: "50%"
						});
						data.image = `${this._settings?.orgUrl.replace(/\/?$/, "")}${fieldValue}`;
					} else if (fieldMapping.displayMode === "initials") {
						const values = fieldValue.split(" ");
						let initials: string = "";
						if (values.length > 0) {
							initials += values[0][0];
						}
						if (values.length > 1) {
							initials += values[values.length - 1][0];
						}

						headerParts.image = await templateHelpers.createText("initials", 18, {
							width: "44px",
							height: "44px",
							objectFit: "cover",
							borderRadius: "50%",
							backgroundColor: palette.background2,
							color: palette.textDefault,
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						});
						data.initials = initials.toUpperCase();
					} else if (fieldMapping.displayMode === "header") {
						headerParts.header = await templateHelpers.createTitle("header", 14);
						data.header = fieldValue;
					} else if (fieldMapping.displayMode === "sub-header") {
						headerParts.subHeader = await templateHelpers.createText("subHeader", 12);
						data.subHeader = fieldValue;
					} else if (fieldMapping.displayMode === "field") {
						if (fieldMapping.fieldContent === "link") {
							pairs.push({
								label: fieldMapping.label ?? "",
								links: [fieldValue]
							});
							urls[`${fieldMapping.label}_link_0`] = fieldValue;
						} else if (fieldMapping.fieldContent === "date") {
							pairs.push({
								label: fieldMapping.label ?? "",
								value: new Date(fieldValue).toLocaleString()
							});
							urls[`${fieldMapping.label}_link_0`] = fieldValue;
						} else {
							pairs.push({
								label: fieldMapping.label ?? "",
								value: fieldValue,
								wide: fieldMapping.fieldContent === "memo"
							});
						}
					}
				}
			}
		}

		const headerChildren: TemplateFragment[] = [];

		if (headerParts.image) {
			headerChildren.push(headerParts.image);
		}
		if (headerParts.header ?? headerParts.subHeader) {
			const headerTitleParts: TemplateFragment[] = [];
			if (headerParts.header) {
				headerTitleParts.push(headerParts.header);
			}
			if (headerParts.subHeader) {
				headerTitleParts.push(headerParts.subHeader);
			}
			headerChildren.push(await templateHelpers.createContainer("column", headerTitleParts));
		}

		const headerRow = await templateHelpers.createContainer("row", headerChildren, {
			paddingBottom: "10px",
			borderBottom: `1px solid ${palette.textDefault}`,
			gap: "10px"
		});

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [];

		const buttonData: { [id: string]: string } = {};

		if (mapping?.actions && Array.isArray(mapping.actions)) {
			for (let i = 0; i < mapping.actions.length; i++) {
				const titleKey = `button-title-${i}`;
				const imageKey = `button-image-${i}`;
				buttons.push({
					titleKey,
					action: `button-action-${i}`,
					imageKey,
					imageAltText: mapping.actions[i].label
				});
				buttonData[titleKey] = mapping.actions[i].label;
				buttonData[imageKey] = this._settings?.iconMap[mapping.actions[i].iconKey] ?? "";
			}
		}

		return this.buildTemplate(searchResult, mapping, CLITemplate.Custom, {
			layout: await templateHelpers.createContainer(
				"column",
				[
					headerRow,
					await this.createPairsLayout(templateHelpers, palette, pairs),
					await this.createButtonsLayout(templateHelpers, palette, buttons)
				],
				{
					padding: "10px",
					gap: "15px",
					flex: "1"
				}
			),
			data: {
				...data,
				...this.mapPairsToData(pairs),
				...buttonData
			}
		});
	}

	/**
	 * Map the search result to a home template.
	 * @param searchResult The search result to map.
	 * @param mapping The mapping to use to translate the data.
	 * @param template The template to use in the result.
	 * @param templateContent The template content.
	 * @returns The home template.
	 */
	private buildTemplate(
		searchResult: SalesforceSearchResult,
		mapping: SalesforceMapping | undefined,
		template: CLITemplate,
		templateContent?: CustomTemplate
	): HomeSearchResult {
		const titleField = mapping?.fieldMappings?.find((m) => m.isResultTitle);
		let title = searchResult.Id;
		if (titleField && searchResult[titleField.field]) {
			title = this.getFieldContent(searchResult, titleField.field, titleField.fieldSub);
		}

		const mappingIndex = this._mappings.findIndex((m) => m.sourceType === mapping?.sourceType);
		const itemScore = Math.max(mappingIndex + 1, 1) * 100;

		return {
			actions: [{ name: "View", hotkey: "enter" }],
			label: mapping?.label,
			key: searchResult.Id,
			title,
			icon: this._settings?.iconMap[mapping?.iconKey ?? ""],
			score: (this._definition?.baseScore ?? SalesforceIntegration._DEFAULT_BASE_SCORE) + itemScore,
			data: {
				providerId: this._definition?.id,
				url: `${this._settings?.orgUrl}/${searchResult.Id}`,
				tags: ["salesforce"],
				obj: searchResult,
				mapping
			} as SalesforceResultData,
			template,
			templateContent
		} as HomeSearchResult;
	}

	/**
	 * Populate reference in from other data objects.
	 * @param searchResult The search result to populate.
	 * @param mapping The mapping to use.
	 */
	private async populateReferences(
		searchResult: SalesforceSearchResult,
		mapping?: SalesforceMapping
	): Promise<void> {
		const batch: SalesforceBatchRequestItem[] = [];
		const referenceMappings: SalesforceFieldMapping[] = [];

		if (mapping?.fieldMappings) {
			for (const fieldMapping of mapping.fieldMappings) {
				if (fieldMapping.reference) {
					const id = this.getFieldContent(searchResult, fieldMapping.field, fieldMapping.fieldSub);
					if (id) {
						if (this._referenceCache[id]) {
							searchResult[fieldMapping.field] = this._referenceCache[id].value;
							delete fieldMapping.reference;
						} else {
							referenceMappings.push(fieldMapping);
							batch.push({
								method: "GET",
								url: `/services/data/vXX.X/query?q=${encodeURIComponent(
									`SELECT ${fieldMapping.reference.field} FROM ${fieldMapping.reference.sourceType} WHERE Id='${id}'`
								)}`
							});
						}
					}
				}
			}
		}

		if (batch.length > 0) {
			const batchedResults = await this.getBatchedResults<
				SalesforceRestApiQueryResult<SalesforceSearchResult>
			>(batch);
			for (let i = 0; i < referenceMappings.length; i++) {
				if (batchedResults[i].records?.length > 0) {
					const result = batchedResults[i].records[0];
					const id = this.getFieldContent(
						searchResult,
						referenceMappings[i].field,
						referenceMappings[i].fieldSub
					);
					this._referenceCache[id] = {
						value: this.getFieldContent(
							result,
							referenceMappings[i].reference?.field,
							referenceMappings[i].reference?.fieldSub
						),
						lastReferenced: Date.now()
					};
					searchResult[referenceMappings[i].field] = this._referenceCache[id].value;
					delete referenceMappings[i].reference;
				}
			}
		}
	}

	/**
	 * Cleanup the cache.
	 */
	private cleanupCache(): void {
		const now = Date.now();
		for (const cacheId of Object.keys(this._referenceCache)) {
			if (now - this._referenceCache[cacheId].lastReferenced > 120000) {
				delete this._referenceCache[cacheId];
			}
		}
	}

	/**
	 * Create the template layout for a pair.
	 * @param templateHelpers Template helpers.
	 * @param palette The palette.
	 * @param pairs The pair to create the entry for.
	 * @returns The pair template.
	 */
	private async createPairsLayout(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[]
	): Promise<TemplateFragment> {
		return templateHelpers.createContainer(
			"column",
			await Promise.all(pairs.map(async (p) => this.createPairLayout(templateHelpers, palette, p))),
			{ gap: "5px", flex: "1" }
		);
	}

	/**
	 * Create the pairs layout.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param pair The pair data.
	 * @param pair.label Label for the pair.
	 * @param pair.value The value for the pair.
	 * @param pair.links Any links to display in the pair.
	 * @param pair.srcs Any image sources for the pair.
	 * @param pair.wide Display the pair in wide format.
	 * @returns The formatted pairs.
	 */
	private async createPairLayout(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		pair: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }
	): Promise<TemplateFragment> {
		const elements: TemplateFragment[] = [
			await templateHelpers.createText(`${pair.label}Title`, 10, {
				color: palette.inputPlaceholder,
				flex: 1
			})
		];

		if (pair.value) {
			elements.push(
				await templateHelpers.createText(`${pair.label}`, 10, {
					flex: pair.wide ? 1 : 3,
					display: "flex",
					flexWrap: "wrap",
					justifyContent: pair.wide ? "flex-start" : "flex-end",
					wordBreak: "break-all"
				})
			);
		}

		if (pair.links?.length) {
			elements.push(
				await templateHelpers.createContainer(
					"row",
					await Promise.all(
						pair.links.map(async (l, idx) =>
							templateHelpers.createLink(
								`${pair.label}_link_${idx}`,
								`${SalesforceIntegration._ACTION_OPEN}_${pair.label}_link_${idx}`,
								10
							)
						)
					),
					{ gap: "5px", flex: 3, justifyContent: "flex-end", flexWrap: "wrap" }
				)
			);
		}

		if (pair.srcs?.length) {
			elements.push(
				await templateHelpers.createContainer(
					"row",
					await Promise.all(
						pair.srcs.map(async (s, idx) =>
							templateHelpers.createImage(`${pair.label}_src_${idx}`, "Member", {
								width: "16px",
								height: "16px",
								objectFit: "cover",
								borderRadius: "50%"
							})
						)
					),
					{ gap: "5px", flex: 3, justifyContent: "flex-end", flexWrap: "wrap" }
				)
			);
		}

		return templateHelpers.createContainer(pair.wide ? "column" : "row", elements, {
			justifyContent: "space-between",
			gap: pair.wide ? "5px" : "10px"
		});
	}

	/**
	 * Create a layout with buttons.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param buttons The buttons to display.
	 * @returns The buttons layout.
	 */
	private async createButtonsLayout(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[]
	): Promise<TemplateFragment> {
		return templateHelpers.createContainer(
			"row",
			await Promise.all(
				buttons.map(async (b) =>
					templateHelpers.createButton(
						ButtonStyle.Secondary,
						b.titleKey,
						b.action,
						{
							border: "none",
							borderRadius: "50%",
							width: "40px",
							height: "40px",
							padding: "0px",
							justifyContent: "center",
							backgroundColor: palette.background2
						},
						[
							await templateHelpers.createImage(b.imageKey, b.imageAltText, {
								width: "16px",
								height: "16px"
							})
						]
					)
				)
			),
			{
				justifyContent: "space-around",
				gap: "10px"
			}
		);
	}

	/**
	 * Map data to template layout.
	 * @param pairs The data pairs to map.
	 * @returns The mapped data.
	 */
	private mapPairsToData(
		pairs: {
			label: string;
			value?: string;
			links?: string[];
			srcs?: string[];
			wide?: boolean;
		}[]
	): { [id: string]: string } {
		const pairData: { [id: string]: string } = {};
		for (const pair of pairs) {
			pairData[`${pair.label}Title`] = pair.label;
			if (pair.value) {
				pairData[pair.label] = pair.value;
			}
			if (pair.links) {
				for (let i = 0; i < pair.links.length; i++) {
					pairData[`${pair.label}_link_${i}`] = pair.links[i];
				}
			}
			if (pair.srcs) {
				for (let i = 0; i < pair.srcs.length; i++) {
					pairData[`${pair.label}_src_${i}`] = pair.srcs[i];
				}
			}
		}
		return pairData;
	}

	/**
	 * Populate the default fields for all the mappings if they have not been configured.
	 */
	private async populateFields(): Promise<void> {
		await this.populateAccountMapping();
		await this.populateContactMapping();
		await this.populateTaskMapping();
		await this.populateNoteMapping();
		await this.populateChatterMapping();
	}

	/**
	 * Populate the default mappings for account object.
	 */
	private async populateAccountMapping(): Promise<void> {
		const mapping = this._mappings.find((m) => m.sourceType === "Account");
		if (mapping) {
			mapping.label = mapping.label ?? "Account";
			mapping.iconKey = mapping.iconKey ?? "account";
			mapping.lookupType = mapping.lookupType ?? "search";
			mapping.maxItems = mapping.maxItems ?? 10;
			mapping.fieldMappings = mapping.fieldMappings ?? [
				{
					field: "Id",
					displayMode: "none"
				},
				{
					field: "Name",
					displayMode: "header",
					isResultTitle: true
				},
				{
					field: "Industry",
					displayMode: "sub-header"
				},
				{
					field: "Phone",
					displayMode: "field",
					label: "Phone"
				},
				{
					field: "Type",
					displayMode: "field",
					label: "Type"
				},
				{
					field: "Website",
					displayMode: "field",
					fieldContent: "link",
					label: "Website"
				},
				{
					field: "Description",
					displayMode: "field",
					fieldContent: "memo",
					label: "Description"
				}
			];
			mapping.actions = await this.validateIntents(
				mapping.actions ?? [
					{
						label: "Salesforce",
						iconKey: "salesforce"
					}
				]
			);
		}
	}

	/**
	 * Populate the default mappings for contact type.
	 */
	private async populateContactMapping(): Promise<void> {
		const mapping = this._mappings.find((m) => m.sourceType === "Contact");
		if (mapping) {
			mapping.label = mapping.label ?? "Contact";
			mapping.iconKey = mapping.iconKey ?? "contact";
			mapping.lookupType = mapping.lookupType ?? "search";
			mapping.maxItems = mapping.maxItems ?? 10;
			mapping.fieldMappings = mapping.fieldMappings ?? [
				{
					field: "Id",
					displayMode: "none"
				},
				{
					field: "Name",
					displayMode: "initials"
				},
				{
					field: "Name",
					displayMode: "header",
					isResultTitle: true
				},
				{
					field: "Title",
					displayMode: "sub-header"
				},
				{
					field: "Department",
					displayMode: "field",
					fieldContent: "text",
					label: "Department"
				},
				{
					field: "Email",
					displayMode: "field",
					fieldContent: "link",
					label: "Email"
				},
				{
					field: "Phone",
					displayMode: "field",
					fieldContent: "text",
					label: "Phone"
				}
			];
			mapping.actions = await this.validateIntents(
				mapping.actions ?? [
					{
						label: "Salesforce",
						iconKey: "salesforce"
					}
				]
			);
		}
	}

	/**
	 * Populate the default mappings for task type.
	 */
	private async populateTaskMapping(): Promise<void> {
		const mapping = this._mappings.find((m) => m.sourceType === "Task");
		if (mapping) {
			mapping.label = mapping.label ?? "Task";
			mapping.iconKey = mapping.iconKey ?? "task";
			mapping.lookupType = mapping.lookupType ?? "search";
			mapping.maxItems = mapping.maxItems ?? 10;
			mapping.fieldMappings = mapping.fieldMappings ?? [
				{
					field: "Id",
					displayMode: "none"
				},
				{
					field: "Subject",
					displayMode: "header",
					isResultTitle: true
				},
				{
					field: "Status",
					displayMode: "field",
					label: "Status"
				},
				{
					field: "CreatedById",
					displayMode: "field",
					label: "Created By",
					reference: {
						sourceType: "User",
						field: "Name"
					}
				},
				{
					field: "CreatedDate",
					displayMode: "field",
					fieldContent: "date",
					label: "Created On"
				},
				{
					field: "Description",
					displayMode: "field",
					fieldContent: "memo",
					label: "Comments"
				}
			];
			mapping.actions = await this.validateIntents(
				mapping.actions ?? [
					{
						label: "Salesforce",
						iconKey: "salesforce"
					}
				]
			);
		}
	}

	/**
	 * Populate the default mappings for note type.
	 */
	private async populateNoteMapping(): Promise<void> {
		const mapping = this._mappings.find((m) => m.sourceType === "ContentNote");
		if (mapping) {
			mapping.label = mapping.label ?? "Note";
			mapping.iconKey = mapping.iconKey ?? "note";
			mapping.lookupType = mapping.lookupType ?? "search";
			mapping.maxItems = mapping.maxItems ?? 10;
			mapping.fieldMappings = mapping.fieldMappings ?? [
				{
					field: "Id",
					displayMode: "none"
				},
				{
					field: "Title",
					displayMode: "header",
					isResultTitle: true
				},
				{
					field: "CreatedById",
					displayMode: "field",
					label: "Created By",
					reference: {
						sourceType: "User",
						field: "Name"
					}
				},
				{
					field: "CreatedDate",
					displayMode: "field",
					fieldContent: "date",
					label: "Created On"
				},
				{
					field: "TextPreview",
					displayMode: "field",
					fieldContent: "memo",
					label: "Content"
				}
			];
			mapping.actions = await this.validateIntents(
				mapping.actions ?? [
					{
						label: "Salesforce",
						iconKey: "salesforce"
					}
				]
			);
		}
	}

	/**
	 * Populate the default mappings for chatter type.
	 */
	private async populateChatterMapping(): Promise<void> {
		const mapping = this._mappings.find((m) => m.sourceType === "Chatter");
		if (mapping) {
			mapping.label = mapping.label ?? "Chatter";
			mapping.iconKey = mapping.iconKey ?? "chatter";
			mapping.lookupType = mapping.lookupType ?? "feed";
			mapping.feedType = mapping.feedType ?? "chatter";
			mapping.maxItems = mapping.maxItems ?? 10;
			mapping.fieldMappings = mapping.fieldMappings ?? [
				{
					field: "Id",
					displayMode: "none"
				},
				{
					field: "header",
					fieldSub: "text",
					displayMode: "header",
					isResultTitle: true
				},
				{
					field: "createdDate",
					displayMode: "field",
					fieldContent: "date",
					label: "Created On"
				},
				{
					field: "body",
					fieldSub: "text",
					displayMode: "field",
					fieldContent: "memo",
					label: "Content"
				}
			];
			mapping.actions = await this.validateIntents(
				mapping.actions ?? [
					{
						label: "Salesforce",
						iconKey: "salesforce"
					}
				]
			);
		}
	}

	/**
	 * Validate that intents are available.
	 * @param actions The actions to check.
	 * @returns List of validate intents.
	 */
	private async validateIntents(actions: SalesforceAction[]): Promise<SalesforceAction[]> {
		const finalActions: SalesforceAction[] = [];

		for (const action of actions) {
			if (action.intent) {
				let hasHandler = false;
				try {
					const info = await fin.me.interop.getInfoForIntent({
						name: action.intent?.name
					});
					if (info) {
						hasHandler = true;
					}
				} catch {}

				if (hasHandler) {
					finalActions.push(action);
				} else {
					this._logger?.error(`No handler for intent ${action.intent.name}`);
				}
			} else {
				finalActions.push(action);
			}
		}

		return finalActions;
	}

	/**
	 * Deep clone an object.
	 * @param obj The object to clone.
	 * @returns The clone of the object.
	 */
	private objectClone<T>(obj: T): T {
		// eslint-disable-next-line no-restricted-syntax
		return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
	}
}
