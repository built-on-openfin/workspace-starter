import type { ManifestTypeId } from "workspace-platform-starter/shapes/app-shapes";

/**
 * Settings for apps integration.
 */
export interface AppSettings {
	/**
	 * The manifest type mappings.
	 */
	manifestTypeMapping: AppManifestTypeMapping;
}

/**
 * Manifest type mapping.
 */
type AppManifestTypeMapping = {
	[key in ManifestTypeId]: { actionName?: string; entryLabel?: string };
};
