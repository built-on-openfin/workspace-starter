import {
	AuthTokenExpiredError,
	connect,
	enableLogging,
	type ServiceNowConnection,
	type ServiceNowEntities
} from "@openfin/servicenow";
import {
	ButtonStyle,
	CLITemplate,
	type CLIFilter,
	type CLISearchResultCustom,
	type CLISearchResultLoading,
	type CustomTemplateData,
	type HomeAction,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	type TemplateFragment
} from "@openfin/workspace";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import type {
	ActionData,
	ActionLoadingData,
	IMAGES,
	IntegrationHelpers,
	Logger,
	ServiceNowBatchRequest,
	ServiceNowIncident,
	ServiceNowObjectTypes,
	ServiceNowSettings,
	TemplateHelpers
} from "./shapes";

/**
 * Implement the integration provider for ServiceNow results.
 */
export class ServiceNowIntegration {
	/**
	 * The default base score for ordering.
	 * @internal
	 */
	private static readonly _DEFAULT_BASE_SCORE = 700000;

	/**
	 * The key to use for an open key action.
	 * @internal
	 */
	private static readonly _ACTION_OPEN = "Open";

	/**
	 * The key to use for a call key action.
	 * @internal
	 */
	private static readonly _ACTION_PHONE_CALL = "Call";

	/**
	 * The key to use for a email key action.
	 * @internal
	 */
	private static readonly _ACTION_EMAIL = "E-mail";

	/**
	 * The key to use for a connect key action.
	 * @internal
	 */
	private static readonly _ACTION_CONNECT = "Connect";

	/**
	 * The key for the filters.
	 * @internal
	 */
	private static readonly _FILTERS = "ServiceNow";

	/**
	 * Mapping of oject types to their table names.
	 */
	private static readonly _TABLE_NAMES: {
		[id in ServiceNowObjectTypes]: string;
	} = {
		Account: "customer_account",
		Contact: "customer_contact",
		Case: "sn_customerservice_case",
		Task: "task",
		Incident: "incident"
	};

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _logger: Logger | undefined;

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
		| { id: string; title: string; baseScore?: number; data: ServiceNowSettings }
		| undefined;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _settings: ServiceNowSettings | undefined;

	/**
	 * The ServiceNow connection.
	 */
	private _serviceNowConnection?: ServiceNowConnection;

	/**
	 * The debounce timer id.
	 */
	private _debounceTimerId?: number;

	/**
	 * Any errors during connection.
	 */
	private _connectionError?: string;

	/**
	 * The home response when the connect failure entry was created.
	 */
	private _connectLastResponse?: HomeSearchListenerResponse;

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
		definition: { id: string; title: string; data: ServiceNowSettings },
		loggerCreator: (group: string) => Logger,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._definition = definition;
		this._settings = definition.data;
		this._integrationHelpers = helpers;

		this._definition.title ??= "ServiceNow";

		this._logger = loggerCreator(this._definition.title);
		this._logger.info(`Initializing ${this._definition.title}`);

		if (!this._settings.clientId) {
			this._logger.error("Configuration is missing clientId");
			return;
		}

		if (!this._settings.instanceUrl) {
			this._logger.error("Configuration is missing instanceUrl");
			return;
		}

		await this.connectToServiceNow();
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		if (this._serviceNowConnection) {
			this._logger?.info("Disconnecting");
			await this._serviceNowConnection.disconnect();
			this._serviceNowConnection = undefined;
		}
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<CLISearchResultCustom<HomeAction>[]> {
		if (this._integrationHelpers) {
			return [
				{
					key: `${this._definition?.id}-help1`,
					score: this._definition?.baseScore ?? ServiceNowIntegration._DEFAULT_BASE_SCORE,
					title: this._definition?.title ?? "",
					label: "Help",
					icon: this._settings?.images.servicenow,
					actions: [],
					data: {
						providerId: this._definition?.id
					},
					template: CLITemplate.Custom,
					templateContent: await this._integrationHelpers?.templateHelpers.createHelp(
						"ServiceNow",
						[
							"The ServiceNow integration can be used to search multiple data source in your platform.",
							"Using a freeform query will search the content of Contacts, Accounts, Cases, Tasks and Incidents"
						],
						[]
					)
				}
			];
		}
		return [];
	}

