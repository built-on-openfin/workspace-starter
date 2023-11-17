import type OpenFin from "@openfin/core";
import type {
	BrowserCreateWindowRequest,
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import {
	CustomActionCallerType,
	type ActionHelpers,
	type Actions
} from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implementation for the window platform actions provider.
 */
export class WindowPlatformActionsProvider implements Actions {
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ActionHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = loggerCreator("WindowPlatformActionsProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["pin-window"] = async (payload: CustomActionPayload): Promise<void> => {
			await this.pinUnpin(platform, payload, true);
		};

		actionMap["unpin-window"] = async (payload: CustomActionPayload): Promise<void> => {
			await this.pinUnpin(platform, payload, false);
		};

		actionMap["move-view-to-new-window"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
				const initialView = await platform.createView({
					name: payload.selectedViews[0].name
				} as OpenFin.PlatformViewCreationOptions);
				if (payload.selectedViews.length > 1) {
					const windowIdentity = await this.getViewWindowIdentity(initialView);
					for (let i = 1; i < payload.selectedViews.length; i++) {
						await platform.createView(
							{
								name: payload.selectedViews[i].name
							} as OpenFin.PlatformViewCreationOptions,
							windowIdentity,
							initialView.identity
						);
					}
				}
			}
		};

		actionMap["move-page-to-new-window"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.PageTabContextMenu) {
				const win = platform.Browser.wrapSync(payload.windowIdentity);
				const page = await win.getPage(payload.pageId);
				await platform.createWindow({
					workspacePlatform: {
						pages: [page]
					}
				});
				await win.removePage(page.pageId);
			}
		};

		return actionMap;
	}

	/**
	 * Pin or unpin the window.
	 * @param platform The platform.
	 * @param payload The payload for the action.
	 * @param alwaysOnTop Should the window be always on top.
	 */
	private async pinUnpin(
		platform: WorkspacePlatformModule,
		payload: CustomActionPayload,
		alwaysOnTop: boolean
	): Promise<void> {
		if (
			!isEmpty(this._helpers) &&
			(payload.callerType === CustomActionCallerType.CustomButton ||
				payload.callerType === CustomActionCallerType.ViewTabContextMenu)
		) {
			const browserWindow = platform.Browser.wrapSync(payload.windowIdentity);
			const options = await browserWindow.openfinWindow.getOptions();
			const createRequest: BrowserCreateWindowRequest = options as BrowserCreateWindowRequest;
			if (createRequest.workspacePlatform.windowType !== "platform") {
				const currentToolbarOptions = createRequest.workspacePlatform.toolbarOptions;
				await browserWindow.openfinWindow.updateOptions({ alwaysOnTop });
				if (!isEmpty(currentToolbarOptions)) {
					const newButtons = await this._helpers.updateToolbarButtons(
						currentToolbarOptions.buttons,
						payload.customData.sourceId as string,
						payload.customData.replacementId as string
					);
					await browserWindow.replaceToolbarOptions({ buttons: newButtons });
				}
			}
		}
	}

	/**
	 * Get the identity of the window containing a view.
	 * @param view The view to get the containing window identity.
	 * @returns The identity of the containing window.
	 */
	private async getViewWindowIdentity(view: OpenFin.View): Promise<OpenFin.Identity> {
		const currentWindow = await view.getCurrentWindow();

		// If the view does is not yet attached to a window, wait for the
		// target-changed even which means it has been attached
		if (isEmpty(currentWindow.identity.name) || currentWindow.identity.name === fin.me.identity.uuid) {
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
}
