import type OpenFin from "@openfin/core";
import type { ServiceNowEntities } from "@openfin/servicenow";
import type {
	ButtonStyle,
	ButtonTemplateFragment,
	ImageTemplateFragment,
	PlainContainerTemplateFragment,
	TemplateFragment,
	TextTemplateFragment
} from "@openfin/workspace";
import type { CustomPaletteSet } from "@openfin/workspace-platform";
import type * as CSS from "csstype";

/**
 * Custom settings for the application.
 */
export interface CustomSettings {
	/**
	 * The settings for ServiceNow.
	 */
	servicenow?: ServiceNowSettings;
}

/**
 * All the image keys.
 */
export type IMAGES = "servicenow" | "contact" | "account" | "case" | "task" | "incident" | "call" | "email";

/**
 * Settings for the ServiceNow integration.
 */
export interface ServiceNowSettings {
	/**
	 * The instance url for the ServiceNow connection.
	 */
	instanceUrl: string;

	/**
	 * The client id for the ServiceNow connection.
	 */
	clientId: string;

	/**
	 * Enable logging in the core library.
	 */
	enableLibLogging: boolean;

	/**
	 * Dictionary of image urls.
	 */
	images: { [id in IMAGES]: string };
}

/**
 * Types of objects to retrieve.
 */
export type ServiceNowObjectTypes = "Contact" | "Account" | "Case" | "Task" | "Incident";

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
	objType: ServiceNowObjectTypes;

	/**
	 * The object.
	 */
	obj: ServiceNowEntities.Core.BaseEntity;

	/**
	 * The loading state.
	 */
	state: string;
}

/**
 * The data associated with the home template actions.
 */
export interface ActionData {
	/**
	 * The provider id.
	 */
	providerId: string;

	/**
	 * The object.
	 */
	obj: ServiceNowEntities.Core.BaseEntity;

	/**
	 * Url to launch for open action.
	 */
	url?: string;

	/**
	 * Phone to launch for call action.
	 */
	phone?: string;

	/**
	 * Email to launch for email action.
	 */
	email?: string;
}

/**
 * An item for a batch request.
 */
export interface ServiceNowBatchRequestItem {
	/**
	 * An id to identify the batch request item.
	 */
	id: string;

	/**
	 * The http verb to use.
	 */
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

	/**
	 * The url for the batch item.
	 */
	url: string;

	/**
	 * The body for the request, must be base64 encoded.
	 */
	body?: string;

	/**
	 * Additional headers for the request.
	 */
	headers?: { name: string; value: string }[];
}

/**
 * Definition for a batch request.
 */
export interface ServiceNowBatchRequest {
	/**
	 * An id to identify the batch request.
	 */
	batch_request_id: string;

	/**
	 * The rest request items.
	 */
	rest_requests: ServiceNowBatchRequestItem[];
}

/**
 * An item for a batch response.
 */
export interface ServiceNowBatchResponseItem {
	/**
	 * An id to identify the batch response item.
	 */
	id: string;

	/**
	 * The status code for the item response.
	 */
	status_code: string;

	/**
	 * The status text for the item response.
	 */
	status_text: string;

	/**
	 * The body for the response, must be base64 encoded.
	 */
	body: string;

	/**
	 * Headers for the request.
	 */
	headers: { name: string; value: string }[];
}

/**
 * Definition for a batch response.
 */
export interface ServiceNowBatchResponse {
	/**
	 * An id to identify the batch response.
	 */
	batch_request_id: string;

	/**
	 * The rest requests that were serviced.
	 */
	serviced_requests: ServiceNowBatchResponseItem[];

	/**
	 * The rest requests that were unserviced.
	 */
	unserviced_requests: ServiceNowBatchResponseItem[];
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
	 * @param viewOptions The view options to launch.
	 * @returns The launched view.
	 */
	launchView(viewOptions: OpenFin.PlatformViewCreationOptions): Promise<OpenFin.View>;
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
	 * Create a title element.
	 * @param dataKey The data key for the title text.
	 * @param fontSize The font size.
	 * @param fontWeight The font weight.
	 * @param style Additional CSS properties to use.
	 * @returns The title element.
	 */
	createTitle(
		dataKey: string,
		fontSize?: number,
		fontWeight?: string,
		style?: CSS.Properties
	): Promise<TextTemplateFragment>;

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
