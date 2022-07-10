import { EndpointDefinition } from "../endpoint-shapes";
import { PlatformLocalStorage } from "./platform-local-storage";
import { IPlatformStorage } from "./platform-storage-shapes";

const storage: { [key: string]: IPlatformStorage<unknown> } = {};

function getStorage<T>(id: string): IPlatformStorage<T> {
    let localStorage: IPlatformStorage<T> = storage[id] as PlatformLocalStorage<T>;
    if (localStorage === undefined) {
        localStorage = new PlatformLocalStorage<T>(id, id);
        storage[id] = localStorage;
    }
    return localStorage;
}

export async function init(options: unknown): Promise<void> {
    console.log("Was passed the following options:", options);
}

export async function action<T>(endpointDefinition: EndpointDefinition, request?: T): Promise<boolean> {
    const options = endpointDefinition.options as { dataType: string; action: "remove" | "set" };
    const localStorage = getStorage<unknown>(options.dataType);

    if (options.action === "remove") {
        const id: string = typeof request === "string" ? request : (request as unknown as { id: string}).id;
        await localStorage.remove(id);
        return true;
    } else if (options.action === "set") {
        const itemToSave = request as unknown as { id: string; payload: unknown };
        await localStorage.set(itemToSave.id, itemToSave.payload);
        return true;
    }
    return false;
}

export async function requestResponse<T, R>(endpointDefinition: EndpointDefinition, request?: T): Promise<R | null> {
    const options = endpointDefinition.options as { dataType: string; action: "get" | "getAll" };
    const localStorage = getStorage<unknown>(options.dataType);

    if (options.action === "get") {
        const id: string = typeof request === "string" ? request : (request as unknown as { id: string}).id;
        return localStorage.get(id) as unknown as R;
    } else if (options.action === "getAll") {
        return { data: await localStorage.getAll() } as unknown as R;
    }
    return null;
}
