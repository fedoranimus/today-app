import { autoinject, Aurelia, bindable, computedFrom } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoistService } from '../services/todoistService';
import { User, IProjectLocation } from '../services/user';
import { Filter, Task } from '../models/todoist';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../models/store';
import { State } from '../models/models';

@autoinject
export class Home {
    firstName: string = "user";
    private state: State;

    constructor(private store: Store) {
        store.state.subscribe(
            response => this.state = response
        )
    }

    //@computedFrom('state')
    get isSessionActive() {
        return this.state.activeSession !== null;
    }
}