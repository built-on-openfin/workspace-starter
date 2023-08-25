import type OpenFin from "@openfin/core";

/**
 * Get all user windows and not hidden/background windows.
 * @returns The list of all user windows.
 */
export async function getAllUserWindows(): Promise<OpenFin.Window[]> {
	const platform = fin.Platform.getCurrentSync();
	const windows = await platform.Application.getChildWindows();
	const availableWindows: OpenFin.Window[] = [];
	for (const currentWindow of windows) {
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
	return availableWindows;
}
