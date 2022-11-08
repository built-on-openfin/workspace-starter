import type { Contact as Fdc3Contact, Context as FDC3Context } from "@finos/fdc3";
import type {
	AadUserConversationMember,
	Channel,
	ChatMessage,
	Contact,
	Entity,
	Event,
	Message,
	Presence,
	SearchResponse,
	Team,
	User
} from "@microsoft/microsoft-graph-types";
import {
	connect,
	enableLogging,
	GraphResult,
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
import type { CustomThemeOptions } from "@openfin/workspace/common/src/api/theming";
import type { Integration, IntegrationHelpers, IntegrationModule } from "../../integrations-shapes";
import type { Logger, LoggerCreator } from "../../logger-shapes";
import { createButton, createContainer, createImage, createLink, createText } from "../../templates";
import { getCurrentTheme } from "../../themes";
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
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "ms365";

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
	 * The url for office.
	 * @internal
	 */
	private static readonly _OFFICE_URL = "https://outlook.office365.com/";

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _settings: Microsoft365Settings | undefined;

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
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: Integration<Microsoft365Settings>,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._settings = definition.data;
		this._integrationHelpers = helpers;
		this._logger = loggerCreator("Microsoft365Provider");

		await this.connectProvider();
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
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		return [];
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

		this._debounceTimerId = window.setTimeout(async () => {
			try {
				// If query starts with ms just do a passthrough to the graph API
				if (!this._settings.disableGraphExplorer && query.startsWith("/ms/")) {
					const path = query.replace("/ms/", "");
					if (path.length > 0) {
						const fullPath = `/v1.0/${path}`;

						this._logger.info("Graph API Request", fullPath);

						const response = await this._ms365Connection.executeApiRequest(fullPath);
						lastResponse.respond([this.createGraphJsonResult(response)]);
					}
				} else if (query.length >= 3) {
					const ms365Filter = filters?.find((f) => f.id === Microsoft365Provider._MS365_FILTERS);

					let includeOptions: Microsoft365ObjectTypes[] = [
						"User",
						"Contact",
						"Event",
						"Message",
						"Channel",
						"Team",
						"ChatMessage"
					];

					if (Array.isArray(ms365Filter?.options)) {
						includeOptions = ms365Filter.options
							.filter((o) => o.isSelected)
							.map((o) => o.value as Microsoft365ObjectTypes);
					}

					// try a user lookup instead
					const encodedQuery = encodeURIComponent(query);

					const userSearchFields: (keyof User)[] = [
						"displayName",
						"givenName",
						"surname",
						"department",
						"jobTitle",
						"mobilePhone"
					];
					const userSearchQuery = userSearchFields.map((s) => `"${s}:${encodedQuery}"`).join(" OR ");

					const batchRequests: GraphBatchRequest[] = [];

					if (includeOptions.includes("User")) {
						batchRequests.push({
							id: "User",
							method: "GET",
							url: `/users?$search=${userSearchQuery}&$top=10`,
							headers: {
								ConsistencyLevel: "eventual"
							}
						});
					}
					if (includeOptions.includes("Contact")) {
						batchRequests.push({
							id: "Contact",
							method: "GET",
							url: `/me/contacts?$search=${encodedQuery}&$top=10`
						});
					}
					if (includeOptions.includes("Message")) {
						batchRequests.push({
							id: "Message",
							method: "GET",
							url: `/me/messages?$select=sender,subject,bodyPreview,receivedDateTime,webLink&$search=${encodedQuery}&$top=10`
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
					if (includeOptions.includes("Team") || includeOptions.includes("Channel")) {
						batchRequests.push({
							id: "Team",
							url: "/me/joinedTeams",
							method: "GET"
						});
					}

					const homeResults = await this.sendBatchQuery(query, includeOptions, batchRequests);
					lastResponse.respond(homeResults);
				}
			} catch (err) {
				const message = err instanceof Error ? err.message : err;
				lastResponse.respond([this.createGraphJsonResult({ status: 400, data: message })]);
			}
			lastResponse.revoke(`${Microsoft365Provider._PROVIDER_ID}-searching`);
		}, 500);

		return {
			results: query.length >= 3 ? [this.createSearchingResult()] : [],
			context: {
				filters: [
					{
						id: Microsoft365Provider._MS365_FILTERS as string,
						title: "Microsoft 365",
						options: ["User", "Contact", "Message", "Event", "Team", "Channel", "ChatMessage"].map((o) => ({
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
					Team: async () => this.createTeamResult(actionData.obj as Team)
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
				this._connectLastResponse.revoke(`${Microsoft365Provider._PROVIDER_ID}-connect`);
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
				lastResponse.revoke(`${Microsoft365Provider._PROVIDER_ID}-connect`);
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
			await teamsConnection.openChannelChat(actionData.teamId, actionData.channelId);
		} else {
			await teamsConnection.openGroupChat([this._ms365Connection.currentUser.mail, ...actionData.emails]);
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

		const uri = new URL(response.data?.webLink);

		if (uri.searchParams.has("ItemID")) {
			const itemId = encodeURIComponent(uri.searchParams.get("ItemID"));
			await this._integrationHelpers.launchView(
				`${Microsoft365Provider._OFFICE_URL}mail/deeplink/compose/${itemId}?ItemID=${itemId}&exvsurl=1`
			);
		} else {
			await this._integrationHelpers.launchView(response.data.webLink);
		}
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

		const uri = new URL(response.data?.webLink);

		if (uri.searchParams.has("itemid")) {
			const itemId = encodeURIComponent(uri.searchParams.get("itemid"));
			await this._integrationHelpers.launchView(
				`${Microsoft365Provider._OFFICE_URL}calendar/deeplink/compose/${itemId}?ItemID=${itemId}&exvsurl=1`
			);
		} else {
			await this._integrationHelpers.launchView(response.data.webLink);
		}
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
			if (type === "User") {
				const users = (batchResponse.body as GraphListResponse<User>).value;

				if (users.length > 0) {
					homeResults = homeResults.concat(
						users.map((u) => this.createLoadingResult(u, "displayName", "User"))
					);
				}
			} else if (type === "Contact") {
				const contacts = (batchResponse.body as GraphListResponse<Contact>).value;
				if (contacts.length > 0) {
					homeResults = homeResults.concat(
						contacts.map((c) => this.createLoadingResult(c, "displayName", "Contact"))
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
							.map((m) => this.createLoadingResult(m, "subject", "Message"))
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
									"Event"
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
								"ChatMessage"
							)
						)
					);
				}
			} else if (type === "Team") {
				const joinedTeams = (batchResponse.body as GraphListResponse<Team>).value;

				if (joinedTeams.length > 0) {
					if (includeOptions.includes("Channel")) {
						const lowerQuery = query.toLowerCase();

						const batchChannels: string[] = joinedTeams.map((t) => `/teams/${t.id}/channels`);

						const channelResults = await this.sendBatchQuery(
							query,
							includeOptions,
							batchChannels.map((url, idx) => ({
								id: `Channel-${(idx + 1).toString()}`,
								method: "GET",
								url
							}))
						);

						for (const channelResult of channelResults) {
							const channel = channelResult.data.obj as Channel & { team: Team };

							const includeInResults =
								channel.displayName?.toLowerCase().includes(lowerQuery) ||
								channel.description?.toLowerCase().includes(lowerQuery);

							// The webUrl for the teams management page needs constructing from the first channel in each team
							// we also connect the team to the channels and vice versa
							const webUrl = new URL(channel.webUrl);
							if (webUrl.searchParams.has("groupId")) {
								const groupId = webUrl.searchParams.get("groupId");
								const team = joinedTeams.find((t) => t.id === groupId);
								if (team) {
									team.webUrl = channel.webUrl;
									team.channels = team.channels ?? [];
									// Make a copy of the channel without the team reference
									// otherwise we end up with a circular reference when
									// it is converted to JSON
									if (includeInResults) {
										team.channels.push({
											...channel
										});
									}
									channel.team = team;
								}
							}

							if (includeInResults) {
								homeResults.push(channelResult);
							}
						}
					}

					homeResults = homeResults.concat(
						joinedTeams
							.filter((t) => t?.channels?.length)
							.map((t) => this.createLoadingResult(t, "displayName", "Team"))
					);
				}
			} else if (type === "Channel") {
				const channels = (batchResponse.body as GraphListResponse<Channel>).value;
				homeResults = homeResults.concat(
					channels.map((c) => this.createLoadingResult(c, "displayName", "Channel"))
				);
			}
		}

		return homeResults;
	}

	private async createConnectResult(): Promise<HomeSearchResult> {
		const theme = await getCurrentTheme();

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-connect`,
			title: "Microsoft 365",
			label: "Connect",
			icon: this._settings.images.microsoft365,
			actions: [
				{
					name: Microsoft365Provider._ACTION_CONNECT,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("title", 14, { fontWeight: "bold" })], {
							paddingBottom: "10px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await createText("description", 12),
						await createText("error", 12, { fontFamily: "monospace", flex: 1 }),
						await createButton(ButtonStyle.Primary, "connect", Microsoft365Provider._ACTION_CONNECT)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					title: "Microsoft 365 Connection",
					description: "Microsoft 365 failed to connect due to the following error",
					error: this._connectionError,
					connect: "Connect"
				}
			}
		};
	}

	private createSearchingResult(): HomeSearchResult {
		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-searching`,
			title: "Searching ...",
			icon: this._settings.images.microsoft365,
			actions: [],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID
			} as ActionData,
			template: CLITemplate.Loading,
			templateContent: undefined
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private createGraphJsonResult(response: GraphResult<any>): HomeSearchResult {
		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-rest`,
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
				providerId: Microsoft365Provider._PROVIDER_ID,
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
						whiteSpace: "pre"
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
		objType: Microsoft365ObjectTypes
	): HomeSearchResult {
		const icons = {
			User: this._settings.images.teams,
			Contact: this._settings.images.contact,
			Message: this._settings.images.email,
			Event: this._settings.images.calendar,
			Channel: this._settings.images.channel,
			Team: this._settings.images.team,
			ChatMessage: this._settings.images.chat
		};

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${obj.id}`,
			score: this.objectTypeToOrder(objType),
			title: (obj[title] as unknown as string) ?? `Untitled ${objType}`,
			label: objType.split(/(?=[A-Z])/).join(" "),
			icon: icons[objType],
			actions: [],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
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
		let availableIcon: string = this.iconCross(16);
		let availability: string = "Unknown";
		let teams = [];

		const batchRequests: string[] = [
			`/users/${user.id}/photo/$value`,
			`/users/${user.id}/presence`,
			`/users/${user.id}/memberOf`
		];

		try {
			this._logger.info("Graph API Batch Request", {
				photo: batchRequests[0],
				presence: batchRequests[1],
				memberOf: batchRequests[2]
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
			} else {
				// If the request failed the JSON error is still base64 encoded
				this._logger.error(
					"Failed getting user profile pic",
					profileResponse.status,
					atob(profileResponse.body as string)
				);
			}

			const presenceResponse = response.data?.responses.find((r) => r.id === "2");
			if (presenceResponse?.status === 200) {
				presence = presenceResponse.body as Presence;

				// Availability is in Pascal case, so split on capitals and join with space
				availability = presence?.availability.split(/(?=[A-Z])/).join(" ");

				if (presence?.availability === "Available") {
					availableColor = "green";
					availableIcon = this.iconCheck(16);
				} else if (presence?.availability === "Away" || presence?.availability === "BeRightBack") {
					availableColor = "orange";
					availableIcon = this.iconClock(16);
				}
			} else {
				this._logger.error("Failed getting user presence", presenceResponse.status, presenceResponse.body);
			}

			const teamsResponse = response.data?.responses.find((r) => r.id === "3");
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
		} catch (err) {
			this._logger.error("Failed performing API batch request", err);
		}

		const theme = await getCurrentTheme();

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
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [
			{
				title: "callTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CALL,
				image: "callImage",
				imageAltText: "Teams Call"
			},
			{
				title: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				image: "emailImage",
				imageAltText: "E-mail"
			},
			{
				title: "meetingTitle",
				action: Microsoft365Provider._ACTION_TEAMS_MEETING,
				image: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				title: "chatTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				image: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${user.id}`,
			score: this.objectTypeToOrder("User"),
			title: user.displayName,
			label: "User",
			icon: this._settings.images.teams,
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "User",
				obj: user,
				emails: [user.mail],
				phone,
				name: user.displayName
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer(
							"row",
							[
								await createImage("picData", user.displayName, {
									width: "44px",
									height: "44px",
									objectFit: "cover",
									borderRadius: "50%"
								}),
								await createImage("status", availability, {
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
								await createContainer("column", [
									await createText("displayName", 14, { fontWeight: "bold" }),
									await createText("availability", 12, {})
								])
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${theme.palette.background6}`
							}
						),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					picData: picData ?? this._settings.images.contact,
					status: `data:image/svg+xml;utf8,${availableIcon}`,
					displayName: user.displayName,
					availability,
					...this.mapPairsToData(pairs),
					callTitle: "Teams Call",
					callImage: this._settings.images.teams,
					emailTitle: "Outlook E-mail",
					emailImage: this._settings.images.email,
					meetingTitle: "Teams Meeting",
					meetingImage: this._settings.images.calendar,
					chatTitle: "Teams Chat",
					chatImage: this._settings.images.chat
				}
			}
		};
	}

	private async createContactResult(contact: Contact): Promise<HomeSearchResult> {
		let picData: string;

		const batchRequests: string[] = [`/me/contacts/${contact.id}/photo/$value`];

		try {
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
			} else {
				// If the request failed the JSON error is still base64 encoded
				this._logger.error(
					"Failed getting contact profile pic",
					profileResponse.status,
					atob(profileResponse.body as string)
				);
			}
		} catch (err) {
			this._logger.error("Failed performing API batch request", err);
		}

		const theme = await getCurrentTheme();

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
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [];

		if (phone) {
			buttons.push({
				title: "callTitle",
				action: Microsoft365Provider._ACTION_PHONE_CALL,
				image: "callImage",
				imageAltText: "Call"
			});
		}

		if (email) {
			buttons.push({
				title: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				image: "emailImage",
				imageAltText: "E-mail"
			});
			buttons.push({
				title: "calendarTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EVENT,
				image: "calendarImage",
				imageAltText: "Calendar"
			});
		}

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${contact.id}`,
			score: this.objectTypeToOrder("Contact"),
			title: contact.displayName,
			label: "Contact",
			icon: this._settings.images.contact,
			actions: [
				{
					name: Microsoft365Provider._ACTION_PHONE_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Contact",
				obj: contact,
				emails: [email],
				phone,
				name: contact.displayName
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer(
							"row",
							[
								await createImage("picData", contact.displayName, {
									width: "44px",
									height: "44px",
									objectFit: "cover",
									borderRadius: "50%"
								}),
								await createContainer("column", [
									await createText("displayName", 14, { fontWeight: "bold" }),
									await createText("company", 12, {})
								])
							],
							{
								paddingBottom: "10px",
								borderBottom: `1px solid ${theme.palette.background6}`,
								gap: "10px"
							}
						),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
					],
					{
						padding: "10px",
						gap: "15px",
						flex: "1"
					}
				),
				data: {
					picData: picData ?? this._settings.images.contact,
					displayName: contact.displayName,
					...this.mapPairsToData(pairs),
					callTitle: "Call",
					callImage: this._settings.images.call,
					emailTitle: "Outlook E-mail",
					emailImage: this._settings.images.email,
					calendarTitle: "Outlook Calendar",
					calendarImage: this._settings.images.calendar
				}
			}
		};
	}

	private async createMessageResult(message: Message): Promise<HomeSearchResult> {
		const theme = await getCurrentTheme();

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
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [
			{
				title: "openTitle",
				action: Microsoft365Provider._ACTION_OPEN,
				image: "openImage",
				imageAltText: "Open"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${message.id}`,
			score: this.objectTypeToOrder("Message"),
			title: message.subject ?? "Untitled Message",
			label: "Message",
			icon: this._settings.images.email,
			actions: [
				{
					name: Microsoft365Provider._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Message",
				obj: message,
				url: message.webLink
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("subject", 14, { fontWeight: "bold" })], {
							paddingBottom: "10px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
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
					openImage: this._settings.images.outlook
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

		const theme = await getCurrentTheme();

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
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [
			{
				title: "openTitle",
				action: Microsoft365Provider._ACTION_OPEN,
				image: "openImage",
				imageAltText: "Open"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${event.id}`,
			score: this.objectTypeToOrder("Event"),
			title: event.subject ?? "Untitled Event",
			label: "Event",
			icon: this._settings.images.calendar,
			actions: [
				{
					name: Microsoft365Provider._ACTION_OPEN,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Event",
				obj: event,
				url: event.webLink
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("subject", 14, { fontWeight: "bold" })], {
							paddingBottom: "10px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
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
					openImage: this._settings.images.outlook
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

		const theme = await getCurrentTheme();

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

		if (chatMessage.body?.content) {
			pairs.push({
				label: "Preview",
				value: chatMessage.body?.content,
				wide: true
			});
		}

		const buttons: {
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [
			{
				title: "openTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				image: "openImage",
				imageAltText: "Open"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${chatMessage.id}`,
			score: this.objectTypeToOrder("ChatMessage"),
			title: chatMessage.summary ?? "Untitled Chat Message",
			label: "Chat Message",
			icon: this._settings.images.chat,
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CHAT,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Event",
				obj: chatMessage,
				url: chatMessage.webUrl,
				chatId: chatMessage.chatId,
				messageId: chatMessage.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("summary", 14, { fontWeight: "bold" })], {
							paddingBottom: "10px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
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
					openImage: this._settings.images.teams
				}
			}
		};
	}

	private async createTeamResult(team: Team): Promise<HomeSearchResult> {
		const theme = await getCurrentTheme();

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
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [
			{
				title: "openTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CALL,
				image: "openImage",
				imageAltText: "Open"
			},
			{
				title: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				image: "emailImage",
				imageAltText: "Email"
			},
			{
				title: "meetingTitle",
				action: Microsoft365Provider._ACTION_TEAMS_MEETING,
				image: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				title: "chatTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				image: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${team.id}`,
			score: this.objectTypeToOrder("Team"),
			title: team.displayName ?? "Untitled Team",
			label: "Team",
			icon: this._settings.images.team,
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Team",
				obj: team,
				url: team.webUrl,
				urls,
				emails: teamMembers.filter((t) => t.email).map((t) => t.email),
				teamId: team.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("displayName", 14, { fontWeight: "bold" })], {
							paddingBottom: "10px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
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
					openImage: this._settings.images.teams,
					emailTitle: "Outlook E-mail",
					emailImage: this._settings.images.email,
					meetingTitle: "Teams Meeting",
					meetingImage: this._settings.images.calendar,
					chatTitle: "Teams Chat",
					chatImage: this._settings.images.chat
				}
			}
		};
	}

	private async createChannelResult(channel: Channel & { team: Team }): Promise<HomeSearchResult> {
		const theme = await getCurrentTheme();

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
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[] = [
			{
				title: "openTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CALL,
				image: "openImage",
				imageAltText: "Open"
			},
			{
				title: "emailTitle",
				action: Microsoft365Provider._ACTION_OUTLOOK_EMAIL,
				image: "emailImage",
				imageAltText: "Email"
			},
			{
				title: "meetingTitle",
				action: Microsoft365Provider._ACTION_TEAMS_MEETING,
				image: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				title: "chatTitle",
				action: Microsoft365Provider._ACTION_TEAMS_CHAT,
				image: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${channel.id}`,
			score: this.objectTypeToOrder("Channel"),
			title: channel.displayName ?? "Untitled Channel",
			label: "Channel",
			icon: this._settings.images.channel,
			actions: [
				{
					name: Microsoft365Provider._ACTION_TEAMS_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Channel",
				obj: channel,
				url: channel.webUrl,
				emails: channelMembers.filter((m) => m.email).map((m) => m.email),
				teamId: channel.team.id,
				channelId: channel.id
			} as ActionData,
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("displayName", 14, { fontWeight: "bold" })], {
							paddingBottom: "10px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await this.createButtonsLayout(buttons)
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
					openImage: this._settings.images.teams,
					emailTitle: "Outlook E-mail",
					emailImage: this._settings.images.email,
					meetingTitle: "Teams Meeting",
					meetingImage: this._settings.images.calendar,
					chatTitle: "Teams Chat",
					chatImage: this._settings.images.chat
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
			const response = await this._ms365Connection.executeApiRequest<GraphBatchResponse>(
				"/v1.0/$batch",
				"POST",
				{
					requests: users.map((u, idx) => ({
						id: `photos${idx + 1}`,
						method: "GET",
						url: `/users/${u.userId}/photo/$value`
					}))
				}
			);

			return response.data.responses.map((r, idx) => {
				if (r.status === 200) {
					return `data:image/jpeg;base64,${r.body as string}`;
				}
				return `data:image/svg+xml;utf8,${this.imageProfileNone(16, users[idx].displayName)}`;
			});
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

	private async createPairsLayout(
		theme: CustomThemeOptions,
		pairs: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }[]
	): Promise<TemplateFragment> {
		return createContainer(
			"column",
			await Promise.all(pairs.map(async (p) => this.createPairLayout(theme, p))),
			{ gap: "5px", flex: "1" }
		);
	}

	private async createPairLayout(
		theme: CustomThemeOptions,
		pair: { label: string; value?: string; links?: string[]; srcs?: string[]; wide?: boolean }
	): Promise<TemplateFragment> {
		const elements: TemplateFragment[] = [
			await createText(`${pair.label}Title`, 10, {
				color: theme.palette.inputPlaceholder,
				flex: 1
			})
		];

		if (pair.value) {
			elements.push(
				await createText(`${pair.label}`, 10, {
					flex: pair.wide ? 1 : 3,
					display: "flex",
					justifyContent: pair.wide ? "flex-start" : "flex-end",
					wordBreak: "break-all"
				})
			);
		}

		if (pair.links?.length) {
			elements.push(
				await createContainer(
					"row",
					await Promise.all(
						pair.links.map(async (l, idx) =>
							createLink(
								`${pair.label}_link_${idx}`,
								`${Microsoft365Provider._ACTION_OPEN}_${pair.label}_link_${idx}`,
								10
							)
						)
					),
					{ gap: "5px", flex: 3, justifyContent: "flex-end" }
				)
			);
		}

		if (pair.srcs?.length) {
			elements.push(
				await createContainer(
					"row",
					await Promise.all(
						pair.srcs.map(async (s, idx) =>
							createImage(`${pair.label}_src_${idx}`, "Member", {
								width: "16px",
								height: "16px",
								objectFit: "cover",
								borderRadius: "50%"
							})
						)
					),
					{ gap: "5px", flex: 3, justifyContent: "flex-end" }
				)
			);
		}

		return createContainer(pair.wide ? "column" : "row", elements, {
			justifyContent: "space-between",
			gap: pair.wide ? "5px" : "10px"
		});
	}

	private async createButtonsLayout(
		buttons: {
			title: string;
			action: string;
			image: string;
			imageAltText: string;
		}[]
	): Promise<TemplateFragment> {
		return createContainer(
			"row",
			await Promise.all(
				buttons.map(async (b) =>
					createButton(
						ButtonStyle.Secondary,
						b.title,
						b.action,
						{
							border: "none",
							borderRadius: "50%",
							width: "40px",
							height: "40px",
							padding: "0px",
							justifyContent: "center"
						},
						[await createImage(b.image, b.imageAltText, { width: "16px", height: "16px" })]
					)
				)
			),
			{
				justifyContent: "space-around",
				gap: "20px"
			}
		);
	}

	private imageProfileNone(size: number, name: string): string {
		return `<svg fill="%23DDDDDD" viewBox="0 0 512 512" height="${size}px" width="${size}px" xmlns="http://www.w3.org/2000/svg">
		<style>text{font: bold 350px sans-serif;fill: black;}</style>
		<rect width="512" height="512" />
		<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${name[0]}</text>
		</svg>`;
	}

	private iconCheck(size: number): string {
		return `<svg stroke="%23FFFFFF" fill="%23FFFFFF" stroke-width="0" viewBox="0 0 512 512" height="${size}px" width="${size}px" xmlns="http://www.w3.org/2000/svg">
		<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
		</svg>`;
	}

	private iconCross(size: number): string {
		return `<svg stroke="%23FFFFFF" fill="%23FFFFFF" stroke-width="0" viewBox="0 0 352 512" height="${size}px" width="${size}px" xmlns="http://www.w3.org/2000/svg">
		<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
		</svg>`;
	}

	private iconClock(size: number): string {
		return `<svg stroke="%23FFFFFF" fill="%23FFFFFF" stroke-width="2" viewBox="0 0 16 16" height="${size}px" width="${size}px" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round">
		<polyline points="8 1 8 9 15 15"/>
		</svg>`;
	}

	private base64IdToUrl(b64Id: string): string {
		return b64Id.replace(/\+/g, "_").replace(/\//g, "-");
	}

	private objectTypeToOrder(objType: Microsoft365ObjectTypes): number {
		const objTypeOrder: { [key in Microsoft365ObjectTypes]: number } = {
			User: 1,
			Contact: 2,
			Message: 3,
			ChatMessage: 4,
			Event: 5,
			Team: 6,
			Channel: 7
		};
		return objTypeOrder[objType] * 1000;
	}
}
