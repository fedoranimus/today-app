import { autoinject, LogManager } from 'aurelia-framework';
import { TodoistService } from '../services/todoistService';
import { State } from './models';
import { Task } from './todoist';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastMessage } from '../components/toast/toast';

@autoinject
export class Store {

    public logger = LogManager.getLogger("Store");

    private initialState: State = {
        tasks: [],
        isSessionActive: false,
        activeFilter: null,
        apiToken: null
    }

    private _state: BehaviorSubject<State> = new BehaviorSubject(this.initialState);

    private lastAction: Action | null = null;

    public toastSubject: Subject<ToastMessage> = new Subject();

    public readonly state: Observable<State> = this._state.asObservable(); //observable state, readonly so that it cannot be directly modified

    constructor(private todoistService: TodoistService) {
        this.initializeState();
    }

    private async initializeState() {
        this.getTasks();
    }

    public undo() {
        console.log(`Undoing...`);
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
                        state.tasks = response;
                    else
                        state.tasks = this.filterTasks(response);

                    this._state.next(state);

                    console.log(`State updated`, state);
                },
                error => console.log(`Error loading tasks`)
            );
    }

    private filterTasks(tasks: Task[]) {
        tasks = tasks.filter((item: Task) => {
            return item.due ? moment().isSameOrBefore(item.due.date, 'day') : false;
        });

        return tasks;
    }

    public closeTask(task: Task) {
        Observable.fromPromise(this.todoistService.closeTask(task.id))
        .subscribe( 
            response => { 
                this.toastSubject.next({ message: `${task.content} Completed`, canUndo: true});

                this.getTasks();
            },
            error => {
                this.toastSubject.next({ message: "Action Failed - Try Again", canUndo: false});

                console.log(`Error completing task`);
            }
        );
    }

    public reopenTask(task: Task) {
        //TODO
    }

    public getFilters() {
        Observable.fromPromise(this.todoistService.getFilters())
            .subscribe( 
                response => console.log(response)
            );
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
    constructor(private task: Task, private store: Store) {

    }

    undo() {
        this.store.reopenTask(this.task);
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