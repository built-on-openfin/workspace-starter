import { getCurrentSync } from "@openfin/workspace-platform";
import { fireLifecycleEvent } from "./lifecycle";
import { createLogger } from "./logger-provider";
import type { EndpointProvider } from "./shapes";
import type {
	EndpointFavoriteGetRequest,
	EndpointFavoriteGetResponse,
	EndpointFavoriteListRequest,
	EndpointFavoriteListResponse,
	EndpointFavoriteRemoveRequest,
	EndpointFavoriteSetRequest,
	FavoriteEntry,
	FavoriteInfo,
	FavoriteProviderOptions,
	FavoriteTypeNames
} from "./shapes/favorite-shapes";
import type { VersionInfo } from "./shapes/version-shapes";
import { isEmpty } from "./utils";

const logger = createLogger("Favorites");

let isInitialized: boolean = false;

let favoriteOptions: FavoriteProviderOptions | undefined;

let endpoints: EndpointProvider;

let currentVersionInfo: VersionInfo;

const FAVORITE_ENDPOINT_ID_LIST = "favorite-list";
const FAVORITE_ENDPOINT_ID_GET = "favorite-get";
const FAVORITE_ENDPOINT_ID_SET = "favorite-set";
const FAVORITE_ENDPOINT_ID_REMOVE = "favorite-remove";

/**
 * Initialize the favorite provider.
 * @param options Options for the favorite provider.
 * @param versionInfo The current version information for this platform.
 * @param endpointProvider The endpoint provider to help retrieve favorites from endpoints.
 * @returns Nothing.
 */
export async function init(
	options: FavoriteProviderOptions | undefined,
	versionInfo: VersionInfo,
	endpointProvider: EndpointProvider
): Promise<void> {
	if (isInitialized) {
		logger.warn("The favorite service is already initialized");
		return;
	}
	currentVersionInfo = versionInfo;
	endpoints = endpointProvider;
	if (!isEmpty(options)) {
		isInitialized = true;
		favoriteOptions = options;
	} else {
		logger.warn("Options were not passed to the favorite provider so it cannot be initialized.");
	}
}

/**
 * Lets you get favorites that have been saved.
 * @param byType do you wish to filter so it only returns a particular type of favorite
 * @returns an array of favorites or undefined if the endpoint is not configured.
 */
export async function getSavedFavorites(byType?: FavoriteTypeNames): Promise<FavoriteEntry[] | undefined> {
	if (endpoints.hasEndpoint(FAVORITE_ENDPOINT_ID_LIST)) {
		const favorites = await endpoints.requestResponse<
			EndpointFavoriteListRequest,
			EndpointFavoriteListResponse
		>(FAVORITE_ENDPOINT_ID_LIST, {
			favoriteType: byType,
			platform: fin.me.identity.uuid
		});
		if (!isEmpty(favorites) && Array.isArray(favorites?.entries)) {
			if (!isEmpty(byType)) {
				logger.info(`Returning saved favorites by type ${byType} from custom storage`);
			} else {
				logger.info("Returning saved favorites from custom storage");
			}
			return favorites.entries.map((fav) => fav.payload);
		}
		logger.warn("No response getting saved favorites from custom storage");
		return [];
	}
	logger.warn(`There has been a request for a list of favorites but no endpoint with the 
    id: ${FAVORITE_ENDPOINT_ID_LIST} is listed in your endpoint configuration.`);
	return undefined;
}

/**
 * Lets you get a favorite by id.
 * @param id the id of the favorite entry you wish to get
 * @returns FavoriteEntry
 */
