interface Image {
	/** Image url */
	src: string;
	/** Image dimension formatted as <height>x<width>*/
	size?: string;
	/** Image media type. If not present the platform may use the src file extension*/
	type?: string;
}
export type Icon = Image;

export interface Screenshot extends Image {
	/** Optional caption for the image */
	label?: string;
}

export interface WebAppDetails {
	/** Application start URL. */
	url: string;
}

export interface NativeAppDetails {
	/** The path on disk from which the application is launched. */
	path: string;
	/** Arguments that must be passed on the command line to launch the app in the expected configuration. */
	arguments?: string;
}

export interface OnlineNativeAppDetails {
	/** Application URL */
	url: string;
}

export interface CitrixAppDetails {
	/** The Citrix alias / name of the virtual app (passed to the Citrix SelfService qlaunch parameter). */
	alias: string;
	/** Arguments that must be passed on the command line to launch the app in the expected configuration. */
	arguments?: string;
}

/** Use an empty object here and fill in the details object in the OpenFin definition in the hostManifests section */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OtherAppDetails {}

export interface AppIntents {
	/** An optional display name for the intent that may be used in UI instead of the name. */
	displayName?: string;
	/** Required. A comma separated list of the types of contexts the intent offered by the application can process, where the first part of the context type is the namespace e.g."fdc3.contact, org.companyname.contact" */
	contexts: string[];
	/**
	 * An optional type for output returned by the application, if any, when resolving this intent. May indicate a context type by type name (e.g. "fdc3.instrument"), a channel (e.g. "channel") or a combination
	 * that indicates a channel that returns a particular context type (e.g. "channel<fdc3.instrument>").
	 * */
	resultType?: string;
	/** Custom configuration for the intent that may be required for a particular desktop agent. **/
	customConfig?: { [key: string]: unknown };
}

export interface AppInterop {
	/** Describes the app's interactions with intents. */
	intents?: {
		/**
		 * A mapping of Intents names that an app listens for via fdc3.addIntentListener() or fin.me.interop.registerIntentHandler.
		 * Used to support intent resolution by the interop broker. Replaces the intents array used previously.
		 */
		listensFor?: {
			/** Definition of an intent that an app listens for */
			[key: string]: AppIntents;
		};
		/** A mapping of Intent names that an app raises (via fdc3.raiseIntent) to an array of context type names that it may be raised with. Use the intent name "any" to represent use of the fdc3.raiseIntentForContext
		 * and fdc3.findIntentForContext functions, which allow the user to select from intents available for a specified context type.*/
		raises?: {
			[key: string]: string[];
		};
	};
	/** Describes the application's use of context types on User Channels. */
	userChannels?: {
		/** Context type names that are broadcast by the application. */
		broadcasts?: string[];
		/** Context type names that the application listens for. */
		listensFor?: string[];
	};
	/** Describes the application's use of App Channels. */
	appChannels?: {
		/** The name of the App Channel. */
		name: string;
		/** A description of how the channel is used. */
		description?: string;
		/** Context type names that are broadcast by the application on the channel. */
		broadcasts?: string[];
		/** Context type names that the application listens for on the channel. */
		listensFor?: string[];
	}[];
}

/** The technology type that is used to launch and run the application. Each application type implies a particular set of launch details. */
export type AppDefinitionType = "web" | "native" | "citrix" | "onlineNative" | "other";

