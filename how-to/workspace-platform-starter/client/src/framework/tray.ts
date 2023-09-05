import type OpenFin from "@openfin/core";
import { CustomActionCallerType } from "@openfin/workspace-platform";
import { getActions } from "./actions";
import { createLogger } from "./logger-provider";
import { buildMenu } from "./menu";
import type { TrayProviderOptions } from "./shapes";
import { isEmpty, isStringValue, randomUUID } from "./utils";

const logger = createLogger("Tray");

/**
 * Initialize the tray provider.
 * @param options Options for the tray provider.
 */
export async function init(options: TrayProviderOptions | undefined): Promise<void> {
	if (options?.enabled) {
		logger.info("Initializing Tray");

		const app = await fin.Application.getCurrent();

		let icon = options?.icon;

		if (!isStringValue(icon)) {
			const manifest = await app.getManifest();
			icon = manifest.platform?.icon ?? "http://localhost:8080/common/images/icon-blue.png";
		}

		await app.setTrayIcon(icon);

		const menuEntries = options?.menuEntries;
		if (isEmpty(menuEntries)) {
			logger.warn("You have no menu entries defined for the tray");
		} else {
			await app.addListener("tray-icon-clicked", async (trayInfo: OpenFin.TrayInfo & { button?: number }) => {
				logger.info("Tray Clicked", trayInfo);

				if (!isEmpty(menuEntries)) {
					const activateButton = options?.activateButton ?? "any";
					const clickedButton = trayInfo.button ?? 0;

					if (
						activateButton === "any" ||
						(clickedButton === 0 && activateButton === "left") ||
						(clickedButton === 2 && activateButton === "right")
					) {
						let win;
						try {
							// Create a dummy invisible always on top window that we can use
							// to show the popup menu, this way the menu will always appear
							// on top of other windows
							const winOption = {
								name: randomUUID(),
								includeInSnapshot: false,
								showTaskbarIcon: false,
								saveWindowState: false,
								defaultWidth: 0,
								defaultHeight: 0,
								url: "about:blank",
								frame: false,
								alwaysOnTop: true,
								smallWindow: true,
								opacity: 0
							};

							win = await fin.Window.create(winOption);
							await win.focus();

							const template = await buildMenu(undefined, menuEntries);

							const r = await win.showPopupMenu({
								template,
								x: trayInfo.x - 20,
								y: trayInfo.y - 20
							});

							if (r.result === "clicked") {
								logger.info("Tray Item Selected", r.data);
								const actionId = r.data?.action?.id;
								if (isStringValue(actionId)) {
									const actions = getActions();
									if (!isEmpty(actions) && actions[actionId]) {
										await actions[actionId]({
											callerType: CustomActionCallerType.CustomButton,
											x: trayInfo.x,
											y: trayInfo.y,
											windowIdentity: { uuid: fin.me.uuid, name: "tray-menu" },
											customData: r.data?.action?.customData
										});
									}
								}
							}
						} finally {
							if (win) {
								await win.close();
							}
						}
					}
				}
			});
		}
	}
}
