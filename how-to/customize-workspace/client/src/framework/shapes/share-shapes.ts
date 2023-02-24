import type OpenFin from "@openfin/core";
import type { Page } from "@openfin/workspace-platform";

export interface IShareCustomData {
	workspaceId?: string;
	windowIdentity?: OpenFin.Identity;
	pageId?: string;
	page?: Page;
	bounds?: OpenFin.Bounds;
}

export type IShareEntry = IShareEntryPage | IShareEntryWorkspace | IShareEntryUnknown;

interface IShareEntryPage {
	type: "page";
	data: { page: Page; bounds: OpenFin.Bounds };
}

interface IShareEntryWorkspace {
	type: "workspace";
	data: { snapshot: string };
}

interface IShareEntryUnknown {
	type: "other";
}
