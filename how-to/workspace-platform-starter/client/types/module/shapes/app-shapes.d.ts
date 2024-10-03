import type { AppIdentifier } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import type { LaunchStrategy } from "@openfin/snap-sdk";
import type { App } from "@openfin/workspace";
import type { AppInterop } from "./fdc3-2-0-shapes";
/**
 * Definition for application with extended properties.
 */
export type PlatformApp = App & {
	/**
	 * Does the application wish to be automatically started when the platform
	 * is initialized. Default behavior is false
	 */
	autostart?: boolean;
	/**
	 * This indicates that an entry in the directory is something that shouldn't
	 * be displayed in a UI (e.g. store, dock, home) but can be launched via an
	 * API (from an fdc3, interop api, function or intent picker (as this UI was
	 * driven by an API))
	 */
	private?: boolean;
	/**
	 * This only applies to web views/windows. Default is multi instance. Should
	 * we aim to only launch one instance of this application and only show the
	 * app even if the intent resolver ui supports instances of apps. If multi
	 * should we support multiple instances and let the user decide whether to
	 * launch a new instance or pick an existing one from the intent picker? If
	 * new it means the intent picker will not show the option to pick an
	 * instance because the app owner wants a new instance every time. And if an
	 * intent is raised and just the id of the app is specified it will always
	 * launch a new instance
	 */
	instanceMode?: "multi" | "single" | "new";
	/**
	 * An optional set of name value pairs that can be used to deliver custom
	 * data from an App Directory to a launcher.
	 */
	customConfig?: {
		[key: string]: unknown;
	};
	/**
	 * The different types of content that can be contained in the manifest.
	 */
	manifest:
		| string
		| Partial<OpenFin.ViewOptions>
		| Partial<OpenFin.WindowOptions>
		| Partial<OpenFin.Snapshot>
		| Partial<OpenFin.ExternalProcessRequestType>
		| Partial<OpenFin.AppAssetInfo>;
	/**
	 * Metadata that describes how the application uses FDC3/Interop APIs. This
	 * metadata serves multiple purposes:
	 * - It supports intent resolution by an OpenFin Platform/ interop agent, by
	 * declaring what intents an app listens for.
	 * - It may be used, for example in an app catalog UI, to find apps that
	 * 'interoperate with' other apps.
	 * - It provides a standard location to document how the app interacts with
	 * user channels, app channels, and intents, for use by other app
	 * developers and desktop assemblers.
	 */
	interop?: PlatformAppInterop;
	/**
	 * Optional tooltip description e.g. for a launcher or dock component
	 */
	tooltip?: string;
	/**
	 * Optional URL that provides more information about the application
	 */
	moreInfo?: string;
	/**
	 * Name is provided for support for fdc3 mappings if not provided then appId
	 * is used as name. Internally we use appId
	 */
	name?: string;
	/**
	 * When launching this defined application are there additional preferences the platform
	 * should consider?
	 */
	launchPreference?: LaunchPreference;
};
/**
 * Are there any preferences you would like to apply when launching this application?
 */
export interface LaunchPreference {
	/**
	 * Do you wish to specify a custom height/width and/or x/y position that should be used when this application is launched?
	 */
	bounds?: Partial<OpenFin.Bounds>;
	/**
	 * Should the launched UI be positioned in the center of the screen?
	 */
	defaultCentered?: boolean;
	/**
	 * Are there any app type specific options you would like to apply?
	 */
	options?: ViewLaunchOptions | WindowLaunchOptions | NativeLaunchOptions;
}
/**
 *
 */
export type UpdatableLaunchPreference = LaunchPreference;
/**
 * A type that contains the available updatable launch preferences
 */
export type UpdatableLaunchPreferenceDefinition =
	| WindowPreference
	| WindowPreferenceUrl
	| ViewPreference
	| ViewPreferenceUrl
	| NativePreference;
/**
 * The list of Launch Option Types
 */
export type LaunchOptionsType = "view" | "window" | "native";
/**
 * The base LaunchOption type.
 */
export interface LaunchOptions {
	/**
	 * The type the options are linked to.
	 */
	type: LaunchOptionsType;
}
/**
 * Additional options that apply to a view
 */
export interface ViewLaunchOptions extends LaunchOptions {
	/**
	 * View options type
	 */
	type: "view";
	/**
	 * If specified it indicates wish to specify specific host settings for this content.
	 */
	host?: HostLaunchOptions;
	/**
	 * The option to override a few settings that are specific to views.
	 */
	view?: Partial<Pick<OpenFin.ViewOptions, "url" | "interop" | "customData">>;
	/**
	 * What can be specified when launching a view. This is an array of named types to reflect the properties you are happy to be specified.
	 * By default nothing can be set outside of the app definition when launching the app.
	 */
	updatable?: (ViewPreference | ViewPreferenceUrl)[];
}
/**
 * A list of all the names of possible preferences that can be updated.
 */
