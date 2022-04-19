import { connect, ConnectionError, enableLogging } from "@openfin/salesforce";
import { CLIFilterOptionType, CLITemplate } from "@openfin/workspace";
const BROWSE_SEARCH_RESULT_KEY = "browse-salesforce";
const OBJECTS_FILTER_ID = "salesforce-objects";
const NOT_CONNECTED_SEARCH_RESULT_KEY = "salesforce-not-connected-result";
let salesForceConnection;
const PROVIDER_ID = "salesforce";
let integrationMan;
/**
 * The module is being registered.
 * @param integrationManager The manager for the integration.
 * @param integration The integration details.
 * @returns Nothing.
 */
export async function register(integrationManager, integration) {
    integrationMan = integrationManager;
    console.log("Registering SalesForce");
    try {
        await openConnection(integration);
    }
    catch (err) {
        console.error("Error connecting to SalesForce", err);
    }
}
/**
 * The module is being deregistered.
 * @param integration The integration details.
 * @returns Nothing.
 */
export async function deregister(integration) {
    await closeConnection();
}
/**
 * Open the connection to SaleForce.
 * @param integration The integration details.
 */
async function openConnection(integration) {
    if (integration?.data?.orgUrl && !salesForceConnection) {
        enableLogging();
        salesForceConnection = await connect(integration?.data.orgUrl, integration?.data.consumerKey, integration?.data.isSandbox);
    }
}
/**
 * Close the connection to SalesForce.
 */
async function closeConnection() {
    if (salesForceConnection) {
        try {
            await salesForceConnection.disconnect();
        }
        catch (err) {
            console.error("Error disconnecting SalesForce", err);
        }
        finally {
            salesForceConnection = undefined;
        }
    }
}
/**
 * Create the object url from the if and origin.
 * @param objectId The object id.
 * @param salesforceOrgOrigin The origin url.
 * @returns Then object url.
 */
function getObjectUrl(objectId, salesforceOrgOrigin) {
    if (!salesforceOrgOrigin) {
        return "";
    }
    return `${salesforceOrgOrigin}/${objectId}`;
}
/**
 * Get results from the API using a query.
 * @param query The query to call the API with.
 * @param selectedObjects The selected filters.
 * @returns The search result objects from the API.
 */
async function getApiSearchResults(query, selectedObjects) {
    const accountFieldSpec = "Account(Id, Industry, Name, Phone, Type, Website)";
    const contactFieldSpec = "Contact(Department, Email, Id, Name, Phone, Title)";
    const taskFieldSpec = "Task(Id, Subject, Description)";
    const contentNoteFieldSpec = "ContentNote(Id, Title, Content, TextPreview)";
    const fieldSpecMap = new Map([
        ["Account", accountFieldSpec],
        ["Contact", contactFieldSpec],
        ["Task", taskFieldSpec],
        ["ContentNote", contentNoteFieldSpec]
    ]);
    const fieldSpec = [...fieldSpecMap]
        .filter(x => {
        if (Array.isArray(selectedObjects) && selectedObjects.length > 0) {
            return selectedObjects.includes(x[0]);
        }
        return true;
    })
        .map(x => x[1])
        .join(", ");
    const batch = [];
    if (fieldSpec.length > 0) {
        const salesforceSearchQuery = `FIND {${escapeQuery(query)}} IN ALL FIELDS RETURNING ${fieldSpec} LIMIT 25`;
        batch.push({
            method: "GET",
            url: `/services/data/vXX.X/search?q=${encodeURIComponent(salesforceSearchQuery)}`
        });
    }
    const includeChatter = !selectedObjects?.length || selectedObjects.includes("Chatter");
    if (includeChatter) {
        batch.push({
            method: "GET",
            url: `/services/data/vXX.X/chatter/feed-elements?q=${query}&pageSize=25&sort=LastModifiedDateDesc`
        });
    }
    const batchedResults = await getBatchedResults(batch);
    let results = [];
    if (batchedResults.length > 0) {
        let idx = 0;
        if (fieldSpec.length > 0) {
            const searchResponse = batchedResults[idx++];
            if (searchResponse.searchRecords) {
                results = results.concat(searchResponse.searchRecords);
            }
        }
        if (includeChatter) {
            const chatterResponse = batchedResults[idx++];
            if (chatterResponse.elements) {
                results = results.concat(chatterResponse.elements);
            }
        }
    }
    return results;
}
/**
 * Get batched results from SalesForce api.
 * @param batchRequests The batch requests to send.
 * @returns The results from the batch request.
 */
async function getBatchedResults(batchRequests) {
    if (batchRequests.length === 0 || !salesForceConnection) {
        return [];
    }
    const batch = { batchRequests, haltOnError: false };
    const response = await salesForceConnection.executeApiRequest("/services/data/vXX.X/composite/batch/", "POST", batch, { "Content-Type": "application/json" });
    return response.data?.results.map(r => r.result) ?? [];
}
/**
 * Escape any characters needed in SalesForce API calls.
 * @param query The query to escape.
 * @returns The escaped query.
 */
