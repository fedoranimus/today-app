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
        return await this.sync.filters;
    }

    async isPremium(): Promise<boolean> {
        return this.todoist.get_user().is_premium;
    }

    async getStats(): Promise<any> {
        console.log(await this.todoist.completed.get_stats());
        return this.todoist.completed.get_stats();
    }

    // async getTodayTasks(): Promise<any> {
    //     //const sync = await this.todoist.sync();
    //     const items = await this.sync.items.filter( (item: any) => {
    //         return moment(item.due_date_utc).toDate().toDateString() == moment().toDate().toDateString();
    //     });

    //     return items;
    // }

    // async getProjectTasks(projectId: number | null = null): Promise<Item[]> {
    //     const sync = await this.todoist.sync();
    //     let items = <Item[]>sync.items;
    //     if(projectId) {
    //         items = items.filter((item) => {
    //             return item.project_id === projectId;
    //         });
    //     }

    //     return items.sort((a, b) => {
    //         return moment(b.due_date_utc).toDate().getDate() - moment(a.due_date_utc).toDate().getDate();
    //     });
    // }

    async getTasks(): Promise<Item[]> {
        //const sync = await this.todoist.sync();
        if(this.user.activeFilter) {
            return [];
        } else {
            const sync = await this.todoist.sync();
            console.log(sync);
            return await sync.items.filter( (item: any) => {
                return moment(item.due_date_utc).toDate().toDateString() == moment().toDate().toDateString();
            });
        }
        // return this.sync.items;
        // console.log(activeProjectLocation);
        // if(activeProjectLocation) {
        //     return sync.items.filter((item: any) => {
        //         return item.project_id === activeProjectLocation.projects.find(y => y.projectId == item.project_id);
        //     });
        // } else {
        //     return sync.items;
        // }
    }

    // async getProjects(): Promise<Project[]> {
    //     const sync = await this.todoist.sync();
    //     return sync.projects;
    // }

    async getUser(): Promise<any> {
        const sync = await this.todoist.sync();
        return sync.user;
    }
}