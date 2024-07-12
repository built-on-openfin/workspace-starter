import type OpenFin from "@openfin/core";
import type { AppIntent } from "@openfin/workspace-platform";
import type { PlatformApp } from "./app-shapes";
import type { WindowPositioningOptions } from "./browser-shapes";
import type { Endpoint, EndpointDefinition } from "./endpoint-shapes";
import type { ModuleHelpers, ModuleImplementation, ModuleList } from "./module-shapes";
/**
 * Definition for conditions module type.
 */
export interface PlatformInteropOverride<O = unknown, H = ModuleHelpers> extends ModuleImplementation<O, H> {
	/**
	 * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the interop broker defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	getConstructorOverride(
		options: PlatformInteropOverrideOptions
	): Promise<OpenFin.ConstructorOverride<OpenFin.InteropBroker>>;
}
/**
 * The options passed to the platform interop broker override.
 */
export type PlatformInteropOverrideOptions = Omit<PlatformInteropBrokerOptions, "modules"> & {
	/**
	 * The platform's window positioning options that can be passed to the getWindowPositionUsingStrategy function along with an identity to determine where a window should be placed.
	 */
	windowPositionOptions?: WindowPositioningOptions;
	/**
	 * The platform's root url that can be used to resolve relative urls.
	 */
	platformRootUrl?: string;
};
/**
 * Options for the platform interop broker.
 */
export interface PlatformInteropBrokerOptions extends ModuleList {
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
	 * When fdc3.open is used what settings should be applied?
	 */
	openOptions?: OpenOptions;
	/**
	 * Options for when fdc3.broadcast or fin.me.interop.setContext is called.
	 */
	contextOptions?: ContextOptions;
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
 * An entry in the context registry.
 */
export interface ContextRegistrationEntry {
	/**
	 * The handlerId for the particular context listener registration.
	 */
	handlerId: string;
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
export type IntentTargetMetaData =
	| string
	| {
			appId: string;
			instanceId?: string;
	  };
/**
 * The response from the intent resolver.
 */
export interface IntentResolverResponse {
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
	 * is 15000 (15 seconds)
	 */
	intentTimeout?: number;
}
/**
 * Option for the Context Handling.
 */
export interface ContextOptions {
	/**
	 * Should the broker send context messages back to the sender? Default is true.
	 */
	includeOriginator?: boolean;
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
 * API Metadata.
 */
export interface BrokerClientConnection {
	/**
	 * The client identity of the connection.
	 */
	clientIdentity: OpenFin.ClientIdentity;
	/**
	 * The api meta data if available.
	 */
	apiMetadata?: ApiMetadata;
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
/** Options related to the fdc3 open api */
export interface OpenOptions {
	/**
	 * When fdc3.open is raised will it only apply to applications that support the intent "OpenApp" (context if passed is sent to the intent handler for OpenApp)
	 * or will it follow the fdc3 approach where all apps can be opened and the defaultContextListener will receive the context if passed.
	 * The default is fdc3. The previous behavior was "intent" and you can set this setting in order to have fdc3 open only apply to apps that say they support the
	 * intent "OpenApp". This setting is here to let you keep the previous behavior.
	 */
	openStrategy?: "intent" | "fdc3";
	/**
	 * How long should the broker wait after launching a view/window for it to register a context handler. The default
	 * is 15000 (15 seconds)
	 */
	contextTimeout?: number;
	/**
	 * How long should the broker wait after launching a view/window for it to connect to the broker. The default
	 * is 15000 (15 seconds).
	 */
	connectionTimeout?: number;
}
/**
 * Interop Broker helpers provides environment methods and data.
 */
export type PlatformInteropBrokerHelpers = ModuleHelpers;
