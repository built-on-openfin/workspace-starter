import {
	connect,
	ConnectionError,
	enableLogging,
	type SalesforceConnection,
	type SalesforceRestApiSearchResponse
} from "@openfin/salesforce";
import {
	CLIFilterOptionType,
	CLITemplate,
	type CLIDispatchedSearchResult,
	type CLIFilter,
	type CLISearchListenerResponse,
	type CLISearchResultContact,
	type CLISearchResultList,
	type CLISearchResultPlain,
	type CLISearchResultSimpleText,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import type {
	SalesforceAccount,
	SalesforceBatchRequest,
	SalesforceBatchRequestItem,
	SalesforceBatchResponse,
	SalesforceContact,
	SalesforceContentNote,
	SalesforceFeedElementPage,
	SalesforceFeedItem,
	SalesforceResultData,
	SalesforceSettings,
	SalesforceTask
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
	 * The integration manager.
	 * @internal
	 */
	private _integrationManager: IntegrationManager | undefined;

	/**
	 * The connection to SalesForce.
	 * @internal
	 */
	private _salesForceConnection: SalesforceConnection | undefined;

	/**
	 * The module is being registered.
	 * @param integrationManager The manager for the integration.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	public async register(
		integrationManager: IntegrationManager,
		integration: Integration<SalesforceSettings>
	): Promise<void> {
		this._integrationManager = integrationManager;
		console.log("Registering SalesForce");
		try {
			await this.openConnection(integration);
		} catch (err) {
			console.error("Error connecting to SalesForce", err);
		}
	}

	/**
	 * The module is being deregistered.
	 * @param integration The integration details.
	 * @returns Nothing.
	 */
	public async deregister(integration: Integration<SalesforceSettings>): Promise<void> {
		await this.closeConnection();
	}

	/**
	 * Get a list of the default application entries.
	 * @param integration The integration details.
	 * @returns The list of application entries.
	 */
	async getDefaultEntries(
		integration: Integration<SalesforceSettings>
	): Promise<HomeSearchResult[]> {
		const results: HomeSearchResult[] = [];
		if (integration?.data?.orgUrl) {
			results.push({
				actions: [{ name: "Browse", hotkey: "enter" }],
				data: {
					providerId: SalesForceIntegrationProvider._PROVIDER_ID,
					pageUrl: integration?.data?.orgUrl,
					tags: [SalesForceIntegrationProvider._PROVIDER_ID]
				} as SalesforceResultData,
				icon: integration.icon,
				key: SalesForceIntegrationProvider._BROWSE_SEARCH_RESULT_KEY,
				template: CLITemplate.Plain,
				templateContent: undefined,
				title: "Browse Salesforce"
			} as CLISearchResultPlain);

			if (!this._salesForceConnection) {
				results.push(this.getReconnectSearchResult(integration));
			}
		}

		return results;
	}

	/**
	 * An entry has been selected.
	 * @param integration The integration details.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		integration: Integration<SalesforceSettings>,
		result: CLIDispatchedSearchResult,
		lastResponse: CLISearchListenerResponse
	): Promise<boolean> {
		// if the user clicked the reconnect result, reconnect to salesforce and re-run query
		if (result.key === SalesForceIntegrationProvider._NOT_CONNECTED_SEARCH_RESULT_KEY) {
			await this.openConnection(integration);

			if (result.data?.query) {
				const results = await this.getSearchResults(
					integration,
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
		if (data !== undefined && this._integrationManager && this._integrationManager.launchView) {
			const preload = integration?.data?.preload;
			const viewOptions = {
				url: data.pageUrl,
				fdc3InteropApi: "1.2",
				interop: {
					currentContextGroup: "green"
				},
				customData: { buttonLabel: "Process Participant" },
				preloadScripts: [{ url: preload }],
				target: { name: "", url: "", uuid: "" }
			};
			await this._integrationManager.launchView(viewOptions);
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
		integration: Integration<SalesforceSettings>,
		query: string,
		filters: CLIFilter[],
		lastResponse: CLISearchListenerResponse
	): Promise<HomeSearchResponse> {
		const response: HomeSearchResponse = {
			results: await this.getDefaultEntries(integration)
		};

		if (this._salesForceConnection) {
			let searchResults: (
				| SalesforceAccount
				| SalesforceContact
				| SalesforceTask
				| SalesforceContentNote
				| SalesforceFeedItem
			)[];

			let selectedObjects: string[] = [];
			if (Array.isArray(filters) && filters.length > 0) {
				const objectsFilter = filters.find((x) => x.id === SalesForceIntegrationProvider._OBJECTS_FILTER_ID);
				if (objectsFilter) {
					selectedObjects = (
						Array.isArray(objectsFilter.options) ? objectsFilter.options : [objectsFilter.options]
					)
						.filter((x) => Boolean(x.isSelected))
						.map((x) => (x.value === "Note" ? "ContentNote" : x.value));
				}
			}

			try {
				searchResults = await this.getApiSearchResults(query, selectedObjects);

				const results = searchResults.map((searchResult) => {
					if ("Website" in searchResult) {
						return {
							actions: [{ name: "View", hotkey: "enter" }],
							label: searchResult.attributes.type,
							key: searchResult.Id,
							title: searchResult.Name,
							icon: integration?.data?.iconMap.account,
							data: {
								providerId: SalesForceIntegrationProvider._PROVIDER_ID,
								pageUrl: this.getObjectUrl(searchResult.Id, integration.data?.orgUrl),
								tags: [SalesForceIntegrationProvider._PROVIDER_ID]
							},
							template: CLITemplate.Contact,
							templateContent: {
								name: searchResult.Name,
								title: searchResult.Industry,
								details: [
									[
										["Phone", searchResult.Phone],
										["Type", searchResult.Type],
										["Website", searchResult.Website]
									]
								]
							}
						} as CLISearchResultContact;
					} else if ("Email" in searchResult) {
						return {
							actions: [{ name: "View", hotkey: "enter" }],
							label: searchResult.attributes.type,
							key: searchResult.Id,
							title: searchResult.Name,
							icon: integration?.data?.iconMap.contact,
							data: {
								providerId: SalesForceIntegrationProvider._PROVIDER_ID,
								pageUrl: this.getObjectUrl(searchResult.Id, integration.data?.orgUrl),
								tags: [SalesForceIntegrationProvider._PROVIDER_ID]
							},
							template: CLITemplate.Contact,
							templateContent: {
								name: searchResult.Name,
								title: searchResult.Title,
								useInitials: true,
								details: [
									[
										["Department", searchResult.Department],
										["Email", searchResult.Email],
										["Work #", searchResult.Phone]
									]
								]
							}
						} as CLISearchResultContact;
					} else if ("Description" in searchResult) {
						return {
							actions: [{ name: "View", hotkey: "enter" }],
							label: searchResult.attributes.type,
							key: searchResult.Id,
							title: searchResult.Subject,
							icon: integration?.data?.iconMap.task,
							data: {
								providerId: SalesForceIntegrationProvider._PROVIDER_ID,
								pageUrl: this.getObjectUrl(searchResult.Id, integration.data?.orgUrl),
								tags: [SalesForceIntegrationProvider._PROVIDER_ID]
							},
							template: "List",
							templateContent: [
								["Subject", searchResult.Subject],
								["Comments", searchResult.Description]
							]
						} as CLISearchResultList;
					} else if ("TextPreview" in searchResult) {
						return {
							actions: [{ name: "View", hotkey: "enter" }],
							label: "Note",
							key: searchResult.Id,
							title: searchResult.Title,
							icon: integration?.data?.iconMap.note,
							data: {
								providerId: SalesForceIntegrationProvider._PROVIDER_ID,
								pageUrl: this.getObjectUrl(searchResult.Id, integration.data?.orgUrl),
								tags: [SalesForceIntegrationProvider._PROVIDER_ID]
							},
							template: "List",
							templateContent: [
								["Title", searchResult.Title],
								["Content", searchResult?.TextPreview]
							]
						} as CLISearchResultList;
					} else if (
						"actor" in searchResult &&
						(searchResult.type === "TextPost" || searchResult.type === "ContentPost")
					) {
						return {
							actions: [{ name: "View", hotkey: "enter" }],
							label: "Chatter",
							key: searchResult.id,
							title: searchResult.actor?.displayName,
							icon: integration?.data?.iconMap.chatter,
							data: {
								providerId: SalesForceIntegrationProvider._PROVIDER_ID,
								pageUrl: this.getObjectUrl(searchResult.id, integration.data?.orgUrl),
								tags: [SalesForceIntegrationProvider._PROVIDER_ID]
							} as SalesforceResultData,
							template: CLITemplate.Contact,
							templateContent: {
								name: searchResult.actor?.displayName,
								useInitials: true,
								details: [
									[
										["Header", searchResult?.header?.text],
										["Note", searchResult?.body?.text]
									]
								]
							}
						} as CLISearchResultContact;
					}
					// in this case we are only searching for accounts, contacts, tasks, content notes and chatter
				});

				const filteredResults = results.filter(Boolean) as CLISearchResultContact[];
				// eslint-disable-next-line no-confusing-arrow
				const objects = searchResults.map((result) =>
					"attributes" in result ? result.attributes.type : "Chatter"
				);
				response.results.push(...filteredResults);
				response.context = {
					filters: this.getSearchFilters(objects.map((c) => (c === "ContentNote" ? "Note" : c)))
				};
			} catch (err) {
				await this.closeConnection();
				if (err instanceof ConnectionError) {
					response.results.push(this.getReconnectSearchResult(integration, query, filters));
				}
				console.error("Error retrieving SalesForce search results", err);
			}
		}

		return response;
	}

	/**
	 * Open the connection to SaleForce.
	 * @param integration The integration details.
	 * @internal
	 */
	private async openConnection(integration: Integration<SalesforceSettings>): Promise<void> {
		if (integration?.data?.orgUrl && !this._salesForceConnection) {
			enableLogging();
			this._salesForceConnection = await connect(integration?.data.orgUrl, integration?.data.consumerKey);
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
				console.error("Error disconnecting SalesForce", err);
			} finally {
				this._salesForceConnection = undefined;
			}
		}
	}

	/**
	 * Create the object url from the if and origin.
	 * @param objectId The object id.
	 * @param salesforceOrgOrigin The origin url.
	 * @returns Then object url.
	 * @internal
	 */
	private getObjectUrl(objectId: string, salesforceOrgOrigin?: string): string {
		if (!salesforceOrgOrigin) {
			return "";
		}
		return `${salesforceOrgOrigin}/${objectId}`;
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
		selectedObjects?: string[]
	): Promise<
		(SalesforceContact | SalesforceAccount | SalesforceTask | SalesforceContentNote | SalesforceFeedItem)[]
	> {
		const accountFieldSpec = "Account(Id, Industry, Name, Phone, Type, Website)";
		const contactFieldSpec = "Contact(Department, Email, Id, Name, Phone, Title)";
		const taskFieldSpec = "Task(Id, Subject, Description)";
		const contentNoteFieldSpec = "ContentNote(Id, Title, Content, TextPreview)";
		const fieldSpecMap = new Map<string, string>([
			["Account", accountFieldSpec],
			["Contact", contactFieldSpec],
			["Task", taskFieldSpec],
			["ContentNote", contentNoteFieldSpec]
		]);
		const fieldSpecs = [...fieldSpecMap]
			.filter((x) => {
				if (Array.isArray(selectedObjects) && selectedObjects.length > 0) {
					return selectedObjects.includes(x[0]);
				}
				return true;
			})
			.map((x) => x[1]);

		const batch: SalesforceBatchRequestItem[] = fieldSpecs.map((fieldSpec) => {
			const salesforceSearchQuery = `FIND {${this.escapeQuery(
				query
			)}} IN ALL FIELDS RETURNING ${fieldSpec} LIMIT 10`;

			return {
				method: "GET",
				url: `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`
			};
		});

		const includeChatter = !selectedObjects?.length || selectedObjects.includes("Chatter");
		if (includeChatter) {
			batch.push({
				method: "GET",
				url: `/services/data/vXX.X/chatter/feed-elements?q=${query}&pageSize=25&sort=LastModifiedDateDesc`
			});
		}

		const batchedResults = await this.getBatchedResults<
			| SalesforceRestApiSearchResponse<
					SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote
			  >
			| SalesforceFeedElementPage
		>(batch);

		let results: (
			| SalesforceAccount
			| SalesforceContact
			| SalesforceTask
			| SalesforceContentNote
			| SalesforceFeedItem
		)[] = [];

		if (batchedResults.length > 0) {
			let idx = 0;
			for (; idx < fieldSpecs.length; idx++) {
				const searchResponse = batchedResults[idx] as SalesforceRestApiSearchResponse<
					SalesforceAccount | SalesforceContact | SalesforceTask | SalesforceContentNote
				>;
				if (searchResponse?.searchRecords?.length) {
					results = results.concat(searchResponse.searchRecords);
				}
			}

			if (includeChatter) {
				const chatterResponse = batchedResults[idx++] as SalesforceFeedElementPage;
				if (chatterResponse?.elements?.length) {
					results = results.concat(chatterResponse.elements);
				}
			}
		}

		return results;
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
	 * @param integration The integration details.
	 * @param query The query that needs to reconnect.
	 * @param filters The filter for the reconnect.
	 * @returns The search result entry.
	 * @internal
	 */
	private getReconnectSearchResult(
		integration: Integration<SalesforceSettings>,
		query?: string,
		filters?: CLIFilter[]
	) {
		return {
			actions: [{ name: "Reconnect", hotkey: "enter" }],
			key: SalesForceIntegrationProvider._NOT_CONNECTED_SEARCH_RESULT_KEY,
			icon: integration?.icon,
			title: "Reconnect to Salesforce",
			data: {
				providerId: SalesForceIntegrationProvider._PROVIDER_ID,
				query,
				filters
			}
		} as CLISearchResultSimpleText;
	}

	/**
	 * Get the search filters based on the results.
	 * @param objects The object types to create the filters from.
	 * @returns The filters.
	 * @internal
	 */
	private getSearchFilters(objects: string[]): CLIFilter[] {
		if (Array.isArray(objects) && objects.length > 0) {
			const filters: CLIFilter[] = [];
			const uniqueObjects = [...new Set(objects.sort())];
			const objectFilter: CLIFilter = {
				id: SalesForceIntegrationProvider._OBJECTS_FILTER_ID,
				title: "Objects",
				type: CLIFilterOptionType.MultiSelect,
				options: []
			};

			for (const object of uniqueObjects) {
				if (Array.isArray(objectFilter.options)) {
					objectFilter.options.push({
						value: object,
						isSelected: false
					});
				}
			}

			filters.push(objectFilter);
			return filters;
		}
		return [];
	}
}
