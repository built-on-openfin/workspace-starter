export type AppEndpointOptions =
	| string
	| {
			inputId: string;
			outputId?: string;
	  };

export interface AppProviderOptions {
	appsSourceUrl?: string | string[];
	endpointIds?: AppEndpointOptions[];
	includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
	cacheDurationInMinutes?: number;
	cacheDurationInSeconds?: number;
	appAssetTag?: string;
	manifestTypes?: string[];
}

export interface ManifestType {
	id: string;
	label: string;
	description: string;
}
