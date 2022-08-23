import type { Logger, LoggerCreator } from "../../../logger-shapes";
import type { IPlatformStorage } from "./platform-storage-shapes";

export class PlatformLocalStorage<T> implements IPlatformStorage<T> {
	private readonly _storageTypeName: string;

	private readonly _storageKey: string;

	private readonly _logger: Logger;

	constructor(storageId: string, storageType: string, loggerCreator: LoggerCreator) {
		this._storageTypeName = storageType;
		this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
		this._logger = loggerCreator("PlatformLocalStorage");
	}

	public async get(id: string): Promise<T> {
		if (id === undefined) {
			this._logger.error(`No id was specified for getting a ${this._storageTypeName} entry`);
			return null;
		}
		const store = this.getCompleteStore();
		const savedEntry = store[id];
		if (savedEntry === undefined || savedEntry === null) {
			this._logger.warn(`No ${this._storageTypeName} entry was found for id ${id}`);
			return null;
		}
		return savedEntry;
	}

	public async set(id: string, entry: T): Promise<void> {
		if (id === undefined) {
			this._logger.error(`You need to provide a id for the ${this._storageTypeName} entry you wish to save`);
		} else {
			const store = this.getCompleteStore();

			store[id] = entry;

			this.setCompleteStore(store);
		}
	}

	public async getAll(query?: string): Promise<T[]> {
		const store = this.getCompleteStore();
		if (Object.keys(store).length === 0) {
			this._logger.info(`Storage has no ${this._storageTypeName} entries`);
			return [];
		}

		return Object.values(store);
	}

	public async remove(id: string): Promise<void> {
		if (id === undefined) {
			this._logger.error(`An id to clear the saved ${this._storageTypeName} was not provided`);
		} else {
			const store = this.getCompleteStore();
			const entry = store[id];

			if (entry !== undefined) {
				delete store[id];
				this.setCompleteStore(store);
			} else {
				this._logger.error(`You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
			}
		}
	}

	private getCompleteStore() {
		const store = localStorage.getItem(this._storageKey);
		if (store === null) {
			this._logger.info(`Storage has no ${this._storageTypeName} entries. Creating store`);
			this.setCompleteStore({});
			return {};
		}

		return JSON.parse(store) as { [key: string]: T };
	}

	private setCompleteStore(store: { [key: string]: T }) {
		localStorage.setItem(this._storageKey, JSON.stringify(store));
	}
}
