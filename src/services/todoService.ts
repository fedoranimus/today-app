import { autoinject, Aurelia } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import { Storage } from './storage';
import * as moment from 'moment';

@autoinject
export class TodoService {
    private todoist: any;
    private token: string;
    

    constructor(private container: Container, private storage: Storage) {
        this.todoist = this.container.get(TodoistAPI);
    }

    // private async init() {
    //     const items = await this.storage.get("todoistToken"); //TODO Validate the key against Todoist

    // }

    async isPremium(): Promise<boolean> {
        return this.todoist.get_user().is_premium;
    }

    async sync(): Promise<any> {
        return this.todoist.sync();
    }

    async getStats(): Promise<any> {
        console.log(await this.todoist.completed.get_stats());
        return this.todoist.completed.get_stats();
    }

    async getTodayTasks(): Promise<any> {
        const sync = await this.todoist.sync();
        const items = sync.items.filter( (item: any) => {
            return moment(item.due_date_utc).toDate().toDateString() == moment().toDate().toDateString();
        });

        return items;
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