import { autoinject, LogManager } from 'aurelia-framework';
import { TodoistService } from '../services/todoistService';
import { State, Task } from './models';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

@autoinject
export class Store {

    public logger = LogManager.getLogger("Store");

    private initialState: State = {
        tasks: [],
        isSessionActive: false,
        activeFilter: null
    }

    private _state: BehaviorSubject<State> = new BehaviorSubject(this.initialState);

    private lastAction: Action | null = null;

   public readonly state: Observable<State> = this._state.asObservable(); //observable state, readonly so that it cannot be directly modified

    constructor(private todoistService: TodoistService) {
        this.initializeState();
    }

    private async initializeState() {
        this.getTasks();
    }

    public undo() {
        if(this.lastAction) {
            this.lastAction.undo();
            this.lastAction = null;
        }
    }

    public setSessionState(activeSession: boolean) {
        const state = this._state.getValue();
        state.isSessionActive = activeSession;
        this._state.next(state);

        console.log(`State updated`, state);
    }

    public getTasks() {
        const state = this._state.getValue();
        const filter = state.activeFilter;
        Observable.fromPromise(this.todoistService.getTasks(filter))
            .subscribe(
                response => {
                    if(filter)
                        state.tasks = this.filterTasks(response);
                    else
                        state.tasks = response;

                    this._state.next(state);

                    console.log(`State updated`, state);
                },
            error => console.log(`Error loading tasks`));
    }

    private filterTasks(tasks: Task[]) {
        tasks = tasks.filter((item: Task) => {
            if(item.due_date_utc)
                return moment().isSame(item.due_date_utc, 'day');
            else
                return false;
        });

        return tasks;
    }

    // public async completeTask(taskId: number) {
    //     if(this._state.activeFilter) {
    //         this._state.tasks = await this.todoistService.completeTask(taskId);
    //     }
    //     else {
    //         const tasks = await this.todoistService.completeTask(taskId);
    //         this._state.tasks = tasks.filter((item: any) => {
    //             return moment().isSame(item.due_date_utc, 'day');
    //         });
    //     }
    // }

}

interface Action {
    undo: () => void;
}

class CompleteTaskAction implements Action {
    constructor(private taskId: number, private todoistService: TodoistService) {

    }

    undo() {
        this.todoistService.uncompleteTask(this.taskId);
    }
}

class SetLocationAction implements Action {
    constructor() {
        //TODO
    }

    undo() {
        //TODO
    }
}