import type OpenFin from "@openfin/core";
import {
	CustomActionCallerType,
	type CustomActionPayload,
	type CustomActionsMap,
	type WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { MANIFEST_TYPES } from "../../../framework/manifest-types";
import { isStringValue } from "../../../framework/utils";

/**
 * Implement the actions.
 */
export class DeveloperActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers?: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger?: Logger;

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
		this._logger = loggerCreator("DeveloperActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["developer-inspect"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const identity: OpenFin.Identity = payload.selectedViews[i];
					const view = fin.View.wrapSync(identity);
					await view.showDeveloperTools();
				}
			} else if (payload.callerType === CustomActionCallerType.PageTabContextMenu) {
				const pageWindowIdentity: OpenFin.Identity = payload.windowIdentity;
				const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
				await pageWindow.showDeveloperTools();
			} else if (payload.callerType === CustomActionCallerType.GlobalContextMenu) {
				const target = payload?.customData?.target === "platform" ? "platform" : "window";
				const targetIdentity: OpenFin.Identity =
					target === "window"
						? payload.windowIdentity
						: { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
				const targetWindow = fin.Window.wrapSync(targetIdentity);
				await targetWindow.showDeveloperTools();
			}
		};

		actionMap["raise-create-app-definition-intent"] = async (payload: CustomActionPayload): Promise<void> => {
			if (payload.callerType === CustomActionCallerType.ViewTabContextMenu) {
				const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const viewIdentity = payload.selectedViews[i];
					const intentName = "CreateAppDefinition";
					try {
						const view = fin.View.wrapSync(viewIdentity);
						const options = await view.getOptions();
						const info = await view.getInfo();
						const name = options.name;
						const fdc3InteropApi = isStringValue(options.fdc3InteropApi) ? options.fdc3InteropApi : "1.2";
						const preloads =
							Array.isArray(options.preloadScripts) && options.preloadScripts.length > 0
								? options.preloadScripts
								: undefined;
						const manifest = {
							url: info.url,
							fdc3InteropApi,
							interop: options.interop,
							customData: options.customData,
							preloadScripts: preloads
						};
						const icons = [];
						const favicons = info.favicons || [];
						for (let f = 0; f < favicons.length; f++) {
							icons.push({ src: favicons[f] });
						}
						const app = {
							appId: name,
							name,
							title: info.title,
							description: info.title,
							manifestType: MANIFEST_TYPES.InlineView.id,
							manifest,
							tags: [MANIFEST_TYPES.View.id],
							icons,
							images: [],
							publisher: "",
							contactEmail: "",
							supportEmail: "",
							intents: []
						};
						const intent = {
							name: intentName,
							context: {
								type: "openfin.app",
								app
							}
						};
						await brokerClient.fireIntent(intent);
					} catch (error) {
						this._logger?.error(
							`Error while trying to raise intent ${intentName} for view ${viewIdentity.name}`,
							error
						);
					}
				}
			}
		};

		return actionMap;
	}
}
