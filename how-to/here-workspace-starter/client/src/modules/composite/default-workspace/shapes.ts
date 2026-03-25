import type { MenuPosition } from "workspace-platform-starter/shapes/menu-shapes";
import type { PlatformStorageMetadata } from "workspace-platform-starter/shapes/platform-shapes";
/**
 * Options for the set default workspace menus provider.
 */
export interface DefaultWorkspaceProviderOptions {
	/**
	 * Last active menu option
	 */
	lastActive?: {
		include?: boolean;
		menuLabel?: string;
		menuIcon?: string;
		lastActiveWorkspaceLabel?: string;
	};

	/**
	 * Reset menu options
	 */
	reset?: {
		include?: boolean;
		menuLabel?: string;
		menuIcon?: string;
	};

	/**
	 * The main menu entry
	 */
	defaultWorkspace?: {
		include?: boolean;
		menuLabel?: string;
		menuIcon?: string;
		menuPosition?: MenuPosition;
	};

	/**
	 * The endpoint ids to get what is saved and to save a selection.
	 */
	endpointIds?: {
		getDefaultWorkspace: string;
		setDefaultWorkspace: string;
	};

	/**
	 * The id used to store the payload
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
	payload: DefaultWorkspacePayload;
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
	payload: DefaultWorkspacePayload;
}

/**
 * The payload used for applying or saving the default workspace
 */
export interface DefaultWorkspacePayload {
	/**
	 * The workspace Id to retrieve.
	 */
	workspaceId: string;

	/**
	 * is this workspace id drive by the last active workspace.
	 */
	useLastActiveWorkspace: boolean;
}
