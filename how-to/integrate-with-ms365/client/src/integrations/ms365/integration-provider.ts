import type { Contact as Fdc3Contact, Context as FDC3Context } from "@finos/fdc3";
import type {
	AadUserConversationMember,
	Channel,
	ChatMessage,
	Contact,
	Entity,
	Event,
	DriveItem,
	Message,
	Presence,
	SearchResponse,
	Team,
	User
} from "@microsoft/microsoft-graph-types";
import {
	connect,
	enableLogging,
	GraphResponse,
	TeamsConnection,
	type Microsoft365Connection
} from "@openfin/microsoft365";
import {
	ButtonStyle,
	CLIFilter,
	CLITemplate,
	HomeDispatchedSearchResult,
	HomeSearchListenerResponse,
	HomeSearchResponse,
	HomeSearchResult,
	TemplateFragment,
	TemplateFragmentTypes
} from "@openfin/workspace";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import type { IntegrationHelpers, IntegrationModule } from "../../shapes/integrations-shapes";
import type { Logger, LoggerCreator } from "../../shapes/logger-shapes";
import type { ModuleDefinition } from "../../shapes/module-shapes";
import type {
	ActionData,
	ActionLoadingData,
	GraphBatchRequest,
	GraphBatchResponse,
	GraphBatchResponseItem,
	GraphListResponse,
	Microsoft365ObjectTypes,
	Microsoft365Settings
} from "./shapes";

/**
 * Implement the integration provider for microsoft 365 results.
 */
export class Microsoft365Provider implements IntegrationModule<Microsoft365Settings> {
	/**
	 * The key to use for a call key action.
	 * @internal
	 */
	private static readonly _ACTION_TEAMS_CALL = "Teams Call";

	/**
	 * The key to use for a outlook email key action.
	 * @internal
	 */
	private static readonly _ACTION_OUTLOOK_EMAIL = "Outlook Email";

	/**
	 * The key to use for a teams meeting key action.
	 * @internal
	 */
	private static readonly _ACTION_TEAMS_MEETING = "Teams Meeting";

	/**
	 * The key to use for a outlook event key action.
	 * @internal
	 */
	private static readonly _ACTION_OUTLOOK_EVENT = "Outlook Event";

	/**
	 * The key to use for a chat key action.
	 * @internal
	 */
	private static readonly _ACTION_TEAMS_CHAT = "Teams Chat";

	/**
	 * The key to use for a call key action.
	 * @internal
	 */
	private static readonly _ACTION_PHONE_CALL = "Call";

	/**
	 * The key to use for an open key action.
	 * @internal
	 */
	private static readonly _ACTION_OPEN = "Open";

	/**
	 * The key to use for an share contact.
	 * @internal
	 */
	private static readonly _ACTION_SHARE_CONTACT = "Share Contact";

	/**
	 * The key to use for a copy key action.
	 * @internal
	 */
	private static readonly _ACTION_COPY = "Copy JSON to Clipboard";

	/**
	 * The key to use for a connect key action.
	 * @internal
	 */
	private static readonly _ACTION_CONNECT = "Connect";

	/**
	 * The key for the ms 365 filters.
	 * @internal
	 */
	private static readonly _MS365_FILTERS = "MS365";

	/**
	 * The url for teams.
	 * @internal
	 */
	private static readonly _TEAMS_URL = "https://teams.microsoft.com/";

	/**
	 * The protocol for teams.
	 * @internal
	 */
	private static readonly _TEAMS_PROTOCOL = "msteams:";

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _logger: Logger;

	/**
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The module definition.
	 * @internal
	 */
	private _moduleDefinition: ModuleDefinition<Microsoft365Settings>;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _settings: Microsoft365Settings | undefined;

	/**
	 * The Microsoft 365 connection.
	 */
	private _ms365Connection?: Microsoft365Connection;

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
	 * Maintain a cache of the profile images.
	 */
	private readonly _profileImageCache: {
		[id: string]: {
			added: number;
			data: string;
		};
	};

	/**
	 * Maintain a cache of the users teams and channels.
	 */
	private _teamsAndChannelsCache: { team: Team; channels: Channel[] }[];

	/**
	 * The cache cleanup timer id.
	 */
	private _cacheIntervalId?: number;

	/**
	 * The cache counter.
	 */
	private _cacheCounter: number;

