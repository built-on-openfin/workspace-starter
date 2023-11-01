/**
 * Interface for a storage provider.
 */
export interface PlatformStorage<T> {
	/**
	 * Get items that are stored.
	 * @param id The identity of the stored object
	 * @returns The stored type or null if nothing was found.
	 */
	get(id: string): Promise<T | undefined>;
	/**
	 * Save an item against storage.
	 * @param id The identity of the item to store or update
	 * @param entry The entry to store.
	 * @returns Nothing.
	 */
	set(id: string, entry: T): Promise<void>;
	/**
	 * Get all the saved entries.
	 * @param query Optional parameter that can be used to filter the result set
	 * @returns All available entries.
	 */
	getAll(query?: string): Promise<{
		[key: string]: T;
	}>;
	/**
	 * Delete an entry from storage.
	 * @param id The identity of the item to clear
	 * @returns Nothing.
	 */
	remove(id: string): Promise<void>;
}
