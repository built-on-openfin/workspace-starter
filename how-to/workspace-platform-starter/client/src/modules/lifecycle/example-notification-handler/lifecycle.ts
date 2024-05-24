import type OpenFin from "@openfin/core";
import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { NotificationActionEvent,
	NotificationFormSubmittedEvent, NotificationOptions } from "@openfin/workspace/notifications";
import type { EndpointClient } from "workspace-platform-starter/shapes/endpoint-shapes";
import type {
	Lifecycle,
	LifecycleEventMap
} from "workspace-platform-starter/shapes/lifecycle-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type {
	NotificationClient,
	NotificationsEventMap
} from "workspace-platform-starter/shapes/notification-shapes";
import { isEmpty } from "workspace-platform-starter/utils";
import type { ExampleNotificationHandlerProviderOptions, NotificationCustomData } from "./shapes";

/**
 * Implementation for the example notification handler lifecycle provider.
 */
export class ExampleNotificationHandlerProvider implements Lifecycle<ExampleNotificationHandlerProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleNotificationHandlerProviderOptions> | undefined;

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
 	* An object containing current subscriptions.
 	* @internal
 	*/
	private _notificationSubscriptions:
	| { [key in keyof NotificationsEventMap]?: (event: NotificationsEventMap[key]) => void }
	| undefined;

	/**
	 * A notification client if available.
	 * @internal
	 */
	private _notificationClient: NotificationClient | undefined;

	/**
	 * A endpoint client if available.
	 * @internal
	 */
	private _endpointClient: EndpointClient | undefined;

	/**
	 * A endpoint client if available.
	 * @internal
	 */
	private _interopClient: OpenFin.InteropClient | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ExampleNotificationHandlerProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleNotificationHandlerProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
		// disconnect from websocket/server sent event source for example
		await this.stopNotificationService();
	}

	/**
	 * Get the lifecycle events.
	 * @returns The map of lifecycle events.
	 */
	public async get(): Promise<LifecycleEventMap> {
		const lifecycleMap: LifecycleEventMap = {};

		lifecycleMap["after-bootstrap"] = async (
			platform: WorkspacePlatformModule,
			customData?: unknown
		): Promise<void> => {
			await this.startNotificationService();
		};

		return lifecycleMap;
	}

	/**
	 * Starts the notification service.
	 */
		private async startNotificationService(): Promise<void> {
			const notificationSourceEndpointId = this._definition?.data?.notificationSourceEndpointId ?? "notification-source";
			if(!isEmpty(this._helpers?.getEndpointClient)) {
				const endpointClient = await this._helpers.getEndpointClient();
				if(!isEmpty(endpointClient)) {
					this._endpointClient = endpointClient.hasEndpoint(notificationSourceEndpointId)
					? endpointClient : undefined;
				}
			}

			if(!isEmpty(this._helpers?.getInteropClient)) {
				const interopClient = await this._helpers.getInteropClient();

				if(interopClient && !isEmpty(this._endpointClient) &&
				this._definition?.data?.intentHandler?.enabled !== false) {
					this._interopClient = interopClient;
					this._logger?.info("Registering intent handler.");
					await this._interopClient?.registerIntentHandler(async (intentRequest) => {
						if(intentRequest.context.type === "openfin.notification") {
							const notification = (intentRequest.context as unknown as
								{ notification: NotificationOptions }).notification;
							const sent = await this._endpointClient?.action(notificationSourceEndpointId, notification);
							this._logger?.info(`Intent handler called and notification sent: ${sent}.`, intentRequest);
						} else {
							this._logger?.warn(`A create notification intent was raised but it wasn't passed and openfin.notification context. Type: ${intentRequest.context.type}.`);
						}
					}, this._definition?.data?.intentHandler?.name ?? "CreateNotification");
				}
			}

			if(!isEmpty(this._definition?.data?.channelHandler?.enabled !== false)) {
				const notificationChannelName = `${fin.me.identity.uuid}/${this._definition?.data?.channelHandler?.name ?? "notification-handler"}`;
				const notificationChannel = await fin.InterApplicationBus.Channel.create(notificationChannelName);
				notificationChannel.onConnection(async (identity, payload) => {
					this._logger?.info(`Channel connection request from: ${identity.uuid}`, payload);
					if(this._helpers?.isConnectionValid) {
						const isValid = await this._helpers.isConnectionValid(identity, payload);
						if(isValid) {
							this._logger?.info(`Channel connection request from: ${identity.uuid} is valid.`);
						} else {
							this._logger?.warn(`Channel connection request from: ${identity.uuid} to ${notificationChannelName} is not valid.`);
							throw new Error(`Connection to ${notificationChannelName} is not valid.`);
						}
					}
				});
				notificationChannel.register("create", async (payload) => {
					const request = payload as { type: string; notification: NotificationOptions};
					if(request.type === "openfin.notification") {
						const notification = request.notification;
						const sent = await this._endpointClient?.action(notificationSourceEndpointId, notification);
						this._logger?.info(`${notificationChannelName} channel create function called and notification sent: ${sent}.`, payload);
					} else {
						this._logger?.warn(`${notificationChannelName} channel create function called but it wasn't passed an openfin.notification context. Type: ${request.type}.`);
					}
				});
			}

			if (this._helpers?.getNotificationClient) {
				if (!this._notificationSubscriptions) {
					this._notificationSubscriptions = {};
				}
				this._notificationClient = await this._helpers.getNotificationClient();

				if (this._notificationClient) {
					await this.setupNotificationEventListeners();
					if(this._endpointClient) {
						const stream = await this._endpointClient
						.requestStream<unknown, NotificationOptions>(notificationSourceEndpointId);
						if(!isEmpty(stream)) {
							const reader = stream.getReader();
							this._logger?.info("Reading from stream");
							const logger = this._logger;
							const notificationClient = this._notificationClient;
							reader.read().then(function pump({ done, value }): unknown {
								if (done) {
									logger?.info("Stream ended");
									return;
								}
								notificationClient?.create(value);
								// eslint-disable-next-line promise/no-nesting
								return reader.read().then(pump);
							})
							.catch((error) => {
								this._logger?.error(`Error reading stream: ${error}`);
							});
						}
					}
				}
			}
		}

		/**
		 * Stops the notification service.
		 */
		private async stopNotificationService(): Promise<void> {
			this._logger?.info("Stopping notification service (This is an example.)");
			await this.removeNotificationEventListeners();
		}

		/**
		 * Setup listeners using the notification client fetched via a helper.
		 */
		private async setupNotificationEventListeners(): Promise<void> {
			if (!isEmpty(this._notificationClient) && !isEmpty(this._notificationSubscriptions)) {
				const actionEventHandler = async (event: NotificationActionEvent): Promise<void> => {
					this._logger?.info("Event for notification action received.", event);
					const action = event.result.task;
					await this.handleNotificationResponse(action, event.result.customData);
				};

				await this._notificationClient.addEventListener("notification-action", actionEventHandler);
				this._notificationSubscriptions["notification-action"] = actionEventHandler;

				const formSubmittedEventHandler = async (event: NotificationFormSubmittedEvent): Promise<void> => {
					this._logger?.info("Event for notification form submitted received.", event);
					const { task, ...otherCustomData } = event.notification.customData; // Remove task
					const customData = { ...otherCustomData };
					customData.context.form = event.form;
					await this.handleNotificationResponse(task, customData as NotificationCustomData);
				};

				await this._notificationClient.addEventListener(
					"notification-form-submitted",
					formSubmittedEventHandler
				);
				this._notificationSubscriptions["notification-form-submitted"] = formSubmittedEventHandler;
			}
		}

		/**
		 * Handles a response from a notification.
		 * @param action The action to take.
		 * @param customData The custom data to use.
		 * @returns Nothing.
		 */
		private async handleNotificationResponse(action: "raise-intent" | "broadcast" | "launch-app",
		customData: NotificationCustomData): Promise<void> {
			switch(action) {
				case "raise-intent": {
					const intent = {
						name: customData.name,
						context: customData.context,
						metadata: {
							target: customData?.target
						}
					};
					try {
						await this._interopClient?.fireIntent(intent);
					} catch (error) {
						this._logger?.error("Error firing intent in response to a notification click.", error);
						if((error as { message: string})?.message === "TargetInstanceUnavailable") {
							this._logger?.error(`Error firing intent in response to a notification click as the target instance ${customData?.target?.instanceId} is unavailable. Launch the app without a specific instance as it may have been closed.`);
							try {
								if(intent.metadata.target) {
									intent.metadata.target.instanceId = undefined;
									await this._interopClient?.fireIntent(intent);
								}
							} catch (secondError) {
								this._logger?.error("Error firing intent in response to a notification click after removing the instance id and just targeting the app.", secondError);
							}
						}
					}
					break;
				}
				case "launch-app": {
					try {
						if(this._helpers?.launchApp && customData.target?.appId) {
							await this._helpers?.launchApp(customData.target.appId);
						} else {
							this._logger?.error(`Error launching app ${customData?.target?.appId} in response to a notification click as the launchApp function is not available or the appId is not provided.`);
						}
					} catch (error) {
						this._logger?.error(`Error launching app ${customData?.target?.appId} in response to a notification click.`, error);
					}
					break;
				}
				case "broadcast": {
					try {
						if(this._helpers?.getInteropClient &&
							customData?.context &&
							customData?.broadcast &&
							customData?.name) {
							const broadcastClient = await this._helpers.getInteropClient();
							if(broadcastClient &&
								customData.broadcast.isUserChannel) {
								await broadcastClient.joinContextGroup(customData.name);
								broadcastClient.setContext(customData.context);
							} else if(broadcastClient) {
								const sessionContextGroup = await broadcastClient
								.joinSessionContextGroup(customData.name);
								await sessionContextGroup.setContext(customData.context);
							}
						} else {
							this._logger?.error("Error broadcasting context from a notification is not available as either an interop client is not available or no userChannel or appChannel was specified or context was not passed.");
						}
					} catch (error) {
						this._logger?.error("Error broadcasting context.", error);
					}
					break;
				}
			}
		}

		/**
		 * Clean up notification subscriptions.
		 */
		private async removeNotificationEventListeners(): Promise<void> {
			if (!isEmpty(this._notificationClient) && !isEmpty(this._notificationSubscriptions)) {
				for (const [key, value] of Object.entries(this._notificationSubscriptions)) {
					await this._notificationClient.removeEventListener(
						key as keyof NotificationsEventMap,
						value as never
					);
				}
			}
		}
}