	/**
	 * Create a new instance of Microsoft365Provider.
	 */
	constructor() {
		this._profileImageCache = {};
		this._teamsAndChannelsCache = [];
		this._cacheCounter = 0;
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<Microsoft365Settings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._moduleDefinition = definition;
		this._settings = definition.data;
		this._integrationHelpers = helpers;

		this._moduleDefinition.title = this._moduleDefinition.title ?? "Microsoft 365";
		this._settings.graphExplorerPrefix = this._settings.graphExplorerPrefix ?? "ms";

		this._logger = loggerCreator(this._moduleDefinition.title);
		this._logger.info(`Initializing ${this._moduleDefinition.title}`);

		if (!this._settings.clientId) {
			this._logger.error("Configuration is missing clientId");
			return;
		}

		if (!this._settings.tenantId) {
			this._logger.error("Configuration is missing tenantId");
			return;
		}

		await this.connectProvider();

		// For themed icons we fetch the svg content so that we can replace colors
		// when they are used, instead of linking directly to the source
		const themedIcons = [
			"calendar",
			"call",
			"channel",
			"chat",
			"contact",
			"email",
			"share",
			"team",
			"file",
			"folder"
		];
		for (const themedIcon of themedIcons) {
			const response = await fetch(this._settings.images[themedIcon]);
			const svg = await response.text();
			this._settings.images[themedIcon] = this.svgToInline(svg);
		}

		this._cacheIntervalId = window.setInterval(async () => this.updateCache(), 30000);
		window.setTimeout(async () => {
			await this.updateCache();
		}, 0);
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		if (this._ms365Connection) {
			this._logger.info("Disconnecting from MS Graph API");
			await this._ms365Connection.disconnect();
			this._ms365Connection = undefined;
		}
		if (this._cacheIntervalId) {
			window.clearInterval(this._cacheIntervalId);
			this._cacheIntervalId = undefined;
		}
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		const additionalDescription: string[] = [];
		const additionalHelp: string[] = [];

		if (!this._settings.disableGraphExplorer) {
			additionalDescription.push(
				`You can also specify a query as a graph explorer path and parameters, by using the /${this._settings.graphExplorerPrefix} prefix`
			);
			additionalHelp.push(
				`/${this._settings.graphExplorerPrefix}/me`,
				`/${this._settings.graphExplorerPrefix}/users?$filter=startsWith(displayName,'john')`
			);
		}

		return [
			{
				key: `${this._moduleDefinition.id}-help1`,
				title: this._moduleDefinition.title,
				label: "Help",
				icon: this._settings.images.microsoft365,
				actions: [],
				data: {
					providerId: this._moduleDefinition.id
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"Microsoft 365",
					[
						"The Microsoft 365 integration can be used to search multiple data source in your platform.",
						"Using a freeform query will search the content of Users, Contacts, E-mail, Events, Chat Messages, Teams and Channels"
					].concat(additionalDescription),
					additionalHelp
				)
			},
			{
				key: `${this._moduleDefinition.id}-help2`,
				title: `${this._moduleDefinition.title} Recent`,
				label: "Help",
				icon: this._settings.images.microsoft365,
				actions: [],
				data: {
					providerId: this._moduleDefinition.id,
					populateQuery: "/recent"
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"Microsoft 365 Recent",
					["Running this command will retrieve the most recent files from MS365"],
					["/recent"]
				)
			}
		];
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
		lastResponse: HomeSearchListenerResponse,
		options?: {
			queryMinLength: number;
			queryAgainst: string[];
		}
	): Promise<HomeSearchResponse> {
		if (!this._ms365Connection) {
			this._connectLastResponse = lastResponse;
			const results = [];
			if (this._connectionError) {
				results.push(await this.createConnectResult());
			}
			return {
				results
			};
		}

		if (this._debounceTimerId) {
			window.clearTimeout(this._debounceTimerId);
			this._debounceTimerId = undefined;
		}

		const isRecent = query === "/recent";
		const defaultFilters: Microsoft365ObjectTypes[] = isRecent
			? ["File"]
			: ["User", "Contact", "Event", "Message", "Channel", "Team", "ChatMessage", "File"];

		const minLength = options?.queryMinLength ?? 3;

		this._debounceTimerId = window.setTimeout(async () => {
			try {
				// If query starts with ms just do a passthrough to the graph API
				if (
					!this._settings.disableGraphExplorer &&
					query.startsWith(`/${this._settings.graphExplorerPrefix}/`)
				) {
					const path = query.replace(`/${this._settings.graphExplorerPrefix}/`, "");
					if (path.length > 0) {
						const fullPath = `/v1.0/${path}`;

						this._logger.info("Graph API Request", fullPath);

						const response = await this._ms365Connection.executeApiRequest(fullPath);
						lastResponse.respond([this.createGraphJsonResult(response)]);
					}
				} else if (isRecent || (query.length >= minLength && !query.startsWith("/"))) {
					const ms365Filter = filters?.find((f) => f.id === Microsoft365Provider._MS365_FILTERS);

					let includeOptions: Microsoft365ObjectTypes[] = [...defaultFilters];

					if (Array.isArray(ms365Filter?.options)) {
						includeOptions = ms365Filter.options
							.filter((o) => o.isSelected)
							.map((o) => o.value as Microsoft365ObjectTypes);
					}

					const palette = await this._integrationHelpers.getCurrentPalette();

					const batchRequests: GraphBatchRequest[] = [];

					if (includeOptions.includes("User")) {
						const userSearchFields: (keyof User)[] = [
							"displayName",
							"givenName",
							"surname",
							"department",
							"jobTitle",
							"mobilePhone"
						];
						const userSearchQuery = userSearchFields.map((s) => `"${s}:${query}"`).join(" OR ");

						batchRequests.push({
							id: "User",
							method: "GET",
							url: `/users?$search=${encodeURIComponent(userSearchQuery)}&$top=10`,
							headers: {
								ConsistencyLevel: "eventual"
							}
						});
					}
					if (includeOptions.includes("Contact")) {
						const contactSearchQuery = `"${query}"`;
						batchRequests.push({
							id: "Contact",
							method: "GET",
							url: `/me/contacts?$search=${encodeURIComponent(contactSearchQuery)}&$top=10`
						});
					}
					if (includeOptions.includes("Message")) {
						const messageSearchQuery = `"${query}"`;
						batchRequests.push({
							id: "Message",
							method: "GET",
							url: `/me/messages?$select=sender,subject,bodyPreview,receivedDateTime,webLink&$search=${encodeURIComponent(
								messageSearchQuery
							)}&$top=10`
						});
					}
					if (includeOptions.includes("Event")) {
						batchRequests.push({
							id: "Event",
							url: "/search/query",
							method: "POST",
							body: {
								requests: [
									{
										entityTypes: ["event"],
										query: {
											queryString: query
										},
										from: 0,
										size: 10
									}
								]
							},
							headers: {
								"Content-Type": "application/json"
							}
						});
					}
					if (includeOptions.includes("ChatMessage")) {
						batchRequests.push({
							id: "ChatMessage",
							url: "/search/query",
							method: "POST",
							body: {
								requests: [
									{
										entityTypes: ["chatMessage"],
										query: {
											queryString: query
										},
										from: 0,
										size: 10
									}
								]
							},
							headers: {
								"Content-Type": "application/json"
							}
						});
					}

					if (includeOptions.includes("File")) {
						const fileSearchQuery = `'${query}'`;
						batchRequests.push({
							id: "File",
							url: isRecent
								? "/me/drive/recent"
								: `/me/drive/root/search(q=${encodeURIComponent(
										fileSearchQuery
								  )})?$top=10&$orderby=lastModifiedDateTime desc&$expand=thumbnails`,
							method: "GET"
						});
					}

					const homeResults = await this.sendBatchQuery(query, includeOptions, batchRequests);

					if (includeOptions.includes("Team") || includeOptions.includes("Channel")) {
						const lowerQuery = query.toLowerCase();

						for (const teamAndChannels of this._teamsAndChannelsCache) {
							if (
								includeOptions.includes("Team") &&
								(teamAndChannels.team.displayName?.toLowerCase().includes(lowerQuery) ||
									teamAndChannels.team.description?.toLowerCase().includes(lowerQuery))
							) {
								homeResults.push(
									this.createLoadingResult(teamAndChannels.team, "displayName", "Team", palette)
								);
							}
							if (includeOptions.includes("Channel")) {
								for (const channel of teamAndChannels.channels) {
									if (
										channel.displayName?.toLowerCase().includes(lowerQuery) ||
										channel.description?.toLowerCase().includes(lowerQuery)
									) {
										homeResults.push(
											this.createLoadingResult(
												{
													...channel,
													team: teamAndChannels.team
												},
												"displayName",
												"Channel",
												palette
											)
										);
									}
								}
							}
						}
					}

					lastResponse.respond(homeResults);
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : err;
				lastResponse.respond([this.createGraphJsonResult({ status: 400, data: message })]);
			}
			lastResponse.revoke(`${this._moduleDefinition.id}-searching`);
		}, 500);

		return {
			results: query.length >= minLength ? [this.createSearchingResult()] : [],
			context: {
				filters: [
					{
						id: Microsoft365Provider._MS365_FILTERS as string,
						title: "Microsoft 365",
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
			if (result.data?.state === "loading" && this._ms365Connection) {
				const actionData = result.data as ActionLoadingData;
				const objType = actionData.objType as Microsoft365ObjectTypes;

				const resultHandlers: { [key in Microsoft365ObjectTypes]?: () => Promise<HomeSearchResult> } = {
					User: async () => this.createUserResult(actionData.obj as User),
					Contact: async () => this.createContactResult(actionData.obj as Contact),
					Message: async () => this.createMessageResult(actionData.obj as Message),
					Event: async () => this.createEventResult(actionData.obj as Event),
					ChatMessage: async () => this.createChatMessageResult(actionData.obj as ChatMessage),
					Channel: async () => this.createChannelResult(actionData.obj as Channel & { team: Team }),
					Team: async () => this.createTeamResult(actionData.obj as Team),
					File: async () => this.createFileResult(actionData.obj as DriveItem)
				};

				if (resultHandlers[objType]) {
					lastResponse.respond([await resultHandlers[objType]()]);
				}
			}
			return true;
		} else if (result.action.trigger === "user-action") {
			return this.handleAction(result.action.name, result.data as ActionData, lastResponse);
		}

		return false;
	}

	private async connectProvider() {
		try {
			this._logger.info("Connecting to MS Graph API", {
				clientId: this._settings.clientId,
				tenantId: this._settings.tenantId,
				redirectUri: this._settings.redirectUri
			});

			if (this._settings.enableLibLogging) {
				enableLogging();
			}

			this._connectionError = undefined;
			this._ms365Connection = await connect(
				this._settings.clientId,
				this._settings.tenantId,
				this._settings.redirectUri,
				this._settings.permissions
			);
			if (this._connectLastResponse) {
				this._connectLastResponse.revoke(`${this._moduleDefinition.id}-connect`);
				this._connectLastResponse = undefined;
			}
		} catch (err) {
			this._ms365Connection = undefined;
			this._connectionError = err instanceof Error ? err.message : err;
			this._logger.error("Connecting to MS Graph API failed", err);
			if (this._connectLastResponse) {
				this._connectLastResponse.respond([await this.createConnectResult()]);
			}
		}
	}

	private async handleAction(
		actionName: string,
		actionData: ActionData,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		switch (actionName) {
			case Microsoft365Provider._ACTION_CONNECT:
				lastResponse.revoke(`${this._moduleDefinition.id}-connect`);
				await this.connectProvider();
				return true;
			case Microsoft365Provider._ACTION_TEAMS_CALL:
				return this.handleTeamsCall(actionData);
			case Microsoft365Provider._ACTION_TEAMS_MEETING:
				return this.handleTeamsMeeting(actionData);
			case Microsoft365Provider._ACTION_TEAMS_CHAT:
				return this.handleTeamsChat(actionData);
			case Microsoft365Provider._ACTION_OUTLOOK_EMAIL:
				return this.handleOutlookMail(actionData);
			case Microsoft365Provider._ACTION_OUTLOOK_EVENT:
				return this.handleOutlookEvent(actionData);
			case Microsoft365Provider._ACTION_PHONE_CALL:
				return this.handlePhoneCall(actionData);
			case Microsoft365Provider._ACTION_SHARE_CONTACT:
				return this.handleShareContact(actionData);
			case Microsoft365Provider._ACTION_COPY:
				return this.handleCopy(actionData);
			default:
				if (actionName.startsWith(Microsoft365Provider._ACTION_OPEN)) {
					return this.handleOpen(actionName, actionData);
				}
				return false;
		}
	}

	private async handleTeamsCall(actionData: ActionData) {
		this._logger.info("Teams Call", actionData.emails);
		const teamsConnection = new TeamsConnection(this._ms365Connection);
		await teamsConnection.startCall(actionData.emails);
		return true;
	}

	private async handleTeamsMeeting(actionData: ActionData) {
		this._logger.info("Teams Meeting", this._ms365Connection.currentUser.mail, actionData.emails);
		await fin.System.openUrlWithBrowser(
			`${Microsoft365Provider._TEAMS_PROTOCOL}/l/meeting/new?attendees=${
				this._ms365Connection.currentUser.mail
			},${actionData.emails.join(",")}`
		);
		return true;
	}

	private async handleTeamsChat(actionData: ActionData) {
		this._logger.info(
			"Teams Chat",
			this._ms365Connection.currentUser.mail,
			actionData.teamId,
			actionData.channelId,
			actionData.emails
		);
		const teamsConnection = new TeamsConnection(this._ms365Connection);

		if (actionData.chatId && actionData.messageId) {
			await fin.System.openUrlWithBrowser(
				`${Microsoft365Provider._TEAMS_PROTOCOL}/l/message/${actionData.chatId}/${actionData.messageId}`
			);
		} else if (actionData.teamId) {
			await teamsConnection.startChat({ teamId: actionData.teamId, channelId: actionData.channelId });
		} else {
			await teamsConnection.startChat({
				emailAddresses: [this._ms365Connection.currentUser.mail, ...actionData.emails]
			});
		}
		return true;
	}

	private async handleOutlookMail(actionData: ActionData) {
		this._logger.info("Open Outlook Mail", actionData.emails);

		const response = await this._ms365Connection.executeApiRequest<Message>("/v1.0/me/messages", "POST", {
			toRecipients: actionData.emails.map((e) => ({
				emailAddress: {
					address: e
				}
			}))
		});

		await this._integrationHelpers.launchView(response.data.webLink);

		return true;
	}

	private async handleOutlookEvent(actionData: ActionData) {
		this._logger.info("Open Outlook Event", actionData.emails);

		const response = await this._ms365Connection.executeApiRequest<Event>("/v1.0/me/events", "POST", {
			attendees: actionData.emails.map((e) => ({
				emailAddress: {
					address: e
				}
			}))
		});

		await this._integrationHelpers.launchView(response.data.webLink);

		return true;
	}

	private async handlePhoneCall(actionData: ActionData) {
		this._logger.info("Phone Call", actionData.phone);
		await fin.System.openUrlWithBrowser(`tel:${actionData.phone}`);
		return true;
	}

	private async handleOpen(actionName: string, actionData: ActionData) {
		const linkIndex = actionName.indexOf("_");
		const u = linkIndex < 0 ? actionData.url : actionData.urls[actionName.slice(linkIndex + 1)];

		this._logger.info("Open", u);

		if (u.startsWith(Microsoft365Provider._TEAMS_URL)) {
			await fin.System.openUrlWithBrowser(
				u.replace(Microsoft365Provider._TEAMS_URL, Microsoft365Provider._TEAMS_PROTOCOL)
			);
		} else {
			await this._integrationHelpers.launchView(u);
		}
		return true;
	}

	private async handleShareContact(actionData: ActionData) {
		const fdc3Contact: Fdc3Contact = {
			type: "fdc3.contact",
			name: actionData.name,
			id: {
				email: actionData.emails[0]
			}
		};
		this._logger.info("Share Contact", fdc3Contact);
		await window.fdc3.raiseIntent("ViewContact", fdc3Contact as FDC3Context);
		return true;
	}

	private async handleCopy(actionData: ActionData) {
		this._logger.info("Copy JSON", actionData.json);
		await fin.Clipboard.writeText({ data: JSON.stringify(actionData.json, undefined, "\t") });
		return true;
	}

	private async sendBatchQuery(
		query: string,
		includeOptions: Microsoft365ObjectTypes[],
		batchRequests: GraphBatchRequest[]
	): Promise<HomeSearchResult[]> {
		let homeResults: HomeSearchResult[] = [];

		this._logger.info("Graph API Batch Request", batchRequests);

		try {
			const batchResponses = await this._ms365Connection.executeApiRequest<GraphBatchResponse>(
				"/v1.0/$batch",
				"POST",
				{
					requests: batchRequests
				}
			);

			if (Array.isArray(batchResponses.data?.responses)) {
				for (const batchResponse of batchResponses.data.responses) {
					if (batchResponse.status === 200) {
						this._logger.info(`${batchResponse.id} Response`, batchResponse.body);

						homeResults = await this.handleBatchQuery(query, includeOptions, batchResponse, homeResults);
					} else {
						this._logger.error(
							`${batchResponse.id} Response Failed`,
							batchResponse.status,
							batchResponse.body
						);
					}
				}
			}
		} catch (err) {
			this._logger.error("Batch Response Failed", err);
		}

		return homeResults;
	}

	private async handleBatchQuery(
		query: string,
		includeOptions: Microsoft365ObjectTypes[],
		batchResponse: GraphBatchResponseItem,
		homeResults: HomeSearchResult[]
	): Promise<HomeSearchResult[]> {
		const type = batchResponse.id.split("-")[0] as Microsoft365ObjectTypes;

		if (includeOptions.includes(type)) {
			const palette = await this._integrationHelpers.getCurrentPalette();

			if (type === "User") {
				const users = (batchResponse.body as GraphListResponse<User>).value;

				if (users.length > 0) {
					homeResults = homeResults.concat(
						users.map((u) => this.createLoadingResult(u, "displayName", "User", palette))
					);
				}
			} else if (type === "Contact") {
				const contacts = (batchResponse.body as GraphListResponse<Contact>).value;
				if (contacts.length > 0) {
					homeResults = homeResults.concat(
						contacts.map((c) => this.createLoadingResult(c, "displayName", "Contact", palette))
					);
				}
			} else if (type === "Message") {
				const messages = (batchResponse.body as GraphListResponse<Message>).value;
				if (messages.length > 0) {
					homeResults = homeResults.concat(
						messages
							.filter(
								(m) =>
									m.subject && !m.subject.startsWith("Canceled") && !m.subject.startsWith("Undeliverable")
							)
							.map((m) => this.createLoadingResult(m, "subject", "Message", palette))
					);
				}
			} else if (type === "Event") {
				const graphResponse = batchResponse.body as GraphListResponse<SearchResponse>;
				const searchResponse = graphResponse?.value?.[0];
				const events = searchResponse?.hitsContainers?.[0]?.hits;
				if (events?.length) {
					homeResults = homeResults.concat(
						events
							.filter((e) => (e.resource as Event).subject)
							.map((e) =>
								this.createLoadingResult(
									{
										id: this.base64IdToUrl(e.hitId),
										...e.resource
									} as Event,
									"subject",
									"Event",
									palette
								)
							)
					);
				}
			} else if (type === "ChatMessage") {
				const graphResponse = batchResponse.body as GraphListResponse<SearchResponse>;
				const searchResponse = graphResponse?.value?.[0];
				const chatMessages = searchResponse?.hitsContainers?.[0]?.hits;
				if (chatMessages?.length) {
					homeResults = homeResults.concat(
						chatMessages.map((e) =>
							this.createLoadingResult(
								{
									id: this.base64IdToUrl(e.hitId),
									...e.resource,
									summary: e.summary
								} as ChatMessage,
								"summary",
								"ChatMessage",
								palette
							)
						)
					);
				}
			} else if (type === "File") {
				const files = (batchResponse.body as GraphListResponse<DriveItem>).value;
				if (files.length > 0) {
					homeResults = homeResults.concat(
						files.map((c) => this.createLoadingResult(c, "name", "File", palette))
					);
				}
			}
		}

		return homeResults;
	}

	private async createConnectResult(): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const layout = await this._integrationHelpers.templateHelpers.createContainer(
			"column",
			[
				await this._integrationHelpers.templateHelpers.createContainer(
					"row",
					[await this._integrationHelpers.templateHelpers.createText("title", 14, { fontWeight: "bold" })],
					{
						paddingBottom: "10px",
						borderBottom: `1px solid ${palette.background6}`,
						gap: "10px"
					}
				),
				await this._integrationHelpers.templateHelpers.createText("description", 12),
				await this._integrationHelpers.templateHelpers.createText("error", 12, {
					fontFamily: "monospace",
					flex: 1
				}),
				await this._integrationHelpers.templateHelpers.createButton(
					ButtonStyle.Primary,
					"connect",
					Microsoft365Provider._ACTION_CONNECT
				)
			],
			{
				padding: "10px",
				gap: "15px",
				flex: "1"
			}
		);

		return {
			key: `${this._moduleDefinition.id}-connect`,
			title: this._moduleDefinition.title,
			label: "Connect",
			icon: this._settings.images.microsoft365,
			actions: [
				{
					name: Microsoft365Provider._ACTION_CONNECT,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout,
				data: {
					title: `${this._moduleDefinition.title} Connection`,
					description: `${this._moduleDefinition.title} failed to connect due to the following error`,
					error: this._connectionError,
					connect: "Connect"
				}
			}
		};
	}

	private createSearchingResult(): HomeSearchResult {
		return {
			key: `${this._moduleDefinition.id}-searching`,
			title: "Searching ...",
			icon: this._settings.images.microsoft365,
			actions: [],
			data: {
				providerId: this._moduleDefinition.id
			} as ActionData,
			template: CLITemplate.Loading,
			templateContent: undefined
		};
	}

	private createGraphJsonResult(response: GraphResponse): HomeSearchResult {
		return {
			key: `${this._moduleDefinition.id}-rest`,
			title: "Graph Result",
			label: response.status === 200 ? "JSON" : "Error",
			icon: this._settings.images.microsoft365,
			actions: [
				{
					name: Microsoft365Provider._ACTION_COPY,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				json: response.data
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: {
					type: TemplateFragmentTypes.Text,
					dataKey: "json",
					style: {
						fontSize: "12px",
						fontFamily: "monospace",
						color: response.status === 200 ? "white" : "red",
						whiteSpace: "pre",
						overflow: "auto",
						flex: 1
					}
				},
				data: {
					json: JSON.stringify(response.data, undefined, "  ")
				}
			}
		};
	}

	private createLoadingResult<T extends Entity>(
		obj: T,
		title: keyof T,
		objType: Microsoft365ObjectTypes,
		palette: CustomPaletteSet
	): HomeSearchResult {
		const icons = {
			User: "teams",
			Contact: "contact",
			Message: "email",
			Event: "calendar",
			Channel: "channel",
			Team: "team",
			ChatMessage: "chat",
			File: "file"
		};

		let label = objType.split(/(?=[A-Z])/).join(" ");
		let mimeIcon;
		if (objType === "File") {
			mimeIcon = this.getMimeIcon(obj as DriveItem, palette);
			if (this.driveItemIsFolder(obj)) {
				label = "Folder";
			} else if (this.driveItemIsImage(obj)) {
				label = "Image";
			}
		}

		return {
			key: `${this._moduleDefinition.id}-${obj.id}`,
			score: this.objectTypeToOrder(objType),
			title: (obj[title] as unknown as string) ?? `Untitled ${objType}`,
			label,
			icon: mimeIcon ?? this.getThemedIcon(icons[objType], palette),
			actions: [],
			data: {
				providerId: this._moduleDefinition.id,
				objType,
				obj,
				state: "loading"
			} as ActionLoadingData,
			template: CLITemplate.Loading,
			templateContent: undefined
		};
	}

	private async createUserResult(user: User): Promise<HomeSearchResult> {
		let picData: string | undefined;
		let presence: Presence | undefined;
		let availableColor: "red" | "green" | "orange" = "red";
		let availableIcon: string = this._settings.images.cross;
		let availability: string = "Unknown";
		let teams = [];

		const batchRequests: string[] = [];

		batchRequests.push(`/users/${user.id}/presence`, `/users/${user.id}/memberOf`);

		if (this._profileImageCache[user.id]) {
			picData = this._profileImageCache[user.id].data;
		} else {
			batchRequests.push(`/users/${user.id}/photo/$value`);
		}

		try {
			this._logger.info("Graph API Batch Request", batchRequests);

			const response = await this._ms365Connection.executeApiRequest<GraphBatchResponse>(
				"/v1.0/$batch",
				"POST",
				{
					requests: batchRequests.map((r, idx) => ({
						id: (idx + 1).toString(),
						method: "GET",
						url: r
					}))
				}
			);

			const presenceResponse = response.data?.responses.find((r) => r.id === "1");
			if (presenceResponse?.status === 200) {
				presence = presenceResponse.body as Presence;

				// Availability is in Pascal case, so split on capitals and join with space
				availability = presence?.availability.split(/(?=[A-Z])/).join(" ");

				if (presence?.availability === "Available") {
					availableColor = "green";
					availableIcon = this._settings.images.check;
				} else if (presence?.availability === "Away" || presence?.availability === "BeRightBack") {
					availableColor = "orange";
					availableIcon = this._settings.images.clock;
				}
			} else {
				this._logger.error("Failed getting user presence", presenceResponse.status, presenceResponse.body);
			}

			const teamsResponse = response.data?.responses.find((r) => r.id === "2");
			if (teamsResponse?.status === 200) {
				const memberOf = (
					teamsResponse.body as GraphListResponse<
						Team & {
							"@odata.type": string;
						}
					>
				).value;
				const excludeGroups = ["All Users"];
				const teamsMember = memberOf.filter(
					(m) => m["@odata.type"] === "#microsoft.graph.group" && !excludeGroups.includes(m.displayName)
				);
				teams = teamsMember.map((t) => t.displayName);
			} else {
				this._logger.error("Failed getting user teams", teamsResponse.status, teamsResponse.body);
			}

			const profileResponse = response.data?.responses.find((r) => r.id === "3");
			if (profileResponse) {
				if (profileResponse?.status === 200) {
					picData = `data:image/jpeg;base64,${profileResponse.body as string}`;
					this._profileImageCache[user.id] = {
						data: picData,
						added: Date.now()
					};
				} else {
					// If the request failed the JSON error is still base64 encoded
					this._logger.error(
						"Failed getting user profile pic",
						profileResponse.status,
						atob(profileResponse.body as string)
					);
				}
			}
		} catch (err) {
			this._logger.error("Failed performing API batch request", err);
		}

		const palette = await this._integrationHelpers.getCurrentPalette();

		const pairs: { label: string; value: string }[] = [];

		if (user.jobTitle) {
			pairs.push({ label: "Title", value: user.jobTitle });
		}

		if (user.department) {
			pairs.push({ label: "Department", value: user.department });
		}

		if (user.mail) {
			pairs.push({ label: "E-mail", value: user.mail });
		}

		let phone;
		if (user.mobilePhone) {
			pairs.push({ label: "Cell", value: user.mobilePhone });
			phone = user.mobilePhone;
		}

		if (user.businessPhones?.length) {
			pairs.push({ label: "Business", value: user.businessPhones[0] });
			phone = phone ?? user.businessPhones[0];
		}
		if (teams.length > 0) {
			pairs.push({ label: "Teams", value: teams.join(", ") });
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "callTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CALL,
				imageKey: "callImage",
				imageAltText: "Teams Call"
			},
			{
				titleKey: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				imageKey: "emailImage",
				imageAltText: "E-mail"
			},
			{
				titleKey: "meetingTitle",
				action: Microsoft365Provider._ACTION_TEAMS_MEETING,
				imageKey: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				titleKey: "chatTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				imageKey: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${this._moduleDefinition.id}-${user.id}`,
			score: this.objectTypeToOrder("User"),
			title: user.displayName,
			label: "User",
			icon: this.getThemedIcon("teams", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "User",
				obj: user,
				emails: [user.mail],
				phone,
				name: user.displayName
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createImage("picData", user.displayName, {
									width: "44px",
									height: "44px",
									objectFit: "cover",
									borderRadius: "50%"
								}),
								await this._integrationHelpers.templateHelpers.createImage("status", availability, {
									width: "16px",
									height: "16px",
									backgroundColor: availableColor,
									borderRadius: "50%",
									border: "2px solid white",
									padding: "2px",
									position: "relative",
									left: "-12px",
									top: "32px"
								}),
								await this._integrationHelpers.templateHelpers.createContainer("column", [
									await this._integrationHelpers.templateHelpers.createText("displayName", 14, {
										fontWeight: "bold"
									}),
									await this._integrationHelpers.templateHelpers.createText("availability", 12, {})
								])
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					picData: picData ?? this.getThemedIcon("contact", palette),
					status: availableIcon,
					displayName: user.displayName,
					availability,
					...this.mapPairsToData(pairs),
					callTitle: "Teams Call",
					callImage: this.getThemedIcon("teams", palette),
					emailTitle: "Outlook E-mail",
					emailImage: this.getThemedIcon("email", palette),
					meetingTitle: "Teams Meeting",
					meetingImage: this.getThemedIcon("calendar", palette),
					chatTitle: "Teams Chat",
					chatImage: this.getThemedIcon("chat", palette)
				}
			}
		};
	}

	private async createContactResult(contact: Contact): Promise<HomeSearchResult> {
		let picData: string;

		try {
			if (this._profileImageCache[contact.id]) {
				picData = this._profileImageCache[contact.id].data;
			} else {
				const batchRequests: string[] = [`/me/contacts/${contact.id}/photo/$value`];

				this._logger.info("Graph API Batch Request", {
					photo: batchRequests[0]
				});

				const response = await this._ms365Connection.executeApiRequest<GraphBatchResponse>(
					"/v1.0/$batch",
					"POST",
					{
						requests: batchRequests.map((r, idx) => ({
							id: (idx + 1).toString(),
							method: "GET",
							url: r
						}))
					}
				);

				const profileResponse = response.data?.responses.find((r) => r.id === "1");
				if (profileResponse?.status === 200) {
					picData = `data:image/jpeg;base64,${profileResponse.body as string}`;
					this._profileImageCache[contact.id] = {
						data: picData,
						added: Date.now()
					};
				} else {
					// If the request failed the JSON error is still base64 encoded
					this._logger.error(
						"Failed getting contact profile pic",
						profileResponse.status,
						atob(profileResponse.body as string)
					);
				}
			}
		} catch (err) {
			this._logger.error("Failed performing API batch request", err);
		}

		const palette = await this._integrationHelpers.getCurrentPalette();

		const pairs: { label: string; value: string }[] = [];

		if (contact.companyName) {
			pairs.push({ label: "Company", value: contact.companyName });
		}

		if (contact.jobTitle) {
			pairs.push({ label: "Title", value: contact.jobTitle });
		}

		if (contact.department) {
			pairs.push({ label: "Department", value: contact.department });
		}

		let phone;
		let email;

		if (contact.mobilePhone) {
			pairs.push({ label: "Cell", value: contact.mobilePhone });
			phone = contact.mobilePhone;
		}

		if (contact.businessPhones?.length) {
			pairs.push({ label: "Business", value: contact.businessPhones[0] });
			phone = phone ?? contact.businessPhones[0];
		}

		if (contact.emailAddresses?.length) {
			for (const e of contact.emailAddresses) {
				if (e.address?.length) {
					pairs.push({ label: "E-mail", value: e.address });
					email = email ?? e.address;
					break;
				}
			}
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [];

		if (phone) {
			buttons.push({
				titleKey: "callTitle",
				action: Microsoft365Provider._ACTION_PHONE_CALL,
				imageKey: "callImage",
				imageAltText: "Call"
			});
		}

		if (email) {
			buttons.push({
				titleKey: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				imageKey: "emailImage",
				imageAltText: "E-mail"
			});
			buttons.push({
				titleKey: "calendarTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EVENT,
				imageKey: "calendarImage",
				imageAltText: "Calendar"
			});
		}

		return {
			key: `${this._moduleDefinition.id}-${contact.id}`,
			score: this.objectTypeToOrder("Contact"),
			title: contact.displayName,
			label: "Contact",
			icon: this.getThemedIcon("contact", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_PHONE_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "Contact",
				obj: contact,
				emails: [email],
				phone,
				name: contact.displayName
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createImage("picData", contact.displayName, {
									width: "44px",
									height: "44px",
									objectFit: "cover",
									borderRadius: "50%"
								}),
								await this._integrationHelpers.templateHelpers.createContainer("column", [
									await this._integrationHelpers.templateHelpers.createText("displayName", 14, {
										fontWeight: "bold"
									}),
									await this._integrationHelpers.templateHelpers.createText("company", 12, {})
								])
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					picData: picData ?? this.getThemedIcon("contact", palette),
					displayName: contact.displayName,
					...this.mapPairsToData(pairs),
					callTitle: "Call",
					callImage: this.getThemedIcon("call", palette),
					emailTitle: "Outlook E-mail",
					emailImage: this.getThemedIcon("email", palette),
					calendarTitle: "Outlook Calendar",
					calendarImage: this.getThemedIcon("calendar", palette)
				}
			}
		};
	}

	private async createMessageResult(message: Message): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const pairs: { label: string; value: string; wide?: boolean }[] = [];

		if (message.sender) {
			pairs.push({
				label: "From",
				value: message.sender.emailAddress.name ?? message.sender.emailAddress.address
			});
		}

		if (message.receivedDateTime) {
			pairs.push({
				label: "Received",
				value: new Date(message.receivedDateTime).toLocaleString()
			});
		}

		if (message.bodyPreview) {
			pairs.push({
				label: "Preview",
				value: message.bodyPreview,
				wide: true
			});
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: Microsoft365Provider._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		return {
			key: `${this._moduleDefinition.id}-${message.id}`,
			score: this.objectTypeToOrder("Message"),
			title: message.subject ?? "Untitled Message",
			label: "Message",
			icon: this.getThemedIcon("email", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "Message",
				obj: message,
				url: message.webLink
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createText("subject", 14, {
									fontWeight: "bold"
								})
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					subject: message.subject,
					...this.mapPairsToData(pairs),
					openTitle: "Open Outlook",
					openImage: this.getThemedIcon("outlook", palette)
				}
			}
		};
	}

	private async createEventResult(event: Event): Promise<HomeSearchResult> {
		const batchRequests: string[] = [`/me/events/${event.id}`];

		try {
			this._logger.info("Graph API Batch Request", {
				photo: batchRequests[0]
			});

			const response = await this._ms365Connection.executeApiRequest<GraphBatchResponse<Event>>(
				"/v1.0/$batch",
				"POST",
				{
					requests: batchRequests.map((r, idx) => ({
						id: (idx + 1).toString(),
						method: "GET",
						url: r
					}))
				}
			);

			const eventResponse = response.data?.responses.find((r) => r.id === "1");
			if (eventResponse?.status === 200) {
				event = {
					...event,
					...eventResponse.body
				};
			} else {
				this._logger.error("Failed getting event", eventResponse.status, eventResponse.body as string);
			}
		} catch (err) {
			this._logger.error("Failed performing API batch request", err);
		}

		const palette = await this._integrationHelpers.getCurrentPalette();

		const pairs: { label: string; value: string; wide?: boolean }[] = [];

		pairs.push({
			label: "Start",
			value: new Date(event.start?.dateTime).toLocaleString()
		});

		pairs.push({
			label: "End",
			value: new Date(event.end?.dateTime).toLocaleString()
		});

		if (event.bodyPreview) {
			pairs.push({
				label: "Preview",
				value: event.bodyPreview,
				wide: true
			});
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: Microsoft365Provider._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		return {
			key: `${this._moduleDefinition.id}-${event.id}`,
			score: this.objectTypeToOrder("Event"),
			title: event.subject ?? "Untitled Event",
			label: "Event",
			icon: this.getThemedIcon("calendar", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "Event",
				obj: event,
				url: event.webLink
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createText("subject", 14, {
									fontWeight: "bold"
								})
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					subject: event.subject ?? "Untitled Event",
					...this.mapPairsToData(pairs),
					openTitle: "Open Outlook",
					openImage: this.getThemedIcon("outlook", palette)
				}
			}
		};
	}

	private async createChatMessageResult(chatMessage: ChatMessage): Promise<HomeSearchResult> {
		const batchRequests: string[] = [`/chats/${chatMessage.chatId}/messages/${chatMessage.etag}`];

		try {
			this._logger.info("Graph API Batch Request", {
				photo: batchRequests[0]
			});

			const response = await this._ms365Connection.executeApiRequest<GraphBatchResponse<ChatMessage>>(
				"/v1.0/$batch",
				"POST",
				{
					requests: batchRequests.map((r, idx) => ({
						id: (idx + 1).toString(),
						method: "GET",
						url: r
					}))
				}
			);

			const chatMessageResponse = response.data?.responses.find((r) => r.id === "1");
			if (chatMessageResponse?.status === 200) {
				chatMessage = {
					...chatMessage,
					...chatMessageResponse.body,
					summary: chatMessageResponse.body.summary ?? chatMessage.summary
				};
			} else {
				this._logger.error(
					"Failed getting event",
					chatMessageResponse.status,
					chatMessageResponse.body as string
				);
			}
		} catch (err) {
			this._logger.error("Failed performing API batch request", err);
		}

		const palette = await this._integrationHelpers.getCurrentPalette();

		const pairs: { label: string; value: string; wide?: boolean }[] = [];

		pairs.push({
			label: "Date/Time",
			value: new Date(chatMessage.lastModifiedDateTime).toLocaleString()
		});

		if (chatMessage.from?.user?.displayName) {
			pairs.push({
				label: "From",
				value: chatMessage.from.user.displayName
			});
		}

		// Strip any HTML tags
		const body = chatMessage.body?.content?.replace(/<[^>]*>/g, "");
		if (body) {
			pairs.push({
				label: "Preview",
				value: body,
				wide: true
			});
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		return {
			key: `${this._moduleDefinition.id}-${chatMessage.id}`,
			score: this.objectTypeToOrder("ChatMessage"),
			title: chatMessage.summary ?? "Untitled Chat Message",
			label: "Chat Message",
			icon: this.getThemedIcon("chat", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CHAT,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "Event",
				obj: chatMessage,
				url: chatMessage.webUrl,
				chatId: chatMessage.chatId,
				messageId: chatMessage.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createText("summary", 14, {
									fontWeight: "bold"
								})
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					summary: chatMessage.summary ?? "Untitled Chat Message",
					...this.mapPairsToData(pairs),
					openTitle: "Open Chat Message",
					openImage: this.getThemedIcon("teams", palette)
				}
			}
		};
	}

	private async createTeamResult(team: Team): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const teamMembers = await this.getTeamMembers(team.id);

		const pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[] = [];
		const urls = {};

		if (team.channels?.length) {
			pairs.push({
				label: "Channel List",
				links: team.channels.map((c) => c.displayName)
			});

			for (let i = 0; i < team.channels.length; i++) {
				urls[`Channel List_link_${i}`] = team.channels[i].webUrl;
			}
		}

		if (teamMembers.length) {
			const userPhotos = await this.getUserPhotos(teamMembers, 16);
			pairs.push({
				label: "Member List",
				srcs: userPhotos
			});
		}

		if (team.description) {
			pairs.push({
				label: "Description",
				value: team.description,
				wide: true
			});
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CALL,
				imageKey: "openImage",
				imageAltText: "Open"
			},
			{
				titleKey: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				imageKey: "emailImage",
				imageAltText: "Email"
			},
			{
				titleKey: "meetingTitle",
				action: Microsoft365Provider._ACTION_TEAMS_MEETING,
				imageKey: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				titleKey: "chatTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				imageKey: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${this._moduleDefinition.id}-${team.id}`,
			score: this.objectTypeToOrder("Team"),
			title: team.displayName ?? "Untitled Team",
			label: "Team",
			icon: this.getThemedIcon("team", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "Team",
				obj: team,
				url: team.webUrl,
				urls,
				emails: teamMembers.filter((t) => t.email).map((t) => t.email),
				teamId: team.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createText("displayName", 14, {
									fontWeight: "bold"
								})
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					displayName: team.displayName ?? "Untitled Team",
					...this.mapPairsToData(pairs),
					openTitle: "Open Teams",
					openImage: this.getThemedIcon("teams", palette),
					emailTitle: "Outlook E-mail",
					emailImage: this.getThemedIcon("email", palette),
					meetingTitle: "Teams Meeting",
					meetingImage: this.getThemedIcon("calendar", palette),
					chatTitle: "Teams Chat",
					chatImage: this.getThemedIcon("chat", palette)
				}
			}
		};
	}

	private async createChannelResult(channel: Channel & { team: Team }): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const channelMembers = await this.getChannelMembers(channel.team.id, channel.id);

		const pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[] = [];

		pairs.push({
			label: "Team",
			value: channel.team.displayName
		});

		if (channelMembers.length) {
			const userPhotos = await this.getUserPhotos(channelMembers, 16);
			pairs.push({
				label: "Member List",
				srcs: userPhotos
			});
		}

		if (channel.description) {
			pairs.push({
				label: "Description",
				value: channel.description,
				wide: true
			});
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CALL,
				imageKey: "openImage",
				imageAltText: "Open"
			},
			{
				titleKey: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				imageKey: "emailImage",
				imageAltText: "Email"
			},
			{
				titleKey: "meetingTitle",
				action: Microsoft365Provider._ACTION_TEAMS_MEETING,
				imageKey: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				titleKey: "chatTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				imageKey: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${this._moduleDefinition.id}-${channel.id}`,
			score: this.objectTypeToOrder("Channel"),
			title: channel.displayName ?? "Untitled Channel",
			label: "Channel",
			icon: this.getThemedIcon("channel", palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "Channel",
				obj: channel,
				url: channel.webUrl,
				emails: channelMembers.filter((m) => m.email).map((m) => m.email),
				teamId: channel.team.id,
				channelId: channel.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createText("displayName", 14, {
									fontWeight: "bold"
								})
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					displayName: channel.displayName ?? "Untitled Channel",
					...this.mapPairsToData(pairs),
					openTitle: "Open Teams",
					openImage: this.getThemedIcon("teams", palette),
					emailTitle: "Outlook E-mail",
					emailImage: this.getThemedIcon("email", palette),
					meetingTitle: "Teams Meeting",
					meetingImage: this.getThemedIcon("calendar", palette),
					chatTitle: "Teams Chat",
					chatImage: this.getThemedIcon("chat", palette)
				}
			}
		};
	}

	private async createFileResult(driveItem: DriveItem): Promise<HomeSearchResult> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[] = [];
		const urls = {};

		const mimeIcon = this.getMimeIcon(driveItem, palette);

		if (driveItem.createdBy?.user?.displayName) {
			pairs.push({
				label: "Created By",
				value: driveItem.createdBy?.user?.displayName
			});
		}

		if (driveItem.createdDateTime) {
			pairs.push({
				label: "Created On",
				value: new Date(driveItem.createdDateTime).toLocaleString()
			});
		}

		if (driveItem.lastModifiedBy?.user?.displayName) {
			pairs.push({
				label: "Updated By",
				value: driveItem.lastModifiedBy?.user?.displayName
			});
		}

		if (driveItem.lastModifiedDateTime) {
			pairs.push({
				label: "Updated On",
				value: new Date(driveItem.lastModifiedDateTime).toLocaleString()
			});
		}

		const buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[] = [
			{
				titleKey: "openTitle",
				action: Microsoft365Provider._ACTION_OPEN,
				imageKey: "openImage",
				imageAltText: "Open"
			}
		];

		const isFolder = this.driveItemIsFolder(driveItem);
		const typeName = isFolder ? "Folder" : "File";

		return {
			key: `${this._moduleDefinition.id}-${driveItem.id}`,
			score: this.objectTypeToOrder("File"),
			title: driveItem.name ?? `Untitled ${typeName}`,
			label: typeName,
			icon: mimeIcon ?? this.getThemedIcon(typeName.toLowerCase(), palette),
			actions: [
				{
					name: Microsoft365Provider._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._moduleDefinition.id,
				objType: "File",
				obj: driveItem,
				url: driveItem.webUrl,
				urls
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this._integrationHelpers.templateHelpers.createContainer(
					"column",
					[
						await this._integrationHelpers.templateHelpers.createContainer(
							"row",
							[
								await this._integrationHelpers.templateHelpers.createText("displayName", 14, {
									fontWeight: "bold"
								})
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(palette, pairs),
						await this.createButtonsLayout(palette, buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					displayName: driveItem.name ?? "Untitled File",
					...this.mapPairsToData(pairs),
					openTitle: "Open File",
					openImage: mimeIcon ?? this.getThemedIcon("file", palette)
				}
			}
		};
	}

	private async getTeamMembers(teamId: string): Promise<AadUserConversationMember[]> {
		try {
			this._logger.info("Get Team Members Request");

			const response = await this._ms365Connection.executeApiRequest<
				GraphListResponse<AadUserConversationMember>
			>(`/v1.0/teams/${teamId}/members`, "GET");

			this._logger.info("Get Team Members Response", response.data);
			return response.data.value;
		} catch (err) {
			this._logger.error("Failed getting team members", err);
		}

		return [];
	}

	private async getChannelMembers(teamId: string, channelId: string): Promise<AadUserConversationMember[]> {
		try {
			this._logger.info("Get Channel Members Request");

			const response = await this._ms365Connection.executeApiRequest<
				GraphListResponse<AadUserConversationMember>
			>(`/v1.0/teams/${teamId}/channels/${channelId}/members`, "GET");

			this._logger.info("Get Channel Members Response", response.data);
			return response.data.value;
		} catch (err) {
			this._logger.error("Failed getting channel members", err);
		}

		return [];
	}

	private async getUserPhotos(users: AadUserConversationMember[], size: number): Promise<string[]> {
		try {
			const lookupUsers = users.filter((u) => !this._profileImageCache[u.id]);

			if (lookupUsers.length > 0) {
				const chunkCount = Math.ceil(lookupUsers.length / 20);

				for (let i = 0; i < chunkCount; i++) {
					const response = await this._ms365Connection.executeApiRequest<GraphBatchResponse>(
						"/v1.0/$batch",
						"POST",
						{
							requests: lookupUsers.slice(i * 20, (i + 1) * 20).map((u, idx) => ({
								id: `photos${idx + 1}`,
								method: "GET",
								url: `/users/${u.userId}/photo/$value`
							}))
						}
					);

					for (const r of response.data.responses) {
						const lookupIdx = Number.parseInt(r.id.replace("photos", ""), 10);
						const user = lookupUsers[lookupIdx - 1];
						let picData;
						if (r.status === 200) {
							picData = `data:image/jpeg;base64,${r.body as string}`;
						} else {
							picData = this.svgToInline(this.imageProfileNone(size, user.displayName));
						}
						this._profileImageCache[user.id] = {
							data: picData,
							added: Date.now()
						};
					}
				}
			}

			return users.map((u) => this._profileImageCache[u.id].data);
		} catch (err) {
			this._logger.error("Failed getting user photos", err);
		}

		return [];
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
				pairData[pair.label] = this.stripHtml(pair.value);
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
								`${Microsoft365Provider._ACTION_OPEN}_${pair.label}_link_${idx}`,
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

	private async createButtonsLayout(
		palette: CustomPaletteSet,
		buttons: {
			titleKey: string;
			action: string;
			imageKey: string;
			imageAltText: string;
		}[]
	): Promise<TemplateFragment> {
		return this._integrationHelpers.templateHelpers.createContainer(
			"row",
			await Promise.all(
				buttons.map(async (b) =>
					this._integrationHelpers.templateHelpers.createButton(
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
							await this._integrationHelpers.templateHelpers.createImage(b.imageKey, b.imageAltText, {
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

	private imageProfileNone(size: number, name: string): string {
		return `<svg fill="#DDDDDD" viewBox="0 0 512 512" height="${size}px" width="${size}px" xmlns="http://www.w3.org/2000/svg">
		<style>text{font: bold 350px sans-serif;fill: black;}</style>
		<rect width="512" height="512" />
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${name[0]}</text>
		</svg>`;
	}

	private svgToInline(svg: string): string {
		return `data:image/svg+xml;utf8,${svg.replace(/#/g, "%23")}`;
	}

	private base64IdToUrl(b64Id: string): string {
		return b64Id.replace(/\+/g, "_").replace(/\//g, "-");
	}

	private stripHtml(input: string): string {
		return input.replace(/<[^>]+>/g, "");
	}

	private objectTypeToOrder(objType: Microsoft365ObjectTypes): number {
		const objTypeOrder: { [key in Microsoft365ObjectTypes]: number } = {
			User: 1,
			Contact: 2,
			Message: 3,
			ChatMessage: 4,
			Event: 5,
			Team: 6,
			Channel: 7,
			File: 8
		};
		return objTypeOrder[objType] * 1000;
	}

	private async updateCache(): Promise<void> {
		// Cleanup any old cached profile images
		const keys = Object.keys(this._profileImageCache);
		const now = Date.now();
		const ttl = keys.length > 50 ? 30000 : 300000;
		for (const id of keys) {
			if (now - this._profileImageCache[id].added > ttl) {
				delete this._profileImageCache[id];
			}
		}

		// Update the teams and channels
		if (this._cacheCounter % 6 === 0) {
			// Update every 3 minutes
			try {
				const response = await this._ms365Connection.executeApiRequest<GraphListResponse<Team>>(
					"/v1.0/me/joinedTeams"
				);

				const joinedTeams = response.data?.value ?? [];
				const channelsForTeam: { [id: string]: Channel[] } = {};

				if (joinedTeams.length) {
					const batchChannels: string[] = joinedTeams.map((t) => `/teams/${t.id}/channels`);

					const batchResponses = await this._ms365Connection.executeApiRequest<GraphBatchResponse>(
						"/v1.0/$batch",
						"POST",
						{
							requests: batchChannels.map((url, idx) => ({
								id: `TeamChannels-${(idx + 1).toString()}`,
								method: "GET",
								url
							}))
						}
					);

					if (Array.isArray(batchResponses.data?.responses)) {
						for (const batchResponse of batchResponses.data.responses) {
							if (batchResponse.status === 200) {
								this._logger.info(`${batchResponse.id} Response`, batchResponse.body);

								const channels = batchResponse.body as GraphListResponse<Channel>;

								for (const channel of channels.value) {
									// The webUrl for the teams management page needs constructing from the first channel in each team
									// we also connect the team to the channels and vice versa
									const webUrl = new URL(channel.webUrl);
									if (webUrl.searchParams.has("groupId")) {
										const groupId = webUrl.searchParams.get("groupId");
										const team = joinedTeams.find((t) => t.id === groupId);
										if (team) {
											team.webUrl = channel.webUrl;
											channelsForTeam[team.id] = channelsForTeam[team.id] ?? [];
											channelsForTeam[team.id].push(channel);
										}
									}
								}
							} else {
								this._logger.error(
									`${batchResponse.id} Response Failed`,
									batchResponse.status,
									batchResponse.body
								);
							}
						}
					}
				}

				this._teamsAndChannelsCache = joinedTeams.map((t) => ({
					team: t,
					channels: channelsForTeam[t.id] ?? []
				}));
			} catch (err) {
				this._logger.error("Error retrieving joined teams", err);
			}
		}
		this._cacheCounter++;
	}

	private getMimeIcon(driveItem: DriveItem, palette: CustomPaletteSet): string | undefined {
		const mimeType = driveItem.file?.mimeType ?? "";
		const filename = driveItem.name ?? "";
		const packageType = driveItem.package?.type ?? "";
		if (
			mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
			mimeType === "application/msword" ||
			filename.endsWith(".docx") ||
			filename.endsWith(".doc")
		) {
			return this._settings.images.word;
		} else if (
			mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
			mimeType === "application/vnd.ms-excel" ||
			filename.endsWith(".xlsx") ||
			filename.endsWith(".xls")
		) {
			return this._settings.images.excel;
		} else if (
			mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
			mimeType === "application/vnd.ms-powerpoint" ||
			filename.endsWith(".pptx") ||
			filename.endsWith(".ppt")
		) {
			return this._settings.images.powerpoint;
		} else if (this.driveItemIsImage(driveItem)) {
			if (Array.isArray(driveItem.thumbnails) && driveItem.thumbnails.length > 0) {
				return driveItem.thumbnails[0].small?.url ?? driveItem.thumbnails[0].medium?.url;
			}
		} else if (packageType === "oneNote" || filename.endsWith("onetoc2") || filename.endsWith("one")) {
			return this._settings.images.onenote;
		} else if (this.driveItemIsFolder(driveItem)) {
			return this.getThemedIcon("folder", palette);
		}
	}

	private getThemedIcon(themedIcon: string, palette: CustomPaletteSet): string {
		if (!this._settings.images[themedIcon]) {
			return "";
		}
		const icon = this._settings.images[themedIcon];
		if (icon.startsWith("data:image/svg+xml")) {
			return icon.replace(/rgb\(0,0,0\)/g, palette.textDefault.replace(/#/g, "%23"));
		}
		return icon;
	}

	private driveItemIsFolder(driveItem: DriveItem): boolean {
		return driveItem.file === undefined && driveItem.folder !== undefined;
	}

	private driveItemIsImage(driveItem: DriveItem): boolean {
		return (
			driveItem.file?.mimeType.startsWith("image/") ||
			driveItem.name?.endsWith(".jpeg") ||
			driveItem.name?.endsWith(".jpg") ||
			driveItem.name?.endsWith(".gif") ||
			driveItem.name?.endsWith(".webp") ||
			driveItem.name?.endsWith(".png")
		);
	}
}
