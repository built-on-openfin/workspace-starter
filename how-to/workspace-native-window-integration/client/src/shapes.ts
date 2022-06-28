interface PlatformProvider {
  rootUrl: string;
  enableNativeWindowIntegration: boolean;
}

interface HomeProvider {
  id: string;
  title: string;
  icon: string;
  hidden?: boolean;
  queryMinLength?: number;
  queryAgainst?: string[];
}

interface AppProvider {
  appsSourceUrl: string;
  includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
  cacheDurationInMinutes?: number;
  appAssetTag?: string;
}

export interface CustomSettings {
  appProvider?: AppProvider;
  platformProvider?: PlatformProvider;
  homeProvider?: HomeProvider;
}
