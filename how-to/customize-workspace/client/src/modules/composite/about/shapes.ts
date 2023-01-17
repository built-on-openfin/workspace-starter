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
