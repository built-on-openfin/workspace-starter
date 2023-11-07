import type OpenFin from "@openfin/core";
import type { CustomActionSpecifier } from "@openfin/workspace";
import { CustomActionCallerType } from "@openfin/workspace-platform";
import { callAction } from "./actions";
import { createLogger } from "./logger-provider";
import { buildMenu, getPopupMenuStyle, showPopupMenu } from "./menu";
import type { MenuOptionType, TrayContextMenuTemplate } from "./shapes/menu-shapes";
import type { TrayProviderOptions } from "./shapes/tray-shapes";
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
		const defaultAction = options?.defaultAction;
		if (isEmpty(defaultAction) && isEmpty(menuEntries)) {
			logger.warn("You have no default action or menu entries defined for the tray");
		} else if (!isEmpty(defaultAction) && !isEmpty(menuEntries)) {
			logger.warn("You cannot define a default action and menu entries for the tray");
		} else {
			await app.addListener(
				"tray-icon-clicked",
				async (trayInfo: OpenFin.Events.ApplicationEvents.TrayIconClickedEvent) => {
					logger.info("Tray Clicked", trayInfo);

					const activateButton = options?.activateButton ?? "any";
					const clickedButton = trayInfo.button ?? 0;

					if (
						activateButton === "any" ||
						(clickedButton === 0 && activateButton === "left") ||
						(clickedButton === 2 && activateButton === "right")
					) {
						let actionToTrigger: CustomActionSpecifier | undefined;

						if (!isEmpty(defaultAction)) {
							actionToTrigger = defaultAction;
						} else if (!isEmpty(menuEntries)) {
							let win;
							try {
								// Create a dummy invisible always on top window that we can use
								// to show the popup menu, this way the menu will always appear
								// on top of other windows
								const winOption: OpenFin.WindowCreationOptions = {
									name: randomUUID(),
									includeInSnapshots: false,
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
								// Setting the focus to the invisible window makes sure that
								// the context menu is dismissed when clicked away from
								await win.focus();

								const popupMenuStyle = options?.popupMenuStyle ?? getPopupMenuStyle();
								const template = await buildMenu<
									TrayContextMenuTemplate,
									MenuOptionType<TrayContextMenuTemplate>
								>(undefined, menuEntries);
								const selected = await showPopupMenu(
									{ x: trayInfo.x - 20, y: trayInfo.y - 20 },
									{ uuid: fin.me.identity.uuid, name: winOption.name },
									"",
									template,
									{
										popupMenuStyle
									}
								);
								if (selected) {
									actionToTrigger = selected.action;
								}
							} finally {
								if (win) {
									await win.close();
								}
							}
						}

						if (!isEmpty(actionToTrigger) && isStringValue(actionToTrigger.id)) {
							await callAction(actionToTrigger.id, {
								callerType: CustomActionCallerType.CustomButton,
								x: trayInfo.x,
								y: trayInfo.y,
								windowIdentity: fin.me.identity,
								customData: actionToTrigger.customData
							});
						}
					}
				}
			);
		}
	}
}
