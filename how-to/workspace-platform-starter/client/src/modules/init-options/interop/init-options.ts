import type { InitOptionsHandler } from "workspace-platform-starter/shapes/init-options-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { RaiseIntentPayload, ShareContextPayload } from "./shapes";

/**
 * Init options interop handler.
 */
export class InitOptionsInteropHandler implements InitOptionsHandler {
	private _logger?: Logger;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("InitOptionsInteropHandler");
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
		if (isEmpty(payload)) {
			this._logger?.warn(
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
			this._logger?.error(`Error trying to perform action ${requestedAction}.`, error);
		}
	}

	/**
	 * Raise an intent.
	 * @param payload The payload to send.
	 */
	private async raiseIntent(payload: RaiseIntentPayload): Promise<void> {
		const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
		this._logger?.info(`Received intent to raise. Intent Request ${JSON.stringify(payload, null, 4)}.`);
		await brokerClient.fireIntent(payload);
	}

	/**
	 * Share context.
	 * @param payload The payload to share.
	 */
	private async shareContext(payload: ShareContextPayload): Promise<void> {
		const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
		const contextGroups = await brokerClient.getContextGroups();
		const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
		if (!isEmpty(targetContextGroup)) {
			await brokerClient.joinContextGroup(targetContextGroup.id);
			this._logger?.info(
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
