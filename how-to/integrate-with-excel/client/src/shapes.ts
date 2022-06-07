import { IntegrationProvider } from "./integrations-shapes";

interface HomeProvider {
    id: string,
    title: string,
    icon: string,
    hidden?: boolean,
}

interface AppProvider {
    appsSourceUrl: string,
    includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include",
    cacheDurationInMinutes?: number,
    appAssetTag?: string
}

export interface CustomSettings {
    homeProvider?: HomeProvider;
    appProvider?: AppProvider;
    integrationProvider?:IntegrationProvider;
}
