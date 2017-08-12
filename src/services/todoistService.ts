import { autoinject, Aurelia } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import * as moment from 'moment';
import { Task } from '../models/todoist';
import { Config, Rest } from 'aurelia-api';
import { ApiStore } from '../apiStore';

@autoinject
export class TodoistService {
    private api: Rest;

    constructor(private config: Config, private apiStore: ApiStore) {
        this.api = config.getEndpoint('todoist');
    }

    async getFilters(): Promise<any[]> {
        const token = await this.apiStore.apiToken;
        return this.api.find(`filters?token=${token}`);
    }

    async getTasks(filter: any = null): Promise<Task[]> {
        const token = await this.apiStore.apiToken;
        return this.api.find(`tasks?token=${token}`);
    }

    async closeTask(id: number) {
        const token = await this.apiStore.apiToken; 
        return this.api.post(`tasks/${id}/close?token=${token}`);
    }

    async reopenTask(id: number) {
        const token = await this.apiStore.apiToken;  
        return this.api.post(`tasks/${id}/reopen?token=${token}`);
    }
}