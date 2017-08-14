import { autoinject, LogManager } from 'aurelia-framework';
import { TodoistService } from '../services/todoistService';
import { State, Session, SessionStatus } from './models';
import { Task } from './todoist';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastMessage } from '../components/toast/toast';

@autoinject
export class Store {
    public logger = LogManager.getLogger("Store");

    private initialState: State = {
        tasks: [],
        activeSession: null,
        activeFilter: null,
        currentBreak: 0,
        settings: {
            pomodoroLength:3000, //25 minutes = 1500000 ms
            breakCount: 0,
            breakLength: 1500, // 5 minutes = 300000 ms
            longBreakLength: 5000 // 15 minutes = 900000 ms
        }
    }
    private _state: BehaviorSubject<State> = new BehaviorSubject(this.initialState);

    private lastAction: Action | null = null;

    public toastSubject: Subject<ToastMessage> = new Subject();

    public readonly state: Observable<State> = this._state.asObservable(); //observable state, readonly so that it cannot be directly modified

    constructor(private todoistService: TodoistService) {
        this.getTasks();
    }

    public undo() {
        console.log(`Undoing...`);
        if(this.lastAction) {
            this.lastAction.undo();
            this.lastAction = null;
        }
    }

    public startSession(task: Task) {
        const state = this._state.getValue();

        const newSession: Session = {
            isPomodoro: true,
            length: state.settings.pomodoroLength,
            task: task,
            status: SessionStatus.Starting
        };

        state.activeSession = newSession;

        this._state.next(state);
    }

    public setSessionStatus(sessionStatus: SessionStatus) {
        const state = this._state.getValue();
        if(state.activeSession) {
            state.activeSession.status = sessionStatus;
            this._state.next(state);
        }
    }

    public endSession() {
        const state = this._state.getValue();

        state.activeSession = null;

        this._state.next(state);
    }

    public getTasks() {
        const state = this._state.getValue();
        const filter = state.activeFilter;
        Observable.fromPromise(this.todoistService.getTasks(filter))
            .subscribe(
                response => {
                    state.tasks = filter ? response : this.filterTodayAndOverdueTasks(response);

                    this._state.next(state);

                    console.log(`State updated`, state);
                },
                error => console.log(`Error loading tasks`)
            );
    }

    private filterTodayAndOverdueTasks(tasks: Task[]) {
        return tasks.filter(item => {
            return item.due ? moment(item.due.date).isSameOrBefore(moment(), 'day') : false;
        }).sort((a, b) => a.order - b.order);
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