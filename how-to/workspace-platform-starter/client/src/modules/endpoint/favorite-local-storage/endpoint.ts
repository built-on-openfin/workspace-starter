import type { Endpoint, EndpointDefinition } from "workspace-platform-starter/shapes/endpoint-shapes";
import type {
	EndpointFavoriteEntry,
	EndpointFavoriteGetRequest,
	EndpointFavoriteGetResponse,
	EndpointFavoriteListRequest,
	EndpointFavoriteListResponse,
	EndpointFavoriteRemoveRequest,
	EndpointFavoriteSetRequest
} from "workspace-platform-starter/shapes/favorite-shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * Implementation for the favorite local storage endpoint provider.
 */
export class FavoriteLocalStorageProvider implements Endpoint {
	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * The id to use for storing the favorites.
	 * @internal
	 */
	private readonly _favoritesKey: string;

	/**
	 * Sets up the favorite endpoint.
	 */
	constructor() {
		this._favoritesKey = `${fin.me.identity.uuid}-favorites`;
	}

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<unknown>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._logger = loggerCreator("FavoriteLocalStorageProvider");
		this._logger.info("Initializing");
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Handle an action sent to the endpoint.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns True if processed.
	 */
	public async action(
		endpointDefinition: EndpointDefinition,
		request?: EndpointFavoriteSetRequest | EndpointFavoriteRemoveRequest
	): Promise<boolean> {
		if (endpointDefinition.type === "module" && !isEmpty(request)) {
			if ("payload" in request) {
				return this.requestResponseSetFavorite(request);
			}
			return this.requestResponseRemoveFavorite(request);
		}
		throw new Error(
			`This endpoint module only supports the type 'module' and being passed a request. The following endpoint type was specified: ${
				endpointDefinition.type
			} and request passed: ${!isEmpty(request)}`
		);
	}

	/**
	 * Handles requests for getting all favorites, a list of favorites of a specific type or a single favorite by id.
	 * @param endpointDefinition The definition of the endpoint.
	 * @param request The request to process.
	 * @returns The response to the request, or null of not handled.
	 */
	public async requestResponse(
		endpointDefinition: EndpointDefinition,
		request?: EndpointFavoriteListRequest | EndpointFavoriteGetRequest
	): Promise<EndpointFavoriteListResponse | EndpointFavoriteGetResponse | undefined> {
		if (endpointDefinition.type === "module" && !isEmpty(request)) {
			if ("id" in request) {
				return this.requestResponseGetFavorite(request);
			}
			return this.requestResponseFavorites(request);
		}
		throw new Error(
			`This endpoint module only supports the type 'module' and being passed a request. The following endpoint type was specified: ${
				endpointDefinition.type
			} and request passed: ${!isEmpty(request)}`
		);
	}

	/**
	 * Handles the request for list request.
	 * @param request the request for favorites
	 * @returns the list of favorites
	 */
	private async requestResponseFavorites(
		request: EndpointFavoriteListRequest
	): Promise<EndpointFavoriteListResponse> {
		const favorites = this.getFavorites();
		if (isEmpty(request.favoriteType)) {
			const filteredEntries = favorites.filter((entry) => entry.payload.type === request.favoriteType);
			return { entries: filteredEntries };
		}
		return { entries: favorites };
	}

	/**
	 * Handles the request for a favorite.
	 * @param request the request for a favorite
	 * @returns the favorite
	 */
	private async requestResponseGetFavorite(
		request: EndpointFavoriteGetRequest
	): Promise<EndpointFavoriteGetResponse | undefined> {
		const favorites = this.getFavorites();
		if (!isEmpty(request.id)) {
			const matchedEntry = favorites.find((entry) => entry.payload.id === request.id);
			return matchedEntry;
		}
		return undefined;
	}

	/**
	 * Handles the request for a favorite.
	 * @param request the request for a favorite
	 * @returns the favorite
	 */
	private async requestResponseSetFavorite(request: EndpointFavoriteSetRequest): Promise<boolean> {
		const favorites = this.getFavorites();
		if (!isEmpty(request.id)) {
			const existingEntryIndex = favorites.findIndex((entry) => entry.payload.id === request.id);
			const entryToSave = { metaData: request.metaData, payload: request.payload };
			if (existingEntryIndex === -1) {
				favorites.push(entryToSave);
			} else {
				favorites[existingEntryIndex] = entryToSave;
			}
			this.saveFavorites(favorites);
			return true;
		}
		return false;
	}

	/**
	 * Handles the request for the deletion of a favorite.
	 * @param request the request for a favorite to be deleted
	 * @returns whether or not the request was successful
	 */
	private async requestResponseRemoveFavorite(request: EndpointFavoriteRemoveRequest): Promise<boolean> {
		const favorites = this.getFavorites();
		if (!isEmpty(request.id)) {
			const existingEntryIndex = favorites.findIndex((entry) => entry.payload.id === request.id);
			if (existingEntryIndex === -1) {
				return false;
			}
			favorites.splice(existingEntryIndex, 1);
			this.saveFavorites(favorites);
			return true;
		}
		return false;
	}

	/**
	 * Return a list of saved favorites.
	 * @returns The saved list of favorites
	 */
	private getFavorites(): EndpointFavoriteEntry[] {
		const favorites = localStorage.getItem(this._favoritesKey);

		if (isEmpty(favorites)) {
			return [];
		}

		const favoriteEntries: EndpointFavoriteEntry[] = JSON.parse(favorites);
		return favoriteEntries;
	}

	/**
	 * Save the favorites.
	 * @param favorites to save
	 */
	private saveFavorites(favorites: EndpointFavoriteEntry[]): void {
		localStorage.setItem(this._favoritesKey, JSON.stringify(favorites));
	}
}
