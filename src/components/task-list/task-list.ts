import { autoinject, bindable, computedFrom } from 'aurelia-framework';
import { Task } from '../../models/todoist';
import { Store } from '../../models/store';

@autoinject
export class TaskList {
    tasks: Task[] = [];
    //@bindable focusLength: number;

    constructor(private store: Store) {
        store.state.subscribe(
            state => this.tasks = state.tasks
        );
        //this.tasks = store.state.tasks;
    }

    startSession(task: Task) {
        //console.log(`Starting ${this.focusLength} millisecond session`);
        this.store.setSessionState(true);
    }

    completeTask(task: Task) {
        this.store.closeTask(task);
    }

    @computedFrom('tasks')
    get hasTasks() {
        return this.tasks.length > 0;
    }
}