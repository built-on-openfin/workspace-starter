import { type InitOptionsHandlerOptions } from "customize-workspace/shapes";

export interface LaunchAppPayload {
	appId: string;
}

export interface LaunchAppOptions extends InitOptionsHandlerOptions {
	supportedManifestTypes: string[];
}
