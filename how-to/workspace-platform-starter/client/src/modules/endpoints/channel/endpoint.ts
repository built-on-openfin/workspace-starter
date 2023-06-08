import type { EndpointDefinition, Endpoint } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Channel endpoint.
 */
export class ChannelEndpoint implements Endpoint {
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
		this._logger = loggerCreator("ChannelEndpoint");
		this._logger.info("Was passed the following options", definition.data);
	}

	/**
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param endpointDefinition.channelName The endpoint channel name.
	 * @param endpointDefinition.actionName The endpoint action name.
	 * @param endpointDefinition.payload The endpoint payload.
	 * @param endpointDefinition.wait Wait for a response.
	 * @param endpointDefinition.uuid The endpoint uuid.
	 * @param endpointDefinition.logInfo Log information.
	 * @param endpointDefinition.logWarn Log warnings.
	 * @param endpointDefinition.logError Log errors.
	 * @param request The request to process.
	 * @param request.payload The request payload.
	 * @returns True if processed.
	 */
	public async action(
		endpointDefinition: EndpointDefinition<{
			channelName: string;
			actionName: string;
			payload?: unknown;
			wait?: boolean;
			uuid?: string;
			logInfo?: boolean;
			logWarn?: boolean;
			logError?: boolean;
		}>,
		request?: { payload?: unknown }
	): Promise<boolean> {
		if (isEmpty(request)) {
			this._logger?.warn(`A request is required for this action: ${endpointDefinition.id}. Returning false`);
			return false;
		}
		if (endpointDefinition.type !== "module") {
			this._logger?.warn(
				`We only expect endpoints of type module. Unable to perform action: ${endpointDefinition.id}`
			);
			return false;
		}
		const logInfo = endpointDefinition?.options?.logInfo ?? true;
		const logWarn = endpointDefinition?.options?.logWarn ?? true;
		const logError = endpointDefinition?.options?.logError ?? true;

		if (
			isEmpty(endpointDefinition.options) ||
			isEmpty(endpointDefinition.options.actionName) ||
			isEmpty(endpointDefinition.options.channelName)
		) {
			if (logWarn) {
				this._logger?.warn(
					`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`
				);
			}
			return false;
		}

		try {
			const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName, {
				wait: endpointDefinition.options.wait,
				payload: endpointDefinition.options.payload
			});
			if (
				!isEmpty(endpointDefinition.options.uuid) &&
				endpointDefinition.options.uuid !== channel.providerIdentity.uuid
			) {
				if (logWarn) {
					this._logger?.warn(
						`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`
					);
				}
				return false;
			}
			if (logInfo) {
				this._logger?.info(`Sending action for endpoint id: ${endpointDefinition.id}`);
			}
			await channel.dispatch(endpointDefinition.options.actionName, request?.payload);
			await channel.disconnect();
			return true;
		} catch (error) {
			if (logError) {
				this._logger?.error(
					`Error executing/or connecting to action. Endpoint with id: ${endpointDefinition.id}`,
					error
				);
			}
			return false;
		}
	}

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param endpointDefinition.channelName The endpoint channel name.
	 * @param endpointDefinition.actionName The endpoint action name.
	 * @param endpointDefinition.payload The endpoint payload.
	 * @param endpointDefinition.wait Wait for a response.
	 * @param endpointDefinition.uuid The endpoint uuid.
	 * @param endpointDefinition.logInfo Log information.
	 * @param endpointDefinition.logWarn Log warnings.
	 * @param endpointDefinition.logError Log errors.
	 * @param endpointDefinition.default The default object type.
	 * @param request The request to process.
	 * @param request.payload The request payload.
	 * @returns The response to the request, or null of not handled.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition<{
			channelName: string;
			actionName: string;
			payload?: unknown;
			wait?: boolean;
			uuid?: string;
			logInfo?: boolean;
			logWarn?: boolean;
			logError?: boolean;
			default?: "object" | "array";
		}>,
		request?: { payload?: unknown }
	): Promise<unknown> {
		let defaultValue: unknown = null;

		if (endpointDefinition.type !== "module") {
			this._logger?.warn(
				`We only expect endpoints of type module. Unable to action request/response for: ${endpointDefinition.id}`
			);
			return defaultValue;
		}
		const logInfo = endpointDefinition?.options?.logInfo ?? true;
		const logWarn = endpointDefinition?.options?.logWarn ?? true;
		const logError = endpointDefinition?.options?.logError ?? true;

		if (!isEmpty(endpointDefinition?.options?.default)) {
			if (endpointDefinition.options.default === "array") {
				defaultValue = [];
			} else if (endpointDefinition.options.default === "object") {
				defaultValue = {};
			}
		}
		if (
			isEmpty(endpointDefinition.options) ||
			isEmpty(endpointDefinition.options.actionName) ||
			isEmpty(endpointDefinition.options.channelName)
		) {
			if (logWarn) {
				this._logger?.warn(
					`You need to provide actionName and channelName for endpoint: ${endpointDefinition.id}`
				);
			}
			return defaultValue;
		}
		try {
			const channel = await fin.InterApplicationBus.Channel.connect(endpointDefinition.options.channelName, {
				wait: endpointDefinition.options.wait,
				payload: endpointDefinition.options.payload
			});
			if (
				!isEmpty(endpointDefinition.options.uuid) &&
				endpointDefinition.options.uuid !== channel.providerIdentity.uuid
			) {
				if (logWarn) {
					this._logger?.warn(
						`Endpoint Id: ${endpointDefinition.id} has the source running (${endpointDefinition.options.uuid}) but the provider of the channel: ${endpointDefinition.options.channelName} is not coming from the source. Returning false.`
					);
				}
				return defaultValue;
			}
			if (logInfo) {
				this._logger?.info(`Sending request response for endpoint: ${endpointDefinition.id}`);
			}
			const response: unknown = await channel.dispatch(
				endpointDefinition.options.actionName,
				request?.payload
			);
			await channel.disconnect();
			return response;
		} catch (error) {
			if (logError) {
				this._logger?.error(
					`Error executing request/response and connecting to endpoint with id: ${endpointDefinition.id}`,
					error
				);
			}
			return defaultValue;
		}
	}
}
