import type { CloudInteropOverrideParams } from "@openfin/cloud-interop";

/**
 * The custom settings stored in the manifest.fin.json.
 */
export interface CustomSettings {
	/**
	 * Provider for app configuration.
	 */
	appProvider?: AppProviderSettings;

	/**
	 * Provider for platform configuration.
	 */
	platformProvider?: PlatformProviderSettings;

	/**
	 * Provider for cloud interop configuration.
	 */
	cloudInteropProvider?: CloudInteropProviderSettings;
}

/**
 * The provider details for the platform.
 */
export interface PlatformProviderSettings {
	/**
	 * Details to show the intent picker.
	 */
	intentPicker?: {
		url: string;
		height?: number;
		width?: number;
	};
}

/**
 * Settings for app provider.
 */
export interface AppProviderSettings {
	/**
	 * A list of endpoints that return apps in JSON format.
	 */
	appSourceUrls: string[];

	/**
	 * The types of apps that we allow.
	 */
	manifestTypes?: string[];

	/**
	 * How long to store the apps before getting a new list.
	 */
	cacheDurationInMinutes?: number;
}

/**
 * Settings for the cloud interop provider.
 */
export interface CloudInteropProviderSettings {
	/**
	 * Is the cloud interop provider enabled
	 */
	enabled: boolean;

	/**
	 * The connect parameters for the cloud interop provider.
	 */
	connectParams: CloudInteropOverrideParams;
}
