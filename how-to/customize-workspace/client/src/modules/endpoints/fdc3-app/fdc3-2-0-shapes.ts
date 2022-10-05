interface Image {
	src: string;
	size?: string;
	type?: string;
}
export type Icon = Image;

export interface Screenshot extends Image {
	label?: string;
}

export interface WebAppDetails {
	url: string;
}

export interface NativeAppDetails {
	path: string;
	arguments?: string;
}

export interface OnlineNativeAppDetails {
	url: string;
}

export interface AppIntents {
	displayName?: string;
	contexts: string[];
	resultType?: string;
	customConfig?: { [key: string]: unknown };
}

export interface AppDefinition {
	appId: string;
	name: string;
	title?: string;
	description?: string;
	categories?: string[];
	version?: string;
	tooltip?: string;
	lang?: string;
	icons: Icon[];
	screenshots?: Screenshot[];
	contactEmail?: string;
	supportEmail?: string;
	moreInfo?: string;
	publisher?: string;
	type: string;
	details: unknown;
	customConfig?: { [key: string]: unknown };
	hostManifests?: { OpenFin: { type: string; details: unknown } };
	interop?: {
		intents?: {
			listensFor?: {
				[key: string]: AppIntents;
			};
			raises?: {
				[key: string]: string;
			};
		};
		userChannels?: {
			broadcasts?: string[];
			listensFor?: string[];
		};
		appChannels?: { name: string; description?: string; broadcasts?: string[]; listensFor?: string[] }[];
	};
	localizedVersions?: { [key: string]: { [key: string]: string } };
}
