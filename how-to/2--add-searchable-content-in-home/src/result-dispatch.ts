import type { Fin } from "openfin-adapter";
import type EntityType from "openfin-adapter/src/shapes/EntityType";

import type { DispatchedSearchResult } from "@openfin/search-api";

import { browserPlatformIdentity } from "./browser";

declare const fin: Fin<EntityType.WINDOW>;

/**
 * A enum with a UI friendly name for each action.
 */
export enum ActionType {
  /**
   * Action type of opening a single emoji in Emojipedia.
   */
  OpenInEmojipedia = "Open In Emojipedia",

  /**
   * Action type of launching the Emojipedia application.
   */
  LaunchEmojipedia = "Launch"
}


/**
 * Actions for a search result representing the Emojipedia application.
 */
export const appActions = [ActionType.LaunchEmojipedia];

/**
 * Actions for a search result representing a single Emojipedia emoji.
 */
export const emojiActions = [ActionType.OpenInEmojipedia];

/**
 * Launch a view into the Browser platform.
 * @param url the url of the view.
 */
async function launchView(name: string, url: string) {
  const platform = fin.Platform.wrapSync(browserPlatformIdentity);
  const view = await platform.createView({
    url,
    name,
    backgroundColor: "#FFFFFF",
    target: undefined,
  });
  view.executeJavaScript('document.body.style.backgroundColor="white"');
}

/**
 * Implementation logic for opening an emoji in Emojipedia.
 * @param emoji the emoji to open.
 */
function openInEmojipedia(emoji: string) {
  const url = `https://emojipedia.org/${emoji}/`;
  return launchView(emoji, url);
}

/**
 * Implementation logic for launching the Emojipedia application.
 */
function launchEmojipedia() {
  const url = `https://emojipedia.org/`;
  return launchView("emojipedia", url);
}

/**
 * A function for handling search results that were actioned (clicked, hotkey pressed, ect. in the Home UI)
 * and dispatched back to the search provider.
 * @param result the search result with the action that was selected by the user.
 */
export function handleResultDispatch(result: DispatchedSearchResult) {
  if (result.action === ActionType.OpenInEmojipedia) {
    openInEmojipedia(result.data.emoji);
  } else if (result.action === ActionType.LaunchEmojipedia) {
    launchEmojipedia();
  }
}
