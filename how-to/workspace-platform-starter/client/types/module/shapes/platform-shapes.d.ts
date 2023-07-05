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
		workspaceClient: string | undefined;
	};
}
