import type {
  SearchProvider,
  SearchListenerRequest,
} from "@openfin/search-api";

import emojis from "../emojis";

import { emojiActions, handleResultDispatch } from "../result-dispatch";

/**
 * Handler for responding to search requests.
 * @param req an object that represents the search request.
 * @returns a list of emoji search results.
 */
async function handlePullSearch(req: SearchListenerRequest) {
  // Only respond if the request query is `pull emoji`.
  if (req.query !== "pull emoji") return [];

  // Search handlers can be async.
  await new Promise((res) => setTimeout(res, 1000));

  // Return mapped search results.
  return emojis.map((emoji) => ({
    title: "I am feeling " + emoji,
    key: emoji,
    description: "See it on the Emojipedia!",
    data: { emoji },
    actions: emojiActions,
  }));
}

/**
 * A search provider that responds to queries by returning all of its search results up front.
 *
 * Aside from the simpler syntax, using a search handler that returns its results up front,
 * the search requester can pull in the search results in a single short lived request.
 *
 * This is in contrast to the push model, where a long lived connection must be opened to listen
 * for new results to be pushed.
 */
export default {
  title: "Sample Pull Search Provider", // UI friendly title.
  name: "sample-pull-search-provider", // Unique ID of the search engine.
  onSearch: handlePullSearch, // Handler that is called and can return search results when a search is requested.
  onResultDispatch: handleResultDispatch, // Handler for when a search result is actioned. (For example, clicked in the UI)
} as SearchProvider;
