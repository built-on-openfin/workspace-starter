import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Lifecycle, LifecycleEventMap } from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleLifecycleProviderOptions } from "./shapes";

/**
 * Implementation for the example lifecycle provider.
 */
export class ExampleLifecycleProvider implements Lifecycle<ExampleLifecycleProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleLifecycleProviderOptions> | undefined;

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
		definition: ModuleDefinition<ExampleLifecycleProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleLifecycleProvider");
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
	 * Get the lifecycle events.
	 * @returns The map of lifecycle events.
	 */
	public async get(): Promise<LifecycleEventMap> {
		const lifecycleMap: LifecycleEventMap = {};

		// TODO: Add handlers for lifecycle events
		lifecycleMap["after-bootstrap"] = async (
			platform: WorkspacePlatformModule,
			customData?: unknown
		): Promise<void> => {
			// TODO: Add some logic to be processed in the lifecycle event
		};

		return lifecycleMap;
	}
}
