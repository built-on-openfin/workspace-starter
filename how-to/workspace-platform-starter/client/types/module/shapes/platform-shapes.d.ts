import type { Page, Workspace } from "@openfin/workspace-platform";
import type { IntentResolverOptions, PlatformInteropBrokerOptions } from "./interopbroker-shapes";
/**
 * Platform provider options.
 */
export interface PlatformProviderOptions {
	/**
	 * What is the root url of you platform e.g. https://mydomain.com
	 */
	rootUrl: string;
	/**
	 * Do you want to enable this platforms sharing capability (you will still need to have 2 endpoints called
	 * share-save and share-get for the storing and retrieval of the share target)
	 */
	sharing: boolean;
	/**
	 * This is optional and only needed if you are using shell mode where you wish to load a small module with just auth
	 * logic first followed by a module with the rest of the platform core. Specify the entry point here. We do generate
	 * the provider bundle and provide an example in our docs.
	 */
	initUrl?: string;
	/**
	 * interop settings related to this platform
	 */
	interop?: PlatformInteropBrokerOptions;
	/**
	 * Intent Picker is being removed in a future version. Please use interop.intentResolver for the resolver/picker
	 * settings
	 */
	intentPicker?: IntentResolverOptions;
	/**
	 * When storing page/workspace data using endpoints disable the mapping which reduces the payload size.
	 */
	disableStorageMapping?: boolean;
}
/**
 * The metadata sent with platform storage endpoint requests.
 */
export interface PlatformStorageMetadata {
	/**
	 * The version information for the storage payload.
	 */
	version: {
		workspacePlatformClient: string | undefined;
		platformClient: string | undefined;
	};
}
/**
 * A request type for the WorkspaceEndpoint that gets all saved workspace entries
 */
export interface EndpointWorkspaceListRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * Optional query that limits the workspaces.
	 */
	query?: string;
}
/**
 * The response after the request for workspaces was fulfilled
 */
export interface EndpointWorkspaceListResponse {
	/**
	 * The list of workspace entries with information of what platform versions they were originally saved against
	 */
	[key: string]: {
		metaData: PlatformStorageMetadata;
		payload: Workspace;
	};
}
/**
 * A request type for the WorkspaceEndpoint that gets a specific workspace entry
 */
export interface EndpointWorkspaceGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the workspace to get.
	 */
	id: string;
}
/**
 * The response after the request for workspace was fulfilled
 */
export interface EndpointWorkspaceGetResponse {
	/**
	 * The platform versions it was originally saved against
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The workspace entry
	 */
	payload: Workspace;
}
/**
 * A request type for the WorkspaceEndpoint that sets a specific workspace entry
 */
export interface EndpointWorkspaceSetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the workspace to set.
	 */
	id: string;
	/**
	 * The platform versions it saving the workspace
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The workspace entry
	 */
	payload: Workspace;
}
/**
 * A request type for the WorkspaceEndpoint that removes a specific workspace entry
 */
export interface EndpointWorkspaceRemoveRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the workspace to remove.
	 */
	id: string;
}
/**
 * A request type for the PageEndpoint that gets all saved pages entries
 */
export interface EndpointPageListRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * Optional query that limits the pages.
	 */
	query?: string;
}
/**
 * The response after the request for pages was fulfilled
 */
export interface EndpointPageListResponse {
	/**
	 * The list of page entries with information of what platform versions they were originally saved against
	 */
	[key: string]: {
		metaData: PlatformStorageMetadata;
		payload: Page;
	};
}
/**
 * A request type for the PageEndpoint that gets a specific page entry
 */
export interface EndpointPageGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the page to get.
	 */
	id: string;
}
/**
 * The response after the request for page was fulfilled
 */
export interface EndpointPageGetResponse {
	/**
	 * The platform versions it was originally saved against
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The page entry
	 */
	payload: Page;
}
/**
 * A request type for the PageEndpoint that sets a specific page entry
 */
export interface EndpointPageSetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the page to set.
	 */
	id: string;
	/**
	 * The platform versions it saving the page
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The page entry
	 */
	payload: Page;
}
/**
 * A request type for the PageEndpoint that removes a specific page entry
 */
export interface EndpointPageRemoveRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the page to remove.
	 */
	id: string;
}
