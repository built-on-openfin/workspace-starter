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

    const onSearch: SearchListener = async (request: SearchListenerRequest, response: SearchListenerResponse) => {
        // These results are pulled in by the search requester.
        let results = await getResults();

        if(request.query.indexOf("/") === 0) {
            return [];
        }

        if(request.query.length < queryMinLength) {
            return results;
        }

        return results.filter(entry => {
            return entry.title.toLowerCase().indexOf(request.query.toLowerCase()) > -1;
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
