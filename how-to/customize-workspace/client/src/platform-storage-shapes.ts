export interface IPlatformStorage<T> {
	/**
	 * Get items that are stored
	 * @param id The identity of the stored object
	 * @returns The stored type or null if nothing was found.
	 */
	get(id: string): Promise<T>;

	/**
	 * Save an item against storage
	 * @param id The identity of the item to store or update
	 * @returns Nothing.
	 */
	set(id: string, entry: T): Promise<void>;

	/**
	 * Get all the saved entries
	 * @param query Optional parameter that can be used to filter the result set
	 * @returns All available entries.
	 */
	getAll(query?: string): Promise<T[]>;

	/**
	 * Delete an entry from storage
	 * @param id The identity of the item to clear
	 * @returns Nothing.
	 */
	remove(id: string): Promise<void>;
}

export const DEFAULT_STORAGE_KEYS = {
	Page: "page",
	PageBounds: "page-bounds",
	Workspace: "workspace"
};
