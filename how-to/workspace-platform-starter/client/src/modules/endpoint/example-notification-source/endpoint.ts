import type { NotificationOptions } from "@openfin/workspace/notifications";
import type { Endpoint, EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { NotificationSourceEvents } from "workspace-platform-starter/shapes/notification-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import { NotificationLifecycleEventSource } from "./lifecycle-event-source";
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

	private _queuedNotifications: NotificationSourceEvents[] | undefined;

	private _readableStream: ReadableStream<NotificationSourceEvents> | undefined;

	private _notificationLifecycleEventSource: NotificationLifecycleEventSource | undefined;

	private _cleanupWS: (() => Promise<void>) | undefined;

	private _cleanupLP: (() => Promise<void>) | undefined;

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

		this._notificationLifecycleEventSource = new NotificationLifecycleEventSource();
		await this._notificationLifecycleEventSource.initialize(
			definition,
			loggerCreator,
			helpers,
			async (notificationOptions: NotificationOptions) => {
				this._queuedNotifications?.push({ eventId: "create", payload: notificationOptions });
			}
		);
		if (
			isStringValue(this._definition?.data?.websocket?.url) &&
			(this._definition.data.websocket?.url.startsWith("ws://") ||
				this._definition.data.websocket?.url.startsWith("wss://")) &&
			helpers?.subscribeLifecycleEvent
		) {
			const wsUrl = this._definition.data.websocket.url;
			let ws: WebSocket;
			const afterBootstrap = helpers.subscribeLifecycleEvent("after-bootstrap", async () => {
				try {
					ws = new WebSocket(wsUrl);
					ws.addEventListener("open", () => {
						this._logger?.info("Websocket connection opened.");
					});
					ws.addEventListener("message", (event) => {
						this._logger?.info("Websocket message received:", event.data);
						this._queuedNotifications?.push(JSON.parse(event.data));
					});
				} catch (wsError) {
					this._logger?.error(`Error creating websocket connection to url ${wsUrl}.`, wsError);
				}
			});

			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			this._cleanupWS = async () => {
				if (ws) {
					this._logger?.info("Closing websocket connection.");
					ws.close();
				}
				if (this._helpers?.unsubscribeLifecycleEvent) {
					this._helpers.unsubscribeLifecycleEvent(afterBootstrap, "after-bootstrap");
				}
			};
		}

		if (
			isStringValue(this._definition?.data?.longpoll?.url) &&
			(this._definition.data.longpoll.url.startsWith("http://") ||
				this._definition.data.longpoll.url.startsWith("https://")) &&
			helpers?.subscribeLifecycleEvent
		) {
			const longpollUrl = this._definition.data.longpoll.url;
			let longPollScheduler: number;
			const afterBootstrapLP = helpers.subscribeLifecycleEvent("after-bootstrap", async () => {
				try {
					// try url before scheduling
					const initialResponse = await fetch(longpollUrl);
					const initialData = await initialResponse.json();
					if (Array.isArray(initialData) && initialData.length > 0) {
						this._logger?.info(`Longpoll data received: ${initialData.length} messages`);
						this._queuedNotifications?.push(...initialData);
					}
					const longPollInSeconds = this._definition?.data?.longpoll?.intervalInSeconds ?? 5;
					longPollScheduler = setInterval(async () => {
						const response = await fetch(longpollUrl);
						const data = await response.json();
						if (Array.isArray(data) && data.length > 0) {
							this._logger?.info(`Longpoll data received: ${data.length} messages`);
							this._queuedNotifications?.push(...data);
						}
					}, longPollInSeconds * 1000) as unknown as number;
				} catch (error) {
					this._logger?.error(
						`Error fetching long polling data for url ${longpollUrl}. Polling will not continue.`,
						error
					);
				}
			});

			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			this._cleanupLP = async () => {
				if (longPollScheduler) {
					this._logger?.info("Stopping Long Polling.");
					clearInterval(longPollScheduler);
				}
				if (this._helpers?.unsubscribeLifecycleEvent) {
					this._helpers.unsubscribeLifecycleEvent(afterBootstrapLP, "after-bootstrap");
				}
			};
		}
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
		if (!isEmpty(this._notificationLifecycleEventSource)) {
			await this._notificationLifecycleEventSource.closedown();
		}
		if (!isEmpty(this._cleanupWS)) {
			await this._cleanupWS();
		}
		if (!isEmpty(this._cleanupLP)) {
			await this._cleanupLP();
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
		request?: NotificationSourceEvents
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
	private createReadableStream(): ReadableStream<NotificationSourceEvents> {
		let intervalId: number | undefined;
		const intervalTimeInSeconds = this._definition?.data?.intervalInSeconds ?? 1;
		const intervalTime = (intervalTimeInSeconds < 1 ? 1 : intervalTimeInSeconds) * 1000;
		/**
		 * Get the pending notification from the queue.
		 * @returns The pending notification.
		 */
		const getPendingNotification = (): NotificationSourceEvents[] => {
			const queuedNotifications = [...(this._queuedNotifications ?? [])];
			this._queuedNotifications = [];
			return queuedNotifications;
		};
		const stream = new ReadableStream<NotificationSourceEvents>({
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
				}, intervalTime) as unknown as number;
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
