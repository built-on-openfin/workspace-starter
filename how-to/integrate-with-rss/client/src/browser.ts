import type {
	LayoutComponentExtended,
	LayoutComponentStateExtended,
	LayoutContentExtended,
	Page
} from "@openfin/workspace";
import { BrowserCreateWindowRequest, BrowserWindowModule, getCurrentSync } from "@openfin/workspace-platform";
import type { LayoutContentItemExtended } from "@openfin/workspace-platform/client-api/src";

export async function launchView(
	view: OpenFin.PlatformViewCreationOptions | string,
	targetIdentity?: OpenFin.Identity,
	targetView?: OpenFin.Identity
) {
	const platform = getCurrentSync();
	let viewOptions: OpenFin.PlatformViewCreationOptions;
	if (typeof view === "string") {
		viewOptions = { url: view, target: null };
	} else {
		viewOptions = view;
	}
	return platform.createView(viewOptions, targetIdentity, targetView);
}

export async function launchPage(
	page: Page,
	targetWindowIdentity?: OpenFin.Identity
): Promise<BrowserWindowModule | undefined> {
	if (targetWindowIdentity) {
		const window = await findWindow(targetWindowIdentity);
		if (window) {
			const allPages = await window.getPages();
			for (const allPage of allPages) {
				if (allPage.pageId === page.pageId) {
					await window.setActivePage(page.pageId);
					return window;
				}
			}
			await window.addPage(page);
			await window.setActivePage(page.pageId);
			return window;
		}
	}

	const platform = getCurrentSync();
	return platform.Browser.createWindow({
		workspacePlatform: {
			pages: [page]
		}
	});
}

export async function launchWindow(
	options: BrowserCreateWindowRequest,
	reuse?: boolean
): Promise<BrowserWindowModule | undefined> {
	const platform = getCurrentSync();

	if (reuse) {
		const window = await findWindow({ name: options.name, uuid: options.uuid });
		if (window) {
			return window;
		}
	}

	return platform.Browser.createWindow(options);
}

export async function findAndActivateView(
	windowIdentity: OpenFin.Identity,
	pageId: string,
	viewIdentity: OpenFin.Identity
): Promise<{
	window?: BrowserWindowModule;
	page?: Page;
	view?: OpenFin.View;
}> {
	const window = await findWindow(windowIdentity);
	let page: Page;
	let view: OpenFin.View;

	if (window) {
		await window.openfinWindow.setAsForeground();
		await window.openfinWindow.focus();

		const allPages = await window.getPages();
		for (const allPage of allPages) {
			if (allPage.pageId === pageId) {
				await window.setActivePage(pageId);

				page = allPage;

				const activeComponents: {
					currentParent?: LayoutContentItemExtended;
					current?: LayoutContentItemExtended;
					foundParent?: LayoutContentItemExtended;
					foundIndex?: number;
					found?: LayoutContentItemExtended;
				} = {};
				activateComponent(viewIdentity, undefined, allPage.layout.content, activeComponents);

				if (activeComponents.found) {
					if (activeComponents.foundParent) {
						if (activeComponents.currentParent) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							delete (activeComponents.currentParent as any).activeItemIndex;
						}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(activeComponents.foundParent as any).activeItemIndex = activeComponents.foundIndex;
					}

					await window.updatePage({
						pageId: allPage.pageId,
						page: allPage
					});

					const platform = getCurrentSync();
					const childWindows = await platform.Application.getChildWindows();
					for (const childWindow of childWindows) {
						const views = await childWindow.getCurrentViews();
						view = views.find(
							(v) => v.identity.name === viewIdentity.name && v.identity.uuid === viewIdentity.uuid
						);
						if (view) {
							await view.focus();
							break;
						}
					}
				}
				break;
			}
		}
	}

	return {
		window,
		page,
		view
	};
}

function activateComponent(
	viewIdentity: OpenFin.Identity,
	parentComponent: LayoutContentItemExtended | undefined,
	content: LayoutContentExtended,
	activeComponents: {
		currentParent?: LayoutContentItemExtended;
		current?: LayoutContentItemExtended;
		foundParent?: LayoutContentItemExtended;
		foundIndex?: number;
		found?: LayoutContentItemExtended;
	}
): void {
	for (let i = 0; i < content.length; i++) {
		const component = content[i];
		if (component.type === "column" || component.type === "row" || component.type === "stack") {
			activateComponent(
				viewIdentity,
				component,
				component.content as LayoutContentExtended,
				activeComponents
			);
		} else {
			// If its not column, row or stack it must be extended
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			const extended: LayoutComponentExtended = component as LayoutComponentExtended;

			const mainIdentityMatch =
				extended.componentState.name === viewIdentity.name &&
				extended.componentState.uuid === viewIdentity.uuid;

			const componentStateWithTarget = extended.componentState as LayoutComponentStateExtended & {
				target?: OpenFin.Identity;
			};

			const targetIdentityMatch =
				componentStateWithTarget.target?.name === viewIdentity.name &&
				componentStateWithTarget?.target.uuid === viewIdentity.uuid;

			if (mainIdentityMatch || targetIdentityMatch) {
				activeComponents.found = component;
				activeComponents.foundIndex = i;
				activeComponents.foundParent = parentComponent;
			} else if (
				(parentComponent?.type === "column" ||
					parentComponent?.type === "row" ||
					parentComponent?.type === "stack") &&
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(parentComponent as any).activeItemIndex >= 0
			) {
				activeComponents.current = component;
				activeComponents.currentParent = parentComponent;
			}
		}
	}
}

export async function findWindow(targetIdentity: OpenFin.Identity): Promise<BrowserWindowModule | undefined> {
	const platform = getCurrentSync();

	const windows = await platform.Browser.getAllWindows();
	for (const window of windows) {
		if (window.identity.name === targetIdentity.name && window.identity.uuid === targetIdentity.uuid) {
			await window.openfinWindow.setAsForeground();
			return window;
		}
	}
}