export type PreferenceName = ViewPreferenceName | WebPreferenceName | NativePreferenceName;
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface Preference<T = unknown> {
	/**
	 * What setting is updatable?
	 */
	name: PreferenceName;
	/**
	 * Is there a constraint that the platform can apply?
	 */
	constraint?: T;
}
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface NativePreference<T = never> extends Preference<T> {
	/**
	 * What setting is updatable?
	 */
	name: NativePreferenceName;
}
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface ViewPreference<T = never> extends Preference<T> {
	/**
	 * What setting is updatable?
	 */
	name: ViewPreferenceName;
}
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface ViewPreferenceUrl extends ViewPreference<PreferenceConstraintUrl> {
	/**
	 * Is the url updatable?
	 */
	name: "url" | "host-options";
}
/**
 * A list of native related settings that can be updated.
 */
export type NativePreferenceName = "arguments";
/**
 * A list of web related settings that can be updated.
 */
export type WebPreferenceName = "url" | "custom-data" | "interop" | "bounds" | "centered";
/**
 * A list of Web related constraints
 */
export type PreferenceConstraintUrl = "url-domain" | "url-page" | "url-any" | "url-none";
/**
 * The different type of settings that might apply to a view
 */
export type ViewPreferenceName = WebPreferenceName | "host-options";
/**
 * Additional options that apply to a native app
 */
export interface NativeLaunchOptions extends LaunchOptions {
	/**
	 * Native options type
	 */
	type: "native";
	/**
	 * If specified it indicates the native app should be included when snapping.
	 */
	snap?: SnapLaunchOptions;
	/**
	 * Launch Preferences related to native apps
	 */
	native?: {
		/**
		 * Arguments are set as an array for compatibility with appAssets, launchExternalProcess and Snap.
		 */
		arguments?: string[];
	};
	/**
	 * What can be specified when launching a native app. This is an array of named types to reflect the properties you are happy to be specified.
	 * By default nothing can be set outside of the app definition when launching the app.
	 */
	updatable?: NativePreference[];
}
/**
 * Additional options that apply to the host of the content
 */
export interface HostLaunchOptions {
	/**
	 * If specified it indicates you do not want to use a browser window for this view but a platform window.
	 */
	url?: string;
	/**
	 * If specified it indicates a preference to be used by this type of host.
	 */
	title?: string;
	/** The Icon you would prefer the window shows. */
	icon?: string;
	/**
	 * Should the header for the content be hidden
	 */
	hasHeaders?: boolean;
	/**
	 * Should the host support multi layouts (e.g. pages). Assumes the default for each host will be used.
	 */
	disableMultiplePages?: boolean;
	/**
	 * Should the toolbar options of a window be hidden if they are available?
	 */
	disableToolbarOptions?: boolean;
	/**
	 * If this host supports multiple layouts what should the layout (e.g page) title be?
	 */
	pageTitle?: string;
	/**
	 * If this host supports multiple layouts what should the icon be for the layout (e.g. page) be?
	 */
	pageIcon?: string;
}
/**
 * Additional options that apply to the app when used in a snap context
 */
export interface SnapLaunchOptions {
	/**
	 * The strategy for launching and locating the application.
	 */
	strategy?: LaunchStrategy;
}
/**
 * Additional options that apply to a window
 */
export interface WindowLaunchOptions extends LaunchOptions {
	/**
	 * Window options type
	 */
	type: "window";
	/**
	 * The option to override a few settings that are specific to windows.
	 */
	window?: Partial<Pick<OpenFin.WindowOptions, "url" | "interop" | "customData">>;
	/**
	 * What can be specified when launching a window. This is an array of named types to reflect the properties you are happy to be specified.
	 * By default nothing can be set outside of the app definition when launching the app.
	 */
	updatable?: (WindowPreference | WindowPreferenceUrl)[];
}
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface WindowPreference<T = never> extends Preference<T> {
	/**
	 * What setting is updatable?
	 */
	name: WebPreferenceName;
}
/**
 * Which Launch Options are updatable and are there any constraints
 */
export interface WindowPreferenceUrl extends Preference<PreferenceConstraintUrl> {
	/**
	 * Is the url updatable?
	 */
	name: "url";
}
/**
 * We define the app interop app for the platform in case we want to extend its
 * properties.
 */
export type PlatformAppInterop = AppInterop;
/**
 * When fetching apps you can optionally provide a filter
 */
