import { autoinject, Aurelia } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import { Storage } from './storage';
import * as moment from 'moment';
import { Project } from '../infrastructure/todoist';
import { User, IActiveProjectLocation, IProjectLocation, IProject } from './user';

@autoinject
export class TodoService {
    private todoist: any;
    
    constructor(private container: Container, private storage: Storage, private user: User) {
        this.todoist = this.container.get(TodoistAPI);
        console.log(this.todoist);
    }

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

    async getTasks(activeProjectLocation: IActiveProjectLocation | null = null): Promise<any> {
        const sync = await this.todoist.sync();
        console.log(activeProjectLocation);
        if(activeProjectLocation) {
            return sync.items.filter((item: any) => {
                return item.project_id === activeProjectLocation.projectLocation.projects.find(y => y.projectId == item.project_id);
            });
        } else {
            return sync.items;
        }
    }

    async getProjects(): Promise<Project[]> {
        const sync = await this.todoist.sync();
        return sync.projects;
    }

    async getUser(): Promise<any> {
        const sync = await this.todoist.sync();
        return sync.user;
    }
}