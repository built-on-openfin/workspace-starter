import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { PlatformStorage } from "workspace-platform-starter/shapes/platform-storage-shapes";
import { isEmpty } from "../../../framework/utils";

/**
 * Implement platform storage using local storage.
 */
export class PlatformLocalStorage<T = unknown> implements PlatformStorage<T> {
	private readonly _storageTypeName: string;

	private readonly _storageKey: string;

	private readonly _logger?: Logger;

	/**
	 * Create a new instance of PlatformLocalStorage.
	 * @param storageId The id of the storage.
	 * @param storageType The storage tye=pe.
	 * @param loggerCreator The creator for the logger.
	 */
	constructor(storageId: string, storageType: string, loggerCreator?: LoggerCreator) {
		this._storageTypeName = storageType;
		this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
		if (loggerCreator) {
			this._logger = loggerCreator("PlatformLocalStorage");
		}
	}

	/**
	 * Get items that are stored.
	 * @param id The identity of the stored object
	 * @returns The stored type or null if nothing was found.
	 */
	public async get(id: string): Promise<T | undefined> {
		if (isEmpty(id)) {
			this._logger?.error(`No id was specified for getting a ${this._storageTypeName} entry`);
			return;
		}
		const store = this.getCompleteStore();
		const savedEntry = store[id];
		if (isEmpty(savedEntry)) {
			this._logger?.warn(`No ${this._storageTypeName} entry was found for id ${id}`);
			return;
		}
		return savedEntry;
	}

	/**
	 * Save an item against storage.
	 * @param id The identity of the item to store or update
	 * @param entry The entry to store.
	 * @returns Nothing.
	 */
	public async set(id: string, entry: T): Promise<void> {
		if (isEmpty(id)) {
			this._logger?.error(`You need to provide a id for the ${this._storageTypeName} entry you wish to save`);
		} else {
			const store = this.getCompleteStore();

			store[id] = entry;

			this.setCompleteStore(store);
		}
	}

	/**
	 * Get all the saved entries.
	 * @param query Optional parameter that can be used to filter the result set
	 * @returns All available entries.
	 */
	public async getAll(query?: string): Promise<{ [key: string]: T }> {
		const store = this.getCompleteStore();
		if (Object.keys(store).length === 0) {
			this._logger?.info(`Storage has no ${this._storageTypeName} entries`);
			return {};
		}

		return store;
	}

	/**
	 * Delete an entry from storage.
	 * @param id The identity of the item to clear
	 * @returns Nothing.
	 */
	public async remove(id: string): Promise<void> {
		if (isEmpty(id)) {
			this._logger?.error(`An id to clear the saved ${this._storageTypeName} was not provided`);
		} else {
			const store = this.getCompleteStore();
			const entry = store[id];

			if (!isEmpty(entry)) {
				delete store[id];
				this.setCompleteStore(store);
			} else {
				this._logger?.error(`You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
			}
		}
	}

	/**
	 * Get the complete store.
	 * @returns The complete store.
	 */
	private getCompleteStore(): { [key: string]: T } {
		const store = localStorage.getItem(this._storageKey);
		if (isEmpty(store)) {
			this._logger?.info(`Storage has no ${this._storageTypeName} entries. Creating store`);
			this.setCompleteStore({});
			return {};
		}

		return JSON.parse(store) as { [key: string]: T };
	}

	/**
	 * Set the complete store.
	 * @param store The store to save.
	 */
	private setCompleteStore(store: { [key: string]: T }): void {
		localStorage.setItem(this._storageKey, JSON.stringify(store));
	}
}
