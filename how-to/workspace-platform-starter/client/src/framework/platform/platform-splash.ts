import type OpenFin from "@openfin/core";
import { getManifestCustomSettings } from "../settings";
import { formatError, isStringValue, randomUUID } from "../utils";

let win: OpenFin.Window | undefined;
const channelName = `splash-${randomUUID()}`;
let channelProvider: OpenFin.ChannelProvider | undefined;
let channelClientIdentity: OpenFin.ClientIdentity | undefined;

/**
 * Open a splash screen.
 */
export async function open(): Promise<void> {
	const app = await fin.Application.getCurrent();
	const manifest = await app.getManifest();

	if (manifest?.platform?.preventQuitOnLastWindowClosed !== true) {
		console.warn(
			"The manifest does not contain the platform.preventQuitOnLastWindowClosed flag set to true, the splash screen can not be shown without this flag set"
		);
		return;
	}

	const customSettings = await getManifestCustomSettings();

	const disabled = customSettings?.splashScreenProvider?.disabled ?? false;

	if (!disabled) {
		try {
			const title = customSettings?.splashScreenProvider?.title ?? manifest.shortcut?.name ?? "OpenFin";
			const icon =
				customSettings?.splashScreenProvider?.icon ??
				manifest.platform?.icon ??
				"../common/images/icon-blue.png";
			let backgroundColor: string | undefined = customSettings?.splashScreenProvider?.backgroundColor;
			let textColor: string | undefined = customSettings?.splashScreenProvider?.textColor;
			let borderColor: string | undefined = customSettings?.splashScreenProvider?.borderColor;

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

			const winName = `platform-${channelName}`;

			win = await fin.Window.create({
				name: winName,
				url:
					customSettings?.splashScreenProvider?.url ??
					`${window.location.href.replace("provider.html", "splash.html")}`,
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
				showTaskbarIcon: true,
				icon: customSettings?.splashScreenProvider?.taskbarIcon ?? icon,
				customData: {
					channelName,
					style: {
						title,
						icon,
						backgroundColor,
						textColor,
						borderColor
					}
				}
			});
			channelProvider = await fin.InterApplicationBus.Channel.create(channelName);
			channelProvider.onConnection((identity) => {
				if (identity.uuid === fin.me.identity.uuid && identity.name === winName) {
					channelClientIdentity = identity;
					return true;
				}
				return false;
			});
		} catch (err) {
			console.error("Unable to display splash screen", formatError(err));
		}

		if (win) {
			await win.updateOptions({ alwaysOnTop: false });
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
	if (channelProvider && channelClientIdentity) {
		try {
			await channelProvider.dispatch(channelClientIdentity, "progress", {
				progress
			});
		} catch (err) {
			console.error(err);
		}
	}
}
