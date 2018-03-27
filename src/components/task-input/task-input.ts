import { autoinject } from 'aurelia-framework';
import { Store } from '../../models/store';

@autoinject
export class TaskInput {
    taskContent: string = '';

    constructor(private store: Store) {
    }

    createTask() {
        this.store.createTask(this.taskContent);
    }
}