function escapeQuery(query) {
    // There are some reserved characters for queries so we need to escape them
    // https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_sosl_find.htm
    return query.replace(/[!"&'()*+:?[\\\]^{|}~-]/gm, "\\$&");
}
/**
 * Get a list of the static application entries.
 * @param integration The integration details.
 * @returns The list of application entries.
 */
export async function getAppSearchEntries(integration) {
    const results = [];
    if (integration?.data?.orgUrl) {
        results.push({
            actions: [{ name: "Browse", hotkey: "enter" }],
            data: {
                providerId: PROVIDER_ID,
                pageUrl: integration?.data?.orgUrl,
                tags: [PROVIDER_ID]
            },
            icon: integration.icon,
            key: BROWSE_SEARCH_RESULT_KEY,
            template: CLITemplate.Plain,
            templateContent: undefined,
            title: "Browse Salesforce"
        });
        if (!salesForceConnection) {
            results.push(getReconnectSearchResult(integration));
        }
    }
    return results;
}
/**
 * An entry has been selected.
 * @param integration The integration details.
 * @param result The dispatched result.
 * @param lastResponse The last response.
 * @returns True if the item was handled.
 */
export async function itemSelection(integration, result, lastResponse) {
    // if the user clicked the reconnect result, reconnect to salesforce and re-run query
    if (result.key === NOT_CONNECTED_SEARCH_RESULT_KEY) {
        await openConnection(integration);
        if (result.data?.query) {
            const results = await getSearchResults(integration, result.data?.query, result.data?.filters);
            if (lastResponse) {
                lastResponse.revoke(NOT_CONNECTED_SEARCH_RESULT_KEY);
                lastResponse.respond(results.results);
            }
        }
        return true;
    }
    // otherwise open the result page url in browser
    const data = result.data;
    if (data !== undefined && integrationMan) {
        const preload = `${integrationMan.rootUrl}/views/salesforce/preload.js`;
        const viewOptions = {
            url: data.pageUrl,
            fdc3InteropApi: "1.2",
            interop: {
                currentContextGroup: "green"
            },
            customData: { buttonLabel: "Process Participant" },
            preloadScripts: [{ url: preload }],
            target: { name: "", url: "", uuid: "" }
        };
        await integrationMan.launchView(viewOptions);
        return true;
    }
    return false;
}
/**
 * Get a list of search results based on the query and filters.
 * @param integration The integration details.
 * @param query The query to search for.
 * @param filters The filters to apply.
 * @returns The list of results and new filters.
 */
export async function getSearchResults(integration, query, filters) {
    if (salesForceConnection) {
        let searchResults;
        let selectedObjects = [];
        if (Array.isArray(filters) && filters.length > 0) {
            const objectsFilter = filters.find(x => x.id === OBJECTS_FILTER_ID);
            if (objectsFilter) {
                selectedObjects = (Array.isArray(objectsFilter.options) ? objectsFilter.options : [objectsFilter.options])
                    .filter(x => Boolean(x.isSelected))
                    .map(x => (x.value === "Note" ? "ContentNote" : x.value));
            }
        }
        try {
            searchResults = await getApiSearchResults(query, selectedObjects);
            const results = searchResults.map(searchResult => {
                if ("Website" in searchResult) {
                    return {
                        actions: [{ name: "View", hotkey: "enter" }],
                        label: searchResult.attributes.type,
                        key: searchResult.Id,
                        title: searchResult.Name,
                        icon: integration?.data?.iconMap.account,
                        data: {
                            providerId: PROVIDER_ID,
                            pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
                            tags: [PROVIDER_ID]
                        },
                        template: CLITemplate.Contact,
                        templateContent: {
                            name: searchResult.Name,
                            title: searchResult.Industry,
                            details: [
                                [
                                    ["Phone", searchResult.Phone],
                                    ["Type", searchResult.Type],
                                    ["Website", searchResult.Website]
                                ]
                            ]
                        }
                    };
                }
                else if ("Email" in searchResult) {
                    return {
                        actions: [{ name: "View", hotkey: "enter" }],
                        label: searchResult.attributes.type,
                        key: searchResult.Id,
                        title: searchResult.Name,
                        icon: integration?.data?.iconMap.contact,
                        data: {
                            providerId: PROVIDER_ID,
                            pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
                            tags: [PROVIDER_ID]
                        },
                        template: CLITemplate.Contact,
                        templateContent: {
                            name: searchResult.Name,
                            title: searchResult.Title,
                            useInitials: true,
                            details: [
                                [
                                    ["Department", searchResult.Department],
                                    ["Email", searchResult.Email],
                                    ["Work #", searchResult.Phone]
                                ]
                            ]
                        }
                    };
                }
                else if ("Description" in searchResult) {
                    return {
                        actions: [{ name: "View", hotkey: "enter" }],
                        label: searchResult.attributes.type,
                        key: searchResult.Id,
                        title: searchResult.Subject,
                        icon: integration?.data?.iconMap.task,
                        data: {
                            providerId: PROVIDER_ID,
                            pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
                            tags: [PROVIDER_ID]
                        },
                        template: "List",
                        templateContent: [
                            ["Subject", searchResult.Subject],
                            ["Comments", searchResult.Description]
                        ]
                    };
                }
                else if ("TextPreview" in searchResult) {
                    return {
                        actions: [{ name: "View", hotkey: "enter" }],
                        label: "Note",
                        key: searchResult.Id,
                        title: searchResult.Title,
                        icon: integration?.data?.iconMap.note,
                        data: {
                            providerId: PROVIDER_ID,
                            pageUrl: getObjectUrl(searchResult.Id, integration.data?.orgUrl),
                            tags: [PROVIDER_ID]
                        },
                        template: "List",
                        templateContent: [
                            ["Title", searchResult.Title],
                            ["Content", searchResult?.TextPreview]
                        ]
                    };
                }
                else if ("actor" in searchResult &&
                    (searchResult.type === "TextPost" || searchResult.type === "ContentPost")) {
                    return {
                        actions: [{ name: "View", hotkey: "enter" }],
                        label: "Chatter",
                        key: searchResult.id,
                        title: searchResult.actor?.displayName,
                        icon: integration?.data?.iconMap.chatter,
                        data: {
                            providerId: PROVIDER_ID,
                            pageUrl: getObjectUrl(searchResult.id, integration.data?.orgUrl),
                            tags: [PROVIDER_ID]
                        },
                        template: CLITemplate.Contact,
                        templateContent: {
                            name: searchResult.actor?.displayName,
                            useInitials: true,
                            details: [
                                [
                                    ["Header", searchResult?.header?.text],
                                    ["Note", searchResult?.body?.text]
                                ]
                            ]
                        }
                    };
                }
                // in this case we are only searching for accounts, contacts, tasks, content notes and chatter
            });
            const filteredResults = results.filter(Boolean);
            const objects = searchResults.map(result => ("attributes" in result ? result.attributes.type : "Chatter"));
            return {
                results: filteredResults,
                context: {
                    filters: getSearchFilters(objects.map(c => (c === "ContentNote" ? "Note" : c)))
                }
            };
        }
        catch (err) {
            await closeConnection();
            if (err instanceof ConnectionError) {
                return {
                    results: [getReconnectSearchResult(integration, query, filters)]
                };
            }
            console.error("Error retrieving SalesForce search results", err);
        }
    }
    return {
        results: []
    };
}
/**
 * Get the search result to display when SalesForce needs to reconnect.
 * @param integration The integration details.
 * @param query The query that needs to reconnect.
 * @param filters The filter for the reconnect.
 * @returns The search result entry.
 */
function getReconnectSearchResult(integration, query, filters) {
    return {
        actions: [{ name: "Reconnect", hotkey: "enter" }],
        key: NOT_CONNECTED_SEARCH_RESULT_KEY,
        icon: integration?.icon,
        title: "Reconnect to Salesforce",
        data: {
            providerId: PROVIDER_ID,
            query,
            filters
        }
    };
}
/**
 * Get the search filters based on the results.
 * @param objects The object types to create the filters from.
 * @returns The filters.
 */
function getSearchFilters(objects) {
    if (Array.isArray(objects) && objects.length > 0) {
        const filters = [];
        const uniqueObjects = [...new Set(objects.sort())];
        const objectFilter = {
            id: OBJECTS_FILTER_ID,
            title: "Objects",
            type: CLIFilterOptionType.MultiSelect,
            options: []
        };
        for (const object of uniqueObjects) {
            if (Array.isArray(objectFilter.options)) {
                objectFilter.options.push({
                    value: object,
                    isSelected: false
                });
            }
        }
        filters.push(objectFilter);
        return filters;
    }
    return [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILE9BQU8sRUFDUCxlQUFlLEVBQ2YsYUFBYSxFQUdoQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsV0FBVyxFQVVkLE1BQU0sb0JBQW9CLENBQUM7QUFnQjVCLE1BQU0sd0JBQXdCLEdBQUcsbUJBQW1CLENBQUM7QUFDckQsTUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztBQUMvQyxNQUFNLCtCQUErQixHQUFHLGlDQUFpQyxDQUFDO0FBRTFFLElBQUksb0JBQXNELENBQUM7QUFFM0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDO0FBRWpDLElBQUksY0FBOEMsQ0FBQztBQUVuRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsUUFBUSxDQUMxQixrQkFBc0MsRUFDdEMsV0FBNEM7SUFFNUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN0QyxJQUFJO1FBQ0EsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDckM7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDeEQ7QUFDTCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsVUFBVSxDQUFDLFdBQTRDO0lBQ3pFLE1BQU0sZUFBZSxFQUFFLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7R0FHRztBQUNILEtBQUssVUFBVSxjQUFjLENBQUMsV0FBNEM7SUFDdEUsSUFBSSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixFQUFFO1FBQ3BELGFBQWEs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