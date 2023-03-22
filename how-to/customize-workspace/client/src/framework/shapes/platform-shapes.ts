import type { PlatformInteropBrokerOptions } from "./interopbroker-shapes";

export interface PlatformProviderOptions extends PlatformInteropBrokerOptions {
	/** What is the root url of you platform e.g. https://mydomain.com */
	rootUrl: string;
	/** Do you want to enable this platforms sharing capability (you will still need to have 2 endpoints called share-save and share-get for the storing and retrieval of the share target) */
	sharing: boolean;
	/** This is optional and only needed if you are using shell mode where you wish to load a small module with just auth logic first followed by a module with the rest of the platform core. Specify the entry point here. We do generate the provider bundle and provide an example in our docs. */
	initUrl?: string;
}