export async function getSavedFavorite(id: string): Promise<FavoriteEntry | undefined> {
	if (endpoints.hasEndpoint(FAVORITE_ENDPOINT_ID_GET)) {
		const favorite = await endpoints.requestResponse<EndpointFavoriteGetRequest, EndpointFavoriteGetResponse>(
			FAVORITE_ENDPOINT_ID_GET,
			{
				id,
				platform: fin.me.identity.uuid
			}
		);
		if (favorite) {
			logger.info(`Returning saved favorite with id ${id} from custom storage`);
			return favorite.payload;
		}
		logger.warn(`No response getting saved favorite with id ${id} from custom storage`);
		return undefined;
	}
	logger.warn(`There has been a request for a favorite but no endpoint with the 
    id: ${FAVORITE_ENDPOINT_ID_GET} is listed in your endpoint configuration.`);
	return undefined;
}

/**
 * Lets you set a favorite.
 * @param favorite the favorite entry you wish to save
 * @returns boolean was it a successful save
 */
export async function setSavedFavorite(favorite: FavoriteEntry): Promise<boolean> {
	if (isEmpty(favorite?.id)) {
		logger.warn(
			"No id was passed for the favorite to save so we are unable to save it. If it is a new entry please generate a guid."
		);
		return false;
	}
	logger.info("Setting timestamp.");
	favorite.timestamp = new Date();
	if (endpoints.hasEndpoint(FAVORITE_ENDPOINT_ID_SET)) {
		const success = await endpoints.action<EndpointFavoriteSetRequest>(FAVORITE_ENDPOINT_ID_SET, {
			id: favorite.id,
			platform: fin.me.identity.uuid,
			metaData: {
				version: {
					workspacePlatformClient: currentVersionInfo.workspacePlatformClient,
					platformClient: currentVersionInfo.platformClient
				}
			},
			payload: favorite
		});
		if (success) {
			logger.info(`Saved favorite with id: ${favorite.id} to custom storage`);
			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "favorite-changed", {
				action: "set",
				id: favorite.id
			});
		} else {
			logger.info(`Unable to save favorite with id: ${favorite.id} to custom storage`);
		}
		return success;
	}
	logger.warn(`There has been a request to save a favorite but no endpoint with the 
    id: ${FAVORITE_ENDPOINT_ID_SET} is listed in your endpoint configuration.`);
	return false;
}

/**
 * Lets you delete a favorite.
 * @param id the id of the favorite entry you wish to delete
 * @returns boolean was it a successful delete
 */
export async function deleteSavedFavorite(id: string): Promise<boolean> {
	if (isEmpty(id)) {
		logger.warn("No id was passed for the favorite to delete so we are unable to delete it.");
		return false;
	}
	if (endpoints.hasEndpoint(FAVORITE_ENDPOINT_ID_REMOVE)) {
		const success = await endpoints.action<EndpointFavoriteRemoveRequest>(FAVORITE_ENDPOINT_ID_REMOVE, {
			id,
			platform: fin.me.identity.uuid
		});
		if (success) {
			logger.info(`Saved favorite with id: ${id} was deleted from custom storage`);
			const platform = getCurrentSync();
			await fireLifecycleEvent(platform, "favorite-changed", {
				action: "delete",
				id
			});
		} else {
			logger.info(`Unable to delete favorite with id: ${id} from custom storage`);
		}
		return success;
	}
	logger.warn(`There has been a request to delete a favorite but no endpoint with the 
    id: ${FAVORITE_ENDPOINT_ID_REMOVE} is listed in your endpoint configuration.`);
	return false;
}

/**
 * Gets information related to the favorites such as the types enabled and whether the provider is enabled.
 * @returns An info object with the details that can be used to help build support for favorites.
 */
export function getInfo(): FavoriteInfo {
	if (isEmpty(favoriteOptions)) {
		logger.warn("The options for favorites has not been set yet.");
		return {
			isEnabled: false
		};
	}
	return {
		isEnabled: isInitialized,
		favoriteIcon: favoriteOptions?.favoriteIcon,
		unfavoriteIcon: favoriteOptions?.unfavoriteIcon,
		command: favoriteOptions?.favoriteCommand,
		enabledTypes: favoriteOptions?.supportedFavoriteTypes
	};
}
