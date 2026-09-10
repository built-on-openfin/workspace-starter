// eslint-disable-next-line max-classes-per-file
import type { ImplementationMetadata } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import type {
	PlatformInteropOverride,
	PlatformInteropOverrideOptions,
	PlatformInteropBrokerHelpers
} from "workspace-platform-starter/shapes/interopbroker-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type { IntentShortCircuitOptions, IntentAppMapping } from "./shapes";

/**
 * Implementation for the intent short circuit interop override.
 * Intercepts specific intents and routes them directly to a configured app,
 * bypassing the standard intent resolution flow for faster execution.
 */
export class IntentShortCircuit implements PlatformInteropOverride<IntentShortCircuitOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<IntentShortCircuitOptions> | undefined;

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
		definition: ModuleDefinition<IntentShortCircuitOptions>,
		loggerCreator: LoggerCreator,
		helpers: PlatformInteropBrokerHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("IntentShortCircuit");
		this._helpers = helpers;

		const mappings = definition.data?.intentMappings ?? [];
		this._logger.info(`Initializing with ${mappings.length} intent mapping(s)`);
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Get the override constructor for the interop broker.
	 * This override sits before the base implementation in the chain and short-circuits
	 * specific intents by launching the target app directly.
	 * @param options The options for the interop broker defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	public async getConstructorOverride(
		options: PlatformInteropOverrideOptions
	): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>> {
		const intentMappings: IntentAppMapping[] = this._definition?.data?.intentMappings ?? [];
		const logger = this._logger;
		const helpers = this._helpers;

		return (Base: OpenFin.Constructor<OpenFin.InteropBroker>) =>
			/**
			 * Extend the InteropBroker to short-circuit specific intents.
			 */
			class InteropOverride extends Base {
				/**
				 * Called when an intent is fired. If the intent matches a configured mapping,
				 * launch the target app directly without the full resolution lookup.
				 * Otherwise delegate to the next override in the chain via super.
				 * @param intent The intent that was fired.
				 * @param clientIdentity The identity of the client that fired the intent.
				 * @returns The intent resolution.
				 */
				public async handleFiredIntent(
					intent: OpenFin.Intent,
					clientIdentity: OpenFin.ClientIdentity & { entityType: OpenFin.EntityType }
				): Promise<unknown> {
					logger?.info(
						`Received intent "${intent.name}" from client "${clientIdentity.uuid}" looking for short circuit mapping`
					);
					const mapping = intentMappings.find((m) => m.intentName === intent.name);
					if (mapping) {
						logger?.info(`Short-circuiting intent "${intent.name}" directly to app "${mapping.appId}"`);

						if (mapping.appId === fin.me.identity.uuid) {
							logger?.info(
								`The platform or one of the modules running inside of it is the target of the intent ${intent.name}. As it is already running we don't need to go through the app launch process.`
							);

							// we want to ensure that the target gets the correct app id and instance id as metadata as we are skipping the intent resolution flow
							const requestAppMetadata = (await super.fdc3HandleGetInfo(
								{ fdc3Version: "2.0" },
								clientIdentity
							)) as ImplementationMetadata;
							const requestAppId = requestAppMetadata.appMetadata?.appId;
							const requestAppInstanceId =
								requestAppMetadata.appMetadata?.instanceId ?? clientIdentity.endpointId;
							const context = intent.context;
							const updatedIntent = {
								...intent,
								context: {
									contextMetadata: {
										source: {
											appId: requestAppId,
											instanceId: requestAppInstanceId
										}
									},
									...context // if an interop broker is using the context metadata, it will be preserved
								}
							};
							await super.setIntentTarget(updatedIntent as OpenFin.Intent, fin.me.identity);
							return {
								source: { appId: fin.me.identity.uuid },
								intent: intent.name
							};
						}

						if (!helpers?.launchApp) {
							logger?.error("launchApp helper is not available, falling through to base.");
							return super.handleFiredIntent(intent, clientIdentity);
						}

						const identifiers = await helpers.launchApp(mapping.appId);

						if (!identifiers || identifiers.length === 0) {
							logger?.error(
								`Failed to launch app "${mapping.appId}" for intent "${intent.name}", falling through to base.`
							);
							return super.handleFiredIntent(intent, clientIdentity);
						}

						const platformIdentity = identifiers[0];
						logger?.info(
							`App "${platformIdentity.appId}" launched for intent "${intent.name}", setting intent target.`
						);

						await super.setIntentTarget(intent, platformIdentity);

						return {
							source: { appId: platformIdentity.appId, instanceId: platformIdentity.instanceId },
							intent: intent.name
						};
					}

					return super.handleFiredIntent(intent, clientIdentity);
				}
			};
	}
}
