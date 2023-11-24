import type { InitOptionsHandlerOptions } from "workspace-platform-starter/shapes/init-options-shapes";

/**
 * Options for the example init options provider.
 */
export interface ExampleInitOptionsProviderOptions extends InitOptionsHandlerOptions {
	/**
	 * Example property that is configured in the manifest.
	 */
	exampleProp?: string;
}

/**
 * Options for the example init options payload.
 */
export interface ExampleInitOptionsPayload {
	/**
	 * Example property passed in the payload.
	 */
	exampleProp?: string;
}
