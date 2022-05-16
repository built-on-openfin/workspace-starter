export class PlatformStorage {
    
    storageKey:string; 

    constructor (storageId:string, private storageTypeName:string){
        this.storageKey = fin.me.identity.uuid.toLowerCase().replaceAll(" ", "") + "-" + storageId;
    }

    async getFromStorage<T>(id:string):Promise<T> {
        if(id === undefined) {
            console.error(`No id was specified for getting a ${this.storageTypeName} entry.`);
            return null;
        } else {
            let store = await this.getAllStoredEntries<T>();
            let savedEntry = store[id];
            if(savedEntry === undefined || savedEntry === null) {
                console.error(`No ${this.storageTypeName} entry was found for id ${id}.`);
                return null;
            }
            return savedEntry;
        }
    }
    
    async saveToStorage<T>(id:string, entry:T) {
        if(entry == undefined) {
            console.error(`You need to provide a id for the ${this.storageTypeName} entry you wish to save.`);
        } else {
            let store = await this.getAllStoredEntries<T>();
    
            store[id] = entry;
    
            localStorage.setItem(this.storageKey, JSON.stringify(store));
        }
    }
    
    async getAllStoredEntries<T>() : Promise<{ [key:string]: T }>{
        let store = localStorage.getItem(this.storageKey);
        if(store === null) {
            console.log(`Storage has no ${this.storageTypeName} entries.`);
            return {};
        }
    
        return JSON.parse(store);
    }
    
    async clearStorageEntry(id:string) {
        if(id === undefined) {
           console.error(`An id to clear the saved ${this.storageTypeName} was not provided.`);
        } else {
            let store = await this.getAllStoredEntries();
            let entry = store[id];
    
            if(entry !== undefined) {
                delete store[id];
                localStorage.setItem(this.storageKey, JSON.stringify(store));
            } else {
                console.error(`You tried to delete a non-existent ${this.storageTypeName} with id ${id}`);
            }
        }
    }
}