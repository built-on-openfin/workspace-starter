import type OpenFin from "@openfin/core";
import { getManifestCustomSettings } from "../settings";
import { isStringValue } from "../utils";

let win: OpenFin.Window | undefined;

/**
 * Open a splash screen.
 */
export async function open(): Promise<void> {
	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();

	const customSettings = await getManifestCustomSettings();

	const disabled = customSettings?.splashScreenProvider?.disabled ?? false;

	if (!disabled) {
		win = await fin.Window.create({
			name: "platform-splash",
			uuid: fin.me.identity.uuid,
			url: `${window.location.href.replace("provider.html", "splash.html")}`,
			alwaysOnTop: true,
			maximizable: false,
			minimizable: false,
			frame: false,
			autoShow: false,
			defaultCentered: true,
			defaultWidth: customSettings?.splashScreenProvider?.width ?? 400,
			defaultHeight: customSettings?.splashScreenProvider?.height ?? 130,
			includeInSnapshots: false,
			resizable: false,
			saveWindowState: false,
			showTaskbarIcon: false
		});

		if (win) {
			const webWin = win.getWebWindow();
			if (webWin) {
				const title = customSettings.splashScreenProvider?.title ?? manifest.shortcut?.name ?? "OpenFin";
				const icon =
					customSettings.splashScreenProvider?.icon ??
					manifest.platform?.icon ??
					"../common/images/icon-blue.png";
				let backgroundColor: string | undefined = customSettings.splashScreenProvider?.backgroundColor;
				let textColor: string | undefined = customSettings.splashScreenProvider?.textColor;
				let borderColor: string | undefined = customSettings.splashScreenProvider?.borderColor;

				webWin.document.title = title;

				const iconElem = webWin.document.querySelector<HTMLImageElement>("#icon");
				if (iconElem) {
					iconElem.src = icon;
				}

				const headingElem = webWin.document.querySelector<HTMLElement>("#heading");
				if (headingElem) {
					headingElem.textContent = title;
				}

				const hasBackground = isStringValue(backgroundColor);
				const hasText = isStringValue(textColor);
				const hasBorder = isStringValue(borderColor);
				if ((!hasBackground || !hasText || !hasBorder) && customSettings?.themeProvider?.themes?.length) {
					const theme = customSettings.themeProvider.themes[0];
					if ("palettes" in theme) {
						const palette =
							theme.palettes[theme.default ?? (Object.keys(theme.palettes)[0] as "dark" | "light")];

						if (!hasBackground) {
							backgroundColor = palette?.backgroundPrimary;
						}

						if (!hasText) {
							textColor = palette?.textDefault;
						}

						if (!hasBorder) {
							borderColor = palette?.background4;
						}
					}
				}

				if (backgroundColor) {
					webWin.document.body.style.backgroundColor = backgroundColor;
				}

				if (textColor) {
					if (headingElem) {
						headingElem.style.color = textColor;
					}
					const progressElem = webWin.document.querySelector<HTMLElement>("#progress");
					if (progressElem) {
						progressElem.style.color = textColor;
					}
					const loaderElem = webWin.document.querySelector<HTMLElement>("#loader");
					if (loaderElem) {
						loaderElem.style.color = textColor;
					}
				}

				if (borderColor) {
					const headerElem = webWin.document.querySelector<HTMLElement>("header");
					if (headerElem) {
						headerElem.style.borderBottomColor = borderColor;
					}
				}
			}
			await win.show();
		}
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
				elem.textContent = `Initializing ${progress}...`;
			}
		}
	}
}
