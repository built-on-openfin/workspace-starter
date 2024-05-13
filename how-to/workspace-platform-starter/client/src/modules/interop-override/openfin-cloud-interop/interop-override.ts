// eslint-disable-next-line max-classes-per-file
import { cloudInteropOverride } from "@openfin/cloud-interop";
import type OpenFin from "@openfin/core";
import type {
	PlatformInteropOverride,
	PlatformInteropOverrideOptions,
	PlatformInteropBrokerHelpers
} from "workspace-platform-starter/shapes/interopbroker-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import { isStringValue } from "workspace-platform-starter/utils";
import type { OpenFinCloudInteropOptions } from "./shapes";

/**
 * Implementation for the openfin cloud interop interop override.
 */
export class OpenFinCloudInterop implements PlatformInteropOverride<OpenFinCloudInteropOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<OpenFinCloudInteropOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: PlatformInteropBrokerHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<OpenFinCloudInteropOptions>,
		loggerCreator: LoggerCreator,
		helpers: PlatformInteropBrokerHelpers
	): Promise<void> {
		this._definition = definition;
		const loggerName = definition.data?.loggerName ?? "OpenfinCloudInterop";
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
	 * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the interop broker defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	public async getConstructorOverride(
		options: PlatformInteropOverrideOptions
	): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
		if (
			!isStringValue(this._definition?.data?.userId) ||
			!isStringValue(this._definition?.data?.password) ||
			!isStringValue(this._definition?.data?.platformId) ||
			!isStringValue(this._definition?.data?.url)
		) {
			const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} is missing one of the following settings: userId, password, platformId, url.`;
			this._logger?.error(errorMessage);
			throw new Error(errorMessage);
		}
		const cloudConfig: OpenFinCloudInteropOptions = {
			userId: this._definition?.data?.userId,
			password: this._definition?.data?.password,
			platformId: this._definition?.data?.platformId,
			url: this._definition?.data?.url,
			realm: this._definition?.data?.realm,
			sourceDisplayName: this._definition.data.sourceDisplayName,
			sourceId: isStringValue(this._definition?.data?.sourceId)
				? this._definition?.data?.sourceId
				: fin.me.identity.uuid
		};
		const initializedCloudInteropOverride = (await cloudInteropOverride(
			cloudConfig
		)) as unknown as OpenFin.ConstructorOverride<OpenFin.InteropBroker>;
		return initializedCloudInteropOverride;
	}
}
