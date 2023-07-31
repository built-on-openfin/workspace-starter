import type OpenFin from "@openfin/core";
import { getManifestCustomSettings } from "../settings";

let win: OpenFin.Window | undefined;

/**
 * Open a splash screen.
 */
export async function open(): Promise<void> {
	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();

	const customSettings = await getManifestCustomSettings();

	win = await fin.Window.create({
		name: "platform-splash",
		uuid: "platform-splash",
		url: `${window.location.href.replace("provider.html", "splash.html")}`,
		alwaysOnTop: true,
		maximizable: false,
		minimizable: false,
		frame: false,
		autoShow: false,
		defaultCentered: true,
		defaultHeight: 130,
		defaultWidth: 400,
		includeInSnapshots: false,
		resizable: false,
		saveWindowState: false,
		showTaskbarIcon: false
	});

	if (win) {
		const webWin = win.getWebWindow();
		if (webWin) {
			if (manifest.platform?.icon) {
				const icon = webWin.document.querySelector<HTMLImageElement>("#icon");
				if (icon) {
					icon.src = manifest.platform.icon;
				}
			}

			if (customSettings?.themeProvider?.themes?.length) {
				const theme = customSettings.themeProvider.themes[0];
				if ("palettes" in theme) {
					const palette =
						theme.palettes[theme.default ?? (Object.keys(theme.palettes)[0] as "dark" | "light")];
					if (palette?.backgroundPrimary) {
						webWin.document.body.style.backgroundColor = palette?.backgroundPrimary;

						if (palette?.textDefault) {
							const header = webWin.document.querySelector<HTMLElement>("#header");
							if (header) {
								header.style.color = palette.textDefault;
								header.textContent = manifest.shortcut?.name ?? "OpenFin";
							}
							const progressLabel = webWin.document.querySelector<HTMLElement>("#progressLabel");
							if (progressLabel) {
								progressLabel.style.color = palette.textDefault;
							}
							const progress = webWin.document.querySelector<HTMLElement>("#progress");
							if (progress) {
								progress.style.color = palette.textDefault;
							}
						}
					}
				}
			}
		}
		await win.show();
	}
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
