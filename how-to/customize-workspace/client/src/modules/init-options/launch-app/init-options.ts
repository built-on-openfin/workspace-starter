import type { InitOptionsHandler } from "customize-workspace/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import type { LaunchAppPayload, LaunchAppOptions } from "./shapes";

export class InitOptionsLaunchAppHandler implements InitOptionsHandler<LaunchAppOptions> {
	private _logger: Logger;

	private _helpers: ModuleHelpers;

	private _definition: ModuleDefinition<LaunchAppOptions>;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<LaunchAppOptions>,
		createLogger: LoggerCreator,
		helpers: ModuleHelpers
	) {
		this._logger = createLogger("InitOptionsLaunchAppHandler");
		this._helpers = helpers;
		this._definition = definition;
		this._logger.info("The handler has been loaded");
	}

	/**
	 * Handle the init options action.
	 * @param requestedAction The requested action.
	 * @param payload The payload for the action.
	 */
	public async action(requestedAction: string, payload?: LaunchAppPayload): Promise<void> {
		if (payload === undefined) {
			this._logger.warn(
				`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`
			);
			return;
		}
		try {
			if (requestedAction === "launch-app") {
				const appId = payload?.appId;
				this._logger.info(`The following appId was passed and requested to launch: ${appId}`);

				if (appId === undefined || appId === null || appId === "") {
					this._logger.error(
						"The init handler received an appId in the wrong format and is unable to launch it"
					);
					return;
				}

				if (this._helpers.launchApp === undefined || this._helpers.getApps() === undefined) {
					this._logger.warn(
						`Unable to launch app with appId: ${appId} as a launchApp and getApps (to verify appId) function was not passed to this module via the module helpers.`
					);
					return;
				}

				const apps = await this._helpers.getApps();
				const app = apps.find((entry) => entry.appId === appId);

				if (app === undefined) {
					this._logger.warn(
						`Unable to launch app with appId: ${appId} because the app is not listed in the directory.`
					);
					return;
				}

				if (
					Array.isArray(this._definition?.data?.supportedManifestTypes) &&
					!this._definition.data.supportedManifestTypes.includes(app.manifestType)
				) {
					this._logger.warn(
						`Unable to launch app with appId: ${appId} because a list of supported manifest types have been specified and this type of application isn't in the supported list.`
					);
					return;
				}

				this._logger.info(`Requesting the launch of app with appId: ${appId}`);
				await this._helpers.launchApp(appId);
			}
		} catch (error) {
			this._logger.error(`Error trying to perform action ${requestedAction}.`, error);
		}
	}
}
