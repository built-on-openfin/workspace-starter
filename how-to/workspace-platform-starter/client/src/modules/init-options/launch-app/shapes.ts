import { type InitOptionsHandlerOptions } from "workspace-platform-starter/shapes/init-options-shapes";

export interface LaunchAppPayload {
	appId: string;
}

export interface LaunchAppOptions extends InitOptionsHandlerOptions {
	supportedManifestTypes: string[];
}
