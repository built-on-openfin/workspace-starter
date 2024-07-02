// eslint-disable-next-line max-classes-per-file
import type OpenFin from "@openfin/core";
import type { WorkspacePlatformProvider } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type { PlatformOverride, PlatformOverrideHelpers, PlatformOverrideOptions } from "workspace-platform-starter/shapes/platform-shapes";
import { getConstructorOverride as wpsConstructorOverride } from "./platform/wps-platform-override";
import type { WpsPlatformOverrideOptions } from "./shapes";

/**
 * Implementation for the wps platform override.
 */
export class WpsPlatformOverride implements PlatformOverride<WpsPlatformOverrideOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<WpsPlatformOverrideOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: PlatformOverrideHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<WpsPlatformOverrideOptions>,
		loggerCreator: LoggerCreator,
		helpers: PlatformOverrideHelpers
	): Promise<void> {
		this._definition = definition;
		const loggerName = definition.data?.loggerName ?? "WpsPlatformOverride";
		this._logger = loggerCreator(loggerName);
		this._helpers = helpers;

		this._logger.info("Initializing");
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Get the override constructor for the platform override (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the platform override defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	public async getConstructorOverride(
		options: PlatformOverrideOptions
	): Promise<OpenFin.ConstructorOverride<WorkspacePlatformProvider>> {
		if (!this._helpers || !this._logger) {
			throw new Error("Module not initialized");
		}
		return wpsConstructorOverride(options, this._logger, this._helpers);
	}
}