	/**
	 * Get a list of search results based on the query and filters.
	 * @param query The query to search for.
	 * @param filters The filters to apply.
	 * @param lastResponse The last search response used for updating existing results.
	 * @param options Options for the search query.
	 * @param options.queryMinLength The minimum length of the query before showing results.
	 * @param options.queryAgainst The field to search against.
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
		if (!this._serviceNowConnection && this._integrationHelpers) {
			this._connectLastResponse = lastResponse;
			const results = [];
			if (this._connectionError) {
				const connectResult = await this.createConnectResult(
					this._integrationHelpers.templateHelpers,
					await this._integrationHelpers.getCurrentPalette()
				);
				if (connectResult) {
					results.push(connectResult);
				}
			}
			return {
				results
			};
		}

		if (this._debounceTimerId) {
			window.clearTimeout(this._debounceTimerId);
			this._debounceTimerId = undefined;
		}

		const defaultFilters: ServiceNowObjectTypes[] = ["Contact", "Account", "Case", "Task", "Incident"];

		const minLength = options?.queryMinLength ?? 3;

		const apps: HomeSearchResult[] = [];

		if (this._integrationHelpers) {
			apps.push(
				await this.createAppResult(
					this._integrationHelpers?.templateHelpers,
					await this._integrationHelpers.getCurrentPalette()
				)
			);
		}

		this._debounceTimerId = window.setTimeout(async () => {
			if (this._serviceNowConnection && this._integrationHelpers) {
				try {
					if (query.length >= minLength && !query.startsWith("/")) {
						const serviceNowFilter = filters?.find((f) => f.id === ServiceNowIntegration._FILTERS);

						let includeOptions: ServiceNowObjectTypes[] = [...defaultFilters];

						if (serviceNowFilter?.options && Array.isArray(serviceNowFilter.options)) {
							includeOptions = serviceNowFilter.options
								.filter((o) => o.isSelected)
								.map((o) => o.value as ServiceNowObjectTypes);
						}

						const homeResults: HomeSearchResult[] = [];

						const batchRequest: ServiceNowBatchRequest = {
							// eslint-disable-next-line camelcase
							batch_request_id: "1",
							// eslint-disable-next-line camelcase
							rest_requests: []
						};

						if (includeOptions.includes("Contact")) {
							batchRequest.rest_requests.push({
								id: "Contact",
								method: "GET",
								url: `/api/now/v2/table/${ServiceNowIntegration._TABLE_NAMES.Contact}?${this.buildSearchQuery(
									query,
									["name"],
									["sys_id", "name"],
									10
								)}`
							});
						}

						if (includeOptions.includes("Account")) {
							batchRequest.rest_requests.push({
								id: "Account",
								method: "GET",
								url: `/api/now/v2/table/${ServiceNowIntegration._TABLE_NAMES.Account}?${this.buildSearchQuery(
									query,
									["name"],
									["sys_id", "name"],
									10
								)}`
							});
						}

						if (includeOptions.includes("Case")) {
							batchRequest.rest_requests.push({
								id: "Case",
								method: "GET",
								url: `/api/now/v2/table/${ServiceNowIntegration._TABLE_NAMES.Case}?${this.buildSearchQuery(
									query,
									["number", "case", "short_description"],
									["sys_id", "number"],
									10
								)}`
							});
						}

						if (includeOptions.includes("Task")) {
							batchRequest.rest_requests.push({
								id: "Task",
								method: "GET",
								url: `/api/now/v2/table/${ServiceNowIntegration._TABLE_NAMES.Task}?${this.buildSearchQuery(
									query,
									["number", "short_description"],
									["sys_id", "number"],
									10
								)}`
							});
						}

						if (includeOptions.includes("Incident")) {
							batchRequest.rest_requests.push({
								id: "Incident",
								method: "GET",
								url: `/api/now/v2/table/${
									ServiceNowIntegration._TABLE_NAMES.Incident
								}?${this.buildSearchQuery(query, ["number", "short_description"], ["sys_id", "number"], 10)}`
							});
						}

						const results: {
							[id: string]: ServiceNowEntities.Core.BaseEntity[];
						} = {};

						for (const request of batchRequest.rest_requests) {
							const response = await this._serviceNowConnection.executeApiRequest(
								request.url,
								request.method,
								request.body,
								false,
								request.headers
							);

							if (response.status === 200 && Array.isArray(response.data)) {
								results[request.id] = response.data;
							}

							console.log(response);
						}

						if (results.Contact) {
							for (const contact of results.Contact as ServiceNowEntities.Core.Contact[]) {
								homeResults.push(await this.createLoadingResult(contact, "name", "Contact"));
							}
						}
						if (results.Account) {
							for (const account of results.Account as ServiceNowEntities.CSM.Account[]) {
								homeResults.push(await this.createLoadingResult(account, "name", "Account"));
							}
						}
						if (results.Case) {
							for (const cs of results.Case as ServiceNowEntities.CSM.Case[]) {
								homeResults.push(await this.createLoadingResult(cs, "number", "Case"));
							}
						}
						if (results.Task) {
							for (const task of results.Task as ServiceNowEntities.CSM.Task[]) {
								homeResults.push(await this.createLoadingResult(task, "number", "Task"));
							}
						}
						if (results.Incident) {
							for (const incident of results.Incident as ServiceNowIncident[]) {
								homeResults.push(await this.createLoadingResult(incident, "number", "Incident"));
							}
						}

						lastResponse.respond(homeResults);
					}
				} catch (err) {
					if (err instanceof AuthTokenExpiredError) {
						this._logger?.error("Auth token expired, reconnecting");
						this._serviceNowConnection = undefined;
						await this.connectToServiceNow();
					} else {
						this._logger?.error(this.formatError(err));
					}
				}
			}
			lastResponse.revoke(`${this._definition?.id}-searching`);
		}, 500);

		return {
			results: apps.concat(query.length >= minLength ? [this.createSearchingResult()] : []),
			context: {
				filters: [
					{
						id: ServiceNowIntegration._FILTERS as string,
						title: "Service Now",
						options: defaultFilters.map((o) => ({
							value: o,
							isSelected: true
						}))
					}
				]
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
		if (result.action.trigger === "focus-change") {
			if (result.data?.state === "loading" && this._serviceNowConnection && this._integrationHelpers) {
				const palette = await this._integrationHelpers.getCurrentPalette();
				const templateHelpers = this._integrationHelpers.templateHelpers;
				const actionData = result.data as ActionLoadingData;
				const objType = actionData.objType;

				try {
					// Load the full expanded version of the object with display values
					const response = await this._serviceNowConnection.executeApiRequest(
						`/api/now/v2/table/${ServiceNowIntegration._TABLE_NAMES[objType]}/${actionData.obj.sys_id}?sysparm_display_value=true`,
						"GET"
					);

					if (response.data) {
						actionData.obj = response.data;
					}
				} catch (err) {
					this._logger?.error(this.formatError(err));
				}

				const resultHandlers: {
					[key in ServiceNowObjectTypes]?: () => Promise<HomeSearchResult>;
				} = {
					Contact: async () =>
						this.createContactResult(
							templateHelpers,
							palette,
							actionData.obj as ServiceNowEntities.Core.Contact
						),
					Account: async () =>
						this.createAccountResult(
							templateHelpers,
							palette,
							actionData.obj as ServiceNowEntities.CSM.Account
						),
					Case: async () =>
						this.createCaseResult(templateHelpers, palette, actionData.obj as ServiceNowEntities.CSM.Case),
					Task: async () =>
						this.createTaskResult(templateHelpers, palette, actionData.obj as ServiceNowEntities.CSM.Task),
					Incident: async () =>
						this.createIncidentResult(templateHelpers, palette, actionData.obj as ServiceNowIncident)
				};

				const typeHandler = resultHandlers[objType];
				if (typeHandler) {
					const res = await typeHandler();
					if (res) {
						lastResponse.respond([res]);
					}
				}
			}
			return true;
		} else if (result.action.trigger === "user-action") {
			return this.handleAction(result.action.name, result.data as ActionData, lastResponse);
		}

		return false;
	}

	/**
	 * Handle an action from a home template.
	 * @param actionName The name of the action.
	 * @param actionData The data associated with the action.
	 * @param lastResponse The last response in case we need to update the results.
	 * @returns True if the action was handled.
	 */
	private async handleAction(
		actionName: string,
		actionData: ActionData,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		switch (actionName) {
			case ServiceNowIntegration._ACTION_EMAIL: {
				this._logger?.info("Email", actionData.email);
				await fin.System.openUrlWithBrowser(`mailto:${actionData.email}`);
				return true;
			}
			case ServiceNowIntegration._ACTION_PHONE_CALL: {
				this._logger?.info("Phone Call", actionData.phone);
				await fin.System.openUrlWithBrowser(`tel:${actionData.phone}`);
				return true;
			}
			default:
				if (this._integrationHelpers) {
					await this._integrationHelpers.launchView({ url: actionData.url });
					return true;
				}
		}
		return false;
	}

