import {
	ButtonStyle,
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult,
	type PlainContainerTemplateFragment,
	type TemplateFragment
} from "@openfin/workspace";
import type {
	IntegrationHelpers,
	IntegrationModule,
	LoggerCreator,
	ModuleDefinition
} from "customize-workspace/shapes";
import * as emoji from "node-emoji";

/**
 * Implement the integration provider for Emojis.
 */
export class EmojiIntegrationProvider implements IntegrationModule {
	/**
	 * The key to use for a emoji result.
	 * @internal
	 */
	private static readonly _EMOJI_PROVIDER_DETAILS_ACTION = "Emoji Details";

	/**
	 * The key to use for a emoji copy key action.
	 * @internal
	 */
	private static readonly _EMOJI_PROVIDER_COPY_KEY_ACTION = "Copy Key";

	/**
	 * The key to use for a emoji copy key action.
	 * @internal
	 */
	private static readonly _EMOJI_PROVIDER_COPY_EMOJI_ACTION = "Copy Emoji";

	/**
	 * The integration helpers.
	 * @internal
	 */
	private _integrationHelpers: IntegrationHelpers | undefined;

	/**
	 * The settings for the integration.
	 * @internal
	 */
	private _definition: ModuleDefinition | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._definition = definition;
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition.id}-help`,
				title: "/emoji",
				label: "Help",
				icon: this._definition?.icon,
				actions: [],
				data: {
					providerId: this._definition.id,
					populateQuery: "/emoji "
				},
				template: CLITemplate.Custom,
				templateContent: await this._integrationHelpers.templateHelpers.createHelp(
					"/emoji",
					[
						"The emoji command can be used to search for emojis by name.",
						"For example to search for emojis which include `woman` or `man` in their name."
					],
					["/emoji woman", "/emoji man"]
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
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		const data: { url?: string } = result.data;

		if (result.action.trigger === "user-action") {
			if (
				result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION &&
				result.data.emoji
			) {
				await fin.Clipboard.writeText({ data: result.data.emoji });
				return true;
			} else if (
				result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION &&
				result.data.key
			) {
				await fin.Clipboard.writeText({ data: result.data.key });
				return true;
			} else if (
				result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION &&
				result.data.url &&
				this._integrationHelpers.openUrl
			) {
				await this._integrationHelpers.openUrl(data.url);
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
	 * @returns The list of results and new filters.
	 */
	public async getSearchResults(
		query: string,
		filters: CLIFilter[],
		lastResponse: HomeSearchListenerResponse
	): Promise<HomeSearchResponse> {
		const results: HomeSearchResult[] = [];

		if (query.startsWith("/emoji ")) {
			let key = query.slice(7);

			if (key.length > 0) {
				key = key.toLowerCase();

				// Find exact match first if there is one
				const matchEmoji = emoji.get(key);
				if (matchEmoji && !matchEmoji.startsWith(":")) {
					results.push(await this.createResult(key, matchEmoji));
				}

				// Find all other potential matches
				const searchResult = emoji.search(key);

				for (const result of searchResult) {
					if (result.emoji !== matchEmoji) {
						results.push(await this.createResult(result.key, result.emoji));
					}
				}
			}
		}

		return {
			results
		};
	}

	/**
	 * Create a search result.
	 * @param key The key for the emoji.
	 * @param symbol The emoji symbol.
	 * @returns The search result.
	 */
	private async createResult(key: string, symbol: string): Promise<HomeSearchResult> {
		return {
			key: `emoji-${key}`,
			title: key,
			label: "Information",
			actions: [
				{
					name: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
					hotkey: "CmdOrCtrl+C"
				},
				{
					name: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition.id,
				key,
				emoji: symbol,
				url: `https://emojipedia.org/${key.replace(/_/g, "-")}/`
			},
			template: CLITemplate.Custom,
			templateContent: await this.getEmojiTemplate(key, symbol)
		};
	}

	/**
	 * Get the template for the emoji.
	 * @param key The emoji key.
	 * @param symbol The emoji symbol.
	 * @returns The template.
	 */
	private async getEmojiTemplate(
		key: string,
		symbol: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<{ layout: PlainContainerTemplateFragment; data: any }> {
		const palette = await this._integrationHelpers.getCurrentPalette();

		const body: TemplateFragment[] = [
			await this._integrationHelpers.templateHelpers.createContainer(
				"row",
				[
					await this._integrationHelpers.templateHelpers.createText("key", 12, {
						color: palette.textDefault,
						wordBreak: "break-all"
					}),
					await this._integrationHelpers.templateHelpers.createButton(
						ButtonStyle.Secondary,
						"copyKeyTitle",
						EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION,
						{
							fontSize: "12px"
						}
					)
				],
				{
					justifyContent: "space-between",
					alignItems: "center",
					gap: "10px",
					marginBottom: "10px"
				}
			),
			await this._integrationHelpers.templateHelpers.createContainer(
				"row",
				[
					await this._integrationHelpers.templateHelpers.createText("emoji", 32, {
						color: palette.textDefault
					}),
					await this._integrationHelpers.templateHelpers.createButton(
						ButtonStyle.Secondary,
						"copyEmojiTitle",
						EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
						{
							fontSize: "12px"
						}
					)
				],
				{
					justifyContent: "space-between",
					alignItems: "center",
					gap: "10px",
					marginBottom: "10px"
				}
			)
		];

		const buttons = [
			{
				title: "Details",
				action: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION
			}
		];

		const layout = await this._integrationHelpers.templateHelpers.createLayout(
			`Emoji ${key}`,
			"",
			body,
			buttons
		);

		return {
			layout: layout.layout,
			data: {
				...layout.data,
				copyKeyTitle: "Copy Key",
				key,
				copyEmojiTitle: "Copy Emoji",
				emoji: symbol
			}
		};
	}
}
