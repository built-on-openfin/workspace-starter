import type { Entity } from "@microsoft/microsoft-graph-types";
import type OpenFin from "@openfin/core";
import {
	type App,
	type ButtonStyle,
	type ButtonTemplateFragment,
	type ImageTemplateFragment,
	type PlainContainerTemplateFragment,
	type TemplateFragment,
	type TextTemplateFragment
} from "@openfin/workspace";
import { type CustomPaletteSet } from "@openfin/workspace-platform";
import type * as CSS from "csstype";

/**
 * Custom settings for the application.
 */
export interface CustomSettings {
	/**
	 * The settings for ms365.
	 */
	ms365?: Microsoft365Settings;

	/**
	 * List of apps to show.
	 */
	apps?: App[];
}

/**
 * Settings for the MS365 integration.
 */
export interface Microsoft365Settings {
	/**
	 * The client id for the MS365 connection.
	 */
	clientId: string;
	/**
	 * The tenant id for the MS365 connection.
	 */
	tenantId: string;
	/**
	 * The redirect url to detect when the user has logged in.
	 */
	redirectUri: string;
	/**
	 * The permissions required for retrieving data.
	 */
	permissions: string[];
	/**
	 * Enable logging in the core library.
	 */
	enableLibLogging: boolean;
	/**
	 * Disable the graph explorer command.
	 */
	disableGraphExplorer: boolean;
	/**
	 * The prefix to use for the graph explorer.
	 */
	graphExplorerPrefix?: string;
	/**
	 * Dictionary of image urls.
	 */
	images: { [id: string]: string };
}

/**
 * Types of objects to retrieve.
 */
export type Microsoft365ObjectTypes =
	| "User"
	| "Contact"
	| "Message"
	| "Event"
	| "Team"
	| "Channel"
	| "ChatMessage"
	| "File";

/**
 * The data associated with the home template actions.
 */
export interface ActionData {
	/**
	 * The provider id.
	 */
	providerId: string;
	/**
	 * The name of the item.
	 */
	name?: string;
	/**
	 * Email addresses associated with the result item.
	 */
	emails?: string[];
	/**
	 * Phone number for the result item.
	 */
	phone?: string;
	/**
	 * Url for the result item.
	 */
	url?: string;
	/**
	 * Urls for the result item.
	 */
	urls?: { [id: string]: string };
	/**
	 * Team id for the result item.
	 */
	teamId?: string;
	/**
	 * Channel id for the result item.
	 */
	channelId?: string;
	/**
	 * Chat id for the result item.
	 */
	chatId?: string;
	/**
	 * Message id for the result item.
	 */
	messageId?: string;
	/**
	 * JSON for the result item.
	 */
	json?: unknown;
}

/**
 * Data associated with a loading result.
 */
export interface ActionLoadingData {
	/**
	 * The provider id.
	 */
	providerId: string;
	/**
	 * The object type.
	 */
	objType: string;
	/**
	 * The object.
	 */
	obj: Entity;
	/**
	 * The loading state.
	 */
	state: string;
}

/**
 * Response from a graph list result.
 */
export interface GraphListResponse<T> {
	/**
	 * The values in the list.
	 */
	value?: T[];
}

/**
 * HTTP methods to use in batch requests.
 */
export type GraphMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Batch request to the graph.
 */
export interface GraphBatchRequest {
	/**
	 * The id of the batch item.
	 */
	id: string;
	/**
	 * The url for the request.
	 */
	url: string;
	/**
	 * The HTTP method for the request.
	 */
	method: GraphMethod;
	/**
	 * The body of the request.
	 */
	body?: unknown;
	/**
	 * Headers for the request.
	 */
	headers?: { [id: string]: string };
}

/**
 * Response to the batch request.
 */
export interface GraphBatchResponse<T = unknown> {
	/**
	 * Items in the batch response.
	 */
	responses: GraphBatchResponseItem<T>[];
}

/**
 * Single batch response item.
 */
export interface GraphBatchResponseItem<T = unknown> {
	/**
	 * The body of the response.
	 */
	body: T;
	/**
	 * The headers from the response
	 */
	headers: { [id: string]: string };
	/**
	 * The id of the response.
	 */
	id: string;
	/**
	 * The status of the response.
	 */
	status: number;
}

/**
 * Definition of logger sync.
 */
export interface Logger {
	/**
	 * Log data as information.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	info(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as error.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	error(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as warning.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	warn(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as trace.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	trace(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as debug.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	debug(message: unknown, ...optionalParams: unknown[]): void;
}

/**
 * Helper methods to use in the integration.
 */
export interface IntegrationHelpers {
	/**
	 * Helper methods for generating home templates.
	 */
	templateHelpers: TemplateHelpers;

	/**
	 * Get the current palette.
	 * @returns The current palette.
	 */
	getCurrentPalette(): Promise<CustomPaletteSet>;

	/**
	 * Launch a view in the workspace.
	 * @param view The view to launch.
	 * @returns The launched view.
	 */
	launchView(view: string): Promise<OpenFin.View>;
}

/**
 * Helper methods for generating home templates.
 */
export interface TemplateHelpers {
	/**
	 * Create a template for displaying help.
	 * @param title The title at the top of the template.
	 * @param description The description of the template.
	 * @param examples Example to display.
	 * @returns The layout and data for the template.
	 */
	createHelp(
		title: string,
		description: string[],
		examples: string[]
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<{ layout: PlainContainerTemplateFragment; data: any }>;

	/**
	 * Create a container element for the home template.
	 * @param containerType The type of container.
	 * @param children The children to include in the container.
	 * @param style Additional CSS properties to use.
	 * @returns The container fragment.
	 */
	createContainer(
		containerType: "column" | "row",
		children: TemplateFragment[],
		style?: CSS.Properties
	): Promise<PlainContainerTemplateFragment>;

	/**
	 * Create a text element.
	 * @param dataKey The data key to lookup in the data object.
	 * @param fontSize The size of the font.
	 * @param style Additional CSS properties to use.
	 * @returns The text fragment.
	 */
	createText(dataKey: string, fontSize?: number, style?: CSS.Properties): Promise<TextTemplateFragment>;

	/**
	 * Create a button element.
	 * @param buttonStyle The style of the button.
	 * @param titleKey The data key to lookup in the data object for the title.
	 * @param action The action to send on the button click.
	 * @param style Additional CSS properties to use.
	 * @param children Any child elements for the button.
	 * @returns The button fragment.
	 */
	createButton(
		buttonStyle: ButtonStyle,
		titleKey: string,
		action: string,
		style?: CSS.Properties,
		children?: TemplateFragment[]
	): Promise<ButtonTemplateFragment>;

	/**
	 * Create an image element.
	 * @param dataKey The data key for the image url.
	 * @param alternativeText Alternative text for the image.
	 * @param style Additional CSS properties to use.
	 * @returns The image fragment.
	 */
	createImage(
		dataKey: string,
		alternativeText: string,
		style?: CSS.Properties
	): Promise<ImageTemplateFragment>;

	/**
	 * Create a link element.
	 * @param labelKey The data key for the label text.
	 * @param action The action to perform on clicking the link.
	 * @param fontSize The font size for the link.
	 * @param style Additional CSS properties to use.
	 * @returns The link fragment.
	 */
	createLink(
		labelKey: string,
		action: string,
		fontSize?: number,
		style?: CSS.Properties
	): Promise<TemplateFragment>;
}
