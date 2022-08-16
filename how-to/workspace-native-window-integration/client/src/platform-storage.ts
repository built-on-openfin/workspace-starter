export class PlatformStorage {
	private readonly _storageTypeName: string;

	private readonly _storageKey: string;

	constructor(storageId: string, storageType: string) {
		this._storageTypeName = storageType;
		this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
	}

	public async getFromStorage<T>(id: string): Promise<T> {
		if (id === undefined) {
			console.error(`No id was specified for getting a ${this._storageTypeName} entry.`);
			return null;
		}
		const store = await this.getAllStoredEntries<T>();
		const savedEntry = store[id];
		if (savedEntry === undefined || savedEntry === null) {
			console.error(`No ${this._storageTypeName} entry was found for id ${id}.`);
			return null;
		}
		return savedEntry;
	}

	public async saveToStorage<T>(id: string, entry: T) {
		if (entry === undefined) {
			console.error(`You need to provide a id for the ${this._storageTypeName} entry you wish to save.`);
		} else {
			const store = await this.getAllStoredEntries<T>();

			store[id] = entry;

			localStorage.setItem(this._storageKey, JSON.stringify(store));
		}
	}

	public async getAllStoredEntries<T>(): Promise<{ [key: string]: T }> {
		const store = localStorage.getItem(this._storageKey);
		if (store === null) {
			console.log(`Storage has no ${this._storageTypeName} entries.`);
			return {};
		}

		return JSON.parse(store) as { [key: string]: T };
	}

	public async clearStorageEntry(id: string) {
		if (id === undefined) {
			console.error(`An id to clear the saved ${this._storageTypeName} was not provided.`);
		} else {
			const store = await this.getAllStoredEntries();
			const entry = store[id];

			if (entry !== undefined) {
				delete store[id];
				localStorage.setItem(this._storageKey, JSON.stringify(store));
			} else {
				console.error(`You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
			}
		}
	}
}
