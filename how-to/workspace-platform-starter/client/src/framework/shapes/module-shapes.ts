import type OpenFin from "@openfin/core";
import type { BrowserWindowModule, WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { AnalyticsClient } from "./analytics-shapes";
import type { PlatformApp, PlatformAppIdentifier, UpdatableLaunchPreference } from "./app-shapes";
import type { ConditionsClient } from "./conditions-shapes";
import type { ConnectionValidationOptions, ConnectionValidationResponse } from "./connection-shapes";
import type { DialogClient } from "./dialog-shapes";
import type { EndpointClient } from "./endpoint-shapes";
import type { FavoriteClient } from "./favorite-shapes";
import type { LifecycleEvents, LifecycleHandler } from "./lifecycle-shapes";
import type { Logger, LoggerCreator } from "./logger-shapes";
import type { MenuClient } from "./menu-shapes";
import type { NotificationClient } from "./notification-shapes";
import type { ShareClient } from "./share-shapes";
import type { ThemeClient } from "./theme-shapes";
import type { VersionInfo } from "./version-shapes";

/**
 * List of modules.
 */
export interface ModuleList<T extends ModuleDefinition = ModuleDefinition> {
	/**
	 * The list of modules.
	 */
	modules?: T[];
}

/**
 * The definition of a module with generic data for options.
 */
export interface ModuleDefinition<O = unknown> {
	/**
	 * The id of the module.
	 */
	id: string;

	/**
	 * The title of the module.
	 */
	title: string;

	/**
	 * The description of the module.
	 */
	description?: string;

	/**
	 * Url to more information.
	 */
	info?: string;

	/**
	 * The icon for the module.
	 */
	icon?: string;

	/**
	 * The url to load the module from.
	 */
	url: string;

	/**
	 * Is the module enabled.
	 */
	enabled?: boolean;

	/**
	 * Custom data for the module.
	 */
	data?: O;
}

/**
 * Helper methods and data to pass to the modules during initialization.
 */
export interface ModuleHelpers {
	/**
	 * A unique id that represents this session. This lets you know if it was a long running instance of a workspace
	 * platform or a restarted instance of the platform.
	 */
	sessionId: string;

	/**
	 * Given an application definition and some platform identifiers bring the application to the front.
	 * @param platformApp The app to determine how to bring the application to the front
	 * @param platformAppIdentifiers The platform identifiers to bring to the front.
	 * @returns Nothing.
	 */
	bringAppToFront?(platformApp: PlatformApp, platformAppIdentifiers: PlatformAppIdentifier[]): Promise<void>;

	/**
	 * Get the current platform.
	 * @returns The current platform.
	 */
	getPlatform?(): WorkspacePlatformModule;

	/**
	 * Get Analytics Client.
	 * @returns The analytics client that can be used to feed analytics to the analytics provider or undefined if it isn't available.
	 */
	getAnalyticsClient?(): Promise<AnalyticsClient | undefined>;

	/**
	 * Get the list of apps supported by this platform and/or user.
	 * @returns The list of platform apps available from the module.
	 */
	getApps?(): Promise<PlatformApp[]>;

	/**
	 * Get the app by id.
	 * @param id The id of the app to get.
	 * @returns The app id it exists.
	 */
	getApp?(id: string): Promise<PlatformApp | undefined>;

	/**
	 * Get the version information related to the platform you are running in. If you request the version info on
	 * initialization or you execute early you might not receive all of the version related information as you may be
	 * early. Subscribe to the life cycle event 'after-bootstrap' to ensure you have all the related versioning
	 * information.
	 * @returns The version info.
	 */
	getVersionInfo?(): Promise<VersionInfo>;

	/**
	 * Returns an interop client that can be used to broadcast context and raise intents. The function could be
	 * undefined if you are not allowed to use the function or the returned InteropClient could be undefined if you try
	 * to fetch it before the broker is fully initialized. Please listen for the life cycle event 'after-bootstrap'
	 * before trying to call this function. If you need to handle data before bootstrapping is complete then you can
	 * cache it and use it once the application is bootstrapped and ready.
	 * @returns The interop client.
	 */
	getInteropClient?(): Promise<OpenFin.InteropClient | undefined>;

	/**
	 * If this platform has been configured to support theming it will provide it.
	 * @returns the theme client.
	 */
	getThemeClient(): Promise<ThemeClient>;

	/**
	 * If this platform has been configured to support menus it will provide it.
	 * @returns the menu client.
	 */
	getMenuClient(): Promise<MenuClient>;

	/**
	 * If this platform has been configured to support favorites and you are able to receive favorites
	 * then you will receive a client that will provide you with a number of functions (if supported).
	 * This can let a module add additional support for favorites if they support the supported favorite types.
	 * @returns the favorite client.
	 */
	getFavoriteClient?(): Promise<FavoriteClient | undefined>;

	/**
	 * If this platform has been configured to support notification client then it will provide it.
	 * @returns notification client.
	 */
	getNotificationClient?(): Promise<NotificationClient | undefined>;

	/**
	 * If this platform has been configured to support endpoint client then it will provide it.
	 * @returns endpoint client.
	 */
	getEndpointClient?(): Promise<EndpointClient | undefined>;

	/**
	 * If this platform has been configured to support conditions then it will provide it.
	 * @returns conditions client.
	 */
	getConditionsClient?(): Promise<ConditionsClient | undefined>;

	/**
	 * If this platform has been configured to support sharing then it will provide it.
	 * @returns share client.
	 */
	getShareClient?(): Promise<ShareClient | undefined>;

	/**
	 * If this platform has been configured to support dialogs then it will provide it.
	 * @returns dialog client.
	 */
	getDialogClient?(): Promise<DialogClient | undefined>;

	/**
	 * If the platform has been configured to list supported connections then this API can provide a way of validating the connection.
	 * @param identity The identity of the connection.
	 * @param payload The payload to validate if provided.
	 * @param options The options for the validation (provides additional information such as the type of connection that is trying to be made).
	 * @returns The response from the validation.
	 */
	isConnectionValid?<T>(
		identity: OpenFin.Identity,
		payload?: unknown,
		options?: ConnectionValidationOptions<T>
	): Promise<ConnectionValidationResponse>;

	/**
	 * If available, this function lets you request the launch of an application that is available to this platform and
	 * the current user.
	 * @param appId The id of the application that is registered against the currently running platform
	 * @param launchPreference If the app supports launch preferences then these can be passed.
	 * @returns An array of the platform identities that related from the launch or nothing if nothing was launched.
	 */
	launchApp?(
		appId: string,
		launchPreference?: UpdatableLaunchPreference
	): Promise<PlatformAppIdentifier[] | undefined>;

	/**
	 * Launch a page in the workspace.
	 * @param pageId The page to launch.
	 * @param options The options for the launch.
	 * @param options.bounds The optional bounds for the page.
	 * @param options.targetWindowIdentity The optional target window for the page.
	 * @param options.createCopyIfExists Create a copy of the page if it exists.
	 * @param logger Log output from the operation.
	 * @returns The window created or undefined if the page did not exist.
	 */
	launchPage?(
		pageId: string,
		options?: {
			bounds?: OpenFin.Bounds;
			targetWindowIdentity?: OpenFin.Identity;
			createCopyIfExists?: boolean;
		},
		logger?: Logger
	): Promise<BrowserWindowModule | undefined>;

	/**
	 * Launch a workspace.
	 * @param workspaceId The id of the workspace to launch.
	 * @param logger Log output from the operation.
	 * @returns Was the workspace opened.
	 */
	launchWorkspace?(workspaceId: string, logger?: Logger): Promise<boolean>;

	/**
	 * Launch a view in the workspace.
	 * @param view The view to launch.
	 * @param targetIdentity The optional target identity of the launch with.
	 * @returns The launched view.
	 */
	launchView?(
		view: OpenFin.PlatformViewCreationOptions | string,
		targetIdentity?: OpenFin.Identity
	): Promise<OpenFin.View>;

	/**
	 * Launch a snapshot.
	 * @param snapshotUrl The snapshot url.
	 * @returns The identities that constitute the snapshot.
	 */
	launchSnapshot?(snapshotUrl: string): Promise<OpenFin.Identity[]>;

	/**
	 * Subscribe to lifecycle events.
	 * @param lifecycleEvent The event to subscribe to.
	 * @param lifecycleHandler The handle for the event.
	 * @returns A subscription id to be used with unsubscribe.
	 */
	subscribeLifecycleEvent?<T = unknown>(
		lifecycleEvent: LifecycleEvents,
		lifecycleHandler: LifecycleHandler<T>
	): string;

	/**
	 * Unsubscribe from lifecycle events.
	 * @param subscriptionId The id of the subscription.
	 * @param lifecycleEvent The event to subscribe to.
	 */
	unsubscribeLifecycleEvent?(subscriptionId: string, lifecycleEvent: LifecycleEvents): void;
}

/**
 * The implementation of the module with generic options and helpers.
 */
export interface ModuleImplementation<O = unknown, H = ModuleHelpers> {
	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	initialize?(definition: ModuleDefinition<O>, loggerCreator: LoggerCreator, helpers: H): Promise<void>;

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	closedown?(): Promise<void>;
}

/**
 * The possible module types.
 */
export type ModuleTypes =
	| "actions"
	| "auth"
	| "endpoint"
	| "log"
	| "initOptions"
	| "integrations"
	| "conditions"
	| "lifecycle"
	| "analytics"
	| "menus"
	| "contentCreation"
	| "share"
	| "interopOverride";

/**
 * The definition of a module with typed entry points.
 */
export interface Module<D = unknown, H = ModuleHelpers> {
	/**
	 * The entry points for the module.
	 */
	entryPoints: {
		[type in ModuleTypes]?: ModuleImplementation<D, H>;
	};
}

/**
 * Module entry.
 */
export interface ModuleEntry<
	M extends ModuleImplementation<O, H> = ModuleImplementation<unknown, unknown>,
	H = ModuleHelpers,
	O = unknown,
	D extends ModuleDefinition<O> = ModuleDefinition<O>
> {
	/**
	 * The definition for the module.
	 */
	definition: D;

	/**
	 * The implementation for the module.
	 */
	implementation: M;

	/**
	 * Has the module been initialized.
	 */
	isInitialized: boolean;
}

/**
 * Collection of module entries by type.
 */
export type ModuleEntryTypes = { [moduleType in ModuleTypes]?: ModuleEntry };
