import { IPlatformStorage } from "./platform-storage-shapes";

export class PlatformStorage {
	private static readonly _storageImplementations = new Map<string, IPlatformStorage<unknown>>();

	private static readonly _storageRegister = new Map<
		string,
		(options?: unknown) => Promise<IPlatformStorage<unknown>>
	>();

	public static register(
		name: string,
		onStorageCreation: (options?: unknown) => Promise<IPlatformStorage<unknown>>
	) {
		if (this._storageRegister.has(name)) {
			console.error(`You have tried to register platform storage using a name that already exists`);
		} else {
			this._storageRegister.set(name, onStorageCreation);
			console.log(`The storage implementation ${name} has been registered`);
		}
	}

	public static isRegistered(name: string): boolean {
		return this._storageRegister.has(name);
	}

	public static deregister(name: string) {
		if (this._storageRegister.has(name)) {
			this._storageRegister.delete(name);
			console.log(`Removed storage implementation ${name} from register.`);
		}

		if (this._storageImplementations.has(name)) {
			console.warn(`The storage implementation ${name} has a registered instance which will not be cleared.`);
		}
	}

	public static async getStorage<T>(
		name: string,
		initializationOptions?: unknown
	): Promise<IPlatformStorage<T>> {
		if (this._storageImplementations.has(name)) {
			return this._storageImplementations.get(name) as IPlatformStorage<T>;
		} else if (this._storageRegister.has(name)) {
			const implementation = this._storageRegister.get(name);
			const instance = await implementation(initializationOptions);
			this._storageImplementations.set(name, instance);
			return instance as IPlatformStorage<T>;
		}
		console.error(`You have specified a storage implementation: ${name} that has not been registered`);
	}
}
