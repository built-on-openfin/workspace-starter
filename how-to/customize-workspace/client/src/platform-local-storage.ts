import { IPlatformStorage } from "./platform-storage-shapes";

export class PlatformLocalStorage implements IPlatformStorage {
	private readonly storageTypeName: string;

	private readonly storageKey: string;

	constructor(storageId: string, storageType: string) {
		this.storageTypeName = storageType;
		this.storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
	}

	public async getFromStorage<T>(id: string): Promise<T> {
		if (id === undefined) {
			console.error(`No id was specified for getting a ${this.storageTypeName} entry.`);
			return null;
		}
		const store = this.getCompleteStore<T>();
		const savedEntry = store[id];
		if (savedEntry === undefined || savedEntry === null) {
			console.error(`No ${this.storageTypeName} entry was found for id ${id}.`);
			return null;
		}
		return savedEntry;
	}

	public async saveToStorage<T>(id: string, entry: T) {
		if (entry === undefined) {
			console.error(`You need to provide a id for the ${this.storageTypeName} entry you wish to save.`);
		} else {
			const store = this.getCompleteStore<T>();

			store[id] = entry;

			this.setCompleteStore(store);
		}
	}

	public async getAllStoredEntries<T>(query?: string): Promise<T[]> {
		const store = this.getCompleteStore<T>();
		if (Object.keys(store).length === 0) {
			console.log(`Storage has no ${this.storageTypeName} entries.`);
			return [];
		}

		return Object.values(store);
	}

	public async deleteFromStorage(id: string) {
		if (id === undefined) {
			console.error(`An id to clear the saved ${this.storageTypeName} was not provided.`);
		} else {
			const store = this.getCompleteStore();
			const entry = store[id];

			if (entry !== undefined) {
				delete store[id];
				this.setCompleteStore(store);
			} else {
				console.error(`You tried to delete a non-existent ${this.storageTypeName} with id ${id}`);
			}
		}
	}

	private getCompleteStore<T>() {
		const store = localStorage.getItem(this.storageKey);
		if (store === null) {
			console.log(`Storage has no ${this.storageTypeName} entries. Creating store.`);
			this.setCompleteStore({});
			return {};
		}

		return JSON.parse(store) as { [key: string]: T };
	}

	private setCompleteStore<T>(store: { [key: string]: T }) {
		localStorage.setItem(this.storageKey, JSON.stringify(store));
	}
}
