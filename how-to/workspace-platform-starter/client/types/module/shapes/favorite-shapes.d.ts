import type { PlatformStorageMetadata } from "./platform-shapes";
/**
 * Favorite type for App.
 */
export declare const FAVORITE_TYPE_NAME_APP = "app";
/**
 * Favorite type for Workspace.
 */
export declare const FAVORITE_TYPE_NAME_WORKSPACE = "workspace";
/**
 * Favorite type for Page.
 */
export declare const FAVORITE_TYPE_NAME_PAGE = "page";
/**
 * Favorite type for Query.
 */
export declare const FAVORITE_TYPE_NAME_QUERY = "query";
/**
 * Names for all the favorite types.
 */
export type FavoriteTypeNames =
	| typeof FAVORITE_TYPE_NAME_APP
	| typeof FAVORITE_TYPE_NAME_WORKSPACE
	| typeof FAVORITE_TYPE_NAME_PAGE
	| typeof FAVORITE_TYPE_NAME_QUERY;
/**
 * Options for the favorite provider.
 */
export interface FavoriteProviderOptions {
	/**
	 * Is the provider enabled, defaults to true.
	 */
	enabled?: boolean;
	/**
	 * The icon that should be used if you want to indicate this is a favorite action
	 */
	favoriteIcon: string;
	/**
	 * The icon to use to indicate that this favorite can be unset
	 */
	unfavoriteIcon: string;
	/**
	 * What commands should integrations check for if they intent to support the display of favorites
	 */
	favoriteCommand?: string;
	/**
	 * The connection provider can have actions registered against it from the platform. This provides a default list of
	 * actions that connections should be able to use if actions are enabled for that connection.
	 */
	supportedFavoriteTypes?: FavoriteTypeNames[];
}
/**
 * When an entry is made it represents a type supported by this platform. This can be used to lookup and launch the thing this entry refers to.
 */
export interface FavoriteEntry {
	/**
	 * A unique guid to represent this favorite entry so that it can be updated or removed
	 */
	id: string;
	/**
	 * The id for the favorite type this entry represents
	 */
	typeId: string;
	/**
	 * What type of favorite entry does this entry represent
	 */
	type: FavoriteTypeNames;
	/**
	 * The timestamp for the entry.
	 */
	timestamp?: Date;
	/**
	 * Does this favorite have a suggested label that can be used to avoid a lookup
	 */
	label?: string;
	/**
	 * Does this favorite have a suggested icon that can be used to avoid a lookup
	 */
	icon?: string;
}
/**
 * Info to return to interested parties to help them support favorites
 */
export interface FavoriteInfo {
	/**
	 * The path to an icon that can be used to indicate the ability to favorite
	 */
	favoriteIcon?: string;
	/**
	 * The path to an icon that can be used to indicate the ability to remove this favorite
	 */
	unfavoriteIcon?: string;
	/**
	 * A command that supporting modules should listen for if they are to display favorites that fall under them
	 */
	command?: string;
	/**
	 * What types of favorite item are supported on this platform, this also determines the ordering in the dock menu.
	 */
	enabledTypes?: FavoriteTypeNames[];
	/**
	 * Is favorite support enabled on this platform.
	 */
	isEnabled: boolean;
}
/**
 * A client that can be used to provide access to some or all of the favorite functionality
 */
export interface FavoriteClient {
	/**
	 * The ability to request supporting information about whether favorites are initialized for the platform and supporting information.
	 * @returns Supporting information.
	 */
	getInfo(): FavoriteInfo;
	/**
	 * The ability to request all (or some if by type) of the saved favorites
	 * @param byType the type of saved favorite you are looking for
	 * @returns An array of saved favorites or an empty array if it was unable to get any back
	 */
	getSavedFavorites(byType?: FavoriteTypeNames): Promise<FavoriteEntry[] | undefined>;
	/**
	 * The ability to request a particular saved favorite.
	 * @param id the id of the favorite you are looking for
	 * @returns the saved favorite if available or false if it didn't exist
	 */
	getSavedFavorite(id: string): Promise<FavoriteEntry | undefined>;
	/**
	 * The ability to save a favorite.
	 * @param favorite the Favorite you wish to save
	 * @returns whether or not the favorite was saved
	 */
	setSavedFavorite?(favorite: FavoriteEntry): Promise<boolean>;
	/**
	 * The ability to remove/delete a saved favorite.
	 * @param id The id of the favorite to delete
	 * @returns whether or not the favorite was deleted.
	 */
	deleteSavedFavorite?(id: string): Promise<boolean>;
}
/**
 * An object that represents a favorite and meta data related to it
 */
export interface EndpointFavoriteEntry {
	/**
	 * Information related to the platform providing the payload.
	 */
	metaData: PlatformStorageMetadata;
	/**
	 * The favorite entry
	 */
	payload: FavoriteEntry;
}
/**
 * A request type for the FavoriteEndpoint that gets all saved favorite entries
 */
export interface EndpointFavoriteListRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The type if specified should be used to filter the response to only send the entries that are relevant
	 */
	favoriteType?: FavoriteTypeNames;
}
/**
 * The response after the request for favorites was fulfilled
 */
export interface EndpointFavoriteListResponse {
	/**
	 * The list of favorite entries with information of what platform versions they were originally saved against
	 */
	entries: EndpointFavoriteEntry[];
}
/**
 * The request for getting a specific favorite entry
 */
export interface EndpointFavoriteGetRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the specific entry that has been saved
	 */
	id: string;
}
/**
 * The response after the request for a specific favorite was fulfilled
 */
export type EndpointFavoriteGetResponse = EndpointFavoriteEntry;
/**
 * The request for getting a specific favorite entry
 */
export interface EndpointFavoriteSetRequest extends EndpointFavoriteEntry {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the specific entry that is to be set
	 */
	id: string;
}
/**
 * The request for removing a specific favorite entry
 */
export interface EndpointFavoriteRemoveRequest {
	/**
	 * The id of the platform making the request
	 */
	platform: string;
	/**
	 * The id of the specific entry that is to be removed
	 */
	id: string;
}
