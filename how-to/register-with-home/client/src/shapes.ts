interface HomeProvider {
    id: string,
    title: string,
    icon: string,
    hidden?: boolean,
    queryMinLength?: number,
    queryAgainst?: string[],
}

interface AppProvider {
    appsSourceUrl: string,
    includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include",
    manifestTypes?: string[];
}
export interface CustomSettings {
    appProvider?: AppProvider,
    homeProvider?: HomeProvider
}