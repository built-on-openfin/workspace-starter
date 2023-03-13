import type { AppIdentifier } from "@finos/fdc3";
import type { App } from "@openfin/workspace";

export type PlatformApp = App & {
	/** This indicates that an entry in the directory is something that shouldn't be displayed in a UI (e.g. store, dock, home) but can be launched via an API (from an fdc3, interop api, function or intent picker (as this UI was driven by an API)) */
	private?: boolean;
};

/**
 * When fetching apps you can optionally provide a filter
 */
export interface AppFilterOptions {
	/** Should the list be public apps, private apps or all apps if undefined */
	private?: boolean;
}

export type PlatformAppIdentifier = AppIdentifier & {
	/** Is this application e.g. a view being loaded into a host with a different identity (for targeting purposes) */
	uuid?: string;
};

export type ManifestTypeId =
	| "view"
	| "inline-view"
	| "window"
	| "inline-window"
	| "inline-external"
	| "snapshot"
	| "manifest"
	| "external"
	| "desktop-browser"
	| "endpoint"
	| "connection";

export interface ManifestType {
	id: ManifestTypeId;
	label: string;
	description: string;
}

export type AppEndpointOptions =
	| string
	| {
			inputId: string;
			outputId?: string;
	  };
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
	 * If app assets are included as part of the available apps what tag should the platform look for to identify it
	 * as such e.g. "appasset".
	 * */
	appAssetTag?: string;
	/**
	 * The specified app sources may include apps of many different manifest types. Which manifest types do you want
	 * your platform to support (only the ones listed will be included in the end result).
	 * */
	manifestTypes?: ManifestTypeId[];
}
