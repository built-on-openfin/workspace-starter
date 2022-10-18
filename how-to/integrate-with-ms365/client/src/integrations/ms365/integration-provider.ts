import type {
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
	GraphBatchRequestResponse,
	GraphListResponse,
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
import { createButton, createContainer, createImage, createText } from "../../templates";
import { getCurrentTheme } from "../../themes";
import type { Microsoft365ObjectTypes, Microsoft365Settings } from "./shapes";

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
	private static readonly _ACTION_CALL = "Call";

	/**
	 * The key to use for an open key action.
	 * @internal
	 */
	private static readonly _ACTION_OPEN = "Open";

	/**
	 * The key to use for a copy key action.
	 * @internal
	 */
	private static readonly _ACTION_COPY = "Copy JSON to Clipboard";

	/**
	 * The key for the ms 365 filters.
	 * @internal
	 */
	private static readonly _MS365_FILTERS = "MS365";

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

		try {
			this._logger.info("Connecting to MS Graph API", {
				clientId: this._settings.clientId,
				tenantId: this._settings.tenantId,
				redirectUri: this._settings.redirectUri
			});

			if (this._settings.enableLibLogging) {
				enableLogging();
			}

			this._ms365Connection = await connect(
				this._settings.clientId,
				this._settings.tenantId,
				this._settings.redirectUri,
				// https://learn.microsoft.com/en-us/graph/permissions-reference
				[
					"User.Read",
					"Presence.Read",
					"Presence.Read.All",
					"Directory.Read.All",
					"Mail.ReadWrite",
					"Contacts.Read",
					"Tasks.Read",
					"Calendars.ReadWrite"
				]
			);
		} catch (err) {
			this._logger.error("Connecting to MS Graph API failed", err);
		}
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
		const results: HomeSearchResult[] = [];

		if (this._debounceTimerId) {
			window.clearTimeout(this._debounceTimerId);
			this._debounceTimerId = undefined;
		}

		this._debounceTimerId = window.setTimeout(async () => {
			if (this._ms365Connection) {
				try {
					// If query starts with ms just do a passthrough to the graph API
					if (!this._settings.disableGraphExplorer && query.startsWith("/ms/")) {
						const path = query.replace("/ms/", "");
						if (path.length > 0) {
							const fullPath = `/v1.0/${path}`;

							this._logger.info("Graph API Request", fullPath);

							const response = await this._ms365Connection.executeApiRequest(fullPath);
							lastResponse.respond([this.createResult(response)]);
						}
					} else if (query.length > 3) {
						const ms365Filter = filters?.find((f) => f.id === Microsoft365Provider._MS365_FILTERS);

						let includeOptions: Microsoft365ObjectTypes[] = ["User", "Contact", "Event", "Message"];

						if (Array.isArray(ms365Filter?.options)) {
							includeOptions = ms365Filter.options
								.filter((o) => o.isSelected)
								.map((o) => o.value as Microsoft365ObjectTypes);
						}

						// try a user lookup instead
						const encodedQuery = encodeURIComponent(query);

						const userSearchFields: (keyof User)[] = ["displayName", "givenName", "surname"];
						const userSearchQuery = userSearchFields
							.map((s) => `startsWith(${s},'${encodedQuery}')`)
							.join(" or ");

						const batchRequests: {
							id: string;
							url: string;
							method: string;
							body?: unknown;
							headers?: unknown;
						}[] = [
							includeOptions.includes("User")
								? {
										id: "1",
										method: "GET",
										url: `/users?$filter=${userSearchQuery}&$top=10`
								  }
								: undefined,
							includeOptions.includes("Contact")
								? {
										id: "2",
										method: "GET",
										url: `/me/contacts?$search=${encodedQuery}&$top=10`
								  }
								: undefined,
							includeOptions.includes("Message")
								? {
										id: "3",
										method: "GET",
										url: `/me/messages?$select=sender,subject,bodyPreview,receivedDateTime,webLink&$search=${encodedQuery}&$top=10`
								  }
								: undefined,
							includeOptions.includes("Event")
								? {
										id: "4",
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
								  }
								: undefined
						].filter(Boolean);

						this._logger.info("Graph API Batch Request", batchRequests);

						const response = await this._ms365Connection.executeApiRequest<GraphBatchRequestResponse>(
							"/v1.0/$batch",
							"POST",
							{
								requests: batchRequests
							}
						);

						let homeResults: HomeSearchResult[] = [];

						if (includeOptions.includes("User")) {
							const userResponse = response.data?.responses.find((r) => r.id === "1");
							if (userResponse?.status === 200) {
								this._logger.info("User Response", userResponse.body);

								const users = (userResponse.body as GraphListResponse<User>).value;

								if (users.length > 0) {
									homeResults = homeResults.concat(
										users.map((u) => this.createLoadingResult(u, "displayName", "User"))
									);
								}
							} else {
								this._logger.error("User Response Failed", userResponse?.status, userResponse?.body);
							}
						}

						if (includeOptions.includes("Contact")) {
							const contactsResponse = response.data?.responses.find((r) => r.id === "2");
							if (contactsResponse?.status === 200) {
								this._logger.info("Contacts Response", contactsResponse.body);

								const contacts = (contactsResponse.body as GraphListResponse<Contact>).value;
								if (contacts.length > 0) {
									homeResults = homeResults.concat(
										contacts.map((c) => this.createLoadingResult(c, "displayName", "Contact"))
									);
								}
							} else {
								this._logger.error(
									"Contacts Response Failed",
									contactsResponse?.status,
									contactsResponse?.body
								);
							}
						}

						if (includeOptions.includes("Message")) {
							const messagesResponse = response.data?.responses.find((r) => r.id === "3");
							if (messagesResponse?.status === 200) {
								this._logger.info("Messages Response", messagesResponse.body);

								const messages = (messagesResponse.body as GraphListResponse<Message>).value;
								if (messages.length > 0) {
									homeResults = homeResults.concat(
										messages
											.filter((m) => m.subject)
											.map((c) => this.createLoadingResult(c, "subject", "Message"))
									);
								}
							} else {
								this._logger.error(
									"Messages Response Failed",
									messagesResponse?.status,
									messagesResponse?.body
								);
							}
						}

						if (includeOptions.includes("Event")) {
							const eventsResponse = response.data?.responses.find((r) => r.id === "4");
							if (eventsResponse?.status === 200) {
								this._logger.info("Events Response", eventsResponse.body);
								const graphResponse = eventsResponse.body as GraphListResponse<SearchResponse>;
								const searchResponse = graphResponse?.value?.[0];
								const events = searchResponse?.hitsContainers?.[0]?.hits;
								if (events?.length) {
									homeResults = homeResults.concat(
										events.map((c) =>
											this.createLoadingResult(
												{
													id: this.base64IdToUrl(c.hitId),
													...c.resource
												} as Event,
												"subject",
												"Event"
											)
										)
									);
								}
							} else {
								this._logger.error("Events Response Failed", eventsResponse?.status, eventsResponse?.body);
							}
						}

						lastResponse.respond(homeResults);
					}
				} catch (err) {
					if (err instanceof Error) {
						lastResponse.respond([this.createResult({ status: 400, data: err.message })]);
					}
				}
			}
		}, 500);

		return {
			results,
			context: {
				filters: [
					{
						id: Microsoft365Provider._MS365_FILTERS as string,
						title: "Microsoft 365",
						options: ["User", "Contact", "Message", "Event"].map((o) => ({ value: o, isSelected: true }))
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
			if (result.data?.state === "loading") {
				setTimeout(async () => {
					if (this._ms365Connection) {
						if (result.data?.objType === "User") {
							const user: User = result.data?.obj;
							lastResponse.respond([await this.createUserResult(user)]);
						} else if (result.data?.objType === "Contact") {
							const contact: Contact = result.data?.obj;
							lastResponse.respond([await this.createContactResult(contact)]);
						} else if (result.data?.objType === "Message") {
							const message: Message = result.data?.obj;
							lastResponse.respond([await this.createMessageResult(message)]);
						} else if (result.data?.objType === "Event") {
							const event: Event = result.data?.obj;
							lastResponse.respond([await this.createEventResult(event)]);
						}
					}
				}, 0);
			}
			return true;
		} else if (result.action.trigger === "user-action") {
			const {
				email,
				phone,
				url,
				json
			}: {
				email?: string;
				phone?: string;
				url?: string;
				json?: unknown;
			} = result.data;

			if (result.action.name === Microsoft365Provider._ACTION_TEAMS_CALL) {
				this._logger.info("Teams Call", email);
				const teamsConnection = new TeamsConnection(this._ms365Connection);
				await teamsConnection.startCall([email]);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_TEAMS_MEETING) {
				this._logger.info("Create Meeting", this._ms365Connection.currentUser.mail, email);
				await fin.System.openUrlWithBrowser(
					`msteams:/l/meeting/new?attendees=${this._ms365Connection.currentUser.mail},${email}`
				);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_TEAMS_CHAT) {
				this._logger.info("Chat", this._ms365Connection.currentUser.mail, email);
				const teamsConnection = new TeamsConnection(this._ms365Connection);
				await teamsConnection.openGroupChat([this._ms365Connection.currentUser.mail, email]);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_OUTLOOK_EMAIL) {
				this._logger.info("Open Mail", email);

				const response = await this._ms365Connection.executeApiRequest<Message>("/v1.0/me/messages", "POST", {
					toRecipients: [
						{
							emailAddress: {
								address: email
							}
						}
					]
				});

				const uri = new URL(response.data?.webLink);

				if (uri.searchParams.has("ItemID")) {
					const itemId = encodeURIComponent(uri.searchParams.get("ItemID"));
					await this._integrationHelpers.launchView(
						`https://outlook.office365.com/mail/deeplink/compose/${itemId}?ItemID=${itemId}&exvsurl=1`
					);
				} else {
					await this._integrationHelpers.launchView(response.data.webLink);
				}
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_OUTLOOK_EVENT) {
				this._logger.info("Open Mail", email);

				const response = await this._ms365Connection.executeApiRequest<Event>("/v1.0/me/events", "POST", {
					attendees: [
						{
							emailAddress: {
								address: email
							}
						}
					]
				});

				const uri = new URL(response.data?.webLink);

				if (uri.searchParams.has("itemid")) {
					const itemId = encodeURIComponent(uri.searchParams.get("itemid"));
					await this._integrationHelpers.launchView(
						`https://outlook.office365.com/calendar/deeplink/compose/${itemId}?ItemID=${itemId}&exvsurl=1`
					);
				} else {
					await this._integrationHelpers.launchView(response.data.webLink);
				}
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_CALL) {
				this._logger.info("Phone Call", phone);
				await fin.System.openUrlWithBrowser(`tel:${phone}`);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_OPEN) {
				this._logger.info("Open", url);
				await this._integrationHelpers.launchView(url);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_COPY) {
				this._logger.info("Copy JSON", json);
				await fin.Clipboard.writeText({ data: JSON.stringify(json, undefined, "\t") });
				return true;
			}
		}

		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private createResult(response: GraphResult<any>): HomeSearchResult {
		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-rest`,
			title: "Graph Result",
			label: response.status === 200 ? "JSON" : "Error",
			icon: this._settings.images.teams,
			actions: [
				{
					name: Microsoft365Provider._ACTION_COPY,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				json: response.data
			},
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
			Event: this._settings.images.calendar
		};

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${obj.id}`,
			title: (obj[title] as unknown as string) ?? `Untitled ${objType}`,
			label: objType,
			icon: icons[objType],
			actions: [],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType,
				obj,
				state: "loading"
			},
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

			const response = await this._ms365Connection.executeApiRequest<GraphBatchRequestResponse>(
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

		const pairData = {};
		for (const pair of pairs) {
			pairData[`${pair.label}Title`] = pair.label;
			pairData[pair.label] = pair.value;
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
				email: user.mail,
				phone
			},
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
								paddingBottom: "15px",
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
					...pairData,
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

			const response = await this._ms365Connection.executeApiRequest<GraphBatchRequestResponse>(
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

		const pairData = {};
		for (const pair of pairs) {
			pairData[`${pair.label}Title`] = pair.label;
			pairData[pair.label] = pair.value;
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
				action: Microsoft365Provider._ACTION_CALL,
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
			title: contact.displayName,
			label: "Contact",
			icon: this._settings.images.contact,
			actions: [
				{
					name: Microsoft365Provider._ACTION_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				objType: "Contact",
				obj: contact,
				email,
				phone
			},
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
								paddingBottom: "15px",
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
					...pairData,
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

		const pairs: { label: string; value: string; hideLabel?: boolean }[] = [];

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
				hideLabel: true
			});
		}

		const pairData = {};
		for (const pair of pairs) {
			pairData[`${pair.label}Title`] = pair.label;
			pairData[pair.label] = pair.value;
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
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("subject", 14, { fontWeight: "bold" })], {
							paddingBottom: "15px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await createText("preview"),
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
					...pairData,
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

			const response = await this._ms365Connection.executeApiRequest<GraphBatchRequestResponse>(
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

		const pairs: { label: string; value: string; hideLabel?: boolean }[] = [];

		pairs.push({
			label: "Start",
			value: new Date(event.start?.dateTime).toLocaleString()
		});

		pairs.push({
			label: "End",
			value: new Date(event.end?.dateTime).toLocaleString()
		});

		pairs.push({
			label: "Preview",
			value: event.bodyPreview,
			hideLabel: true
		});

		const pairData = {};
		for (const pair of pairs) {
			pairData[`${pair.label}Title`] = pair.label;
			pairData[pair.label] = pair.value;
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
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer("row", [await createText("subject", 14, { fontWeight: "bold" })], {
							paddingBottom: "15px",
							borderBottom: `1px solid ${theme.palette.background6}`,
							gap: "10px"
						}),
						await this.createPairsLayout(theme, pairs),
						await createText("preview"),
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
					...pairData,
					openTitle: "Open Outlook",
					openImage: this._settings.images.outlook
				}
			}
		};
	}

	private async createPairsLayout(
		theme: CustomThemeOptions,
		pairs: { label: string; value: string; hideLabel?: boolean }[]
	): Promise<TemplateFragment> {
		return createContainer(
			"column",
			await Promise.all(
				pairs.map(async (p) =>
					createContainer(
						"row",
						!p.hideLabel
							? [
									await createText(`${p.label}Title`, 12, {
										color: theme.palette.inputPlaceholder,
										flex: 1
									}),
									await createText(`${p.label}`, 12, { flex: 2 })
							  ]
							: [await createText(`${p.label}`, 12, { flex: 1 })],
						{
							justifyContent: "space-between",
							gap: "10px"
						}
					)
				)
			),
			{ gap: "5px", flex: "1" }
		);
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
}
