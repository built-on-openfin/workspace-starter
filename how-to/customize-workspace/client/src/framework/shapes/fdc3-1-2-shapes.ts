export interface AppImage {
	/** A url to the image. */
	url: string;
}

export interface AppIcon {
	/** A url to the image. */
	icon: string;
}

export interface AppIntents {
	/** The name of the intent to 'launch'. In this case the name of an Intent supported by an Application. */
	name: string;
	/** An optional display name for the intent that may be used in UI instead of the name. */
	displayName: string;
	/** A comma separated list of the types of contexts the intent offered by the application can process. where the first part of the context type is the namespace e.g."fdc3.contact, org.companyname.contact" */
	contexts: string[];
	/** Custom configuration for the intent that may be required by a platform. */
	customConfig?: { [key: string]: unknown };
}

export interface CustomConfig {
	[key: string]: unknown;
	/** Should this application not be listed in OpenFin Workspace components e.g. Workspace HOME, DOCK or STORE. It may be that this app entry is mainly for responding to intent requests and shouldn't be launched directly. */
	private?: string | boolean;
	/** This only applies to web views/windows. Default is multi instance. Should we aim to only launch one instance of this application and only show the app even if the intent resolver ui supports instances of apps.  */
	instanceMode?: "multi" | "single";
}

export interface AppDefinition {
	/** The unique application identifier located within a specific application directory instance. */
	appId: string;
	/**  The name of the application. The name should be unique within an App Directory instance.*/
	name: string;
	/** URI or full JSON of the application manifest providing all details related to launch and use requirements as described by OpenFin. The format of this manifest for this platform is OpenFin specific, but can be identified by the manifestType attribute. */
	manifest: string;
	/** The manifest type which relates to the format and structure of the manifest content. The definition is based on what is supported by the platform this application directory is running against.  */
	manifestType: string;
	/** Version of the application. This allows multiple app versions to be defined using the same app name. This can be a triplet but can also include things like 1.2.5 (BETA) */
	version?: string;
	/** Title for the application, Can be used in the OpenFin Workspace HOME, STORE and DOCK components. */
	title?: string;
	/** Optional tooltip description e.g. for a OpenFin Workspace Dock button */
	tooltip?: string;
	/** Description of the application. This will typically be a 1-2 paragraph style blurb about the application. This should be plain text. */
	description?: string;
	/** Array of images to show the user when they are looking at app description. */
	images?: AppImage[];
	/** E-mail to receive queries about the application */
	contactEmail?: string;
	/** E-mail to receive queries about the application */
	supportEmail?: string;
	/** The name of the company that owns the application. The publisher has control over their namespace/app/signature. */
	publisher?: string;
	/** Holds Icons used for the application. The icon can be used in the OpenFin Workspace HOME, STORE and DOCK components. */
	icons?: AppIcon[];
	/** An optional set of name value pairs that can be used to deliver custom data from an App Directory to a platform. */
	customConfig?: CustomConfig;
	/** The list of intents implemented by the Application */
	intents?: AppIntents[];
}

/** The successful response expected from a FDC3 1.2 request when all applications are requested. */
export interface AppDirectoryResponse {
	/** List of applications */
	applications: AppDefinition[];
	/** Response message providing status of query */
	message?: string;
	/** Metadata that provides information beyond the url path to help identify the format of the response that has been received. */
	metadata?: {
		type: "fdc3";
		version: "1.2";
	};
}
