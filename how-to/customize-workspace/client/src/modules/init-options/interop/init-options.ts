import type { InitOptionsHandler } from "customize-workspace/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "customize-workspace/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "customize-workspace/shapes/module-shapes";
import type { RaiseIntentPayload, ShareContextPayload } from "./shapes";

export class InitOptionsInteropHandler implements InitOptionsHandler {
	private _logger: Logger;

	/**
	 * Initialise the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(definition: ModuleDefinition, createLogger: LoggerCreator, helpers: ModuleHelpers) {
		this._logger = createLogger("InitOptionsInteropHandler");
		// the init function could be passed limits (e.g. only support the following intents or contexts. Only publish to the following context groups etc.)
		this._logger.info("The handler has been loaded");
	}

	/**
	 * Handle the init options action.
	 * @param requestedAction The requested action.
	 * @param payload The payload for the action.
	 */
	public async action(
		requestedAction: string,
		payload?: RaiseIntentPayload | ShareContextPayload
	): Promise<void> {
		if (payload === undefined) {
			this._logger.warn(
				`Actions passed to the module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`
			);
			return;
		}
		try {
			switch (requestedAction) {
				case "raise-intent": {
					await this.raiseIntent(payload as RaiseIntentPayload);
					break;
				}
				case "share-context": {
					await this.shareContext(payload as ShareContextPayload);
					break;
				}
			}
		} catch (error) {
			this._logger.error(`Error trying to perform action ${requestedAction}.`, error);
		}
	}

	private async raiseIntent(payload: RaiseIntentPayload) {
		const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
		this._logger.info(`Received intent to raise. Intent Request ${JSON.stringify(payload, null, 4)}.`);
		await brokerClient.fireIntent(payload);
	}

	private async shareContext(payload: ShareContextPayload) {
		const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
		const contextGroups = await brokerClient.getContextGroups();
		const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
		if (targetContextGroup !== undefined) {
			await brokerClient.joinContextGroup(targetContextGroup.id);
			this._logger.info(
				`Received context to send. Context Group ${targetContextGroup.id}. Context: ${JSON.stringify(
					payload.context,
					null,
					4
				)}`
			);
			await brokerClient.setContext(payload.context);
		}
	}
}
