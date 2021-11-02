interface SearchProvider {
    name: string,
    title: string,
    topics: string[],
    defaultAction: string,
    queryMinLength: number,
    queryAgainst: string[];
}

interface AppProvider {
    appsSourceUrl: string,
    includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include"
}
export interface CustomSettings {
    appProvider?: AppProvider,
    searchProvider?: SearchProvider
}