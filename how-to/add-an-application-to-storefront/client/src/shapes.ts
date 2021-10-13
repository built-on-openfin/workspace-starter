import { StorefrontFooter, App, Image } from "@openfin/workspace/shapes";

interface SearchProvider {
    name: string,
    title: string,
    topics: string[],
    defaultAction: string,
    queryMinLength: number
}

interface AppProvider {
    appsSourceUrl: string,
    includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include",
    cacheDurationInMinutes?: number
}

interface StorefrontSettingsNavigationItem {
    id:string,
    title:string,
    tags:string[]
}


interface StorefrontSettingsDetailedNavigationItem extends StorefrontSettingsNavigationItem {
    description: string, 
    image: Image
}

export interface StorefrontSettingsLandingPageRow {
    title: string,
    items: StorefrontSettingsDetailedNavigationItem[]
}
interface StorefrontProvider {
    id: string,
    title: string,
    landingPage: {
        hero?: {
          title: string,
          description: string,
          cta: StorefrontSettingsNavigationItem,
          image: Image
        },
        topRow: StorefrontSettingsLandingPageRow,
        middleRow: {
            title: string,
            tags: string[]
        },
        bottomRow: StorefrontSettingsLandingPageRow
    },
    navigation:  {
        id: string,
        title: string, 
        items: StorefrontSettingsNavigationItem[] 
    }[],
    footer: StorefrontFooter
}

export interface CustomSettings {
    bootstrap?: { search: boolean, store: boolean }
    appProvider?: AppProvider,
    searchProvider?: SearchProvider,
    storefrontProvider?:StorefrontProvider
}