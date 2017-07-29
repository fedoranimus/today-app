import { autoinject, Aurelia } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoService } from '../services/todoService';

@autoinject
export class Home {
    keyInput: string;
    
    tasks: any[];
    karma: any;
    isPremium: boolean = false;

    constructor(private aurelia: Aurelia, private todoService: TodoService) {
        this.init();
    }

    private async init() {
        const stats = await this.todoService.getStats();
        this.karma = stats.karma;
        console.log(await this.todoService.sync());
        const sync = await this.todoService.sync();
        this.isPremium = sync.isPremium;
        this.tasks = await this.todoService.getTodayTasks();
        
    }
}