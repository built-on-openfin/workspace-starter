export interface DirectoryEndpoint {
    id: string;
    url?: { path: string; credentials: "omit" | "same-origin" | "include"};
    endpointId?: string;
    map?: {
        inputId: string;
        outputId?: string;
    };
}
