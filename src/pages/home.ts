import { autoinject, Aurelia, bindable, computedFrom } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoistService } from '../services/todoistService';
import { User, IProjectLocation } from '../services/user';
import { Filter, Task } from '../models/todoist';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from '../models/store';
import { State } from '../models/models';
import * as moment from 'moment';

@autoinject
export class Home {
    firstName: string = "user";
    date: string = moment().format("ddd Do, MMM");
    private state!: State;

    isSessionActive: boolean = false;

    constructor(private store: Store) {
        store.state.subscribe(
            response => { 
                this.state = response;
                this.isSessionActive = response.activeSession !== undefined;
            }
        )
    }

    //@computedFrom('state')
    // get isSessionActive() {
    //     return this.state.activeSession !== null;
    // }
}