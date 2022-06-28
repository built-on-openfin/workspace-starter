import type { SalesforceRestApiSObject } from "@openfin/salesforce";

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
 * Account response object type.
 */
export type SalesforceAccount = SalesforceRestApiSObject<{
	Industry?: string;
	Name: string;
	Phone?: string;
	Type?: string;
	Website?: string;
}>;

/**
 * Account response contact type.
 */
export type SalesforceContact = SalesforceRestApiSObject<{
	Department?: string;
	Email: string;
	Name: string;
	Phone?: string;
	Title?: string;
}>;

/**
 * Account response task type.
 */
export type SalesforceTask = SalesforceRestApiSObject<{
	Subject?: string;
	Description?: string;
}>;

/**
 * Account response object note.
 */
export type SalesforceContentNote = SalesforceRestApiSObject<{
	Title?: string;
	TextPreview?: string;
}>;

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

/**
 * Model for a feed item.
 */
export interface SalesforceFeedItem {
	/**
	 * The id of the feed item.
	 */
	id: string;
	/**
	 * The url of the feed item.
	 */
	url: string;
	/**
	 * The type of the feed item.
	 */
	type: string;
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
	 * The page url.
	 */
	pageUrl: string;
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
}
