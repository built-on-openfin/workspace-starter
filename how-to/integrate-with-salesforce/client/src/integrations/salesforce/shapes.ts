import type OpenFin from "@openfin/core";

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
 * Account response object actor.
 */
export interface SalesforceActor {
	/**
	 * Id for the actor.
	 */
	id: string;
	/**
	 * Url for the actor.
	 */
	url: string;
	/**
	 * Type for the actor.
	 */
	type: string;
	/**
	 * Company name for the actor.
	 */
	companyName: string;
	/**
	 * Display name for the actor.
	 */
	displayName: string;
	/**
	 * Name for the actor.
	 */
	name: string;
}

export interface SalesforceSearchResult extends Record<string, unknown> {
	Id: string;
	attributes: { type: string; url: string };
}

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

export interface SalesforceFieldMappingReference {
	// The source type of the reference field
	sourceType: string;
	// The field to get from the data
	field: string;
	// Sub property of the field
	fieldSub?: string;
}

export interface SalesforceFieldMapping {
	// The name of the field to retrieve.
	field: string;
	// A sub field of the main one.
	fieldSub?: string;
	// How should this field be displayed.
	displayMode: "none" | "icon" | "initials" | "header" | "sub-header" | "field";
	// The content type if its a field.
	fieldContent?: "text" | "link" | "memo" | "date";
	// The label to display for the field.
	label?: string;
	// Use this field for the result title.
	isResultTitle?: boolean;
	// This is an id reference field that needs secondary name lookup from the specified table.
	reference?: SalesforceFieldMappingReference;
}

export interface SalesforceMapping {
	// The salesforce type to lookup
	sourceType: string;
	// The icon to display in the search result list, lookup up in the icon map
	iconKey?: string;
	// The label to display in the interface for this type
	label?: string;
	// The fields to retrieve.
	fieldMappings?: SalesforceFieldMapping[];
	// The maximum number of items to retrieve.
	maxItems?: number;
	// What type of lookup is this
	lookupType?: "search" | "feed";
	// If the lookup type is a feed what is the feed type
	feedType?: string;
	// Condition used when performing lookup
	condition?: string;
	// Actions
	actions?: SalesforceAction[];
}

export interface SalesforceAction {
	// The label for the action
	label: string;
	// The icon for the action
	iconKey: string;
	// The url to open, optional if intent provided instead, if no url intent defaults to open in Salesforce
	url?: string;
	// The intent to raise if no url supplied
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

	// Map the data from SF to templates, if you just include the type field the default display will be used.
	mappings?: SalesforceMapping[];
}
