import {
	connect,
	ConnectionError,
	enableLogging,
	SalesforceRestApiQueryResponse,
	SalesforceRestApiSObject,
	type SalesforceConnection,
	type SalesforceRestApiSearchResponse
} from "@openfin/salesforce";
import {
	CLIFilterOptionType,
	CLITemplate,
	CustomTemplate,
	type CLIDispatchedSearchResult,
	type CLIFilter,
	type CLISearchListenerResponse,
	type CLISearchResultPlain,
	type CLISearchResultSimpleText,
	type HomeSearchResponse,
	type HomeSearchResult,
	type TemplateFragment
} from "@openfin/workspace";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import type { IntegrationHelpers, IntegrationModule } from "../../shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "../../shapes/logger-shapes";
import type { ModuleDefinition } from "../../shapes/module-shapes";
import type {
	SalesforceBatchRequest,
	SalesforceBatchRequestItem,
	SalesforceBatchResponse,
	SalesforceFeedElementPage,
	SalesforceMapping,
	SalesforceMappingFieldMapping,
	SalesforceResultData,
	SalesforceSearchResult,
	SalesforceSettings
} from "./shapes";

/**
 * Implement the integration provider for SalesForce.
 */
export class SalesForceIntegrationProvider implements IntegrationModule<SalesforceSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "salesforce";

	/**
	 * The key to use for a SalesForce result.
	 * @internal
	 */
	private static readonly _BROWSE_SEARCH_RESULT_KEY = "browse-salesforce";

	/**
	 * The id for the SaleForce filters.
	 * @internal
	 */
	private static readonly _OBJECTS_FILTER_ID = "salesforce-objects";

	/**
	 * The id of the not connected result.
	 * @internal
	 */
	private static readonly _NOT_CONNECTED_SEARCH_RESULT_KEY = "salesforce-not-connected-result";

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
	private _moduleDefinition: ModuleDefinition<SalesforceSettings>;

	/**
	 * The settings.
	 * @internal
	 */
	private _settings: SalesforceSettings | undefined;

	/**
	 * The mappings.
	 * @internal
	 */
	private _mappings: SalesforceMapping[] | undefined;

	/**
	 * The connection to SalesForce.
	 * @internal
	 */
	private _salesForceConnection: SalesforceConnection | undefined;

	/**
	 * Logger for logging info.
	 * @internal
	 */
	private _logger: Logger;

	/**
	 * The last search result response.
	 */
	private _lastResponse?: CLISearchListenerResponse;

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
	 * Create a new instance of SalesForceIntegrationProvider
	 */
	constructor() {
		this._referenceCache = {};
	}

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<SalesforceSettings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._moduleDefinition = definition;
		this._integrationHelpers = helpers;
		this._settings = definition.data;

		this._logger = loggerCreator("Salesforce");
		this._logger.info("Registering SalesForce");

		if (!this._settings.orgUrl) {
			this._logger.error("Configuration is missing orgUrl");
			return;
		}

		if (!this._settings.consumerKey) {
			this._logger.error("Configuration is missing consumerKey");
			return;
		}

		this._mappings = definition.data?.mappings;

		// No mappings defined so use the default ones
		if (!Array.isArray(this._mappings)) {
			this._mappings = [
				{
					type: "Account"
				},
				{
					type: "Contact"
				},
				{
					type: "Task"
				},
				{
					type: "ContentNote"
				},
				{
					type: "Chatter"
				}
			];
		}

		this.populateFields();

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
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${SalesForceIntegrationProvider._PROVIDER_ID}-help1`,
				title: "Salesforce",
				label: "Help",
				icon: this._moduleDefinition.icon,
				actions: [],
				data: {
					providerId: SalesForceIntegrationProvider._PROVIDER_ID
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"Salesforce",
					[
						"The Salesforce integration provides no individual commands",
						"Using the home query it will search the content of your Salesforce platform for Accounts, Contacts, Tasks, Notes and Chatter"
					],
					[]
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
		result: CLIDispatchedSearchResult,
		lastResponse: CLISearchListenerResponse
	): Promise<boolean> {
		if (result.action.trigger === "focus-change") {
			const data = result.data as SalesforceResultData;
			if (data.obj) {
				const resultWithReferences = await this.buildSearchResult(data.obj, data.mapping);
				lastResponse.respond([resultWithReferences]);
				return true;
			}
		} else if (result.action.trigger === "user-action") {
			// if the user clicked the reconnect result, reconnect to salesforce and re-run query
			if (result.key === SalesForceIntegrationProvider._NOT_CONNECTED_SEARCH_RESULT_KEY) {
				await this.openConnection();

				if (result.data?.query) {
					const results = await this.getSearchResults(
						result.data?.query as string,
						result.data?.filters as CLIFilter[],
						lastResponse
					);
					if (lastResponse) {
						lastResponse.revoke(SalesForceIntegrationProvider._NOT_CONNECTED_SEARCH_RESULT_KEY);
						lastResponse.respond(results.results);
					}
				}
				return true;
			}

			// otherwise open the result page url in browser
			const data = result.data as SalesforceResultData;
			if (data !== undefined && this._integrationHelpers && this._integrationHelpers.launchView) {
				const linkIndex = result.action.name.indexOf("_link_");
				if (linkIndex > 0) {
					let u = data.urls[result.action.name.replace(`${SalesForceIntegrationProvider._ACTION_OPEN}_`, "")];
					if (u.includes("@")) {
						await fin.System.openUrlWithBrowser(`mailto:${u}`);
					} else {
						if (!u.startsWith("http")) {
							u = `https://${u}`;
						}
						await fin.System.openUrlWithBrowser(u);
					}
				} else {
					const preload = this._settings?.preload;
					const viewOptions = {
						url: data.url,
						fdc3InteropApi: "1.2",
						interop: {
							currentContextGroup: "green"
						},
						customData: { buttonLabel: "Process Participant" },
						preloadScripts: [{ url: preload }],
						target: { name: "", url: "", uuid: "" }
					};
					await this._integrationHelpers.launchView(viewOptions);
				}
				return true;
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
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: CLISearchListenerResponse,
		options?: {
			queryMinLength: number;
			queryAgainst: string[];
		}
	): Promise<HomeSearchResponse> {
		const response: HomeSearchResponse = {
			results: await this.getDefaultEntries(query)
		};

		this._lastResponse = lastResponse;

		if (this._salesForceConnection) {
			const minLength = options?.queryMinLength ?? 3;

			if (query.length >= minLength) {
				let selectedObjects: string[] = [];
				if (Array.isArray(filters) && filters.length > 0) {
					const objectsFilter = filters.find(
						(x) => x.id === SalesForceIntegrationProvider._OBJECTS_FILTER_ID
					);
					if (objectsFilter) {
						selectedObjects = (
							Array.isArray(objectsFilter.options) ? objectsFilter.options : [objectsFilter.options]
						)
							.filter((x) => Boolean(x.isSelected))
							.map((x) => x.value);
					}
				} else {
					selectedObjects = this._mappings.map((m) => m.label);
				}

				try {
					const apiSearchResults = await this.getApiSearchResults(query, selectedObjects);

					const maps: { [type: string]: SalesforceMapping } = {};
					for (const mapping of this._mappings) {
						maps[mapping.type] = mapping;
					}

					const searchResults = await Promise.all(
						apiSearchResults.results.map(async (r) =>
							this.buildTemplate(
								r,
								// we clone this so reference deletions don't affect the original
								JSON.parse(JSON.stringify(maps[r.attributes.type])) as SalesforceMapping,
								CLITemplate.Loading
							)
						)
					);

					response.results.push(...searchResults);
					response.context = {
						filters: [
							{
								id: SalesForceIntegrationProvider._OBJECTS_FILTER_ID,
								title: "Salesforce",
								type: CLIFilterOptionType.MultiSelect,
								options: apiSearchResults.filters.map((label) => ({
									value: label,
									isSelected: true
								}))
							}
						]
					};
				} catch (err) {
					await this.closeConnection();
					if (err instanceof ConnectionError) {
						response.results.push(this.getReconnectSearchResult(query, filters));
					}
					this._logger.error("Error retrieving SalesForce search results", err);
				}
			}
		}

		return response;
	}

	/**
	 * Get a list of the default application entries.
	 * @param query The query to search for.
	 * @returns The list of application entries.
	 */
	private async getDefaultEntries(query: string): Promise<HomeSearchResult[]> {
		const results: HomeSearchResult[] = [];
		if (this._settings?.orgUrl) {
			const title = "Browse Salesforce";
			if (
				query === undefined ||
				query === null ||
				query === "" ||
				title.toLowerCase().includes(query.toLowerCase())
			) {
				results.push({
					actions: [{ name: "Browse", hotkey: "enter" }],
					data: {
						providerId: SalesForceIntegrationProvider._PROVIDER_ID,
						url: this._settings?.orgUrl,
						tags: [SalesForceIntegrationProvider._PROVIDER_ID]
					} as SalesforceResultData,
					icon: this._moduleDefinition.icon,
					key: SalesForceIntegrationProvider._BROWSE_SEARCH_RESULT_KEY,
					template: CLITemplate.Plain,
					templateContent: undefined,
					title
				} as CLISearchResultPlain);
			}
			if (!this._salesForceConnection && (query === undefined || query === null || query === "")) {
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
				this._salesForceConnection = await connect(this._settings?.orgUrl, this._settings?.consumerKey);

				if (this._lastResponse) {
					this._lastResponse.revoke(SalesForceIntegrationProvider._NOT_CONNECTED_SEARCH_RESULT_KEY);
				}
			} catch (err) {
				this._logger.error("Error connecting to API", err);
			}
		}
	}

	/**
	 * Close the connection to SalesForce.
	 * @internal
	 */
	private async closeConnection(): Promise<void> {
		if (this._salesForceConnection) {
			try {
				await this._salesForceConnection.disconnect();
			} catch (err) {
				this._logger.error("Error disconnecting API", err);
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
			selectedObjects.includes(m.label)
		);
		const batch: SalesforceBatchRequestItem[] = [];
		const filters: string[] = [];

		for (const mapping of filteredMappings) {
			const fields = [];
			if (mapping.lookupType === "search") {
				for (const fieldMapping of mapping.fieldMappings) {
					if (!fields.includes(fieldMapping.field)) {
						fields.push(fieldMapping.field);
					}
				}
				if (fields.length > 0) {
					const salesforceSearchQuery = `FIND {${this.escapeQuery(query)}} IN ALL FIELDS RETURNING ${
						mapping.type
					}(${fields.join(",")}) LIMIT ${mapping.maxItems}`;

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
			| SalesforceRestApiSearchResponse<SalesforceRestApiSObject<SalesforceSearchResult>>
			| SalesforceFeedElementPage
		>(batch);

		let results: SalesforceSearchResult[] = [];

		if (batchedResults.length > 0) {
			for (let i = 0; i < filteredMappings.length; i++) {
				const searchResponse = batchedResults[i];
				if ("searchRecords" in searchResponse && searchResponse.searchRecords.length > 0) {
					results = results.concat(searchResponse.searchRecords);
					filters.push(filteredMappings[i].label);
				} else if ("elements" in searchResponse && searchResponse.elements.length > 0) {
					results = results.concat(
						searchResponse.elements.map((e) => {
							const id = e.id;
							const url = e.url;
							delete e.id;
							delete e.url;
							delete e.type;
							return {
								Id: id,
								attributes: { type: filteredMappings[i].type, url },
								...e
							};
						})
					);
					filters.push(filteredMappings[i].label);
				}
			}
		}

		return {
			results,
			filters
		};
	}

	/**
	 * Get batched results from SalesForce api.
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
	 * Escape any characters needed in SalesForce API calls.
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
	 * Get the search result to display when SalesForce needs to reconnect.
	 * @param query The query that needs to reconnect.
	 * @param filters The filter for the reconnect.
	 * @returns The search result entry.
	 * @internal
	 */
	private getReconnectSearchResult(query?: string, filters?: CLIFilter[]) {
		return {
			actions: [{ name: "Reconnect", hotkey: "enter" }],
			key: SalesForceIntegrationProvider._NOT_CONNECTED_SEARCH_RESULT_KEY,
			icon: this._moduleDefinition?.icon,
			title: "Reconnect to Salesforce",
			data: {
				providerId: SalesForceIntegrationProvider._PROVIDER_ID,
				query,
				filters
			}
		} as CLISearchResultSimpleText;
	}

	private getFieldContent(searchResult: SalesforceSearchResult, field: string, subField?: string): string {
		let value = searchResult[field];

		if (subField && value !== null && value !== undefined) {
			value = value[subField];
		}

		if (value === null || value === undefined) {
			return "";
		}

		return value as string;
	}

	private async buildSearchResult(
		searchResult: SalesforceSearchResult,
		mapping: SalesforceMapping
	): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const headerParts: {
			image?: TemplateFragment;
			header?: TemplateFragment;
			subHeader?: TemplateFragment;
		} = {};

		const pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[] = [];

		const data: { [id: string]: string } = {};
		const urls: { [id: string]: string } = {};

		await this.populateReferences(searchResult, mapping);

		for (const fieldMapping of mapping.fieldMappings) {
			const fieldValue = this.getFieldContent(searchResult, fieldMapping.field, fieldMapping.fieldSub);

			if (fieldValue !== null && fieldValue !== undefined && fieldValue.length > 0) {
				if (fieldMapping.displayMode === "icon") {
					headerParts.image = await this._integrationHelpers.templateHelpers.createImage("image", "Profile", {
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

					headerParts.image = await this._integrationHelpers.templateHelpers.createText("initials", 18, {
						width: "44px",
						height: "44px",
						objectFit: "cover",
						borderRadius: "50%",
						backgroundColor: palette.background2,
						color: "white",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					});
					data.initials = initials;
				} else if (fieldMapping.displayMode === "header") {
					headerParts.header = await this._integrationHelpers.templateHelpers.createTitle("header", 14);
					data.header = fieldValue;
				} else if (fieldMapping.displayMode === "sub-header") {
					headerParts.subHeader = await this._integrationHelpers.templateHelpers.createText("subHeader", 12);
					data.subHeader = fieldValue;
				} else if (fieldMapping.displayMode === "field") {
					if (fieldMapping.fieldContent === "link") {
						pairs.push({
							label: fieldMapping.label,
							links: [fieldValue]
						});
						urls[`${fieldMapping.label}_link_0`] = fieldValue;
					} else if (fieldMapping.fieldContent === "date") {
						pairs.push({
							label: fieldMapping.label,
							value: new Date(fieldValue).toLocaleString()
						});
						urls[`${fieldMapping.label}_link_0`] = fieldValue;
					} else {
						pairs.push({
							label: fieldMapping.label,
							value: fieldValue,
							wide: fieldMapping.fieldContent === "memo"
						});
					}
				}
			}
		}

		const headerChildren: TemplateFragment[] = [];

		if (headerParts.image) {
			headerChildren.push(headerParts.image);
		}
		if (headerParts.header || headerParts.subHeader) {
			const headerTitleParts: TemplateFragment[] = [];
			if (headerParts.header) {
				headerTitleParts.push(headerParts.header);
			}
			if (headerParts.subHeader) {
				headerTitleParts.push(headerParts.subHeader);
			}
			headerChildren.push(
				await this._integrationHelpers.templateHelpers.createContainer("column", headerTitleParts)
			);
		}

		const headerRow = await this._integrationHelpers.templateHelpers.createContainer("row", headerChildren, {
			paddingBottom: "10px",
			borderBottom: `1px solid ${palette.background2}`,
			gap: "10px"
		});

		return this.buildTemplate(searchResult, mapping, CLITemplate.Custom, {
			layout: await this._integrationHelpers.templateHelpers.createContainer(
				"column",
				[headerRow, await this.createPairsLayout(palette, pairs)],
				{
					padding: "10px",
					gap: "15px",
					flex: "1"
				}
			),
			data: {
				...data,
				...this.mapPairsToData(pairs)
			}
		});
	}

	private buildTemplate(
		searchResult: SalesforceSearchResult,
		mapping: SalesforceMapping,
		template: CLITemplate,
		templateContent?: CustomTemplate
	): HomeSearchResult {
		const titleField = mapping.fieldMappings.find((m) => m.isResultTitle);
		let title = searchResult.Id;
		if (titleField && searchResult[titleField.field]) {
			title = this.getFieldContent(searchResult, titleField.field, titleField.fieldSub);
		}
		return {
			actions: [{ name: "View", hotkey: "enter" }],
			label: mapping.label,
			key: searchResult.Id,
			title,
			icon: this._settings?.iconMap[mapping.iconKey],
			data: {
				providerId: SalesForceIntegrationProvider._PROVIDER_ID,
				url: `${this._settings?.orgUrl}/${searchResult.Id}`,
				tags: [SalesForceIntegrationProvider._PROVIDER_ID],
				obj: searchResult,
				mapping
			} as SalesforceResultData,
			template,
			templateContent
		} as HomeSearchResult;
	}

	private async populateReferences(
		searchResult: SalesforceSearchResult,
		mapping: SalesforceMapping
	): Promise<void> {
		const batch: SalesforceBatchRequestItem[] = [];
		const referenceMappings: SalesforceMappingFieldMapping[] = [];

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
								`SELECT ${fieldMapping.reference.field} FROM ${fieldMapping.reference.type} WHERE Id='${id}'`
							)}`
						});
					}
				}
			}
		}

		if (batch.length > 0) {
			const batchedResults = await this.getBatchedResults<SalesforceRestApiQueryResponse<
				SalesforceRestApiSObject<SalesforceSearchResult>
			>>(batch);
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
							referenceMappings[i].reference.field,
							referenceMappings[i].reference.fieldSub
						),
						lastReferenced: Date.now()
					};
					searchResult[referenceMappings[i].field] = this._referenceCache[id].value;
					delete referenceMappings[i].reference;
				}
			}
		}
	}

	private cleanupCache(): void {
		const now = Date.now();
		for (const cacheId of Object.keys(this._referenceCache)) {
			if (now - this._referenceCache[cacheId].lastReferenced > 120000) {
				delete this._referenceCache[cacheId];
			}
		}
	}

	private async createPairsLayout(
		palette: CustomPaletteSet,
		pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[]
	): Promise<TemplateFragment> {
		return this._integrationHelpers.templateHelpers.createContainer(
			"column",
			await Promise.all(pairs.map(async (p) => this.createPairLayout(palette, p))),
			{ gap: "5px", flex: "1" }
		);
	}

	private async createPairLayout(
		palette: CustomPaletteSet,
		pair: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }
	): Promise<TemplateFragment> {
		const elements: TemplateFragment[] = [
			await this._integrationHelpers.templateHelpers.createText(`${pair.label}Title`, 10, {
				color: palette.inputPlaceholder,
				flex: 1
			})
		];

		if (pair.value) {
			elements.push(
				await this._integrationHelpers.templateHelpers.createText(`${pair.label}`, 10, {
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
				await this._integrationHelpers.templateHelpers.createContainer(
					"row",
					await Promise.all(
						pair.links.map(async (l, idx) =>
							this._integrationHelpers.templateHelpers.createLink(
								`${pair.label}_link_${idx}`,
								`${SalesForceIntegrationProvider._ACTION_OPEN}_${pair.label}_link_${idx}`,
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
				await this._integrationHelpers.templateHelpers.createContainer(
					"row",
					await Promise.all(
						pair.srcs.map(async (s, idx) =>
							this._integrationHelpers.templateHelpers.createImage(`${pair.label}_src_${idx}`, "Member", {
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

		return this._integrationHelpers.templateHelpers.createContainer(pair.wide ? "column" : "row", elements, {
			justifyContent: "space-between",
			gap: pair.wide ? "5px" : "10px"
		});
	}

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
	private populateFields(): void {
		this.populateAccountMapping();
		this.populateContactMapping();
		this.populateTaskMapping();
		this.populateNoteMapping();
		this.populateChatterMapping();
	}

	private populateAccountMapping() {
		const mapping = this._mappings.find((m) => m.type === "Account");
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
		}
	}

	private populateContactMapping() {
		const mapping = this._mappings.find((m) => m.type === "Contact");
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
		}
	}

	private populateTaskMapping() {
		const mapping = this._mappings.find((m) => m.type === "Task");
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
						type: "User",
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
		}
	}

	private populateNoteMapping() {
		const mapping = this._mappings.find((m) => m.type === "ContentNote");
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
						type: "User",
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
		}
	}

	private populateChatterMapping() {
		const mapping = this._mappings.find((m) => m.type === "Chatter");
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
					field: "actor",
					fieldSub: "displayName",
					displayMode: "header",
					isResultTitle: true
				},
				{
					field: "header",
					fieldSub: "text",
					displayMode: "field",
					fieldContent: "memo",
					label: "Header"
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
		}
	}
}
