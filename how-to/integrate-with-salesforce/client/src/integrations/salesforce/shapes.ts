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

/**
 * Model for text area.
 */
export interface SalesforceTextArea {
	/**
	 * Is the text content rich text.
	 */
	isRichText: boolean;
	/**
	 * The text content.
	 */
	text: string;
}

export interface SalesforceSearchResult extends Record<string, unknown> {
	Id: string;
	attributes: { type: string; url: string };
}

/**
 * Model for a feed item.
 */
export interface SalesforceFeedItem {
	/**
	 * The id of the feed item.
	 */
	id?: string;
	/**
	 * The url of the feed item.
	 */
	url?: string;
	/**
	 * The type of the feed item.
	 */
	type?: string;
	/**
	 * The actor for the feed item.
	 */
	actor?: SalesforceActor;
	/**
	 * The body for the feed item.
	 */
	body?: SalesforceTextArea;
	/**
	 * The header for the feed item.
	 */
	header?: SalesforceTextArea;
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
	elements: SalesforceFeedItem[];
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
}

export interface SalesforceMappingFieldMapping {
	// The name of the field to retrieve.
	field: string;
	// How should this field be displayed.
	displayMode: "none" | "icon" | "initials" | "header" | "sub-header" | "field";
	// The content type if its a field.
	fieldContent?: "text" | "link";
	// The label to display for the field.
	label?: string;
	// Use this field for the result title.
	isResultTitle?: boolean;
}

export interface SalesforceMapping {
	// The salesforce type to lookup
	type: string;
	// The icon to display in the search result list, lookup up in the icon map
	iconKey?: string;
	// The label to display in the interface for this type
	label?: string;
	// The fields to retrieve.
	fieldMappings?: SalesforceMappingFieldMapping[];
	// The maximum number of items to retrieve.
	maxItems?: number;
	// What type of lookup is this
	lookupType?: "search" | "feed";
	// If the lookup type is a feed what is the feed type
	feedType?: string;
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
