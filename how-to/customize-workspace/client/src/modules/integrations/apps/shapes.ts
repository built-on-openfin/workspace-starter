import type { ManifestTypeId } from "customize-workspace/shapes";

type AppManifestTypeMapping = {
	[key in ManifestTypeId]: { actionName?: string; entryLabel?: string };
};

export interface AppSettings {
	manifestTypeMapping: AppManifestTypeMapping;
}
