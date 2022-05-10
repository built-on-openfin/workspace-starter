import { IntegrationProvider } from "./integrations-shapes";

interface HomeProvider {
    id: string,
    title: string,
    icon: string,
    hidden?: boolean,
}

export interface CustomSettings {
    homeProvider?: HomeProvider
    integrationProvider?:IntegrationProvider
}
