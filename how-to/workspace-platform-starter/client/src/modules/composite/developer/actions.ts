import type OpenFin from "@openfin/core";
import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "workspace-platform-starter/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";

/**
 * Implement the actions.
 */
export class DeveloperActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param createLogger For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		createLogger: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = createLogger("DeveloperActions");
		this._helpers = helpers;
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["developer-inspect"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const identity: OpenFin.Identity = payload.selectedViews[i];
					const view = fin.View.wrapSync(identity);
					await view.showDeveloperTools();
				}
			} else if (payload.callerType === this._helpers.callerTypes.PageTabContextMenu) {
				const pageWindowIdentity: OpenFin.Identity = payload.windowIdentity;
				const pageWindow = fin.Window.wrapSync(pageWindowIdentity);
				await pageWindow.showDeveloperTools();
			} else if (payload.callerType === this._helpers.callerTypes.GlobalContextMenu) {
				const target = payload?.customData?.target === "platform" ? "platform" : "window";
				const targetIdentity: OpenFin.Identity =
					target === "window"
						? payload.windowIdentity
						: { uuid: payload.windowIdentity.uuid, name: payload.windowIdentity.uuid };
				const targetWindow = fin.Window.wrapSync(targetIdentity);
				await targetWindow.showDeveloperTools();
			}
		};

		actionMap["raise-create-app-definition-intent"] = async (payload: CustomActionPayload) => {
			if (payload.callerType === this._helpers.callerTypes.ViewTabContextMenu) {
				const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
				for (let i = 0; i < payload.selectedViews.length; i++) {
					const viewIdentity = payload.selectedViews[i];
					const intentName = "CreateAppDefinition";
					try {
						const view = fin.View.wrapSync(viewIdentity as OpenFin.Identity);
						const options = await view.getOptions();
						const info = await view.getInfo();
						const name = options.name;
						const fdc3InteropApi =
							options.fdc3InteropApi !== undefined &&
							options.fdc3InteropApi !== null &&
							options.fdc3InteropApi.length > 0
								? options.fdc3InteropApi
								: "1.2";
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
							manifestType: this._helpers.manifestTypes.inlineView.id,
							manifest,
							tags: [this._helpers.manifestTypes.view.id],
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
						this._logger.error(
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
