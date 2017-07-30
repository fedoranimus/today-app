import { autoinject, Aurelia } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoService } from '../services/todoService';
import { User } from '../services/user';

@autoinject
export class Home {
    keyInput: string;
    
    tasks: any[];
    karma: any;
    isPremium: boolean = false;
    activeProject: { projectId: number, projectName: string, distance: number } | null = null;

    constructor(private aurelia: Aurelia, private todoService: TodoService, private user: User) {
        this.init();
    }

    private async init() {
        const stats = await this.todoService.getStats();
        this.karma = stats.karma;
        console.log(await this.todoService.sync());
        const sync = await this.todoService.sync();
        this.activeProject = this.user.activeProject;
        if(this.activeProject)
            this.tasks = await this.todoService.getTasks(this.activeProject.projectId);
        else 
            this.tasks = await this.todoService.getTasks();

        console.log(this.tasks);
        
        this.isPremium = sync.isPremium;        
    }

    get hasActiveProject(): boolean {
        return this.activeProject !== null;
    }
}