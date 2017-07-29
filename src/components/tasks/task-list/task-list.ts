import { autoinject } from 'aurelia-framework';
import { TodoService } from '../../../services/todoService';

@autoinject
export class TaskList {
    tasks: any[];

    constructor(private todoService: TodoService) {
        this.init();
    }

    private async init() {
        this.tasks = await this.todoService.getTasks();
    }
}