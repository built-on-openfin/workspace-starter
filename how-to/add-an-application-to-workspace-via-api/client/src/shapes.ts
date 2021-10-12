interface SearchProvider {
    fdc3SourceUrl: string,
    includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include",
    name: string,
    title: string,
    topics: string[],
    defaultAction: string,
    queryMinLength: number
}

export interface CustomSettings {
    searchProvider?: SearchProvider
}