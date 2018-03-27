import { autoinject } from 'aurelia-framework';
import { Task } from '../models/todoist';
import { ApiStore } from '../apiStore';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class TodoistService {
    private endpoint: string = 'https://beta.todoist.com/API/v8/';

    constructor(private apiStore: ApiStore, private httpClient: HttpClient) {
    }

    async getFilters(): Promise<any[]> {
        const token = await this.apiStore.apiToken;
        const uri = `${this.endpoint}filters?token=${token}`;
        return this.httpClient.fetch(uri).then(response => response.json());
    }

    async getTasks(filter: any = null): Promise<Task[]> {
        const token = await this.apiStore.apiToken;
        const uri = `${this.endpoint}tasks?token=${token}`;
        return this.httpClient.fetch(uri).then(response => response.json());
    }

    async closeTask(id: number) {
        const token = await this.apiStore.apiToken; 
        const uri = `${this.endpoint}tasks/${id}/close?token=${token}`;
        return this.httpClient.fetch(uri, { method: "POST" });
    }

    async reopenTask(id: number) {
        const token = await this.apiStore.apiToken;  
        const uri = `${this.endpoint}tasks/${id}/reopen?token=${token}`;
        return this.httpClient.fetch(uri, { method: "POST" });
    }

    async createTask(content: string) {
        const token = await this.apiStore.apiToken;
        const uri = `${this.endpoint}tasks?token=${token}`;
        const body = { content: content, due_datetime: new Date().toISOString() };
        return this.httpClient.fetch(uri, { method: "POST", body: JSON.stringify(body) });
    }
}