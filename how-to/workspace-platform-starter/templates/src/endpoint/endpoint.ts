import type { Endpoint, EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type { ExampleEndpointProviderOptions } from "./shapes";

/**
 * Implementation for the example endpoint provider.
 */
export class ExampleEndpointProvider implements Endpoint<ExampleEndpointProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ExampleEndpointProviderOptions> | undefined;

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
		definition: ModuleDefinition<ExampleEndpointProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ExampleEndpointProvider");
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
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns True if processed.
	 */
	public async action(endpointDefinition: EndpointDefinition, request?: unknown): Promise<boolean> {
		// TODO: Perform logic for an action
		return false;
	}

	/**
	 * Handle a request response on an endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or undefined if not handled.
	 */
	public async requestResponse(endpointDefinition: EndpointDefinition, request?: unknown): Promise<unknown> {
		// TODO: Perform logic for a request response
		return undefined;
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
		// An example is shown below that sends a message every second and below that is an example of code consuming a stream.
		// Readable streams can be used in OpenFin and in the browser: https://caniuse.com/?search=ReadableStream
		// More information about how you can consume a readable stream can be found here: https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams

		// You can cache the stream and return the same stream for each request and optionally use stream.tee() to split the stream or you can create a new stream for each request.

		// let intervalId: number | NodeJS.Timeout | undefined;
		// const stream = new ReadableStream<unknown>({
		// 	/**
		// 	 * Starts the stream and sends a message every second.
		// 	 * @param controller The controller to push values to the stream.
		// 	 */
		// 	start(controller): void {
		// 		intervalId = setInterval(() => {
		// 			controller.enqueue({ message: `Hello. The time is now ${new Date().toUTCString()}.` });
		// 		}, 1000);
		// 	},
		// 	/**
		// 	 * When the stream is cancelled this function is called.
		// 	 */
		// 	cancel(): void {
		// 		clearInterval(intervalId);
		// 	}
		// });
		// return stream;

		// someone could consume the stream like this:

		// The consuming code could look like this: const readableStream = await endpoint.requestStream("example"); but we have included the line below so it compiles. Alternatively use the example stream above as the readableStream.
		// const readableStream: ReadableStream = new ReadableStream();
		// const reader = readableStream.getReader();

		// // approach one: using await
		// // eslint-disable-next-line no-constant-condition
		// while (true) {
		// 	const { done, value } = await reader.read();
		// 	if (done) {
		// 		this._logger?.info("Stream ended");
		// 		break;
		// 	}
		// 	console.log(value);
		// }

		// // approach two: using promises
		// const logger = this._logger;
		// reader.read().then(function pump({ done, value }): unknown {
		// 	if (done) {
		// 		logger?.info("Stream ended");
		// 		return;
		// 	}
		// 	console.log(value);
		// 	// eslint-disable-next-line promise/no-nesting
		// 	return reader.read().then(pump);
		// })
		// .catch((error) => {
		// 	this._logger?.error(`Error reading stream: ${error}`);
		// });

		// TODO: Perform logic for a request for a readable stream
		return undefined;
	}
}
