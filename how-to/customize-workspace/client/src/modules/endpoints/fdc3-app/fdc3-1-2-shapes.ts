export interface AppImage {
	url: string;
}

export interface AppIcon {
	icon: string;
}

export interface AppIntents {
	name: string;
	displayName: string;
	contexts: string[];
	customConfig: { [key: string]: unknown };
}

export interface AppDefinition {
	appId: string;
	name: string;
	manifest: string;
	manifestType: string;
	version?: string;
	title?: string;
	tooltip?: string;
	description?: string;
	images: AppImage[];
	contactEmail: string;
	supportEmail: string;
	publisher: string;
	icons: AppIcon[];
	customConfig: { [key: string]: unknown };
	intents?: AppIntents[];
}
