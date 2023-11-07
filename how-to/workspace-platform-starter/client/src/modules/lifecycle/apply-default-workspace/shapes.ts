import type { PlatformStorageMetadata } from "workspace-platform-starter/shapes/platform-shapes";

/**
 * Options for the apply default workspace lifecycle provider.
 */
export interface ApplyDefaultWorkspaceProviderOptions {
	/**
	 * The endpoint id to fetch the workspace id to load.
	 */
	endpointId?: string;
	/**
	 * Provide a specific key used when fetching the payload that contains the default workspace id.
	 */
	payloadId?: string;
}

/**
 * A request type for the WorkspaceEndpoint that gets the default entry
 */
export interface EndpointDefaultWorkspaceGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;

	/**
	 * The key used to fetch the payload containing the default workspace id.
	 */
	id: string;
}

/**
 * The saved default workspace id to use.
 */
export interface EndpointDefaultWorkspaceGetResponse {
	/**
	 * The platform versions it was originally saved against
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The id representing where the workspace id payload was stored.
	 */
	id: string;

	/**
	 * The payload containing the default workspace to load.
	 */
	payload: {
		/**
		 * The workspace Id to retrieve.
		 */
		workspaceId: string;
	};
}
