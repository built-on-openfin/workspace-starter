import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { ConditionMap, Conditions } from "workspace-platform-starter/shapes/conditions-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleConditionsProviderOptions } from "./shapes";

/**
 * Implementation for the example conditions provider.
 */
export class ExampleConditionsProvider implements Conditions<ExampleConditionsProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleConditionsProviderOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleConditionsProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleConditionsProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get the conditions from the module.
	 * @returns Map of the conditions from the module.
	 */
	public async get(): Promise<ConditionMap> {
		const conditionsMap: ConditionMap = {};

		// TODO: Add entries to the conditions map
		// TODO: Perform some logic to calculate the condition
		conditionsMap["my-condition"] = async (platform: WorkspacePlatformModule): Promise<boolean> => true;

		return conditionsMap;
	}
}
