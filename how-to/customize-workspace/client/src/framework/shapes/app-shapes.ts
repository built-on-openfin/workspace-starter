import type { AppIdentifier } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import type { App } from "@openfin/workspace";
import type { AppInterop } from "./fdc3-2-0-shapes";

export type PlatformApp = App & {
	/** does the application wish to be automatically started when the platform is initialized. Default behavior is false. */
	autostart?: boolean;
	/** This indicates that an entry in the directory is something that shouldn't be displayed in a UI (e.g. store, dock, home) but can be launched via an API (from an fdc3, interop api, function or intent picker (as this UI was driven by an API)) */
	private?: boolean;
	/** This only applies to web views/windows. Default is multi instance. Should we aim to only launch one instance of this application and only show the app even if the intent resolver ui supports instances of apps. If multi should
	 * we support multiple instances and let the user decide whether to launch a new instance or pick an existing one from the intent picker? If new it means the intent picker will not show the option to pick an instance because the
	 * app owner wants a new instance every time. And if an intent is raised and just the id of the app is specified it will always launch a new instance   */
	instanceMode?: "multi" | "single" | "new";
	/** An optional set of name value pairs that can be used to deliver custom data from an App Directory to a launcher */
	customConfig?: { [key: string]: unknown };
	manifest:
		| string
		| OpenFin.ViewOptions
		| OpenFin.WindowOptions
		| OpenFin.Snapshot
		| OpenFin.ExternalProcessRequestType
		| OpenFin.AppAssetInfo;
	/**
	 * Metadata that describes how the application uses FDC3/Interop APIs. This metadata serves multiple purposes:
	 * - It supports intent resolution by an OpenFin Platform/ interop agent, by declaring what intents an app listens for.
	 * - It may be used, for example in an app catalog UI, to find apps that 'interoperate with' other apps.
	 * - It provides a standard location to document how the app interacts with user channels, app channels, and intents, for use by other app developers and desktop assemblers.
	 */
	interop?: PlatformAppInterop;
	/** Optional tooltip description e.g. for a launcher or dock component */
	tooltip?: string;
	/** Optional URL that provides more information about the application */
	moreInfo?: string;
	/** name is provided for support for fdc3 mappings if not provided then appId is used as name. Internally we use appId.*/
	name?: string;
};

export type PlatformAppInterop = AppInterop;

/**
 * When fetching apps you can optionally provide a filter
 */
export interface AppFilterOptions {
	/** Should the list be public apps, private apps or all apps if undefined */
	private?: boolean;
	/** Is this app marked as one that should be automatically started? */
	autostart?: boolean;
}

export type PlatformAppIdentifier = AppIdentifier & OpenFin.Identity;

export type ManifestTypeId =
	| "view"
	| "inline-view"
	| "window"
	| "inline-window"
	| "snapshot"
	| "inline-snapshot"
	| "manifest"
	| "external"
	| "inline-external"
	| "appasset"
	| "inline-appasset"
	| "desktop-browser"
	| "endpoint"
	| "connection"
	| "unregistered-app";

export type ManifestTypesId =
	| "view"
	| "inlineView"
	| "window"
	| "inlineWindow"
	| "snapshot"
	| "inlineSnapshot"
	| "manifest"
	| "external"
	| "inlineExternal"
	| "appasset"
	| "inlineAppAsset"
	| "desktopBrowser"
	| "endpoint"
	| "connection"
	| "unregisteredApp";

export interface ManifestType {
	id: ManifestTypeId;
	label: string;
	description: string;
}

export type ManifestTypes = {
	[key in ManifestTypesId]: ManifestType;
};

export type AppEndpointOptions =
	| string
	| {
			inputId: string;
			outputId?: string;
	  };

export type PlatformApps = PlatformApp[];

export type PlatformViewOptions = OpenFin.ViewOptions;

export type PlatformWindowOptions = OpenFin.WindowOptions;

export type PlatformSnapshotOptions = OpenFin.Snapshot;

/**
 * App Provider settings to configure where apps are fetched from.
 */
export interface AppProviderOptions {
	/**
	 * Legacy - Where should we fetch the apps from. It is a url or an array of urls
	 * from which to get apps data from. If present it will be used instead of
	 * endpointIds.
	 * */
	appsSourceUrl?: string | string[];
	/**
	 * An array of endpoints that should be used to request a list of apps. The array
	 * entry can be a string (representing the array id) or an object with an inputId
	 * that maps to an endpoint id and gets passed to the endpoint specified using the
	 * outputId (this is useful for mapping apps from one format to another)
	 * */
	endpointIds?: AppEndpointOptions[];
	/**
	 * Legacy - Used when appsSourceUrl is used. This is specified as part of the options of
	 * the fetch request.
	 * */
	includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
	/**
	 * Once all apps are fetched and processed from the one or more sources specified, how long should the
	 * result be cached for in minutes (can be used with the seconds setting).
	 * */
	cacheDurationInMinutes?: number;
	/**
	 * Once all apps are fetched and processed from the one or more sources specified, how long should the
	 * result be cached for in seconds (can be used on it's own or in addition to the minutes setting).
	 * */
	cacheDurationInSeconds?: number;
	/**
	 * The specified app sources may include apps of many different manifest types. Which manifest types do you want
	 * your platform to support (only the ones listed will be included in the end result).
	 * */
	manifestTypes?: ManifestTypeId[];
}

export interface AppsForIntent {
	intent: { name: string; displayName: string };
	apps: PlatformApps;
}
