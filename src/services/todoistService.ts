import { autoinject, Aurelia } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import * as moment from 'moment';
import { Project, Item, Sync } from '../infrastructure/todoist';

@autoinject
export class TodoistService {
    private api: any;

    //TODO: Use Aurelia API for this and the Rest API https://developer.todoist.com/rest/v8/#get-tasks

    constructor(private container: Container) {
        this.api = this.container.get(TodoistAPI);
        console.log(this.api);
    }

    async getFilters() {
        await this.api.sync();
        return this.api.api.state.filters;
    }

    async isPremium(): Promise<boolean> {
        return this.api.get_user().is_premium;
    }

    async getStats(): Promise<any> {
        console.log(await this.api.completed.get_stats());
        return this.api.completed.get_stats();
    }

    async getTasks(filter: any = null): Promise<any[]> {
        await this.api.sync();
        const tasks = this.api.state.items;

        return tasks.map((item: Item) => {
            return { id: item.id, content: item.content, date_string: item.date_string, due_date_utc: item.due_date_utc, checked: item.checked };
        });
    }

    async completeTask(id: number) {
        await this.api.sync();
        const item = this.api.state.items.find((task: any) => task.id === id);
        if(item.date_string) {
            this.api.items.update_date_complete(item.id);
        } else {
            item.complete();
        }
        const response = await this.api.commit();
        console.log(response);
        return response.items.map((item: Item) => {
            return { id: item.id, content: item.content, date_string: item.date_string, due_date_utc: item.due_date_utc, checked: item.checked };
        });
    }

    async uncompleteTask(id: number) {
        //TODO
    }

    async getUser(): Promise<any> {
        await this.api.sync();
        return this.api.state.user;
    }
}