import {
    CLIDispatchedSearchResult,
    CLISearchResponse, CLISearchResult,
    CLITemplate,
    HomeSearchResult
} from "@openfin/workspace";
import { CustomSettings } from "./shapes";
import { getEmojiTemplate } from "./templates";
import * as emoji from "node-emoji";

export const providerId: string = "emoji";

export const EMOJI_PROVIDER_COPY_EMOJI_ACTION = "Copy Emoji";
export const EMOJI_PROVIDER_COPY_KEY_ACTION = "Copy Key";
export const EMOJI_PROVIDER_DETAILS_ACTION = "Emoji Details";

export async function emojiProviderGetResults(settings: CustomSettings, query: string): Promise<CLISearchResponse> {
    const results: CLISearchResult<any>[] = [];

    if (query.startsWith("/emoji ")) {
        let key = query.slice(7);

        if (key.length > 0) {
            key = key.toLowerCase();

            // Find exact match first if there is one
            const matchEmoji = emoji.get(key);
            if (matchEmoji && !matchEmoji.startsWith(":")) {
                results.push(createResult(key, matchEmoji));
            }

            // Find all other potential matches
            const searchResult = emoji.search(key);

            for (const result of searchResult) {
                if (result.emoji !== matchEmoji) {
                    results.push(createResult(result.key, result.emoji));
                }
            }
        }
    }

    return {
        results
    };
}

function createResult(key: string, emoji: string): HomeSearchResult {
    return {
        key: `emoji-${key}`,
        title: key,
        label: "App",
        actions: [
            { name: EMOJI_PROVIDER_COPY_EMOJI_ACTION, hotkey: "CmdOrCtrl+C" },
            { name: EMOJI_PROVIDER_DETAILS_ACTION, hotkey: "Enter" }
        ],
        data: {
            providerId,
            key,
            emoji,
            url: `https://emojipedia.org/search/?q=${key}`
        },
        template: CLITemplate.Custom,
        templateContent: {
            layout: getEmojiTemplate({ 
                copyEmojiAction: EMOJI_PROVIDER_COPY_EMOJI_ACTION, 
                copyKeyAction: EMOJI_PROVIDER_COPY_KEY_ACTION, 
                detailsAction: EMOJI_PROVIDER_DETAILS_ACTION 
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

export async function emojiProviderHandleAction(result: CLIDispatchedSearchResult): Promise<void> {
    if (result.action.name === EMOJI_PROVIDER_COPY_EMOJI_ACTION && result.data.emoji) {
        await fin.Clipboard.writeText({ data: result.data.emoji });
    } else if (result.action.name === EMOJI_PROVIDER_COPY_KEY_ACTION && result.data.key) {
        await fin.Clipboard.writeText({ data: result.data.key });
    } else if (result.action.name === EMOJI_PROVIDER_DETAILS_ACTION && result.data.url) {
        await fin.System.openUrlWithBrowser(result.data.url);
    }
}
