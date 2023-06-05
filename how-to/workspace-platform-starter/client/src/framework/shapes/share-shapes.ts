import type OpenFin from "@openfin/core";
import type { Page } from "@openfin/workspace-platform";

export interface SharePageData {
	type: "page";
	windowIdentity: OpenFin.Identity;
	pageId: string;
	page?: Page;
	bounds?: OpenFin.Bounds;
}

export interface ShareWorkspaceData {
	type: "workspace";
	workspaceId?: string;
}

export type ShareEntry = ShareEntryPage | ShareEntryWorkspace | ShareEntryUnknown;

interface ShareEntryPage {
	type: "page";
	data: { page: Page; bounds: OpenFin.Bounds };
}

interface ShareEntryWorkspace {
	type: "workspace";
	data: { snapshot: string };
}

interface ShareEntryUnknown {
	type: "other";
}
