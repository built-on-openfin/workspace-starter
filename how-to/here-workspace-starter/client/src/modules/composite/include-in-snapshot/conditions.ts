import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type {
	ConditionContextTypes,
	ConditionMap,
	Conditions
} from "workspace-platform-starter/shapes/conditions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implementation for the include in snapshot conditions provider.
 */
export class IncludeInSnapshotConditionsProvider implements Conditions {
	/**
	 * The logger for displaying information from the module.
	 * @internal
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
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("IncludeInSnapshotConditionsProvider");
	}

	/**
	 * Get the conditions from the module.
	 * @returns Map of the conditions from the module.
	 */
	public async get(): Promise<ConditionMap> {
		const conditionsMap: ConditionMap = {};

		conditionsMap["included-in-snapshot"] = async (
			platform: WorkspacePlatformModule,
			context?: ConditionContextTypes
		): Promise<boolean> => {
			if (context?.callerType === "browser" && !isEmpty(context?.customData)) {
				const includeInSnapshots = context.customData.includeInSnapshots ?? true;
				this._logger?.info("Included in snapshot", includeInSnapshots);
				return includeInSnapshots;
			}
			return true;
		};

		conditionsMap["removed-from-snapshot"] = async (
			platform: WorkspacePlatformModule,
			context?: ConditionContextTypes
		): Promise<boolean> => {
			if (context?.callerType === "browser" && !isEmpty(context?.customData)) {
				const includeInSnapshots = context.customData.includeInSnapshots ?? true;
				this._logger?.info("Removed from snapshot", !includeInSnapshots);
				return !includeInSnapshots;
			}
			return false;
		};

		return conditionsMap;
	}
}
