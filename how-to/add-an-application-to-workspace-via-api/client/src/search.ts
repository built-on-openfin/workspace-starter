import { DispatchedSearchResult, ResultDispatchListener, SearchListener, SearchListenerRequest, SearchListenerResponse, SearchProvider, SearchResult, SearchResultPlain, SearchResultSimpleText, SearchTopicClient, subscribe, TemplateNames } from "@openfin/search-api";
import { getSettings } from "./settings";
import { launch } from "./launch";
import { UUID as WorkspaceUUID } from "./workspace";

async function getRestEntries(url:string, credentials?:"omit" | "same-origin" | "include") : Promise<any[]>{
    const options = credentials !== undefined ? { credentials } : undefined;
    if(url === undefined) {
        return [];
    }
    const response = await fetch(url, options);
    return response.json();
}

async function getResults() : Promise<SearchResult[]> {
    let settings = await getSettings();
    let fdc3Results = await getRestEntries(settings?.searchProvider?.fdc3SourceUrl, settings?.searchProvider?.includeCredentialOnSourceRequest);

    if(Array.isArray(fdc3Results)){
        let results: SearchResult[] = [];
        let defaultAction = settings.searchProvider.defaultAction;

        for(let i = 0; i < fdc3Results.length; i++) {
            if(fdc3Results[i].description !== undefined) {
                let entry: SearchResultSimpleText = {
                    key: fdc3Results[i].appId,
                    title: fdc3Results[i].title,
                    actions: [{ name: defaultAction }],
                    data: fdc3Results[i],
                    description: fdc3Results[i].description,
                    shortDescription: fdc3Results[i].description,
                    template: TemplateNames.SimpleText,
                    templateContent: fdc3Results[i].description,
                };
                results.push(entry);
            } else {
                let entry: SearchResultPlain = {
                    key: fdc3Results[i].appId,
                    title: fdc3Results[i].title,
                    actions: [{ name: defaultAction }],
                    data: fdc3Results[i],
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
    if(settings.searchProvider === undefined || settings.searchProvider.fdc3SourceUrl === undefined || settings.searchProvider.name === undefined || settings.searchProvider.title === undefined) {
        console.warn("searchProvider: not configured in the customSettings of your manifest correctly. Ensure you have the searchProvider object defined in customSettings with the following defined: fdc3SourceUrl, name, title");
        return;
    }
    const topics = settings?.searchProvider?.topics || ["all", "launch"];
    let searchTopicClients: SearchTopicClient[] = [];

    for(let i = 0; i < topics.length; i++) {
        let searchTopicClient = await subscribe({ topic: topics[i], uuid: WorkspaceUUID });
        searchTopicClients.push(searchTopicClient);
    }

    const queryMinLength = settings.searchProvider.queryMinLength || 3;

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
