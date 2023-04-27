import {
	ButtonStyle,
	CLITemplate,
	type TemplateFragment,
	type CLIFilter,
	type HomeDispatchedSearchResult,
	type HomeSearchListenerResponse,
	type HomeSearchResponse,
	type HomeSearchResult
} from "@openfin/workspace";
import * as emoji from "node-emoji";

/**
 * Implement the source for Emojis.
 */
export class EmojiSource {
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
	 * The helpers for the source.
	 * @internal
	 */
	private _helpers: { openUrl: (url: string) => Promise<void> } | undefined;

	/**
	 * The settings for the source.
	 * @internal
	 */
	private _definition: { id: string; data?: unknown } | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param definition.id The id for the module.
	 * @param definition.data The custom data for the module.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods from the platform.
	 * @param helpers.openUrl Method for opening a url.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: {
			id: string;
			data?: unknown;
		},
		loggerCreator: () => void,
		helpers: { openUrl: (url: string) => Promise<void> }
	): Promise<void> {
		this._definition = definition;
		this._helpers = helpers;
	}

	/**
	 * Get a list of the static help entries.
	 * @returns The list of help entries.
	 */
	public async getHelpSearchEntries(): Promise<HomeSearchResult[]> {
		return [
			{
				key: `${this._definition?.id}-help`,
				title: "/emoji",
				label: "Help",
				actions: [],
				data: {
					providerId: this._definition?.id,
					populateQuery: "/emoji "
				},
				template: CLITemplate.Custom,
				templateContent: {
					layout: {
						type: "Container",
						style: { display: "flex", flexDirection: "column", padding: "10px" },
						children: [
							{
								type: "Text",
								dataKey: "title",
								style: {
									color: "#FFFFFF",
									fontSize: "16px",
									fontWeight: "bold",
									marginBottom: "10px",
									borderBottom: "1px solid #53565F"
								}
							},
							{ type: "Text", dataKey: "desc-0", style: { fontSize: "12px", padding: "6px 0px" } },
							{ type: "Text", dataKey: "desc-1", style: { fontSize: "12px", padding: "6px 0px" } },
							{
								type: "Container",
								style: {
									display: "flex",
									flexDirection: "column",
									padding: "10px",
									marginTop: "6px",
									backgroundColor: "#53565F",
									color: "#FFFFFF",
									borderRadius: "5px",
									overflow: "auto"
								},
								children: [
									{
										type: "Text",
										dataKey: "line-0",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									},
									{
										type: "Text",
										dataKey: "line-1",
										style: { fontSize: "12px", fontFamily: "monospace", whiteSpace: "nowrap" }
									}
								]
							}
						]
					},
					data: {
						title: "/emoji",
						"desc-0": "The emoji command can be used to search for emojis by name.",
						"desc-1": "For example to search for emojis which include `woman` or `man` in their name.",
						"line-0": "/emoji woman",
						"line-1": "/emoji man"
					}
				}
			}
		];
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
	 * An entry has been selected.
	 * @param result The dispatched result.
	 * @param lastResponse The last response.
	 * @returns True if the item was handled.
	 */
	public async itemSelection(
		result: HomeDispatchedSearchResult,
		lastResponse: HomeSearchListenerResponse
	): Promise<boolean> {
		if (result.action.trigger === "user-action") {
			if (result.action.name === EmojiSource._EMOJI_PROVIDER_COPY_EMOJI_ACTION && result.data.emoji) {
				await fin.Clipboard.writeText({ data: result.data.emoji });
				return true;
			} else if (result.action.name === EmojiSource._EMOJI_PROVIDER_COPY_KEY_ACTION && result.data.key) {
				await fin.Clipboard.writeText({ data: result.data.key });
				return true;
			} else if (
				result.action.name === EmojiSource._EMOJI_PROVIDER_DETAILS_ACTION &&
				this._helpers?.openUrl &&
				result.data.url
			) {
				await this._helpers?.openUrl(result.data.url as string);
				return true;
			}
		}

		return false;
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
					name: EmojiSource._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
					hotkey: "CmdOrCtrl+C"
				},
				{
					name: EmojiSource._EMOJI_PROVIDER_DETAILS_ACTION,
					hotkey: "Enter"
				}
			],
			data: {
				providerId: this._definition?.id,
				key,
				emoji: symbol,
				url: `https://emojipedia.org/${key.replace(/_/g, "-")}/`
			},
			template: CLITemplate.Custom,
			templateContent: {
				layout: await this.getEmojiTemplate(),
				data: {
					title: `Emoji ${key}`,
					copyKeyTitle: "Copy Key",
					key,
					copyEmojiTitle: "Copy Emoji",
					emoji: symbol,
					detailsTitle: "Further Details"
				}
			}
		};
	}

	/**
	 * Create the display template.
	 * @returns The template for the emoji.
	 */
	private async getEmojiTemplate(): Promise<TemplateFragment> {
		return {
			type: "Container",
			style: { display: "flex", flex: "1", flexDirection: "column", padding: "10px" },
			children: [
				{
					type: "Container",
					style: { display: "flex", flex: "1", flexDirection: "column" },
					children: [
						{
							type: "Text",
							dataKey: "title",
							style: {
								color: "#FFFFFF",
								fontSize: "16px",
								fontWeight: "bold",
								marginBottom: "10px",
								borderBottom: "1px solid #53565F",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
								overflow: "hidden"
							}
						},
						{
							type: "Container",
							style: {
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: "10px",
								marginBottom: "10px"
							},
							children: [
								{
									type: "Text",
									dataKey: "key",
									style: { fontSize: "12px", color: "#FFFFFF", wordBreak: "break-all" }
								},
								{
									type: "Button",
									buttonStyle: ButtonStyle.Secondary,
									children: [{ type: "Text", dataKey: "copyKeyTitle", style: { fontSize: "12px" } }],
									action: EmojiSource._EMOJI_PROVIDER_COPY_KEY_ACTION,
									style: { border: "1px solid #FFFFFF", fontSize: "12px" }
								}
							]
						},
						{
							type: "Container",
							style: {
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: "10px",
								marginBottom: "10px"
							},
							children: [
								{ type: "Text", dataKey: "emoji", style: { fontSize: "32px", color: "#FFFFFF" } },
								{
									type: "Button",
									buttonStyle: ButtonStyle.Secondary,
									children: [{ type: "Text", dataKey: "copyEmojiTitle", style: { fontSize: "12px" } }],
									action: EmojiSource._EMOJI_PROVIDER_COPY_EMOJI_ACTION,
									style: { border: "1px solid #FFFFFF", fontSize: "12px" }
								}
							]
						}
					]
				},
				{
					type: "Container",
					style: { display: "flex", flexDirection: "row", justifyContent: "flex-end" },
					children: [
						{
							type: "Button",
							buttonStyle: ButtonStyle.Primary,
							children: [{ type: "Text", dataKey: "detailsTitle", style: { fontSize: "12px" } }],
							action: EmojiSource._EMOJI_PROVIDER_DETAILS_ACTION,
							style: { fontSize: "12px" }
						}
					]
				}
			]
		};
	}
}
