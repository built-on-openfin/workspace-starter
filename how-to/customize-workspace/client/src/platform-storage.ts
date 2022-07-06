import { IPlatformStorage } from "./platform-storage-shapes";

export class PlatformStorage {
	private static readonly storageImplementations = new Map<string, IPlatformStorage>();

	private static readonly storageRegister = new Map<
		string,
		(options?: unknown) => Promise<IPlatformStorage>
	>();

	public static register(name: string, onStorageCreation: (options?: unknown) => Promise<IPlatformStorage>) {
		if (this.storageRegister.has(name)) {
			console.error(`You have tried to register platform storage using a name that already exists`);
		} else {
			this.storageRegister.set(name, onStorageCreation);
			console.log(`The storage implementation ${name} has been registered`);
		}
	}

	public static isRegistered(name: string): boolean {
		return this.storageRegister.has(name);
	}

	public static deregister(name: string) {
		if (this.storageRegister.has(name)) {
			this.storageRegister.delete(name);
			console.log(`Removed storage implementation ${name} from register.`);
		}

		if (this.storageImplementations.has(name)) {
			console.warn(`The storage implementation ${name} has a registered instance which will not be cleared.`);
		}
	}

	public static async getStorage(name: string, initializationOptions?: unknown): Promise<IPlatformStorage> {
		if (this.storageImplementations.has(name)) {
			return this.storageImplementations.get(name);
		} else if (this.storageRegister.has(name)) {
			const implementation = this.storageRegister.get(name);
			const instance = await implementation(initializationOptions);
			this.storageImplementations.set(name, instance);
			return instance;
		}
		console.error(`You have specified a storage implementation: ${name}  that has not been registered`);
	}
}
