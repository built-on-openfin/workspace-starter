import type { PlatformStorageMetadata } from "workspace-platform-starter/shapes/platform-shapes";

/**
 * Options for the set default workspace lifecycle provider.
 */
export interface SetDefaultWorkspaceProviderOptions {
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
 * The request to set a default workspace id.
 */
export interface EndpointDefaultWorkspaceSetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the payload that will be used to store the workspace id.
	 */
	id: string;
	/**
	 * The platform versions saving the workspace preference
	 */
	metaData: PlatformStorageMetadata;

	/**
	 * The payload to save.
	 */
	payload: {
		/**
		 * The workspace id which should match the id property.
		 */
		workspaceId: string;
	};
}
