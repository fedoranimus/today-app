import { autoinject, bindable, computedFrom } from 'aurelia-framework';
import { TodoService } from '../../services/todoService';
import { StartSessionEvent } from '../../infrastructure/events';
import { Item } from '../../infrastructure/todoist';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class TaskList {
    @bindable tasks: Item[];
    @bindable focusLength: number;

    constructor(private eventAggregator: EventAggregator) {

    }

    startSession() {
        console.log(`Starting ${this.focusLength} millisecond session`);
        this.eventAggregator.publish(new StartSessionEvent(this.focusLength));
    }

    @computedFrom('tasks')
    get hasTasks() {
        return this.tasks.length > 0;
    }
}