	/**
	 * Connect to the graph API.
	 */
	private async connectToServiceNow(): Promise<void> {
		try {
			if (!this._settings?.instanceUrl || !this._settings?.clientId) {
				throw new Error("Configuration missing instanceUrl or clientId");
			}

			this._logger?.info("Connecting to ServiceNow", {
				instanceUrl: this._settings.instanceUrl,
				clientId: this._settings.clientId
			});

			if (this._settings.enableLibLogging) {
				enableLogging();
			}

			this._connectionError = undefined;
			this._serviceNowConnection = await connect(this._settings.instanceUrl, this._settings.clientId);
			if (this._connectLastResponse) {
				this._connectLastResponse.revoke(`${this._definition?.id}-connect`);
				this._connectLastResponse = undefined;
			}
		} catch (err) {
			this._serviceNowConnection = undefined;
			this._connectionError = this.formatError(err);
			this._logger?.error("Connecting to ServiceNow failed", err);
			if (this._connectLastResponse && this._integrationHelpers) {
				this._connectLastResponse.respond([
					await this.createConnectResult(
						this._integrationHelpers.templateHelpers,
						await this._integrationHelpers.getCurrentPalette()
					)
				]);
			}
		}
	}

	/**
	 * Create a result for home to allow reconnection.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @returns The connect template.
	 */
	private async createConnectResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet
	): Promise<CLISearchResultCustom<HomeAction>> {
		const layout = await templateHelpers.createContainer(
			"column",
			[
				await templateHelpers.createContainer(
					"row",
					[await templateHelpers.createText("title", 14, { fontWeight: "bold" })],
					{
						paddingBottom: "10px",
						borderBottom: `1px solid ${palette.background6}`,
						gap: "10px"
					}
				),
				await templateHelpers.createText("description", 12),
				await templateHelpers.createText("error", 12, {
					fontFamily: "monospace",
					flex: 1
				}),
				await templateHelpers.createButton(
					ButtonStyle.Primary,
					"connect",
					ServiceNowIntegration._ACTION_CONNECT
				)
			],
			{
				padding: "10px",
				gap: "15px",
				flex: "1"
			}
		);

		return {
			key: `${this._definition?.id}-connect`,
			score: this._definition?.baseScore ?? ServiceNowIntegration._DEFAULT_BASE_SCORE,
			title: this._definition?.title ?? "",
			label: "Connect",
			icon: this._settings?.images.servicenow,
			actions: [
				{
					name: ServiceNowIntegration._ACTION_CONNECT,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout,
				data: {
					title: `${this._definition?.title} Connection`,
					description: `${this._definition?.title} failed to connect due to the following error`,
					error: this._connectionError ?? "Unknown connection error",
					connect: "Connect"
				}
			}
		};
	}

	/**
	 * Create a result to show we are searching.
	 * @returns Home template for searching.
	 */
	private createSearchingResult(): CLISearchResultLoading<HomeAction> {
		return {
			key: `${this._definition?.id}-searching`,
			score: this._definition?.baseScore ?? ServiceNowIntegration._DEFAULT_BASE_SCORE,
			title: "Searching ...",
			icon: this._settings?.images.servicenow,
			actions: [],
			data: {
				providerId: this._definition?.id
			} as ActionData,
			template: CLITemplate.Loading,
			templateContent: ""
		};
	}

	/**
	 * Create a result fir the main application.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @returns Home template for application.
	 */
	private async createAppResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet
	): Promise<CLISearchResultCustom<HomeAction>> {
		const templateContent = await this.createLayoutTemplate(
			"ServiceNow",
			this._settings?.images.servicenow,
			[await templateHelpers.createText("description")],
			[
				{
					titleKey: "open",
					action: ServiceNowIntegration._ACTION_OPEN,
					imageKey: "openImage",
					imageAltText: "ServiceNow"
				}
			],
			templateHelpers,
			palette
		);
		return {
			key: `${this._definition?.id}-app`,
			score: this._definition?.baseScore ?? ServiceNowIntegration._DEFAULT_BASE_SCORE,
			title: this._definition?.title ?? "ServiceNow",
			description: "Application",
			icon: this._settings?.images.servicenow,
			actions: [],
			data: {
				providerId: this._definition?.id,
				url: this._settings?.instanceUrl
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: templateContent.layout,
				data: {
					...templateContent.data,
					description: "Launch ServiceNow main dashboard",
					open: "Open",
					openImage: this._settings?.images.servicenow ?? ""
				}
			}
		};
	}

	/**
	 * Create a result which show a loading template.
	 * @param obj The object to display loading for.
	 * @param title The title of the item.
	 * @param objType The type of the item.
	 * @returns The home search result.
	 */
	private async createLoadingResult<T extends ServiceNowEntities.Core.BaseEntity>(
		obj: T,
		title: keyof T,
		objType: ServiceNowObjectTypes
	): Promise<CLISearchResultLoading<HomeAction>> {
		return {
			key: `${this._definition?.id}-${obj.sys_id}`,
			score: this.objectTypeToOrder(objType),
			title: (obj[title] as unknown as string) ?? `Untitled ${objType}`,
			label: objType,
			icon: this._settings?.images[objType.toLowerCase() as IMAGES],
			actions: [],
			data: {
				providerId: this._definition?.id,
				objType,
				obj,
				state: "loading"
			} as ActionLoadingData,
			template: CLITemplate.Loading,
			templateContent: ""
		};
	}

	/**
	 * Create a result to show a contact.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param contact The contact details.
	 * @returns The contact template.
	 */
	private async createContactResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		contact: ServiceNowEntities.Core.Contact
	): Promise<CLISearchResultCustom<HomeAction>> {
		const pairs: {
			label: string;
			value?: string;
			links?: string[];
			srcs?: string[];
			wide?: boolean;
		}[] = [];

		if ((contact.company as string)?.length) {
			pairs.push({ label: "Company", value: contact.company as string });
		}

		if ((contact.title as string)?.length) {
			pairs.push({ label: "Title", value: contact.title as string });
		}

		if ((contact.department as string)?.length) {
			pairs.push({ label: "Department", value: contact.department as string });
		}

		let phone;
		let email;

		if ((contact.phone as string)?.length) {
			pairs.push({ label: "Phone", value: contact.phone as string });
			phone = contact.phone;
		}

		if ((contact.email as string)?.length) {
			pairs.push({ label: "E-mail", value: contact.email as string });
			email = contact.email;
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: ServiceNowIntegration._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		if (phone) {
			buttons.push({
				titleKey: "callTitle",
				action: ServiceNowIntegration._ACTION_PHONE_CALL,
				imageKey: "callImage",
				imageAltText: "Call"
			});
		}

		if (email) {
			buttons.push({
				titleKey: "emailTitle",
				action: ServiceNowIntegration._ACTION_EMAIL,
				imageKey: "emailImage",
				imageAltText: "E-mail"
			});
		}

		const templateContent = await this.createLayoutTemplate(
			contact.name as string,
			this._settings?.images.contact,
			[await this.createPairsLayout(templateHelpers, palette, pairs)],
			buttons,
			templateHelpers,
			palette
		);

		return {
			key: `${this._definition?.id}-${contact.sys_id}`,
			score: this.objectTypeToOrder("Contact"),
			title: contact.name as string,
			label: "Contact",
			icon: this._settings?.images.contact,
			actions: [
				{
					name: ServiceNowIntegration._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				objType: "Contact",
				obj: contact,
				url: `${this._settings?.instanceUrl}nav_to.do?uri=${ServiceNowIntegration._TABLE_NAMES.Contact}.do?sys_id=${contact.sys_id}`,
				phone,
				email
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: templateContent.layout,
				data: {
					...templateContent.data,
					...this.mapPairsToData(pairs),
					openTitle: "Open",
					openImage: this._settings?.images.servicenow ?? "",
					emailTitle: "E-mail",
					emailImage: this._settings?.images.email ?? "",
					callTitle: "Call",
					callImage: this._settings?.images.call ?? ""
				}
			}
		};
	}

	/**
	 * Create a result to show a account.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param account The account details.
	 * @returns The account template.
	 */
	private async createAccountResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		account: ServiceNowEntities.CSM.Account
	): Promise<CLISearchResultCustom<HomeAction>> {
		const pairs: {
			label: string;
			value?: string;
			links?: string[];
			srcs?: string[];
			wide?: boolean;
		}[] = [];

		if ((account.street as string)?.length) {
			pairs.push({ label: "Street", value: account.street as string });
		}

		if ((account.city as string)?.length) {
			pairs.push({ label: "City", value: account.city as string });
		}

		if ((account.zip as string)?.length) {
			pairs.push({ label: "Zip", value: account.zip as string });
		}

		if ((account.country as string)?.length) {
			pairs.push({ label: "Country", value: account.country as string });
		}

		let phone;
		let email;

		if ((account.phone as string)?.length) {
			pairs.push({ label: "Phone", value: account.phone as string });
			phone = account.phone;
		}

		if ((account.email as string)?.length) {
			pairs.push({ label: "E-mail", value: account.email as string });
			email = account.email;
		}

		if ((account.website as string)?.length) {
			pairs.push({ label: "Website", links: [account.website as string] });
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: ServiceNowIntegration._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		if (phone) {
			buttons.push({
				titleKey: "callTitle",
				action: ServiceNowIntegration._ACTION_PHONE_CALL,
				imageKey: "callImage",
				imageAltText: "Call"
			});
		}

		if (email) {
			buttons.push({
				titleKey: "emailTitle",
				action: ServiceNowIntegration._ACTION_EMAIL,
				imageKey: "emailImage",
				imageAltText: "E-mail"
			});
		}

		const templateContent = await this.createLayoutTemplate(
			account.name as string,
			this._settings?.images.contact,
			[await this.createPairsLayout(templateHelpers, palette, pairs)],
			buttons,
			templateHelpers,
			palette
		);

		return {
			key: `${this._definition?.id}-${account.sys_id}`,
			score: this.objectTypeToOrder("Account"),
			title: account.name as string,
			label: "Account",
			icon: this._settings?.images.account,
			actions: [
				{
					name: ServiceNowIntegration._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				objType: "Account",
				obj: account,
				url: `${this._settings?.instanceUrl}nav_to.do?uri=${ServiceNowIntegration._TABLE_NAMES.Account}.do?sys_id=${account.sys_id}`,
				phone,
				email
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: templateContent.layout,
				data: {
					...templateContent.data,
					...this.mapPairsToData(pairs),
					openTitle: "Open",
					openImage: this._settings?.images.servicenow ?? "",
					emailTitle: "E-mail",
					emailImage: this._settings?.images.email ?? "",
					callTitle: "Call",
					callImage: this._settings?.images.call ?? ""
				}
			}
		};
	}

	/**
	 * Create a result to show a case.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param cs The case details.
	 * @returns The case template.
	 */
	private async createCaseResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		cs: ServiceNowEntities.CSM.Case
	): Promise<CLISearchResultCustom<HomeAction>> {
		const pairs: {
			label: string;
			value?: string;
			links?: string[];
			srcs?: string[];
			wide?: boolean;
		}[] = [];

		if (
			cs.assigned_to &&
			typeof cs.assigned_to === "object" &&
			"display_value" in cs.assigned_to &&
			cs.assigned_to.display_value?.length
		) {
			pairs.push({ label: "Assigned To", value: cs.assigned_to.display_value });
		}

		if (
			cs.account &&
			typeof cs.account === "object" &&
			"display_value" in cs.account &&
			cs.account.display_value?.length
		) {
			pairs.push({ label: "Account", value: cs.account.display_value });
		}

		if ((cs.short_description as string)?.length) {
			pairs.push({ label: "Description", value: cs.short_description as string });
		}

		if ((cs.state as string)?.length) {
			pairs.push({ label: "State", value: cs.state as string });
		}

		if ((cs.priority as string)?.length) {
			pairs.push({ label: "Priority", value: cs.priority as string });
		}

		if ((cs.approval as string)?.length) {
			pairs.push({ label: "Approval", value: cs.approval as string });
		}

		if ((cs.sys_updated_on as string)?.length) {
			pairs.push({ label: "Updated On", value: this.formatDate(cs.sys_updated_on) });
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: ServiceNowIntegration._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		const templateContent = await this.createLayoutTemplate(
			cs.number as string,
			this._settings?.images.contact,
			[await this.createPairsLayout(templateHelpers, palette, pairs)],
			buttons,
			templateHelpers,
			palette
		);

		return {
			key: `${this._definition?.id}-${cs.sys_id}`,
			score: this.objectTypeToOrder("Case"),
			title: cs.number as string,
			label: "Case",
			icon: this._settings?.images.case,
			actions: [
				{
					name: ServiceNowIntegration._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				objType: "Case",
				obj: cs,
				url: `${this._settings?.instanceUrl}nav_to.do?uri=${ServiceNowIntegration._TABLE_NAMES.Case}.do?sys_id=${cs.sys_id}`
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: templateContent.layout,
				data: {
					...templateContent.data,
					...this.mapPairsToData(pairs),
					openTitle: "Open",
					openImage: this._settings?.images.servicenow ?? ""
				}
			}
		};
	}

	/**
	 * Create a result to show a task.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param task The task details.
	 * @returns The task template.
	 */
	private async createTaskResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		task: ServiceNowEntities.CSM.Task
	): Promise<CLISearchResultCustom<HomeAction>> {
		const pairs: {
			label: string;
			value?: string;
			links?: string[];
			srcs?: string[];
			wide?: boolean;
		}[] = [];

		if (
			task.assigned_to &&
			typeof task.assigned_to === "object" &&
			"display_value" in task.assigned_to &&
			task.assigned_to.display_value?.length
		) {
			pairs.push({ label: "Assigned To", value: task.assigned_to.display_value });
		}

		if (
			task.account &&
			typeof task.account === "object" &&
			"display_value" in task.account &&
			task.account.display_value?.length
		) {
			pairs.push({ label: "Account", value: task.account.display_value });
		}

		if ((task.short_description as string)?.length) {
			pairs.push({ label: "Description", value: task.short_description as string });
		}

		if ((task.state as string)?.length) {
			pairs.push({ label: "State", value: task.state as string });
		}

		if ((task.priority as string)?.length) {
			pairs.push({ label: "Priority", value: task.priority as string });
		}

		if ((task.approval as string)?.length) {
			pairs.push({ label: "Approval", value: task.approval as string });
		}

		if ((task.sys_updated_on as string)?.length) {
			pairs.push({ label: "Updated On", value: this.formatDate(task.sys_updated_on) });
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: ServiceNowIntegration._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		const templateContent = await this.createLayoutTemplate(
			task.number as string,
			this._settings?.images.contact,
			[await this.createPairsLayout(templateHelpers, palette, pairs)],
			buttons,
			templateHelpers,
			palette
		);

		return {
			key: `${this._definition?.id}-${task.sys_id}`,
			score: this.objectTypeToOrder("Task"),
			title: task.number as string,
			label: "Task",
			icon: this._settings?.images.task,
			actions: [
				{
					name: ServiceNowIntegration._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				objType: "Task",
				obj: task,
				url: `${this._settings?.instanceUrl}nav_to.do?uri=${ServiceNowIntegration._TABLE_NAMES.Task}.do?sys_id=${task.sys_id}`
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: templateContent.layout,
				data: {
					...templateContent.data,
					...this.mapPairsToData(pairs),
					openTitle: "Open",
					openImage: this._settings?.images.servicenow ?? ""
				}
			}
		};
	}

	/**
	 * Create a result to show a incident.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @param incident The incident details.
	 * @returns The incident template.
	 */
	private async createIncidentResult(
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet,
		incident: ServiceNowIncident
	): Promise<CLISearchResultCustom<HomeAction>> {
		const pairs: {
			label: string;
			value?: string;
			links?: string[];
			srcs?: string[];
			wide?: boolean;
		}[] = [];

		if (
			incident.assigned_to &&
			typeof incident.assigned_to === "object" &&
			"display_value" in incident.assigned_to &&
			incident.assigned_to.display_value?.length
		) {
			pairs.push({ label: "Assigned To", value: incident.assigned_to.display_value });
		}

		if ((incident.short_description as string)?.length) {
			pairs.push({ label: "Description", value: incident.short_description as string });
		}

		if ((incident.state as string)?.length) {
			pairs.push({ label: "State", value: incident.state as string });
		}

		if ((incident.priority as string)?.length) {
			pairs.push({ label: "Priority", value: incident.priority as string });
		}

		if ((incident.approval as string)?.length) {
			pairs.push({ label: "Approval", value: incident.approval as string });
		}

		if ((incident.sys_updated_on as string)?.length) {
			pairs.push({ label: "Updated On", value: this.formatDate(incident.sys_updated_on) });
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: ServiceNowIntegration._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		const templateContent = await this.createLayoutTemplate(
			incident.number as string,
			this._settings?.images.contact,
			[await this.createPairsLayout(templateHelpers, palette, pairs)],
			buttons,
			templateHelpers,
			palette
		);

		return {
			key: `${this._definition?.id}-${incident.sys_id}`,
			score: this.objectTypeToOrder("Incident"),
			title: incident.number as string,
			label: "Incident",
			icon: this._settings?.images.incident,
			actions: [
				{
					name: ServiceNowIntegration._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				objType: "Incident",
				obj: incident,
				url: `${this._settings?.instanceUrl}nav_to.do?uri=${ServiceNowIntegration._TABLE_NAMES.Incident}.do?sys_id=${incident.sys_id}`
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: templateContent.layout,
				data: {
					...templateContent.data,
					...this.mapPairsToData(pairs),
					openTitle: "Open",
					openImage: this._settings?.images.servicenow ?? ""
				}
			}
		};
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
	 * Create the template with a layout.
	 * @param title Title for the layout.
	 * @param icon Icon for the layout.
	 * @param bodyFragments The fragments for the content.
	 * @param buttons The buttons to display.
	 * @param templateHelpers To help with creating templates.
	 * @param palette The current palette.
	 * @returns The connect template.
	 */
	private async createLayoutTemplate(
		title: string,
		icon: string | undefined,
		bodyFragments: TemplateFragment[],
		buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[],
		templateHelpers: TemplateHelpers,
		palette: CustomPaletteSet
	): Promise<{ layout: TemplateFragment; data: CustomTemplateData }> {
		const additionalData: { [id: string]: string } = {
			title
		};

		const header: TemplateFragment[] = [];
		if (icon) {
			header.push(
				await templateHelpers.createImage("icon", "", {
					width: "16px",
					height: "16px"
				})
			);
			additionalData.icon = icon;
		}
		header.push(await templateHelpers.createTitle("title"));

		return {
			layout: await templateHelpers.createContainer(
				"column",
				[
					await templateHelpers.createContainer("row", header, {
						borderBottom: `1px solid ${palette.background6}`,
						paddingBottom: "5px",
						gap: "5px",
						alignItems: "center"
					}),
					await templateHelpers.createContainer("column", bodyFragments, {
						flex: "1",
						gap: "10px"
					}),
					await this.createButtonsLayout(templateHelpers, palette, buttons)
				],
				{
					padding: "10px",
					gap: "10px",
					flex: "1"
				}
			),
			data: additionalData
		};
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
								`${ServiceNowIntegration._ACTION_OPEN}_${pair.label}_link_${idx}`,
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
	 * Build a query for the specified field.
	 * @param query The query.
	 * @param fields The fields to search.
	 * @param retrieveFields The fields to retrieve.
	 * @param limit The max number of items.
	 * @returns The build query.
	 */
	private buildSearchQuery(query: string, fields: string[], retrieveFields: string[], limit: number): string {
		const encQuery = encodeURIComponent(query);
		const parts = [];
		for (const field of fields) {
			parts.push(`${field}LIKE${encQuery}`);
		}
		return `sysparm_query=${parts.join(
			"^OR"
		)}^ORDERBYDESCsys_updated_on&sysparm_limit=${limit}&sysparm_fields=${retrieveFields.join(",")}`;
	}

	/**
	 * Convert the object type to a value for ordering.
	 * @param objType The object type.
	 * @returns The ordering number.
	 */
	private objectTypeToOrder(objType: ServiceNowObjectTypes): number {
		const objTypeOrder: { [key in ServiceNowObjectTypes]: number } = {
			Contact: 100,
			Account: 200,
			Case: 300,
			Task: 400,
			Incident: 500
		};
		return (this._definition?.baseScore ?? ServiceNowIntegration._DEFAULT_BASE_SCORE) + objTypeOrder[objType];
	}

	/**
	 * Format an error to a readable string.
	 * @param err The error to format.
	 * @returns The formatted error.
	 */
	private formatError(err: unknown): string {
		if (err instanceof Error) {
			return err.message;
		} else if (typeof err === "string") {
			return err;
		}
		return JSON.stringify(err);
	}

	/**
	 * Format a date.
	 * @param date The date to format.
	 * @returns The formatted date.
	 */
	private formatDate(date: unknown): string {
		if (typeof date === "string") {
			return new Date(date).toLocaleString();
		}
		return "";
	}
}
