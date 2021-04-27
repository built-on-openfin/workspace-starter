import type {
  SearchProvider,
  SearchListenerRequest,
  SearchListenerResponse,
} from "@openfin/search-api";

import emojis from "../emojis";

import { emojiActions, handleResultDispatch } from "../result-dispatch";

/**
 * Handler for responding to a search request.
 * @param req an object that represents the search request.
 * @param res an object that can be used to respond to the respective search request.
 */
function handlePushSearch(
  req: SearchListenerRequest,
  res: SearchListenerResponse
) {
  // Only respond if the request query is `push emoji`.
  if (req.query !== "push emoji") return [];

  // Open the response stream for pushing search results back to the requester.
  res.open();

  const activeTimeoutIds = [];

  // Every second, respond to the search requester with a single unique emoji until all have been sent.
  emojis.forEach((emoji, index) => {
    const timeoutId = setTimeout(() => {
      res.respond([
        {
          title: "I am feeling " + emoji,
          key: emoji,
          description: "See it on the Emojipedia!",
          data: { emoji },
          actions: emojiActions,
        },
      ]);

      if (index === emojis.length - 1) {
        /* 
         * If this is the last emoji in the list, close the response stream. 
         * Closing the response stream is optional but recommended if possible.
         */
        res.close();
      }
    }, index * 1000);
    activeTimeoutIds.push(timeoutId);
  });

  // If the request is closed by the search requester, clean up all active timeouts.
  req.onClose(() => {
    activeTimeoutIds.forEach((id) => clearTimeout(id));
  });

  return [];
}

/**
 * A search provider that responds to queries by pushing search results back to the requester asynchronously.
 */
export default {
  title: "Sample Push Search Provider", // UI friendly title.
  name: "sample-push-search-provider", // Unique ID of the search engine.
  onSearch: handlePushSearch, // Handler that is called and can return search results when a search is requested.
  onResultDispatch: handleResultDispatch, // Handler for when a search result is actioned. (For example, clicked in the UI)
} as SearchProvider;
