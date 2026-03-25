import type OpenFin from "@openfin/core";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { Share, ShareEntry } from "workspace-platform-starter/shapes/share-shapes";
import type { ExampleShareProviderOptions } from "./shapes";

/**
 * Implementation for the example share provider.
 */
export class ExampleShareProvider implements Share<ExampleShareProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleShareProviderOptions> | undefined;

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
		definition: ModuleDefinition<ExampleShareProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleShareProvider");
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
	 * Get the list of share types supported by the module.
	 * @returns Nothing.
	 */
	public async getShareTypes(): Promise<string[]> {
		// TODO: Add a list of the share types supported by the module
		return [];
	}

	/**
	 * Get the shares from the module.
	 * @param windowIdentity The window identity to get the shares for.
	 * @returns Nothing.
	 */
	public async getEntries(windowIdentity: OpenFin.Identity): Promise<ShareEntry[] | undefined> {
		// TODO: Return a list of the sharing entries based on the window identity
		return [];
	}

	/**
	 * Perform the share for the given entry.
	 * @param type The type of share to perform.
	 * @param payload The data to associate with the share.
	 * @returns Nothing.
	 */
	public async share(type: string, payload?: unknown): Promise<void> {
		// TODO: perform the share for the given type and payload
	}

	/**
	 * Handle a share activation.
	 * @param type The type of the share.
	 * @param payload The payload for the share.
	 * @returns Nothing.
	 */
	public async handle(type: string, payload?: unknown): Promise<void> {
		// TODO: Handle the share triggered by the given id and payload
	}
}
