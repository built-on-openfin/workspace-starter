import type { InitOptionsHandlerOptions } from "here-workspace-starter/shapes/init-options-shapes";

/**
 * Options for the launch app integration.
 */
export interface LaunchAppOptions extends InitOptionsHandlerOptions {
	/**
	 * Supported manifest types.
	 */
	supportedManifestTypes: string[];
}

/**
 * The payload for launching an app.
 */
export interface LaunchAppPayload {
	/**
	 * The app id.
	 */
	appId: string;
}
