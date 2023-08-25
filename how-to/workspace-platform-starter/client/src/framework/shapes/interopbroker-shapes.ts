import type OpenFin from "@openfin/core";
import type { AppIntent } from "@openfin/workspace-platform";
import type { PlatformApp } from "./app-shapes";
import type { Endpoint, EndpointDefinition } from "./endpoint-shapes";

/**
 * Options for the platform interop broker.
 */
export interface PlatformInteropBrokerOptions {
	/**
	 * Intent Resolver configuration if you wish to support intents. It needs to support the functions required by the
	 * platform
	 */
	intentResolver?: IntentResolverOptions;

	/**
	 * Options related to the way this platform supports intents
	 */
	intentOptions?: IntentOptions;

	/**
	 * If an unregistered app is included here then it indicates you wish to support selecting views/windows that are
	 * not linked to an app from an intent picker that supports instances. The intents and contexts in this app specify
	 * which you support for unregistered instances. Do not specify a manifest or manifestType for this entry (we don't
	 * launch unregistered apps so there is no need for a manifest as it is existing instances and we specify a custom
	 * manifestType for consideration when we are bringing an unregistered web app instance into focus).
	 */
	unregisteredApp?: PlatformApp;
}

/**
 * The payload for an intent registration.
 */
export interface IntentRegistrationPayload {
	/**
	 * The FDC3 version.
	 */
	fdc3Version: string;

	/**
	 * The id of the handler.
	 */
	handlerId: string;
}

/**
 * An entry in the intent registry.
 */
export interface IntentRegistrationEntry {
	/**
	 * The FDC3 version supported.
	 */
	fdc3Version: string;

	/**
	 * The identity of the client.
	 */
	clientIdentity: OpenFin.ClientIdentity;

	/**
	 * The identity of the application.
	 */
	appId?: string;
}

/**
 * Intent target metadata.
 */
export type IntentTargetMetaData = string | { appId: string; instanceId?: string };

/**
 * The response from the intent picker.
 */
export interface IntentPickerResponse {
	/**
	 * The appId that was selected.
	 */
	appId: string;

	/**
	 * The instance that was selected.
	 */
	instanceId?: string;

	/**
	 * The intent that was selected.
	 */
	intent: Partial<AppIntent>;
}

/**
 * Option for the intent.
 */
export interface IntentOptions {
	/**
	 * How long should the broker wait after launching a view/window for it to register an intent handler. The default
	 * is 5000 (5 seconds)
	 */
	intentTimeout?: number;
}

/**
 * Intent resolver options.
 */
export interface IntentResolverOptions {
	/**
	 * The url of the html page that has the intent picker
	 */
	url: string;

	/**
	 * the height you wish the window to be
	 */
	height?: number;

	/**
	 * the width you wish the window to be
	 */
	width?: number;

	/**
	 * the fdc3 api version this picker will support (default is v2)
	 */
	fdc3InteropApi?: string;

	/**
	 * A suggested title for the intent picker/resolver ui
	 */
	title?: string;
}

/**
 * API Metadata.
 */
export interface ApiMetadata {
	/**
	 * The type of the metadata.
	 */
	type: "fdc3" | "interop";

	/**
	 * The version.
	 */
	version?: "1.2" | "2.0" | string;
}

/**
 * The context request to augment with a context processor.
 */
export interface ContextToProcess<T extends OpenFin.Context = OpenFin.Context> {
	/**
	 * The context to augment.
	 */
	context: T;
}

/**
 * The response from a context processor.
 */
export interface ProcessedContext<T extends OpenFin.Context = OpenFin.Context> {
	/**
	 * The augmented context.
	 */
	context: T;
}

/**
 * Endpoint for augmenting contexts with additional data.
 */
export interface ContextProcessorEndpoint extends Omit<Endpoint, "action"> {
	/**
	 * Takes a context object and returns an enriched version
	 * @param endpointDefinition The definition of the endpoint (which is passed by the endpoint provider).
	 * @param request The request containing the context to process that is passed by the interopbroker.
	 * @returns The response containing the enriched or original context object.
	 */
	requestResponse(
		endpointDefinition: EndpointDefinition,
		request: ContextToProcess
	): Promise<ProcessedContext>;
}

/**
 * The payload to use for the capture API.
 */
export interface CaptureApiPayload {
	/**
	 * The api version.
	 */
	apiVersion?: ApiMetadata;
}
