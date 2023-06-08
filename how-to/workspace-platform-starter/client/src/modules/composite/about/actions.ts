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
import { isEmpty } from "../../../framework/utils";
import type { AboutActionSettings, SharedState } from "./shapes";
/**
 * Implement the actions.
 */
export class AboutActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers?: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger?: Logger;

	/**
	 * The settings for the action.
	 * @internal
	 */
	private _definition: ModuleDefinition<AboutActionSettings> | undefined;

	/**
	 * The shared state passed to these implementations.
	 */
	private readonly _sharedState: SharedState;

	/**
	 * Create a new instance of AccountActions.
	 * @param sharedState The shared state data.
	 */
	constructor(sharedState: SharedState) {
		this._sharedState = sharedState;
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<AboutActionSettings>,
		loggerCreator: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = loggerCreator("AboutAction");
		this._helpers = helpers;
		this._definition = definition;
		this._sharedState.aboutWindow = await this.getAboutWindow();
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 * @returns The map of custom actions.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["show-about"] = async (payload: CustomActionPayload): Promise<void> => {
			if (
				payload.callerType === CustomActionCallerType.GlobalContextMenu &&
				!isEmpty(this._sharedState?.aboutWindow)
			) {
				const aboutWindow = fin.Window.wrapSync({
					uuid: fin.me.identity.uuid,
					name: this._sharedState.aboutWindow.name
				});
				let windowExists = false;
				try {
					await aboutWindow.getInfo();
					windowExists = true;
				} catch {
					this._logger?.info("Cannot see existing about window. Will create an about window.");
				}

				if (windowExists) {
					await aboutWindow.setAsForeground();
				} else {
					try {
						await fin.Window.create(this._sharedState.aboutWindow);
					} catch (error) {
						this._logger?.error("Error launching show about action window.", error);
					}
				}
			}
		};

		return actionMap;
	}

	/**
	 * Gets about window options enriched with VersionInfo.
	 * @returns The window options to show.
	 */
	private async getAboutWindow(): Promise<OpenFin.WindowOptions | undefined> {
		if (isEmpty(this._definition?.data?.windowOptions)) {
			this._logger?.info("No about window configuration provided.");
			return;
		}

		const validatedWindowOptions: Partial<OpenFin.WindowOptions> = {
			...this._definition?.data?.windowOptions
		};

		if (isEmpty(validatedWindowOptions.url)) {
			this._logger?.error(
				"An about version window configuration was set but a url was not provided. A window cannot be launched."
			);
			return undefined;
		}
		if (isEmpty(validatedWindowOptions.name)) {
			validatedWindowOptions.name = `${fin.me.identity.uuid}-versioning-about`;
		}

		if (this._helpers?.getVersionInfo) {
			if (!isEmpty(validatedWindowOptions?.customData?.versionInfo)) {
				this._logger?.info(
					"Enriching customData versionInfo provided by about version window configuration."
				);
				validatedWindowOptions.customData.versionInfo = {
					...validatedWindowOptions.customData.versionInfo,
					...(await this._helpers.getVersionInfo())
				};
			} else {
				this._logger?.info("Setting customData versionInfo for about version window configuration.");
				if (isEmpty(validatedWindowOptions.customData)) {
					validatedWindowOptions.customData = {};
				}
				validatedWindowOptions.customData.versionInfo = await this._helpers.getVersionInfo();
			}
		}

		this._logger?.info("Returning about version window configuration.");
		return validatedWindowOptions as OpenFin.WindowOptions;
	}
}
