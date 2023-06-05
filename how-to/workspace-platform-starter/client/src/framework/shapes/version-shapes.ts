import type OpenFin from "@openfin/core";

/* Information about the version of the platform and it's dependencies */
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
/* Settings related to the configuration of the version provider. */
export interface VersionProviderOptions {
	/** The version of the the instance of this platform */
	appVersion?: string;

	/** You can specify if the platform should stop initializing if the version is less than any of the specified minimum versions */
	minVersion?: MinimumVersion;

	/** You can specify if the platform should stop initializing if the version is more than any of the specified maximum versions */
	maxVersion?: MaximumVersion;

	/**
	 * This window will be shown if an endpointId is not specified and min and max criteria has been specified and has not been met.
	 * This window will be shown to the user and the bootstrapping process will be stopped.
	 */
	versionWindow?: Partial<OpenFin.WindowOptions>;

	/**
	 * If you specify an endpoint then you are telling the platform to send information to this endpoint.
	 * The information sent will be the VersionRequest object.
	 * If you provide minimumVersion and maximumVersion information in the settings then the
	 * platform will use those to calculate what has failed validation (minimum and/or maximum) and pass
	 * those onto the endpoint.
	 *
	 * The endpoint then returns an object with status (this returns the version info you sent, the min/max rules and what has failed. The failures indicate the state of the platform.).
	 * If the status indicates that things need to be managed and should not proceed they will have a windowOptions property. This should be launched and that window will be built to
	 * support what should happen next.
	 * - Should the window tell the user that the setup isn't compatible and offer to shut down the platform?
	 * - Should it try to close the platform and launch a compatible manifest?
	 * - Should it notify the user that a newer version of the app is available and that they should restart?
	 * On the initial request while the platform is running an invalid status will result in the bootstrapping stopping.
	 */
	endpointId?: string;

	/**
	 * If an endpoint is specified and an interval is specified then you want the platform to call this endpoint on an
	 * interval to see if an update of your application is available.
	 */
	versionCheckIntervalInSeconds?: number;
}
/** What is the current version information of a platform, it's valid versioning criteria and what if anything has failed that validation */
export interface VersionStatusData {
	/** The collection version information */
	versionInfo: VersionInfo;
	/** The configured minimum limits */
	minVersion?: MinimumVersion;
	/** The configured maximum limits */
	maxVersion?: MaximumVersion;
	/** The version type that failed the minimum requirements */
	minFail?: VersionType[];
	/** The version type that failed the maximum requirements */
	maxFail?: VersionType[];
}

/** If an endpoint is configured for the VersionProvider then this is the shape of the request that will be sent. */
export type VersionRequest = VersionStatusData;

/** If an endpoint has been used to get dynamic criteria what if anything has been the response. */
export interface VersionResponse {
	windowOptions?: OpenFin.WindowOptions;
	status: VersionStatusData;
}

/** The different types of versioning information this platform captures */
export type VersionType =
	| "app"
	| "platformClient"
	| "workspacePlatformClient"
	| "workspaceClient"
	| "workspace"
	| "notificationCenter"
	| "runtime"
	| "rvm";

/** What different states can the version of a platform be in? */
export type VersionStatus = "compatible" | "incompatible" | "upgradeable";

/** What is the minimum version criteria */
export type MinimumVersion = VersionInfo;

/** What is the maximum version criteria */
export type MaximumVersion = VersionInfo;
