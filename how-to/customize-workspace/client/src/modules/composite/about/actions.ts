import type {
	CustomActionPayload,
	CustomActionsMap,
	WorkspacePlatformModule
} from "@openfin/workspace-platform";
import type { ActionHelpers, Actions } from "customize-workspace/shapes/actions-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition } from "customize-workspace/shapes/module-shapes";
import type { AboutActionSettings, SharedState } from "./shapes";
/**
 * Implement the actions.
 */
export class AboutActions implements Actions {
	/**
	 * The helper methods to use.
	 */
	private _helpers: ActionHelpers;

	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * The settings for the action.
	 * @internal
	 */
	private _definition: ModuleDefinition<AboutActionSettings> | undefined;

	/**
	 * The shared state passed to these implementations.
	 */
	private readonly _sharedState: SharedState;

	constructor(sharedState: SharedState) {
		this._sharedState = sharedState;
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param createLogger For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<AboutActionSettings>,
		createLogger: LoggerCreator,
		helpers: ActionHelpers
	): Promise<void> {
		this._logger = createLogger("AboutAction");
		this._helpers = helpers;
		this._definition = definition;
		this._sharedState.aboutWindow = await this.getAboutWindow();
	}

	/**
	 * Get the actions from the module.
	 */
	public async get(platform: WorkspacePlatformModule): Promise<CustomActionsMap> {
		const actionMap: CustomActionsMap = {};

		actionMap["show-about"] = async (payload: CustomActionPayload) => {
			if (
				payload.callerType === this._helpers.callerTypes.GlobalContextMenu &&
				this._sharedState?.aboutWindow !== undefined
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
					this._logger.info("Cannot see existing about window. Will create an about window.");
				}

				if (windowExists) {
					await aboutWindow.setAsForeground();
				} else {
					try {
						await fin.Window.create(this._sharedState.aboutWindow);
					} catch (error) {
						this._logger.error("Error launching show about action window.", error);
					}
				}
			}
		};

		return actionMap;
	}

	/** Gets about window options enriched with VersionInfo */
	private async getAboutWindow(): Promise<OpenFin.WindowOptions> {
		if (this._definition?.data?.windowOptions === undefined) {
			this._logger.info("No about window configuration provided.");
			return undefined;
		}

		const validatedWindowOptions: OpenFin.WindowOptions = {
			...this._definition.data.windowOptions
		};

		if (validatedWindowOptions.url === undefined) {
			this._logger.error(
				"An about version window configuration was set but a url was not provided. A window cannot be launched."
			);
			return undefined;
		}
		if (validatedWindowOptions.name === undefined) {
			validatedWindowOptions.name = `${fin.me.identity.uuid}-versioning-about`;
		}

		if (validatedWindowOptions?.customData?.versionInfo !== undefined) {
			this._logger.info("Enriching customData versionInfo provided by about version window configuration.");
			validatedWindowOptions.customData.versionInfo = {
				...validatedWindowOptions.customData.versionInfo,
				...(await this._helpers.getVersionInfo())
			};
		} else {
			this._logger.info("Setting customData versionInfo for about version window configuration.");
			if (validatedWindowOptions.customData === undefined) {
				validatedWindowOptions.customData = {};
			}
			validatedWindowOptions.customData.versionInfo = await this._helpers.getVersionInfo();
		}

		this._logger.info("Returning about version window configuration.");
		return validatedWindowOptions;
	}
}
