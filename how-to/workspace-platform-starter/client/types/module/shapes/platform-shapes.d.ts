import type { DockButton } from "@openfin/workspace";
import type { Locale, Page, Workspace } from "@openfin/workspace-platform";
import type { DockProviderConfigWithIdentity } from "@openfin/workspace-platform/client-api/src";
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
	 * The language settings for the platform
	 */
	language?: {
		/**
		 * The initial language to use. Built in browser support for en-US (default), ja-JP, zh-CN, zh-Hant, ko-KR, ru-RU, de-DE
		 */
		initialLanguage: Locale | string;
	};
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
 * A request type for the Storage Endpoint that gets a specific entry
 */
export interface EndpointGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the entry to get.
	 */
	id: string;
}
/**
 * The response after the request for workspace was fulfilled
 */
export interface EndpointGetResponse<T = unknown> {
	/**
	 * The platform versions it was originally saved against
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The storage entry
	 */
	payload: T;
}
/**
 * The response after the request for object was fulfilled
 */
export interface EndpointListResponse<T = unknown> {
	/**
	 * The list of page entries with information of what platform versions they were originally saved against
	 */
	[key: string]: {
		metaData: PlatformStorageMetadata;
		payload: T;
	};
}
/**
 * A request type for the Storage Endpoint that gets all saved entries
 */
export interface EndpointListRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * Optional query that limits the entries.
	 */
	query?: string;
}
/**
 * A request type for the Storage Endpoint that sets a specific entry
 */
export interface EndpointSetRequest<T = unknown> {
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
	 * The entry
	 */
	payload: T;
}
/**
 * A request type for the Storage Endpoint that removes a specific entry
 */
export interface EndpointRemoveRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the page to remove.
	 */
	id: string;
}
/**
 * The response after the request for workspaces was fulfilled
 */
export type EndpointWorkspaceListResponse = EndpointListResponse<Workspace>;
/**
 * A request type for the WorkspaceEndpoint that gets a specific workspace entry
 */
export type EndpointWorkspaceGetRequest = EndpointGetRequest;
/**
 * A request type for the WorkspaceEndpoint that gets all saved workspace entries
 */
export type EndpointWorkspaceListRequest = EndpointListRequest;
/**
 * The response after the request for workspace was fulfilled
 */
export type EndpointWorkspaceGetResponse = EndpointGetResponse<Workspace>;
/**
 * A request type for the WorkspaceEndpoint that sets a specific workspace entry
 */
export type EndpointWorkspaceSetRequest = EndpointSetRequest<Workspace>;
/**
 * A request type for the WorkspaceEndpoint that removes a specific workspace entry
 */
export type EndpointWorkspaceRemoveRequest = EndpointRemoveRequest;
/**
 * A request type for the PageEndpoint that gets all saved pages entries
 */
export type EndpointPageListRequest = EndpointListRequest;
/**
 * The response after the request for pages was fulfilled
 */
export type EndpointPageListResponse = EndpointListResponse<Page>;
/**
 * A request type for the PageEndpoint that gets a specific page entry
 */
export type EndpointPageGetRequest = EndpointGetRequest;
/**
 * The response after the request for page was fulfilled
 */
export type EndpointPageGetResponse = EndpointGetResponse<Page>;
/**
 * A request type for the PageEndpoint that sets a specific page entry
 */
export type EndpointPageSetRequest = EndpointSetRequest<Page>;
/**
 * A request type for the PageEndpoint that removes a specific page entry
 */
export type EndpointPageRemoveRequest = EndpointRemoveRequest;
/**
 * A request type for the DockEndpoint that gets the config for an entry
 */
export interface EndpointDockGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the config to get.
	 */
	id: string;
	/**
	 * The buttons that are available based on current configuration.
	 */
	availableButtons: DockButton[];
}
/**
 * A response type for the DockEndpoint that gets the config for an entry
 */
export interface EndpointDockGetResponse {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The platform versions it saving the preferences
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The config.
	 */
	config?: DockProviderConfigWithIdentity;
}
/**
 * A request type for the DockEndpoint that sets the config for an entry
 */
export interface EndpointDockSetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The platform versions it saving the preferences
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The config.
	 */
	config?: DockProviderConfigWithIdentity;
}
