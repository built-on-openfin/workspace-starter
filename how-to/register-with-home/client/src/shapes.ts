
import { CustomThemes } from "@openfin/workspace-platform";
interface BrowserProvider {
    windowOptions: {
        title?:string,
        icon?:string,
        newTabUrl?: string;
        newPageUrl?: string;
    }
}

interface ThemeProvider {
    themes: CustomThemes
}
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
    includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include"
}
export interface CustomSettings {
    appProvider?: AppProvider,
    browserProvider?: BrowserProvider,
    themeProvider?: ThemeProvider,
    homeProvider?: HomeProvider
}