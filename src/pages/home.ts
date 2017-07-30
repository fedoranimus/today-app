import { autoinject, Aurelia, bindable } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoService } from '../services/todoService';
import { User, IProjectLocation } from '../services/user';
import { Project } from '../infrastructure/todoist';

@autoinject
export class Home {
    keyInput: string;
    
    tasks: any[];
    karma: any;
    isPremium: boolean = false;
    @bindable activeProject: Project | null = null;
    projects: Project[];

    constructor(private aurelia: Aurelia, private todoService: TodoService, private user: User) {
        this.init();
    }

    private async init() {
        console.log(await this.todoService.sync());
        this.projects = await this.todoService.getProjects();
        this.activeProject = this.user.activeProject;
        console.log(`Active Project: ${this.activeProject}`);
        if(this.activeProject)
            this.tasks = await this.todoService.getProjectTasks(this.activeProject.id);
        else 
            this.tasks = await this.todoService.getProjectTasks();

        console.log(this.tasks);     
    }

    async activeProjectChanged() {
        if(this.activeProject)
            this.tasks = await this.todoService.getProjectTasks(this.activeProject.id);
    }

    get hasActiveProject(): boolean {
        return this.activeProject !== null;
    }
}