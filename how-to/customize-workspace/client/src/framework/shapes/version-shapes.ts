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
	 * If you specify an endpointId then this info event if present will not be used.
	 * If you want have specified min and max version criteria and you specify a version window then this will 
	 * be run during the bootstrapping process and if it fails:
	 * - any workspace component registrations will be un-registered
	 * - the configured window will be shown and passed the current version and minimum version as customData
	 * Otherwise the platform will continue to load and the version information will be passed onto loaded modules
	 * through the getVersionInfo function exposed through the passed helper.
	 */
	versionWindow?: unknown;

	/** 
	 * If you specify an endpoint then you are telling the platform to send information to this endpoint.
	 * The information sent will be the VersionWindowCustomData object (It might just include versioning
	 * information) and whether or not the platform is initialized (has it finished bootstrapping). 
	 * If you provide minimumVersion and maximumVersion information in the settings then the 
	 * platform will use those to calculate what has failed validation (minimum and/or maximum) and pass 
	 * those onto the endpoint. The endpoint can then return an optional boolean stop which means to stop
	 * the initialization. If a versionWindow is included then that window is launched. This endpoint can 
	 * also be polled after bootstrapping if a versionCheckInterval is specified. At this stage stop equalling
	 * true means you want to stop the polling. If a versionWindow is returned then that window is launched
	 * this might be a window that prompts to user to restart as there is a new version available. The platform
	 * has no knowledge of the behavior of the versionWindow. 
	 */
	endpointId?: string;

	/** If an endpoint is specified and an interval is specified then you want the platform to call this endpoint on an
	 * interval to see if an update of your application is available.
	 */
	versionCheckInterval?: number;
}

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

export interface VersionResponse {
	windowOptions: OpenFin.WindowOptions, 
	status: VersionStatusData };

export type VersionType =
	"app"
	| "platformClient"
	| "workspacePlatformClient"
	| "workspaceClient"
	| "workspace"
	| "notificationCenter"
	| "runtime"
	| "rvm";

export type VersionStatus =
	"COMPATIBLE" | 
	"INCOMPATIBLE"  | 
	"UPGRADABLE";

export type MinimumVersion = VersionInfo;

export type MaximumVersion = VersionInfo;
