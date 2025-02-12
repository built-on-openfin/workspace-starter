import type { OpenFin } from "@openfin/core";
import type { DockButton } from "@openfin/workspace";
import type {
	Locale,
	Page,
	Workspace,
	WorkspacePlatformModule,
	WorkspacePlatformProvider
} from "@openfin/workspace-platform";
import type { DockProviderConfigWithIdentity } from "@openfin/workspace-platform/client-api/src";
import type { BrowserProviderOptions } from "./browser-shapes";
import type { ButtonClient } from "./button-shapes";
import type { PlatformConnectionClient } from "./connection-shapes";
import type { DockClient } from "./dock-shapes";
import type { PlatformInteropBrokerOptions } from "./interopbroker-shapes";
import type { LifecycleEvents } from "./lifecycle-shapes";
import type { PlatformMenuClient } from "./menu-shapes";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
import type { SnapProvider } from "./snap-shapes";
import type { PlatformThemeClient } from "./theme-shapes";

/**
 * Platform provider options.
 */
export interface PlatformProviderOptions extends ModuleList {
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
	 * When storing page/workspace data using endpoints disable the mapping which reduces the payload size.
	 */
	disableStorageMapping?: boolean;

	/**
	 * Are you self hosting the workspace platform UI and related assets (workspace 20.1+).
	 */
	workspaceAsar?: {
		/**
		 * The alias that you have used when defining the app asset in your manifest that has the workspace platform zip that is provided in the @openfin/workspace-platform package from version 20.1+.
		 */
		alias: string;

		/**
		 * This is a Workspace Platform Starter specific setting. Default is true if an alias is specified.
		 */
		enabled?: boolean;
	};
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

/**
 * Platform Override helpers provide environment methods and data.
 */
export type PlatformOverrideHelpers = ModuleHelpers & {
	getSnapClient: () => Promise<SnapProvider>;
	fireLifecycleEvent: <T = unknown>(
		platform: WorkspacePlatformModule,
		lifecycleEvent: LifecycleEvents,
		payload?: T
	) => Promise<void>;
	/**
	 * Returns the menu client for the platform override.
	 * @returns The menu client.
	 */
	getMenuClient(): Promise<PlatformMenuClient>;
	/**
	 * Returns the button client for the platform override.
	 * @returns The button client.
	 */
	getButtonClient(): Promise<ButtonClient>;

	/**
	 * Returns the dock client.
	 * @returns The dock client.
	 */
	getDockClient(): Promise<DockClient>;

	/**
	 * Returns a theme client for platform overrides.
	 * @returns The theme client.
	 */
	getThemeClient(): Promise<PlatformThemeClient>;

	/**
	 * Returns the platform connection client.
	 * @returns The platform connection client.
	 */
	getConnectionClient(): Promise<PlatformConnectionClient>;
};

/**
 * Options to pass when initializing the platform override.
 */
export interface PlatformOverrideOptions {
	/**
	 * Options defined for the platform provider.
	 */
	platformProviderOptions: PlatformProviderOptions;
	/**
	 * Options defined for the browser provider.
	 */
	browserProviderOptions: BrowserProviderOptions;
}

/**
 * Definition for platform module type.
 */
export interface PlatformOverride<O = unknown, H = PlatformOverrideHelpers>
	extends ModuleImplementation<O, H> {
	/**
	 * Get the override constructor for the platform override (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the platform override defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	getConstructorOverride(
		options: PlatformOverrideOptions
	): Promise<OpenFin.ConstructorOverride<WorkspacePlatformProvider>>;
}
