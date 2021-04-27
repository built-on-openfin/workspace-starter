import type {
    SearchProvider,
    SearchListenerRequest,
} from "@openfin/search-api";

import { appActions, handleResultDispatch } from "../result-dispatch";

/**
 * Handler for responding to search requests.
 * @param req an object that represents the search request.
 * @returns a list with a single search result that is capable of launching the Emojipedia app.
 */
function handleAppsSearch(req: SearchListenerRequest) {
    // Only respond if the request query is close to `emojipedia`.
    if ("emojipedia".indexOf(req.query.toLowerCase()) === -1) return [];

    // Return a single search result for launching the Emojipedia application.
    return [{
        title: "Emojipedia",
        key: "Emojipedia",
        description: "Launch Emojipedia!",
        data: {},
        actions: appActions,
    }];
}

/**
 * A simple search provider that returns search results for launching the Emojipedia application.
 * This search result will only appear in the Home `Launch` view.
 */
export default {
    title: "Sample Apps Search Provider", // UI friendly title.
    name: "sample-apps-search-provider", // Unique ID of the search engine.
    onSearch: handleAppsSearch, // Handler that returns the Emojipedia app search result.
    onResultDispatch: handleResultDispatch, // Handler for the Emojipedia app search result is actioned. (For example, clicked in the UI)
} as SearchProvider;
