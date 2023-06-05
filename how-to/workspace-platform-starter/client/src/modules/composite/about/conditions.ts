import type { ConditionMap, Conditions } from "workspace-platform-starter/shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type { SharedState } from "./shapes";
/**
 * Implement the conditions.
 */
export class AboutConditions implements Conditions {
	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * The settings for the conditions.
	 * @internal
	 */
	private _definition: ModuleDefinition<unknown> | undefined;

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
	 * @returns Nothing.
	 */
	public async initialize(definition: ModuleDefinition<unknown>, createLogger: LoggerCreator): Promise<void> {
		this._logger = createLogger("AboutCondition");
		this._definition = definition;
		this._logger.info("Condition Initialized");
	}

	/**
	 * Get the conditions from the module.
	 */
	public async get(): Promise<ConditionMap> {
		const conditionMap: ConditionMap = {};

		conditionMap["has-about"] = async () => this._sharedState.aboutWindow !== undefined;

		return conditionMap;
	}
}
