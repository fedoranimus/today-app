import { autoinject, Container } from 'aurelia-framework';
import { Storage } from './services/storage';
import TodoistAPI from 'todoist-js';

@autoinject
export class ApiStore {
    private _apiToken: string;

    constructor(private container: Container, private storage: Storage) {
        this.init();
    }

    private async init() {
        this.apiToken = await this.fetchToken();
    }

    get apiToken() {
        if(this._apiToken)
            return this._apiToken;
        else
            return (async() => await this.fetchToken())(); 
    }

    set apiToken(token: string|Promise<string>) {
        if(typeof token === 'string')
            this._apiToken = token;

        this.storage.set({ todoistToken: token });

        this.container.unregister(TodoistAPI);
        this.container.registerInstance(TodoistAPI, new TodoistAPI(token));
    }

    private async fetchToken(): Promise<string> {
        const settings = await this.storage.get("todoistToken");
        return (<any>settings)['todoistToken'];
    }
}