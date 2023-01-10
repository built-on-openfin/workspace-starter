export interface VersionInfo {
	/** The version of the the instance of this platform if provided */
	app?: string;
	/** The version of the code of this platform */
	platformClient?: string;
	/** The version of the workspace platform client code */
	workspacePlatformClient?: string;
	/** The version of the workspace client code */
	workspaceClient?: string;
	/** The version of the workspace components this platform is currently connected to */
	workspace?: string;
	/** The version of the notification center that this platform instance has connected to */
	notificationCenter?: string;
	/** The version of the runtime this platform instance is running against */
	runtime?: string;
	/** The version of the rvm that was used to launch this platform */
	rvm?: string;
}

export interface VersionProviderOptions {
	/** The version of the the instance of this platform */
	appVersion?: string;

	/** You can specify if the platform should stop initializing if the version is less than any of the specified minimum versions */
	minimumVersion?: MinimumVersion;

	/** You can specify if the platform should stop initializing if the version is more than any of the specified maximum versions */
	maximumVersion?: MaximumVersion;

	/**
	 * If the minimum version is not met and a window is configured then:
	 * - any workspace component registrations will be un-registered
	 * - the configured window will be shown and passed the current version and minimum version as customData
	 * Otherwise the platform will continue to load and the version information will be passed onto loaded modules
	 * through the getVersionInfo function exposed through the passed helper.
	 */
	versionWindow?: unknown;
}

export interface VersionWindowCustomData {
	/** The collection version information */
	versionInfo: VersionInfo;
	/** The configured minimum limits */
	minVersion: MinimumVersion;
	/** The configured maximum limits */
	maxVersion: MaximumVersion;
	/** The version type that failed the minimum requirements */
	minFail: string[];
	/** The version type that failed the maximum requirements */
	maxFail: string[];
}

export type VersionType =
	| "PlatformClient"
	| "WorkspacePlatformClient"
	| "WorkspaceClient"
	| "Workspace"
	| "NotificationCenter"
	| "Runtime"
	| "RVM";

export type MinimumVersion = Omit<VersionInfo, "app">;

export type MaximumVersion = Omit<VersionInfo, "app">;
