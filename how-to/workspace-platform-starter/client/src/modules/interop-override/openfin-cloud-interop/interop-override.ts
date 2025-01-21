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
		if (!isStringValue(this._definition?.data?.platformId) || !isStringValue(this._definition?.data?.url)) {
			const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} is missing one of the following settings: platformId, url.`;
			this._logger?.error(errorMessage);
			throw new Error(errorMessage);
		}
		const cloudInteropConfig = this._definition.data;

		// validate basic authentication parameters if specified
		if (
			cloudInteropConfig.authenticationType === "basic" &&
			(!isStringValue(cloudInteropConfig.basicAuthenticationParameters?.username) ||
				!isStringValue(cloudInteropConfig.basicAuthenticationParameters?.password))
		) {
			const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} is missing one of the following settings: username, password as ${cloudInteropConfig.authenticationType} authentication has been specified.`;
			this._logger?.error(errorMessage);
			throw new Error(errorMessage);
		}

		// validate jwt authentication parameters if specified
		if (cloudInteropConfig.authenticationType === "jwt") {
			if (!isStringValue(cloudInteropConfig.jwtAuthenticationParameters?.authenticationId)) {
				const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} specified ${cloudInteropConfig.authenticationType} authentication and we need jwtAuthenticationParameters with a Here provided authenticated Id.`;
				this._logger?.error(errorMessage);
				throw new Error(errorMessage);
			}
			const jwtEndpointId = "cloud-jwt-callback";
			// if we have an id we need to assign a callback that will return the jwt token to the cloud interop code
			// as this is a module this code can be edited directly but for a configuration based approach we will see if an endpoint called cloud-jwt-callback is available
			if (!this._helpers?.getEndpointClient) {
				// throw an error. This module should have permission to get the endpoint client
				const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} specified ${cloudInteropConfig.authenticationType} authentication and we need to see if logic exposed as an endpoint ${jwtEndpointId} is available. The helper function getEndpointClient is unavailable.`;
				this._logger?.error(errorMessage);
				throw new Error(errorMessage);
			} else {
				const endpointClient = await this._helpers.getEndpointClient();
				if (!endpointClient) {
					// throw an error. This module should have permission to get the endpoint client
					const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} specified ${cloudInteropConfig.authenticationType} authentication and we need to see if logic exposed as an endpoint ${jwtEndpointId} is available. The getEndpointClient helper didn't return a client.`;
					this._logger?.error(errorMessage);
					throw new Error(errorMessage);
				}
				if (!endpointClient.hasEndpoint(jwtEndpointId)) {
					// throw an error. An endpoint should exist to support this behavior
					const errorMessage = `The data setting for the interopOverride module ${this._definition?.id} specified ${cloudInteropConfig.authenticationType} authentication. It requires an endpoint called ${jwtEndpointId} and this endpoint is not available.`;
					this._logger?.error(errorMessage);
					throw new Error(errorMessage);
				}

				// use the endpoint to request the jwt token and update it when it is refreshed so that it can be passed to the cloud interop code.
				// this is just an example using our modular approach to let you plug in an implementation.
				// You may have the refresh logic exposed in this module or a composite module if you are building your own
				// or you may have a different approach to get the jwt token and make it available to the cloud interop jwt callback.
				// to see an example of a requestStream see the example-notification-source endpoint in the modules/endpoint folder.
				// https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
				let platformJWTToken: string | object;

				const jwtStream = await endpointClient.requestStream<unknown, string | object>(jwtEndpointId);
				if (jwtStream) {
					const reader = jwtStream.getReader();
					const logger = this._logger;
					this._logger?.info("Reading from jwt stream");
					reader
						.read()
						.then(function pump({ done, value }: ReadableStreamReadResult<string | object>): unknown {
							if (done) {
								logger?.info("JWT Stream ended.");
								return;
							}
							platformJWTToken = value;
							// eslint-disable-next-line promise/no-nesting
							return reader.read().then(pump);
						})
						.catch((error: string) => {
							logger?.error(`Error reading JWT stream: ${error}`);
						});
				}
				// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
				cloudInteropConfig.jwtAuthenticationParameters.jwtRequestCallback = () => platformJWTToken;
			}
		}
		const cloudConfig: OpenFinCloudInteropOptions = {
			...cloudInteropConfig,
			sourceId: cloudInteropConfig.sourceId ?? fin.me.identity.uuid
		};
		const initializedCloudInteropOverride = (await cloudInteropOverride(
			cloudConfig
		)) as unknown as OpenFin.ConstructorOverride<OpenFin.InteropBroker>;

		return initializedCloudInteropOverride;
	}
}
