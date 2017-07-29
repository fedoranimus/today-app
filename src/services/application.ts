import { autoinject, Aurelia } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import { Storage } from './storage';

@autoinject
export class Application {
    private todoist: any;
    private token: string;

    constructor(private container: Container, private storage: Storage) {
        this.todoist = this.container.get(TodoistAPI);
    }

    // private async init() {
    //     const items = await this.storage.get("todoistToken"); //TODO Validate the key against Todoist

    // }

    async getTodayTasks(): Promise<any> {
        return this.todoist.sync;
    }

    async getStats(): Promise<any> {
        console.log(await this.todoist.completed.get_stats());
        return this.todoist.completed.get_stats();
    }

    get apiToken() {
        return this.token;
    }

    set apiToken(apiToken: string) {
        this.token = apiToken;
        this.container.unregister(TodoistAPI);
        this.container.registerInstance(TodoistAPI, new TodoistAPI(this.token));
        this.todoist = this.container.get(TodoistAPI);
    }
}