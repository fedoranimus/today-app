import { autoinject, Aurelia, bindable, observable } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoistService } from '../services/todoistService';
import { User, IProjectLocation } from '../services/user';
import { Filter, Item } from '../infrastructure/todoist';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SessionStartedEvent, SessionEndedEvent, TaskCompletedEvent, ShowToastEvent } from '../infrastructure/events';
import { Store } from '../models/store';
import { State } from '../models/models';

@autoinject
export class Home {
    keyInput: string;

    //@bindable activeProject: Project | null = null;
    @bindable activeFilter: Filter | null = null;
    //projects: Project[];
    @bindable firstName: string = "user";

    focusLength: number;

    @observable
    public state: State;

    @observable
    public isSessionActive: boolean;

    constructor(private store: Store) {
        //this.state = store.state;
        //this.isSessionActive = store.state.isSessionActive;
    }

    stateChanged(newValue: State, oldValue: State) {
        console.log('stateChanged:', oldValue, newValue);
    }

    isSessionActiveChanged(newValue: boolean, oldValue: boolean) {
        console.log(`isSessionActiveChanged from ${oldValue} to ${newValue}`);
    }

    // async bind() {
    //     const user = await this.todoService.getUser();
    //     this.firstName = user.full_name.split(" ")[0];

    //     this.tasks = await this.syncTasks();

    //     this.focusLength = this.user.focusLength;

    //     this.eventAggregator.subscribe(SessionStartedEvent, (event: SessionStartedEvent) => {
    //         this.isSessionRunning = true;
    //     });

    //     this.eventAggregator.subscribe(SessionEndedEvent, (event: SessionEndedEvent) => {
    //         this.isSessionRunning = false;
    //     });

    //     this.eventAggregator.subscribe(TaskCompletedEvent, async (event: TaskCompletedEvent) => {
    //         const completedTask = event.completedTask;
    //         if(completedTask) {
    //             this.todoService.completeTask(completedTask.id);
    //             this.tasks = this.tasks.filter(task => {
    //                 return task.id !== completedTask.id;
    //             });
    //             this.eventAggregator.publish(new ShowToastEvent(`${completedTask.content} completed`, completedTask));
    //         }        
    //     });
    // }

    // private async syncTasks() {
    //     return await this.todoService.getTasks(); 
    // }
}