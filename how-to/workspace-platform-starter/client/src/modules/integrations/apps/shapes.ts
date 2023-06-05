import type { ManifestTypeId } from "workspace-platform-starter/shapes";

type AppManifestTypeMapping = {
	[key in ManifestTypeId]: { actionName?: string; entryLabel?: string };
};

export interface AppSettings {
	manifestTypeMapping: AppManifestTypeMapping;
}
