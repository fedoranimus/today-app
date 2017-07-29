export class Storage {

    constructor() {

    }

    set(items: Object[] | Object) {
        return this.asPromised((callback: any) => {
            chrome.storage.sync.set(items, callback);
        });
    }

    get(keys: string | Object | string[] | null) {
        return this.asPromised((callback: any) => {
            chrome.storage.sync.get(keys, callback);
        });
    }

    remove(key: string) {
        return this.asPromised((callback: any) => {
            chrome.storage.sync.remove(key, callback);
        });
    }

    private asPromised(block: Function) {
        return new Promise((resolve, reject) => {
                block((...results: any[]) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.extension.lastError);
                    } else {
                        resolve(...results);
                    }
                });
            });
    }
}