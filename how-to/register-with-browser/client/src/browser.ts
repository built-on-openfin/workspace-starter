import type OpenFin from "@openfin/core";
import type { LayoutExtended } from "@openfin/workspace";
import {
	getCurrentSync,
	PageLayout,
	PageWithUpdatableRuntimeAttribs,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import { randomUUID } from "./uuid";

const platform: WorkspacePlatformModule = getCurrentSync();

export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity
) {
	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: null };
	} else {
		viewOptions = view;
	}
	return platform.createView(viewOptions, targetIdentity);
}

export async function createPageLayout(layout): Promise<PageLayout> {
	const layoutId: string = `layout-${randomUUID()}`;
	return {
		...layout,
		layoutDetails: { layoutId }
	} as PageLayout;
}

export async function createPageWithLayout(
	title: string,
	layout: LayoutExtended
): Promise<PageWithUpdatableRuntimeAttribs> {
	const layoutWithDetails = await createPageLayout(layout);
	return {
		pageId: randomUUID(),
		title,
		layout: layoutWithDetails,
		isReadOnly: false,
		hasUnsavedChanges: true
	};
}

export function createViewIdentity(uuid: string, name: string): OpenFin.Identity {
	const viewIdentity: OpenFin.Identity = {
		uuid,
		name: `${randomUUID()}-${name}`
	};
	return viewIdentity;
}

export async function addPageToWindow(pageId: string, windowIdentity: OpenFin.Identity) {
	const page = await platform.Storage.getPage(pageId);
	if (page !== undefined && page !== null) {
		const targetWindow = platform.Browser.wrapSync(windowIdentity);
		await targetWindow.addPage(page);
		await targetWindow.setActivePage(pageId);
	}
}
