import type OpenFin from "@openfin/core";

let win: OpenFin.Window | undefined;

/**
 * Open a splash screen.
 */
export async function open(): Promise<void> {
	win = await fin.Window.create({
		name: "platform-splash",
		uuid: "platform-splash",
		url: `${window.location.href.replace("provider.html", "splash.html")}`,
		alwaysOnTop: true,
		maximizable: false,
		minimizable: false,
		frame: false,
		autoShow: true,
		defaultCentered: true,
		defaultHeight: 130,
		defaultWidth: 300,
		includeInSnapshots: false,
		resizable: false,
		saveWindowState: false,
		showTaskbarIcon: false
	});
}

/**
 * Close a splash screen.
 */
export async function close(): Promise<void> {
	if (win) {
		await win.close();
		win = undefined;
	}
}

/**
 * Update the progress on the splash window.
 * @param progress The progress text to display.
 */
export async function updateProgress(progress: string): Promise<void> {
	if (win) {
		const webWin = win.getWebWindow();
		if (webWin) {
			const elem = webWin.document.querySelector("#progress");
			if (elem) {
				elem.textContent = progress;
			}
		}
	}
}
