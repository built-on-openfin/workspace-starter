import {
  CLITemplate,
  type CLIDispatchedSearchResult,
  type CLIFilter,
  type CLISearchListenerResponse,
  type HomeSearchResponse,
  type HomeSearchResult
} from "@openfin/workspace";
import type { Integration, IntegrationManager, IntegrationModule } from "../../integrations-shapes";
import type { EmojiSettings } from "./shapes";
import { getEmojiTemplate } from "./templates";
import * as emoji from "node-emoji";

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
   * The integration manager.
   * @internal
   */
  private _integrationManager: IntegrationManager | undefined;

  /**
   * The module is being registered.
   * @param integrationManager The manager for the integration.
   * @param integration The integration details.
   * @returns Nothing.
   */
  public async register(
    integrationManager: IntegrationManager,
    integration: Integration<EmojiSettings>
  ): Promise<void> {
    this._integrationManager = integrationManager;
  }

  /**
   * The module is being deregistered.
   * @param integration The integration details.
   * @returns Nothing.
   */
  public async deregister(integration: Integration<EmojiSettings>): Promise<void> {}

  /**
   * Get a list of the static application entries.
   * @param integration The integration details.
   * @returns The list of application entries.
   */
  public async getAppSearchEntries(integration: Integration<EmojiSettings>): Promise<HomeSearchResult[]> {
    const results = [];

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
    integration: Integration<EmojiSettings>,
    result: CLIDispatchedSearchResult,
    lastResponse: CLISearchListenerResponse
  ): Promise<boolean> {
    if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION && result.data.emoji) {
      await fin.Clipboard.writeText({ data: result.data.emoji });
      return true;
    } else if (result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_KEY_ACTION && result.data.key) {
      await fin.Clipboard.writeText({ data: result.data.key });
      return true;
    } else if (
      result.action.name === EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION &&
      result.data.url &&
      this._integrationManager.openUrl
    ) {
      await this._integrationManager.openUrl(result.data.url);
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
    integration: Integration<EmojiSettings>,
    query: string,
    filters: CLIFilter[],
    lastResponse: CLISearchListenerResponse
  ): Promise<HomeSearchResponse> {
    const results = [];

    if (query.startsWith("/emoji ")) {
      let key = query.slice(7);

      if (key.length > 0) {
        key = key.toLowerCase();

        // Find exact match first if there is one
        const matchEmoji = emoji.get(key);
        if (matchEmoji && !matchEmoji.startsWith(":")) {
          results.push(this.createResult(key, matchEmoji));
        }

        // Find all other potential matches
        const searchResult = emoji.search(key);

        for (const result of searchResult) {
          if (result.emoji !== matchEmoji) {
            results.push(this.createResult(result.key, result.emoji));
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
   * @param emoji The emoji symbol.
   * @returns The search result.
   */
  private createResult(key: string, emoji: string): HomeSearchResult {
    return {
      key: `emoji-${key}`,
      title: key,
      label: "Information",
      actions: [
        { name: EmojiIntegrationProvider._EMOJI_PROVIDER_COPY_EMOJI_ACTION, hotkey: "CmdOrCtrl+C" },
        { name: EmojiIntegrationProvider._EMOJI_PROVIDER_DETAILS_ACTION, hotkey: "Enter" }
      ],
      data: {
        providerId: EmojiIntegrationProvider._PROVIDER_ID,
        key,
        emoji,
        url: `https://emojipedia.org/${key}/`
      },
      template: CLITemplate.Custom,
      templateContent: {
        layout: getEmojiTemplate({
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
          emoji,
          detailsTitle: "Further Details"
        }
      }
    };
  }
}