export interface AppFilterOptions {
	/**
	 * Should the list be public apps, private apps or all apps if undefined
	 */
	private?: boolean;
	/**
	 * Is this app marked as one that should be automatically started?
	 */
	autostart?: boolean;
}
/**
 * An identifier for an application on a platform.
 */
export type PlatformAppIdentifier = AppIdentifier & OpenFin.Identity;
/**
 * Manifest types used in manifest files.
 */
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
/**
 * Manifest types used in reference.
 */
export type ManifestTypesId =
	| "View"
	| "InlineView"
	| "Window"
	| "InlineWindow"
	| "Snapshot"
	| "InlineSnapshot"
	| "Manifest"
	| "External"
	| "InlineExternal"
	| "Appasset"
	| "InlineAppAsset"
	| "DesktopBrowser"
	| "Endpoint"
	| "Connection"
	| "UnregisteredApp";
/**
 * Manifest type definition.
 */
export interface ManifestType {
	/**
	 * The id of the manifest type.
	 */
	id: ManifestTypeId;
	/**
	 * A label for the manifest type.
	 */
	label: string;
	/**
	 * Description for the manifest type.
	 */
	description: string;
}
/**
 * All of the manifest types.
 */
export type ManifestTypes = {
	[key in ManifestTypesId]: ManifestType;
};
/**
 * Application endpoint which can be a string, or a mapping.
 */
export type AppEndpointOptions =
	| string
	| {
			inputId: string;
			outputId?: string;
	  };
/**
 * List of platform apps.
 */
export type PlatformApps = PlatformApp[];
/**
 * Platform view options, currently same as regular view options.
 */
export type PlatformViewOptions = OpenFin.ViewOptions;
/**
 * Platform window options, currently same as regular window options.
 */
export type PlatformWindowOptions = OpenFin.WindowOptions;
/**
 * Platform snapshot options, currently same as regular snapshot options.
 */
export type PlatformSnapshotOptions = OpenFin.Snapshot;
/**
 * App Provider settings to configure where apps are fetched from.
 */
export interface AppProviderOptions {
	/**
	 * Legacy - Where should we fetch the apps from. It is a url or an array of urls from which to get apps data from.
	 * If present it will be used instead of endpointIds.
	 */
	appsSourceUrl?: string | string[];
	/**
	 * An array of endpoints that should be used to request a list of apps. The array entry can be a string
	 * (representing the array id) or an object with an inputId that maps to an endpoint id and gets passed to the
	 * endpoint specified using the outputId (this is useful for mapping apps from one format to another)
	 */
	endpointIds?: AppEndpointOptions[];
	/**
	 * Legacy - Used when appsSourceUrl is used. This is specified as part of the options of the fetch request.
	 */
	includeCredentialOnSourceRequest?: "omit" | "same-origin" | "include";
	/**
	 * The cache strategy determines when the cache should be checked for expiry.
	 * on-demand means that the cache expiry is checked every time apps are requested in code, this strategy
	 * reduces the overhead of app requests, but may take longer for app lists to update from dynamic endpoints
	 * interval means that the cache expiry is checked by an interval timer, this mode will increase the amount
	 * app requested performed, but the app lists will be updated more quickly
	 * The default is on-demand
	 */
	cacheRetrievalStrategy?: "on-demand" | "interval";
	/**
	 * Once all apps are fetched and processed from the one or more sources specified, how long should the result be
	 * cached for in minutes (can be used with the seconds setting).
	 */
	cacheDurationInMinutes?: number;
	/**
	 * Once all apps are fetched and processed from the one or more sources specified, how long should the result be
	 * cached for in seconds (can be used on it's own or in addition to the minutes setting).
	 */
	cacheDurationInSeconds?: number;
	/**
	 * The specified app sources may include apps of many different manifest types. Which manifest types do you want
	 * your platform to support (only the ones listed will be included in the end result).
	 */
	manifestTypes?: ManifestTypeId[];
	/**
	 * Do you wish to allow specific launchPreferences to be specified when launching an app by default?
	 */
	updatableLaunchPreference?: UpdatableLaunchPreferenceDefinition[];
}
/**
 * Applications that support specific intent.
 */
export interface AppsForIntent {
	/**
	 * The intent that is supported.
	 */
	intent: {
		name: string;
		displayName?: string;
	};
	/**
	 * The list of apps which support the intent.
	 */
	apps: PlatformApps;
}
/**
 * Client snapshot.
 */
export interface ClientSnapshot {
	/**
	 * The identity of the application which provided the snapshot.
	 */
	identity: OpenFin.Identity;
	/**
	 * The application snapshot.
	 */
	snapshot: {
		app?: PlatformApp;
		App?: PlatformApp;
	};
}
