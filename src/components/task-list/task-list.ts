import { autoinject, bindable, computedFrom, observable } from 'aurelia-framework';
import { TodoistService } from '../../services/todoistService';
import { StartSessionEvent, TaskCompletedEvent } from '../../infrastructure/events';
import { Item } from '../../infrastructure/todoist';
import { Task } from '../../models/models';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../../models/store';

@autoinject
export class TaskList {
    @observable tasks: Task[] = [];
    //@bindable focusLength: number;

    constructor(private store: Store) {
        store.state.subscribe(
            state => this.tasks = state.tasks
        );
        //this.tasks = store.state.tasks;
    }

    tasksChanged(newValue: Task[], oldValue: Task[]) {
        console.log("TasksChanged", newValue, oldValue);
    }

    startSession(task: Task) {
        //console.log(`Starting ${this.focusLength} millisecond session`);
        this.store.setSessionState(true);
        //this.eventAggregator.publish(new StartSessionEvent(this.focusLength, task));
    }

    completeTask(task: Task) {
        //this.store.completeTask(task.id);
        //this.eventAggregator.publish(new TaskCompletedEvent(task));
    }

    @computedFrom('tasks')
    get hasTasks() {
        return this.tasks.length > 0;
    }
}