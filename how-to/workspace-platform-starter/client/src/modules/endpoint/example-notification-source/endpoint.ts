import type { NotificationOptions } from "@openfin/workspace/notifications";
import type { Endpoint, EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { ExampleNotificationSourceProviderOptions } from "./shapes";

/**
 * Implementation for the example notification source endpoint provider.
 */
export class ExampleNotificationSourceProvider implements Endpoint<ExampleNotificationSourceProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleNotificationSourceProviderOptions> | undefined;

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

	private _queuedNotifications: NotificationOptions[] | undefined;

	private _readableStream: ReadableStream<NotificationOptions> | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleNotificationSourceProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleNotificationSourceProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// initialize the queue
		this._queuedNotifications = [];
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		if (!isEmpty(this._readableStream)) {
			await this._readableStream.cancel();
		}
	}

	/**
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns True if processed.
	 */
	public async action(
		endpointDefinition: EndpointDefinition,
		request?: NotificationOptions
	): Promise<boolean> {
		// this could post to a backend service so that the notification is picked up server side and then distributed to all connected clients (e.g. browser, OpenFin etc)
		// for now we are simulating it by putting anything posted into a queue so that it will be picked up by the stream
		if (!isEmpty(request)) {
			this._logger?.info(`Received notification: ${JSON.stringify(request)}`);
			this._queuedNotifications?.push(request);
			return true;
		}
		this._logger?.warn("Action called with an empty notification.");
		return false;
	}

	/**
	 * Handle a requestStream request on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process if needed.
	 * @returns The readable stream response to the request, or undefined if not handled.
	 */
	public async requestStream(
		endpointDefinition: EndpointDefinition,
		request?: unknown
	): Promise<ReadableStream<unknown> | undefined> {
		if (isEmpty(this._readableStream)) {
			this._logger?.info("Creating new stream");
			this._readableStream = this.createReadableStream();
		}
		this._logger?.info("Returning requested stream");
		return this._readableStream;
	}

	/**
	 * This function is called when the stream is requested.
	 * @returns The readable stream of notifications.
	 */
	private createReadableStream(): ReadableStream<NotificationOptions> {
		let intervalId: number | NodeJS.Timeout | undefined;
		const intervalTimeInSeconds = this._definition?.data?.intervalInSeconds ?? 1;
		const intervalTime = (intervalTimeInSeconds < 1 ? 1 : intervalTimeInSeconds) * 1000;
		/**
		 * Get the pending notification from the queue.
		 * @returns The pending notification.
		 */
		const getPendingNotification = (): NotificationOptions[] => {
			const queuedNotifications = [...(this._queuedNotifications ?? [])];
			this._queuedNotifications = [];
			return queuedNotifications;
		};
		const stream = new ReadableStream<NotificationOptions>({
			/**
			 * Starts the stream and sends a message every second.
			 * @param controller The controller to push values to the stream.
			 */
			start(controller): void {
				intervalId = setInterval(() => {
					// the notification can be fetched from a websocket but here we are just popping off the queue
					const queue = getPendingNotification();
					for (const notification of queue) {
						controller.enqueue(notification);
					}
				}, intervalTime);
			},
			/**
			 * When the stream is cancelled this function is called.
			 */
			cancel(): void {
				clearInterval(intervalId);
			}
		});
		return stream;
	}
}