export interface AppDefinition {
	/** The unique application identifier located within a specific application directory instance. */
	appId: string;
	/** The name of the application. The name should be unique within an App Directory instance. */
	name: string;
	/** The title for the application, if missing use appName, typically used in a launcher UI. */
	title?: string;
	/** Description of the application. This will typically be a 1-2 paragraph style blurb about the application. */
	description?: string;
	/** An array of string categories that describe the application. These are meant as a hint to catalogs or stores listing apps and can be used by the Workspace Home filter. */
	categories?: string[];
	/** Version of the application. This allows multiple app versions to be defined using the same app name. This can be a triplet but can also include things like 1.2.5 (BETA) */
	version?: string;
	/** Optional tooltip description e.g. for a launcher or dock component */
	tooltip?: string;
	/** A language tag that specifies the primary language of both the application and its entry, as defined by IETF RFC 5646. */
	lang?: string;
	/** Holds Icons used for the application, This icon could be used for entries in the OpenFin Workspace HOME, DOCK or STORE Components */
	icons?: Icon[];
	/** Array of images to show the user when they are looking at app description. Each image can have an optional description/tooltip. These images could be used in the
	 * OpenFin Workspace STORE and HOME components or it could be used by an Intent Resolver to provide a visual queue as to the application that will handle the intent.
	 */
	screenshots?: Screenshot[];
	/** Optional e-mail to receive queries about the application */
	contactEmail?: string;
	/** Optional e-mail to receive support requests for the application */
	supportEmail?: string;
	/** Optional URL that provides more information about the application */
	moreInfo?: string;
	/** The name of the company that owns the application. The publisher has control over their namespace/app/signature. */
	publisher?: string;
	/** The technology type that is used to launch and run the application. Each application type implies a particular set of launch details. */
	type: AppDefinitionType;
	/** The type specific launch details of the application. These details are intended to be vendor-agnostic and MAY be duplicated or overridden by details provided in the hostManifests OpenFin object.*/
	details: WebAppDetails | NativeAppDetails | OnlineNativeAppDetails | CitrixAppDetails | OtherAppDetails;
	/** An optional set of name value pairs that can be used to deliver custom data from an App Directory to a launcher. */
	customConfig?: { [key: string]: unknown };
	/**
	 * A mapping from host name to a host-specific application manifest object or URI from which that manifest can be retrieved.
	 * The manifest should provide details required to launch and use the application within the specified host.
	 * The manifest MAY duplicate or override information provided in the details field. For web entries the url is fetched from the details
	 * but you would want to specify custom view manifest options (or point to a manifest) in the hostManifests.OpenFin.details setting.
	 * For Windows or Snapshots (other ways of rendering urls) please use the type other and then specify the manifest type in the
	 * hostManifests.OpenFin.type setting along with the relevant details.
	 */
	hostManifests?: {
		OpenFin: {
			/** this is the manifest type id used by OpenFin and specified if root type is defined as other.*/
			type?: string;
			/** this can be a path to a manifest file specific to this type of it can be the manifest object itself if using an inline type or extending the details from the root. */
			details?: string | unknown;
			/** An area for config related to this app for the platform hosting it. This isn't specific to the app manifest but how the platform can manage the app. */
			config?: {
				/** does the application wish to be automatically started when the platform is initialized. Default behavior is false. */
				autostart?: boolean;
				/** Should this app be private and not listed in any UI e.g. Workspace HOME, DOCK or STORE (useful if it is intended to be a background window that acts as an intent handler) */
				private?: boolean;
				/** This only applies to web views/windows. Default is multi instance. Should we aim to only launch one instance of this application and only show the app even if the intent resolver ui supports instances of apps. If multi should
				 * we support multiple instances and let the user decide whether to launch a new instance or pick an existing one from the intent picker? If new it means the intent picker will not show the option to pick an instance because the
				 * app owner wants a new instance every time. And if an intent is raised and just the id of the app is specified it will always launch a new instance   */
				instanceMode?: "multi" | "single" | "new";
			};
		};
	};
	/**
	 * Metadata that describes how the application uses FDC3/Interop APIs. This metadata serves multiple purposes:
	 * - It supports intent resolution by an OpenFin Platform/ interop agent, by declaring what intents an app listens for.
	 * - It may be used, for example in an app catalog UI, to find apps that 'interoperate with' other apps.
	 * - It provides a standard location to document how the app interacts with user channels, app channels, and intents, for use by other app developers and desktop assemblers.
	 */
	interop?: AppInterop;
	/** Provides localized alternatives to any field of the app definition, which may also refer to an alternative version of the application that is also localized
	 * (e.g. by providing customConfig or an alternative URL).
	 * The keys to this object should be language tags as defined by IETF RFC 5646, e.g. en, en-GB or fr-FR.
	 * */
	localizedVersions?: { [key: string]: { [key: string]: string } };
}

/** The successful response expected from a FDC3 2.0 request when all applications are requested. */
export interface FDC3VTwoPointZeroAppDirectoryResponse {
	/** The schema that helps guide the structure of the response */
	$schema: string;
	/** List of applications */
	applications: AppDefinition[];

	/** Response message providing status of query */
	message?: string;

	/** Metadata that provides information beyond the url path to help identify the format of the response that has been received. */
	metadata?: {
		type: "fdc3";
		version: "2.0";
	};
}
