import type { Contact, Entity, Message, Presence, Team, User } from "@microsoft/microsoft-graph-types";
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
import type { Microsoft365Settings } from "./shapes";

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
	 * The key to use for a email key action.
	 * @internal
	 */
	private static readonly _ACTION_EMAIL = "Email";

	/**
	 * The key to use for a meeting key action.
	 * @internal
	 */
	private static readonly _ACTION_MEETING = "Meeting";

	/**
	 * The key to use for a chat key action.
	 * @internal
	 */
	private static readonly _ACTION_CHAT = "Chat";

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
					"Mail.Read",
					"Contacts.Read"
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
						// try a user lookup instead
						const encodedQuery = encodeURIComponent(query);

						const userSearchFields: (keyof User)[] = ["displayName", "givenName", "surname"];
						const userSearchQuery = userSearchFields
							.map((s) => `startsWith(${s},'${encodedQuery}')`)
							.join(" or ");
						const usersRequest = `/users?$filter=${userSearchQuery}&$top=10`;

						const contactsRequest = `/me/contacts?$search=${encodedQuery}&$top=10`;

						const messagesRequest = `/me/messages?$select=sender,subject,bodyPreview,receivedDateTime,webLink&$search=${encodedQuery}`;

						const batchRequests: string[] = [usersRequest, contactsRequest, messagesRequest];

						this._logger.info("Graph API Batch Request", {
							users: usersRequest,
							contacts: contactsRequest
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

						let homeResults: HomeSearchResult[] = [];

						const userResponse = response.data?.responses.find((r) => r.id === "1");
						if (userResponse?.status === 200) {
							this._logger.info("User Response", userResponse.body);

							const users = (userResponse.body as GraphListResponse<User>).value;
							homeResults = homeResults.concat(
								users.map((u) => this.createLoadingResult(u, "displayName", "User"))
							);
						} else {
							this._logger.error("User Response Failed", userResponse.status, userResponse.body);
						}

						const contactsResponse = response.data?.responses.find((r) => r.id === "2");
						if (contactsResponse?.status === 200) {
							this._logger.info("Contacts Response", userResponse.body);

							const contacts = (contactsResponse.body as GraphListResponse<Contact>).value;
							homeResults = homeResults.concat(
								contacts.map((c) => this.createLoadingResult(c, "displayName", "Contact"))
							);
						} else {
							this._logger.error("Contacts Response Failed", contactsResponse.status, contactsResponse.body);
						}

						const messagesResponse = response.data?.responses.find((r) => r.id === "3");
						if (messagesResponse?.status === 200) {
							this._logger.info("Messages Response", userResponse.body);

							const messages = (messagesResponse.body as GraphListResponse<Message>).value;
							homeResults = homeResults.concat(
								messages.map((c) => this.createLoadingResult(c, "subject", "Message"))
							);
						} else {
							this._logger.error("Messages Response Failed", messagesResponse.status, messagesResponse.body);
						}

						lastResponse.respond(homeResults);
					}
				} catch (err) {
					if (err instanceof Error) {
						lastResponse.respond([this.createResult({ status: 400, data: err })]);
					}
				}
			}
		}, 500);

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
			} else if (result.action.name === Microsoft365Provider._ACTION_EMAIL) {
				this._logger.info("Open Mail", email);
				await fin.System.openUrlWithBrowser(`mailto:${email}`);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_CALL) {
				this._logger.info("Phone Call", phone);
				await fin.System.openUrlWithBrowser(`tel:${phone}`);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_MEETING) {
				this._logger.info("Create Meeting", this._ms365Connection.currentUser.mail, email);
				await fin.System.openUrlWithBrowser(
					`msteams:/l/meeting/new?attendees=${this._ms365Connection.currentUser.mail},${email}`
				);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_CHAT) {
				this._logger.info("Chat", this._ms365Connection.currentUser.mail, email);
				const teamsConnection = new TeamsConnection(this._ms365Connection);
				await teamsConnection.openGroupChat([this._ms365Connection.currentUser.mail, email]);
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
			icon: this._settings.images.teamsLogo,
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
		objType: "User" | "Contact" | "Message"
	): HomeSearchResult {
		const icons = {
			User: this._settings.images.teamsLogo,
			Contact: this._settings.images.contact,
			Message: this._settings.images.email
		};

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${obj.id}`,
			title: obj[title] as unknown as string,
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
				action: Microsoft365Provider._ACTION_EMAIL,
				image: "emailImage",
				imageAltText: "E-mail"
			},
			{
				title: "meetingTitle",
				action: Microsoft365Provider._ACTION_MEETING,
				image: "meetingImage",
				imageAltText: "Meeting"
			},
			{
				title: "chatTitle",
				action: Microsoft365Provider._ACTION_CHAT,
				image: "chatImage",
				imageAltText: "Chat"
			}
		];

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${user.id}`,
			title: user.displayName,
			label: "User",
			icon: this._settings.images.teamsLogo,
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
					teamsLogo: this._settings.images.teamsLogo,
					callTitle: " ",
					callImage: this._settings.images.teamsLogo,
					emailTitle: " ",
					emailImage: this._settings.images.email,
					meetingTitle: " ",
					meetingImage: this._settings.images.calendar,
					chatTitle: " ",
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
				action: Microsoft365Provider._ACTION_EMAIL,
				image: "emailImage",
				imageAltText: "E-mail"
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
					callTitle: " ",
					callImage: this._settings.images.call,
					emailTitle: " ",
					emailImage: this._settings.images.email
				}
			}
		};
	}

	private async createMessageResult(message: Message): Promise<HomeSearchResult> {
		const theme = await getCurrentTheme();

		const pairs: { label: string; value: string; hideLabel?: boolean }[] = [];

		pairs.push({
			label: "From",
			value: message.sender.emailAddress.name ?? message.sender.emailAddress.address
		});

		pairs.push({
			label: "Received",
			value: new Date(message.receivedDateTime).toLocaleString()
		});

		pairs.push({
			label: "Preview",
			value: message.bodyPreview,
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
			key: `${Microsoft365Provider._PROVIDER_ID}-${message.id}`,
			title: message.subject,
			label: "Message",
			icon: this._settings.images.email,
			actions: [
				{
					name: Microsoft365Provider._ACTION_CALL,
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
					openTitle: " ",
					openImage: this._settings.images.email
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
}
