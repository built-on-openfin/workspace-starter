import type OpenFin from "@openfin/core";
import type { ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";

/**
 * Get the identities of the workspace components (home, store and dock) that are hosted as windows
 * within the platform. Workspace hosted components run outside of the platform so are not included.
 * @param helpers The module helpers to request the component identities from.
 * @returns The identities of the platform hosted components.
 */
export function getPlatformHostedIdentities(helpers: ModuleHelpers | undefined): OpenFin.Identity[] {
	return (helpers?.getComponentIdentities?.() ?? [])
		.filter((component) => component.host === "platform")
		.map((component) => component.identity);
}

/**
 * Get all user windows and not hidden/background windows.
 * @param excludedIdentities The identities of windows to leave out of the list.
 * @returns The list of all user windows.
 */
export async function getAllUserWindows(
	excludedIdentities: OpenFin.Identity[] = []
): Promise<OpenFin.Window[]> {
	const platform = fin.Platform.getCurrentSync();
	const windows = await platform.Application.getChildWindows();
	const availableWindows: OpenFin.Window[] = [];
	for (const currentWindow of windows) {
		const isExcluded = excludedIdentities.some(
			(excluded) =>
				excluded.uuid === currentWindow.identity.uuid && excluded.name === currentWindow.identity.name
		);
		if (!isExcluded) {
			const isShowing = await currentWindow.isShowing();
			if (isShowing) {
				availableWindows.push(currentWindow);
			} else {
				// check to see if it is minimized as isShowing only counts windows that
				// are on the desktop in a visible sense and not hidden or minimized (from v32)
				const state = await currentWindow.getState();
				if (state === "minimized") {
					availableWindows.push(currentWindow);
				}
			}
		}
	}
	return availableWindows;
}
