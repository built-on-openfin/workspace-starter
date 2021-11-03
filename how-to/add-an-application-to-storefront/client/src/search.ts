import { DispatchedSearchResult, ResultDispatchListener, SearchListener, SearchListenerRequest, SearchListenerResponse, SearchProvider, SearchResult, SearchResultPlain, SearchResultSimpleText, SearchTopicClient, subscribe, TemplateNames } from "@openfin/search-api";
import { getSettings } from "./settings";
import { launch } from "./launch";
import { UUID as WorkspaceUUID } from "./workspace";
import { getApps } from "./apps";

async function getResults() : Promise<SearchResult[]> {
    let settings = await getSettings();
    let apps = await getApps();

    if(Array.isArray(apps)){
        let results: SearchResult[] = [];
        let defaultAction = settings.searchProvider.defaultAction;

        for(let i = 0; i < apps.length; i++) {
            if(apps[i].description !== undefined) {
                let entry: SearchResultSimpleText = {
                    key: apps[i].appId,
                    title: apps[i].title,
                    actions: [{ name: defaultAction }],
                    data: apps[i],
                    description: apps[i].description,
                    shortDescription: apps[i].description,
                    template: TemplateNames.SimpleText,
                    templateContent: apps[i].description,
                };
                results.push(entry);
            } else {
                let entry: SearchResultPlain = {
                    key: apps[i].appId,
                    title: apps[i].title,
                    actions: [{ name: defaultAction }],
                    data: apps[i],
                    template: TemplateNames.Plain
                };
                results.push(entry);
            }
        }
        return results;
    } else {
        return [];
    }
}

export async function init() {
    console.log("Initialising search.");
    let settings = await getSettings();
    if(settings.searchProvider === undefined || settings.searchProvider.name === undefined || settings.searchProvider.title === undefined) {
        console.warn("searchProvider: not configured in the customSettings of your manifest correctly. Ensure you have the searchProvider object defined in customSettings with the following defined: name, title");
        return;
    }
    const topics = settings?.searchProvider?.topics || ["all", "apps"];
    let searchTopicClients: SearchTopicClient[] = [];

    for(let i = 0; i < topics.length; i++) {
        let searchTopicClient = await subscribe({ topic: topics[i], uuid: WorkspaceUUID });
        searchTopicClients.push(searchTopicClient);
    }

    const queryMinLength = settings?.searchProvider?.queryMinLength || 3;
    const queryAgainst = settings?.searchProvider?.queryAgainst || ["title"];

    const onSearch: SearchListener = async (request: SearchListenerRequest, response: SearchListenerResponse) => {
        // These results are pulled in by the search requester.
        let results = await getResults();
        let query = request.query.toLowerCase();
        if(query.indexOf("/") === 0) {
            return [];
        }

        if(query.length < queryMinLength) {
            return results;
        }

        return results.filter(entry => {
            let matchFound = queryAgainst.some(target => {
                let path = target.split('.');
                if(path.length === 1) {
                    let targetValue = entry[path[0]];
                    
                    if(targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
                        return targetValue.toLowerCase().indexOf(query) > -1;
                    }
                } else if(path.length === 2) {
                    let target = entry[path[0]];
                    let targetValue: string | string[];
                    if(target !== undefined && target !== null) {
                        targetValue = target[path[1]];
                    }

                    if(targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
                        return targetValue.toLowerCase().indexOf(query) > -1;
                    }

                    if(targetValue !== undefined && targetValue !== null && Array.isArray(targetValue)) {
                        if(targetValue.length > 0 && typeof targetValue[0] === "string" && targetValue.some(target => target.toLowerCase().indexOf(query) === 0)) {
                            return true;
                        } else {
                            console.warn("Manifest configuration for search specified a queryAgainst target that is an array but not an array of strings. Only string values and arrays are supported: " + target);
                        }
                    }
                  } else {
                      console.warn("The manifest configuration for search has a queryAgainst entry that has a depth greater than 1. You can search for e.g. data.tags if data has tags in it and it is either a string or an array of strings.");
                  }
                  return false;
            });

            return matchFound;
        });
    };

    const onSelection: ResultDispatchListener = async (result:DispatchedSearchResult) => {
        if (result.data !== undefined) {
            await launch(result.data);
        }  else {
            console.warn("Unable to execute result without data being passed");
        }
    };

    const searchProvider:SearchProvider = {
        title: settings.searchProvider.title,
        name: settings.searchProvider.name,
        onSearch: onSearch,
        onResultDispatch: onSelection
     };
        
    // Register the search data provider.
    for(let stc = 0; stc < searchTopicClients.length; stc++) {
        await searchTopicClients[stc].register(searchProvider);
    }
    console.log("Search configured.");
}
