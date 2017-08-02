import { autoinject, Aurelia, bindable } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoService } from '../services/todoService';
import { User, IProjectLocation } from '../services/user';
import { Filter, Item } from '../infrastructure/todoist';

@autoinject
export class Home {
    keyInput: string;
    
    tasks: Item[];
    karma: any;
    isPremium: boolean = false;
    //@bindable activeProject: Project | null = null;
    @bindable activeFilter: Filter | null = null;
    //projects: Project[];
    @bindable firstName: string = "user";

    constructor(private aurelia: Aurelia, private todoService: TodoService, private user: User) {
        //this.init();
    }

    async bind() {
        const user = await this.todoService.getUser();
        this.firstName = user.full_name.split(" ")[0];

        this.tasks = await this.todoService.getTasks();

        console.log(await this.todoService.getSync());
    }


    private async init() {
        
        //this.firstName = user.full_name.split(" ")[0];
        //console.log(this.firstName);
        //this.projects = await this.todoService.getProjects();
        //this.activeProject = this.user.activeProject;
        //console.log(`Active Project: ${this.activeProject}`);
        // if(this.activeProject)
        //     this.tasks = await this.todoService.getProjectTasks(this.activeProject.id);
        // else 
        //     this.tasks = await this.todoService.getProjectTasks();

        //console.log(this.tasks);     
    }

    // async activeProjectChanged() {
    //     if(this.activeProject)
    //         this.tasks = await this.todoService.getProjectTasks(this.activeProject.id);
    // }

    // get hasActiveProject(): boolean {
    //     return this.activeProject !== null;
    // }
}