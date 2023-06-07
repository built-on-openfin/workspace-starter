import type OpenFin from "@openfin/core";
import type { MenuEntryDynamic } from "workspace-platform-starter/shapes/menu-shapes";
export interface SharedState {
	aboutWindow?: OpenFin.WindowOptions;
}

export interface AboutActionSettings {
	windowOptions: OpenFin.WindowOptions;
}

export interface AboutProviderSettings {
	title?: string;
	description?: string;
	excludeVersionType?: string[];
	versionTypeMap?: { [key: string]: string };
}

export interface AboutMenusSettings {
	entries?: {
		[id: string]: MenuEntryDynamic;
	};
}
