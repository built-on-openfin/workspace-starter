export interface AuthSettings {
  domain: string;
  clientId: string;
  loginUrl: string;
  logoutUrls: string[];
  appUrl: string;
  verifyPollMs?: number;
}

export interface CustomSettings {
  auth?: AuthSettings;
}
