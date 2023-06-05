import type OpenFin from "@openfin/core";


/**
 * Get the identity of the window containing a view.
 * @param view The view to get the containing window identity.
 * @returns The identity of the containing window.
 */
export async function getViewWindowIdentity(view: OpenFin.View): Promise<OpenFin.Identity> {
	const currentWindow = await view.getCurrentWindow();

	// If the view does is not yet attached to a window, wait for the
	// target-changed even which means it has been attached
	if (currentWindow.identity.name === undefined || currentWindow.identity.name === fin.me.identity.uuid) {
		return new Promise<OpenFin.Identity>((resolve, reject) => {
			view
				.once("target-changed", async () => {
					const hostWindow = await view.getCurrentWindow();
					resolve(hostWindow.identity);
				})
				.catch(() => {});
		});
	}

	return currentWindow.identity;
}
