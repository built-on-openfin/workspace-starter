import type { AppIdentifier } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
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
    manifest: string | OpenFin.ViewOptions | OpenFin.WindowOptions | OpenFin.Snapshot | OpenFin.ExternalProcessRequestType | OpenFin.AppAssetInfo;
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
};
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
export type ManifestTypeId = "view" | "inline-view" | "window" | "inline-window" | "snapshot" | "inline-snapshot" | "manifest" | "external" | "inline-external" | "appasset" | "inline-appasset" | "desktop-browser" | "endpoint" | "connection" | "unregistered-app";
/**
 * Manifest types used in reference.
 */
export type ManifestTypesId = "View" | "InlineView" | "Window" | "InlineWindow" | "Snapshot" | "InlineSnapshot" | "Manifest" | "External" | "InlineExternal" | "Appasset" | "InlineAppAsset" | "DesktopBrowser" | "Endpoint" | "Connection" | "UnregisteredApp";
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
export type AppEndpointOptions = string | {
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
    identity: OpenFin.ApplicationIdentity;
    /**
     * The application snapshot.
     */
    snapshot: {
        app?: PlatformApp;
        App?: PlatformApp;
    };
}
