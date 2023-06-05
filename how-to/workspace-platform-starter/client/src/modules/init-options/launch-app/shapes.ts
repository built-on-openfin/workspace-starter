import { type InitOptionsHandlerOptions } from "workspace-platform-starter/shapes";

export interface LaunchAppPayload {
	appId: string;
}

export interface LaunchAppOptions extends InitOptionsHandlerOptions {
	supportedManifestTypes: string[];
}
