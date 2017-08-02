import { autoinject, bindable } from 'aurelia-framework';
import { TodoService } from '../../services/todoService';

@autoinject
export class TaskList {
    @bindable tasks: any[];

    constructor() {

    }
}