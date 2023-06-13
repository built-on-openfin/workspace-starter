import type OpenFin from "@openfin/core";
import { type SalesforceRestApiSObject } from "@openfin/salesforce";
import {
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
	 * The settings for salesforce.
	 */
	salesforce?: SalesforceSettings;
}

/**
 * Model for batch request.
 */
export interface SalesforceBatchRequest {
	/**
	 * The requests.
	 */
	batchRequests: SalesforceBatchRequestItem[];

	/**
	 * Halt the batch operations if there was an error.
	 */
	haltOnError: boolean;
}

/**
 * Model for batch item.
 */
export interface SalesforceBatchRequestItem {
	/**
	 * The batch http method.
	 */
	method: string;

	/**
	 * The url for the batch request.
	 */
	url: string;
}

/**
 * Model for the batch response.
 */
export interface SalesforceBatchResponse {
	/**
	 * The response has errors.
	 */
	hasErrors: boolean;

	/**
	 * The results of the batch request.
	 */
	results: SalesforceBatchResponseItem[];
}

/**
 * Model for a single batch response.
 */
export interface SalesforceBatchResponseItem {
	/**
	 * The http status code for the response.
	 */
	statusCode: number;

	/**
	 * The result.
	 */
	result: unknown;
}

/**
 * Type for a search result.
 */
export type SalesforceSearchResult = SalesforceRestApiSObject<{ [key: string]: unknown }>;

/**
 * Model for the feed element page.
 */
export interface SalesforceFeedElementPage {
	/**
	 * The current page token.
	 */
	currentPageToken: string;
	/**
	 * The current page url.
	 */
	currentPageUrl: string;
	/**
	 * The elements for the current page.
	 */
	elements: SalesforceSearchResult[];
	/**
	 * The token for checking modifications.
	 */
	isModifiedToken: string;
	/**
	 * The url to check for modifications.
	 */
	isModifiedUrl: string;
	/**
	 * The url to get the next page of results.
	 */
	nextPageUrl: string;
	/**
	 * The token for performing updates.
	 */
	updatesToken: string;
	/**
	 * The url for performing updates.
	 */
	updatesUrl: string;
}

/**
 * Model for the result data.
 */
export interface SalesforceResultData {
	/**
	 * The provider id.
	 */
	providerId: string;
	/**
	 * The url.
	 */
	url?: string;
	/**
	 * The urls.
	 */
	urls?: { [id: string]: string };
	/**
	 * The object.
	 */
	obj?: SalesforceSearchResult;
	/**
	 * The mapping for the object.
	 */
	mapping?: SalesforceMapping;
}

/**
 * Reference to data in another object.
 */
export interface SalesforceFieldMappingReference {
	/**
	 * The source type of the reference field
	 */
	sourceType: string;
	/**
	 * The field to get from the data
	 */
	field: string;
	/**
	 * Sub property of the field
	 */
	fieldSub?: string;
}

/**
 * Map a salesforce field to the home templates.
 */
export interface SalesforceFieldMapping {
	/**
	 * The name of the field to retrieve.
	 */
	field: string;
	/**
	 * A sub field of the main one.
	 */
	fieldSub?: string;
	/**
	 * How should this field be displayed.
	 */
	displayMode: "none" | "icon" | "initials" | "header" | "sub-header" | "field";
	/**
	 * The content type if its a field.
	 */
	fieldContent?: "text" | "link" | "memo" | "date";
	/**
	 * The label to display for the field.
	 */
	label?: string;
	/**
	 * Use this field for the result title.
	 */
	isResultTitle?: boolean;
	/**
	 * This is an id reference field that needs secondary name lookup from the specified table.
	 */
	reference?: SalesforceFieldMappingReference;
}

/**
 * Map an object type.
 */
export interface SalesforceMapping {
	/**
	 * The salesforce type to lookup
	 */
	sourceType: string;
	/**
	 * The icon to display in the search result list, lookup up in the icon map
	 */
	iconKey?: string;
	/**
	 * The label to display in the interface for this type
	 */
	label?: string;
	/**
	 * The fields to retrieve.
	 */
	fieldMappings?: SalesforceFieldMapping[];
	/**
	 * The maximum number of items to retrieve.
	 */
	maxItems?: number;
	/**
	 * What type of lookup is this
	 */
	lookupType?: "search" | "feed";
	/**
	 * If the lookup type is a feed what is the feed type
	 */
	feedType?: string;
	/**
	 * Condition used when performing lookup
	 */
	condition?: string;
	/**
	 * Actions
	 */
	actions?: SalesforceAction[];
}

/**
 * Model for an action to be performed on a home template.
 */
export interface SalesforceAction {
	/**
	 * The label for the action
	 */
	label: string;
	/**
	 * The icon for the action
	 */
	iconKey: string;
	/**
	 * The url to open, optional if intent provided instead, if no url intent defaults to open in Salesforce
	 */
	url?: string;
	/**
	 * Open as a view
	 */
	view?: OpenFin.PlatformViewCreationOptions;
	/**
	 * The intent to raise if no url supplied
	 */
	intent?: {
		// The name of the intent
		name: string;
		// The context for the intent
		context: OpenFin.Context;
		// Optional target app
		target?: string;
	};
}

/**
 * Model for the integration settings.
 */
export interface SalesforceSettings {
	/**
	 * Consumer key for accessing SalesForce.
	 */
	consumerKey: string;
	/**
	 * The org access url.
	 */
	orgUrl: string;
	/**
	 * Enable the logging from the library.
	 */
	enableLibLogging: boolean;
	/**
	 * Map of the icon urls.
	 */
	iconMap: {
		[id: string]: string;
	};

	/**
	 * Preload script required by salesforce to make the fin api available.
	 */
	preload: string;

	/**
	 * Map the data from SF to templates, if you just include the type field the default display will be used.
	 */
	mappings?: SalesforceMapping[];
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

	/**
	 * Get the interop client for the platform.
	 * @returns The interop client.
	 */
	getInteropClient(): Promise<OpenFin.InteropClient | undefined>;
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
}
