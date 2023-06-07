import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { PlatformStorage } from "workspace-platform-starter/shapes/platform-storage-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

export class PlatformLocalStorage<T = unknown> implements PlatformStorage<T> {
	private readonly _storageTypeName: string;

	private readonly _storageKey: string;

	private readonly _logger: Logger;

	constructor(storageId: string, storageType: string, loggerCreator: LoggerCreator) {
		this._storageTypeName = storageType;
		this._storageKey = `${fin.me.identity.uuid.toLowerCase().replaceAll(" ", "")}-${storageId}`;
		this._logger = loggerCreator("PlatformLocalStorage");
	}

	public async get(id: string): Promise<T> {
		if (isEmpty(id)) {
			this._logger.error(`No id was specified for getting a ${this._storageTypeName} entry`);
			return null;
		}
		const store = this.getCompleteStore();
		const savedEntry = store[id];
		if (isEmpty(savedEntry)) {
			this._logger.warn(`No ${this._storageTypeName} entry was found for id ${id}`);
			return null;
		}
		return savedEntry;
	}

	public async set(id: string, entry: T): Promise<void> {
		if (isEmpty(id)) {
			this._logger.error(`You need to provide a id for the ${this._storageTypeName} entry you wish to save`);
		} else {
			const store = this.getCompleteStore();

			store[id] = entry;

			this.setCompleteStore(store);
		}
	}

	public async getAll(query?: string): Promise<{ [key: string]: T }> {
		const store = this.getCompleteStore();
		if (Object.keys(store).length === 0) {
			this._logger.info(`Storage has no ${this._storageTypeName} entries`);
			return {};
		}

		return store;
	}

	public async remove(id: string): Promise<void> {
		if (isEmpty(id)) {
			this._logger.error(`An id to clear the saved ${this._storageTypeName} was not provided`);
		} else {
			const store = this.getCompleteStore();
			const entry = store[id];

			if (!isEmpty(entry)) {
				delete store[id];
				this.setCompleteStore(store);
			} else {
				this._logger.error(`You tried to delete a non-existent ${this._storageTypeName} with id ${id}`);
			}
		}
	}

	private getCompleteStore() {
		const store = localStorage.getItem(this._storageKey);
		if (isEmpty(store)) {
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
