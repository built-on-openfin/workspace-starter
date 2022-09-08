import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { Lifecycle, LifecycleEventMap } from "../../lifecycle-shapes";
import type { Logger, LoggerCreator } from "../../logger-shapes";
import type { ModuleDefinition } from "../../module-shapes";
import { CUSTOM_HOME_NAME, FactSetLifecycleOptions } from "./shapes";

/**
 * Implement the actions.
 */
export class FactSetLifecycle implements Lifecycle<FactSetLifecycleOptions> {
	/**
	 * The helper methods to use.
	 */
	private _logger: Logger;

	/**
	 * The settings for the lifecycle.
	 */
	private _settings: FactSetLifecycleOptions;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<FactSetLifecycleOptions>,
		loggerCreator: LoggerCreator,
		helpers: unknown
	): Promise<void> {
		this._logger = loggerCreator("FactSetLifecycle");
		this._settings = definition.data;
	}

	/**
	 * Get the actions from the module.
	 * @param platform The platform module.
	 */
	public async get(): Promise<LifecycleEventMap> {
		const eventMap: LifecycleEventMap = {};

		eventMap.bootstrapped = async (platform: WorkspacePlatformModule) => {
			const workspaces = await platform.Storage.getWorkspaces();
			const homeWorkspace = workspaces.find((ws) => ws.title.toLowerCase() === CUSTOM_HOME_NAME);

			if (homeWorkspace) {
				this._logger.info("After login triggered, loading custom home snapshot");
				await platform.applyWorkspace(homeWorkspace);
			} else {
				this._logger.info("After login triggered, loading default home snapshot");
				await platform.applySnapshot(this._settings.homeSnapshot);
			}
		};

		return eventMap;
	}
}
