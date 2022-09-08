import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ConditionMap, Conditions } from "../../conditions-shapes";
import type { Logger, LoggerCreator } from "../../logger-shapes";
import type { ModuleDefinition } from "../../module-shapes";
import { CUSTOM_HOME_NAME } from "./shapes";

/**
 * Implement the actions.
 */
export class FactSetConditions implements Conditions {
	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: unknown
	): Promise<void> {
		this._logger = loggerCreator("FactSetConditions");
	}

	/**
	 * Get the conditions from the module.
	 * @param platform The platform module.
	 */
	public async get(): Promise<ConditionMap> {
		const conditionMap: ConditionMap = {};

		conditionMap["has-custom-home"] = async (platform: WorkspacePlatformModule) => {
			const workspaces = await platform.Storage.getWorkspaces();
			const customHomeWorkspace = workspaces.find((ws) => ws.title.toLowerCase() === CUSTOM_HOME_NAME);
			const hasCustomHome = customHomeWorkspace !== undefined;
			this._logger.info("has-custom-home", hasCustomHome);
			return hasCustomHome;
		};

		return conditionMap;
	}
}
