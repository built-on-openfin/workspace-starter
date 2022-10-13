import type { Presence, Team, User } from "@microsoft/microsoft-graph-types";
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
	TemplateFragmentTypes
} from "@openfin/workspace";
import type { Integration, IntegrationHelpers, IntegrationModule } from "../../integrations-shapes";
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
	private static readonly _ACTION_CALL = "Call";

	/**
	 * The key to use for a email key action.
	 * @internal
	 */
	private static readonly _ACTION_EMAIL = "Email";

	/**
	 * The key to use for a calendar key action.
	 * @internal
	 */
	private static readonly _ACTION_CALENDAR = "Calendar";

	/**
	 * The key to use for a chat key action.
	 * @internal
	 */
	private static readonly _ACTION_CHAT = "Chat";

	/**
	 * The key to use for a copy key action.
	 * @internal
	 */
	private static readonly _ACTION_COPY = "Copy JSON to Clipboard";

	/**
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

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
	 * The me object.
	 */
	private _me?: User;

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
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._settings = definition.data;

		try {
			enableLogging();
			this._ms365Connection = await connect(
				this._settings.clientId,
				this._settings.tenantId,
				"http://localhost:9999/redirect",
				// https://learn.microsoft.com/en-us/graph/permissions-reference
				["User.Read", "Presence.Read", "Presence.Read.All", "Directory.Read.All"]
			);
			const result = await this._ms365Connection.executeApiRequest<User>("/v1.0/me");
			if (result.status === 200) {
				this._me = result.data;
			}
		} catch (err) {
			console.error(err);
		}
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		if (this._ms365Connection) {
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
					if (query.startsWith("/ms/")) {
						const path = query.replace("/ms/", "");
						if (path.length > 0) {
							const response = await this._ms365Connection.executeApiRequest(`/v1.0/${path}`);
							lastResponse.respond([this.createResult(response)]);
						}
					} else if (query.length > 3) {
						// try a user lookup instead
						const searchFields: (keyof User)[] = ["displayName", "givenName", "surname"];
						const searchQuery = searchFields.map((s) => `startsWith(${s},'${query}')`).join(" or ");

						const response = await this._ms365Connection.executeApiRequest<GraphListResponse<User>>(
							`/v1.0/users?$filter=${searchQuery}&$top=10`
						);
						lastResponse.respond(response.data.value.map((c) => this.createLoadingResult(c)));
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
		if (result.action.trigger === "focus-change" && result.data?.state === "loading") {
			setTimeout(async () => {
				if (this._ms365Connection) {
					const user: User = result.data?.user;
					lastResponse.respond([await this.createUserResult(user)]);
				}
			}, 0);
		} else if (result.action.trigger === "user-action") {
			const { user, json }: { user?: User; json?: unknown } = result.data;

			if (result.action.name === Microsoft365Provider._ACTION_CALL) {
				const teamsConnection = new TeamsConnection(this._ms365Connection);
				await teamsConnection.startCall([user.mail]);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_EMAIL) {
				await fin.System.openUrlWithBrowser(`mailto:${user.mail}`);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_CALENDAR) {
				await fin.System.openUrlWithBrowser(`msteams:/l/meeting/new?attendees=${this._me.mail},${user.mail}`);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_CHAT) {
				const teamsConnection = new TeamsConnection(this._ms365Connection);
				await teamsConnection.openGroupChat([this._me.mail, user.mail]);
				return true;
			} else if (result.action.name === Microsoft365Provider._ACTION_COPY) {
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

	private createLoadingResult(user: User): HomeSearchResult {
		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${user.id}`,
			title: user.displayName,
			label: user.department ?? "No Department",
			icon: this._settings.images.teamsLogo,
			actions: [],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				user,
				state: "loading"
			},
			template: CLITemplate.Loading,
			templateContent: undefined
		};
	}

	private async createUserResult(user: User): Promise<HomeSearchResult> {
		let profilePicData: string | undefined;
		let presence: Presence | undefined;
		let availableColor: "red" | "green" | "orange" = "red";
		let availableIcon: string = this.iconCross(16);
		let availability: string = "Unknown";
		let teams = ["No Teams"];

		const batchRequests: string[] = [
			`/users/${user.id}/photo/$value`,
			`/users/${user.id}/presence`,
			`/users/${user.id}/memberOf`
		];

		try {
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
				profilePicData = `data:image/jpeg;base64,${profileResponse.body as string}`;
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
			}
		} catch (err) {
			console.error(err);
		}

		const theme = await getCurrentTheme();

		let phone = user.mobilePhone;
		if (!phone && user.businessPhones?.length) {
			phone = user.businessPhones[0];
		}

		return {
			key: `${Microsoft365Provider._PROVIDER_ID}-${user.id}`,
			title: user.displayName,
			label: user.department ?? "No Department",
			icon: this._settings.images.teamsLogo,
			actions: [
				{
					name: Microsoft365Provider._ACTION_CALL,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: Microsoft365Provider._PROVIDER_ID,
				user,
				presence
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await createContainer(
					"column",
					[
						await createContainer(
							"row",
							[
								await createImage("profilePicData", user.displayName, {
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
						await createContainer(
							"column",
							[
								await createContainer(
									"row",
									[
										await createText("departmentTitle", 12, {
											color: theme.palette.inputPlaceholder,
											flex: 1
										}),
										await createText("department", 12, { flex: 2 })
									],
									{
										justifyContent: "space-between",
										gap: "10px"
									}
								),
								await createContainer(
									"row",
									[
										await createText("titleTitle", 12, { color: theme.palette.inputPlaceholder, flex: 1 }),
										await createText("title", 12, { flex: 2 })
									],
									{
										justifyContent: "space-between",
										gap: "10px"
									}
								),
								await createContainer(
									"row",
									[
										await createText("phoneTitle", 12, { color: theme.palette.inputPlaceholder, flex: 1 }),
										await createText("phone", 12, { flex: 2 })
									],
									{
										justifyContent: "space-between",
										gap: "10px"
									}
								),
								await createContainer(
									"row",
									[
										await createText("teamsTitle", 12, { color: theme.palette.inputPlaceholder, flex: 1 }),
										await createText("teams", 12, { flex: 2 })
									],
									{
										justifyContent: "space-between",
										gap: "10px"
									}
								)
							],
							{ gap: "5px" }
						),
						await createContainer(
							"row",
							[
								await createButton(
									ButtonStyle.Secondary,
									"teamCallTitle",
									Microsoft365Provider._ACTION_CALL,
									{
										border: "none",
										borderRadius: "50%",
										width: "40px",
										height: "40px",
										padding: "0px",
										justifyContent: "center"
									},
									[await createImage("teamCallImage", "Teams Call", { width: "16px", height: "16px" })]
								),
								await createButton(
									ButtonStyle.Secondary,
									"teamEmailTitle",
									Microsoft365Provider._ACTION_EMAIL,
									{
										border: "none",
										borderRadius: "50%",
										width: "40px",
										height: "40px",
										padding: "0px",
										justifyContent: "center"
									},
									[await createImage("teamEmailImage", "Teams Email", { width: "16px", height: "16px" })]
								),
								await createButton(
									ButtonStyle.Secondary,
									"teamCalendarTitle",
									Microsoft365Provider._ACTION_CALENDAR,
									{
										border: "none",
										borderRadius: "50%",
										width: "40px",
										height: "40px",
										padding: "0px",
										justifyContent: "center"
									},
									[
										await createImage("teamCalendarImage", "Teams Calendar", {
											width: "16px",
											height: "16px"
										})
									]
								),
								await createButton(
									ButtonStyle.Secondary,
									"teamChatTitle",
									Microsoft365Provider._ACTION_CHAT,
									{
										border: "none",
										borderRadius: "50%",
										width: "40px",
										height: "40px",
										padding: "0px",
										justifyContent: "center"
									},
									[await createImage("teamChatImage", "Teams Chat", { width: "16px", height: "16px" })]
								)
							],
							{
								justifyContent: "space-between"
							}
						)
					],
					{
						padding: "10px",
						gap: "15px"
					}
				),
				data: {
					profilePicData: profilePicData ?? `data:image/svg+xml;utf8,${this.imageProfileNone(44)}`,
					status: `data:image/svg+xml;utf8,${availableIcon}`,
					displayName: user.displayName,
					availability,
					title: user.jobTitle ?? "Employee",
					departmentTitle: "Department",
					department: user.department ?? "No Department",
					titleTitle: "Title",
					phoneTitle: "Phone",
					phone: phone ?? "No Phone",
					teamsTitle: "Teams",
					teams: teams.join(", "),
					teamsLogo: this._settings.images.teamsLogo,
					teamCallTitle: " ",
					teamCallImage: this._settings.images.teamsLogo,
					teamEmailTitle: " ",
					teamEmailImage: this._settings.images.email,
					teamCalendarTitle: " ",
					teamCalendarImage: this._settings.images.calendar,
					teamChatTitle: " ",
					teamChatImage: this._settings.images.chat
				}
			}
		};
	}

	private imageProfileNone(size: number): string {
		return `<svg fill="%23DDDDDD" viewBox="0 0 512 512" height="${size}px" width="${size}px" xmlns="http://www.w3.org/2000/svg">
		<rect width="512" height="512" />
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
}
