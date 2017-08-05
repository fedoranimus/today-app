import { autoinject, Aurelia } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import { Storage } from './storage';
import * as moment from 'moment';
import { Project, Item, Sync } from '../infrastructure/todoist';
import { User, IProjectLocation, IProject } from './user';

@autoinject
export class TodoService {
    private todoist: any;
    private sync: Sync;

    constructor(private container: Container, private storage: Storage, private user: User) {
        this.todoist = this.container.get(TodoistAPI);
        this.sync = this.todoist.sync();
        console.log(this.todoist);
    }

    async getSync() { //for development
        return await this.sync;
    }

    async getFilters() {
        await this.todoist.sync();
        return this.todoist.api.state.filters;
    }

    async isPremium(): Promise<boolean> {
        return this.todoist.get_user().is_premium;
    }

    async getStats(): Promise<any> {
        console.log(await this.todoist.completed.get_stats());
        return this.todoist.completed.get_stats();
    }

    async getTasks(): Promise<Item[]> {
        await this.todoist.sync();
        if(this.user.activeFilter) {
            return []; //TODO
        } else {
            return this.todoist.state.items.filter( (item: any) => {
                return moment().isSame(item.due_date_utc, 'day') && item.checked === 0;
            });
        }
    }

    async completeTask(id: number) {
        await this.todoist.sync();
        const item = this.todoist.state.items.find((task: any) => task.id === id);
        item.close();
        const response = await this.todoist.commit();
        console.log(response);
        return response;
    }

    async getUser(): Promise<any> {
        await this.todoist.sync();
        return this.todoist.state.user;
    }
}