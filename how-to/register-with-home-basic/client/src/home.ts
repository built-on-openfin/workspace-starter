import { getCurrentSync } from '@openfin/workspace-platform';
import { Home, CLIProvider, CLISearchListenerRequest, CLITemplate, CLISearchResult, CLISearchListenerResponse, CLISearchResponse, CLIDispatchedSearchResult  } from "@openfin/workspace";
import { getApps } from "./apps";

const providerId = "register-with-home-basic";

async function getResults(query?: string) : Promise<CLISearchResponse> {
   
    let apps = await getApps();

    if(Array.isArray(apps)){   
        let initialResults: CLISearchResult<any>[] = [];

        for(let i = 0; i < apps.length; i++) {
            let entry: any = {
                key: apps[i].appId,
                title: apps[i].title,
                data: apps[i],
                actions: [],
                template: CLITemplate.Plain
            };
            let action = { name: "Launch View", hotkey: "enter" };

            if(apps[i].manifestType === "view") {
                entry.label = "View";
                entry.actions = [action];
            }
            if(apps[i].manifestType === "snapshot") {
                entry.label = "Snapshot";
                action.name = "Launch Snapshot";
                entry.actions = [action];
            }
            if(apps[i].manifestType === "manifest") {
                entry.label = "App";
                action.name = "Launch App";
                entry.actions = [action];
            }
            if(apps[i].manifestType === "external") {
                action.name = "Launch Native App";
                entry.actions = [action];
                entry.label = "Native App";
            }
    
            if(Array.isArray(apps[i].icons) && apps[i].icons.length > 0) {
                entry.icon = apps[i].icons[0].src;
            }
            
            if(apps[i].description !== undefined) {
                entry.description = apps[i].description;
                entry.shortDescription = apps[i].description;
                entry.template = CLITemplate.SimpleText;
                entry.templateContent = apps[i].description;
            }
            initialResults.push(entry);
        }

        let finalResults;

        if(query === undefined || query === null || query.length === 0) {
            finalResults = initialResults;
        } else {
            finalResults = initialResults.filter(entry => {
              let targetValue = entry.title;
                        
              if(targetValue !== undefined && targetValue !== null && typeof targetValue === "string") {
                  return targetValue.toLowerCase().indexOf(query) > -1;
              }
              return false;
            });
        }

        let response: CLISearchResponse = {
            results: finalResults
        };

        return response;
    } else {
        return {
            results:[]
        };
    }
}

export async function register(): Promise<void> {
    console.log("Initialising home.");

    const queryMinLength = 3;

    const onUserInput = async (request: CLISearchListenerRequest, response: CLISearchListenerResponse): Promise<CLISearchResponse> => {
        let query = request.query.toLowerCase();
        if(query.indexOf("/") === 0) {
            return {results: [] };
        }

        if(query.length < queryMinLength) {
            return getResults();
        }

        return getResults(query);
    };

    const onSelection = async (result:CLIDispatchedSearchResult) => {
        if (result.data !== undefined) {
            let platform = getCurrentSync();
            await platform.launchApp({app: result.data});
        }  else {
            console.warn("Unable to execute result without data being passed");
        }
    };

    const cliProvider:CLIProvider = {
        title: "Basic Workspace Platform",
        id: providerId,
        icon: "http://localhost:8080/favicon.ico",
        onUserInput: onUserInput,
        onResultDispatch: onSelection,
     };

     console.log("Home configured.");

    return Home.register(cliProvider);
}

export async function deregister() {
  return Home.deregister(providerId);
}

export async function show() {
    return Home.show();
}

export async function hide() {
    return Home.hide();
}
