import { CustomThemes } from "@openfin/workspace-platform";

interface BrowserProvider {
  windowOptions: {
    title?: string;
    icon?: string;
    newTabUrl?: string;
    newPageUrl?: string;
  };
}

interface ThemeProvider {
  themes: CustomThemes;
}

interface LaunchBarWindowSettings {
  url: string;
  options: object;
}
export interface CustomSettings {
  bootstrap?: { launchBarWindowSettings?: LaunchBarWindowSettings };
  browserProvider?: BrowserProvider;
  themeProvider?: ThemeProvider;
}
