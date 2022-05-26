export interface AuthSettings {
    domain: string;
    clientId: string;
    loginUrl: string;
    logoutUrl: string;
    appUrl: string;
}

export interface CustomSettings {
    auth?: AuthSettings;
}
