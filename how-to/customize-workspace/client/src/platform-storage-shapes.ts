export interface IPlatformStorage {
	/**
	 * Get items that are stored
	 * @param id The identity of the stored object
	 * @returns The stored type or null if nothing was found.
	 */
	getFromStorage<T>(id: string): Promise<T>;

	/**
	 * Save an item against storage
	 * @param id The identity of the item to store or update
	 * @returns Nothing.
	 */
	saveToStorage<T>(id: string, entry: T): Promise<void>;

	/**
	 * Get all the saved entries
	 * @returns All available entries.
	 */
	getAllStoredEntries<T>(query?: string): Promise<T[]>;

	/**
	 * Delete an entry from storage
	 * @param id The identity of the item to clear
	 * @returns Nothing.
	 */
	deleteFromStorage(id: string): Promise<void>;
}

export const DEFAULT_STORAGE_KEYS = {
	Page: "page",
	PageBounds: "page-bounds",
	Workspace: "workspace"
};
