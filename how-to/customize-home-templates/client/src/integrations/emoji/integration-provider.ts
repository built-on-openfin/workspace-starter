import {
	CLITemplate,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import * as emoji from "node-emoji";
import type { IntegrationHelpers, IntegrationModule, ModuleDefinition } from "../../integrations-shapes";
import { createHelp } from "../../templates";
import type { EmojiSettings } from "./shapes";
import { getEmojiTemplate } from "./templates";

/**
 * Implement the integration provider for Emojis.
 */
export class EmojiIntegrationProvider implements IntegrationModule<EmojiSettings> {
	/**
	 * Provider id.
	 * @internal
	 */
	private static readonly _PROVIDER_ID = "emoji";

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
	private _definition: ModuleDefinition<EmojiSettings> | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<EmojiSettings>,
		loggerCreator: () => void,
		helpers: IntegrationHelpers
	): Promise<void> {
		this._integrationHelpers = helpers;
		this._definition = definition;
	}

	/**
	 * The module is being deregistered.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries?(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${EmojiIntegrationProvider._PROVIDER_ID}-help`,
				title: "/emoji",
				label: "Help",
				icon: this._definition?.icon,
				actions: [],
				data: {
					providerId: EmojiIntegrationProvider._PROVIDER_ID,
					populateQuery: "/emoji "
				},
				template: CLITemplate.Custom,
				templateContent: await createHelp(
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
				providerId: EmojiIntegrationProvider._PROVIDER_ID,
				key,
				emoji: symbol,
				url: `https://emojipedia.org/${key}/`
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await getEmojiTemplate({
					copyEmojiAction: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
					copyKeyAction: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION,
					detailsAction: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION
				}),
				data: {
					keyTitle: "Key",
					copyKeyTitle: "Copy Key",
					key,
					emojiTitle: "Emoji",
					copyEmojiTitle: "Copy Emoji",
					emoji: symbol,
					detailsTitle: "Further Details"
				}
			}
		};
	}
}
